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
"[project]/app/api/site-content/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {
__turbopack_context__.s([
    "GET",
    ()=>GET,
    "PUT",
    ()=>PUT,
    "dynamic",
    ()=>dynamic
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebaseAdmin$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/firebaseAdmin.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$siteContent$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/siteContent.ts [app-route] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebaseAdmin$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebaseAdmin$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
const dynamic = "force-dynamic";
async function GET() {
    const snap = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebaseAdmin$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getDb"])().collection("siteContent").get();
    const images = {
        ...__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$siteContent$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SITE_IMAGE_DEFAULTS"]
    };
    for (const doc of snap.docs){
        const data = doc.data();
        if (typeof data.imageUrl === "string" && data.imageUrl.trim()) {
            images[doc.id] = data.imageUrl;
        }
    }
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        images
    });
}
async function PUT(req) {
    // Public reads are fine; writes are never accepted here.
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        error: "Use the admin image endpoint."
    }, {
        status: 405
    });
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
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
"[project]/lib/siteContent.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SITE_IMAGE_DEFAULTS",
    ()=>SITE_IMAGE_DEFAULTS,
    "SITE_IMAGE_LABELS",
    ()=>SITE_IMAGE_LABELS
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$images$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/images.ts [app-route] (ecmascript)");
;
const SITE_IMAGE_DEFAULTS = {
    // 3D intro world
    introFrame1: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$images$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PHOTOS"].cocktailOlives,
    introFrame2: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$images$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PHOTOS"].pendantLamps,
    introFrame3: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$images$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PHOTOS"].redChairs,
    introFrame4: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$images$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PHOTOS"].whiskeyWoodTable,
    introFrame5: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$images$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PHOTOS"].fireplaceLounge,
    introFrame6: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$images$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PHOTOS"].cigarFire,
    introFrame7: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$images$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PHOTOS"].heroPour,
    // Main website sections
    hero: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$images$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PHOTOS"].heroPour,
    about: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$images$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PHOTOS"].barFloor,
    cocktails1: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$images$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PHOTOS"].heroPour,
    cocktails2: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$images$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PHOTOS"].whiskeyIce,
    cocktails3: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$images$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PHOTOS"].whiskeyOrange,
    nights: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$images$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PHOTOS"].fireplaceLounge,
    testimonials: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$images$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PHOTOS"].redChairs,
    reservation: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$images$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PHOTOS"].cigarFire,
    spielzeug1: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$images$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PHOTOS"].barFloor,
    spielzeug2: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$images$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PHOTOS"].cigarFire,
    spielzeug3: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$images$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PHOTOS"].fireplaceLounge,
    spielzeug4: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$images$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PHOTOS"].pendantLamps,
    spielzeug5: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$images$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PHOTOS"].whiskeyWhiteTable,
    spielzeug6: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$images$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PHOTOS"].whiskeyWood2,
    spielzeug7: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$images$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PHOTOS"].whiskeyWoodTable
};
const SITE_IMAGE_LABELS = {
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
    spielzeug7: "Spielzeug — image 7"
};
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__0_1t5kz._.js.map