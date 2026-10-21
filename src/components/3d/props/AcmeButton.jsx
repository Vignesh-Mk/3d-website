import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import confetti from 'canvas-confetti';
import * as THREE from 'three';
import { usePortfolioStore } from '../../../store/usePortfolioStore';
import { useSoundEffects } from '../../../hooks/useSoundEffects';
import { toonGradientMap, toonColors } from '../materials/ToonPalette';

export function AcmeButton() {
  const buttonPlungerRef = useRef();
  const groupRef = useRef();
  const [hovered, setHovered] = useState(false);
  const [isSquashing, setIsSquashing] = useState(false);

  const openModal = usePortfolioStore((state) => state.openModal);
  const activeModal = usePortfolioStore((state) => state.activeModal);
  const cameraFocus = usePortfolioStore((state) => state.cameraFocus);
  const setHoveredProp = usePortfolioStore((state) => state.setHoveredProp);
  const { playBoing, playClick, playFanfare } = useSoundEffects();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    // Idle wiggle or hover bounce
    if (groupRef.current && hovered && !isSquashing) {
      groupRef.current.scale.y = 1 + Math.sin(t * 14) * 0.05;
      groupRef.current.scale.x = 1 - Math.sin(t * 14) * 0.03;
      groupRef.current.scale.z = 1 - Math.sin(t * 14) * 0.03;
    } else if (groupRef.current && !isSquashing) {
      groupRef.current.scale.set(1, 1, 1);
    }
  });

  const handleClick = (e) => {
    e.stopPropagation();
    setHovered(false);
    setHoveredProp(null);
    setIsSquashing(true);
    playBoing();
    playClick();

    // Cartoon Plunger Squash
    if (buttonPlungerRef.current) {
      buttonPlungerRef.current.scale.set(1.4, 0.25, 1.4);
      buttonPlungerRef.current.position.y = 1.05;
      setTimeout(() => {
        if (buttonPlungerRef.current) {
          buttonPlungerRef.current.scale.set(1, 1, 1);
          buttonPlungerRef.current.position.y = 1.25;
        }
        setIsSquashing(false);
      }, 350);
    }

    // Cartoon Confetti Burst
    try {
      confetti({
        particleCount: 60,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#ef4444', '#fbbf24', '#3b82f6', '#10b981', '#a855f7']
      });
    } catch {
      // ignore
    }

    playFanfare();
    openModal('resume', 'acme');
  };

  const handlePointerOver = (e) => {
    e.stopPropagation();
    setHovered(true);
    setHoveredProp('acme');
    playBoing();
  };

  const handlePointerOut = () => {
    setHovered(false);
    setHoveredProp(null);
  };

  return (
    <group
      ref={groupRef}
      position={[2.8, 0, 2.2]}
      rotation={[0, -0.6, 0]}
      onClick={handleClick}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
      cursor="pointer"
    >
      {/* 1. Pedestal Base */}
      <mesh position={[0, 0.1, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.65, 0.75, 0.2, 12]} />
        <meshToonMaterial color={toonColors.acmePedestal} gradientMap={toonGradientMap} />
      </mesh>

      {/* 2. Hazard Striped Column */}
      <group position={[0, 0.6, 0]}>
        <mesh castShadow receiveShadow>
          <cylinderGeometry args={[0.35, 0.42, 0.8, 12]} />
          <meshToonMaterial color={toonColors.acmeStripeYellow} gradientMap={toonGradientMap} />
        </mesh>
        {/* Black Hazard Stripes */}
        <mesh position={[0, 0.15, 0]}>
          <cylinderGeometry args={[0.37, 0.39, 0.12, 12]} />
          <meshToonMaterial color={toonColors.acmeStripeBlack} />
        </mesh>
        <mesh position={[0, -0.15, 0]}>
          <cylinderGeometry args={[0.41, 0.43, 0.12, 12]} />
          <meshToonMaterial color={toonColors.acmeStripeBlack} />
        </mesh>
      </group>

      {/* 3. Beveled Top Plunger Collar */}
      <mesh position={[0, 1.05, 0]} castShadow>
        <cylinderGeometry args={[0.5, 0.45, 0.12, 16]} />
        <meshToonMaterial color="#475569" gradientMap={toonGradientMap} />
      </mesh>

      {/* 4. Bulbous Red Mushroom Button */}
      <group ref={buttonPlungerRef} position={[0, 1.25, 0]}>
        <mesh castShadow>
          <sphereGeometry args={[0.42, 16, 12, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshToonMaterial
            color={hovered ? "#f87171" : toonColors.acmeButtonRed}
            gradientMap={toonGradientMap}
          />
        </mesh>
        {/* ACME Label Badge */}
        <mesh position={[0, 0.35, 0.25]} rotation={[-0.4, 0, 0]}>
          <boxGeometry args={[0.35, 0.12, 0.02]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
      </group>

      {/* Warning Sign Post next to button */}
      <group position={[-0.7, 0, 0.3]} rotation={[0, 0.4, 0]}>
        {/* Wooden stick */}
        <mesh position={[0, 0.5, 0]}>
          <cylinderGeometry args={[0.03, 0.04, 1, 6]} />
          <meshToonMaterial color={toonColors.woodDark} />
        </mesh>
        {/* Crooked Signboard */}
        <mesh position={[0, 0.95, 0]} rotation={[0, 0, -0.1]}>
          <boxGeometry args={[0.7, 0.4, 0.04]} />
          <meshToonMaterial color="#fef08a" gradientMap={toonGradientMap} />
        </mesh>
      </group>

      {/* Floating Comic Label - Only shown on hover during default overview */}
      {hovered && !activeModal && cameraFocus === 'default' && (
        <Html
          position={[0, 2.1, 0]}
          center
          distanceFactor={14}
          zIndexRange={[10, 0]}
          style={{ pointerEvents: 'none', userSelect: 'none' }}
        >
          <div className="px-3 py-1.5 rounded-lg border-2 border-black font-bold text-xs uppercase tracking-wider shadow-[3px_3px_0px_#000] whitespace-nowrap bg-red-500 text-white scale-105 animate-wiggle">
            💥 DO NOT PRESS • Bio & Resume
          </div>
        </Html>
      )}
    </group>
  );
}

