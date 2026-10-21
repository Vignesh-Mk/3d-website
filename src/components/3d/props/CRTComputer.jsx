import { useRef, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { usePortfolioStore } from '../../../store/usePortfolioStore';
import { useSoundEffects } from '../../../hooks/useSoundEffects';
import { toonGradientMap, toonColors } from '../materials/ToonPalette';

export function CRTComputer() {
  const meshRef = useRef();
  const screenRef = useRef();
  const [hovered, setHovered] = useState(false);
  const openModal = usePortfolioStore((state) => state.openModal);
  const activeModal = usePortfolioStore((state) => state.activeModal);
  const cameraFocus = usePortfolioStore((state) => state.cameraFocus);
  const setHoveredProp = usePortfolioStore((state) => state.setHoveredProp);
  const { playClick, playComputerBeep } = useSoundEffects();

  // Create dynamic canvas for blinking snarky ASCII CRT screen face
  const screenCanvas = useMemo(() => {
    if (typeof document === 'undefined') return null;
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    return canvas;
  }, []);

  const screenTexture = useMemo(() => {
    if (!screenCanvas) return null;
    const tex = new THREE.CanvasTexture(screenCanvas);
    tex.generateMipmaps = false;
    tex.minFilter = THREE.NearestFilter;
    tex.magFilter = THREE.NearestFilter;
    return tex;
  }, [screenCanvas]);

  // Animate screen face and hover squish
  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    // Hover breathing / wiggle animation
    if (meshRef.current) {
      if (hovered) {
        meshRef.current.scale.y = 1 + Math.sin(t * 12) * 0.04;
        meshRef.current.scale.x = 1 - Math.sin(t * 12) * 0.02;
        meshRef.current.rotation.y = -0.3 + Math.sin(t * 6) * 0.04;
      } else {
        meshRef.current.scale.set(1, 1, 1);
        meshRef.current.rotation.y = -0.3;
      }
    }

    // Dynamic CRT screen rendering
    if (screenCanvas && screenTexture) {
      const ctx = screenCanvas.getContext('2d');
      ctx.fillStyle = '#0a1a0a';
      ctx.fillRect(0, 0, 256, 256);

      // CRT Scanlines
      ctx.fillStyle = 'rgba(0, 255, 60, 0.06)';
      for (let y = 0; y < 256; y += 4) {
        ctx.fillRect(0, y, 256, 2);
      }

      // Snarky Computer Face (Courage homage)
      ctx.fillStyle = '#33ff33';
      ctx.font = 'bold 36px monospace';
      ctx.textAlign = 'center';

      const blink = Math.sin(t * 3) > 0.92;
      const faceText = hovered
        ? "(¬_¬) ?"
        : blink
        ? "(- _ -)"
        : "(• _ •)";

      ctx.fillText(faceText, 128, 110);

      // Terminal prompt ticker
      ctx.font = '14px monospace';
      ctx.fillStyle = '#00ff66';
      const promptText = hovered ? "> CLICK TO RUN TESTS" : "> QA_KERNEL_IDLE...";
      ctx.fillText(promptText, 128, 175);

      screenTexture.needsUpdate = true;
    }
  });

  const handleClick = (e) => {
    e.stopPropagation();
    setHovered(false);
    setHoveredProp(null);
    playClick();
    playComputerBeep(640);
    openModal('terminal', 'crt');
  };

  const handlePointerOver = (e) => {
    e.stopPropagation();
    setHovered(true);
    setHoveredProp('crt');
    playComputerBeep(440);
  };

  const handlePointerOut = () => {
    setHovered(false);
    setHoveredProp(null);
  };

  return (
    <group
      ref={meshRef}
      position={[-3.3, 0, -1.2]}
      rotation={[0, -0.3, 0]}
      onClick={handleClick}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
      cursor="pointer"
    >
      {/* 1. Rickety Three-Legged Wooden Desk */}
      <group position={[0, 0, 0]}>
        {/* Tabletop with crooked angle */}
        <mesh position={[0, 1.45, 0]} rotation={[0.02, 0.05, -0.01]} castShadow receiveShadow>
          <boxGeometry args={[1.8, 0.12, 1.2]} />
          <meshToonMaterial color={toonColors.woodMedium} gradientMap={toonGradientMap} />
        </mesh>
        {/* Desk Leg 1 (Front Left) */}
        <mesh position={[-0.75, 0.72, 0.45]} rotation={[0.05, 0, -0.08]} castShadow>
          <cylinderGeometry args={[0.05, 0.07, 1.45, 6]} />
          <meshToonMaterial color={toonColors.woodDark} gradientMap={toonGradientMap} />
        </mesh>
        {/* Desk Leg 2 (Front Right) */}
        <mesh position={[0.75, 0.72, 0.45]} rotation={[0.05, 0, 0.06]} castShadow>
          <cylinderGeometry args={[0.05, 0.07, 1.45, 6]} />
          <meshToonMaterial color={toonColors.woodDark} gradientMap={toonGradientMap} />
        </mesh>
        {/* Desk Leg 3 (Back Center - Rickety 3rd leg) */}
        <mesh position={[0, 0.72, -0.45]} rotation={[-0.08, 0, 0.02]} castShadow>
          <cylinderGeometry args={[0.06, 0.08, 1.45, 6]} />
          <meshToonMaterial color={toonColors.woodDark} gradientMap={toonGradientMap} />
        </mesh>
      </group>

      {/* 2. Sarcastic CRT Monitor Housing */}
      <group position={[0, 2.05, 0]}>
        {/* Monitor Base swivel */}
        <mesh position={[0, -0.5, 0]}>
          <cylinderGeometry args={[0.22, 0.28, 0.12, 8]} />
          <meshToonMaterial color="#64748b" gradientMap={toonGradientMap} />
        </mesh>
        {/* CRT Main Casing (Beige plastic) */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[1.05, 0.95, 0.95]} />
          <meshToonMaterial
            color={hovered ? "#fef08a" : toonColors.crtCase}
            gradientMap={toonGradientMap}
          />
        </mesh>
        {/* CRT Beveled Screen Bezel */}
        <mesh position={[0, 0.02, 0.48]}>
          <boxGeometry args={[0.9, 0.76, 0.08]} />
          <meshToonMaterial color="#334155" />
        </mesh>
        {/* Curved Glass CRT Screen with Dynamic Canvas */}
        <mesh ref={screenRef} position={[0, 0.02, 0.52]}>
          <planeGeometry args={[0.82, 0.68]} />
          {screenTexture ? (
            <meshBasicMaterial map={screenTexture} />
          ) : (
            <meshBasicMaterial color="#14532d" />
          )}
        </mesh>

        {/* Vintage Keyboard */}
        <mesh position={[0, -0.52, 0.62]} rotation={[0.1, 0, 0]} castShadow>
          <boxGeometry args={[0.85, 0.06, 0.32]} />
          <meshToonMaterial color="#cbd5e1" gradientMap={toonGradientMap} />
        </mesh>

        {/* Rollerball Mouse */}
        <mesh position={[0.55, -0.52, 0.6]} castShadow>
          <boxGeometry args={[0.14, 0.06, 0.18]} />
          <meshToonMaterial color="#cbd5e1" gradientMap={toonGradientMap} />
        </mesh>

        {/* Coiled Erratic Cable */}
        <mesh position={[-0.45, -0.4, -0.3]}>
          <torusGeometry args={[0.18, 0.025, 8, 24]} />
          <meshToonMaterial color="#1e293b" />
        </mesh>
      </group>

      {/* Floating Comic Label - Only shown on hover during default overview */}
      {hovered && !activeModal && cameraFocus === 'default' && (
        <Html
          position={[0, 2.9, 0]}
          center
          distanceFactor={14}
          zIndexRange={[10, 0]}
          style={{ pointerEvents: 'none', userSelect: 'none' }}
        >
          <div className="px-3 py-1.5 rounded-lg border-2 border-black font-bold text-xs uppercase tracking-wider shadow-[3px_3px_0px_#000] whitespace-nowrap bg-mustard text-black scale-105">
            💻 CRT Terminal • QA / SDET Hub
          </div>
        </Html>
      )}
    </group>
  );
}

