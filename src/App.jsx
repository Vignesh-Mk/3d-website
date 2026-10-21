import { useEffect } from 'react';
import { Scene } from './components/3d/Scene';
import { NavigationHUD } from './components/dom/NavigationHUD';
import { FlatPortfolioView } from './components/dom/FlatPortfolioView';
import { TerminalModal } from './components/dom/modals/TerminalModal';
import { GameVaultModal } from './components/dom/modals/GameVaultModal';
import { SkillsModal } from './components/dom/modals/SkillsModal';
import { PortraitsModal } from './components/dom/modals/PortraitsModal';
import { ResumeModal } from './components/dom/modals/ResumeModal';
import { usePortfolioStore } from './store/usePortfolioStore';

export default function App() {
  const viewMode = usePortfolioStore((state) => state.viewMode);
  const activeModal = usePortfolioStore((state) => state.activeModal);
  const closeModal = usePortfolioStore((state) => state.closeModal);
  const toggleSound = usePortfolioStore((state) => state.toggleSound);
  const setViewMode = usePortfolioStore((state) => state.setViewMode);

  // Sync body overflow and text selection with viewMode
  useEffect(() => {
    if (viewMode === 'flat') {
      document.body.style.overflowY = 'auto';
      document.body.style.overflowX = 'hidden';
      document.body.style.userSelect = 'auto';
    } else {
      document.body.style.overflow = 'hidden';
      document.body.style.userSelect = 'none';
    }
  }, [viewMode]);

  // Global Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        closeModal();
      } else if (e.key === 'm' || e.key === 'M') {
        // Toggle sound if not typing in input
        if (e.target.tagName !== 'INPUT') {
          toggleSound();
        }
      } else if (e.key === 'v' || e.key === 'V') {
        if (e.target.tagName !== 'INPUT') {
          setViewMode(viewMode === '3d' ? 'flat' : '3d');
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [closeModal, toggleSound, setViewMode, viewMode]);

  if (viewMode === 'flat') {
    return <FlatPortfolioView />;
  }

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-plum select-none">
      {/* 3D WebGL Canvas Scene */}
      <Scene />

      {/* Persistent DOM Navigation Heads-Up Display */}
      <NavigationHUD />

      {/* Category-Specific Modals */}
      {activeModal === 'terminal' && <TerminalModal />}
      {activeModal === 'vault' && <GameVaultModal />}
      {activeModal === 'skills' && <SkillsModal />}
      {activeModal === 'academics' && <PortraitsModal />}
      {activeModal === 'resume' && <ResumeModal />}
    </div>
  );
}

