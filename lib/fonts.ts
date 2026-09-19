import { Playfair_Display, Cormorant_Garamond, Jost, Parisienne } from "next/font/google";

// Self-hosted via next/font instead of a <link> to fonts.googleapis.com —
// the browser never contacts Google directly, so no visitor IP is sent to
// Google on every page load (a real GDPR exposure for German visitors that
// a live Google Fonts CDN link creates; self-hosting removes it entirely
// rather than just disclosing it in the privacy policy).
export const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800", "900"],
  variable: "--font-playfair-display",
  display: "swap",
});

export const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant-garamond",
  display: "swap",
});

export const jost = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-jost",
  display: "swap",
});

export const parisienne = Parisienne({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-parisienne",
  display: "swap",
});

export const fontVariables = `${playfairDisplay.variable} ${cormorantGaramond.variable} ${jost.variable} ${parisienne.variable}`;
