import { X, Gamepad2, ExternalLink, Sparkles, Box } from 'lucide-react';
import { GithubIcon } from '../../common/Icons';
import { portfolioData } from '../../../data/portfolioData';
import { usePortfolioStore } from '../../../store/usePortfolioStore';
import { useSoundEffects } from '../../../hooks/useSoundEffects';

export function GameVaultModal() {
  const closeModal = usePortfolioStore((state) => state.closeModal);
  const { playClick, playSwoosh } = useSoundEffects();
  const { gameDev } = portfolioData;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[90vh] flex flex-col bg-plum-dark border-4 border-purple-500 rounded-2xl shadow-[0_0_50px_rgba(168,85,247,0.35)] text-white overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-purple-950/60 border-b-2 border-purple-500/50">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-purple-600 rounded-lg text-white shadow-md">
              <Gamepad2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="cartoon-heading text-lg sm:text-xl text-yellow-300">
                The Cellar Void // Game Development Vault
              </h3>
              <p className="text-xs text-purple-200">
                Interactive real-time 3D, Unity engines, custom shaders & quirky physics
              </p>
            </div>
          </div>
          <button
            onClick={() => { playClick(); closeModal(); }}
            className="p-1.5 rounded-lg bg-purple-900/60 text-purple-300 hover:bg-purple-600 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 p-6 overflow-y-auto space-y-6">
          <div className="p-4 rounded-xl bg-purple-900/30 border border-purple-500/30 text-purple-100 text-sm flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-yellow-300 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-white">Creative Philosophy: </span>
              {gameDev.overview}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {gameDev.projects.map((proj, idx) => (
              <div
                key={idx}
                className="cartoon-card bg-[#1a0c2e] p-5 flex flex-col justify-between hover:border-yellow-400 transition-all duration-200"
              >
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-purple-900 text-yellow-300 border border-purple-600">
                      {proj.genre}
                    </span>
                    <span className="text-xs font-mono text-purple-300">
                      {proj.engine}
                    </span>
                  </div>

                  <h4 className="text-lg font-bold text-white mb-2">{proj.title}</h4>
                  <p className="text-xs text-purple-200/90 leading-relaxed mb-4">
                    {proj.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {proj.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-[11px] px-2 py-0.5 rounded bg-purple-950 text-purple-200 border border-purple-800 font-mono"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-3 border-t border-purple-800/40">
                  {proj.appStoreUrl ? (
                    <a
                      href={proj.appStoreUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => playSwoosh()}
                      className="flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors shadow-sm"
                    >
                      <Box className="w-4 h-4" />
                      Google Play Store
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  ) : (
                    <div className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-purple-950/70 border border-purple-700/60 text-purple-200 text-xs font-semibold">
                      <span>Live Production Release</span>
                    </div>
                  )}
                  <a
                    href={proj.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => playClick()}
                    className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-black/40 hover:bg-black/70 text-purple-200 hover:text-white text-xs transition-colors border border-purple-700"
                  >
                    <GithubIcon className="w-4 h-4" />
                    GitHub
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Real-time Shader Spotlight Card */}
          <div className="p-5 rounded-xl bg-gradient-to-r from-purple-900/40 via-indigo-900/30 to-purple-900/40 border-2 border-dashed border-purple-500/60">
            <h4 className="font-bold text-yellow-300 text-sm flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4" />
              Technical Game Dev Highlights
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-purple-200">
              <div className="p-3 bg-black/30 rounded-lg">
                <span className="font-bold text-white block mb-1">Stepped Cel Shaders:</span>
                Custom URP & GLSL lighting ramps giving 3D scenes an illustrated comic-strip feeling.
              </div>
              <div className="p-3 bg-black/30 rounded-lg">
                <span className="font-bold text-white block mb-1">Cartoon Ragdoll Physics:</span>
                Spring-damper constraints for squash, stretch, and exaggerated comedic impacts.
              </div>
              <div className="p-3 bg-black/30 rounded-lg">
                <span className="font-bold text-white block mb-1">Procedural Level Gen:</span>
                Wave Function Collapse & BSP tree algorithms generating endless labyrinthine shacks.
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-purple-950/80 border-t border-purple-800 flex justify-end">
          <button
            onClick={() => { playClick(); closeModal(); }}
            className="cartoon-btn px-5 py-2 bg-yellow-400 text-black font-bold text-xs uppercase rounded-lg hover:bg-yellow-300"
          >
            Close Cellar Vault
          </button>
        </div>
      </div>
    </div>
  );
}
