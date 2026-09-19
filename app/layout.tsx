import type { Metadata } from "next";
import "./globals.css";
import { fontVariables } from "@/lib/fonts";
import { AuthProvider } from "./context/AuthContext";
import { LanguageProvider } from "./context/LanguageContext";
import { SiteImagesProvider } from "./context/SiteImagesContext";
import { BusinessHoursProvider } from "./context/BusinessHoursContext";
import CookieBanner from "@/components/CookieBanner";

export const metadata: Metadata = {
  title: "Atlantic Lounge Bar — Luxuriöses Ambiente & Premium-Abende",
  description:
    "Die Atlantic Lounge Bar ist ein golden erleuchteter Rückzugsort mit handgemachten Cocktails, Live-DJ-Abenden und samtenem Luxus. Reservieren Sie Ihren Tisch für Premium-Abende.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="de" className={`h-full antialiased ${fontVariables}`}>
      <body className="min-h-full flex flex-col bg-obsidian text-cream font-body selection:bg-gold/30 selection:text-cream">
        <LanguageProvider>
          <AuthProvider>
            <SiteImagesProvider>
              <BusinessHoursProvider>
                {children}
                <CookieBanner />
              </BusinessHoursProvider>
            </SiteImagesProvider>
          </AuthProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
