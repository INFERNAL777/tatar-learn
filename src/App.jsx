// src/App.jsx
import { useState } from 'react'
import Home from './components/Home'
import CardScreen from './components/CardScreen'
import './App.css'

export default function App() {
  const [screen, setScreen] = useState('home')   // 'home' | 'spider' | 'cars'
  const [stars, setStars] = useState(0)

  const addStars = (n) => setStars(s => s + n)

  return (
    <div className="app">
      {screen === 'home' && (
        <Home stars={stars} onSelectTheme={setScreen} />
      )}
      {(screen === 'spider' || screen === 'cars') && (
        <CardScreen
          themeId={screen}
          stars={stars}
          onAddStars={addStars}
          onBack={() => setScreen('home')}
        />
      )}
    </div>
  )
}
