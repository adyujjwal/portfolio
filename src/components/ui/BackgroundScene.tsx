import { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Icosahedron, MeshDistortMaterial } from '@react-three/drei';
import { motion, useScroll, useTransform } from 'framer-motion';
import * as THREE from 'three';
import { usePointer } from '@/lib/hooks/usePointer';
import { usePrefersReducedMotion, useIsDesktop } from '@/lib/hooks/useMediaQuery';
import { ACCENT_HEX, ACCENT_BRIGHT_HEX, LIGHTNING } from '@/lib/constants';
import type { Pointer } from '@/lib/hooks/usePointer';

const damp = THREE.MathUtils.damp;

/** Slowly morphing, dark, self-lit blob: the focal form of the backdrop. */
function Blob({ reducedMotion, lowDetail }: { reducedMotion: boolean; lowDetail: boolean }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (!ref.current || reducedMotion) return;
    ref.current.rotation.y += delta * 0.05;
    ref.current.rotation.x += delta * 0.015;
  });
  return (
    <Icosahedron ref={ref} args={[1, lowDetail ? 8 : 20]} scale={2.9} position={[1.9, 0.3, -1]}>
      <MeshDistortMaterial
        color="#0a0b12"
        emissive={ACCENT_HEX}
        emissiveIntensity={0.1}
        roughness={0.38}
        metalness={0.35}
        distort={reducedMotion ? 0.16 : 0.42}
        speed={reducedMotion ? 0 : 1.3}
      />
    </Icosahedron>
  );
}

/** Faint geometric cage for structure/depth. */
function Cage({ reducedMotion }: { reducedMotion: boolean }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (!ref.current || reducedMotion) return;
    ref.current.rotation.y -= delta * 0.03;
    ref.current.rotation.z += delta * 0.02;
  });
  return (
    <Icosahedron ref={ref} args={[1, 1]} scale={3.7} position={[1.9, 0.3, -1]}>
      <meshBasicMaterial color={ACCENT_BRIGHT_HEX} wireframe transparent opacity={0.06} />
    </Icosahedron>
  );
}

/** Drifting particle depth. */
function Particles({ count, reducedMotion }: { count: number; reducedMotion: boolean }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 16;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 12;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 10 - 2;
    }
    return arr;
  }, [count]);

  useFrame((state, delta) => {
    if (!ref.current || reducedMotion) return;
    ref.current.rotation.y += delta * 0.012;
    ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.15) * 0.15;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.018}
        sizeAttenuation
        color="#ffffff"
        transparent
        opacity={0.32}
        depthWrite={false}
      />
    </points>
  );
}

/** Builds a jagged fractal lightning bolt (with branches) as line-segment pairs. */
function makeBolt(): Float32Array {
  const startX = (Math.random() - 0.5) * 8;
  const start = new THREE.Vector3(startX, 7, -3);
  const end = new THREE.Vector3(startX + (Math.random() - 0.5) * 4, -7, -3);
  let segments: [THREE.Vector3, THREE.Vector3][] = [[start, end]];
  let offset = 2.4;
  for (let gen = 0; gen < 6; gen++) {
    const next: [THREE.Vector3, THREE.Vector3][] = [];
    for (const [a, b] of segments) {
      const mid = a.clone().lerp(b, 0.5);
      mid.x += (Math.random() - 0.5) * offset;
      mid.z += (Math.random() - 0.5) * offset * 0.4;
      next.push([a, mid], [mid, b]);
      // occasional forking branch
      if (gen > 1 && Math.random() < 0.22) {
        const branch = mid.clone();
        branch.x += (Math.random() - 0.5) * offset * 3;
        branch.y -= Math.random() * 1.8 + 0.4;
        next.push([mid, branch]);
      }
    }
    segments = next;
    offset *= 0.55;
  }
  const positions = new Float32Array(segments.length * 6);
  segments.forEach((s, i) => {
    positions.set([s[0].x, s[0].y, s[0].z, s[1].x, s[1].y, s[1].z], i * 6);
  });
  return positions;
}

/** A procedural lightning bolt that flashes briefly on each strike. */
function Lightning({ strike, reducedMotion }: { strike: number; reducedMotion: boolean }) {
  const ref = useRef<THREE.LineSegments>(null);
  const matRef = useRef<THREE.LineBasicMaterial>(null);
  const geoRef = useRef<THREE.BufferGeometry>(null);
  const activeUntil = useRef(0);

  useEffect(() => {
    if (!strike || reducedMotion || !geoRef.current) return;
    geoRef.current.setAttribute('position', new THREE.BufferAttribute(makeBolt(), 3));
    geoRef.current.computeBoundingSphere();
    activeUntil.current = performance.now() / 1000 + 0.16 + Math.random() * 0.14;
  }, [strike, reducedMotion]);

  useFrame(() => {
    const mesh = ref.current;
    const mat = matRef.current;
    if (!mesh || !mat) return;
    mesh.visible = performance.now() / 1000 < activeUntil.current;
    if (mesh.visible) mat.opacity = 0.6 + Math.random() * 0.4; // flicker
  });

  return (
    <lineSegments ref={ref} visible={false} frustumCulled={false}>
      <bufferGeometry ref={geoRef} />
      <lineBasicMaterial
        ref={matRef}
        color={LIGHTNING.color}
        transparent
        opacity={0}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        toneMapped={false}
      />
    </lineSegments>
  );
}

