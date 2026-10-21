import { useState } from 'react';
import { X, Sparkles, Filter, Search } from 'lucide-react';
import { portfolioData } from '../../../data/portfolioData';
import { usePortfolioStore } from '../../../store/usePortfolioStore';
import { useSoundEffects } from '../../../hooks/useSoundEffects';

export function SkillsModal() {
  const closeModal = usePortfolioStore((state) => state.closeModal);
  const { playClick, playSquish } = useSoundEffects();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const { skills } = portfolioData;

  const allItems = skills.categories.flatMap((cat) =>
    cat.items.map((item) => ({ ...item, categoryId: cat.id, categoryTitle: cat.title, categoryIcon: cat.icon }))
  );

  const filteredItems = allItems.filter((item) => {
    const matchesCategory = selectedCategory === 'all' || item.categoryId === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[90vh] flex flex-col bg-slate-900 border-4 border-cyan-400 rounded-2xl shadow-[0_0_45px_rgba(34,211,238,0.3)] text-white overflow-hidden">
        
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-950 border-b-2 border-cyan-500/40">
          <div className="flex items-center space-x-3">
            <span className="text-3xl">🧊</span>
            <div>
              <h3 className="cartoon-heading text-lg sm:text-xl text-cyan-300">
                The Bulging Fridge // Tech Stack & Skills
              </h3>
              <p className="text-xs text-slate-400">
                Packed to the brim with automation weapons, languages, and 3D graphics tools
              </p>
            </div>
          </div>
          <button
            onClick={() => { playClick(); closeModal(); }}
            className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:bg-cyan-500 hover:text-black transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Filter & Search Bar */}
        <div className="p-4 bg-slate-950/70 border-b border-slate-800 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
          <div className="flex flex-wrap gap-1.5">
            <button
              onClick={() => { playSquish(); setSelectedCategory('all'); }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                selectedCategory === 'all'
                  ? 'bg-cyan-400 text-black shadow-sm'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              All Shelves
            </button>
            {skills.categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => { playSquish(); setSelectedCategory(cat.id); }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-cyan-400 text-black shadow-sm'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.title}</span>
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-56">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder="Filter skill..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 bg-slate-800 border border-slate-700 rounded-lg text-xs text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400"
            />
          </div>
        </div>

        {/* Fridge Shelves Grid */}
        <div className="flex-1 p-6 overflow-y-auto space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {filteredItems.map((item, idx) => (
              <div
                key={idx}
                className="cartoon-card bg-slate-800/80 p-4 flex flex-col justify-between hover:border-cyan-300 transition-all duration-150 group"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xl group-hover:scale-125 transition-transform duration-200">
                      {item.categoryIcon}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                        item.level === 'Master'
                          ? 'bg-emerald-950 text-emerald-300 border-emerald-600'
                          : item.level === 'Expert'
                          ? 'bg-cyan-950 text-cyan-300 border-cyan-600'
                          : 'bg-purple-950 text-purple-300 border-purple-600'
                      }`}
                    >
                      {item.level}
                    </span>
                  </div>
                  <h4 className="font-bold text-white text-base group-hover:text-cyan-300 transition-colors">
                    {item.name}
                  </h4>
                  <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-700/60 flex items-center justify-between text-[11px] text-slate-400">
                  <span>{item.categoryTitle}</span>
                  <span className="text-cyan-400 font-mono font-bold">100% FRESH</span>
                </div>
              </div>
            ))}
          </div>

          {filteredItems.length === 0 && (
            <div className="text-center py-12 text-slate-400">
              <span className="text-4xl block mb-2">🍽️</span>
              The fridge shelf is empty! No matching ingredients found.
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-950 border-t border-slate-800 flex justify-between items-center text-xs text-slate-400">
          <span>{filteredItems.length} items stocked</span>
          <button
            onClick={() => { playClick(); closeModal(); }}
            className="cartoon-btn px-5 py-2 bg-cyan-400 text-black font-bold text-xs uppercase rounded-lg hover:bg-cyan-300"
          >
            Slam Fridge Door
          </button>
        </div>
      </div>
    </div>
  );
}

