# Deploying this fork

This fork does not deploy to Vercel. It runs on our own box: nginx in front of the Next.js
server, both processes under systemd, with the scheduled jobs as systemd timers.

Upstream's `vercel.json` has been removed, along with `@vercel/analytics` and the
`vercel-build` script. `docs/setup.md` still contains upstream's Vercel and Railway
walkthrough — its **Meta app instructions are still correct and still the hard part**, so
read it for those. Ignore its hosting sections and use this file instead.

## What has to be running

Two long-lived processes, always. This is the thing people get wrong.

| Process | Unit | What breaks without it |
|---|---|---|
| Web app | `openreply-web.service` | Meta webhooks are not received. Comments are missed outright — Meta retries for a limited window, then drops them. |
| Worker | `openreply-worker.service` | Nothing is sent. Jobs pile up in Redis and drain on restart, so this fails loud rather than lossy — but no DM goes out while it is down. |

Plus PostgreSQL, Redis, and an email sender for magic-link sign-in.

**Never run two workers against one Redis.** The per-account rate limiter keeps its state in
the queue; a second consumer will exceed Meta's cap and get the account throttled.

## Layout

```
/opt/openreply              the checkout, owned by the openreply user
/etc/openreply/openreply.env   secrets, root-owned, chmod 600
```

## Install

```bash
sudo useradd --system --home /opt/openreply --shell /usr/sbin/nologin openreply
sudo git clone https://github.com/lunarprojectco/openreply.git /opt/openreply
sudo chown -R openreply:openreply /opt/openreply

cd /opt/openreply
sudo -u openreply npm ci
sudo -u openreply npm run db:generate
sudo -u openreply npm run db:migrate     # never at build time; needs a live DB
sudo -u openreply npm run build

sudo install -d -m 700 /etc/openreply
sudo install -m 600 /dev/null /etc/openreply/openreply.env
sudo -e /etc/openreply/openreply.env     # fill in from .env.example

sudo install -m 755 deploy/bin/openreply-cron-call /opt/openreply/deploy/bin/openreply-cron-call
sudo cp deploy/systemd/*.service deploy/systemd/*.timer /etc/systemd/system/
sudo systemctl daemon-reload

sudo systemctl enable --now openreply-web openreply-worker
sudo systemctl enable --now \
  openreply-cron@refresh-tokens.timer \
  openreply-cron@attach-next-reel.timer \
  openreply-cron@snapshot-followers.timer
```

nginx: copy `deploy/nginx/openreply.conf` into `sites-available`, set `server_name`, issue a
certificate, symlink into `sites-enabled`, `nginx -t`, reload.

## Migrations run at deploy, not at build

Upstream's `vercel-build` bundled `prisma generate && prisma migrate deploy && next build`
into one step. That only works where the build host can reach the database. Here they are
separate: `db:migrate` before `build`, both before the units start. A build step that reaches
the database will fail on a box that firewalls Postgres off from the build user.

## The scheduled jobs

Three timers replace upstream's three Vercel crons.

| Timer | Cadence | Why |
|---|---|---|
| `openreply-cron@refresh-tokens` | daily 05:00 UTC, `Persistent=true` | Refreshes Instagram long-lived tokens 10 days before expiry. **The one that hurts.** If it silently stops, the token expires and every automation stops with no error anywhere. `Persistent=true` so a reboot window cannot skip days in a row. |
| `openreply-cron@attach-next-reel` | every 5 minutes | Binds a campaign created before its reel was published. Upstream ran this daily *only* because Vercel's free plan caps a cron at one run per day — a constraint that does not exist here. Daily would cost the whole first evening of comments, which is the most valuable window a post has. |
| `openreply-cron@snapshot-followers` | daily 07:00 UTC, `Persistent=true` | One row per account per day. Runs after the token refresh. A missed day is a gap in a chart, not an outage. |

All three call `/api/cron/<route>` with `Authorization: Bearer $CRON_SECRET` (the routes also
accept `NEXTAUTH_SECRET`). `deploy/bin/openreply-cron-call` passes the secret to curl via
`--config` on stdin, so it never appears in `ps`. It uses `curl --fail`, so an HTTP 401 or 500
is a unit failure systemd records — without that, curl exits 0 and a broken token refresh
looks healthy for weeks.

`scripts/cron.sh` is the container equivalent — a polling loop for a container host. It is not
used in this deployment; the timers replace it. Do not run both.

## Verifying

```bash
systemctl status openreply-web openreply-worker
systemctl list-timers 'openreply-*'
journalctl -u openreply-worker -f

# Force one scheduled run and watch it succeed:
sudo systemctl start openreply-cron@refresh-tokens
journalctl -u openreply-cron@refresh-tokens -n 50 --no-pager
```

A 401 there means `CRON_SECRET` in `/etc/openreply/openreply.env` does not match the app's.

End to end: comment a campaign keyword on a connected account's post from a second account,
then watch `journalctl -u openreply-worker -f` and check the DM Logs page for a `SENT` row.
If the comment arrives and no DM does, check the worker first — that is almost always it.

## What is deliberately absent

- **No Vercel.** No `vercel.json`, no deploy button, no `@vercel/analytics`, no `vercel-build`.
- **No analytics.** Upstream shipped `@vercel/analytics` in the root layout; it is removed
  rather than swapped for another vendor. Add one deliberately if you want one.
- **No secrets in the repo.** Units reference `/etc/openreply/openreply.env` by path. Nothing
  in `deploy/` contains a value.
