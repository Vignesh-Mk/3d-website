import * as THREE from 'three';

// Procedurally generate a stepped gradient map for cartoon cel-shading
export function createToonGradientTexture(steps = 3) {
  if (typeof document === 'undefined') return null;
  const canvas = document.createElement('canvas');
  canvas.width = steps;
  canvas.height = 1;
  const ctx = canvas.getContext('2d');

  for (let i = 0; i < steps; i++) {
    const val = Math.floor((i / (steps - 1)) * 255);
    ctx.fillStyle = `rgb(${val}, ${val}, ${val})`;
    ctx.fillRect(i, 0, 1, 1);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.NearestFilter;
  texture.magFilter = THREE.NearestFilter;
  texture.generateMipmaps = false;
  return texture;
}

export const toonGradientMap = typeof document !== 'undefined' ? createToonGradientTexture(3) : null;

// Reusable cartoon materials palette with cel-shaded gradient maps
export const toonColors = {
  woodDark: '#4a2f1c',
  woodMedium: '#7c4f2e',
  woodLight: '#a67243',
  wallPeel: '#936a53',
  wallPaper: '#bb8f6e',
  wallTrim: '#3e2516',
  desertSand: '#d48d48',
  desertDune: '#9f503e',
  crtCase: '#e5e1c8',
  crtScreen: '#182b19',
  crtScreenGlow: '#33ff33',
  trapdoorWood: '#543825',
  chainsIron: '#475569',
  lockBrass: '#f59e0b',
  fridgeBody: '#e2e8f0',
  fridgeHandle: '#94a3b8',
  frameWood: '#b45309',
  acmePedestal: '#334155',
  acmeButtonRed: '#ef4444',
  acmeStripeYellow: '#fbbf24',
  acmeStripeBlack: '#0f172a',
};

