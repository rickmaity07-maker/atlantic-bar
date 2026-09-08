module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/runtime-reacts.external.js [external] (next/dist/server/runtime-reacts.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/runtime-reacts.external.js", () => require("next/dist/server/runtime-reacts.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/node:stream [external] (node:stream, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("node:stream", () => require("node:stream"));

module.exports = mod;
}),
"[project]/app/api/menu/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {
__turbopack_context__.s([
    "GET",
    ()=>GET
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebaseAdmin$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/firebaseAdmin.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$defaultMenu$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/defaultMenu.ts [app-route] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebaseAdmin$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebaseAdmin$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
const CATEGORIES = [
    "signature",
    "classics",
    "spirits",
    "wine",
    "champagne",
    "nonAlcoholic",
    "barSnacks"
];
function slug(value) {
    return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}
function key(category, name) {
    return `${slug(category)}-${slug(name)}`;
}
async function GET() {
    const snap = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebaseAdmin$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getDb"])().collection("menuItems").get();
    const overrides = new Map(snap.docs.map((doc)=>[
            doc.id,
            {
                id: doc.id,
                ...doc.data()
            }
        ]));
    const items = [];
    for (const category of CATEGORIES){
        for (const [index, base] of __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$defaultMenu$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["DEFAULT_ITEMS"][category].entries()){
            const id = key(category, base.name);
            const override = overrides.get(id);
            if (override?.hidden === true) continue;
            items.push({
                id,
                category,
                name: override?.name ?? base.name,
                note: override?.note ?? base.note,
                price: override?.price ?? base.price,
                imageUrl: override?.imageUrl ?? base.imageUrl,
                order: Number(override?.order ?? index)
            });
            overrides.delete(id);
        }
    }
    // Items created by the admin that were not part of the original hard-coded menu.
    for (const [id, item] of overrides){
        if (item.hidden === true) continue;
        items.push({
            id,
            category: CATEGORIES.includes(item.category) ? item.category : "signature",
            name: item.name ?? "",
            note: item.note ?? "",
            price: item.price ?? "",
            imageUrl: item.imageUrl ?? "",
            order: Number(item.order ?? 999)
        });
    }
    items.sort((a, b)=>{
        const ca = CATEGORIES.indexOf(a.category);
        const cb = CATEGORIES.indexOf(b.category);
        return ca - cb || Number(a.order) - Number(b.order);
    });
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        items
    });
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/lib/defaultMenu.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DEFAULT_ITEMS",
    ()=>DEFAULT_ITEMS
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$images$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/images.ts [app-route] (ecmascript)");
;
const DEFAULT_ITEMS = {
    signature: [
        {
            name: "Gilded Old Fashioned",
            note: "Bourbon, bitters, torched orange oil, single ice sphere.",
            price: "18",
            imageUrl: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$images$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PHOTOS"].whiskeyIce
        },
        {
            name: "Atlantic Amber",
            note: "Aged rum, honey, smoked cinnamon, a slow amber pour.",
            price: "20",
            imageUrl: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$images$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PHOTOS"].heroPour
        },
        {
            name: "Velvet Negroni",
            note: "Barrel-rested gin, sweet vermouth, bitter orange peel.",
            price: "19",
            imageUrl: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$images$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PHOTOS"].whiskeyOrange
        },
        {
            name: "Midnight Sour",
            note: "Rye whiskey, blackberry, lemon, egg white, absinthe mist.",
            price: "21",
            imageUrl: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$images$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PHOTOS"].whiskeyBrown
        },
        {
            name: "Golden Hour",
            note: "Tequila, mango, lime, chili salt rim.",
            price: "18",
            imageUrl: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$images$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PHOTOS"].cocktailOlives
        },
        {
            name: "Obsidian Martini",
            note: "Vodka, black olive brine, lemon twist.",
            price: "22",
            imageUrl: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$images$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PHOTOS"].whiskeyWhiteTable
        }
    ],
    classics: [
        {
            name: "Classic Martini",
            note: "Gin or vodka, dry vermouth, olive or twist.",
            price: "18",
            imageUrl: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$images$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PHOTOS"].whiskeyWhiteTable
        },
        {
            name: "Manhattan",
            note: "Rye, sweet vermouth, angostura, cherry.",
            price: "19",
            imageUrl: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$images$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PHOTOS"].whiskeyBrown
        },
        {
            name: "Daiquiri",
            note: "White rum, lime, simple syrup.",
            price: "16",
            imageUrl: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$images$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PHOTOS"].cocktailOlives
        },
        {
            name: "Old Fashioned",
            note: "Bourbon, sugar, bitters, orange peel.",
            price: "17",
            imageUrl: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$images$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PHOTOS"].whiskeyIce
        },
        {
            name: "Negroni",
            note: "Gin, Campari, sweet vermouth, orange peel.",
            price: "18",
            imageUrl: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$images$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PHOTOS"].whiskeyOrange
        },
        {
            name: "Margarita",
            note: "Tequila, Cointreau, lime, salt rim.",
            price: "17",
            imageUrl: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$images$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PHOTOS"].heroPour
        }
    ],
    spirits: [
        {
            name: "Macallan 18",
            note: "Sherry oak, dried fruit, spice, long finish.",
            price: "45",
            imageUrl: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$images$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PHOTOS"].whiskeyWoodTable
        },
        {
            name: "Yamazaki 12",
            note: "Japanese single malt, honey, coconut, cinnamon.",
            price: "38",
            imageUrl: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$images$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PHOTOS"].whiskeyWood2
        },
        {
            name: "Ron Zacapa 23",
            note: "Guatemalan rum, vanilla, caramel, oak.",
            price: "22",
            imageUrl: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$images$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PHOTOS"].whiskeyBrown
        },
        {
            name: "Clase Azul Reposado",
            note: "Tequila, agave, vanilla, caramel.",
            price: "35",
            imageUrl: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$images$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PHOTOS"].whiskeyWhiteTable
        },
        {
            name: "Hendrick's Gin",
            note: "Cucumber, rose, juniper, floral.",
            price: "16",
            imageUrl: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$images$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PHOTOS"].cocktailOlives
        },
        {
            name: "Mezcal Vida",
            note: "Espadin agave, smoke, citrus, pepper.",
            price: "18",
            imageUrl: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$images$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PHOTOS"].whiskeyWoodTable
        }
    ],
    wine: [
        {
            name: "Châteauneuf-du-Pape",
            note: "Grenache blend, dark fruit, garrigue, structured.",
            price: "95",
            imageUrl: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$images$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PHOTOS"].whiskeyBrown
        },
        {
            name: "Burgundy Pinot Noir",
            note: "Red cherry, earth, silk, elegant.",
            price: "120",
            imageUrl: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$images$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PHOTOS"].whiskeyWood2
        },
        {
            name: "Napa Cabernet",
            note: "Blackcurrant, cedar, vanilla, bold.",
            price: "85",
            imageUrl: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$images$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PHOTOS"].whiskeyWoodTable
        },
        {
            name: "Chablis Grand Cru",
            note: "Green apple, chalk, citrus, precise.",
            price: "110",
            imageUrl: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$images$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PHOTOS"].whiskeyWhiteTable
        },
        {
            name: "Riesling Spätlese",
            note: "Peach, honey, petrol, balanced sweetness.",
            price: "75",
            imageUrl: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$images$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PHOTOS"].whiskeyWhiteTable
        },
        {
            name: "Champagne Brut",
            note: "Brioche, lemon, fine bubbles, crisp.",
            price: "140",
            imageUrl: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$images$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PHOTOS"].heroPour
        }
    ],
    champagne: [
        {
            name: "Dom Pérignon 2013",
            note: "Toast, citrus, white flower, mineral.",
            price: "380",
            imageUrl: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$images$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PHOTOS"].heroPour
        },
        {
            name: "Krug Grande Cuvée",
            note: "Hazelnut, brioche, apple, endless finish.",
            price: "420",
            imageUrl: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$images$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PHOTOS"].whiskeyWhiteTable
        },
        {
            name: "Veuve Clicquot Rosé",
            note: "Red berry, brioche, elegant pink.",
            price: "160",
            imageUrl: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$images$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PHOTOS"].whiskeyOrange
        },
        {
            name: "Ruinart Blanc de Blancs",
            note: "Chardonnay, citrus, chalk, finesse.",
            price: "180",
            imageUrl: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$images$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PHOTOS"].whiskeyWhiteTable
        },
        {
            name: "Billecart-Salmon Rosé",
            note: "Strawberry, citrus, delicate mousse.",
            price: "170",
            imageUrl: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$images$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PHOTOS"].whiskeyOrange
        },
        {
            name: "Pol Roger Reserve",
            note: "Apple, honey, almond, classic.",
            price: "130",
            imageUrl: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$images$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PHOTOS"].heroPour
        }
    ],
    nonAlcoholic: [
        {
            name: "Virgin Gilded",
            note: "Non-alc bourbon, bitters, orange, ice sphere.",
            price: "12",
            imageUrl: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$images$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PHOTOS"].whiskeyIce
        },
        {
            name: "Amber Zero",
            note: "Non-alc rum, honey, cinnamon, amber pour.",
            price: "13",
            imageUrl: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$images$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PHOTOS"].heroPour
        },
        {
            name: "Botanical Spritz",
            note: "Non-alc aperitif, tonic, orange, herbs.",
            price: "11",
            imageUrl: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$images$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PHOTOS"].cocktailOlives
        },
        {
            name: "Velvet Zero",
            note: "Non-alc gin, vermouth, orange, bitter.",
            price: "12",
            imageUrl: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$images$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PHOTOS"].whiskeyOrange
        },
        {
            name: "Golden Fizz",
            note: "Mango, lime, chili, soda, salt rim.",
            price: "10",
            imageUrl: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$images$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PHOTOS"].whiskeyBrown
        },
        {
            name: "Obsidian Tonic",
            note: "Activated charcoal, lime, tonic.",
            price: "11",
            imageUrl: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$images$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PHOTOS"].whiskeyWhiteTable
        }
    ],
    barSnacks: [
        {
            name: "Marinated Olives",
            note: "Castelvetrano, herbs, citrus, garlic.",
            price: "8",
            imageUrl: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$images$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PHOTOS"].cocktailOlives
        },
        {
            name: "Truffle Nuts",
            note: "Mixed nuts, black truffle, sea salt.",
            price: "10",
            imageUrl: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$images$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PHOTOS"].whiskeyWoodTable
        },
        {
            name: "Charcuterie Board",
            note: "Cured meats, cornichons, mustard, bread.",
            price: "28",
            imageUrl: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$images$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PHOTOS"].drinksTable
        },
        {
            name: "Cheese Selection",
            note: "Three cheeses, honey, nuts, crackers.",
            price: "24",
            imageUrl: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$images$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PHOTOS"].woodenTable
        },
        {
            name: "Oysters (6)",
            note: "Fresh, mignonette, lemon.",
            price: "32",
            imageUrl: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$images$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PHOTOS"].whiskeyWhiteTable
        },
        {
            name: "Dark Chocolate",
            note: "70% cacao, sea salt, gold leaf.",
            price: "12",
            imageUrl: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$images$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PHOTOS"].cigarFire
        }
    ]
};
}),
"[project]/lib/firebaseAdmin.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {
__turbopack_context__.s([
    "getAdminApp",
    ()=>getAdminApp,
    "getAdminAuth",
    ()=>getAdminAuth,
    "getDb",
    ()=>getDb
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin$2f$app__$5b$external$5d$__$28$firebase$2d$admin$2f$app$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$firebase$2d$admin$29$__ = __turbopack_context__.i("[externals]/firebase-admin/app [external] (firebase-admin/app, esm_import, [project]/node_modules/firebase-admin)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin$2f$firestore__$5b$external$5d$__$28$firebase$2d$admin$2f$firestore$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$firebase$2d$admin$29$__ = __turbopack_context__.i("[externals]/firebase-admin/firestore [external] (firebase-admin/firestore, esm_import, [project]/node_modules/firebase-admin)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin$2f$auth__$5b$external$5d$__$28$firebase$2d$admin$2f$auth$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$firebase$2d$admin$29$__ = __turbopack_context__.i("[externals]/firebase-admin/auth [external] (firebase-admin/auth, esm_import, [project]/node_modules/firebase-admin)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin$2f$app__$5b$external$5d$__$28$firebase$2d$admin$2f$app$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$firebase$2d$admin$29$__,
    __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin$2f$firestore__$5b$external$5d$__$28$firebase$2d$admin$2f$firestore$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$firebase$2d$admin$29$__,
    __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin$2f$auth__$5b$external$5d$__$28$firebase$2d$admin$2f$auth$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$firebase$2d$admin$29$__
]);
[__TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin$2f$app__$5b$external$5d$__$28$firebase$2d$admin$2f$app$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$firebase$2d$admin$29$__, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin$2f$firestore__$5b$external$5d$__$28$firebase$2d$admin$2f$firestore$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$firebase$2d$admin$29$__, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin$2f$auth__$5b$external$5d$__$28$firebase$2d$admin$2f$auth$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$firebase$2d$admin$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
function getAdminApp() {
    const existing = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin$2f$app__$5b$external$5d$__$28$firebase$2d$admin$2f$app$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$firebase$2d$admin$29$__["getApps"])();
    if (existing.length > 0) return existing[0];
    const projectId = process.env.FIREBASE_PROJECT_ID;
    const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
    // Vercel/most env UIs escape newlines in multi-line secrets as literal "\n"
    const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");
    if (!projectId || !clientEmail || !privateKey) {
        throw new Error("Missing Firebase Admin env vars. Set FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, and FIREBASE_PRIVATE_KEY.");
    }
    return (0, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin$2f$app__$5b$external$5d$__$28$firebase$2d$admin$2f$app$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$firebase$2d$admin$29$__["initializeApp"])({
        credential: (0, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin$2f$app__$5b$external$5d$__$28$firebase$2d$admin$2f$app$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$firebase$2d$admin$29$__["cert"])({
            projectId,
            clientEmail,
            privateKey
        })
    });
}
function getDb() {
    return (0, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin$2f$firestore__$5b$external$5d$__$28$firebase$2d$admin$2f$firestore$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$firebase$2d$admin$29$__["getFirestore"])(getAdminApp());
}
function getAdminAuth() {
    return (0, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2d$admin$2f$auth__$5b$external$5d$__$28$firebase$2d$admin$2f$auth$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$firebase$2d$admin$29$__["getAuth"])(getAdminApp());
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/lib/images.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PHOTOS",
    ()=>PHOTOS
]);
// Real photography sourced from Unsplash — no illustrations or placeholders.
// Each entry maps to a stable Unsplash CDN asset.
// Using smaller width (1200) to prevent timeout during Next.js image optimization.
const u = (id, w = 1200)=>`https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;
const PHOTOS = {
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
    whiskeyWood2: u("photo-1695057672316-7efe5b856ab0")
};
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__1gvamql._.js.map