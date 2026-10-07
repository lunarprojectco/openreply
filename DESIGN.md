# Relay interface direction

Relay is Lunar Marketing OS's Instagram conversation module, built from the OpenReply fork. Its public story leads from a comment to a useful private reply; its portal gives signed-in users a clear route to account connection, campaigns, inbox, and delivery activity.

## Visual system

- Public pages: midnight plum `#27152e`, warm paper `#faf7f2`, coral `#ff765f`, and editorial Georgia headlines. Conversation cards are labeled examples; they never imply a live connected account.
- Portal: white working canvas, ink `#301e36`, quieter coral `#b95f54`, compact labels, and real data from the tenant-scoped dashboard API.
- Navigation: one Relay wordmark; public gateway and sign-in routes lead to the authenticated `/portal` route. Existing operational routes stay available.
- Motion: only a short button hover translation, removed under reduced-motion preference. No decorative auto-play animation.

## Content and state rules

- The public site describes capabilities present in the fork: comment keywords, private replies, inbox, logs, and tracked links. It states the self-hosted infrastructure requirements.
- Portal numbers come from `/api/dashboard/stats`. Loading, request failure, connected and empty workspace states are explicit.
- An Instagram account shown in the portal is a real connected account returned by that API. Visual illustrations elsewhere are labeled as examples.
- Sign-in uses the existing Auth.js email provider. Provider connection and message delivery depend on deployment configuration; the interface must not describe either as completed before data confirms it.
