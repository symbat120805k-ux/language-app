import { useState } from 'react';
import './App.css';
import { lessonsData } from './lessonsData';
import { grammarRulesData } from './grammarData';

// Список слов для функции "Слово дня"
const wordsOfDay = [
  { kz: 'Өркендеу', ru: 'Процветание', transcription: 'örkendew' },
  { kz: 'Шабыт', ru: 'Вдохновение', transcription: 'shabyt' },
  { kz: 'Болашақ', ru: 'Будущее', transcription: 'bolashaq' },
  { kz: 'Денсаулық', ru: 'Здоровье', transcription: 'densaulyq' },
  { kz: 'Мақсат', ru: 'Цель', transcription: 'maqsat' },
  { kz: 'Береке', ru: 'Благополучие / Изобилие', transcription: 'bereke' },
  { kz: 'Сәттілік', ru: 'Удача', transcription: 'sattilik' },
  { kz: 'Парасат', ru: 'Мудрость', transcription: 'parasat' },
  { kz: 'Мейірім', ru: 'Доброта / Милосердие', transcription: 'meirim' },
  { kz: 'Достық', ru: 'Дружба', transcription: 'dostyq' },
];

// Автоматический выбор слова на основе текущей даты (меняется каждый день)
const getTodayWord = () => {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now.getTime() - start.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.floor(diff / oneDay);
  return wordsOfDay[dayOfYear % wordsOfDay.length];
};

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'rules' | 'grammar' | 'vocabulary'>('home');
  const [xp, setXp] = useState(120);
  const [selectedLesson, setSelectedLesson] = useState<string | null>(null);
  const [quizAnswers, setQuizAnswers] = useState<{ [key: number]: number }>({});

  // Состояния для карточек
  const [flippedLessonCard, setFlippedLessonCard] = useState<number | null>(null);
  const [flippedGlobalCard, setFlippedGlobalCard] = useState<number | null>(null);
  const [expandedGrammar, setExpandedGrammar] = useState<string | null>(null);

  const currentLesson = lessonsData.find((l) => l.id === selectedLesson);

  const handleAnswerSelect = (questionId: number, optionIdx: number, correctIdx: number) => {
    if (quizAnswers[questionId] !== undefined) return;
    setQuizAnswers((prev) => ({ ...prev, [questionId]: optionIdx }));
    if (optionIdx === correctIdx) {
      setXp((prev) => prev + 10);
    }
  };

  const handleOpenLesson = (lessonId: string) => {
    setSelectedLesson(lessonId);
    setFlippedLessonCard(null);
    setQuizAnswers({});
  };

  const todayWord = getTodayWord();

  return (
    <div className="app-layout">
      {/* Боковая панель (для больших экранов) */}
      <aside className="sidebar">
        <div>
          <div className="brand-area">
            <img src="/logo.png" alt="Logo" className="brand-logo" />
            <span className="brand-name">soile_i_bil</span>
          </div>
          <nav className="nav-menu">
            <button 
              className={`nav-btn ${activeTab === 'home' ? 'active' : ''}`} 
              onClick={() => { setActiveTab('home'); setSelectedLesson(null); }}
            >
              🏠 Главная
            </button>
            <button 
              className={`nav-btn ${activeTab === 'rules' ? 'active' : ''}`} 
              onClick={() => { setActiveTab('rules'); setSelectedLesson(null); }}
            >
              📖 Правила
            </button>
            <button 
              className={`nav-btn ${activeTab === 'grammar' ? 'active' : ''}`} 
              onClick={() => { setActiveTab('grammar'); setSelectedLesson(null); }}
            >
              📚 Грамматика
            </button>
            <button 
              className={`nav-btn ${activeTab === 'vocabulary' ? 'active' : ''}`} 
              onClick={() => { setActiveTab('vocabulary'); setSelectedLesson(null); }}
            >
              🎴 Словарь
            </button>
          </nav>
        </div>
        <div style={{ fontSize: '0.8rem', color: '#888' }}>by Symbat</div>
      </aside>

      {/* Основная область */}
      <main className="main-dashboard">
        <header className="top-header">
          <div className="user-greeting">
            <h2>Сәлем, Оқушы! 👋</h2>
            <p style={{ color: '#666', fontSize: '0.9rem' }}>Готовы продолжить изучение казахского?</p>
          </div>
          <div className="sun-battery-badge" title="Ваш заряд энергии обучения">
            <span className="sun-icon">☀️</span>
            <span className="battery-text">Күн батареясы: <strong>{xp} XP</strong></span>
          </div>
        </header>

        {/* Раздел: Главная */}
        {activeTab === 'home' && !selectedLesson && (
          <div className="dashboard-grid">
            <div className="left-column">
              <div className="banner-card">
                <span style={{ fontSize: '0.8rem', opacity: 0.8 }}>ПРОДОЛЖИТЬ ОБУЧЕНИЕ</span>
                <h3>Модуль 1: Сәлемдесу, танысу және қоштасу</h3>
                <p style={{ marginTop: '0.5rem', opacity: 0.9 }}>
                  Базовые фразы для общения, знакомства и этикета
                </p>
                <button 
                  className="btn-primary" 
                  onClick={() => { setActiveTab('grammar'); handleOpenLesson('1.1'); }}
                >
                  Продолжить →
                </button>
              </div>
            </div>
            <div className="right-column">
              <div className="word-of-day">
                <span style={{ fontSize: '0.75rem', color: '#555', fontWeight: 700 }}>СЛОВО ДНЯ</span>
                <h2 style={{ color: 'var(--primary-bordeaux)', marginTop: '0.3rem' }}>{todayWord.kz}</h2>
                <p style={{ color: '#555', fontStyle: 'italic' }}>[{todayWord.transcription}] — {todayWord.ru}</p>
              </div>
            </div>
          </div>
        )}

        {/* Раздел: Правила */}
        {activeTab === 'rules' && !selectedLesson && (
          <div>
            <h3>📖 Правила языка</h3>
            <p style={{ fontSize: '0.85rem', color: '#666', marginBottom: '1rem' }}>
              Нажмите на тему, чтобы изучить правило и примеры
            </p>
            <div style={{ display: 'grid', gap: '1rem' }}>
              {grammarRulesData.map((item) => {
                const isOpen = expandedGrammar === item.id;
                return (
                  <div 
                    key={item.id} 
                    className="widget-card" 
                    style={{ cursor: 'pointer' }} 
                    onClick={() => setExpandedGrammar(isOpen ? null : item.id)}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <span style={{ fontSize: '0.75rem', color: 'var(--primary-bordeaux)', fontWeight: 700 }}>
                          {item.category.toUpperCase()}
                        </span>
                        <h4 style={{ color: '#222', marginTop: '0.2rem' }}>{item.title}</h4>
                        <p style={{ fontSize: '0.85rem', color: '#666', marginTop: '0.3rem' }}>{item.summary}</p>
                      </div>
                      <span style={{ fontSize: '1.2rem', color: 'var(--primary-bordeaux)' }}>
                        {isOpen ? '▲' : '▼'}
                      </span>
                    </div>

                    {isOpen && (
                      <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid #eee' }}>
                        <p style={{ fontSize: '0.9rem', color: '#333', whiteSpace: 'pre-line', lineHeight: '1.5' }}>
                          <strong>Правило:</strong><br />
                          {item.rule}
                        </p>

                        {item.affixes && (
                          <div style={{ marginTop: '0.8rem', padding: '0.8rem', background: '#f8f9fa', borderRadius: '8px', fontSize: '0.85rem' }}>
                            <strong>Окончания:</strong> {item.affixes}
                          </div>
                        )}

                        <div style={{ marginTop: '1rem' }}>
                          <strong style={{ fontSize: '0.85rem', color: '#555' }}>Примеры:</strong>
                          <div style={{ display: 'grid', gap: '0.5rem', marginTop: '0.5rem' }}>
                            {item.examples.map((ex, idx) => (
                              <div 
                                key={idx} 
                                style={{ 
                                  padding: '0.5rem 0.8rem', 
                                  background: '#fff', 
                                  borderRadius: '6px', 
                                  border: '1px solid #eee', 
                                  fontSize: '0.85rem' 
                                }}
                              >
                                <span style={{ fontWeight: 600, color: 'var(--primary-bordeaux)' }}>{ex.kz}</span> — <span style={{ color: '#555' }}>{ex.ru}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Раздел: Грамматика (уроки, диалоги, квизы) */}
        {activeTab === 'grammar' && !selectedLesson && (
          <div>
            <h3>📚 Грамматика и модули</h3>
            <div style={{ display: 'grid', gap: '1rem', marginTop: '1rem' }}>
              {lessonsData.map((lesson) => (
                <div 
                  key={lesson.id} 
                  className="widget-card" 
                  style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                >
                  <div>
                    <span style={{ fontSize: '0.8rem', color: 'var(--primary-bordeaux)', fontWeight: 600 }}>
                      {lesson.category}
                    </span>
                    <h4 style={{ fontSize: '1.2rem', marginTop: '0.2rem' }}>{lesson.title}</h4>
                  </div>
                  <button 
                    className="btn-primary" 
                    style={{ background: 'var(--primary-bordeaux)', color: 'white' }} 
                    onClick={() => handleOpenLesson(lesson.id)}
                  >
                    Начать урок
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Страница открытого урока */}
        {selectedLesson && currentLesson && (
          <div>
            <button 
              onClick={() => setSelectedLesson(null)} 
              style={{ 
                background: 'none', 
                border: 'none', 
                color: 'var(--primary-bordeaux)', 
                cursor: 'pointer', 
                marginBottom: '1rem', 
                fontWeight: 600 
              }}
            >
              ← Назад к урокам
            </button>
            <div className="lesson-card">
              <h2>{currentLesson.title}</h2>
              <p style={{ color: '#666', marginTop: '0.3rem' }}>{currentLesson.description}</p>

              {/* Блок 1: Диалог */}
              <h3 style={{ marginTop: '1.5rem' }}>🗣️ Диалог</h3>
              <div className="dialogue-box">
                {currentLesson.dialogue.map((line, idx) => (
                  <div key={idx} className="dialogue-line">
                    <span className="speaker">{line.speaker}: </span>
                    <span>{line.textKz}</span>
                    <div style={{ fontSize: '0.85rem', color: '#666', marginLeft: '1rem' }}>
                      {line.textRu}
                    </div>
                  </div>
                ))}
              </div>

              {/* Блок 2: Флеш-карточки урока */}
              <h3 style={{ marginTop: '2rem' }}>🎴 Карточки слов (Нажмите для перевода)</h3>
              <div className="cards-grid" style={{ marginTop: '1rem' }}>
                {currentLesson.vocabulary.map((word, idx) => (
                  <div 
                    key={idx} 
                    className="flashcard"
                    style={{ cursor: 'pointer', userSelect: 'none' }}
                    onClick={() => setFlippedLessonCard(flippedLessonCard === idx ? null : idx)}
                  >
                    {flippedLessonCard === idx ? (
                      <div className="word-ru" style={{ fontWeight: 'bold', color: 'var(--primary-bordeaux)' }}>
                        {word.ru}
                      </div>
                    ) : (
                      <>
                        <div className="word-kz">{word.kz}</div>
                        {word.transcription && (
                          <div style={{ fontSize: '0.8rem', color: '#888', marginTop: '0.3rem', fontStyle: 'italic' }}>
                            [{word.transcription}]
                          </div>
                        )}
                      </>
                    )}
                    <div style={{ fontSize: '0.7rem', color: '#aaa', marginTop: '0.5rem', textAlign: 'center' }}>
                      {flippedLessonCard === idx ? 'Перевод' : 'Нажмите для перевода'}
                    </div>
                  </div>
                ))}
              </div>

              {/* Блок 3: Интерактивный тест */}
              <h3 style={{ marginTop: '2.5rem' }}>📝 Проверка знаний (Квиз)</h3>
              <div style={{ marginTop: '1rem' }}>
                {currentLesson.quiz && currentLesson.quiz.length > 0 ? (
                  currentLesson.quiz.map((q) => (
                    <div 
                      key={q.id} 
                      style={{ 
                        marginBottom: '1.5rem', 
                        background: '#ffffff', 
                        padding: '1.2rem', 
                        borderRadius: '12px', 
                        border: '1px solid #eee', 
                        boxShadow: '0 2px 4px rgba(0,0,0,0.02)' 
                      }}
                    >
                      <p style={{ fontWeight: 600, marginBottom: '0.8rem', color: '#222' }}>
                        {q.id}. {q.question}
                      </p>
                      {q.options.map((opt, idx) => {
                        const isSelected = quizAnswers[q.id] === idx;
                        const isCorrect = idx === q.correctAnswer;
                        let btnClass = 'quiz-option';
                        if (quizAnswers[q.id] !== undefined) {
                          if (isCorrect) btnClass += ' correct';
                          else if (isSelected) btnClass += ' wrong';
                        }
                        return (
                          <button 
                            key={idx} 
                            className={btnClass} 
                            style={{
                              display: 'block',
                              width: '100%',
                              padding: '12px 16px',
                              marginTop: '8px',
                              backgroundColor: isSelected 
                                ? (isCorrect ? '#e8f5e9' : '#ffebee') 
                                : (quizAnswers[q.id] !== undefined && isCorrect ? '#e8f5e9' : '#ffffff'),
                              border: '1.5px solid',
                              borderColor: isSelected 
                                ? (isCorrect ? '#4caf50' : '#ef5350') 
                                : (quizAnswers[q.id] !== undefined && isCorrect ? '#4caf50' : '#e0e0e0'),
                              borderRadius: '10px',
                              color: '#333333',
                              fontSize: '0.95rem',
                              textAlign: 'left',
                              cursor: 'pointer'
                            }}
                            onClick={() => handleAnswerSelect(q.id, idx, q.correctAnswer)}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                  ))
                ) : (
                  <p style={{ color: '#888' }}>Тест для этого урока скоро появится.</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Раздел: Словарь */}
        {activeTab === 'vocabulary' && !selectedLesson && (
          <div>
            <h3 style={{ marginBottom: '0.5rem' }}>🎴 Интерактивный словарь по всем модулям</h3>
            <p style={{ fontSize: '0.85rem', color: '#666', marginBottom: '1rem' }}>
              Кликните на любую карточку, чтобы узнать ее перевод
            </p>
            <div className="cards-grid">
              {lessonsData.flatMap((l) => l.vocabulary).map((word, idx) => (
                <div 
                  key={idx} 
                  className="flashcard"
                  style={{ cursor: 'pointer', userSelect: 'none' }}
                  onClick={() => setFlippedGlobalCard(flippedGlobalCard === idx ? null : idx)}
                >
                  {flippedGlobalCard === idx ? (
                    <div className="word-ru" style={{ fontWeight: 'bold', color: 'var(--primary-bordeaux)' }}>
                      {word.ru}
                    </div>
                  ) : (
                    <>
                      <div className="word-kz">{word.kz}</div>
                      {word.transcription && (
                        <div style={{ fontSize: '0.8rem', color: '#888', marginTop: '0.4rem', fontStyle: 'italic' }}>
                          [{word.transcription}]
                        </div>
                      )}
                    </>
                  )}
                  <div style={{ fontSize: '0.7rem', color: '#aaa', marginTop: '0.5rem', textAlign: 'center' }}>
                    {flippedGlobalCard === idx ? 'Перевод' : 'Нажмите для перевода'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Нижнее меню для мобильных устройств */}
      <nav className="bottom-nav">
        <button 
          className={`mobile-nav-btn ${activeTab === 'home' ? 'active' : ''}`} 
          onClick={() => { setActiveTab('home'); setSelectedLesson(null); }}
        >
          <span>🏠</span> Главная
        </button>
        <button 
          className={`mobile-nav-btn ${activeTab === 'rules' ? 'active' : ''}`} 
          onClick={() => { setActiveTab('rules'); setSelectedLesson(null); }}
        >
          <span>📖</span> Правила
        </button>
        <button 
          className={`mobile-nav-btn ${activeTab === 'grammar' ? 'active' : ''}`} 
          onClick={() => { setActiveTab('grammar'); setSelectedLesson(null); }}
        >
          <span>📚</span> Грамматика
        </button>
        <button 
          className={`mobile-nav-btn ${activeTab === 'vocabulary' ? 'active' : ''}`} 
          onClick={() => { setActiveTab('vocabulary'); setSelectedLesson(null); }}
        >
          <span>🎴</span> Словарь
        </button>
      </nav>
    </div>
  );
}