import type { Metadata, Viewport } from "next";
import "./globals.css";
import { PwaClientBootstrap } from "@/components/pwa/PwaClientBootstrap";
import { GDPRConsent } from "@/components/GDPR/GDPRConsent";

function resolveMetadataBase(): URL | undefined {
  const rawUrl =
    process.env.NEXT_PUBLIC_SITE_URL?.trim() ||
    process.env.APP_BASE_URL?.trim() ||
    "";
  if (!rawUrl) return undefined;

  try {
    return new URL(rawUrl);
  } catch {
    return undefined;
  }
}

export const metadata: Metadata = {
  metadataBase: resolveMetadataBase(),
  applicationName: "My Team",
  title: "MyTeam – интелигентна платформа за управление на спортен клуб",
  description: "Управлявайте членовете, таксите и тренировъчния график на Вашия клуб на едно място. Автоматично проследяване на плащания, смарт карти за достъп и партньорски отстъпки в Sport Depot. 30 дни безплатен период, без обвързване.",
  openGraph: {
    title: "MyTeam – интелигентна платформа за управление на спортен клуб",
    description: "Управлявайте членовете, таксите и тренировъчния график на Вашия клуб на едно място. Автоматично проследяване на плащания, смарт карти за достъп и партньорски отстъпки в Sport Depot. 30 дни безплатен период, без обвързване.",
    locale: "bg_BG",
    type: "website",
  },
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [
      { url: "/myteam-logo.png", sizes: "192x192", type: "image/png" },
      { url: "/myteam-logo.png", sizes: "512x512", type: "image/png" },
    ],
    apple: "/myteam-logo.png",
    shortcut: "/myteam-logo.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  appleWebApp: {
    capable: true,
    title: "My Team",
    statusBarStyle: "black-translucent",
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="bg">
      <body>
        <PwaClientBootstrap />
        <GDPRConsent />
        {children}
      </body>
    </html>
  );
}
