// src/components/Home.jsx
import { themes } from '../data/words'
import './Home.css'

export default function Home({ stars, onSelectTheme }) {
  const maxStars = 5
  const filledStars = Math.min(Math.floor(stars / 10), maxStars)

  return (
    <div className="home">
      <div className="home-header">
        <h1 className="home-title">Татарча өйрән</h1>
        <p className="home-sub">уку кызык! — учиться интересно!</p>
      </div>

      <div className="stars-row">
        {Array.from({ length: maxStars }).map((_, i) => (
          <div key={i} className={`star ${i < filledStars ? 'star-filled' : 'star-empty'}`} />
        ))}
      </div>

      <div className="score-badge">⭐ {stars} очков</div>

      <p className="home-prompt">Выбери мир:</p>

      <div className="theme-grid">
        {Object.values(themes).map(theme => (
          <button
            key={theme.id}
            className="theme-btn"
            style={{
              background: theme.colorLight,
              borderColor: theme.colorBorder,
            }}
            onClick={() => onSelectTheme(theme.id)}
          >
            <span className="theme-emoji">{theme.emoji}</span>
            <span className="theme-name-tt">{theme.nameTt}</span>
            <span className="theme-name-ru">{theme.nameRu}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
