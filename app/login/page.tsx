import { EMAIL_PROVIDER_ID, signIn } from "@/lib/auth";
import { getCampaignTemplate } from "@/lib/templates/campaign-templates";
import { DemoNotice } from "@/components/demo-notice";
import Link from "next/link";
import styles from "./login.module.css";

export const metadata = {
  title: "Sign in | Relay by Lunar",
  description: "Sign in to manage Instagram comment-to-DM campaigns.",
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{
    checkEmail?: string;
    callbackUrl?: string;
    template?: string;
  }>;
}) {
  const params = await searchParams;
  const checkEmail = params.checkEmail === "1";
  const selectedTemplate = getCampaignTemplate(params.template);
  const templateCallbackUrl = selectedTemplate
    ? `/campaigns/new?template=${selectedTemplate.slug}`
    : null;
  const requestedCallback =
    params.callbackUrl ?? templateCallbackUrl ?? "/portal";
  const callbackUrl =
    /^\/(portal|dashboard|campaigns|automations|overview|inbox|logs|settings|diagnostics)(?:\/|\?|$)/.test(
      requestedCallback,
    ) && !requestedCallback.includes("\\")
      ? requestedCallback
      : "/portal";

  async function sendMagicLink(formData: FormData) {
    "use server";
    await signIn(EMAIL_PROVIDER_ID, {
      email: String(formData.get("email") ?? ""),
      redirectTo: callbackUrl,
    });
  }

  return (
    <div className={styles.page}>
      <div className={styles.top}>
        <Link href="/" className={styles.brand}>
          <span aria-hidden="true">✳</span> relay <small>BY LUNAR</small>
        </Link>
        <Link href="/gateway">Back to gateway ↗</Link>
      </div>
      <div className={styles.layout}>
        <div className={styles.intro}>
          <p>YOUR WORKSPACE / RELAY</p>
          <h1>
            Welcome to the <em>conversation.</em>
          </h1>
          <span>
            {selectedTemplate
              ? `Sign in to use the ${selectedTemplate.title} template.`
              : "Sign in by email, then connect your Instagram professional account."}
          </span>
        </div>
        <div className={styles.formCard}>
          <p className={styles.cardKicker}>SECURE SIGN IN</p>
          <h2>{checkEmail ? "Check your inbox." : "Let’s get you in."}</h2>
          <DemoNotice variant="panel" />
          {selectedTemplate && !checkEmail && (
            <div className="mb-5 border border-accent/20 bg-accent/10 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-accent">
                Template selected
              </p>
              <p className="mt-2 text-sm font-semibold text-foreground">
                {selectedTemplate.title}
              </p>
            </div>
          )}

          {checkEmail ? (
            <div className={styles.checkEmail}>
              <p>
                We sent you a secure sign-in link. Open it on this device to
                continue.
              </p>
            </div>
          ) : (
            <form action={sendMagicLink} className={styles.form}>
              <div>
                <label htmlFor="email" className={styles.label}>
                  Work email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="you@company.com"
                  className={styles.input}
                />
              </div>

              <button type="submit" className={styles.submit}>
                Email me a magic link <span aria-hidden="true">↗</span>
              </button>
            </form>
          )}
          <p className={styles.cardNote}>
            This sign-in requires a configured email provider. Account
            connection happens after you enter the workspace.
          </p>
        </div>
      </div>
    </div>
  );
}
