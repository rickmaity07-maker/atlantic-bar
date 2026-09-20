/* eslint-disable react-hooks/immutability -- react-three-fiber's useFrame is designed to mutate the camera/object refs every frame; this is the idiomatic r3f pattern, not React state */
"use client";

import { useRef, useMemo, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Image as DreiImage, Sparkles, Float, Text } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import * as THREE from "three";
import { configureTextBuilder } from "troika-three-text";
import { useSiteImages } from "@/app/context/SiteImagesContext";

// Turbopack's dev bundler injects module-scope helper references into the
// function bodies troika stringifies to build its typesetting Web Worker,
// which don't exist inside the worker's blob context — the worker's `init`
// call then fails with "did not return a callable function". Typesetting
// this scene's single line of text on the main thread is effectively free,
// so just skip the worker entirely instead of chasing the bundler bug.
configureTextBuilder({ useWorker: false });

export const CORRIDOR_LENGTH = 46;

const FRAME_LAYOUT: { pos: [number, number, number]; rotY: number; w: number; h: number }[] = [
  { pos: [-4.6, 0.4, -6], rotY: 0.55, w: 3.1, h: 3.9 },
  { pos: [4.6, -0.3, -11], rotY: -0.55, w: 3.4, h: 2.6 },
  { pos: [-5, 0.2, -17], rotY: 0.6, w: 3.6, h: 2.7 },
  { pos: [4.8, 0.6, -23], rotY: -0.6, w: 3, h: 3.7 },
  { pos: [-4.7, -0.2, -29], rotY: 0.55, w: 3.8, h: 2.8 },
  { pos: [4.6, 0.3, -35], rotY: -0.55, w: 3, h: 3.6 },
  { pos: [0, 0.4, -41], rotY: 0, w: 4.2, h: 3.1 },
];

// Smoothstep — gives the scroll-driven camera a gentle ease in/out instead
// of a linear, mechanical feel.
function smoothstep(p: number) {
  const x = THREE.MathUtils.clamp(p, 0, 1);
  return x * x * (3 - 2 * x);
}

function FloorAndGuides() {
  return (
    <>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.1, -CORRIDOR_LENGTH / 2]} receiveShadow>
        <planeGeometry args={[26, CORRIDOR_LENGTH + 20]} />
        <meshStandardMaterial color="#0d0a06" metalness={0.75} roughness={0.28} />
      </mesh>
      {/* center runner strip, a warmer/darker rug down the middle for depth */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.095, -CORRIDOR_LENGTH / 2]}>
        <planeGeometry args={[3.4, CORRIDOR_LENGTH + 16]} />
        <meshStandardMaterial color="#1c130c" metalness={0.3} roughness={0.75} />
      </mesh>
      {Array.from({ length: 10 }).map((_, i) => (
        <mesh key={i} position={[0, -2.09, -i * (CORRIDOR_LENGTH / 9)]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.02, 0.035, 32]} />
          <meshBasicMaterial color="#c9a25a" transparent opacity={0.5} />
        </mesh>
      ))}
    </>
  );
}

