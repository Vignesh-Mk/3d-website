import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { usePortfolioStore } from '../../../store/usePortfolioStore';
import { useSoundEffects } from '../../../hooks/useSoundEffects';
import { toonGradientMap, toonColors } from '../materials/ToonPalette';

export function Portraits() {
  const [hovered, setHovered] = useState(false);
  const leftPupil1 = useRef();
  const rightPupil1 = useRef();
  const leftPupil2 = useRef();
  const rightPupil2 = useRef();

  const openModal = usePortfolioStore((state) => state.openModal);
  const activeModal = usePortfolioStore((state) => state.activeModal);
  const cameraFocus = usePortfolioStore((state) => state.cameraFocus);
  const setHoveredProp = usePortfolioStore((state) => state.setHoveredProp);
  const { playClick, playFanfare } = useSoundEffects();

  // Eyeballs track cursor position
  useFrame((state) => {
    const px = THREE.MathUtils.clamp(state.pointer.x * 0.05, -0.05, 0.05);
    const py = THREE.MathUtils.clamp(state.pointer.y * 0.05, -0.05, 0.05);

    // Frame 1 pupils (Left Portrait)
    if (leftPupil1.current && rightPupil1.current) {
      leftPupil1.current.position.x = -0.12 + px;
      leftPupil1.current.position.y = 0.05 + py;

      rightPupil1.current.position.x = 0.12 + px;
      rightPupil1.current.position.y = 0.05 + py;
    }

    // Frame 2 pupils (Right Portrait)
    if (leftPupil2.current && rightPupil2.current) {
      leftPupil2.current.position.x = -0.11 + px;
      leftPupil2.current.position.y = 0.05 + py;

      rightPupil2.current.position.x = 0.11 + px;
      rightPupil2.current.position.y = 0.05 + py;
    }
  });

  const handleClick = (e) => {
    e.stopPropagation();
    setHovered(false);
    setHoveredProp(null);
    playClick();
    playFanfare();
    openModal('academics', 'portraits');
  };

  const handlePointerOver = (e) => {
    e.stopPropagation();
    setHovered(true);
    setHoveredProp('portraits');
    playClick();
  };

  const handlePointerOut = () => {
    setHovered(false);
    setHoveredProp(null);
  };

  return (
    <group
      position={[-0.3, 4.2, -4.68]}
      onClick={handleClick}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
      cursor="pointer"
    >
      {/* 1. Left Portrait Frame: The Scholarly Elder (MCA Degree) */}
      <group position={[-1.3, 0, 0]} rotation={[0, 0, -0.09]}>
        {/* Frame Wood Trim */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[1.5, 1.8, 0.1]} />
          <meshToonMaterial
            color={hovered ? "#d97706" : toonColors.frameWood}
            gradientMap={toonGradientMap}
          />
        </mesh>
        {/* Parchment Canvas Backdrop */}
        <mesh position={[0, 0, 0.055]}>
          <planeGeometry args={[1.25, 1.55]} />
          <meshToonMaterial color="#fef3c7" />
        </mesh>

        {/* Cartoon Character Silhouette */}
        {/* Head */}
        <mesh position={[0, -0.05, 0.06]}>
          <circleGeometry args={[0.38, 16]} />
          <meshBasicMaterial color="#e2e8f0" />
        </mesh>
        {/* Scholarly Mortarboard Cap */}
        <mesh position={[0, 0.32, 0.07]} rotation={[0, 0, 0.1]}>
          <boxGeometry args={[0.65, 0.1, 0.02]} />
          <meshBasicMaterial color="#1e293b" />
        </mesh>
        <mesh position={[0.22, 0.22, 0.07]}>
          <cylinderGeometry args={[0.015, 0.015, 0.2, 6]} />
          <meshBasicMaterial color="#eab308" />
        </mesh>

        {/* Eyes & Eyeballs */}
        <mesh position={[-0.12, 0.05, 0.065]}>
          <circleGeometry args={[0.09, 12]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
        <mesh position={[0.12, 0.05, 0.065]}>
          <circleGeometry args={[0.09, 12]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>

        {/* Dynamic Tracking Pupils */}
        <mesh ref={leftPupil1} position={[-0.12, 0.05, 0.072]}>
          <circleGeometry args={[0.045, 10]} />
          <meshBasicMaterial color="#000000" />
        </mesh>
        <mesh ref={rightPupil1} position={[0.12, 0.05, 0.072]}>
          <circleGeometry args={[0.045, 10]} />
          <meshBasicMaterial color="#000000" />
        </mesh>

        {/* Mustache */}
        <mesh position={[0, -0.14, 0.065]}>
          <boxGeometry args={[0.3, 0.06, 0.01]} />
          <meshBasicMaterial color="#334155" />
        </mesh>
      </group>

      {/* 2. Right Portrait Frame: The Certified Inspector (ISTQB / Cloud) */}
      <group position={[1.3, 0.2, 0]} rotation={[0, 0, 0.07]}>
        {/* Frame Wood Trim */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[1.6, 1.9, 0.1]} />
          <meshToonMaterial
            color={hovered ? "#d97706" : toonColors.frameWood}
            gradientMap={toonGradientMap}
          />
        </mesh>
        {/* Parchment Canvas Backdrop */}
        <mesh position={[0, 0, 0.055]}>
          <planeGeometry args={[1.35, 1.65]} />
          <meshToonMaterial color="#fffbeb" />
        </mesh>

        {/* Character Silhouette */}
        <mesh position={[0, -0.1, 0.06]}>
          <circleGeometry args={[0.4, 16]} />
          <meshBasicMaterial color="#fcd34d" />
        </mesh>

        {/* Big Detective Glasses */}
        <mesh position={[-0.11, 0.05, 0.068]}>
          <ringGeometry args={[0.08, 0.11, 16]} />
          <meshBasicMaterial color="#1e293b" />
        </mesh>
        <mesh position={[0.11, 0.05, 0.068]}>
          <ringGeometry args={[0.08, 0.11, 16]} />
          <meshBasicMaterial color="#1e293b" />
        </mesh>
        {/* Glass bridge */}
        <mesh position={[0, 0.05, 0.068]}>
          <boxGeometry args={[0.08, 0.03, 0.01]} />
          <meshBasicMaterial color="#1e293b" />
        </mesh>

        {/* Eyeball whites */}
        <mesh position={[-0.11, 0.05, 0.065]}>
          <circleGeometry args={[0.08, 12]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
        <mesh position={[0.11, 0.05, 0.065]}>
          <circleGeometry args={[0.08, 12]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>

        {/* Dynamic Tracking Pupils */}
        <mesh ref={leftPupil2} position={[-0.11, 0.05, 0.072]}>
          <circleGeometry args={[0.045, 10]} />
          <meshBasicMaterial color="#000000" />
        </mesh>
        <mesh ref={rightPupil2} position={[0.11, 0.05, 0.072]}>
          <circleGeometry args={[0.045, 10]} />
          <meshBasicMaterial color="#000000" />
        </mesh>

        {/* Little Cert Gold Wax Seal */}
        <mesh position={[0.42, -0.58, 0.068]}>
          <circleGeometry args={[0.15, 12]} />
          <meshBasicMaterial color="#dc2626" />
        </mesh>
        <mesh position={[0.42, -0.58, 0.072]}>
          <circleGeometry args={[0.09, 10]} />
          <meshBasicMaterial color="#f59e0b" />
        </mesh>
      </group>

      {/* Floating Comic Label - Only shown on hover during default overview */}
      {hovered && !activeModal && cameraFocus === 'default' && (
        <Html
          position={[0, 1.4, 0]}
          center
          distanceFactor={14}
          zIndexRange={[10, 0]}
          style={{ pointerEvents: 'none', userSelect: 'none' }}
        >
          <div className="px-3 py-1.5 rounded-lg border-2 border-black font-bold text-xs uppercase tracking-wider shadow-[3px_3px_0px_#000] whitespace-nowrap bg-amber-400 text-black scale-105">
            👀 Crooked Portraits • Academics & Certs
          </div>
        </Html>
      )}
    </group>
  );
}

