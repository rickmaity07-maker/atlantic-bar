(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/app/context/AuthContext.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AuthProvider",
    ()=>AuthProvider,
    "useAuth",
    ()=>useAuth
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2f$auth$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/firebase/auth/dist/esm/index.esm.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$esm2017$2f$index$2d$35c79a8a$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__z__as__onAuthStateChanged$3e$__ = __turbopack_context__.i("[project]/node_modules/@firebase/auth/dist/esm2017/index-35c79a8a.js [app-client] (ecmascript) <export z as onAuthStateChanged>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$esm2017$2f$index$2d$35c79a8a$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__signOut$3e$__ = __turbopack_context__.i("[project]/node_modules/@firebase/auth/dist/esm2017/index-35c79a8a.js [app-client] (ecmascript) <export D as signOut>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebaseClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/firebaseClient.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
;
;
const AuthContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])({
    user: null,
    profile: null,
    loading: true,
    isAdmin: false,
    needsPhoneVerification: false,
    refreshProfile: async ()=>{},
    signOut: async ()=>{}
});
function AuthProvider({ children }) {
    _s();
    const [user, setUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [profile, setProfile] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const fetchProfile = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AuthProvider.useCallback[fetchProfile]": async ()=>{
            try {
                const res = await fetch("/api/me", {
                    cache: "no-store"
                });
                const data = await res.json();
                setProfile(data.user ? {
                    role: data.user.role,
                    phoneVerified: data.user.phoneVerified
                } : null);
            } catch  {
                setProfile(null);
            }
        }
    }["AuthProvider.useCallback[fetchProfile]"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AuthProvider.useEffect": ()=>{
            const unsubscribe = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$esm2017$2f$index$2d$35c79a8a$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__z__as__onAuthStateChanged$3e$__["onAuthStateChanged"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebaseClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getClientAuth"])(), {
                "AuthProvider.useEffect.unsubscribe": async (currentUser)=>{
                    setUser(currentUser);
                    if (currentUser) {
                        await fetchProfile();
                    } else {
                        setProfile(null);
                    }
                    setLoading(false);
                }
            }["AuthProvider.useEffect.unsubscribe"]);
            return unsubscribe;
        }
    }["AuthProvider.useEffect"], [
        fetchProfile
    ]);
    async function signOut() {
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$esm2017$2f$index$2d$35c79a8a$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__signOut$3e$__["signOut"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebaseClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getClientAuth"])());
        await fetch("/api/auth/session", {
            method: "DELETE"
        });
        setUser(null);
        setProfile(null);
    }
    const isOAuthOnly = !!user && user.providerData.every((p)=>p.providerId !== "password");
    const phoneConfirmed = profile?.phoneVerified ?? Boolean(user?.phoneNumber);
    const needsPhoneVerification = isOAuthOnly && !phoneConfirmed;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AuthContext.Provider, {
        value: {
            user,
            profile,
            loading,
            isAdmin: profile?.role === "admin",
            needsPhoneVerification,
            refreshProfile: fetchProfile,
            signOut
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/app/context/AuthContext.tsx",
        lineNumber: 75,
        columnNumber: 5
    }, this);
}
_s(AuthProvider, "AGZo6K2Y7Wq9bxakpee3N7ZWcOc=");
_c = AuthProvider;
const useAuth = ()=>{
    _s1();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(AuthContext);
};
_s1(useAuth, "gDsCjeeItUuvgOWf1v4qoK9RF6k=");
var _c;
__turbopack_context__.k.register(_c, "AuthProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/context/LanguageContext.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LanguageProvider",
    ()=>LanguageProvider,
    "useLanguage",
    ()=>useLanguage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$translations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/translations.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
;
const STORAGE_KEY = "atlantic-lounge-locale";
const LanguageContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])({
    locale: "de",
    setLocale: ()=>{},
    toggleLocale: ()=>{},
    t: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$translations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["translations"].de
});
function LanguageProvider({ children }) {
    _s();
    // German is the default/primary language, English is secondary.
    const [locale, setLocaleState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("de");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "LanguageProvider.useEffect": ()=>{
            const saved = window.localStorage.getItem(STORAGE_KEY);
            if (saved === "de" || saved === "en") setLocaleState(saved);
        }
    }["LanguageProvider.useEffect"], []);
    function setLocale(l) {
        setLocaleState(l);
        window.localStorage.setItem(STORAGE_KEY, l);
        document.documentElement.lang = l;
    }
    function toggleLocale() {
        setLocale(locale === "de" ? "en" : "de");
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(LanguageContext.Provider, {
        value: {
            locale,
            setLocale,
            toggleLocale,
            t: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$translations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["translations"][locale]
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/app/context/LanguageContext.tsx",
        lineNumber: 43,
        columnNumber: 5
    }, this);
}
_s(LanguageProvider, "pYuRVvrSxUzEkdBDhL1KFUwmGxk=");
_c = LanguageProvider;
const useLanguage = ()=>{
    _s1();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(LanguageContext);
};
_s1(useLanguage, "gDsCjeeItUuvgOWf1v4qoK9RF6k=");
var _c;
__turbopack_context__.k.register(_c, "LanguageProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/firebaseClient.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getClientAuth",
    ()=>getClientAuth,
    "newFacebookProvider",
    ()=>newFacebookProvider,
    "newGoogleProvider",
    ()=>newGoogleProvider
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2f$app$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/firebase/app/dist/esm/index.esm.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$app$2f$dist$2f$esm$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@firebase/app/dist/esm/index.esm2017.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2f$auth$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/firebase/auth/dist/esm/index.esm.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$esm2017$2f$index$2d$35c79a8a$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__p__as__getAuth$3e$__ = __turbopack_context__.i("[project]/node_modules/@firebase/auth/dist/esm2017/index-35c79a8a.js [app-client] (ecmascript) <export p as getAuth>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$esm2017$2f$index$2d$35c79a8a$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__Y__as__GoogleAuthProvider$3e$__ = __turbopack_context__.i("[project]/node_modules/@firebase/auth/dist/esm2017/index-35c79a8a.js [app-client] (ecmascript) <export Y as GoogleAuthProvider>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$esm2017$2f$index$2d$35c79a8a$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__X__as__FacebookAuthProvider$3e$__ = __turbopack_context__.i("[project]/node_modules/@firebase/auth/dist/esm2017/index-35c79a8a.js [app-client] (ecmascript) <export X as FacebookAuthProvider>");
"use client";
;
;
// This config is safe to expose in the browser — it identifies the Firebase
// project, it doesn't grant access on its own. Actual access control happens
// server-side: the admin allowlist in lib/adminAuth.ts and Firestore's
// deny-all rules for everything except the Admin SDK.
const firebaseConfig = {
    apiKey: ("TURBOPACK compile-time value", "AIzaSyDIEIhJJEoQMmWrO2XnBzFI1B1gO-QTI_k"),
    authDomain: ("TURBOPACK compile-time value", "atlantic-bar-863ce.firebaseapp.com"),
    projectId: ("TURBOPACK compile-time value", "atlantic-bar-863ce"),
    appId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_FIREBASE_APP_ID
};
let app = null;
let authInstance = null;
function getClientAuth() {
    if (!authInstance) {
        if (!firebaseConfig.apiKey) {
            throw new Error("Firebase client config is missing. Set NEXT_PUBLIC_FIREBASE_* env vars.");
        }
        app = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$app$2f$dist$2f$esm$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getApps"])().length ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$app$2f$dist$2f$esm$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getApps"])()[0] : (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$app$2f$dist$2f$esm$2f$index$2e$esm2017$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["initializeApp"])(firebaseConfig);
        authInstance = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$esm2017$2f$index$2d$35c79a8a$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__p__as__getAuth$3e$__["getAuth"])(app);
    }
    return authInstance;
}
function newGoogleProvider() {
    return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$esm2017$2f$index$2d$35c79a8a$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__Y__as__GoogleAuthProvider$3e$__["GoogleAuthProvider"]();
}
function newFacebookProvider() {
    return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$esm2017$2f$index$2d$35c79a8a$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__X__as__FacebookAuthProvider$3e$__["FacebookAuthProvider"]();
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/translations.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "translations",
    ()=>translations
]);
const de = {
    nav: {
        about: "Über uns",
        cocktails: "Cocktails",
        gallery: "Galerie",
        nights: "Abende",
        reserve: "Reservieren",
        menu: "Speisekarte",
        spielzeug: "Spielzeug",
        more: "Mehr",
        admin: "Admin",
        signOut: "Abmelden",
        signIn: "Anmelden"
    },
    hero: {
        subtitleBar: "Bar",
        tagline: "Luxuriöses Ambiente & Premium-Abende",
        reserveBtn: "Tisch reservieren",
        discoverBtn: "Die Lounge entdecken",
        scroll: "Scrollen"
    },
    about: {
        eyebrow: "Unsere Geschichte",
        titlePre: "Ein Rückzugsort",
        titleHighlight: "nach Einbruch der Dunkelheit",
        description: "Hinter einer unauffälligen Tür gelegen, wurde die Atlantic Lounge Bar für lange Gespräche und langsam servierte Drinks geschaffen. Messingbeschläge fangen das Kerzenlicht ein, die Vinylmusik läuft leise und warm, und jeder Sitzplatz ist nah genug, um den Shaker zu hören, aber weit genug entfernt, um Ihre Geheimnisse zu wahren. Hier kommt die Stadt zur Ruhe.",
        est: "Gegr.",
        statYearsLabel: "Jahre im Ausschank",
        statPoursLabel: "Signature Drinks",
        statSeatsLabel: "Samtene Sitzplätze"
    },
    cocktails: {
        eyebrow: "Handgemacht",
        title: "Signature Drinks",
        seeMore: "Mehr anzeigen"
    },
    gallery: {
        eyebrow: "Im Inneren",
        title: "Galerie"
    },
    menu: {
        eyebrow: "Unsere Karte",
        title: "Vollständige Speisekarte",
        tabs: {
            signature: "Signature Drinks",
            classics: "Klassiker",
            spirits: "Spirituosen",
            wine: "Wein",
            champagne: "Champagner",
            nonAlcoholic: "Alkoholfrei",
            barSnacks: "Bar Snacks"
        }
    },
    spielzeug: {
        eyebrow: "Entdecken",
        title: "Spielzeug",
        description: "Eine kuratierte Auswahl besonderer Stücke — handverlesen für den neugierigen Gast.",
        exploreBtn: "Entdecken"
    },
    nights: {
        eyebrow: "Was läuft",
        title: "Premium-Abende",
        schedule: [
            {
                day: "Donnerstag",
                title: "Golden Hour Jazz",
                time: "19 — 22 Uhr"
            },
            {
                day: "Freitag",
                title: "Live-DJ · Deep House",
                time: "21 — 1 Uhr"
            },
            {
                day: "Samstag",
                title: "Premium-Abend",
                time: "21 — 2 Uhr"
            },
            {
                day: "Sonntag",
                title: "Velvet Sessions, Akustik",
                time: "18 — 21 Uhr"
            }
        ]
    },
    testimonials: [
        {
            text: "Jede Ecke leuchtet wie für einen Film beleuchtet. Allein der Old Fashioned ist den Besuch wert.",
            author: "— Condé Nast Traveller"
        },
        {
            text: "Die Art von Raum, um den man einen ganzen Abend plant. Langsam, golden, unvergesslich.",
            author: "— City Nightlife Guide"
        },
        {
            text: "Die Atlantic Lounge jagt keinen Trends hinterher — sie hat sich ihre eigene Stunde der Nacht geschaffen.",
            author: "— The Weekend Review"
        }
    ],
    reservation: {
        eyebrow: "Heute Abend dabei sein",
        title: "Reservieren Sie Ihren Tisch",
        description: "Plätze werden langsam vergeben. Sagen Sie uns, wann Sie ankommen möchten, und wir halten Ihre Ecke des Raums frei.",
        fields: {
            name: "Name",
            date: "Datum",
            guests: "Gäste"
        },
        namePlaceholder: "Ihr Name",
        submitIdle: "Tisch anfragen",
        submitSending: "Wird gesendet…",
        submitSent: "Tisch angefragt ✦",
        successMessage: "Ihre Tischanfrage wurde gesendet — wir bestätigen in Kürze.",
        signInPrompt: "Melden Sie sich an, um einen Tisch anzufragen — das sorgt für Fairness und hilft uns, Sie bei Änderungen zu erreichen.",
        signInBtn: "Anmelden zum Reservieren",
        verifyPrompt: "Fast geschafft — bestätigen Sie Ihre Telefonnummer, um Ihr Konto einzurichten.",
        verifyBtn: "Telefonnummer bestätigen",
        genericError: "Etwas ist schiefgelaufen.",
        pleaseSignIn: "Bitte melden Sie sich zuerst an."
    },
    footer: {
        tagline: "Luxuriöses Ambiente & Premium-Abende",
        hours: "Öffnungszeiten",
        hoursLines: [
            "Di — Mi · 18 — 24 Uhr",
            "Do — Sa · 18 — 2 Uhr",
            "So · 17 — 22 Uhr",
            "Mo · Geschlossen"
        ],
        visit: "Besuchen Sie uns",
        follow: "Folgen Sie uns",
        copyright: "Atlantic Lounge Bar. Design-Mockup — nur zu Demonstrationszwecken."
    },
    login: {
        title: "Anmelden",
        titleSignup: "Konto erstellen",
        subtitle: "Ein Login für alle — Gäste wie Team.",
        tabSignIn: "Anmelden",
        tabSignUp: "Registrieren",
        emailLabel: "E-Mail",
        passwordLabel: "Passwort",
        submitIdle: "Anmelden",
        submitSignup: "Konto erstellen",
        submitLoading: "Bitte warten…",
        or: "oder",
        googleBtn: "Mit Google fortfahren",
        facebookBtn: "Mit Facebook fortfahren",
        phoneNote: "Bei der Anmeldung mit Google oder Facebook bestätigen Sie anschließend Ihre Telefonnummer per SMS-Code, bevor Sie einen Tisch anfragen können.",
        errorEmailInUse: "Ein Konto mit dieser E-Mail existiert bereits — bitte stattdessen anmelden.",
        errorWrongCredentials: "Falsche E-Mail oder falsches Passwort.",
        errorWeakPassword: "Das Passwort sollte mindestens 6 Zeichen haben.",
        errorPopupClosed: "Die Anmeldung wurde abgebrochen.",
        errorGeneric: "Etwas ist schiefgelaufen. Bitte versuchen Sie es erneut.",
        errorSyncFailed: "Angemeldet, aber Ihr Profil konnte nicht synchronisiert werden. Bitte versuchen Sie es erneut."
    },
    verifyPhone: {
        title: "Telefonnummer bestätigen",
        subtitle: "Nur ein kurzer Schritt — wir senden Ihnen einen 6-stelligen Code per SMS, um zu bestätigen, dass Sie es wirklich sind.",
        phoneLabel: "Telefonnummer",
        phoneHint: "Bitte mit Ländervorwahl, z. B. +49 für Deutschland.",
        phonePlaceholder: "+49 151 23456789",
        sendBtn: "Code senden",
        sendingBtn: "Wird gesendet…",
        codeLabel: "6-stelliger Code",
        confirmBtn: "Code bestätigen",
        confirmingBtn: "Wird bestätigt…",
        errorNotSignedIn: "Nicht angemeldet.",
        errorVerifierNotReady: "Verifizierung nicht bereit — bitte erneut versuchen.",
        errorRequestCodeFirst: "Bitte zuerst einen Code anfordern.",
        errorOperationNotAllowed: "Die Telefonanmeldung ist für dieses Projekt noch nicht aktiviert — bitte den Administrator kontaktieren.",
        errorInvalidPhone: "Diese Telefonnummer scheint ungültig zu sein — bitte mit Ländervorwahl angeben, z. B. +49 151 23456789.",
        errorBilling: "SMS-Codes erfordern ein aktiviertes Abrechnungskonto — bitte den Administrator kontaktieren.",
        errorTooManyRequests: "Zu viele Versuche — bitte einige Minuten warten und erneut versuchen.",
        errorCaptcha: "Verifizierung fehlgeschlagen — bitte Seite neu laden und erneut versuchen.",
        errorInvalidCode: "Der Code stimmt nicht überein — bitte SMS prüfen und erneut versuchen.",
        errorCodeExpired: "Der Code ist abgelaufen — bitte einen neuen anfordern.",
        errorAlreadyInUse: "Diese Telefonnummer ist bereits mit einem anderen Konto verknüpft.",
        errorGeneric: "Etwas ist schiefgelaufen."
    },
    intro: {
        walkTheRoom: "Den Raum erkunden",
        scrollToEnter: "Scrollen zum Betreten",
        dragToLook: "Ziehen zum Umschauen",
        skipIntro: "Intro überspringen →"
    }
};
const en = {
    nav: {
        about: "About",
        cocktails: "Cocktails",
        gallery: "Gallery",
        nights: "Nights",
        reserve: "Reserve",
        menu: "Menu",
        spielzeug: "Spielzeug",
        more: "More",
        admin: "Admin",
        signOut: "Sign Out",
        signIn: "Sign In"
    },
    hero: {
        subtitleBar: "Bar",
        tagline: "Luxury Vibes & Premium Nights",
        reserveBtn: "Reserve a Table",
        discoverBtn: "Discover the Lounge",
        scroll: "Scroll"
    },
    about: {
        eyebrow: "Our Story",
        titlePre: "A Sanctuary",
        titleHighlight: "After Dark",
        description: "Tucked behind an unmarked door, Atlantic Lounge Bar was built for long conversations and slow-poured drinks. Brass fixtures catch the candlelight, the vinyl runs low and warm, and every seat is close enough to hear the shaker but far enough to keep your secrets. This is where the city comes to be still.",
        est: "Est.",
        statYearsLabel: "Years Pouring",
        statPoursLabel: "Signature Pours",
        statSeatsLabel: "Seats of Velvet"
    },
    cocktails: {
        eyebrow: "Handcrafted",
        title: "Signature Pours",
        seeMore: "See More"
    },
    gallery: {
        eyebrow: "Inside the Room",
        title: "Gallery"
    },
    menu: {
        eyebrow: "Our Menu",
        title: "Full Menu",
        tabs: {
            signature: "Signature Drinks",
            classics: "Classics",
            spirits: "Spirits",
            wine: "Wine",
            champagne: "Champagne",
            nonAlcoholic: "Non-Alcoholic",
            barSnacks: "Bar Snacks"
        }
    },
    spielzeug: {
        eyebrow: "Discover",
        title: "Spielzeug",
        description: "A curated collection of exceptional pieces — handpicked for the curious guest.",
        exploreBtn: "Explore"
    },
    nights: {
        eyebrow: "What's On",
        title: "Premium Nights",
        schedule: [
            {
                day: "Thursday",
                title: "Golden Hour Jazz",
                time: "7 — 10 PM"
            },
            {
                day: "Friday",
                title: "Live DJ · Deep House",
                time: "9 PM — 1 AM"
            },
            {
                day: "Saturday",
                title: "Premium Nights",
                time: "9 PM — 2 AM"
            },
            {
                day: "Sunday",
                title: "Velvet Sessions, Acoustic",
                time: "6 — 9 PM"
            }
        ]
    },
    testimonials: [
        {
            text: "Every corner glows like it was lit for a film. The Old Fashioned alone is worth the door.",
            author: "— Condé Nast Traveller"
        },
        {
            text: "The kind of room you plan an entire evening around. Slow, golden, unforgettable.",
            author: "— City Nightlife Guide"
        },
        {
            text: "Atlantic Lounge doesn't chase trends — it built its own hour of the night.",
            author: "— The Weekend Review"
        }
    ],
    reservation: {
        eyebrow: "Join Us Tonight",
        title: "Reserve Your Table",
        description: "Seats are poured out slowly. Tell us when you'd like to arrive and we'll hold your corner of the room.",
        fields: {
            name: "Name",
            date: "Date",
            guests: "Guests"
        },
        namePlaceholder: "Your name",
        submitIdle: "Request Reservation",
        submitSending: "Sending…",
        submitSent: "Table Requested ✦",
        successMessage: "Your table request has been sent — we'll confirm shortly.",
        signInPrompt: "Sign in to request a table — it keeps things fair and helps us reach you if plans change.",
        signInBtn: "Sign In to Reserve",
        verifyPrompt: "Almost there — confirm your phone number to finish setting up your account.",
        verifyBtn: "Verify Phone Number",
        genericError: "Something went wrong.",
        pleaseSignIn: "Please sign in first."
    },
    footer: {
        tagline: "Luxury Vibes & Premium Nights",
        hours: "Hours",
        hoursLines: [
            "Tue — Wed · 6 PM – 12 AM",
            "Thu — Sat · 6 PM – 2 AM",
            "Sun · 5 PM – 10 PM",
            "Mon · Closed"
        ],
        visit: "Visit",
        follow: "Follow",
        copyright: "Atlantic Lounge Bar. Design mock — for demonstration purposes only."
    },
    login: {
        title: "Sign In",
        titleSignup: "Create Account",
        subtitle: "One login for everyone — guests and staff alike.",
        tabSignIn: "Sign In",
        tabSignUp: "Sign Up",
        emailLabel: "Email",
        passwordLabel: "Password",
        submitIdle: "Sign In",
        submitSignup: "Create Account",
        submitLoading: "Please wait…",
        or: "or",
        googleBtn: "Continue with Google",
        facebookBtn: "Continue with Facebook",
        phoneNote: "Signing in with Google or Facebook will ask you to confirm your phone number by SMS code before you can request a table.",
        errorEmailInUse: "An account with that email already exists — try signing in instead.",
        errorWrongCredentials: "Incorrect email or password.",
        errorWeakPassword: "Password should be at least 6 characters.",
        errorPopupClosed: "Sign-in was cancelled.",
        errorGeneric: "Something went wrong. Please try again.",
        errorSyncFailed: "Signed in, but couldn't sync your profile. Please try again."
    },
    verifyPhone: {
        title: "Confirm Your Phone",
        subtitle: "One quick step — we'll text you a 6-digit code to confirm it's really you before you can request a table.",
        phoneLabel: "Phone number",
        phoneHint: "Include the country code, e.g. +49 for Germany.",
        phonePlaceholder: "+49 151 23456789",
        sendBtn: "Send Code",
        sendingBtn: "Sending…",
        codeLabel: "6-digit code",
        confirmBtn: "Confirm Code",
        confirmingBtn: "Confirming…",
        errorNotSignedIn: "Not signed in.",
        errorVerifierNotReady: "Verifier not ready — refresh and try again.",
        errorRequestCodeFirst: "Request a code first.",
        errorOperationNotAllowed: "Phone sign-in isn't enabled for this project yet — please contact the administrator.",
        errorInvalidPhone: "That phone number doesn't look valid — include the country code, e.g. +49 151 23456789.",
        errorBilling: "SMS codes need billing enabled on this project — please contact the administrator.",
        errorTooManyRequests: "Too many attempts — please wait a few minutes and try again.",
        errorCaptcha: "Verification check failed — refresh the page and try again.",
        errorInvalidCode: "That code doesn't match — check the SMS and try again.",
        errorCodeExpired: "That code expired — request a new one.",
        errorAlreadyInUse: "That phone number is already linked to a different account.",
        errorGeneric: "Something went wrong."
    },
    intro: {
        walkTheRoom: "Walk the room",
        scrollToEnter: "Scroll to enter",
        dragToLook: "Drag to look around",
        skipIntro: "Skip Intro →"
    }
};
const translations = {
    de,
    en
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_0i7envs._.js.map