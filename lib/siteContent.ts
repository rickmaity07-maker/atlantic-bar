import { PHOTOS } from "@/lib/images";

export const SITE_IMAGE_DEFAULTS = {
  // 3D intro world
  introFrame1: PHOTOS.cocktailOlives,
  introFrame2: PHOTOS.pendantLamps,
  introFrame3: PHOTOS.redChairs,
  introFrame4: PHOTOS.whiskeyWoodTable,
  introFrame5: PHOTOS.fireplaceLounge,
  introFrame6: PHOTOS.cigarFire,
  introFrame7: PHOTOS.heroPour,

  // Main website sections
  hero: PHOTOS.heroPour,
  about: PHOTOS.barFloor,
  cocktails1: PHOTOS.heroPour,
  cocktails2: PHOTOS.whiskeyIce,
  cocktails3: PHOTOS.whiskeyOrange,
  nights: PHOTOS.fireplaceLounge,
  testimonials: PHOTOS.redChairs,
  reservation: PHOTOS.cigarFire,
  spielzeug1: PHOTOS.barFloor,
  spielzeug2: PHOTOS.cigarFire,
  spielzeug3: PHOTOS.fireplaceLounge,
  spielzeug4: PHOTOS.pendantLamps,
  spielzeug5: PHOTOS.whiskeyWhiteTable,
  spielzeug6: PHOTOS.whiskeyWood2,
  spielzeug7: PHOTOS.whiskeyWoodTable,
} as const;

export type SiteImageKey = keyof typeof SITE_IMAGE_DEFAULTS;
export type SiteImages = Record<SiteImageKey, string>;

export const SITE_IMAGE_LABELS: Record<SiteImageKey, string> = {
  introFrame1: "3D World — Frame 1",
  introFrame2: "3D World — Frame 2",
  introFrame3: "3D World — Frame 3",
  introFrame4: "3D World — Frame 4",
  introFrame5: "3D World — Frame 5",
  introFrame6: "3D World — Frame 6",
  introFrame7: "3D World — Frame 7",
  hero: "Hero section",
  about: "About section",
  cocktails1: "Cocktails — image 1",
  cocktails2: "Cocktails — image 2",
  cocktails3: "Cocktails — image 3",
  nights: "Nights section",
  testimonials: "Testimonials section",
  reservation: "Reservation section",
  spielzeug1: "Spielzeug — image 1",
  spielzeug2: "Spielzeug — image 2",
  spielzeug3: "Spielzeug — image 3",
  spielzeug4: "Spielzeug — image 4",
  spielzeug5: "Spielzeug — image 5",
  spielzeug6: "Spielzeug — image 6",
  spielzeug7: "Spielzeug — image 7",
};
