import { useState } from 'react';
import './App.css';

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'learning' | 'grammar' | 'vocabulary'>('home');

  return (
    <div className="app-layout">
      {/* Боковое меню для ПК */}
      <aside className="sidebar">
        <div>
          <div className="brand-area">
            <img src="/logo.png" alt="Logo" className="brand-logo" />
            <span className="brand-name">soile_i_bil</span>
          </div>
          <nav className="nav-menu">
            <button className={`nav-btn ${activeTab === 'home' ? 'active' : ''}`} onClick={() => setActiveTab('home')}>
              🏠 Главная
            </button>
            <button className={`nav-btn ${activeTab === 'learning' ? 'active' : ''}`} onClick={() => setActiveTab('learning')}>
              📚 Обучение
            </button>
            <button className={`nav-btn ${activeTab === 'grammar' ? 'active' : ''}`} onClick={() => setActiveTab('grammar')}>
              📖 Грамматика
            </button>
            <button className={`nav-btn ${activeTab === 'vocabulary' ? 'active' : ''}`} onClick={() => setActiveTab('vocabulary')}>
              🎴 Словарь
            </button>
          </nav>
        </div>
        <div style={{ fontSize: '0.8rem', color: '#888' }}>by Symbat</div>
      </aside>

      {/* Основной контент */}
      <main className="main-dashboard">
        <header className="top-header">
          <div className="user-greeting">
            <h2>Сәлем, Оқушы! 👋</h2>
            <p style={{ color: '#666', fontSize: '0.9rem' }}>Готовы продолжить изучение казахского?</p>
          </div>
          <div className="sun-battery-badge" title="Ваш заряд энергии обучения">
  <span className="sun-icon">☀️</span>
  <span className="battery-text">Күн батареясы: <strong>120 XP</strong></span>
</div>
        </header>

        <div className="dashboard-grid">
          {/* Левая колонка */}
          <div className="left-column">
            <div className="banner-card">
              <span style={{ fontSize: '0.8rem', opacity: 0.8 }}>ПРОДОЛЖИТЬ ОБУЧЕНИЕ</span>
              <h3>Урок 1: Танысу (Знакомство)</h3>
              <p style={{ marginTop: '0.5rem', opacity: 0.9 }}>Базовые фразы для общения и приветствия</p>
              <button className="btn-primary">Продолжить →</button>
            </div>

            <div className="widget-card" style={{ marginTop: '1.5rem' }}>
              <h4>Мой прогресс</h4>
              <p style={{ color: '#666', marginTop: '0.5rem' }}>Выучено 24 слова из 100</p>
            </div>
          </div>

          {/* Правая колонка */}
          <div className="right-column">
            <div className="word-of-day">
              <span style={{ fontSize: '0.75rem', color: '#555', fontWeight: 700 }}>СЛОВО ДНЯ</span>
              <h2 style={{ color: 'var(--primary-bordeaux)', marginTop: '0.3rem' }}>Өркендеу</h2>
              <p style={{ color: '#555', fontStyle: 'italic' }}>[örkendew] — Процветание</p>
              <button className="btn-primary" style={{ background: 'var(--primary-bordeaux)', color: 'white', marginTop: '1rem' }}>
                Изучить
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Нижняя навигация для смартфонов */}
      <nav className="bottom-nav">
        <button className={`mobile-nav-btn ${activeTab === 'home' ? 'active' : ''}`} onClick={() => setActiveTab('home')}>
          <span>🏠</span> Главная
        </button>
        <button className={`mobile-nav-btn ${activeTab === 'learning' ? 'active' : ''}`} onClick={() => setActiveTab('learning')}>
          <span>📚</span> Курсы
        </button>
        <button className={`mobile-nav-btn ${activeTab === 'grammar' ? 'active' : ''}`} onClick={() => setActiveTab('grammar')}>
          <span>📖</span> Правила
        </button>
        <button className={`mobile-nav-btn ${activeTab === 'vocabulary' ? 'active' : ''}`} onClick={() => setActiveTab('vocabulary')}>
          <span>🎴</span> Слова
        </button>
      </nav>
    </div>
  );
}