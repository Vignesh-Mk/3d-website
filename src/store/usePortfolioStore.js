import { create } from 'zustand';

export const usePortfolioStore = create((set) => ({
  activeModal: null, // 'terminal' | 'vault' | 'skills' | 'resume' | 'academics' | null
  cameraFocus: 'default', // 'crt' | 'trapdoor' | 'fridge' | 'portraits' | 'acme' | 'default'
  hoveredProp: null, // string | null
  isMuted: false,
  viewMode: '3d', // '3d' | 'flat'
  hasInteractedAudio: false,

  openModal: (modalName, targetFocus) => set({
    activeModal: modalName,
    cameraFocus: targetFocus || 'default',
  }),

  closeModal: () => set({
    activeModal: null,
    cameraFocus: 'default',
  }),

  setHoveredProp: (propName) => set({
    hoveredProp: propName,
  }),

  toggleSound: () => set((state) => ({ 
    isMuted: !state.isMuted,
    hasInteractedAudio: true 
  })),

  setViewMode: (mode) => set({ 
    viewMode: mode,
    activeModal: null,
    cameraFocus: 'default'
  }),

  resetCamera: () => set({
    cameraFocus: 'default',
    activeModal: null
  })
}));

