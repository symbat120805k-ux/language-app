import { useState } from 'react';
import './App.css';
import { lessonsData } from './lessonsData';

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'learning' | 'grammar' | 'vocabulary'>('home');
  const [xp, setXp] = useState(120);
  const [selectedLesson, setSelectedLesson] = useState<string | null>(null);
  const [quizAnswers, setQuizAnswers] = useState<{ [key: number]: number }>({});
  
  // Состояния для интерактивных карточек (в уроке и в словаре)
  const [flippedLessonCard, setFlippedLessonCard] = useState<number | null>(null);
  const [flippedGlobalCard, setFlippedGlobalCard] = useState<number | null>(null);

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

  return (
    <div className="app-layout">
      {/* Боковая панель */}
      <aside className="sidebar">
        <div>
          <div className="brand-area">
            <img src="/logo.png" alt="Logo" className="brand-logo" />
            <span className="brand-name">soile_i_bil</span>
          </div>
          <nav className="nav-menu">
            <button className={`nav-btn ${activeTab === 'home' ? 'active' : ''}`} onClick={() => { setActiveTab('home'); setSelectedLesson(null); }}>
              🏠 Главная
            </button>
            <button className={`nav-btn ${activeTab === 'learning' ? 'active' : ''}`} onClick={() => setActiveTab('learning')}>
              📚 Обучение
            </button>
            <button className={`nav-btn ${activeTab === 'grammar' ? 'active' : ''}`} onClick={() => { setActiveTab('grammar'); setSelectedLesson(null); }}>
              📖 Грамматика
            </button>
            <button className={`nav-btn ${activeTab === 'vocabulary' ? 'active' : ''}`} onClick={() => { setActiveTab('vocabulary'); setSelectedLesson(null); }}>
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

        {/* Раздел Главная */}
        {activeTab === 'home' && !selectedLesson && (
          <div className="dashboard-grid">
            <div className="left-column">
              <div className="banner-card">
                <span style={{ fontSize: '0.8rem', opacity: 0.8 }}>ПРОДОЛЖИТЬ ОБУЧЕНИЕ</span>
                <h3>Модуль 1: Сәлемдесу, танысу және қоштасу</h3>
                <p style={{ marginTop: '0.5rem', opacity: 0.9 }}>Базовые фразы для общения, знакомства и этикета</p>
                <button 
                  className="btn-primary" 
                  onClick={() => { setActiveTab('learning'); handleOpenLesson('1.1'); }}
                >
                  Продолжить →
                </button>
              </div>
            </div>
            <div className="right-column">
              <div className="word-of-day">
                <span style={{ fontSize: '0.75rem', color: '#555', fontWeight: 700 }}>СЛОВО ДНЯ</span>
                <h2 style={{ color: 'var(--primary-bordeaux)', marginTop: '0.3rem' }}>Өркендеу</h2>
                <p style={{ color: '#555', fontStyle: 'italic' }}>[örkendew] — Процветание</p>
              </div>
            </div>
          </div>
        )}

        {/* Раздел Обучение */}
        {activeTab === 'learning' && !selectedLesson && (
          <div>
            <h3>Программа курса</h3>
            <div style={{ display: 'grid', gap: '1rem', marginTop: '1rem' }}>
              {lessonsData.map((lesson) => (
                <div key={lesson.id} className="widget-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <span style={{ fontSize: '0.8rem', color: 'var(--primary-bordeaux)', fontWeight: 600 }}>{lesson.category}</span>
                    <h4 style={{ fontSize: '1.2rem', marginTop: '0.2rem' }}>{lesson.title}</h4>
                  </div>
                  <button className="btn-primary" style={{ background: 'var(--primary-bordeaux)', color: 'white' }} onClick={() => handleOpenLesson(lesson.id)}>
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
            <button onClick={() => setSelectedLesson(null)} style={{ background: 'none', border: 'none', color: 'var(--primary-bordeaux)', cursor: 'pointer', marginBottom: '1rem', fontWeight: 600 }}>
              ← Назад к списку уроков
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
                    <div style={{ fontSize: '0.85rem', color: '#666', marginLeft: '1rem' }}>{line.textRu}</div>
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
                      <div className="word-ru" style={{ fontWeight: 'bold', color: 'var(--primary-bordeaux)' }}>{word.ru}</div>
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
                {currentLesson.quiz.map((q) => (
                  <div key={q.id} style={{ marginBottom: '1.5rem', background: '#fafafa', padding: '1rem', borderRadius: '12px' }}>
                    <p style={{ fontWeight: 600, marginBottom: '0.8rem' }}>{q.id}. {q.question}</p>
                    {q.options.map((opt, idx) => {
                      const isSelected = quizAnswers[q.id] === idx;
                      const isCorrect = idx === q.correctAnswer;
                      let btnClass = 'quiz-option';
                      if (quizAnswers[q.id] !== undefined) {
                        if (isCorrect) btnClass += ' correct';
                        else if (isSelected) btnClass += ' wrong';
                      }
                      return (
                        <button key={idx} className={btnClass} onClick={() => handleAnswerSelect(q.id, idx, q.correctAnswer)}>
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Раздел Грамматика */}
        {activeTab === 'grammar' && !selectedLesson && (
          <div>
            <h3>📖 Грамматика и правила</h3>
            <div style={{ display: 'grid', gap: '1rem', marginTop: '1rem' }}>
              <div className="widget-card">
                <h4 style={{ color: 'var(--primary-bordeaux)' }}>Закон сингармонизма (Үндестік заңы)</h4>
                <p style={{ marginTop: '0.5rem', fontSize: '0.9rem' }}>
                  Гласные звуки подразделяются на гласные твердого и мягкого звучания. Если корень слова твердый (а, о, ұ, ы), то и окончание прибавляется твердое.
                </p>
              </div>
              <div className="widget-card">
                <h4 style={{ color: 'var(--primary-bordeaux)' }}>Личные окончания (Жіктеу жалғаулары)</h4>
                <p style={{ marginTop: '0.5rem', fontSize: '0.9rem' }}>
                  Используются для выражения лица: Мен студент-пін (Я студент), Сіз мұғалім-сіз (Вы учитель).
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Раздел Словарь */}
        {activeTab === 'vocabulary' && !selectedLesson && (
          <div>
            <h3 style={{ marginBottom: '0.5rem' }}>🎴 Интерактивный словарь по всем модулям</h3>
            <p style={{ fontSize: '0.85rem', color: '#666', marginBottom: '1rem' }}>Кликните на любую карточку, чтобы узнать ее перевод</p>
            <div className="cards-grid">
              {lessonsData.flatMap((l) => l.vocabulary).map((word, idx) => (
                <div 
                  key={idx} 
                  className="flashcard"
                  style={{ cursor: 'pointer', userSelect: 'none' }}
                  onClick={() => setFlippedGlobalCard(flippedGlobalCard === idx ? null : idx)}
                >
                  {flippedGlobalCard === idx ? (
                    <div className="word-ru" style={{ fontWeight: 'bold', color: 'var(--primary-bordeaux)' }}>{word.ru}</div>
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
        <button className={`mobile-nav-btn ${activeTab === 'home' ? 'active' : ''}`} onClick={() => { setActiveTab('home'); setSelectedLesson(null); }}>
          <span>🏠</span> Главная
        </button>
        <button className={`mobile-nav-btn ${activeTab === 'learning' ? 'active' : ''}`} onClick={() => { setActiveTab('learning'); setSelectedLesson(null); }}>
          <span>📚</span> Курсы
        </button>
        <button className={`mobile-nav-btn ${activeTab === 'grammar' ? 'active' : ''}`} onClick={() => { setActiveTab('grammar'); setSelectedLesson(null); }}>
          <span>📖</span> Правила
        </button>
        <button className={`mobile-nav-btn ${activeTab === 'vocabulary' ? 'active' : ''}`} onClick={() => { setActiveTab('vocabulary'); setSelectedLesson(null); }}>
          <span>🎴</span> Слова
        </button>
      </nav>
    </div>
  );
}