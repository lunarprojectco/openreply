import type { Metadata } from "next";
import Link from "next/link";
import { RelayPublicHeader } from "@/components/relay-public-header";
import "../relay-public.css";

export const metadata: Metadata = {
  title: "Get started | Relay by Lunar",
  description:
    "Sign in, connect an Instagram account, and build your first Relay campaign.",
};

const steps = [
  {
    title: "Sign in to your workspace",
    body: "Use your email to open a secure magic link. Your Relay workspace is created when you sign in.",
  },
  {
    title: "Connect Instagram",
    body: "Connect a professional account through your own Meta app or the optional provider configured by your host.",
  },
  {
    title: "Create your first campaign",
    body: "Choose a post, set the keyword, write your reply, and review activity from the portal.",
  },
];

export default function GatewayPage() {
  return (
    <div className="relay-public relay-gateway">
      <a className="relay-skip" href="#main">
        Skip to content
      </a>
      <RelayPublicHeader />
      <main id="main" className="relay-container relay-gateway-main">
        <div className="relay-gateway-hero">
          <div>
            <p className="relay-section-kicker">YOUR FIRST STEP / RELAY</p>
            <h1>
              Start with your <em>Instagram account.</em>
            </h1>
            <p>
              Relay works around the conversations you already have. Open your
              workspace, connect your account, and give your next campaign a
              starting point.
            </p>
            <Link
              className="relay-button relay-button-coral"
              href="/login?callbackUrl=%2Fportal"
            >
              Continue with email <span aria-hidden="true">↗</span>
            </Link>
          </div>
          <div className="relay-gateway-card" aria-label="Relay setup preview">
            <div className="relay-gateway-card-head">
              <b>✳ &nbsp;relay</b>
              <span>YOUR WORKSPACE</span>
            </div>
            <h2>Make room for what comes next.</h2>
            <p>Three practical steps to your first comment-to-DM campaign.</p>
            <div className="relay-gateway-card-steps">
              <div>
                <span>01</span> Sign in securely
              </div>
              <div>
                <span>02</span> Connect Instagram
              </div>
              <div>
                <span>03</span> Create a campaign
              </div>
            </div>
          </div>
        </div>
        <div className="relay-gateway-details">
          <div>
            <p className="relay-section-kicker">HOW YOU GET STARTED</p>
            <h2>A clear path from sign-in to send.</h2>
          </div>
          <div className="relay-gateway-list">
            {steps.map((step, index) => (
              <article key={step.title}>
                <span>0{index + 1} / STEP</span>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </article>
            ))}
          </div>
        </div>
        <div className="relay-gateway-note">
          <strong>Before you connect:</strong> This self-hosted application
          needs a public HTTPS URL, PostgreSQL, Redis, a running worker, and a
          configured Instagram provider. Your account connection and campaign
          delivery will only work when those services are configured by the
          host.
        </div>
      </main>
    </div>
  );
}
