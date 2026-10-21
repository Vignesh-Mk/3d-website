import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { usePortfolioStore } from '../../../store/usePortfolioStore';
import { useSoundEffects } from '../../../hooks/useSoundEffects';
import { toonGradientMap, toonColors } from '../materials/ToonPalette';

export function Fridge() {
  const fridgeRef = useRef();
  const doorRef = useRef();
  const [hovered, setHovered] = useState(false);

  const openModal = usePortfolioStore((state) => state.openModal);
  const activeModal = usePortfolioStore((state) => state.activeModal);
  const cameraFocus = usePortfolioStore((state) => state.cameraFocus);
  const setHoveredProp = usePortfolioStore((state) => state.setHoveredProp);
  const { playSquish, playBoing, playClick } = useSoundEffects();

  // Shivering / bulging under pressure
  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    if (fridgeRef.current) {
      if (hovered) {
        // High frequency cartoon shiver
        fridgeRef.current.scale.x = 1 + Math.sin(t * 18) * 0.03;
        fridgeRef.current.scale.z = 1 + Math.cos(t * 18) * 0.03;
        fridgeRef.current.scale.y = 1 - Math.sin(t * 18) * 0.02;
      } else {
        // Low idle cartoon breathing
        fridgeRef.current.scale.x = 1 + Math.sin(t * 2.5) * 0.012;
        fridgeRef.current.scale.z = 1 + Math.cos(t * 2.5) * 0.012;
        fridgeRef.current.scale.y = 1;
      }
    }

    // Door slight nudge open on hover
    if (doorRef.current) {
      const targetRotation = hovered ? -0.35 : 0;
      doorRef.current.rotation.y = THREE.MathUtils.lerp(doorRef.current.rotation.y, targetRotation, 0.1);
    }
  });

  const handleClick = (e) => {
    e.stopPropagation();
    setHovered(false);
    setHoveredProp(null);
    playBoing();
    playSquish();
    playClick();
    openModal('skills', 'fridge');
  };

  const handlePointerOver = (e) => {
    e.stopPropagation();
    setHovered(true);
    setHoveredProp('fridge');
    playSquish();
  };

  const handlePointerOut = () => {
    setHovered(false);
    setHoveredProp(null);
  };

  return (
    <group
      ref={fridgeRef}
      position={[3.3, 0, -3.2]}
      rotation={[0, -0.4, 0]}
      onClick={handleClick}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
      cursor="pointer"
    >
      {/* 1. Vintage Rounded Fridge Body */}
      <group position={[0, 1.8, 0]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[1.5, 3.2, 1.3]} />
          <meshToonMaterial
            color={hovered ? "#e0f2fe" : toonColors.fridgeBody}
            gradientMap={toonGradientMap}
          />
        </mesh>

        {/* Vintage Chrome Fridge Door Hinges */}
        <mesh position={[-0.72, 1.1, 0.55]}>
          <cylinderGeometry args={[0.06, 0.06, 0.18, 8]} />
          <meshToonMaterial color={toonColors.fridgeHandle} />
        </mesh>
        <mesh position={[-0.72, -0.9, 0.55]}>
          <cylinderGeometry args={[0.06, 0.06, 0.18, 8]} />
          <meshToonMaterial color={toonColors.fridgeHandle} />
        </mesh>

        {/* 2. Swiveling Fridge Door (Hinged on the Left) */}
        <group ref={doorRef} position={[-0.75, 0, 0.65]}>
          <mesh position={[0.75, 0, 0.05]} castShadow>
            <boxGeometry args={[1.48, 3.16, 0.14]} />
            <meshToonMaterial
              color={hovered ? "#bae6fd" : "#f1f5f9"}
              gradientMap={toonGradientMap}
            />
          </mesh>

          {/* Heavy Chrome Door Handle */}
          <mesh position={[1.35, 0.1, 0.16]}>
            <cylinderGeometry args={[0.04, 0.04, 0.45, 8]} />
            <meshToonMaterial color="#64748b" />
          </mesh>

          {/* Retro Logo Emblem Badge */}
          <mesh position={[0.75, 1.1, 0.13]}>
            <boxGeometry args={[0.26, 0.1, 0.03]} />
            <meshToonMaterial color="#ef4444" />
          </mesh>
        </group>

        {/* 3. Interior Glowing Shelves and Overflowing Items */}
        <group position={[0, 0, 0.35]}>
          {/* Internal Cold Light */}
          <pointLight color="#38bdf8" intensity={hovered ? 6 : 1} distance={4} decay={2} />

          {/* Peeking Food Items / Skill Capsules */}
          {/* Apple / Fruit */}
          <mesh position={[-0.3, 0.2, 0.15]} castShadow>
            <sphereGeometry args={[0.16, 8, 8]} />
            <meshToonMaterial color="#ef4444" gradientMap={toonGradientMap} />
          </mesh>
          {/* Milk Carton */}
          <mesh position={[0.25, 0.25, 0.12]} castShadow>
            <boxGeometry args={[0.18, 0.38, 0.18]} />
            <meshToonMaterial color="#3b82f6" gradientMap={toonGradientMap} />
          </mesh>
          {/* Cheese Wedge */}
          <mesh position={[0, -0.4, 0.18]} rotation={[0, 0.4, 0]} castShadow>
            <coneGeometry args={[0.2, 0.16, 3]} />
            <meshToonMaterial color="#f59e0b" gradientMap={toonGradientMap} />
          </mesh>
        </group>

        {/* Fridge Foot Pegs */}
        <mesh position={[-0.6, -1.65, 0.45]}>
          <cylinderGeometry args={[0.06, 0.08, 0.1, 8]} />
          <meshToonMaterial color="#334155" />
        </mesh>
        <mesh position={[0.6, -1.65, 0.45]}>
          <cylinderGeometry args={[0.06, 0.08, 0.1, 8]} />
          <meshToonMaterial color="#334155" />
        </mesh>
        <mesh position={[-0.6, -1.65, -0.45]}>
          <cylinderGeometry args={[0.06, 0.08, 0.1, 8]} />
          <meshToonMaterial color="#334155" />
        </mesh>
        <mesh position={[0.6, -1.65, -0.45]}>
          <cylinderGeometry args={[0.06, 0.08, 0.1, 8]} />
          <meshToonMaterial color="#334155" />
        </mesh>
      </group>

      {/* Floating Comic Label - Only shown on hover during default overview */}
      {hovered && !activeModal && cameraFocus === 'default' && (
        <Html
          position={[0, 3.8, 0]}
          center
          distanceFactor={14}
          zIndexRange={[10, 0]}
          style={{ pointerEvents: 'none', userSelect: 'none' }}
        >
          <div className="px-3 py-1.5 rounded-lg border-2 border-black font-bold text-xs uppercase tracking-wider shadow-[3px_3px_0px_#000] whitespace-nowrap bg-cyan-400 text-black scale-105">
            🧊 Bulging Fridge • Tech Stack & Skills
          </div>
        </Html>
      )}
    </group>
  );
}

