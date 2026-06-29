// src/components/CardScreen.jsx
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { themes } from '../data/words'
import './CardScreen.css'

export default function CardScreen({ themeId, stars, onAddStars, onBack }) {
  const theme = themes[themeId]
  const words = theme.words

  const [idx, setIdx] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [showBravo, setShowBravo] = useState(false)
  const [confetti, setConfetti] = useState([])

  const word = words[idx]
  const progress = ((idx + 1) / words.length) * 100

  const flip = () => {
    if (!flipped) {
      setFlipped(true)
      onAddStars(5)
      spawnConfetti()
      setShowBravo(true)
      setTimeout(() => setShowBravo(false), 1800)
    }
  }

  const next = () => {
    setIdx(i => (i + 1) % words.length)
    setFlipped(false)
    setConfetti([])
  }

  const playSound = () => {
    const audioPath = `${import.meta.env.BASE_URL}audio/${word.tt.replace(/ /g, '_')}.wav`
    const audio = new Audio(audioPath)
    audio.play().catch(() => {
      // fallback — браузерный синтез
      if ('speechSynthesis' in window) {
        const u = new SpeechSynthesisUtterance(word.tt)
        u.lang = 'tt'
        u.rate = 0.85
        speechSynthesis.speak(u)
      }
    })
  }

  const spawnConfetti = () => {
    const dots = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: Math.random() * 90,
      color: [theme.color, theme.colorBorder, '#fbbf24', '#f0abfc'][Math.floor(Math.random() * 4)],
      delay: Math.random() * 0.4,
      duration: 0.6 + Math.random() * 0.5,
      round: Math.random() > 0.5,
    }))
    setConfetti(dots)
  }

  return (
    <div className="card-screen">
      {/* Top bar */}
      <div className="top-bar">
        <button className="back-btn" onClick={onBack}>← Назад</button>
        <span className="counter">{idx + 1} / {words.length}</span>
        <span className="score-badge">⭐ {stars}</span>
      </div>

      {/* Progress */}
      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{ width: `${progress}%`, background: theme.color }}
        />
      </div>

      {/* Bravo */}
      <AnimatePresence>
        {showBravo && (
          <motion.div
            className="bravo"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            Бик яхшы! Молодец! +5⭐
          </motion.div>
        )}
      </AnimatePresence>

      {/* Card */}
      <div className="card-wrap" onClick={flip}>
        <motion.div
          className="card-inner"
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: 0.5 }}
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Front */}
          <div
            className="card-face card-front"
            style={{ background: theme.colorLight, borderColor: theme.colorBorder }}
          >
            <span className="card-emoji">{word.emoji}</span>
            <span className="card-word" style={{ color: theme.colorDark }}>{word.ru}</span>
            <span className="card-hint">нажми, чтобы узнать по-татарски</span>
          </div>

          {/* Back */}
          <div
            className="card-face card-back"
            style={{ background: theme.color }}
          >
            <span className="card-emoji">{word.emoji}</span>
            <span className="card-word" style={{ color: '#fff' }}>{word.tt}</span>
            <span className="card-word-sub">{word.ru}</span>

            {/* Confetti */}
            {confetti.map(d => (
              <motion.div
                key={d.id}
                className={`confetti-dot ${d.round ? 'round' : ''}`}
                style={{
                  left: `${d.left}%`,
                  background: d.color,
                }}
                initial={{ y: -10, opacity: 1 }}
                animate={{ y: 200, opacity: 0, rotate: 360 }}
                transition={{ duration: d.duration, delay: d.delay }}
              />
            ))}
          </div>
        </motion.div>
      </div>

      {/* Sound button */}
      <div className="sound-row">
        <button
          className="sound-btn"
          style={{ background: theme.colorLight, borderColor: theme.colorBorder, color: theme.color }}
          onClick={playSound}
        >
          🔊
        </button>
        <span className="sound-label">услышать слово</span>
      </div>

      {/* Next button */}
      <button
        className="next-btn"
        style={{ background: theme.color }}
        onClick={next}
      >
        Следующее →
      </button>
    </div>
  )
}
