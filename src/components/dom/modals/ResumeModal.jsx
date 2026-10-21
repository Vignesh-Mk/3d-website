import { X, Download, Mail, Phone, MapPin, Sparkles, FileText } from 'lucide-react';
import { GithubIcon, LinkedinIcon, TwitterIcon } from '../../common/Icons';
import confetti from 'canvas-confetti';
import { portfolioData } from '../../../data/portfolioData';
import { usePortfolioStore } from '../../../store/usePortfolioStore';
import { useSoundEffects } from '../../../hooks/useSoundEffects';

export function ResumeModal() {
  const closeModal = usePortfolioStore((state) => state.closeModal);
  const setViewMode = usePortfolioStore((state) => state.setViewMode);
  const { playClick, playBoing, playFanfare } = useSoundEffects();
  const { personal } = portfolioData;

  const handleDownload = () => {
    playBoing();
    playFanfare();
    try {
      confetti({
        particleCount: 80,
        spread: 90,
        origin: { y: 0.5 },
        colors: ['#ef4444', '#f59e0b', '#3b82f6', '#10b981']
      });
    } catch {
      // ignore
    }

    // Switch to clean flat view and trigger native browser print / save-as-PDF
    setTimeout(() => {
      closeModal();
      setViewMode('flat');
      setTimeout(() => {
        window.print();
      }, 500);
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl max-h-[90vh] flex flex-col bg-slate-900 border-4 border-red-500 rounded-2xl shadow-[0_0_50px_rgba(239,68,68,0.35)] text-white overflow-hidden">
        
        {/* Header with ACME Hazard Caution */}
        <div className="flex items-center justify-between px-6 py-4 bg-red-950/80 border-b-2 border-red-600">
          <div className="flex items-center space-x-3">
            <span className="text-3xl animate-bounce">💥</span>
            <div>
              <h3 className="cartoon-heading text-lg sm:text-xl text-yellow-300">
                ACME Dossier // About the Engineer
              </h3>
              <p className="text-xs text-red-200">
                You pressed the red button! Classified developer credentials unlocked.
              </p>
            </div>
          </div>
          <button
            onClick={() => { playClick(); closeModal(); }}
            className="p-1.5 rounded-lg bg-red-900 text-red-300 hover:bg-red-600 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 p-6 overflow-y-auto space-y-6">
          
          {/* Polaroid Profile Bio Card */}
          <div className="p-5 rounded-xl bg-slate-800/90 border-2 border-slate-700 flex flex-col sm:flex-row gap-5 items-center sm:items-start">
            {/* Cartoon Avatar Polaroid */}
            <div className="shrink-0 p-3 bg-white text-black rounded-lg shadow-lg rotate-[-2deg] hover:rotate-0 transition-transform">
              <div className="w-28 h-28 bg-gradient-to-tr from-purple-700 via-pink-600 to-amber-500 rounded flex items-center justify-center text-4xl shadow-inner">
                👨‍💻
              </div>
              <div className="text-center font-bold text-xs mt-2 font-mono">
                {personal.name}
              </div>
            </div>

            {/* Profile Info */}
            <div className="space-y-2 text-center sm:text-left">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <h4 className="text-xl font-bold text-white">{personal.name}</h4>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-red-950 text-red-300 border border-red-700">
                  {personal.title}
                </span>
              </div>
              <div className="flex items-center justify-center sm:justify-start gap-1 text-xs text-slate-400">
                <MapPin className="w-3.5 h-3.5 text-red-400" />
                {personal.location}
              </div>
              <p className="text-xs text-slate-300 leading-relaxed pt-1">
                {personal.bio}
              </p>
            </div>
          </div>

          {/* Key Impact Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {personal.stats.map((st, idx) => (
              <div
                key={idx}
                className="p-3 bg-slate-800/60 border border-slate-700 rounded-xl text-center"
              >
                <div className="text-xl sm:text-2xl font-bold text-yellow-400 font-mono">
                  {st.value}
                </div>
                <div className="text-[11px] text-slate-400 font-semibold mt-1">
                  {st.label}
                </div>
              </div>
            ))}
          </div>

          {/* Contact Links & Social Badges */}
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
              Reach Out / Open Comms
            </h5>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5">
              <a
                href={`mailto:${personal.email}`}
                onClick={() => playClick()}
                className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white transition-colors border border-slate-700 text-xs font-semibold"
              >
                <Mail className="w-4 h-4 text-red-400 shrink-0" />
                <span className="truncate">{personal.email}</span>
              </a>
              <a
                href={`tel:${personal.phone.replace(/[^0-9+]/g, '')}`}
                onClick={() => playClick()}
                className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white transition-colors border border-slate-700 text-xs font-semibold"
              >
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="truncate">{personal.phone}</span>
              </a>
              <a
                href={personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playClick()}
                className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white transition-colors border border-slate-700 text-xs font-semibold"
              >
                <LinkedinIcon className="w-4 h-4 text-blue-400 shrink-0" />
                <span>LinkedIn</span>
              </a>
              <a
                href={personal.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playClick()}
                className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white transition-colors border border-slate-700 text-xs font-semibold"
              >
                <GithubIcon className="w-4 h-4 text-purple-400 shrink-0" />
                <span>GitHub</span>
              </a>
            </div>
          </div>
        </div>

        {/* Footer with ACME Action Buttons */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex flex-col sm:flex-row gap-3 items-center justify-between">
          <button
            onClick={() => {
              playClick();
              closeModal();
              setViewMode('flat');
            }}
            className="flex items-center gap-2 text-xs text-slate-300 hover:text-white underline font-semibold"
          >
            <FileText className="w-4 h-4 text-yellow-400" />
            Switch to Clean ATS / Recruiter Resume Layout
          </button>

          <div className="flex gap-2 w-full sm:w-auto">
            <button
              onClick={handleDownload}
              className="cartoon-btn flex-1 sm:flex-initial flex items-center justify-center gap-2 px-5 py-2.5 bg-red-500 hover:bg-red-400 text-white font-bold text-xs uppercase rounded-lg shadow-md"
            >
              <Download className="w-4 h-4" />
              Download / Print Resume (PDF)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
