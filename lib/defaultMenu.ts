import { PHOTOS } from "@/lib/images";

export type MenuCategory =
  | "signature"
  | "classics"
  | "spirits"
  | "wine"
  | "champagne"
  | "nonAlcoholic"
  | "barSnacks";

export interface DefaultMenuItem {
  name: string;
  note: string;
  price: string;
  imageUrl: string;
}

export const DEFAULT_ITEMS: Record<MenuCategory, DefaultMenuItem[]> = {
  signature: [
    { name: "Gilded Old Fashioned", note: "Bourbon, bitters, torched orange oil, single ice sphere.", price: "18", imageUrl: PHOTOS.whiskeyIce },
    { name: "Atlantic Amber", note: "Aged rum, honey, smoked cinnamon, a slow amber pour.", price: "20", imageUrl: PHOTOS.heroPour },
    { name: "Velvet Negroni", note: "Barrel-rested gin, sweet vermouth, bitter orange peel.", price: "19", imageUrl: PHOTOS.whiskeyOrange },
    { name: "Midnight Sour", note: "Rye whiskey, blackberry, lemon, egg white, absinthe mist.", price: "21", imageUrl: PHOTOS.whiskeyBrown },
    { name: "Golden Hour", note: "Tequila, mango, lime, chili salt rim.", price: "18", imageUrl: PHOTOS.cocktailOlives },
    { name: "Obsidian Martini", note: "Vodka, black olive brine, lemon twist.", price: "22", imageUrl: PHOTOS.whiskeyWhiteTable },
  ],
  classics: [
    { name: "Classic Martini", note: "Gin or vodka, dry vermouth, olive or twist.", price: "18", imageUrl: PHOTOS.whiskeyWhiteTable },
    { name: "Manhattan", note: "Rye, sweet vermouth, angostura, cherry.", price: "19", imageUrl: PHOTOS.whiskeyBrown },
    { name: "Daiquiri", note: "White rum, lime, simple syrup.", price: "16", imageUrl: PHOTOS.cocktailOlives },
    { name: "Old Fashioned", note: "Bourbon, sugar, bitters, orange peel.", price: "17", imageUrl: PHOTOS.whiskeyIce },
    { name: "Negroni", note: "Gin, Campari, sweet vermouth, orange peel.", price: "18", imageUrl: PHOTOS.whiskeyOrange },
    { name: "Margarita", note: "Tequila, Cointreau, lime, salt rim.", price: "17", imageUrl: PHOTOS.heroPour },
  ],
  spirits: [
    { name: "Macallan 18", note: "Sherry oak, dried fruit, spice, long finish.", price: "45", imageUrl: PHOTOS.whiskeyWoodTable },
    { name: "Yamazaki 12", note: "Japanese single malt, honey, coconut, cinnamon.", price: "38", imageUrl: PHOTOS.whiskeyWood2 },
    { name: "Ron Zacapa 23", note: "Guatemalan rum, vanilla, caramel, oak.", price: "22", imageUrl: PHOTOS.whiskeyBrown },
    { name: "Clase Azul Reposado", note: "Tequila, agave, vanilla, caramel.", price: "35", imageUrl: PHOTOS.whiskeyWhiteTable },
    { name: "Hendrick's Gin", note: "Cucumber, rose, juniper, floral.", price: "16", imageUrl: PHOTOS.cocktailOlives },
    { name: "Mezcal Vida", note: "Espadin agave, smoke, citrus, pepper.", price: "18", imageUrl: PHOTOS.whiskeyWoodTable },
  ],
  wine: [
    { name: "Châteauneuf-du-Pape", note: "Grenache blend, dark fruit, garrigue, structured.", price: "95", imageUrl: PHOTOS.whiskeyBrown },
    { name: "Burgundy Pinot Noir", note: "Red cherry, earth, silk, elegant.", price: "120", imageUrl: PHOTOS.whiskeyWood2 },
    { name: "Napa Cabernet", note: "Blackcurrant, cedar, vanilla, bold.", price: "85", imageUrl: PHOTOS.whiskeyWoodTable },
    { name: "Chablis Grand Cru", note: "Green apple, chalk, citrus, precise.", price: "110", imageUrl: PHOTOS.whiskeyWhiteTable },
    { name: "Riesling Spätlese", note: "Peach, honey, petrol, balanced sweetness.", price: "75", imageUrl: PHOTOS.whiskeyWhiteTable },
    { name: "Champagne Brut", note: "Brioche, lemon, fine bubbles, crisp.", price: "140", imageUrl: PHOTOS.heroPour },
  ],
  champagne: [
    { name: "Dom Pérignon 2013", note: "Toast, citrus, white flower, mineral.", price: "380", imageUrl: PHOTOS.heroPour },
    { name: "Krug Grande Cuvée", note: "Hazelnut, brioche, apple, endless finish.", price: "420", imageUrl: PHOTOS.whiskeyWhiteTable },
    { name: "Veuve Clicquot Rosé", note: "Red berry, brioche, elegant pink.", price: "160", imageUrl: PHOTOS.whiskeyOrange },
    { name: "Ruinart Blanc de Blancs", note: "Chardonnay, citrus, chalk, finesse.", price: "180", imageUrl: PHOTOS.whiskeyWhiteTable },
    { name: "Billecart-Salmon Rosé", note: "Strawberry, citrus, delicate mousse.", price: "170", imageUrl: PHOTOS.whiskeyOrange },
    { name: "Pol Roger Reserve", note: "Apple, honey, almond, classic.", price: "130", imageUrl: PHOTOS.heroPour },
  ],
  nonAlcoholic: [
    { name: "Virgin Gilded", note: "Non-alc bourbon, bitters, orange, ice sphere.", price: "12", imageUrl: PHOTOS.whiskeyIce },
    { name: "Amber Zero", note: "Non-alc rum, honey, cinnamon, amber pour.", price: "13", imageUrl: PHOTOS.heroPour },
    { name: "Botanical Spritz", note: "Non-alc aperitif, tonic, orange, herbs.", price: "11", imageUrl: PHOTOS.cocktailOlives },
    { name: "Velvet Zero", note: "Non-alc gin, vermouth, orange, bitter.", price: "12", imageUrl: PHOTOS.whiskeyOrange },
    { name: "Golden Fizz", note: "Mango, lime, chili, soda, salt rim.", price: "10", imageUrl: PHOTOS.whiskeyBrown },
    { name: "Obsidian Tonic", note: "Activated charcoal, lime, tonic.", price: "11", imageUrl: PHOTOS.whiskeyWhiteTable },
  ],
  barSnacks: [
    { name: "Marinated Olives", note: "Castelvetrano, herbs, citrus, garlic.", price: "8", imageUrl: PHOTOS.cocktailOlives },
    { name: "Truffle Nuts", note: "Mixed nuts, black truffle, sea salt.", price: "10", imageUrl: PHOTOS.whiskeyWoodTable },
    { name: "Charcuterie Board", note: "Cured meats, cornichons, mustard, bread.", price: "28", imageUrl: PHOTOS.drinksTable },
    { name: "Cheese Selection", note: "Three cheeses, honey, nuts, crackers.", price: "24", imageUrl: PHOTOS.woodenTable },
    { name: "Oysters (6)", note: "Fresh, mignonette, lemon.", price: "32", imageUrl: PHOTOS.whiskeyWhiteTable },
    { name: "Dark Chocolate", note: "70% cacao, sea salt, gold leaf.", price: "12", imageUrl: PHOTOS.cigarFire },
  ],
};