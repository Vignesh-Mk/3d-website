import { Canvas } from '@react-three/fiber';
import { OrbitControls, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import { ShackEnvironment } from './ShackEnvironment';
import { CRTComputer } from './props/CRTComputer';
import { Trapdoor } from './props/Trapdoor';
import { Fridge } from './props/Fridge';
import { Portraits } from './props/Portraits';
import { AcmeButton } from './props/AcmeButton';
import { CameraController } from './CameraController';
import { usePortfolioStore } from '../../store/usePortfolioStore';

export function Scene() {
  const activeModal = usePortfolioStore((state) => state.activeModal);

  return (
    <div className="w-full h-full relative cursor-grab active:cursor-grabbing">
      <Canvas
        shadows
        camera={{ position: [14, 11, 14], fov: 38 }}
        gl={{
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.15
        }}
        onCreated={({ scene }) => {
          // Courage the Cowardly Dog signature plum/magenta dusk fog
          scene.fog = new THREE.FogExp2('#220b38', 0.038);
          scene.background = new THREE.Color('#220b38');
        }}
      >
        {/* Camera Lerp Controller */}
        <CameraController />

        {/* Orbit Controls (soft limits to prevent tumbling under floor) */}
        <OrbitControls
          enabled={!activeModal}
          enablePan={true}
          enableZoom={true}
          minDistance={6}
          maxDistance={24}
          maxPolarAngle={Math.PI / 2.05} // Do not clip under ground plane
          minPolarAngle={Math.PI / 8}
          dampingFactor={0.08}
        />

        {/* 1. Dramatic Cartoon Dusk Lighting */}
        {/* Soft Ambient Fill */}
        <ambientLight color="#fbcfe8" intensity={0.65} />

        {/* Toxic Mustard Sun/Moon Directional Light */}
        <directionalLight
          position={[12, 16, 8]}
          color="#fef08a"
          intensity={1.8}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-camera-far={40}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
          shadow-bias={-0.0005}
        />

        {/* Deep Magenta Rim Light (silhouette pop) */}
        <directionalLight
          position={[-12, 8, -12]}
          color="#db2777"
          intensity={1.4}
        />

        {/* Cyan bounce from desert floor */}
        <hemisphereLight
          skyColor="#f472b6"
          groundColor="#854d0e"
          intensity={0.5}
        />

        {/* 2. Soft Contact Shadows */}
        <ContactShadows
          position={[0, 0.02, 0]}
          opacity={0.65}
          scale={18}
          blur={1.8}
          far={8}
          resolution={512}
          color="#140622"
        />

        {/* 3. The Shack Environment (Walls, Floorboards, Landscape, Beams) */}
        <ShackEnvironment />

        {/* 4. The 5 Interactive Cartoon Props */}
        {/* Prop 1: CRT Computer (QA/SDET Hub) */}
        <CRTComputer />

        {/* Prop 2: Rattling Padlocked Trapdoor (Game Dev Vault) */}
        <Trapdoor />

        {/* Prop 3: Bulging Refrigerator (Skills & Tech Stack) */}
        <Fridge />

        {/* Prop 4: Crooked Portraits with Tracking Eyes (Academics & Certs) */}
        <Portraits />

        {/* Prop 5: Red ACME Plunger Button (About & Resume) */}
        <AcmeButton />
      </Canvas>
    </div>
  );
}

