import { useState, useEffect } from 'react';
import { X, Play, CheckCircle2, Terminal as TerminalIcon, Cpu, Layers, ShieldCheck } from 'lucide-react';
import { portfolioData } from '../../../data/portfolioData';
import { usePortfolioStore } from '../../../store/usePortfolioStore';
import { useSoundEffects } from '../../../hooks/useSoundEffects';

export function TerminalModal() {
  const closeModal = usePortfolioStore((state) => state.closeModal);
  const { playClick, playComputerBeep } = useSoundEffects();
  const [activeTab, setActiveTab] = useState('frameworks'); // 'frameworks' | 'simulator' | 'strategy'
  const [simulationRunning, setSimulationRunning] = useState(false);
  const [testLogs, setTestLogs] = useState([]);
  const [suiteResults, setSuiteResults] = useState([]);

  const { qaAutomation } = portfolioData;

  const runSimulation = () => {
    if (simulationRunning) return;
    setSimulationRunning(true);
    setTestLogs(['[INIT] Spinning up ephemeral Docker runner...', '[AGENT] Mounting test artifacts & headless Chromium / Firefox / WebKit...']);
    setSuiteResults([]);
    playComputerBeep(700);

    qaAutomation.liveSimulationSuites.forEach((suite, index) => {
      setTimeout(() => {
        playComputerBeep(520 + index * 60);
        setTestLogs((prev) => [
          ...prev,
          `[RUNNING] Suite: ${suite.name} (${suite.tests} test specs)...`,
          `  ✓ [PASS] Assertions verified in ${suite.duration}`
        ]);
        setSuiteResults((prev) => [...prev, suite]);

        if (index === qaAutomation.liveSimulationSuites.length - 1) {
          setTimeout(() => {
            setTestLogs((prev) => [
              ...prev,
              '==================================================',
              '🎉 ALL 138 AUTOMATED TEST SPECS PASSED (0 Flaky, 0 Failed)',
              '🚀 CI/CD GATE CLEARED: Ready for Production Deployment',
              '=================================================='
            ]);
            setSimulationRunning(false);
            playComputerBeep(980);
          }, 400);
        }
      }, (index + 1) * 450);
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[90vh] flex flex-col bg-crt-dark border-4 border-crt-green rounded-xl shadow-[0_0_40px_rgba(51,255,51,0.25)] text-crt-green font-mono overflow-hidden">
        
        {/* CRT Scanline Visual Effect Overlay */}
        <div className="crt-overlay absolute inset-0 z-20 pointer-events-none" />

        {/* Terminal Header Bar */}
        <div className="relative z-30 flex items-center justify-between px-4 py-3 bg-[#0d280d] border-b-2 border-crt-green">
          <div className="flex items-center space-x-2">
            <span className="inline-block w-3 h-3 rounded-full bg-red-500" />
            <span className="inline-block w-3 h-3 rounded-full bg-yellow-400" />
            <span className="inline-block w-3 h-3 rounded-full bg-crt-green" />
            <span className="ml-2 font-bold text-sm tracking-wider text-white flex items-center gap-2">
              <TerminalIcon className="w-4 h-4 text-crt-green" />
              NOWHERE_OS // SDET & AUTOMATION TERMINAL (¬_¬)
            </span>
          </div>
          <button
            onClick={() => { playClick(); closeModal(); }}
            className="p-1 rounded text-crt-green hover:bg-crt-green hover:text-black transition-colors"
            title="Close Terminal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="relative z-30 flex border-b border-crt-green/40 bg-black/40 text-xs sm:text-sm">
          <button
            onClick={() => { playClick(); setActiveTab('frameworks'); }}
            className={`flex items-center gap-2 px-4 py-2.5 font-bold transition-colors ${
              activeTab === 'frameworks' ? 'bg-crt-green text-black' : 'text-crt-green hover:bg-crt-green/10'
            }`}
          >
            <Cpu className="w-4 h-4" />
            01. TEST FRAMEWORKS
          </button>
          <button
            onClick={() => { playClick(); setActiveTab('simulator'); }}
            className={`flex items-center gap-2 px-4 py-2.5 font-bold transition-colors ${
              activeTab === 'simulator' ? 'bg-crt-green text-black' : 'text-crt-green hover:bg-crt-green/10'
            }`}
          >
            <Play className="w-4 h-4" />
            02. LIVE TEST SIMULATOR
          </button>
          <button
            onClick={() => { playClick(); setActiveTab('strategy'); }}
            className={`flex items-center gap-2 px-4 py-2.5 font-bold transition-colors ${
              activeTab === 'strategy' ? 'bg-crt-green text-black' : 'text-crt-green hover:bg-crt-green/10'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            03. TEST ARCHITECTURE & METRICS
          </button>
        </div>

        {/* Tab Content Body */}
        <div className="relative z-30 flex-1 p-5 overflow-y-auto space-y-4 text-sm leading-relaxed">
          
          {/* TAB 1: FRAMEWORKS */}
          {activeTab === 'frameworks' && (
            <div className="space-y-4">
              <div className="p-3 border border-crt-green/40 bg-black/40 rounded">
                <p className="text-white/90">
                  {qaAutomation.overview}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {qaAutomation.frameworks.map((fw, idx) => (
                  <div key={idx} className="p-4 border border-crt-green/60 bg-[#081508] rounded-lg hover:border-crt-green transition-all shadow-[0_0_15px_rgba(51,255,51,0.08)]">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-bold text-white text-base">{fw.name}</h4>
                      <span className="text-[11px] px-2 py-0.5 border border-crt-green text-crt-green rounded">
                        {fw.type}
                      </span>
                    </div>
                    <p className="text-xs text-crt-green/80 mb-3">{fw.description}</p>
                    <div className="flex flex-wrap gap-1.5 mb-2">
                      {fw.tech.map((t, i) => (
                        <span key={i} className="text-[10px] bg-crt-green/20 px-2 py-0.5 rounded text-white font-mono">
                          {t}
                        </span>
                      ))}
                    </div>
                    <div className="text-[11px] text-yellow-300 font-semibold pt-1 border-t border-crt-green/20">
                      ⚡ {fw.metrics}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: LIVE SIMULATOR */}
          {activeTab === 'simulator' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 p-3 bg-black/60 border border-crt-green/40 rounded">
                <div>
                  <h4 className="font-bold text-white">Interactive CI/CD Test Pipeline</h4>
                  <p className="text-xs text-crt-green/70">Execute synthetic enterprise test suites in real-time.</p>
                </div>
                <button
                  onClick={runSimulation}
                  disabled={simulationRunning}
                  className={`flex items-center gap-2 px-4 py-2 font-bold rounded border-2 border-crt-green transition-all shadow-[2px_2px_0px_#33ff33] ${
                    simulationRunning
                      ? 'bg-crt-green/20 text-crt-green/60 cursor-not-allowed'
                      : 'bg-crt-green text-black hover:bg-emerald-400 active:translate-y-0.5'
                  }`}
                >
                  <Play className="w-4 h-4 fill-current" />
                  {simulationRunning ? 'TESTS RUNNING...' : 'TRIGGER TEST RUN'}
                </button>
              </div>

              {/* Terminal Logs Output */}
              <div className="p-4 bg-black border border-crt-green rounded-lg h-64 overflow-y-auto text-xs space-y-1 font-mono">
                {testLogs.length === 0 ? (
                  <div className="text-crt-green/50 italic h-full flex items-center justify-center">
                    &gt; Ready. Click &quot;TRIGGER TEST RUN&quot; to execute automated suites...
                  </div>
                ) : (
                  testLogs.map((log, index) => (
                    <div
                      key={index}
                      className={
                        log.includes('PASSED') || log.includes('CLEARED')
                          ? 'text-emerald-300 font-bold'
                          : log.includes('RUNNING')
                          ? 'text-yellow-300'
                          : 'text-crt-green'
                      }
                    >
                      {log}
                    </div>
                  ))
                )}
              </div>

              {/* Suite Status Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-2">
                {qaAutomation.liveSimulationSuites.map((s) => {
                  const finished = suiteResults.some((r) => r.id === s.id);
                  return (
                    <div
                      key={s.id}
                      className={`p-2 border rounded text-center text-xs transition-colors ${
                        finished
                          ? 'border-emerald-400 bg-emerald-950/40 text-emerald-300'
                          : 'border-crt-green/30 bg-black/30 text-crt-green/50'
                      }`}
                    >
                      <div className="font-bold truncate">{s.name}</div>
                      <div className="text-[10px] mt-1">
                        {finished ? '✓ 100% PASS' : 'PENDING'}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 3: STRATEGY & METRICS */}
          {activeTab === 'strategy' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="p-4 border border-crt-green/50 bg-[#0a1a0a] rounded text-center">
                  <div className="text-2xl font-bold text-yellow-300">4+ Years</div>
                  <div className="text-xs text-white uppercase font-bold mt-1">Cross-Platform Engineering</div>
                  <div className="text-[11px] text-crt-green/70 mt-1">Hands-on application development & quality validation</div>
                </div>
                <div className="p-4 border border-crt-green/50 bg-[#0a1a0a] rounded text-center">
                  <div className="text-2xl font-bold text-emerald-400">Playwright &amp; Selenium</div>
                  <div className="text-xs text-white uppercase font-bold mt-1">Core Automation Stacks</div>
                  <div className="text-[11px] text-crt-green/70 mt-1">TypeScript Playwright (TestLeaf) + Java TestNG Cucumber</div>
                </div>
                <div className="p-4 border border-crt-green/50 bg-[#0a1a0a] rounded text-center">
                  <div className="text-2xl font-bold text-cyan-300">REST API &amp; SQL</div>
                  <div className="text-xs text-white uppercase font-bold mt-1">Cloud Data Integrity</div>
                  <div className="text-[11px] text-crt-green/70 mt-1">AWS, Postman, PostgreSQL, MS SQL & Firebase</div>
                </div>
              </div>

              <div className="p-4 border border-crt-green/50 bg-black/50 rounded-lg space-y-2">
                <h4 className="font-bold text-white text-base">Key SDET Competencies &amp; Methodologies</h4>
                <ul className="list-disc pl-5 text-xs space-y-1.5 text-crt-green/90">
                  <li><strong>End-to-End Test Automation:</strong> Playwright (TypeScript) modern web testing with auto-waits, multi-context browser orchestration, and Selenium WebDriver + TestNG with Cucumber BDD feature definitions.</li>
                  <li><strong>Backend API &amp; Cloud Data Integrity:</strong> REST API testing with Postman, validating payload schemas, status codes, and cross-platform synchronization across AWS and mobile environments (Vmoksha).</li>
                  <li><strong>Database Validation:</strong> SQL (PostgreSQL, MS SQL) data verification, MongoDB Realm, and Firebase real-time state integrity across multi-user environments.</li>
                  <li><strong>CI Pipeline Integration:</strong> Integrating test scenarios into Jenkins CI pipelines to ensure regression stability before production deployment.</li>
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="relative z-30 px-4 py-2.5 bg-[#081508] border-t border-crt-green flex justify-between items-center text-xs text-crt-green/70">
          <span>STATUS: ALL QA SYSTEMS OPERATIONAL</span>
          <button
            onClick={() => { playClick(); closeModal(); }}
            className="px-3 py-1 bg-crt-green text-black font-bold rounded hover:bg-emerald-300"
          >
            EXIT TERMINAL [ESC]
          </button>
        </div>
      </div>
    </div>
  );
}

