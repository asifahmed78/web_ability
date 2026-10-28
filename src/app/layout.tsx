import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "WebAbility — Accessibility testing for real journeys",
  description:
    "An open-source project exploring journey-first accessibility testing for websites. Check the project status, architecture, and roadmap.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