/** Side walls with a brass chair-rail trim strip, and a ceiling with recessed gold lights. */
function Room({ lowPower }: { lowPower: boolean }) {
  const lightCount = lowPower ? 6 : 10;
  const ceilLightsRef = useRef<THREE.InstancedMesh>(null);

  useEffect(() => {
    if (!ceilLightsRef.current) return;
    const dummy = new THREE.Object3D();
    for (let i = 0; i < lightCount; i++) {
      dummy.position.set(0, 2.68, -i * (CORRIDOR_LENGTH / (lightCount - 1)));
      dummy.rotation.set(Math.PI / 2, 0, 0);
      dummy.updateMatrix();
      ceilLightsRef.current.setMatrixAt(i, dummy.matrix);
    }
    ceilLightsRef.current.instanceMatrix.needsUpdate = true;
  }, [lightCount]);

  const wallLength = CORRIDOR_LENGTH + 20;
  const wallZ = -CORRIDOR_LENGTH / 2;

  return (
    <>
      {/* Ceiling */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 2.7, wallZ]}>
        <planeGeometry args={[26, wallLength]} />
        <meshStandardMaterial color="#0c0906" metalness={0.2} roughness={0.9} />
      </mesh>
      {/* Recessed gold ceiling lights, instanced — cheap even with many */}
      <instancedMesh ref={ceilLightsRef} args={[undefined, undefined, lightCount]}>
        <circleGeometry args={[0.16, 20]} />
        <meshBasicMaterial color="#f3d9a4" transparent opacity={0.85} />
      </instancedMesh>

      {/* Side walls */}
      {[-8.6, 8.6].map((x, i) => (
        <group key={i}>
          <mesh rotation={[0, i === 0 ? Math.PI / 2 : -Math.PI / 2, 0]} position={[x, 0.3, wallZ]}>
            <planeGeometry args={[wallLength, 4.9]} />
            <meshStandardMaterial color="#120d09" metalness={0.15} roughness={0.85} />
          </mesh>
          {/* brass chair-rail trim */}
          <mesh position={[x - (i === 0 ? 0.02 : -0.02), 0.85, wallZ]}>
            <boxGeometry args={[0.04, 0.06, wallLength]} />
            <meshStandardMaterial
              color="#caa25c"
              emissive="#8a6a3c"
              emissiveIntensity={0.5}
              metalness={0.8}
              roughness={0.25}
            />
          </mesh>
        </group>
      ))}
    </>
  );
}

/** Instanced columns flanking the corridor — a handful of draw calls no matter the count. */
function Columns({ lowPower }: { lowPower: boolean }) {
  const count = lowPower ? 8 : 16;
  const shaftRef = useRef<THREE.InstancedMesh>(null);
  const capRef = useRef<THREE.InstancedMesh>(null);

  useEffect(() => {
    if (!shaftRef.current || !capRef.current) return;
    const dummy = new THREE.Object3D();
    for (let i = 0; i < count; i++) {
      const side = i % 2 === 0 ? -1 : 1;
      const z = -3 - Math.floor(i / 2) * (CORRIDOR_LENGTH / (count / 2 - 0.5));
      dummy.position.set(side * 6.6, 0.35, z);
      dummy.updateMatrix();
      shaftRef.current.setMatrixAt(i, dummy.matrix);

      dummy.position.set(side * 6.6, 2.62, z);
      dummy.updateMatrix();
      capRef.current.setMatrixAt(i, dummy.matrix);
    }
    shaftRef.current.instanceMatrix.needsUpdate = true;
    capRef.current.instanceMatrix.needsUpdate = true;
  }, [count]);

  return (
    <>
      <instancedMesh ref={shaftRef} args={[undefined, undefined, count]} castShadow>
        <cylinderGeometry args={[0.22, 0.26, 4.6, 12]} />
        <meshStandardMaterial color="#15100b" metalness={0.35} roughness={0.6} />
      </instancedMesh>
      <instancedMesh ref={capRef} args={[undefined, undefined, count]}>
        <cylinderGeometry args={[0.32, 0.32, 0.08, 12]} />
        <meshStandardMaterial
          color="#caa25c"
          emissive="#8a6a3c"
          emissiveIntensity={0.4}
          metalness={0.8}
          roughness={0.25}
        />
      </instancedMesh>
    </>
  );
}

