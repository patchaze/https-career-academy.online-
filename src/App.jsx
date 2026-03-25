import { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import { blogArticles } from './data/blogData';
import { forumThreads, forumCategories } from './data/forumData';

const MODULE_LIBRARY = [
  { id: 1,  title: 'Neural Network Foundations', tag: 'Core Module', lessons: 5, keywords: ['neural', 'network', 'foundation', 'brain', 'ai', 'deep learning'] },
  { id: 2,  title: 'Python for Data Science', tag: 'Programming', lessons: 8, keywords: ['python', 'coding', 'scripting', 'programming', 'data'] },
  { id: 3,  title: 'NLP & Transformers', tag: 'Advanced AI', lessons: 10, keywords: ['nlp', 'text', 'language', 'chat', 'llm', 'transformer'] },
  { id: 4,  title: 'Prompt Engineering Mastery', tag: 'Applied AI', lessons: 4, keywords: ['prompt', 'engineering', 'gpt', 'llm', 'instruct'] },
  { id: 5,  title: 'MLOps & Deployment', tag: 'Engineering', lessons: 12, keywords: ['mlops', 'deployment', 'scale', 'cloud', 'edge', 'ship'] },
  { id: 6,  title: 'Vector Databases & RAG', tag: 'Advanced AI', lessons: 7, keywords: ['vector', 'database', 'rag', 'retrieval', 'search', 'pinecone'] },
  { id: 7,  title: 'Computer Vision Basics', tag: 'Perception', lessons: 9, keywords: ['vision', 'image', 'cnn', 'perception', 'object', 'photo'] },
  { id: 8,  title: 'Mathematics for ML', tag: 'Mathematics', lessons: 8, keywords: ['math', 'vectors', 'algebra', 'calculus', 'matrix'] },
  { id: 9,  title: 'Security & AI Ethics', tag: 'Governance', lessons: 4, keywords: ['ethics', 'policy', 'governance', 'bias', 'safety', 'security'] },
  { id: 10, title: 'Reinforcement Learning', tag: 'Robotics', lessons: 11, keywords: ['reinforcement', 'robots', 'game', 'agent', 'decision'] }
];

const CURRICULUM_POOL = {
  1: [
    { id: 101, title: 'Tensors & Vector Math', dur: '5:45', status: 'completed', desc: 'Foundations of weights.', quiz: { q: 'What is a tensor?', opts: ['Object', 'Array', 'Vector Array', 'Module'], ans: 2 } },
    { id: 102, title: 'Activation Functions', dur: '8:30', status: 'current', desc: 'ReLU, Sigmoid, and Tanh.', quiz: { q: 'ReLU output?', opts: ['0-1', 'max(0,x)', '-1 to 1', 'log'], ans: 1 } }
  ],
  2: [
    { id: 201, title: 'Python for AI', dur: '10:00', status: 'completed', desc: 'Speed up with Numpy.', quiz: { q: 'Main AI lib?', opts: ['Numpy', 'Flask', 'Django', 'React'], ans: 0 } },
    { id: 202, title: 'Decorators for ML', dur: '7:15', status: 'current', desc: 'Optimization wraps.', quiz: { q: 'Purpose?', opts: ['UI', 'Styling', 'Wrap functions', 'Save db'], ans: 2 } }
  ],
  3: [
    { id: 301, title: 'Transformer Architecture', dur: '15:20', status: 'completed', desc: 'Self-attention and encoding.', quiz: { q: 'Core block?', opts: ['CNN', 'RNN', 'Attention', 'Dense'], ans: 2 } },
    { id: 302, title: 'Fine-tuning LLMs', dur: '12:00', status: 'current', desc: 'PEFT and LoRA methods.', quiz: { q: 'What is LoRA?', opts: ['Low-Rank Adapt.', 'High memory', 'Long Range', 'Laser'], ans: 0 } }
  ],
  4: [
    { id: 401, title: 'Advanced Prompting', dur: '6:40', status: 'completed', desc: 'Chain-of-thought and few-shot.', quiz: { q: 'CoT acronym?', opts: ['Call of Train', 'Chain of Thought', 'Cost of Time', 'Core'], ans: 1 } },
    { id: 402, title: 'System Instructions', dur: '9:00', status: 'current', desc: 'Setting constraints.', quiz: { q: 'Where are they?', opts: ['User msg', 'System msg', 'Assistant msg', 'Tools'], ans: 1 } }
  ],
  5: [
    { id: 501, title: 'CI/CD for Machine Learning', dur: '11:10', status: 'completed', desc: 'Automating tests.', quiz: { q: 'Main tool?', opts: ['Vercel', 'Jenkins', 'Postman', 'Notion'], ans: 1 } },
    { id: 502, title: 'Model Versioning', dur: '8:30', status: 'current', desc: 'Registry and tracking.', quiz: { q: 'Lib for tracking?', opts: ['MLflow', 'Photoshop', 'Git', 'Npm'], ans: 0 } }
  ],
  6: [
    { id: 601, title: 'Vector Embeddings', dur: '10:45', status: 'completed', desc: 'Similarity search math.', quiz: { q: 'Search type?', opts: ['SQL', 'Cosine Similarity', 'Binary', 'Regex'], ans: 1 } },
    { id: 602, title: 'Pinecone & Milvus', dur: '9:20', status: 'current', desc: 'Scaling vector DBs.', quiz: { q: 'What database?', opts: ['Relational', 'Vector', 'Key-Value', 'Graph'], ans: 1 } }
  ],
  7: [
    { id: 701, title: 'CNN Basics', dur: '13:00', status: 'completed', desc: 'Convolutional layers.', quiz: { q: 'Feature extractor?', opts: ['Kernels', 'Buttons', 'Strings', 'Links'], ans: 0 } },
    { id: 702, title: 'Object Detection', dur: '14:30', status: 'current', desc: 'YOLO vs Faster R-CNN.', quiz: { q: 'YOLO mean?', opts: ['You Only Look Once', 'You Live Once', 'Yellow', 'Yes'], ans: 0 } }
  ],
  8: [
    { id: 801, title: 'Calculus for Deep Learning', dur: '12:15', status: 'completed', desc: 'Gradients and derivatives.', quiz: { q: 'Purpose?', opts: ['Update weights', 'Style', 'Color', 'Sound'], ans: 0 } },
    { id: 802, title: 'Probability & Distributions', dur: '11:00', status: 'current', desc: 'Likelihood estimation.', quiz: { q: 'Common dist.?', opts: ['Normal', 'Abnormal', 'Square', 'Circle'], ans: 0 } }
  ],
  9: [
    { id: 901, title: 'AI Bias & Fairness', dur: '9:40', status: 'completed', desc: 'Detecting bias in data.', quiz: { q: 'Bias source?', opts: ['Code', 'Data', 'GPU', 'Internet'], ans: 1 } },
    { id: 902, title: 'Privacy with LLMs', dur: '10:20', status: 'current', desc: 'Redaction and protection.', quiz: { q: 'PII acronym?', opts: ['Personal Info', 'Private Item', 'Public', 'Post'], ans: 0 } }
  ],
  10: [
    { id: 1001, title: 'Markov Decision Processes', dur: '14:20', status: 'completed', desc: 'States and rewards.', quiz: { q: 'MDP goal?', opts: ['Maximize Reward', 'Hide', 'Sleep', 'Run'], ans: 0 } },
    { id: 1002, title: 'Deep Q-Learning', dur: '16:00', status: 'current', desc: 'Neural nets for agents.', quiz: { q: 'Strategy?', opts: ['Greedy', 'Lazy', 'Silent', 'Loud'], ans: 0 } }
  ]
};

const Cloud = {
  save: async (key, val) => {
    return new Promise(res => {
      localStorage.setItem(key, typeof val === 'string' ? val : JSON.stringify(val));
      setTimeout(res, 600); // Simulate network latency
    });
  },
  load: (key, fallback) => {
    const s = localStorage.getItem(key);
    try { return s ? JSON.parse(s) : fallback; } catch { return s || fallback; }
  }
};

const getLevel = (xp) => {
  if (xp > 10000) return 'Master of Intelligence';
  if (xp > 7500)  return 'Transformer Lead';
  if (xp > 5500)  return 'Neural Architect';
  if (xp > 4500)  return 'AI Specialist';
  return 'AI Initiate';
};

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();

  // Route Mapping
  const routeMap = { 'home':'/', 'blog':'/discovery', 'forum':'/community', 'profile':'/mastery', 'auth':'/auth' };
  const backMap = { '/': 'home', '/discovery': 'blog', '/community': 'forum', '/mastery': 'profile', '/auth': 'auth' };

  const [view, setView]           = useState(() => backMap[location.pathname] || 'home');
  const [isLoggedIn, setIsLoggedIn] = useState(() => Cloud.load('academy_loggedIn') === 'true');
  const [isRegister, setIsRegister] = useState(false);
  const [user, setUser]           = useState(() => Cloud.load('academy_user', null));

  const [goal, setGoal]           = useState(() => Cloud.load('academy_goal', ''));
  const [generating, setGenerating] = useState(false);
  const [showRoadmap, setShowRoadmap] = useState(() => Cloud.load('academy_showRoadmap') === 'true');
  const [activeRoadmap, setActiveRoadmap] = useState(() => Cloud.load('academy_roadmap', null));
  const [currentModule, setCurrentModule] = useState(null);

  const [activeCat, setActiveCat] = useState(() => Cloud.load('academy_cat', 'All Discussions'));
  const [activeArticle, setActiveArticle] = useState(null);
  const [activeLesson, setActiveLesson] = useState(null);
  const [threads, setThreads]     = useState(() => Cloud.load('academy_threads', forumThreads));
  const [showPostModal, setShowPostModal] = useState(false);

  const [quizOpen, setQuizOpen]   = useState(false);
  const [quizResult, setQuizResult] = useState(null);
  const [levelUpToast, setLevelUpToast] = useState(null);
  const [isSyncing, setIsSyncing]       = useState(false);

  // URL Sync Logic
  useEffect(() => {
    const p = location.pathname;
    if (p.startsWith('/player/')) {
      const modId = parseInt(p.split('/').pop());
      if (modId && activeRoadmap) {
        const mod = activeRoadmap.find(m => m.id === modId);
        if (mod) {
          setCurrentModule(mod);
          if (!activeLesson) setActiveLesson(CURRICULUM_POOL[mod.id]?.[0] || null);
          setView('player');
          return;
        }
      }
    }
    const v = backMap[p] || 'home';
    if (v !== view) setView(v);
    if (p === '/') setCurrentModule(null);
  }, [location.pathname, activeRoadmap]);

  const go = (v) => navigate(routeMap[v] || '/');

  // Persistence Layer
  useEffect(() => {
    const sync = async () => {
      setIsSyncing(true);
      await Promise.all([
        Cloud.save('academy_view', view),
        Cloud.save('academy_loggedIn', isLoggedIn),
        Cloud.save('academy_user', user),
        Cloud.save('academy_threads', threads),
        Cloud.save('academy_goal', goal),
        Cloud.save('academy_showRoadmap', showRoadmap),
        Cloud.save('academy_cat', activeCat),
        Cloud.save('academy_roadmap', activeRoadmap)
      ]);
      setIsSyncing(false);
    };
    sync();
  }, [view, isLoggedIn, user, threads, goal, showRoadmap, activeCat, activeRoadmap]);

  // View transition
  useEffect(() => { window.scrollTo(0, 0); }, [view]);
  const videoRef = useRef(null);

  /* ── helpers ── */
  const login = (e) => {
    e.preventDefault();
    const n = e.target.name?.value;
    setUser({ name: n || 'Beta Student', xp: 4200, level: getLevel(4200), streak: 12 });
    setIsLoggedIn(true);
    go('home');
  };

  const generate = () => {
    if (!isLoggedIn) { go('auth'); return; }
    if (!goal.trim()) return;
    setGenerating(true);
    
    // AI simulation logic: Match keywords in goal to library modules
    const lowerGoal = goal.toLowerCase();
    const scored = MODULE_LIBRARY.map(mod => {
      const score = mod.keywords.reduce((acc, kw) => acc + (lowerGoal.includes(kw) ? 1 : 0), 0);
      return { ...mod, score };
    }).sort((a, b) => b.score - a.score);

    // Pick top 4, mock progress/status
    const selected = scored.slice(0, 4).map((m, i) => ({
      ...m,
      progress: i === 0 ? 30 : 0,
      status: i === 0 ? 'current' : 'locked'
    }));

    setTimeout(() => { 
      setGenerating(false); 
      setActiveRoadmap(selected);
      setShowRoadmap(true); 
    }, 1400);
  };

  const vote = (id, dir) => {
    if (!isLoggedIn) { go('auth'); return; }
    setThreads(prev => prev.map(t => t.id === id ? { ...t, votes: t.votes + dir } : t));
  };

  const createThread = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newThread = {
      id: Date.now(),
      title: formData.get('title'),
      category: formData.get('category'),
      content: formData.get('content'),
      author: user?.name || 'Anonymous',
      votes: 1,
      replies: 0,
      time: 'Just now'
    };
    setThreads(prev => [newThread, ...prev]);
    setShowPostModal(false);
  };

  const answerQuiz = (i) => {
    const isCorrect = i === activeLesson.quiz.ans;
    setQuizResult(isCorrect ? 'correct' : 'wrong');
    
    if (isCorrect) {
      // Award XP and Update Level
      setUser(prev => {
        const nextXp = prev.xp + 50;
        const nextLevelTitle = getLevel(nextXp);
        if (nextLevelTitle !== prev.level) {
          setLevelUpToast(nextLevelTitle);
          setTimeout(() => setLevelUpToast(null), 4000);
        }
        return { ...prev, xp: nextXp, level: nextLevelTitle };
      });
      
      // Update Roadmap Progress
      if (activeRoadmap && currentModule) {
        setActiveRoadmap(prev => prev.map(m => 
          m.id === currentModule.id 
            ? { ...m, progress: Math.min(m.progress + 20, 100), status: m.progress >= 80 ? 'completed' : 'current' } 
            : m
        ));
      }

      setTimeout(() => { setQuizOpen(false); setQuizResult(null); }, 1800);
    }
  };

  /* ── nav ── */
  const Nav = () => (
    <nav className="nav">
      <div className="nav-logo" onClick={() => go('home')}>
        <div className="nav-logo-icon">C</div>
        <span className="nav-logo-text">Career Academy</span>
      </div>
      <ul className="nav-links">
        {['home','blog','forum','profile'].map(v => (
          <li key={v}>
            <button className={view === v ? 'active' : ''} onClick={() => { 
              const needsAuth = (v === 'profile');
              if (needsAuth && !isLoggedIn) go('auth'); 
              else go(v); 
            }}>
              {v === 'home' ? 'Dashboard' : v === 'blog' ? 'Discovery' : v === 'forum' ? 'Community' : 'Mastery'}
            </button>
          </li>
        ))}
      </ul>
        {isLoggedIn
          ? (
            <div style={{display:'flex',alignItems:'center',gap:'1rem'}}>
              {isSyncing && <div className="sync-badge"><div className="sync-dot"/><span>Syncing</span></div>}
              <button className="btn btn-ghost" onClick={() => go('profile')}>👤 {user.name}</button>
            </div>
          )
          : <button className="btn btn-primary" onClick={() => go('auth')}>Join Academy</button>
        }
    </nav>
  );

  /* ── AUTH ── */
  if (view === 'auth') return (
    <div className="auth-page fade-up">
      <div className="auth-back" onClick={() => go('home')}>
        <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M15 19l-7-7 7-7"/></svg>
        Back
      </div>
      <div className="glow-orb" style={{width:400,height:400,top:'5%',left:'10%',background:'radial-gradient(circle,rgba(99,102,241,.25),transparent 70%)'}}/>
      <div className="card auth-card">
        <h2 className="grad">{isRegister ? 'Create Account' : 'Welcome Back'}</h2>
        <p className="sub">{isRegister ? 'Start your learning journey today.' : 'Enter your credentials to continue.'}</p>
        <form onSubmit={login}>
          {isRegister && <div className="input-group"><label className="input-label">Full Name</label><input name="name" className="input-field" placeholder="Ada Lovelace" /></div>}
          <div className="input-group"><label className="input-label">Email</label><input type="email" className="input-field" placeholder="you@career-academy.online" required /></div>
          <div className="input-group"><label className="input-label">Password</label><input type="password" className="input-field" placeholder="••••••••" required /></div>
          <button type="submit" className="btn btn-primary btn-full" style={{marginTop:'1rem',padding:'1rem'}}>
            {isRegister ? 'Create Account' : 'Sign In to Academy'}
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
  if (view === 'player' && currentModule) return (
    <div className="page">
      <Nav />
      <div className="player-view fade-up">
        <div className="player-back" onClick={() => go('home')}>
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
              {isLoggedIn 
                ? <button className="btn btn-primary" onClick={() => { setQuizOpen(true); setQuizResult(null); }}>Knowledge Check</button>
                : <button className="btn btn-primary" onClick={() => setView('auth')}>Sign In for Quiz & Progress</button>
              }
              <button className="btn btn-ghost" onClick={() => setCurrentModule(null)}>Back to Roadmap</button>
            </div>
          </div>

          <div className="card curriculum-sidebar">
            <h3>Course Curriculum</h3>
            <div className="lesson-list">
              {CURRICULUM_POOL[currentModule.id]?.map(l => (
                <div key={l.id} className={`lesson-row ${activeLesson?.id === l.id ? 'active' : ''}`} onClick={() => setActiveLesson(l)}>
                  <div className={`lesson-num ${l.status === 'completed' ? 'done' : ''}`}>
                    {l.status === 'completed' ? '✓' : l.id.toString().slice(-1)}
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
        <button className="btn btn-primary" onClick={() => { if(!isLoggedIn) go('auth'); else setShowPostModal(true); }}>+ New Discussion</button>
      </div>
      <div className="category-bar">
        {forumCategories.map(c => <button key={c} className={`cat-pill ${activeCat === c ? 'active' : ''}`} onClick={() => setActiveCat(c)}>{c}</button>)}
      </div>
      <div className="thread-list">
        {threads.filter(t => activeCat === 'All Discussions' || t.category === activeCat).map(t => (
          <div key={t.id} className="thread-item">
            <div className="vote-col">
              <button className="vote-btn-icon" onClick={() => vote(t.id, 1)}>
                <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path d="M5 15l7-7 7 7"/></svg>
              </button>
              <span className="vote-count">{t.votes}</span>
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

      {showPostModal && (
        <div className="quiz-overlay">
          <div className="card auth-card fade-up" style={{maxWidth:'580px',background:'var(--bg)',border:'1px solid var(--border)',padding:'2.5rem'}}>
            <h2 className="grad" style={{marginBottom:'1rem'}}>New Discussion</h2>
            <p style={{color:'var(--muted)',marginBottom:'2rem',fontSize:'.875rem'}}>Share your thoughts with the community.</p>
            <form onSubmit={createThread}>
              <div className="input-group">
                <label className="input-label">Title</label>
                <input name="title" className="input-field" placeholder="e.g. Best local LLMs for coding?" required />
              </div>
              <div className="input-group">
                <label className="input-label">Category</label>
                <select name="category" className="input-field" style={{appearance:'none', cursor:'pointer'}}>
                  {forumCategories.filter(c => c !== 'All Discussions').map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div className="input-group">
                <label className="input-label">Content</label>
                <textarea name="content" className="input-field" rows={4} placeholder="What is on your mind?" required style={{resize:'none'}} />
              </div>
              <div style={{display:'flex',gap:'1rem',marginTop:'2rem'}}>
                <button type="submit" className="btn btn-primary" style={{flex:1}}>Post Thread</button>
                <button type="button" className="btn btn-ghost" style={{flex:1}} onClick={() => setShowPostModal(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );

  /* ── PROFILE ── */
  if (view === 'profile') {
    if (!isLoggedIn) { go('auth'); return null; }
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
            <button className="btn btn-ghost" style={{width:'100%',marginTop:'2rem'}} onClick={() => { setIsLoggedIn(false); setUser(null); go('home'); setShowRoadmap(false); setActiveRoadmap(null); setGoal(''); }}>Sign Out</button>
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
        <p>Set your career target, and Academy builds the perfect AI-powered learning path to get you there.</p>
        <div className="goal-form">
          <input className="goal-input" placeholder="e.g. Become a Senior AI Engineer in 6 months..."
            value={goal} onChange={e => setGoal(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && generate()} />
          <button className="btn btn-primary" onClick={generate} disabled={generating}>
            {generating ? 'Analyzing…' : 'Generate Path'}
          </button>
        </div>
      </section>

      {showRoadmap && activeRoadmap && (
        <section className="roadmap-section fade-up">
          <h2>Your Path to <span className="grad">{goal || 'AI Mastery'}</span></h2>
          <div className="roadmap-grid">
            {activeRoadmap.map((m, idx) => (
              <div key={m.id} className="card module-card" onClick={() => { 
                const isSample = idx === 0;
                if (!isLoggedIn && !isSample) go('auth');
                else {
                  navigate('/player/' + m.id);
                }
              }}>
                <div className="module-card-tag" style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                  <span>{m.tag}</span>
                  {(idx === 0) && <span style={{background:'var(--emerald)',color:'#fff',padding:'.1rem .4rem',borderRadius:'4px',fontSize:'.6rem',fontWeight:800}}>FREE SAMPLE</span>}
                </div>
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

      {levelUpToast && (
        <div className="level-toast">
          <div className="toast-icon">✨</div>
          <div className="toast-content">
            <h4>Level Up!</h4>
            <p>You have reached the rank of <b>{levelUpToast}</b></p>
          </div>
        </div>
      )}

      <footer style={{borderTop:'1px solid var(--border)',padding:'3rem 0',textAlign:'center',color:'var(--muted)',fontSize:'.875rem',marginTop:'4rem'}}>
        © 2026 Career Academy — Powering the next generation of intelligence.
      </footer>
    </div>
  );
}
