import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Refine Text — AI Message Polisher",
  description:
    "Rewrite messy input into polished messages with adjustable formality and friendliness, streamed in real time.",
};

export const viewport: Viewport = {
  themeColor: "#08090c",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
