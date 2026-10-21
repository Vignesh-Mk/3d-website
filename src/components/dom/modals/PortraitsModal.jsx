import { X, Award, GraduationCap, CheckCircle, ExternalLink, ShieldCheck } from 'lucide-react';
import { portfolioData } from '../../../data/portfolioData';
import { usePortfolioStore } from '../../../store/usePortfolioStore';
import { useSoundEffects } from '../../../hooks/useSoundEffects';

export function PortraitsModal() {
  const closeModal = usePortfolioStore((state) => state.closeModal);
  const { playClick, playFanfare } = useSoundEffects();
  const { academics } = portfolioData;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[90vh] flex flex-col bg-[#1c140e] border-4 border-amber-600 rounded-2xl shadow-[0_0_50px_rgba(217,119,6,0.35)] text-stone-100 overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#2a1c13] border-b-2 border-amber-700/60">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-amber-600 rounded-lg text-white shadow-md">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <h3 className="cartoon-heading text-lg sm:text-xl text-amber-300">
                The Crooked Frame // Academics & Certifications
              </h3>
              <p className="text-xs text-amber-200/80">
                Formal computer science foundations, accredited testing credentials & cloud architecture
              </p>
            </div>
          </div>
          <button
            onClick={() => { playClick(); closeModal(); }}
            className="p-1.5 rounded-lg bg-amber-950 text-amber-300 hover:bg-amber-600 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 p-6 overflow-y-auto space-y-6">
          
          {/* Section 1: Formal Higher Education */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-amber-400 mb-3 flex items-center gap-2">
              <GraduationCap className="w-4 h-4" />
              University Degrees & Advanced Computing
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {academics.education.map((edu, idx) => (
                <div
                  key={idx}
                  className="cartoon-card bg-[#281a10] border-amber-700 p-5 flex flex-col justify-between hover:border-amber-400 transition-colors"
                >
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-xs font-bold px-2 py-0.5 rounded bg-amber-900/60 text-amber-200 border border-amber-600">
                        {edu.period}
                      </span>
                      <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1">
                        <CheckCircle className="w-3.5 h-3.5" />
                        {edu.grade}
                      </span>
                    </div>

                    <h5 className="font-bold text-white text-base mb-1">{edu.degree}</h5>
                    <p className="text-xs text-amber-300 font-medium mb-3">{edu.institution}</p>
                    <p className="text-xs text-stone-300 leading-relaxed">
                      {edu.focus}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-amber-900/60 text-[11px] text-amber-400/80">
                    🏛️ Verified Academic Credential
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 2: Industry Certifications */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-amber-400 mb-3 flex items-center gap-2">
              <Award className="w-4 h-4" />
              Verified Industry Certifications & Standards
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {academics.certifications.map((cert, idx) => (
                <div
                  key={idx}
                  className="cartoon-card bg-[#23170e] border-amber-800 p-4 flex flex-col justify-between hover:border-amber-400 transition-all hover:-translate-y-1"
                >
                  <div>
                    <div className="text-2xl mb-2">{cert.badge.split(' ')[0]}</div>
                    <h5 className="font-bold text-white text-sm mb-1">{cert.title}</h5>
                    <p className="text-xs text-amber-300/90">{cert.issuer}</p>
                  </div>

                  <div className="mt-4 pt-2 border-t border-amber-900/50 flex items-center justify-between text-[11px]">
                    <span className="font-mono text-stone-400">{cert.id}</span>
                    <span className="text-emerald-400 font-bold flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      Active
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* QA Engineering Rigor Callout */}
          <div className="p-4 rounded-xl bg-amber-950/40 border border-amber-600/40 text-xs text-amber-200/90 leading-relaxed">
            <span className="font-bold text-amber-300">Academic Foundation: </span>
            The combination of a B.Sc in Game Design &amp; Development with an ongoing Master of Computer Applications (MCA) at Manipal University Jaipur unites low-level computing paradigms, data structures, and algorithms with modern quality engineering and automated test design.
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-[#2a1c13] border-t border-amber-800 flex justify-end">
          <button
            onClick={() => { playClick(); closeModal(); }}
            className="cartoon-btn px-5 py-2 bg-amber-500 text-black font-bold text-xs uppercase rounded-lg hover:bg-amber-400"
          >
            Hang Portraits Back Up
          </button>
        </div>
      </div>
    </div>
  );
}

