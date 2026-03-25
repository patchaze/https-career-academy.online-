import { useState, useRef } from 'react';
import './App.css';
import { blogArticles } from './data/blogData';
import { forumThreads, forumCategories } from './data/forumData';

const ROADMAP = [
  { id: 1, title: 'Neural Network Foundations', tag: 'Core Module', progress: 100, status: 'completed', lessons: 5 },
  { id: 2, title: 'Data Transformation & Vectors', tag: 'Mathematics', progress: 35, status: 'current', lessons: 8 },
  { id: 3, title: 'Large Language Model Architecture', tag: 'Advanced AI', progress: 0, status: 'locked', lessons: 12 },
  { id: 4, title: 'Deployment & Edge Inference', tag: 'Engineering', progress: 0, status: 'locked', lessons: 6 },
];

const LESSONS = [
  { id: 1, title: 'Introduction to Tensors', dur: '5:45', status: 'completed',
    desc: 'The foundational building blocks of every deep learning system — from scalars to n-dimensional vectors.',
    quiz: { q: 'What is a tensor?', opts: ['A simple scalar', 'A set of nodes', 'A multi-dimensional array', 'A loss function'], ans: 2 } },
  { id: 2, title: 'Linear Algebra for ML', dur: '12:00', status: 'current',
    desc: 'Mastering matrix operations and how they underpin Transformer self-attention mechanisms.',
    quiz: { q: 'What operation is core to the Transformer?', opts: ['Max Pooling', 'Dot-Product Attention', 'Convolution', 'Normalization'], ans: 1 } },
  { id: 3, title: 'Matrix Multiplication Deep Dive', dur: '9:30', status: 'pending',
    desc: 'Why parallelized matrix math on GPUs makes modern AI models possible at scale.',
    quiz: { q: 'Why are GPUs ideal for matrix math?', opts: ['More memory', 'Parallel processing cores', 'Larger cache', 'Cheaper cost'], ans: 1 } },
  { id: 4, title: 'Vector Spaces & Normalization', dur: '8:10', status: 'pending',
    desc: 'Transform raw data into meaningful coordinate representations used by neural nets.',
    quiz: { q: 'What does normalizing a vector do?', opts: ['Removes dimensions', 'Scales to unit length', 'Adds noise', 'Transposes the data'], ans: 1 } },
];