/** Pointer + orbiting accent light; gentle parallax on the whole group. */
function Rig({
  pointerRef,
  reducedMotion,
  children,
}: {
  pointerRef: React.MutableRefObject<Pointer>;
  reducedMotion: boolean;
  children: React.ReactNode;
}) {
  const group = useRef<THREE.Group>(null);
  const light = useRef<THREE.PointLight>(null);
  useFrame((state, delta) => {
    const p = pointerRef.current;
    if (group.current) {
      const tx = reducedMotion ? 0 : p.x * 0.25;
      const ty = reducedMotion ? 0 : -p.y * 0.2;
      group.current.rotation.y = damp(group.current.rotation.y, tx, 2.5, delta);
      group.current.rotation.x = damp(group.current.rotation.x, ty, 2.5, delta);
    }
    if (light.current && !reducedMotion) {
      const t = state.clock.elapsedTime * 0.4;
      light.current.position.set(Math.cos(t) * 4 + 1.9, Math.sin(t) * 3, 2.5);
    }
  });
  return (
    <group ref={group}>
      <pointLight ref={light} color={ACCENT_BRIGHT_HEX} intensity={18} distance={14} />
      {children}
    </group>
  );
}

/**
 * Site-wide animated 3D backdrop. A fixed, full-bleed canvas that sits behind
 * all content: a morphing self-lit blob, a faint geometric cage, drifting
 * particles, soft fog and an orbiting accent light. Subtle by design so text
 * stays readable; frozen for reduced-motion and lightened on mobile.
 */
export default function BackgroundScene() {
  const pointerRef = usePointer();
  const reducedMotion = usePrefersReducedMotion();
  const isDesktop = useIsDesktop();
  const lowDetail = !isDesktop;
  const particleCount = lowDetail ? 90 : 340;

  // Prominent in the hero, then recedes so content stays legible.
  const { scrollY } = useScroll();
  const fadeEnd = typeof window !== 'undefined' ? window.innerHeight * 0.85 : 800;
  const opacity = useTransform(scrollY, [0, fadeEnd], [1, 0.32]);

  // Schedule occasional lightning strikes.
  const [strike, setStrike] = useState(0);
  const lightningOn = LIGHTNING.enabled && !reducedMotion;
  useEffect(() => {
    if (!lightningOn) return;
    let timer: number;
    const fire = () => setStrike((s) => s + 1);
    const schedule = () => {
      const delay =
        (LIGHTNING.minInterval +
          Math.random() * (LIGHTNING.maxInterval - LIGHTNING.minInterval)) *
        1000;
      timer = window.setTimeout(() => {
        if (document.visibilityState === 'visible') {
          fire();
          if (Math.random() < 0.4) window.setTimeout(fire, 110 + Math.random() * 110);
        }
        schedule();
      }, delay);
    };
    schedule();
    return () => window.clearTimeout(timer);
  }, [lightningOn]);

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0"
      style={{ background: '#080808', opacity }}
    >
      <Canvas
        dpr={[1, lowDetail ? 1.5 : 2]}
        camera={{ position: [0, 0, 6], fov: 40 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        style={{ pointerEvents: 'none' }}
      >
        <color attach="background" args={['#080808']} />
        <fog attach="fog" args={['#080808', 5, 15]} />

        <ambientLight intensity={0.28} />
        <directionalLight position={[-4, 5, 3]} intensity={1.1} />
        <directionalLight position={[3, -2, -4]} intensity={0.4} color={ACCENT_HEX} />

        <Suspense fallback={null}>
          <Rig pointerRef={pointerRef} reducedMotion={reducedMotion}>
            <Blob reducedMotion={reducedMotion} lowDetail={lowDetail} />
            <Cage reducedMotion={reducedMotion} />
            <Particles count={particleCount} reducedMotion={reducedMotion} />
          </Rig>
          {lightningOn && <Lightning strike={strike} reducedMotion={reducedMotion} />}
        </Suspense>
      </Canvas>

      {/* Soft scrim keeps content legible over the moving backdrop */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(90deg, rgba(8,8,8,0.55) 0%, rgba(8,8,8,0.15) 45%, rgba(8,8,8,0) 70%)',
          }}
        />

        {/* Thunder flash, re-triggered on each strike */}
        {lightningOn && (
          <motion.div
            key={strike}
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, LIGHTNING.flashStrength, 0.04, LIGHTNING.flashStrength * 0.5, 0],
            }}
            transition={{ duration: 0.6, times: [0, 0.07, 0.18, 0.3, 1], ease: 'easeOut' }}
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(65% 55% at 50% 18%, rgba(205,239,255,0.95), transparent 72%)',
              mixBlendMode: 'screen',
            }}
          />
        )}
    </motion.div>
  );
}
