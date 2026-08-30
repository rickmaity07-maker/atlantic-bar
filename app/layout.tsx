import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "./context/AuthContext";
import { LanguageProvider } from "./context/LanguageContext";

export const metadata: Metadata = {
  title: "Atlantic Lounge Bar — Luxuriöses Ambiente & Premium-Abende",
  description:
    "Die Atlantic Lounge Bar ist ein golden erleuchteter Rückzugsort mit handgemachten Cocktails, Live-DJ-Abenden und samtenem Luxus. Reservieren Sie Ihren Tisch für Premium-Abende.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="de" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700;800;900&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,400;1,500&family=Jost:wght@300;400;500;600&family=Parisienne&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col bg-obsidian text-cream font-body selection:bg-gold/30 selection:text-cream">
        <LanguageProvider>
          <AuthProvider>{children}</AuthProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
