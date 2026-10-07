import type { Metadata } from "next";
import Link from "next/link";
import { RelayPublicHeader } from "@/components/relay-public-header";
import "./relay-public.css";

export const metadata: Metadata = {
  title: "Relay by Lunar | Turn interest into a conversation",
  description:
    "Build Instagram comment-to-DM campaigns, review delivery, and continue conversations in one workspace.",
};

const capabilities = [
  {
    number: "01",
    title: "Meet people where they raise their hand.",
    body: "Choose a post or reel and a keyword. Relay can respond when someone comments with that keyword.",
  },
  {
    number: "02",
    title: "Make the reply yours.",
    body: "Write the private reply, add an optional public reply, and include tracked links when they help.",
  },
  {
    number: "03",
    title: "See what happened next.",
    body: "Review sent, skipped, and failed messages in the activity log, then pick up conversations in the inbox.",
  },
];

function ConversationPreview() {
  return (
    <div
      className="relay-conversation"
      aria-label="Illustrative comment-to-message campaign preview"
    >
      <div className="relay-preview-caption">
        <span className="relay-live-dot" /> CAMPAIGN FLOW <span>EXAMPLE</span>
      </div>
      <div className="relay-preview-card relay-preview-post">
        <div className="relay-preview-meta">
          <span className="relay-avatar">S</span>
          <span>
            <strong>Studio North</strong>
            <small>Instagram post</small>
          </span>
          <span className="relay-preview-index">01 / POST</span>
        </div>
        <div className="relay-art" aria-hidden="true">
          <span className="relay-art-orbit" />
          <span className="relay-art-type">
            Ideas move
            <br />
            between us.
          </span>
        </div>
        <p>
          Comment <b>GUIDE</b> and we&apos;ll send it your way.
        </p>
      </div>
      <div className="relay-flow-line">
        <span>COMMENT DETECTED</span>
        <i aria-hidden="true" />
      </div>
      <div className="relay-preview-card relay-preview-comment">
        <span className="relay-avatar relay-avatar-small">M</span>
        <span>
          <strong>@maya.creates</strong>
          <small>GUIDE please! ✨</small>
        </span>
        <span className="relay-match">KEYWORD MATCH</span>
      </div>
      <div className="relay-flow-line">
        <span>PRIVATE REPLY</span>
        <i aria-hidden="true" />
      </div>
      <div className="relay-preview-card relay-preview-dm">
        <small>MESSAGE FROM STUDIO NORTH</small>
        <p>Here&apos;s your guide. Can&apos;t wait to see what you make.</p>
        <span>Open the guide ↗</span>
      </div>
      <p className="relay-preview-footnote">
        Illustrative content. Campaigns and delivery depend on your connected
        account and provider setup.
      </p>
    </div>
  );
}

