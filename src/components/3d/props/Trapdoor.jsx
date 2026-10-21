import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { usePortfolioStore } from '../../../store/usePortfolioStore';
import { useSoundEffects } from '../../../hooks/useSoundEffects';
import { toonGradientMap, toonColors } from '../materials/ToonPalette';

export function Trapdoor() {
  const groupRef = useRef();
  const padlockRef = useRef();
  const leftDoorRef = useRef();
  const rightDoorRef = useRef();
  const [hovered, setHovered] = useState(false);

  const openModal = usePortfolioStore((state) => state.openModal);
  const activeModal = usePortfolioStore((state) => state.activeModal);
  const cameraFocus = usePortfolioStore((state) => state.cameraFocus);
  const setHoveredProp = usePortfolioStore((state) => state.setHoveredProp);
  const { playRattle, playClick, playSwoosh } = useSoundEffects();

  // Periodic and hover rattling animation
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    // Periodic bulge/rattle every 4 seconds or continuous on hover
    const isRattling = hovered || (Math.sin(t * 1.5) > 0.88);

    if (groupRef.current && isRattling) {
      const shakeAmt = hovered ? 0.035 : 0.015;
      groupRef.current.position.y = 0.12 + Math.sin(t * 40) * shakeAmt;
      groupRef.current.rotation.z = Math.cos(t * 35) * (shakeAmt * 0.8);
    } else if (groupRef.current) {
      groupRef.current.position.y = 0.12;
      groupRef.current.rotation.z = 0;
    }

    if (padlockRef.current && isRattling) {
      padlockRef.current.rotation.y = Math.sin(t * 25) * 0.3;
      padlockRef.current.scale.setScalar(1 + Math.sin(t * 20) * 0.08);
    } else if (padlockRef.current) {
      padlockRef.current.rotation.y = 0;
      padlockRef.current.scale.set(1, 1, 1);
    }
  });

  const handleClick = (e) => {
    e.stopPropagation();
    setHovered(false);
    setHoveredProp(null);
    playRattle();
    playClick();
    playSwoosh();
    openModal('vault', 'trapdoor');
  };

  const handlePointerOver = (e) => {
    e.stopPropagation();
    setHovered(true);
    setHoveredProp('trapdoor');
    playRattle();
  };

  const handlePointerOut = () => {
    setHovered(false);
    setHoveredProp(null);
  };

  return (
    <group
      ref={groupRef}
      position={[0, 0.12, 0.2]}
      onClick={handleClick}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
      cursor="pointer"
    >
      {/* 1. Heavy Wooden Cellar Frame */}
      <mesh receiveShadow>
        <boxGeometry args={[2.5, 0.1, 2.5]} />
        <meshToonMaterial color={toonColors.woodDark} gradientMap={toonGradientMap} />
      </mesh>

      {/* 2. Left and Right Trapdoor Panels */}
      <mesh ref={leftDoorRef} position={[-0.55, 0.05, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.05, 0.08, 2.2]} />
        <meshToonMaterial
          color={hovered ? "#854d0e" : toonColors.trapdoorWood}
          gradientMap={toonGradientMap}
        />
      </mesh>
      <mesh ref={rightDoorRef} position={[0.55, 0.05, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.05, 0.08, 2.2]} />
        <meshToonMaterial
          color={hovered ? "#854d0e" : toonColors.trapdoorWood}
          gradientMap={toonGradientMap}
        />
      </mesh>

      {/* Trapdoor Iron Hinges */}
      <mesh position={[-1.1, 0.1, 0.6]} castShadow>
        <boxGeometry args={[0.3, 0.04, 0.12]} />
        <meshToonMaterial color="#334155" />
      </mesh>
      <mesh position={[-1.1, 0.1, -0.6]} castShadow>
        <boxGeometry args={[0.3, 0.04, 0.12]} />
        <meshToonMaterial color="#334155" />
      </mesh>
      <mesh position={[1.1, 0.1, 0.6]} castShadow>
        <boxGeometry args={[0.3, 0.04, 0.12]} />
        <meshToonMaterial color="#334155" />
      </mesh>
      <mesh position={[1.1, 0.1, -0.6]} castShadow>
        <boxGeometry args={[0.3, 0.04, 0.12]} />
        <meshToonMaterial color="#334155" />
      </mesh>

      {/* 3. Heavy Cartoon Chains crisscrossing */}
      <group position={[0, 0.14, 0]}>
        {/* Chain 1 (Diagonal Left to Right) */}
        <mesh rotation={[0, Math.PI / 4, 0]} castShadow>
          <cylinderGeometry args={[0.045, 0.045, 2.4, 8]} />
          <meshToonMaterial color={toonColors.chainsIron} gradientMap={toonGradientMap} />
        </mesh>
        {/* Chain 2 (Diagonal Right to Left) */}
        <mesh rotation={[0, -Math.PI / 4, 0]} castShadow>
          <cylinderGeometry args={[0.045, 0.045, 2.4, 8]} />
          <meshToonMaterial color={toonColors.chainsIron} gradientMap={toonGradientMap} />
        </mesh>
      </group>

      {/* 4. Comically Oversized Brass Padlock */}
      <group ref={padlockRef} position={[0, 0.32, 0]}>
        {/* Padlock Body */}
        <mesh castShadow>
          <boxGeometry args={[0.42, 0.38, 0.22]} />
          <meshToonMaterial
            color={hovered ? "#fbbf24" : toonColors.lockBrass}
            gradientMap={toonGradientMap}
          />
        </mesh>
        {/* Keyhole */}
        <mesh position={[0, -0.04, 0.12]}>
          <cylinderGeometry args={[0.035, 0.02, 0.02, 8]} />
          <meshBasicMaterial color="#000000" />
        </mesh>
        {/* Shackle U-Ring */}
        <mesh position={[0, 0.22, 0]}>
          <torusGeometry args={[0.16, 0.04, 8, 16, Math.PI]} />
          <meshToonMaterial color="#94a3b8" />
        </mesh>
      </group>

      {/* Mysterious Purple/Cyan Light leaking from under cracks */}
      <pointLight position={[0, 0.15, 0]} color="#a855f7" intensity={hovered ? 5 : 1.5} distance={3} decay={2} />

      {/* Floating Comic Label - Only shown on hover during default overview */}
      {hovered && !activeModal && cameraFocus === 'default' && (
        <Html
          position={[0, 0.9, 0]}
          center
          distanceFactor={14}
          zIndexRange={[10, 0]}
          style={{ pointerEvents: 'none', userSelect: 'none' }}
        >
          <div className="px-3 py-1.5 rounded-lg border-2 border-black font-bold text-xs uppercase tracking-wider shadow-[3px_3px_0px_#000] whitespace-nowrap bg-purple-500 text-white scale-105">
            ⛓️ Rattling Trapdoor • Game Dev Vault
          </div>
        </Html>
      )}
    </group>
  );
}