/** A single small chandelier: a drop rod, a gold ring, and a handful of warm candle points. */
function Chandelier({ z }: { z: number }) {
  const flicker = useRef<THREE.PointLight>(null);
  const candles = 5;

  useFrame(({ clock }) => {
    if (!flicker.current) return;
    flicker.current.intensity = 2.2 + Math.sin(clock.elapsedTime * 3 + z) * 0.5;
  });

  return (
    <group position={[0, 2.55, z]}>
      <mesh>
        <cylinderGeometry args={[0.015, 0.015, 0.5, 6]} />
        <meshStandardMaterial color="#3a2e1a" metalness={0.6} roughness={0.4} />
      </mesh>
      <mesh position={[0, -0.28, 0]}>
        <torusGeometry args={[0.42, 0.02, 8, 24]} />
        <meshStandardMaterial
          color="#caa25c"
          emissive="#8a6a3c"
          emissiveIntensity={0.5}
          metalness={0.85}
          roughness={0.2}
        />
      </mesh>
      {Array.from({ length: candles }).map((_, i) => {
        const angle = (i / candles) * Math.PI * 2;
        return (
          <mesh key={i} position={[Math.cos(angle) * 0.42, -0.22, Math.sin(angle) * 0.42]}>
            <sphereGeometry args={[0.035, 8, 8]} />
            <meshBasicMaterial color="#f8e3ae" />
          </mesh>
        );
      })}
      <pointLight ref={flicker} color="#f3d9a4" position={[0, -0.28, 0]} distance={8} decay={2} />
    </group>
  );
}

/** A framed photo that fades and scales in as the camera gets close, instead of always being at full opacity. */
function Frame({ url, pos, rotY, w, h }: { url: string; pos: [number, number, number]; rotY: number; w: number; h: number }) {
  const groupRef = useRef<THREE.Group>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const imgRef = useRef<any>(null);
  const frameMeshRef = useRef<THREE.Mesh>(null);
  const revealed = useRef(0);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const dz = Math.abs(state.camera.position.z - pos[2]);
    // Fully visible within ~7 units, fully faded past ~19 units away.
    const target = THREE.MathUtils.clamp(1 - (dz - 7) / 12, 0, 1);
    revealed.current = THREE.MathUtils.damp(revealed.current, target, 4.5, delta);

    const scale = 0.6 + revealed.current * 0.4;
    groupRef.current.scale.setScalar(scale);

    if (imgRef.current?.material) {
      imgRef.current.material.opacity = revealed.current;
    }
    const frameMat = frameMeshRef.current?.material as THREE.MeshStandardMaterial | undefined;
    if (frameMat) frameMat.opacity = revealed.current;
  });

  return (
    <Float speed={1.1} rotationIntensity={0.06} floatIntensity={0.5}>
      <group ref={groupRef} position={pos} rotation={[0, rotY, 0]}>
        <mesh ref={frameMeshRef} position={[0, 0, -0.05]}>
          <planeGeometry args={[w + 0.28, h + 0.28]} />
          <meshStandardMaterial
            color="#caa25c"
            emissive="#8a6a3c"
            emissiveIntensity={0.35}
            metalness={0.7}
            roughness={0.3}
            transparent
            opacity={0}
          />
        </mesh>
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        <DreiImage ref={imgRef} url={url} scale={[w, h] as any} transparent opacity={0} />
      </group>
    </Float>
  );
}

function GoldEmber() {
  const ref = useRef<THREE.PointLight>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.intensity = 6 + Math.sin(clock.elapsedTime * 1.6) * 1.4;
  });
  return <pointLight ref={ref} color="#f3d9a4" position={[0, 1, -CORRIDOR_LENGTH - 4]} distance={30} decay={2} />;
}

