// Real photography sourced from Unsplash — no illustrations or placeholders.
// Each entry maps to a stable Unsplash CDN asset.

const u = (id: string, w = 2400) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const PHOTOS = {
  heroPour: u("photo-1470337458703-46ad1756a187"),
  barFloor: u("photo-1711429526427-679eb0b2f156"),
  pendantLamps: u("photo-1572299448190-d7a84f6e6bc9"),
  redChairs: u("photo-1592494804071-faea15d93a8a"),
  emptyRoom: u("photo-1552566626-2d907dab0dff"),
  eatery: u("photo-1570560258879-af7f8e1447ac"),
  woodenTable: u("photo-1621275471769-e6aa344546d5"),
  drinksTable: u("photo-1702725365144-6e8584ea54e4"),
  chairsTables: u("photo-1582417746333-30354bba843e"),
  fireplaceLounge: u("photo-1679419857738-f8a7ca8c5de5"),
  cocktailOlives: u("photo-1500217052183-bc01eee1a74e"),
  whiskeyWhiteTable: u("photo-1615887023544-3a566f29d822"),
  whiskeyOrange: u("photo-1571104508999-893933ded431"),
  whiskeyIce: u("photo-1586734565008-fbdbc166fd6c"),
  whiskeyBrown: u("photo-1603596311111-b43c809e02a1"),
  whiskeyWoodTable: u("photo-1649640547107-6bf197e3a30f"),
  cigarFire: u("photo-1667928916119-2c2c5fe67b90"),
  whiskeyWood2: u("photo-1695057672316-7efe5b856ab0"),
} as const;
