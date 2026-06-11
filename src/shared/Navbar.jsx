import { useState } from 'react'

const TABS = [
  { id: 'earthquakes', label: 'Earthquakes', icon: '📡' },
  { id: 'air-quality', label: 'Air quality', icon: '💨' },
  { id: 'population', label: 'Population', icon: '👥' },
]

function Navbar({ activeTab, setActiveTab, isDarkMode, setIsDarkMode }) {
  const [menuOpen, setMenuOpen] = useState(false)

  const handleTabChange = (tab) => {
    setActiveTab(tab)
    setMenuOpen(false)
  }

  return (
    <>
      <header className="border-b border-stone-200 bg-white/70 backdrop-blur sticky top-0 z-50 transition-colors duration-300 dark:border-stone-800 dark:bg-stone-900/50">
        <div className="max-w-7xl mx-auto px-4 h-14 md:h-16 flex items-center justify-between gap-4">
          <button
            onClick={() => handleTabChange('earthquakes')}
            className="shrink-0 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-lg"
          >
            <span className="text-base md:text-xl font-bold tracking-tight text-stone-900 dark:text-white select-none">
              Nepal{' '}
              <span className="text-emerald-500 font-medium">Insights</span>
              <span className="hidden md:inline"> Dashboard</span>
            </span>
          </button>

          <nav className="hidden md:flex space-x-1 bg-stone-100 p-1 rounded-xl border border-stone-200 transition-colors dark:bg-stone-950 dark:border-stone-800">
            {TABS.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => handleTabChange(id)}
                className={`px-4 py-1.5 text-sm font-medium rounded-lg capitalize transition-all ${
                  activeTab === id
                    ? 'bg-white text-stone-900 shadow-sm border border-stone-200/50 font-bold dark:bg-stone-800 dark:text-white dark:border-transparent'
                    : 'text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-200'
                }`}
              >
                {label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2 md:gap-3 shrink-0">
            <div className="flex items-center gap-1.5 text-xs bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2.5 py-1 rounded-full font-medium border border-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse" />
              <span className="hidden sm:inline">Live Data</span>
              <span className="sm:hidden">Live</span>
            </div>

            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 rounded-lg bg-white border border-stone-200 text-stone-700 hover:bg-stone-50 transition-all shadow-sm dark:bg-stone-800 dark:border-stone-700 dark:text-stone-300 dark:hover:bg-stone-700/50 dark:hover:text-white"
              title="Toggle Theme"
            >
              {isDarkMode ? '🌙' : '☀️'}
            </button>

            <button
              onClick={() => setMenuOpen((o) => !o)}
              className="md:hidden p-2 rounded-lg bg-white border border-stone-200 text-stone-700 hover:bg-stone-50 transition-all shadow-sm dark:bg-stone-800 dark:border-stone-700 dark:text-stone-300"
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >
              {menuOpen ? (
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        <div
          className={`md:hidden overflow-hidden transition-all duration-200 ease-in-out ${
            menuOpen ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <nav className="px-4 pb-3 flex flex-col gap-1 border-t border-stone-100 dark:border-stone-800">
            {TABS.map(({ id, label, icon }) => (
              <button
                key={id}
                onClick={() => handleTabChange(id)}
                className={`flex items-center gap-2 w-full text-left px-3 py-2.5 text-sm font-medium rounded-lg transition-all ${
                  activeTab === id
                    ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400'
                    : 'text-stone-600 hover:bg-stone-100 dark:text-stone-400 dark:hover:bg-stone-800'
                }`}
              >
                <span>{icon}</span>
                {label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <nav className="md:hidden fixed bottom-0 inset-x-0 z-50 bg-white/80 dark:bg-stone-900/80 backdrop-blur border-t border-stone-200 dark:border-stone-800 flex">
        {TABS.map(({ id, label, icon }) => (
          <button
            key={id}
            onClick={() => handleTabChange(id)}
            className={`flex-1 flex flex-col items-center gap-0.5 py-2 text-[10px] font-medium transition-colors ${
              activeTab === id
                ? 'text-emerald-600 dark:text-emerald-400'
                : 'text-stone-500 dark:text-stone-400'
            }`}
          >
            <span className="text-lg leading-none">{icon}</span>
            {label}
          </button>
        ))}
      </nav>
    </>
  )
}

export default Navbar