export default function Home() {
  return (
    <div className="relay-public">
      <a className="relay-skip" href="#main">
        Skip to content
      </a>
      <div className="relay-dark-stage">
        <RelayPublicHeader dark />
        <main id="main">
          <section
            className="relay-hero relay-container"
            aria-labelledby="relay-headline"
          >
            <div className="relay-hero-copy">
              <p className="relay-eyebrow">
                <span /> LUNAR MARKETING OS / RELAY
              </p>
              <h1 id="relay-headline">
                Turn interest into <em>a conversation.</em>
              </h1>
              <p className="relay-hero-lead">
                Build Instagram comment-to-DM campaigns, then follow every send,
                skip, and reply from one place.
              </p>
              <div className="relay-actions">
                <Link
                  className="relay-button relay-button-coral"
                  href="/gateway"
                >
                  Explore Relay <span aria-hidden="true">↗</span>
                </Link>
                <a className="relay-text-link" href="#how-it-works">
                  See how it works <span aria-hidden="true">↓</span>
                </a>
              </div>
              <p className="relay-hero-note">
                Built on the open-source{" "}
                <a
                  href="https://github.com/diwenne/openreply"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  OpenReply
                </a>{" "}
                project. Self-hosted setup required.
              </p>
            </div>
            <ConversationPreview />
          </section>
          <div className="relay-ticker" aria-hidden="true">
            <div>
              FROM COMMENT <span>✳</span> TO CONNECTION <span>✳</span> FROM
              COMMENT <span>✳</span> TO CONNECTION <span>✳</span> FROM COMMENT{" "}
              <span>✳</span> TO CONNECTION
            </div>
          </div>
        </main>
      </div>

      <section
        className="relay-intro relay-container"
        id="how-it-works"
        aria-labelledby="relay-intro-title"
      >
        <p className="relay-section-kicker">A CONVERSATION, NOT A DEAD END</p>
        <div>
          <h2 id="relay-intro-title">
            One small moment can start something bigger.
          </h2>
          <p>
            A question in the comments deserves a useful next step. Relay helps
            your team move that moment into a private message you control, with
            the activity visible afterward.
          </p>
        </div>
      </section>
      <section
        className="relay-steps relay-container"
        aria-label="How Relay works"
      >
        {capabilities.map((item) => (
          <article key={item.number} className="relay-step">
            <span>{item.number} / 03</span>
            <h3>{item.title}</h3>
            <p>{item.body}</p>
          </article>
        ))}
      </section>
      <section className="relay-workspace-section">
        <div className="relay-container relay-workspace-grid">
          <div className="relay-workspace-copy">
            <p className="relay-section-kicker">THE WORKSPACE</p>
            <h2>Keep the whole conversation in view.</h2>
            <p>
              Create campaigns, inspect delivery, and answer the next message.
              The portal uses your workspace&apos;s connected accounts and
              actual activity.
            </p>
            <Link className="relay-button relay-button-ink" href="/gateway">
              Enter the gateway <span aria-hidden="true">↗</span>
            </Link>
          </div>
          <div
            className="relay-workspace-preview"
            aria-label="Illustrative Relay portal navigation"
          >
            <div className="relay-mini-sidebar">
              <b>✳ &nbsp;relay</b>
              <span>● &nbsp; Workspace</span>
              <span>↗ &nbsp; Campaigns</span>
              <span>◌ &nbsp; Inbox</span>
              <span>▤ &nbsp; Activity</span>
            </div>
            <div className="relay-mini-main">
              <span>WORKSPACE / OVERVIEW</span>
              <h3>
                From first comment
                <br />
                to next conversation.
              </h3>
              <div className="relay-mini-cards">
                <div>
                  <small>01</small>
                  <b>Connect</b>
                  <p>Your Instagram account</p>
                </div>
                <div>
                  <small>02</small>
                  <b>Create</b>
                  <p>A campaign for your post</p>
                </div>
                <div>
                  <small>03</small>
                  <b>Review</b>
                  <p>Delivery and replies</p>
                </div>
              </div>
              <div className="relay-mini-bar">
                <span /> <span /> <span />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="relay-open-source relay-container">
        <div>
          <p className="relay-section-kicker">OPEN SOURCE ROOTS</p>
          <h2>Your workflow, on infrastructure you control.</h2>
        </div>
        <div>
          <p>
            Relay is Lunar&apos;s fork of OpenReply. Running it requires a
            public HTTPS endpoint, a database, Redis, a background worker, and
            an Instagram connection through your own Meta app or an optional
            provider.
          </p>
          <a
            className="relay-inline-link"
            href="https://github.com/lunarprojectco/openreply"
            target="_blank"
            rel="noopener noreferrer"
          >
            View the Lunar fork ↗
          </a>
        </div>
      </section>
      <section className="relay-bottom-cta">
        <div className="relay-container">
          <p className="relay-section-kicker">READY WHEN YOU ARE</p>
          <h2>Make the next comment count.</h2>
          <p>
            Start with your workspace, connect an account, and build your first
            campaign.
          </p>
          <Link className="relay-button relay-button-coral" href="/gateway">
            Get started <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>
      <footer className="relay-footer">
        <div className="relay-container">
          <span>
            ✳ &nbsp; RELAY <small>BY LUNAR</small>
          </span>
          <nav aria-label="Footer">
            <Link href="/gateway">Gateway</Link>
            <Link href="/login?callbackUrl=%2Fportal">Sign in</Link>
            <a
              href="https://github.com/lunarprojectco/openreply"
              target="_blank"
              rel="noopener noreferrer"
            >
              Source
            </a>
          </nav>
          <p>Powered by an OpenReply fork. © Lunar.</p>
        </div>
      </footer>
    </div>
  );
}
