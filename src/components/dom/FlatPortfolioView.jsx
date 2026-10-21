import { Box, FileText, Download, Mail, Phone, ExternalLink, Award, GraduationCap, CheckCircle2, ShieldCheck, Terminal, Gamepad2, ArrowLeft, Printer, Briefcase, Languages, Wrench } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../common/Icons';
import { portfolioData } from '../../data/portfolioData';
import { usePortfolioStore } from '../../store/usePortfolioStore';
import { useSoundEffects } from '../../hooks/useSoundEffects';

export function FlatPortfolioView() {
  const setViewMode = usePortfolioStore((state) => state.setViewMode);
  const { playClick, playSwoosh } = useSoundEffects();
  const { personal, qaAutomation, workExperience, gameDev, skills, academics } = portfolioData;

  const handleBackTo3D = () => {
    playSwoosh();
    setViewMode('3d');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen w-full bg-slate-950 text-slate-100 font-sans selection:bg-yellow-400 selection:text-black">
      
      {/* Top Sticky Bar */}
      <div className="sticky top-0 z-30 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-4 sm:px-8 py-3 flex items-center justify-between print:hidden">
        <button
          onClick={handleBackTo3D}
          className="flex items-center gap-2 text-xs sm:text-sm font-bold text-yellow-400 hover:text-yellow-300 transition-colors bg-purple-950/60 border border-purple-800 px-3 py-1.5 rounded-lg"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Enter 3D Interactive Shack</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-white border border-slate-700 font-semibold transition-colors"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print / Save as PDF</span>
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-8 py-8 sm:py-12 space-y-12">
        
        {/* Header Section */}
        <header className="space-y-4 border-b border-slate-800 pb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                {personal.name}
              </h1>
              <p className="text-lg text-yellow-400 font-medium mt-1">
                {personal.title}
              </p>
              <p className="text-xs text-emerald-400 font-mono mt-0.5">
                {personal.subtitle}
              </p>
              <p className="text-sm text-slate-400 mt-1">
                {personal.location}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 text-xs">
              <a
                href={`mailto:${personal.email}`}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 transition-colors"
              >
                <Mail className="w-4 h-4 text-red-400" />
                <span>{personal.email}</span>
              </a>
              <a
                href={`tel:${personal.phone.replace(/[^0-9+]/g, '')}`}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 transition-colors"
              >
                <Phone className="w-4 h-4 text-emerald-400" />
                <span>{personal.phone}</span>
              </a>
              <a
                href={personal.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 transition-colors"
              >
                <GithubIcon className="w-4 h-4 text-purple-400" />
                <span>GitHub</span>
              </a>
              <a
                href={personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 transition-colors"
              >
                <LinkedinIcon className="w-4 h-4 text-blue-400" />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>

          <p className="text-slate-300 text-sm leading-relaxed max-w-3xl">
            {personal.bio}
          </p>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4">
            {personal.stats.map((st, i) => (
              <div key={i} className="p-3 rounded-lg bg-slate-900/80 border border-slate-800">
                <div className="text-xl font-bold text-yellow-400 font-mono">{st.value}</div>
                <div className="text-xs text-slate-400 mt-0.5">{st.label}</div>
              </div>
            ))}
          </div>
        </header>

        {/* Section 1: Work Experience */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-xl font-bold text-white border-b border-slate-800 pb-2">
            <Briefcase className="w-5 h-5 text-yellow-400" />
            <h2>Work Experience (4+ Years Software Engineering & Quality Validation)</h2>
          </div>

          <div className="space-y-4">
            {workExperience.map((job, idx) => (
              <div key={idx} className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-colors space-y-2.5">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-1">
                  <div>
                    <h3 className="font-bold text-white text-base">{job.role}</h3>
                    <div className="text-sm text-yellow-400 font-medium">{job.company}</div>
                  </div>
                  <div className="text-xs text-right text-slate-400 font-mono">
                    <div>{job.period}</div>
                    <div>{job.location}</div>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {job.summary}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {job.tags.map((t, i) => (
                    <span key={i} className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 2: QA / SDET & Automation Hub */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-xl font-bold text-white border-b border-slate-800 pb-2">
            <Terminal className="w-5 h-5 text-emerald-400" />
            <h2>Test Automation Engineering & SDET Competencies</h2>
          </div>

          <p className="text-sm text-slate-300">
            {qaAutomation.overview}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {qaAutomation.frameworks.map((fw, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-colors space-y-2">
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-white text-base">{fw.name}</h3>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                    {fw.type}
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {fw.description}
                </p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {fw.tech.map((t, i) => (
                    <span key={i} className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="text-xs text-yellow-400 font-semibold pt-1">
                  ⚡ {fw.metrics}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 3: Technical Skills Matrix */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-xl font-bold text-white border-b border-slate-800 pb-2">
            <Box className="w-5 h-5 text-cyan-400" />
            <h2>Technical Skills Matrix</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {skills.categories.map((cat) => (
              <div key={cat.id} className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{cat.icon}</span>
                  <h3 className="font-bold text-white text-sm">{cat.title}</h3>
                </div>
                <ul className="space-y-2 text-xs">
                  {cat.items.map((item, idx) => (
                    <li key={idx} className="border-b border-slate-800/60 pb-1.5">
                      <div className="flex justify-between font-semibold text-slate-200">
                        <span>{item.name}</span>
                        <span className="text-[10px] text-cyan-400">{item.level}</span>
                      </div>
                      <div className="text-[11px] text-slate-400 mt-0.5">{item.desc}</div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Section 4: Projects & Systems */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-xl font-bold text-white border-b border-slate-800 pb-2">
            <Gamepad2 className="w-5 h-5 text-purple-400" />
            <h2>Featured Projects & Live Published Applications</h2>
          </div>

          <p className="text-sm text-slate-300">
            {gameDev.overview}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {gameDev.projects.map((proj, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between space-y-3">
                <div>
                  <div className="flex justify-between items-start mb-1.5">
                    <span className="text-[11px] font-bold text-purple-300">{proj.genre}</span>
                    <span className="text-[10px] font-mono text-slate-400">{proj.engine}</span>
                  </div>
                  <h3 className="font-bold text-white text-sm">{proj.title}</h3>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                    {proj.description}
                  </p>
                  <div className="flex flex-wrap gap-1 mt-2.5">
                    {proj.tags.map((t, i) => (
                      <span key={i} className="text-[10px] px-1.5 py-0.5 rounded bg-purple-950 text-purple-200 border border-purple-800 font-mono">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2 border-t border-slate-800 text-xs">
                  {proj.appStoreUrl ? (
                    <a
                      href={proj.appStoreUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-400 hover:underline font-semibold flex items-center gap-1"
                    >
                      Google Play Store <ExternalLink className="w-3 h-3" />
                    </a>
                  ) : (
                    <span className="text-slate-400 font-medium">Production Architecture</span>
                  )}
                  <span className="text-slate-600">•</span>
                  <a
                    href={proj.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    GitHub
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 5: Education & Certifications */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-xl font-bold text-white border-b border-slate-800 pb-2">
            <GraduationCap className="w-5 h-5 text-amber-400" />
            <h2>Education & Professional Certifications</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400">Formal Higher Education</h3>
              {academics.education.map((edu, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
                  <div className="flex justify-between items-start">
                    <h4 className="font-bold text-white text-sm">{edu.degree}</h4>
                    <span className="text-[11px] text-emerald-400 font-semibold">{edu.grade}</span>
                  </div>
                  <p className="text-xs text-amber-300">{edu.institution} ({edu.period})</p>
                  <p className="text-xs text-slate-400">{edu.location}</p>
                  <p className="text-xs text-slate-300 mt-1 font-mono">{edu.focus}</p>
                </div>
              ))}
            </div>

            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400">Certifications</h3>
              {academics.certifications.map((cert, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
                  <div className="flex justify-between items-start">
                    <h4 className="font-bold text-white text-sm">{cert.title}</h4>
                    <span className="text-[10px] font-mono text-slate-400">{cert.id}</span>
                  </div>
                  <p className="text-xs text-amber-300">{cert.issuer}</p>
                  <p className="text-[11px] text-emerald-400 font-semibold">{cert.badge}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 6: Languages & Interests */}
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Languages className="w-4 h-4 text-cyan-400" />
              Languages Known
            </h3>
            <div className="flex flex-wrap gap-2 text-xs">
              {personal.languages.map((lang, idx) => (
                <span key={idx} className="px-3 py-1 rounded-full bg-slate-800 text-slate-200 border border-slate-700">
                  {lang}
                </span>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Wrench className="w-4 h-4 text-yellow-400" />
              Personal Interests &amp; Hardware
            </h3>
            <div className="flex flex-wrap gap-2 text-xs">
              {personal.interests.map((int, idx) => (
                <span key={idx} className="px-3 py-1 rounded-full bg-slate-800 text-slate-200 border border-slate-700">
                  {int}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="pt-8 border-t border-slate-800 text-center text-xs text-slate-500 space-y-2">
          <p>© {new Date().getFullYear()} {personal.name} — Bengaluru, India</p>
          <div className="print:hidden">
            <button
              onClick={handleBackTo3D}
              className="text-yellow-400 hover:underline font-semibold"
            >
              Return to 3D Nowhere Shack →
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
}
