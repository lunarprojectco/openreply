"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./portal.module.css";

interface PortalStats {
  userName: string | null;
  workspace: { name: string } | null;
  instagramAccounts: Array<{
    id: string;
    username: string;
    webhookSubscribed: boolean;
  }>;
  totalAutomations: number;
  activeAutomations: number;
  dmsSentMonth: number;
  dmsSkippedMonth: number;
  dmsFailedMonth: number;
  recentLogs: Array<{
    id: string;
    status: string;
    createdAt: string;
    automation: { name: string };
  }>;
}

export default function PortalPage() {
  const [stats, setStats] = useState<PortalStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/dashboard/stats", { signal: controller.signal })
      .then(async (response) => {
        const payload = await response.json();
        if (!response.ok || !payload.success)
          throw new Error(payload.error ?? "Workspace data is unavailable.");
        setStats(payload.data as PortalStats);
      })
      .catch((reason: unknown) => {
        if (controller.signal.aborted) return;
        setError(
          reason instanceof Error
            ? reason.message
            : "Workspace data is unavailable.",
        );
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });
    return () => controller.abort();
  }, []);

  if (loading)
    return (
      <div className={styles.portal}>
        <p className={styles.eyebrow}>RELAY / WORKSPACE</p>
        <h1>Loading your workspace…</h1>
        <p className={styles.muted} role="status">
          Checking your connected accounts and activity.
        </p>
      </div>
    );

  if (error || !stats)
    return (
      <div className={styles.portal}>
        <p className={styles.eyebrow}>RELAY / WORKSPACE</p>
        <h1>Workspace unavailable</h1>
        <p className={styles.muted} role="alert">
          {error ?? "We couldn't load your workspace."}
        </p>
        <button
          className={styles.primaryButton}
          onClick={() => window.location.reload()}
        >
          Try again <span aria-hidden="true">↗</span>
        </button>
      </div>
    );

  const hasAccount = stats.instagramAccounts.length > 0;
  const hasCampaign = stats.totalAutomations > 0;
  const setupCount = Number(hasAccount) + Number(hasCampaign);
  const accountLabel =
    stats.instagramAccounts.length === 1
      ? `@${stats.instagramAccounts[0].username}`
      : `${stats.instagramAccounts.length} connected accounts`;

  return (
    <div className={styles.portal}>
      <div className={styles.header}>
        <div>
          <p className={styles.eyebrow}>
            RELAY / {stats.workspace?.name?.toUpperCase() ?? "WORKSPACE"}
          </p>
          <h1>
            {stats.userName
              ? `Welcome back, ${stats.userName}.`
              : "Your Relay workspace."}
          </h1>
          <p className={styles.muted}>
            Bring every comment, campaign, and conversation into view.
          </p>
        </div>
        <Link href="/campaigns/new" className={styles.primaryButton}>
          New campaign <span aria-hidden="true">↗</span>
        </Link>
      </div>
      <div className={styles.topline}>
        <span className={styles.statusDot} />{" "}
        {hasAccount
          ? `Connected: ${accountLabel}`
          : "Instagram account not connected"}
        <Link href="/settings">Manage connection ↗</Link>
      </div>
      <div
        className={styles.metrics}
        aria-label="Workspace activity this month"
      >
        <div>
          <span>ACTIVE CAMPAIGNS</span>
          <strong>{stats.activeAutomations}</strong>
          <small>of {stats.totalAutomations} total</small>
        </div>
        <div>
          <span>MESSAGES SENT</span>
          <strong>{stats.dmsSentMonth}</strong>
          <small>this month</small>
        </div>
        <div>
          <span>SKIPPED</span>
          <strong>{stats.dmsSkippedMonth}</strong>
          <small>this month</small>
        </div>
        <div>
          <span>FAILED</span>
          <strong>{stats.dmsFailedMonth}</strong>
          <small>this month</small>
        </div>
      </div>
      <div className={styles.contentGrid}>
        <section className={styles.setup}>
          <div className={styles.sectionHeading}>
            <div>
              <p className={styles.eyebrow}>GET MOVING</p>
              <h2>Set up your first conversation.</h2>
            </div>
            <span>{setupCount} / 2 complete</span>
          </div>
          <div className={styles.taskList}>
            <div>
              <span className={hasAccount ? styles.done : styles.todo}>
                {hasAccount ? "✓" : "1"}
              </span>
              <div>
                <h3>Connect Instagram</h3>
                <p>
                  {hasAccount
                    ? `${accountLabel} is connected to this workspace.`
                    : "Connect a professional account to start listening for comments."}
                </p>
              </div>
              <Link href="/settings">{hasAccount ? "View" : "Connect"} ↗</Link>
            </div>
            <div>
              <span className={hasCampaign ? styles.done : styles.todo}>
                {hasCampaign ? "✓" : "2"}
              </span>
              <div>
                <h3>Create a campaign</h3>
                <p>
                  {hasCampaign
                    ? `${stats.totalAutomations} campaign${stats.totalAutomations === 1 ? "" : "s"} in this workspace.`
                    : "Choose a post, set a keyword, and write the message to send."}
                </p>
              </div>
              <Link href={hasCampaign ? "/campaigns" : "/campaigns/new"}>
                {hasCampaign ? "View" : "Create"} ↗
              </Link>
            </div>
          </div>
        </section>
        <section className={styles.next}>
          <p className={styles.eyebrow}>NEXT IN LINE</p>
          <div className={styles.orbit} aria-hidden="true">
            <span>✳</span>
          </div>
          <h2>Keep the conversation going.</h2>
          <p>
            When someone replies, your team can pick up the thread in the inbox.
            Delivery details remain in your activity log.
          </p>
          <div>
            <Link href="/inbox">Open inbox ↗</Link>
            <Link href="/logs">View activity ↗</Link>
          </div>
        </section>
      </div>
      <section className={styles.activity}>
        <div>
          <p className={styles.eyebrow}>RECENT ACTIVITY</p>
          <h2>
            {stats.recentLogs.length
              ? "Latest delivery events"
              : "Your activity starts here"}
          </h2>
          <p>
            {stats.recentLogs.length
              ? "The most recent campaign events in this workspace."
              : "Delivery events will appear after a campaign receives a matching interaction."}
          </p>
        </div>
        <Link href="/logs">View all activity ↗</Link>
      </section>
      {stats.recentLogs.length > 0 && (
        <ul className={styles.recentLogs}>
          {stats.recentLogs.slice(0, 3).map((log) => (
            <li key={log.id}>
              <span>{log.automation.name}</span>
              <small>{log.status.toLowerCase().replaceAll("_", " ")}</small>
              <time dateTime={log.createdAt}>
                {new Date(log.createdAt).toLocaleDateString()}
              </time>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
