import { useState } from 'react';
import './App.css';

interface WordCard {
  id: number;
  kazakh: string;
  russian: string;
}

const initialWords: WordCard[] = [
  { id: 1, kazakh: 'Сәлеметсіз бе!', russian: 'Здравствуйте!' },
  { id: 2, kazakh: 'Рақмет', russian: 'Спасибо' },
  { id: 3, kazakh: 'Қайырлы таң', russian: 'Доброе утро' },
  { id: 4, kazakh: 'Көріскенше', russian: 'До встречи' },
  { id: 5, kazakh: 'Иә / Жоқ', russian: 'Да / Нет' },
  { id: 6, kazakh: 'Жақсы', russian: 'Хорошо' },
];

export default function App() {
  const [activeTab, setActiveTab] = useState<'words' | 'grammar' | 'phrasebook'>('words');
  const [flippedCardId, setFlippedCardId] = useState<number | null>(null);

  const toggleCard = (id: number) => {
    setFlippedCardId(flippedCardId === id ? null : id);
  };

  return (
    <div className="app-container">
      {/* Шапка с вашим логотипом */}
      <header className="header">
        <div className="logo">
          <img src="/logo.png" alt="soile_i_bil by Symbat Logo" className="logo-img" />
          <span className="logo-title">soile_i_bil <small style={{ fontSize: '0.8rem', fontWeight: 400, color: '#666' }}>by Symbat</small></span>
        </div>
        <nav className="nav-links">
          <button 
            className={`nav-item ${activeTab === 'words' ? 'active' : ''}`}
            onClick={() => setActiveTab('words')}
          >
            Словарь
          </button>
          <button 
            className={`nav-item ${activeTab === 'grammar' ? 'active' : ''}`}
            onClick={() => setActiveTab('grammar')}
          >
            Грамматика
          </button>
          <button 
            className={`nav-item ${activeTab === 'phrasebook' ? 'active' : ''}`}
            onClick={() => setActiveTab('phrasebook')}
          >
            Разговорник
          </button>
        </nav>
      </header>

      {/* Главный баннер */}
      <section className="hero">
        <h1>Изучайте казахский язык с soile_i_bil</h1>
        <p>Простая платформа без регистрации. Нажимайте на карточки, чтобы узнать перевод слов.</p>
      </section>

      {/* Основной контент */}
      <main className="main-content">
        {activeTab === 'words' && (
          <div className="cards-grid">
            {initialWords.map((card) => (
              <div 
                key={card.id} 
                className="flashcard"
                onClick={() => toggleCard(card.id)}
              >
                {flippedCardId === card.id ? (
                  <div className="word-ru">{card.russian}</div>
                ) : (
                  <div className="word-kz">{card.kazakh}</div>
                )}
                <div className="hint-text">
                  {flippedCardId === card.id ? 'Перевод' : 'Нажмите, чтобы перевернуть'}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'grammar' && (
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <h2>Раздел Грамматики</h2>
            <p>Здесь будут правила и таблицы. Скоро добавим!</p>
          </div>
        )}

        {activeTab === 'phrasebook' && (
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <h2>Разговорник</h2>
            <p>Готовые диалоги для жизни. Скоро добавим!</p>
          </div>
        )}
      </main>
    </div>
  );
}