import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Atlantic Lounge Bar — Luxury Vibes & Premium Nights",
  description:
    "Atlantic Lounge Bar is a gold-lit sanctuary of hand-crafted cocktails, live DJ nights and velvet-seated luxury. Reserve your table for premium nights.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700;800;900&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,400;1,500&family=Jost:wght@300;400;500;600&family=Parisienne&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col bg-obsidian text-cream font-body selection:bg-gold/30 selection:text-cream">
        {children}
      </body>
    </html>
  );
}
