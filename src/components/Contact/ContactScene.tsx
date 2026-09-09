import { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import type { Pointer } from '@/lib/hooks/usePointer';

const damp = THREE.MathUtils.damp;

/** A slowly rotating spherical particle orb with an accent glow. */
function Orb({ pointerRef }: { pointerRef: React.MutableRefObject<Pointer> }) {
  const points = useRef<THREE.Points>(null);
  const group = useRef<THREE.Group>(null);
  const count = 1600;

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // Fibonacci sphere for even distribution
      const phi = Math.acos(1 - (2 * (i + 0.5)) / count);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;
      const r = 1.6 + (Math.random() - 0.5) * 0.15;
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, []);

  useFrame((state, delta) => {
    if (points.current) {
      points.current.rotation.y += delta * 0.06;
    }
    if (group.current) {
      const p = pointerRef.current;
      group.current.rotation.x = damp(group.current.rotation.x, p.y * 0.3, 3, delta);
      group.current.rotation.y = damp(group.current.rotation.y, p.x * 0.3, 3, delta);
      const s = 1 + Math.sin(state.clock.elapsedTime * 0.8) * 0.02;
      group.current.scale.setScalar(s);
    }
  });

  return (
    <group ref={group}>
      <points ref={points}>
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
          size={0.02}
          sizeAttenuation
          color="#2a8bf2"
          transparent
          opacity={0.85}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
      {/* Soft inner core */}
      <mesh>
        <sphereGeometry args={[1.2, 32, 32]} />
        <meshBasicMaterial color="#0a75e0" transparent opacity={0.04} />
      </mesh>
    </group>
  );
}

export default function ContactScene({
  pointerRef,
}: {
  pointerRef: React.MutableRefObject<Pointer>;
}) {
  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 5], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
      className="!absolute inset-0"
    >
      <ambientLight intensity={0.5} />
      <Orb pointerRef={pointerRef} />
    </Canvas>
  );
}
