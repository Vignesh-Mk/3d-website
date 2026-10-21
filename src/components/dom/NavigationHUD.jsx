import { Volume2, VolumeX, RotateCcw, FileText, Sparkles, HelpCircle, Compass } from 'lucide-react';
import { usePortfolioStore } from '../../store/usePortfolioStore';
import { useSoundEffects } from '../../hooks/useSoundEffects';

export function NavigationHUD() {
  const isMuted = usePortfolioStore((state) => state.isMuted);
  const toggleSound = usePortfolioStore((state) => state.toggleSound);
  const setViewMode = usePortfolioStore((state) => state.setViewMode);
  const resetCamera = usePortfolioStore((state) => state.resetCamera);
  const hoveredProp = usePortfolioStore((state) => state.hoveredProp);
  const activeModal = usePortfolioStore((state) => state.activeModal);

  const { playClick, playBoing, playSwoosh } = useSoundEffects();

  const handleSwitchToFlat = () => {
    playClick();
    setViewMode('flat');
  };

  const handleReset = () => {
    playSwoosh();
    resetCamera();
  };

  const handleToggleSound = () => {
    toggleSound();
    if (isMuted) {
      setTimeout(() => playBoing(), 50);
    }
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-40 flex flex-col justify-between p-4 sm:p-6">
      
      {/* Top Header Row */}
      <div className="flex items-center justify-between w-full pointer-events-auto">
        
        {/* Brand / Title Banner */}
        <div className="cartoon-card bg-plum/90 backdrop-blur-md px-4 py-2 flex items-center gap-3">
          <span className="text-2xl animate-wiggle">🏚️</span>
          <div>
            <h1 className="cartoon-heading text-sm sm:text-base text-yellow-300 leading-none">
              Nowhere Shack
            </h1>
            <p className="text-[10px] sm:text-xs text-purple-200 uppercase tracking-widest font-mono">
              Abstract 3D Portfolio
            </p>
          </div>
        </div>

        {/* Top Controls: Sound, Reset, Clean View */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Audio Mute/Unmute */}
          <button
            onClick={handleToggleSound}
            className={`cartoon-btn p-2.5 rounded-xl flex items-center justify-center transition-all ${
              isMuted
                ? 'bg-red-950 text-red-300 border-red-700'
                : 'bg-emerald-950 text-emerald-300 border-emerald-600'
            }`}
            title={isMuted ? 'Unmute Cartoon SFX' : 'Mute Sound'}
          >
            {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
          </button>

          {/* Reset Camera View */}
          <button
            onClick={handleReset}
            className="cartoon-btn p-2.5 rounded-xl bg-purple-950 text-purple-200 border-purple-700 hover:text-white transition-all flex items-center gap-1.5 text-xs font-bold"
            title="Reset Camera Angle"
          >
            <RotateCcw className="w-5 h-5" />
            <span className="hidden sm:inline">Reset Camera</span>
          </button>

          {/* Primary View Switcher: Recruiter / Clean 2D View */}
          <button
            onClick={handleSwitchToFlat}
            className="cartoon-btn px-4 py-2.5 rounded-xl bg-mustard hover:bg-mustard-light text-black font-bold text-xs sm:text-sm flex items-center gap-2 shadow-md uppercase tracking-wide"
          >
            <FileText className="w-4 h-4 text-black" />
            <span>Switch to Clean View (Resume/List)</span>
          </button>
        </div>
      </div>

      {/* Bottom Controls / Hints Row - Only visible when exploring shack, hidden during modal inspection */}
      {!activeModal && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 w-full animate-in fade-in duration-200">
          
          {/* Interaction Guide */}
          <div className="cartoon-card bg-black/80 backdrop-blur-md px-4 py-2 text-xs text-stone-200 flex items-center gap-3 pointer-events-auto">
            <Compass className="w-4 h-4 text-yellow-300 shrink-0" />
            <div className="flex items-center gap-2 text-[11px] sm:text-xs">
              <span className="font-bold text-yellow-300">Click &amp; Inspect Props:</span>
              <span className="text-stone-400 hidden sm:inline">•</span>
              <span className={`transition-colors ${hoveredProp === 'crt' ? 'text-yellow-300 font-bold underline' : 'text-stone-300'}`}>🖥️ CRT (QA)</span>
              <span className={`transition-colors ${hoveredProp === 'trapdoor' ? 'text-yellow-300 font-bold underline' : 'text-stone-300'}`}>⛓️ Trapdoor (Game Dev)</span>
              <span className={`transition-colors ${hoveredProp === 'fridge' ? 'text-yellow-300 font-bold underline' : 'text-stone-300'}`}>🧊 Fridge (Skills)</span>
              <span className={`transition-colors ${hoveredProp === 'portraits' ? 'text-yellow-300 font-bold underline' : 'text-stone-300'}`}>👀 Portraits (Certs)</span>
              <span className={`transition-colors ${hoveredProp === 'acme' ? 'text-yellow-300 font-bold underline' : 'text-stone-300'}`}>💥 ACME (Resume)</span>
            </div>
          </div>

          {/* Orbit / Navigation Controls Reminder */}
          <div className="hidden lg:flex cartoon-card bg-purple-950/80 backdrop-blur-md px-3.5 py-1.5 text-[11px] text-purple-200 items-center gap-2 font-mono">
            <span>🖱️ Left-Click + Drag to Orbit</span>
            <span>•</span>
            <span>Right-Click to Pan</span>
            <span>•</span>
            <span>Scroll to Zoom</span>
          </div>
        </div>
      )}
    </div>
  );
}