export default function App() {
  const [view, setView]           = useState('home');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [user, setUser]           = useState(null);

  const [goal, setGoal]           = useState('');
  const [generating, setGenerating] = useState(false);
  const [showRoadmap, setShowRoadmap] = useState(false);
  const [currentModule, setCurrentModule] = useState(null);

  const [activeCat, setActiveCat] = useState('All Discussions');
  const [activeArticle, setActiveArticle] = useState(null);
  const [activeLesson, setActiveLesson] = useState(LESSONS[1]);
  const [votes, setVotes]         = useState(Object.fromEntries(forumThreads.map(t => [t.id, t.votes])));

  const [quizOpen, setQuizOpen]   = useState(false);
  const [quizResult, setQuizResult] = useState(null);
  const videoRef = useRef(null);

  /* ── helpers ── */
  const login = (e) => {
    e.preventDefault();
    const n = e.target.name?.value;
    setUser({ name: n || 'Beta Student', xp: 4200, level: 'AI Specialist', streak: 12 });
    setIsLoggedIn(true);
    setView('home');
  };

  const generate = () => {
    if (!goal.trim()) return;
    setGenerating(true);
    setTimeout(() => { setGenerating(false); setShowRoadmap(true); }, 1400);
  };

  const vote = (id, dir) => setVotes(v => ({ ...v, [id]: v[id] + dir }));

  const answerQuiz = (i) => {
    setQuizResult(i === activeLesson.quiz.ans ? 'correct' : 'wrong');
    if (i === activeLesson.quiz.ans) setTimeout(() => { setQuizOpen(false); setQuizResult(null); }, 1800);
  };

  /* ── nav ── */
  const Nav = () => (
    <nav className="nav">
      <div className="nav-logo" onClick={() => setView('home')}>
        <div className="nav-logo-icon">L</div>
        <span className="nav-logo-text">Lumina AI</span>
      </div>
      <ul className="nav-links">
        {['home','blog','forum','profile'].map(v => (
          <li key={v}>
            <button className={view === v ? 'active' : ''} onClick={() => { if(v!=='home'&&!isLoggedIn){setView('auth');}else{setView(v);} }}>
              {v === 'home' ? 'Dashboard' : v === 'blog' ? 'Discovery' : v === 'forum' ? 'Community' : 'Mastery'}
            </button>
          </li>
        ))}
      </ul>
      {isLoggedIn
        ? <button className="btn btn-ghost" onClick={() => setView('profile')}>👤 {user.name}</button>
        : <button className="btn btn-primary" onClick={() => setView('auth')}>Join Lumina</button>
      }
    </nav>
  );

  /* ── AUTH ── */
  if (view === 'auth') return (
    <div className="auth-page fade-up">
      <div className="glow-orb" style={{width:400,height:400,top:'5%',left:'10%',background:'radial-gradient(circle,rgba(99,102,241,.25),transparent 70%)'}}/>
      <div className="card auth-card">
        <h2 className="grad">{isRegister ? 'Create Account' : 'Welcome Back'}</h2>
        <p className="sub">{isRegister ? 'Start your learning journey today.' : 'Enter your credentials to continue.'}</p>
        <form onSubmit={login}>
          {isRegister && <div className="input-group"><label className="input-label">Full Name</label><input name="name" className="input-field" placeholder="Ada Lovelace" /></div>}
          <div className="input-group"><label className="input-label">Email</label><input type="email" className="input-field" placeholder="you@lumina.ai" required /></div>
          <div className="input-group"><label className="input-label">Password</label><input type="password" className="input-field" placeholder="••••••••" required /></div>
          <button type="submit" className="btn btn-primary btn-full" style={{marginTop:'1rem',padding:'1rem'}}>
            {isRegister ? 'Create Account' : 'Sign In to Lumina'}
          </button>
        </form>
        <p className="auth-toggle">
          {isRegister ? 'Already have an account? ' : "Don't have an account? "}
          <button onClick={() => setIsRegister(r => !r)}>{isRegister ? 'Sign in' : 'Register free'}</button>
        </p>
      </div>
    </div>
  );

  /* ── LESSON PLAYER ── */
  if (currentModule) return (
    <div className="page">
      <Nav />
      <div className="player-view fade-up">
        <div className="player-back" onClick={() => setCurrentModule(null)}>
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M15 19l-7-7 7-7"/></svg>
          Back to Dashboard
        </div>

        <div className="player-layout">
          <div>
            <div className="video-frame">
              <video ref={videoRef} controls
                src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
                poster="https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=900&auto=format"
              />
            </div>
            <h1 className="lesson-title">{activeLesson.title}</h1>
            <p className="lesson-desc">{activeLesson.desc}</p>
            <div style={{marginTop:'2rem',display:'flex',gap:'1rem'}}>
              <button className="btn btn-primary" onClick={() => { setQuizOpen(true); setQuizResult(null); }}>Knowledge Check</button>
              <button className="btn btn-ghost" onClick={() => setCurrentModule(null)}>Back to Roadmap</button>
            </div>
          </div>

          <div className="card curriculum-sidebar">
            <h3>Course Curriculum</h3>
            <div className="lesson-list">
              {LESSONS.map(l => (
                <div key={l.id} className={`lesson-row ${activeLesson.id === l.id ? 'active' : ''}`} onClick={() => setActiveLesson(l)}>
                  <div className={`lesson-num ${l.status === 'completed' ? 'done' : ''}`}>
                    {l.status === 'completed' ? '✓' : l.id}
                  </div>
                  <div className="lesson-info">
                    <div className="lesson-name">{l.title}</div>
                    <div className="lesson-dur">{l.dur}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {quizOpen && (
          <div className="quiz-overlay">
            <div className="quiz-box fade-up">
              <p className="badge" style={{marginBottom:'1.5rem'}}>Knowledge Check</p>
              <h2>{activeLesson.quiz.q}</h2>
              <div className="quiz-options">
                {activeLesson.quiz.opts.map((opt, i) => (
                  <button key={i} onClick={() => answerQuiz(i)}
                    className={`quiz-option ${quizResult && i === activeLesson.quiz.ans ? 'correct' : quizResult === 'wrong' && i !== activeLesson.quiz.ans ? '' : ''}`}>
                    {opt}
                  </button>
                ))}
              </div>
              {quizResult === 'correct' && <p className="quiz-result success">✓ Correct! +50 XP earned</p>}
              {quizResult === 'wrong'   && <p className="quiz-result fail">✗ Try again</p>}
              <button className="btn btn-ghost" style={{marginTop:'1.5rem',width:'100%'}} onClick={() => { setQuizOpen(false); setQuizResult(null); }}>Dismiss</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  /* ── BLOG ── */
  if (view === 'blog') {
    if (activeArticle) return (
      <div className="page fade-up">
        <Nav />
        <div style={{maxWidth:'780px',margin:'0 auto',paddingBottom:'6rem'}}>
          <button className="player-back" onClick={() => setActiveArticle(null)}>
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M15 19l-7-7 7-7"/></svg>
            Back to Discovery
          </button>
          <div style={{marginBottom:'2rem'}}>
            <span className="badge" style={{marginBottom:'1.25rem',display:'inline-block'}}>{activeArticle.category}</span>
            <h1 style={{fontSize:'clamp(2rem,5vw,3.25rem)',fontFamily:'Outfit,sans-serif',fontWeight:800,marginBottom:'1rem',lineHeight:1.2}}>{activeArticle.title}</h1>
            <div style={{display:'flex',gap:'1.5rem',color:'var(--muted)',fontSize:'.875rem',marginBottom:'3rem',paddingBottom:'2rem',borderBottom:'1px solid var(--border)'}}>
              <span>{activeArticle.date}</span>
              <span>{activeArticle.readTime} read</span>
            </div>
          </div>
          <div style={{display:'flex',flexDirection:'column',gap:'1.75rem'}}>
            {activeArticle.body.trim().split('\n\n').map((para, i) => (
              <p key={i} style={{fontSize:'1.125rem',lineHeight:'1.85',color:'#cbd5e1',fontWeight:300}}>{para.trim()}</p>
            ))}
          </div>
        </div>
      </div>
    );

    return (
      <div className="page fade-up">
        <Nav />
        <div className="blog-header">
          <h1>The <span className="grad">Discovery</span></h1>
          <p>30 deep-dives into artificial intelligence, from 2023 to 2026.</p>
        </div>
        <div className="blog-grid">
          {blogArticles.map(a => (
            <article key={a.id} className="card article-card" style={{cursor:'pointer'}} onClick={() => setActiveArticle(a)}>
              <div className="article-card-top">
                <span className="badge">{a.category}</span>
              </div>
              <h3>{a.title}</h3>
              <p>{a.summary}</p>
              <div className="article-card-footer">
                <span className="article-date">{a.date}</span>
                <span className="article-time">{a.readTime} read</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    );
  }

  /* ── FORUM ── */
  if (view === 'forum') return (
    <div className="page fade-up">
      <Nav />
      <div className="forum-header">
        <div><h1>The <span className="grad">Exchange</span></h1><p style={{color:'var(--muted)',marginTop:'.5rem'}}>Learn together, grow faster.</p></div>
        <button className="btn btn-primary">+ New Discussion</button>
      </div>
      <div className="category-bar">
        {forumCategories.map(c => <button key={c} className={`cat-pill ${activeCat === c ? 'active' : ''}`} onClick={() => setActiveCat(c)}>{c}</button>)}
      </div>
      <div className="thread-list">
        {forumThreads.filter(t => activeCat === 'All Discussions' || t.category === activeCat).map(t => (
          <div key={t.id} className="thread-item">
            <div className="vote-col">
              <button className="vote-btn-icon" onClick={() => vote(t.id, 1)}>
                <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path d="M5 15l7-7 7 7"/></svg>
              </button>
              <span className="vote-count">{votes[t.id]}</span>
              <button className="vote-btn-icon" onClick={() => vote(t.id, -1)}>
                <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path d="M19 9l-7 7-7-7"/></svg>
              </button>
            </div>
            <div className="thread-content">
              <div className="thread-meta">
                <span className="badge">{t.category}</span>
                <span className="thread-author">by {t.author}</span>
                <span className="thread-time">{t.time}</span>
              </div>
              <h3>{t.title}</h3>
              <p>{t.content}</p>
              <div className="thread-stats">
                <span className="stat-pill">
                  <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>
                  {t.replies} replies
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  /* ── PROFILE ── */
  if (view === 'profile') {
    if (!isLoggedIn) { setView('auth'); return null; }
    return (
      <div className="page fade-up">
        <Nav />
        <div className="profile-grid">
          <div className="card profile-aside">
            <div className="avatar-circle"/>
            <h2>{user.name}</h2>
            <p>{user.level}</p>
            <div className="stats-row">
              <div className="stat-box"><div className="num">{user.streak}</div><div className="lbl">Streak</div></div>
              <div className="stat-box"><div className="num">{user.xp}</div><div className="lbl">XP</div></div>
              <div className="stat-box"><div className="num">5</div><div className="lbl">Badges</div></div>
            </div>
            <button className="btn btn-ghost" style={{width:'100%',marginTop:'2rem'}} onClick={() => { setIsLoggedIn(false); setUser(null); setView('home'); }}>Sign Out</button>
          </div>
          <div>
            <div className="xp-cards card" style={{padding:'2rem',marginBottom:'1.5rem'}}>
              <h3 style={{marginBottom:'1.5rem'}}>Your Progress</h3>
              <div className="xp-cards">
                <div className="xp-card"><div className="val">{user.xp}</div><div className="key">Total XP</div></div>
                <div className="xp-card cyan"><div className="val">{user.streak}</div><div className="key">Day Streak</div></div>
              </div>
              <div className="mastery-bar-row">
                <div className="mastery-bar-label"><span>Deep Learning</span><span>85%</span></div>
                <div className="mastery-track"><div className="mastery-fill" style={{width:'85%'}}/></div>
              </div>
              <div className="mastery-bar-row">
                <div className="mastery-bar-label"><span>NLP & Transformers</span><span>62%</span></div>
                <div className="mastery-track"><div className="mastery-fill" style={{width:'62%'}}/></div>
              </div>
              <div className="mastery-bar-row">
                <div className="mastery-bar-label"><span>MLOps & Deployment</span><span>40%</span></div>
                <div className="mastery-track"><div className="mastery-fill" style={{width:'40%'}}/></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ── HOME ── */
  return (
    <div className="page fade-up" style={{position:'relative'}}>
      <div className="glow-orb" style={{width:500,height:500,top:'0',left:'-100px',background:'radial-gradient(circle,rgba(99,102,241,.18),transparent 70%)'}}/>
      <div className="glow-orb" style={{width:400,height:400,bottom:'10%',right:'-80px',background:'radial-gradient(circle,rgba(14,165,233,.14),transparent 70%)'}}/>
      <Nav />

      <section className="home-hero">
        <h1>Study <span className="grad">Intelligently</span></h1>
        <p>Set your career target, and Lumina builds the perfect AI-powered learning path to get you there.</p>
        <div className="goal-form">
          <input className="goal-input" placeholder="e.g. Become a Senior AI Engineer in 6 months..."
            value={goal} onChange={e => setGoal(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && generate()} />
          <button className="btn btn-primary" onClick={generate} disabled={generating}>
            {generating ? 'Analyzing…' : 'Generate Path'}
          </button>
        </div>
      </section>

      {showRoadmap && (
        <section className="roadmap-section fade-up">
          <h2>Your Path to <span className="grad">{goal || 'AI Mastery'}</span></h2>
          <div className="roadmap-grid">
            {ROADMAP.map(m => (
              <div key={m.id} className="card module-card" onClick={() => setCurrentModule(m)}>
                <div className="module-card-tag">{m.tag}</div>
                <h3>{m.title}</h3>
                <div className="module-card-meta">{m.lessons} lessons</div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{width:`${m.progress}%`}}/>
                </div>
                <button className="btn btn-primary btn-full" style={{fontSize:'.85rem',padding:'.7rem'}}>
                  {m.status === 'completed' ? 'Review' : m.status === 'current' ? 'Continue →' : 'Start Module'}
                </button>
              </div>
            ))}
          </div>
        </section>
      )}

      <footer style={{borderTop:'1px solid var(--border)',padding:'3rem 0',textAlign:'center',color:'var(--muted)',fontSize:'.875rem',marginTop:'4rem'}}>
        © 2026 Lumina AI Inc. — Powering the next generation of intelligence.
      </footer>
    </div>
  );
}
