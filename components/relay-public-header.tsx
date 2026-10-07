import Link from "next/link";

export function RelayPublicHeader({ dark = false }: { dark?: boolean }) {
  return (
    <header
      className={`relay-public-header ${dark ? "relay-public-header-dark" : ""}`}
    >
      <div className="relay-container relay-header-inner">
        <Link href="/" className="relay-brand" aria-label="Relay by Lunar home">
          <span className="relay-brand-mark" aria-hidden="true">
            ✳
          </span>
          <span>
            relay<small>BY LUNAR</small>
          </span>
        </Link>
        <nav aria-label="Main navigation">
          <Link href="/#how-it-works">How it works</Link>
          <Link href="/gateway">Gateway</Link>
          <a
            href="https://github.com/lunarprojectco/openreply"
            target="_blank"
            rel="noopener noreferrer"
          >
            Open source
          </a>
        </nav>
        <Link className="relay-header-cta" href="/login?callbackUrl=%2Fportal">
          Sign in <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </header>
  );
}
