import type { Metadata } from "next";
import RelayHome from "../page";

export const metadata: Metadata = {
  title: "Relay by Lunar | Open-source Manychat alternative",
  description:
    "Explore Relay, Lunar's OpenReply fork for Instagram comment-to-DM campaigns, an inbox, and delivery activity.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Relay by Lunar | Open-source Manychat alternative",
    description:
      "Build focused Instagram comment-to-DM campaigns with Relay by Lunar.",
    url: "/manychat-alternative",
  },
};

export default function ManychatAlternativePage() {
  return <RelayHome />;
}
