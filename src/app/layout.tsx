import type { Metadata, Viewport } from "next";
import "./globals.css";
import { PwaClientBootstrap } from "@/components/pwa/PwaClientBootstrap";

export const metadata: Metadata = {
  applicationName: "Dalida Dance",
  title: "Dalida Dance",
  description: "NFC member management and attendance tracking.",
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: "/logo-black.png",
    shortcut: "/icon-192.png",
  },
  appleWebApp: {
    capable: true,
    title: "Dalida Dance",
    statusBarStyle: "black-translucent",
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="bg">
      <head>
        <link rel="apple-touch-icon" href="/logo-black.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/logo-black.png" />
        <link rel="apple-touch-icon" sizes="192x192" href="/logo-black.png" />
        <link rel="apple-touch-icon" sizes="512x512" href="/logo-black.png" />
      </head>
      <body>
        <PwaClientBootstrap />
        {children}
      </body>
    </html>
  );
}
