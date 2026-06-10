import { useState } from 'react'
import { useDarkMode } from './hooks/useDarkMode'

import Navbar from './shared/Navbar'
import Footer from './shared/Footer'

import Earthquakes from './pages/Earthquakes'
import AirQuality from './pages/AirQuality'
import Population from './pages/Population'

function App() {
  const [activeTab, setActiveTab] = useState('earthquakes')
  const [isDarkMode, setIsDarkMode] = useDarkMode()

  const renderPage = () => {
    switch (activeTab) {
      case 'earthquakes':
        return <Earthquakes />
      case 'air-quality':
        return <AirQuality />
      case 'population':
        return <Population />
      default:
        return <Earthquakes />
    }
  }

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
      />

      <main className="grow max-w-7xl w-full mx-auto px-4 py-8">
        {renderPage()}
      </main>

      <Footer />
    </div>
  )
}

export default App
