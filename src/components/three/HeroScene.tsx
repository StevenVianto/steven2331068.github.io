import { Canvas, useFrame } from '@react-three/fiber';
import { Component, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import * as THREE from 'three';
import { detectQuality, dprRange, particleCount, type Quality } from './capabilities';

function Field({ quality, pointer }: { quality: Quality; pointer: React.RefObject<{ x: number; y: number }> }) {
  const group = useRef<THREE.Group>(null);
  const cloud = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const values = new Float32Array(particleCount[quality] * 3);
    // Deterministic distribution keeps remounts visually stable.
    let seed = 42;
    const random = () => { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 4294967296; };
    for (let i = 0; i < values.length; i += 3) {
      values[i] = (random() - .5) * 22;
      values[i + 1] = (random() - .5) * 15;
      values[i + 2] = -random() * 12;
    }
    return values;
  }, [quality]);
  useFrame((_, dt) => {
    if (!group.current || !cloud.current) return;
    const delta = Math.min(dt, .05);
    group.current.rotation.y = THREE.MathUtils.damp(group.current.rotation.y, pointer.current.x * .15, 2, delta);
    group.current.rotation.x = THREE.MathUtils.damp(group.current.rotation.x, -pointer.current.y * .12, 2, delta);
    cloud.current.rotation.z += delta * .009;
    group.current.position.y = THREE.MathUtils.damp(group.current.position.y, Math.min(window.scrollY, 900) * .0015, 3, delta);
  });
  return <group ref={group}>
    <points ref={cloud}>
      <bufferGeometry><bufferAttribute attach="attributes-position" args={[positions, 3]} /></bufferGeometry>
      <pointsMaterial size={.035} color="#a5b8ff" transparent opacity={.65} depthWrite={false} sizeAttenuation />
    </points>
    <mesh position={[4, 0, -2]} rotation={[.4, .2, .3]}>
      <icosahedronGeometry args={[3.3, 1]} />
      <meshBasicMaterial color="#83b9c0" wireframe transparent opacity={.13} />
    </mesh>
    <mesh position={[-6, 3, -5]} rotation={[.3, .7, .5]}>
      <octahedronGeometry args={[1.2]} />
      <meshBasicMaterial color="#a3a9ff" wireframe transparent opacity={.18} />
    </mesh>
  </group>;
}

class SceneBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? null : this.props.children; }
}

export default function HeroScene() {
  const host = useRef<HTMLDivElement>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const [quality, setQuality] = useState<Quality>('off');
  const [active, setActive] = useState(false);
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updateQuality = () => setQuality(detectQuality());
    updateQuality();
    media.addEventListener('change', updateQuality);
    let visible = true;
    const sync = () => setActive(visible && !document.hidden);
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); });
    if (host.current) observer.observe(host.current);
    const move = (event: PointerEvent) => {
      pointer.current.x = event.clientX / window.innerWidth * 2 - 1;
      pointer.current.y = -(event.clientY / window.innerHeight * 2 - 1);
    };
    window.addEventListener('pointermove', move, { passive: true });
    document.addEventListener('visibilitychange', sync);
    sync();
    return () => {
      observer.disconnect();
      media.removeEventListener('change', updateQuality);
      window.removeEventListener('pointermove', move);
      document.removeEventListener('visibilitychange', sync);
    };
  }, []);
  return <div ref={host} style={{ width: '100%', height: '100%', pointerEvents: 'none' }}>
    {quality !== 'off' && <SceneBoundary><Canvas
      frameloop={active ? 'always' : 'never'} dpr={dprRange[quality]}
      camera={{ position: [0, 0, 10], fov: 55 }}
      gl={{ alpha: true, antialias: false, powerPreference: 'low-power' }}
      fallback={<span />}
    ><Field quality={quality} pointer={pointer} /></Canvas></SceneBoundary>}
  </div>;
}
