function Navbar({ activeTab, setActiveTab, isDarkMode, setIsDarkMode }) {
  return (
    <header className="border-b border-stone-200 bg-white/70 backdrop-blur sticky top-0 z-50 transition-colors duration-300 dark:border-stone-800 dark:bg-stone-900/50">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setActiveTab('earthquakes')}
            className="text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-lg"
          >
            <span className="text-xl font-bold tracking-tight text-stone-900 dark:text-white cursor-pointer select-none">
              Nepal{' '}
              <span className="text-emerald-500 font-medium">Insights</span>{' '}
              Dashboard
            </span>
          </button>
        </div>

        <nav className="hidden md:flex space-x-1 bg-stone-100 p-1 rounded-xl border border-stone-200 transition-colors dark:bg-stone-950 dark:border-stone-800">
          {['earthquakes', 'air-quality', 'population'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-1.5 text-sm font-medium rounded-lg capitalize transition-all ${
                activeTab === tab
                  ? 'bg-white text-stone-900 shadow-sm border border-stone-200/50 font-bold dark:bg-stone-800 dark:text-white dark:border-transparent'
                  : 'text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-200'
              }`}
            >
              {tab.replace('-', ' ')}
            </button>
          ))}
        </nav>

        <div className="flex items-center space-x-4">
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2 rounded-lg bg-white border border-stone-200 text-stone-700 hover:bg-stone-50 transition-all shadow-sm dark:bg-stone-800 dark:border-stone-700 dark:text-stone-300 dark:hover:bg-stone-700/50 dark:hover:text-white"
            title="Toggle Theme"
          >
            {isDarkMode ? '🌙' : '☀️'}
          </button>

          <div className="flex items-center space-x-1.5 text-xs bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2.5 py-1 rounded-full font-medium border border-emerald-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse" />
            <span>Live Data</span>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar
