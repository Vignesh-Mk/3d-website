import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { toonGradientMap, toonColors } from './materials/ToonPalette';

export function ShackEnvironment() {
  const lightbulbRef = useRef();

  // Subtle swinging pendulum animation for the hanging lightbulb cord
  useFrame((state) => {
    if (lightbulbRef.current) {
      const t = state.clock.getElapsedTime();
      lightbulbRef.current.rotation.z = Math.sin(t * 1.8) * 0.08;
      lightbulbRef.current.rotation.x = Math.cos(t * 1.4) * 0.05;
    }
  });

  // Staggered crooked floorboards
  const floorboards = [];
  const plankCount = 14;
  const plankWidth = 0.68;
  const startX = -4.5;

  for (let i = 0; i < plankCount; i++) {
    const x = startX + i * plankWidth;
    const tilt = ((i % 3) - 1) * 0.015;
    const yOffset = (i % 2 === 0 ? 0.02 : -0.01);
    const color = i % 2 === 0 ? toonColors.woodMedium : toonColors.woodDark;

    floorboards.push(
      <mesh
        key={`plank-${i}`}
        position={[x, 0.05 + yOffset, 0]}
        rotation={[0, tilt, tilt * 0.5]}
        receiveShadow
      >
        <boxGeometry args={[plankWidth - 0.04, 0.12, 9.6]} />
        <meshToonMaterial
          color={color}
          gradientMap={toonGradientMap}
        />
      </mesh>
    );
  }

  return (
    <group name="shack-environment">
      {/* 1. Surrounding Surreal Desert Terrain */}
      <mesh position={[0, -0.1, 0]} receiveShadow>
        <cylinderGeometry args={[26, 28, 0.3, 32]} />
        <meshToonMaterial
          color={toonColors.desertSand}
          gradientMap={toonGradientMap}
        />
      </mesh>

      {/* Desert Rolling Dunes */}
      <mesh position={[-12, -0.4, -10]} rotation={[0.1, 0.4, -0.05]} receiveShadow>
        <boxGeometry args={[14, 2.5, 12]} />
        <meshToonMaterial color={toonColors.desertDune} gradientMap={toonGradientMap} />
      </mesh>
      <mesh position={[12, -0.5, -12]} rotation={[-0.1, -0.3, 0.05]} receiveShadow>
        <boxGeometry args={[16, 2.8, 14]} />
        <meshToonMaterial color={toonColors.desertDune} gradientMap={toonGradientMap} />
      </mesh>
      <mesh position={[6, -0.6, 14]} rotation={[0.05, 0.8, -0.08]} receiveShadow>
        <boxGeometry args={[18, 2.4, 10]} />
        <meshToonMaterial color={toonColors.desertDune} gradientMap={toonGradientMap} />
      </mesh>

      {/* Wonky Telephone Pole in the distance */}
      <group position={[-14, 0, -12]} rotation={[0.08, 0.2, -0.12]}>
        <mesh position={[0, 4.5, 0]} castShadow>
          <cylinderGeometry args={[0.15, 0.22, 9, 8]} />
          <meshToonMaterial color="#2d1e18" gradientMap={toonGradientMap} />
        </mesh>
        <mesh position={[0, 7.8, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.08, 0.08, 2.8, 8]} />
          <meshToonMaterial color="#2d1e18" gradientMap={toonGradientMap} />
        </mesh>
        {/* Insulator caps */}
        <mesh position={[-1.2, 8.1, 0]}>
          <cylinderGeometry args={[0.07, 0.09, 0.25, 8]} />
          <meshToonMaterial color="#e2e8f0" />
        </mesh>
        <mesh position={[1.2, 8.1, 0]}>
          <cylinderGeometry args={[0.07, 0.09, 0.25, 8]} />
          <meshToonMaterial color="#e2e8f0" />
        </mesh>
      </group>

      {/* 2. Shack Wooden Foundation & Planks */}
      <group position={[0, 0, 0]}>
        {floorboards}

        {/* Foundation support beams */}
        <mesh position={[0, -0.05, 4.8]}>
          <boxGeometry args={[9.5, 0.25, 0.3]} />
          <meshToonMaterial color={toonColors.woodDark} gradientMap={toonGradientMap} />
        </mesh>
        <mesh position={[4.8, -0.05, 0]} rotation={[0, Math.PI / 2, 0]}>
          <boxGeometry args={[9.8, 0.25, 0.3]} />
          <meshToonMaterial color={toonColors.woodDark} gradientMap={toonGradientMap} />
        </mesh>
      </group>

      {/* 3. Crooked Back Wall */}
      <group position={[0, 3.2, -4.9]} rotation={[-0.04, 0.02, 0.015]}>
        {/* Main Wall Face */}
        <mesh receiveShadow>
          <boxGeometry args={[9.8, 6.2, 0.3]} />
          <meshToonMaterial
            color={toonColors.wallPaper}
            gradientMap={toonGradientMap}
          />
        </mesh>
        {/* Wallpaper Peel / Stains */}
        <mesh position={[-2.4, 0.8, 0.16]} rotation={[0, 0, 0.1]}>
          <boxGeometry args={[2.2, 3.4, 0.04]} />
          <meshToonMaterial color={toonColors.wallPeel} gradientMap={toonGradientMap} />
        </mesh>
        <mesh position={[3, -1.2, 0.16]} rotation={[0, 0, -0.12]}>
          <boxGeometry args={[1.8, 2.2, 0.04]} />
          <meshToonMaterial color={toonColors.wallPeel} gradientMap={toonGradientMap} />
        </mesh>
        {/* Wall skirting baseboard */}
        <mesh position={[0, -3, 0.2]}>
          <boxGeometry args={[9.8, 0.35, 0.15]} />
          <meshToonMaterial color={toonColors.wallTrim} gradientMap={toonGradientMap} />
        </mesh>
      </group>

      {/* 4. Crooked Left Wall with Wonky Window */}
      <group position={[-4.9, 3.2, 0]} rotation={[0, Math.PI / 2, -0.03]}>
        {/* Left wall lower section */}
        <mesh position={[0, -1.6, 0]} receiveShadow>
          <boxGeometry args={[9.8, 3.2, 0.3]} />
          <meshToonMaterial color={toonColors.wallPaper} gradientMap={toonGradientMap} />
        </mesh>
        {/* Left wall upper pillars framing window */}
        <mesh position={[-3.4, 1.6, 0]}>
          <boxGeometry args={[3, 3.2, 0.3]} />
          <meshToonMaterial color={toonColors.wallPaper} gradientMap={toonGradientMap} />
        </mesh>
        <mesh position={[3.4, 1.6, 0]}>
          <boxGeometry args={[3, 3.2, 0.3]} />
          <meshToonMaterial color={toonColors.wallPaper} gradientMap={toonGradientMap} />
        </mesh>
        {/* Left wall header above window */}
        <mesh position={[0, 2.8, 0]}>
          <boxGeometry args={[4, 1, 0.3]} />
          <meshToonMaterial color={toonColors.wallPaper} gradientMap={toonGradientMap} />
        </mesh>

        {/* 4b. Precision-Fitted Cartoon Window Unit (Perfect Socket Fit, Zero Z-Fighting) */}
        <group position={[0, 1.15, 0]}>
          {/* Protruding Bottom Window Sill */}
          <mesh position={[0, -1.09, 0]} castShadow>
            <boxGeometry args={[4.05, 0.14, 0.44]} />
            <meshToonMaterial color={toonColors.wallTrim} gradientMap={toonGradientMap} />
          </mesh>

          {/* Top Header Trim */}
          <mesh position={[0, 1.09, 0]}>
            <boxGeometry args={[3.95, 0.12, 0.4]} />
            <meshToonMaterial color={toonColors.wallTrim} gradientMap={toonGradientMap} />
          </mesh>

          {/* Left Side Jamb */}
          <mesh position={[-1.84, 0, 0]}>
            <boxGeometry args={[0.14, 2.06, 0.38]} />
            <meshToonMaterial color={toonColors.wallTrim} gradientMap={toonGradientMap} />
          </mesh>

          {/* Right Side Jamb */}
          <mesh position={[1.84, 0, 0]}>
            <boxGeometry args={[0.14, 2.06, 0.38]} />
            <meshToonMaterial color={toonColors.wallTrim} gradientMap={toonGradientMap} />
          </mesh>

          {/* Glass Pane (Stylized Dusk Sunset Glow) */}
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[3.54, 2.04, 0.04]} />
            <meshStandardMaterial
              color="#f59e0b"
              emissive="#8b2671"
              emissiveIntensity={0.45}
              roughness={0.15}
              transparent
              opacity={0.88}
            />
          </mesh>

          {/* Cartoon Window Cross Mullions (Character Wonkiness on Inner Bars) */}
          <mesh position={[0.02, 0, 0.03]} rotation={[0, 0, 0.025]}>
            <boxGeometry args={[0.11, 2.0, 0.08]} />
            <meshToonMaterial color={toonColors.wallTrim} />
          </mesh>
          <mesh position={[0, 0.06, 0.03]} rotation={[0, 0, -0.015]}>
            <boxGeometry args={[3.5, 0.11, 0.08]} />
            <meshToonMaterial color={toonColors.wallTrim} />
          </mesh>
        </group>

        {/* Skirting baseboard */}
        <mesh position={[0, -3, 0.2]}>
          <boxGeometry args={[9.8, 0.35, 0.15]} />
          <meshToonMaterial color={toonColors.wallTrim} gradientMap={toonGradientMap} />
        </mesh>
      </group>

      {/* 5. Slanted Ceiling Beams */}
      <group position={[0, 6.2, 0]} rotation={[0.04, 0, 0.05]}>
        <mesh position={[0, 0, -4.6]}>
          <boxGeometry args={[10.2, 0.35, 0.4]} />
          <meshToonMaterial color={toonColors.woodDark} gradientMap={toonGradientMap} />
        </mesh>
        <mesh position={[-4.7, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
          <boxGeometry args={[10.2, 0.35, 0.4]} />
          <meshToonMaterial color={toonColors.woodDark} gradientMap={toonGradientMap} />
        </mesh>
        {/* Diagonal support truss */}
        <mesh position={[-2, 0.1, -1]} rotation={[0, 0.4, 0]}>
          <boxGeometry args={[8.5, 0.28, 0.35]} />
          <meshToonMaterial color={toonColors.woodMedium} gradientMap={toonGradientMap} />
        </mesh>
      </group>

      {/* 6. Swinging Vintage Bare Lightbulb */}
      <group ref={lightbulbRef} position={[0, 6.1, -0.5]}>
        {/* Dangling cord */}
        <mesh position={[0, -1.2, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 2.4, 6]} />
          <meshToonMaterial color="#1a1a1a" />
        </mesh>
        {/* Bulb socket */}
        <mesh position={[0, -2.45, 0]}>
          <cylinderGeometry args={[0.1, 0.08, 0.2, 8]} />
          <meshToonMaterial color="#b45309" />
        </mesh>
        {/* Glowing bulb */}
        <mesh position={[0, -2.62, 0]}>
          <sphereGeometry args={[0.16, 12, 12]} />
          <meshStandardMaterial
            color="#fffbeb"
            emissive="#fde047"
            emissiveIntensity={1.8}
            roughness={0.2}
          />
        </mesh>
        {/* Warm local room point light */}
        <pointLight position={[0, -2.8, 0]} color="#fde047" intensity={8} distance={12} decay={2} castShadow />
      </group>

      {/* 7. Comedic Oval Braided Rug on Floor */}
      <group position={[-0.4, 0.14, 0.4]} rotation={[-Math.PI / 2, 0, 0.2]}>
        <mesh receiveShadow>
          <ringGeometry args={[0, 1.8, 32]} />
          <meshToonMaterial color="#991b1b" gradientMap={toonGradientMap} />
        </mesh>
        <mesh position={[0, 0, 0.005]}>
          <ringGeometry args={[1.2, 1.6, 32]} />
          <meshToonMaterial color="#e5b83b" gradientMap={toonGradientMap} />
        </mesh>
        <mesh position={[0, 0, 0.01]}>
          <ringGeometry args={[0.5, 0.9, 32]} />
          <meshToonMaterial color="#1e3a8a" gradientMap={toonGradientMap} />
        </mesh>
      </group>
    </group>
  );
}

