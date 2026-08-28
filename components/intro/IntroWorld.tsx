/* eslint-disable react-hooks/immutability -- react-three-fiber's useFrame is designed to mutate the camera/object refs every frame; this is the idiomatic r3f pattern, not React state */
"use client";

import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Image as DreiImage, Sparkles, Float, Text } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import * as THREE from "three";
import { PHOTOS } from "@/lib/images";

export const CORRIDOR_LENGTH = 46;

const FRAMES: { url: string; pos: [number, number, number]; rotY: number; w: number; h: number }[] = [
  { url: PHOTOS.cocktailOlives, pos: [-4.6, 0.4, -6], rotY: 0.55, w: 3.1, h: 3.9 },
  { url: PHOTOS.pendantLamps, pos: [4.6, -0.3, -11], rotY: -0.55, w: 3.4, h: 2.6 },
  { url: PHOTOS.redChairs, pos: [-5, 0.2, -17], rotY: 0.6, w: 3.6, h: 2.7 },
  { url: PHOTOS.whiskeyWoodTable, pos: [4.8, 0.6, -23], rotY: -0.6, w: 3, h: 3.7 },
  { url: PHOTOS.fireplaceLounge, pos: [-4.7, -0.2, -29], rotY: 0.55, w: 3.8, h: 2.8 },
  { url: PHOTOS.cigarFire, pos: [4.6, 0.3, -35], rotY: -0.55, w: 3, h: 3.6 },
  { url: PHOTOS.heroPour, pos: [0, 0.4, -41], rotY: 0, w: 4.2, h: 3.1 },
];

function FloorAndGuides() {
  return (
    <>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.1, -CORRIDOR_LENGTH / 2]} receiveShadow>
        <planeGeometry args={[26, CORRIDOR_LENGTH + 20]} />
        <meshStandardMaterial color="#0d0a06" metalness={0.75} roughness={0.28} />
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

function Frame({ url, pos, rotY, w, h }: (typeof FRAMES)[number]) {
  return (
    <Float speed={1.1} rotationIntensity={0.06} floatIntensity={0.5}>
      <group position={pos} rotation={[0, rotY, 0]}>
        <mesh position={[0, 0, -0.05]}>
          <planeGeometry args={[w + 0.28, h + 0.28]} />
          <meshStandardMaterial
            color="#caa25c"
            emissive="#8a6a3c"
            emissiveIntensity={0.35}
            metalness={0.7}
            roughness={0.3}
          />
        </mesh>
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        <DreiImage url={url} scale={[w, h] as any} />
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
  const idle = useRef(0);
  const startZ = 6;
  const endZ = -(CORRIDOR_LENGTH + 2);

  const fog = useMemo(() => new THREE.FogExp2(0x0a0806, 0.045), []);

  useFrame((_, delta) => {
    idle.current += delta;
    const p = progressRef.current;
    const targetZ = THREE.MathUtils.lerp(startZ, endZ, p);
    camera.position.z = THREE.MathUtils.damp(camera.position.z, targetZ, 3.2, delta);
    camera.position.y = 0.3 + Math.sin(idle.current * 0.5) * 0.08;
    camera.position.x = Math.sin(idle.current * 0.35) * 0.15;

    const sway = Math.sin(idle.current * 0.3) * 0.05;
    const targetYaw = dragRef.current.yaw + sway;
    const targetPitch = THREE.MathUtils.clamp(dragRef.current.pitch, -0.35, 0.35);
    camera.rotation.y = THREE.MathUtils.damp(camera.rotation.y, targetYaw, 4, delta);
    camera.rotation.x = THREE.MathUtils.damp(camera.rotation.x, targetPitch, 4, delta);
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
      {FRAMES.map((f) => (
        <Frame key={f.url} {...f} />
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
        font={undefined}
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
