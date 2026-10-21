import { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { usePortfolioStore } from '../../store/usePortfolioStore';

const CAMERA_CONFIGS = {
  default: {
    pos: [14, 11, 14],
    target: [0, 1.5, 0],
    fov: 38
  },
  crt: {
    pos: [-1.2, 3.2, 1.8],
    target: [-3.6, 2.6, -1.2],
    fov: 32
  },
  trapdoor: {
    pos: [0, 5.5, 2.5],
    target: [0, 0.1, 0.2],
    fov: 34
  },
  fridge: {
    pos: [1.2, 3.2, -0.2],
    target: [3.4, 2.5, -3.2],
    fov: 32
  },
  portraits: {
    pos: [-0.3, 4.2, -1.2],
    target: [-0.3, 4.2, -4.8],
    fov: 30
  },
  acme: {
    pos: [4.2, 2.8, 3.8],
    target: [2.8, 1.1, 2.2],
    fov: 32
  }
};

export function CameraController() {
  const cameraFocus = usePortfolioStore((state) => state.cameraFocus);
  const { camera } = useThree();

  const currentLookAt = useRef(new THREE.Vector3(0, 1.5, 0));
  const targetLookAt = useRef(new THREE.Vector3(0, 1.5, 0));
  const targetPos = useRef(new THREE.Vector3(14, 11, 14));

  useEffect(() => {
    const config = CAMERA_CONFIGS[cameraFocus] || CAMERA_CONFIGS.default;
    targetPos.current.set(...config.pos);
    targetLookAt.current.set(...config.target);
  }, [cameraFocus]);

  useFrame((state, delta) => {
    // Smooth lerp camera position
    const lerpSpeed = 4.5 * delta;
    camera.position.lerp(targetPos.current, THREE.MathUtils.clamp(lerpSpeed, 0, 1));
    currentLookAt.current.lerp(targetLookAt.current, THREE.MathUtils.clamp(lerpSpeed, 0, 1));
    camera.lookAt(currentLookAt.current);
  });

  return null;
}

