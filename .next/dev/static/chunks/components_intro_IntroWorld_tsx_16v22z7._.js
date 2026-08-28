(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/components/intro/IntroWorld.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CORRIDOR_LENGTH",
    ()=>CORRIDOR_LENGTH,
    "default",
    ()=>IntroWorld
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$156d8d12$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__ = __turbopack_context__.i("[project]/node_modules/@react-three/fiber/dist/events-156d8d12.esm.js [app-client] (ecmascript) <export D as useFrame>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$156d8d12$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__C__as__useThree$3e$__ = __turbopack_context__.i("[project]/node_modules/@react-three/fiber/dist/events-156d8d12.esm.js [app-client] (ecmascript) <export C as useThree>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$Image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@react-three/drei/core/Image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$Sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@react-three/drei/core/Sparkles.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$Float$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@react-three/drei/core/Float.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$Text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@react-three/drei/core/Text.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$postprocessing$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@react-three/postprocessing/dist/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/three/build/three.core.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$images$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/images.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
/* eslint-disable react-hooks/immutability -- react-three-fiber's useFrame is designed to mutate the camera/object refs every frame; this is the idiomatic r3f pattern, not React state */ "use client";
;
;
;
;
;
;
const CORRIDOR_LENGTH = 46;
const FRAMES = [
    {
        url: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$images$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PHOTOS"].cocktailOlives,
        pos: [
            -4.6,
            0.4,
            -6
        ],
        rotY: 0.55,
        w: 3.1,
        h: 3.9
    },
    {
        url: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$images$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PHOTOS"].pendantLamps,
        pos: [
            4.6,
            -0.3,
            -11
        ],
        rotY: -0.55,
        w: 3.4,
        h: 2.6
    },
    {
        url: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$images$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PHOTOS"].redChairs,
        pos: [
            -5,
            0.2,
            -17
        ],
        rotY: 0.6,
        w: 3.6,
        h: 2.7
    },
    {
        url: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$images$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PHOTOS"].whiskeyWoodTable,
        pos: [
            4.8,
            0.6,
            -23
        ],
        rotY: -0.6,
        w: 3,
        h: 3.7
    },
    {
        url: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$images$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PHOTOS"].fireplaceLounge,
        pos: [
            -4.7,
            -0.2,
            -29
        ],
        rotY: 0.55,
        w: 3.8,
        h: 2.8
    },
    {
        url: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$images$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PHOTOS"].cigarFire,
        pos: [
            4.6,
            0.3,
            -35
        ],
        rotY: -0.55,
        w: 3,
        h: 3.6
    },
    {
        url: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$images$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PHOTOS"].heroPour,
        pos: [
            0,
            0.4,
            -41
        ],
        rotY: 0,
        w: 4.2,
        h: 3.1
    }
];
function FloorAndGuides() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                rotation: [
                    -Math.PI / 2,
                    0,
                    0
                ],
                position: [
                    0,
                    -2.1,
                    -CORRIDOR_LENGTH / 2
                ],
                receiveShadow: true,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("planeGeometry", {
                        args: [
                            26,
                            CORRIDOR_LENGTH + 20
                        ]
                    }, void 0, false, {
                        fileName: "[project]/components/intro/IntroWorld.tsx",
                        lineNumber: 27,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshStandardMaterial", {
                        color: "#0d0a06",
                        metalness: 0.75,
                        roughness: 0.28
                    }, void 0, false, {
                        fileName: "[project]/components/intro/IntroWorld.tsx",
                        lineNumber: 28,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/intro/IntroWorld.tsx",
                lineNumber: 26,
                columnNumber: 7
            }, this),
            Array.from({
                length: 10
            }).map((_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                    position: [
                        0,
                        -2.09,
                        -i * (CORRIDOR_LENGTH / 9)
                    ],
                    rotation: [
                        -Math.PI / 2,
                        0,
                        0
                    ],
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ringGeometry", {
                            args: [
                                0.02,
                                0.035,
                                32
                            ]
                        }, void 0, false, {
                            fileName: "[project]/components/intro/IntroWorld.tsx",
                            lineNumber: 32,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshBasicMaterial", {
                            color: "#c9a25a",
                            transparent: true,
                            opacity: 0.5
                        }, void 0, false, {
                            fileName: "[project]/components/intro/IntroWorld.tsx",
                            lineNumber: 33,
                            columnNumber: 11
                        }, this)
                    ]
                }, i, true, {
                    fileName: "[project]/components/intro/IntroWorld.tsx",
                    lineNumber: 31,
                    columnNumber: 9
                }, this))
        ]
    }, void 0, true, {
        fileName: "[project]/components/intro/IntroWorld.tsx",
        lineNumber: 25,
        columnNumber: 5
    }, this);
}
_c = FloorAndGuides;
function Frame({ url, pos, rotY, w, h }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$Float$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Float"], {
        speed: 1.1,
        rotationIntensity: 0.06,
        floatIntensity: 0.5,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("group", {
            position: pos,
            rotation: [
                0,
                rotY,
                0
            ],
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                    position: [
                        0,
                        0,
                        -0.05
                    ],
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("planeGeometry", {
                            args: [
                                w + 0.28,
                                h + 0.28
                            ]
                        }, void 0, false, {
                            fileName: "[project]/components/intro/IntroWorld.tsx",
                            lineNumber: 45,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshStandardMaterial", {
                            color: "#caa25c",
                            emissive: "#8a6a3c",
                            emissiveIntensity: 0.35,
                            metalness: 0.7,
                            roughness: 0.3
                        }, void 0, false, {
                            fileName: "[project]/components/intro/IntroWorld.tsx",
                            lineNumber: 46,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/intro/IntroWorld.tsx",
                    lineNumber: 44,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$Image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Image"], {
                    url: url,
                    scale: [
                        w,
                        h
                    ]
                }, void 0, false, {
                    fileName: "[project]/components/intro/IntroWorld.tsx",
                    lineNumber: 55,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/intro/IntroWorld.tsx",
            lineNumber: 43,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/intro/IntroWorld.tsx",
        lineNumber: 42,
        columnNumber: 5
    }, this);
}
_c1 = Frame;
function GoldEmber() {
    _s();
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$156d8d12$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__["useFrame"])({
        "GoldEmber.useFrame": ({ clock })=>{
            if (!ref.current) return;
            ref.current.intensity = 6 + Math.sin(clock.elapsedTime * 1.6) * 1.4;
        }
    }["GoldEmber.useFrame"]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("pointLight", {
        ref: ref,
        color: "#f3d9a4",
        position: [
            0,
            1,
            -CORRIDOR_LENGTH - 4
        ],
        distance: 30,
        decay: 2
    }, void 0, false, {
        fileName: "[project]/components/intro/IntroWorld.tsx",
        lineNumber: 67,
        columnNumber: 10
    }, this);
}
_s(GoldEmber, "8QVLrcMdYxPUkj6ry5zpyt6J6X8=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$156d8d12$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__["useFrame"]
    ];
});
_c2 = GoldEmber;
function IntroWorld({ progressRef, dragRef, lowPower }) {
    _s1();
    const { camera } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$156d8d12$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__C__as__useThree$3e$__["useThree"])();
    const idle = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(0);
    const startZ = 6;
    const endZ = -(CORRIDOR_LENGTH + 2);
    const fog = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "IntroWorld.useMemo[fog]": ()=>new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FogExp2"](0x0a0806, 0.045)
    }["IntroWorld.useMemo[fog]"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$156d8d12$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__["useFrame"])({
        "IntroWorld.useFrame": (_, delta)=>{
            idle.current += delta;
            const p = progressRef.current;
            const targetZ = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MathUtils"].lerp(startZ, endZ, p);
            camera.position.z = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MathUtils"].damp(camera.position.z, targetZ, 3.2, delta);
            camera.position.y = 0.3 + Math.sin(idle.current * 0.5) * 0.08;
            camera.position.x = Math.sin(idle.current * 0.35) * 0.15;
            const sway = Math.sin(idle.current * 0.3) * 0.05;
            const targetYaw = dragRef.current.yaw + sway;
            const targetPitch = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MathUtils"].clamp(dragRef.current.pitch, -0.35, 0.35);
            camera.rotation.y = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MathUtils"].damp(camera.rotation.y, targetYaw, 4, delta);
            camera.rotation.x = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MathUtils"].damp(camera.rotation.x, targetPitch, 4, delta);
        }
    }["IntroWorld.useFrame"]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("primitive", {
                object: fog,
                attach: "fog"
            }, void 0, false, {
                fileName: "[project]/components/intro/IntroWorld.tsx",
                lineNumber: 103,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("color", {
                attach: "background",
                args: [
                    "#0a0806"
                ]
            }, void 0, false, {
                fileName: "[project]/components/intro/IntroWorld.tsx",
                lineNumber: 104,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ambientLight", {
                intensity: 0.35,
                color: "#e8c77e"
            }, void 0, false, {
                fileName: "[project]/components/intro/IntroWorld.tsx",
                lineNumber: 105,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("hemisphereLight", {
                args: [
                    "#3a2e1a",
                    "#0a0806",
                    0.4
                ]
            }, void 0, false, {
                fileName: "[project]/components/intro/IntroWorld.tsx",
                lineNumber: 106,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(GoldEmber, {}, void 0, false, {
                fileName: "[project]/components/intro/IntroWorld.tsx",
                lineNumber: 107,
                columnNumber: 7
            }, this),
            [
                6,
                -6,
                -18,
                -30
            ].map((z, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("pointLight", {
                    position: [
                        i % 2 === 0 ? -2 : 2,
                        1.6,
                        z
                    ],
                    color: "#c9a25a",
                    intensity: 3.2,
                    distance: 12,
                    decay: 2
                }, i, false, {
                    fileName: "[project]/components/intro/IntroWorld.tsx",
                    lineNumber: 109,
                    columnNumber: 9
                }, this)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FloorAndGuides, {}, void 0, false, {
                fileName: "[project]/components/intro/IntroWorld.tsx",
                lineNumber: 112,
                columnNumber: 7
            }, this),
            FRAMES.map((f)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Frame, {
                    ...f
                }, f.url, false, {
                    fileName: "[project]/components/intro/IntroWorld.tsx",
                    lineNumber: 114,
                    columnNumber: 9
                }, this)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$Sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Sparkles"], {
                count: lowPower ? 90 : 220,
                scale: [
                    16,
                    6,
                    CORRIDOR_LENGTH + 14
                ],
                position: [
                    0,
                    0.5,
                    -CORRIDOR_LENGTH / 2
                ],
                size: 2.4,
                speed: 0.25,
                color: "#e8c77e",
                opacity: 0.6
            }, void 0, false, {
                fileName: "[project]/components/intro/IntroWorld.tsx",
                lineNumber: 117,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$Text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Text"], {
                position: [
                    0,
                    0.6,
                    endZ + 3
                ],
                fontSize: 1.1,
                color: "#efe6d3",
                letterSpacing: 0.28,
                anchorX: "center",
                anchorY: "middle",
                font: undefined,
                children: "ATLANTIC LOUNGE"
            }, void 0, false, {
                fileName: "[project]/components/intro/IntroWorld.tsx",
                lineNumber: 127,
                columnNumber: 7
            }, this),
            !lowPower && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$postprocessing$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EffectComposer"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$postprocessing$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Bloom"], {
                        intensity: 0.9,
                        luminanceThreshold: 0.22,
                        luminanceSmoothing: 0.35,
                        mipmapBlur: true
                    }, void 0, false, {
                        fileName: "[project]/components/intro/IntroWorld.tsx",
                        lineNumber: 141,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$postprocessing$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vignette"], {
                        eskil: false,
                        offset: 0.2,
                        darkness: 0.9
                    }, void 0, false, {
                        fileName: "[project]/components/intro/IntroWorld.tsx",
                        lineNumber: 142,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/intro/IntroWorld.tsx",
                lineNumber: 140,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/intro/IntroWorld.tsx",
        lineNumber: 102,
        columnNumber: 5
    }, this);
}
_s1(IntroWorld, "mQ+ssx15oxkC3wUhoWjpf2Z1KnA=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$156d8d12$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__C__as__useThree$3e$__["useThree"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$156d8d12$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__["useFrame"]
    ];
});
_c3 = IntroWorld;
var _c, _c1, _c2, _c3;
__turbopack_context__.k.register(_c, "FloorAndGuides");
__turbopack_context__.k.register(_c1, "Frame");
__turbopack_context__.k.register(_c2, "GoldEmber");
__turbopack_context__.k.register(_c3, "IntroWorld");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/intro/IntroWorld.tsx [app-client] (ecmascript, next/dynamic entry)", (function(__turbopack_context__){

__turbopack_context__.n(__turbopack_context__.i("[project]/components/intro/IntroWorld.tsx [app-client] (ecmascript)"));
}),
]);

//# sourceMappingURL=components_intro_IntroWorld_tsx_16v22z7._.js.map