export default function IntroWorld({
  progressRef,
  dragRef,
  lowPower,
}: {
  progressRef: React.MutableRefObject<number>;
  dragRef: React.MutableRefObject<{ yaw: number; pitch: number }>;
  lowPower: boolean;
}) {
  const { camera } = useThree();
  const siteImages = useSiteImages();
  const frameUrls = [
    siteImages.introFrame1,
    siteImages.introFrame2,
    siteImages.introFrame3,
    siteImages.introFrame4,
    siteImages.introFrame5,
    siteImages.introFrame6,
    siteImages.introFrame7,
  ];
  const idle = useRef(0);
  const prevZ = useRef(6);
  const startZ = 6;
  const endZ = -(CORRIDOR_LENGTH + 2);

  const fog = useMemo(() => new THREE.FogExp2(0x0a0806, 0.045), []);
  const baseFov = 55;

  useFrame((_, delta) => {
    idle.current += delta;
    const p = smoothstep(progressRef.current);
    const targetZ = THREE.MathUtils.lerp(startZ, endZ, p);
    camera.position.z = THREE.MathUtils.damp(camera.position.z, targetZ, 3.2, delta);
    camera.position.y = 0.3 + Math.sin(idle.current * 0.5) * 0.08;
    camera.position.x = Math.sin(idle.current * 0.35) * 0.15;

    const sway = Math.sin(idle.current * 0.3) * 0.05;
    const targetYaw = dragRef.current.yaw + sway;
    const targetPitch = THREE.MathUtils.clamp(dragRef.current.pitch, -0.35, 0.35);
    camera.rotation.y = THREE.MathUtils.damp(camera.rotation.y, targetYaw, 4, delta);
    camera.rotation.x = THREE.MathUtils.damp(camera.rotation.x, targetPitch, 4, delta);

    // Subtle cinematic touches: a slight bank into turns, and a faint dolly
    // zoom on the FOV tied to how fast the camera is actually travelling.
    camera.rotation.z = THREE.MathUtils.damp(camera.rotation.z, -dragRef.current.yaw * 0.12, 4, delta);

    if (delta > 0 && "fov" in camera) {
      const velocity = (camera.position.z - prevZ.current) / delta;
      prevZ.current = camera.position.z;
      const perspectiveCam = camera as THREE.PerspectiveCamera;
      const targetFov = baseFov + THREE.MathUtils.clamp(-velocity * 0.35, -2.5, 3.5);
      perspectiveCam.fov = THREE.MathUtils.damp(perspectiveCam.fov, targetFov, 3, delta);
      perspectiveCam.updateProjectionMatrix();
    }
  });

  return (
    <>
      <primitive object={fog} attach="fog" />
      <color attach="background" args={["#0a0806"]} />
      <ambientLight intensity={0.35} color="#e8c77e" />
      <hemisphereLight args={["#3a2e1a", "#0a0806", 0.4]} />
      <GoldEmber />
      {[6, -6, -18, -30].map((z, i) => (
        <pointLight key={i} position={[i % 2 === 0 ? -2 : 2, 1.6, z]} color="#c9a25a" intensity={3.2} distance={12} decay={2} />
      ))}

      <FloorAndGuides />
      <Room lowPower={lowPower} />
      <Columns lowPower={lowPower} />
      {[-2, -13, -24, -35].map((z) => (
        <Chandelier key={z} z={z} />
      ))}

      {FRAME_LAYOUT.map((layout, index) => (
        <Frame key={index} url={frameUrls[index]} {...layout} />
      ))}

      <Sparkles
        count={lowPower ? 90 : 220}
        scale={[16, 6, CORRIDOR_LENGTH + 14]}
        position={[0, 0.5, -CORRIDOR_LENGTH / 2]}
        size={2.4}
        speed={0.25}
        color="#e8c77e"
        opacity={0.6}
      />

      <Text
        position={[0, 0.6, endZ + 3]}
        fontSize={1.1}
        color="#efe6d3"
        letterSpacing={0.28}
        anchorX="center"
        anchorY="middle"
        font="/fonts/PlayfairDisplay-Variable.ttf"
      >
        ATLANTIC LOUNGE
      </Text>

      {!lowPower && (
        <EffectComposer>
          <Bloom intensity={0.9} luminanceThreshold={0.22} luminanceSmoothing={0.35} mipmapBlur />
          <Vignette eskil={false} offset={0.2} darkness={0.9} />
        </EffectComposer>
      )}
    </>
  );
}
