import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Moon, Book, Wind, HelpCircle, Dumbbell, Medal, User, Brain, ArrowLeft, Clock, BarChart2, Activity, ShieldCheck, RefreshCw, Eye, X, Send, Play, Settings, Edit3, Star, Zap, Trophy, Shield, Heart, Award, Globe, CheckCircle2 } from 'lucide-react';
import { articles } from './articles';
import { SCENARIOS } from './scenarios';
import { AuthService, ProgressService } from './services/api';
import './index.css';

// --- TOOLBOX OVERLAYS (Extracted to root to prevent React focus/remount bugs) ---

const BreathingOverlay = ({ setIsBreathing }) => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(255,255,255,0.95)', zIndex: 100, backdropFilter: 'blur(10px)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', borderRadius: '28px' }}>
    <button onClick={() => setIsBreathing(false)} style={{ position: 'absolute', top: '2.5rem', right: '3rem', background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-main)', opacity: 0.7 }}><X size={32} /></button>
    <h2 style={{ fontSize: '2rem', fontWeight: 600, color: 'var(--sage-dark)', marginBottom: '4rem' }}>Calm Down Space</h2>
    <div style={{ position: 'relative', width: '300px', height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <motion.div animate={{ scale: [1, 1.8, 1.8, 1] }} transition={{ duration: 12, repeat: Infinity, times: [0, 0.4, 0.6, 1], ease: "easeInOut" }} style={{ position: 'absolute', width: '120px', height: '120px', borderRadius: '50%', background: 'rgba(150, 175, 151, 0.15)' }} />
      <motion.div animate={{ scale: [1, 1.5, 1.5, 1] }} transition={{ duration: 12, repeat: Infinity, times: [0, 0.4, 0.6, 1], ease: "easeInOut" }} style={{ position: 'absolute', width: '150px', height: '150px', borderRadius: '50%', background: 'rgba(150, 175, 151, 0.3)' }} />
      <motion.div style={{ zIndex: 2, background: 'var(--sage)', width: '130px', height: '130px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 600, fontSize: '1.2rem', boxShadow: '0 10px 40px rgba(150, 175, 151, 0.5)' }}>
        <motion.span animate={{ opacity: [1, 0, 0, 1] }} transition={{ duration: 12, repeat: Infinity, times: [0, 0.35, 0.65, 1] }} style={{ position: 'absolute' }}>Breathe In</motion.span>
        <motion.span animate={{ opacity: [0, 1, 0, 0] }} transition={{ duration: 12, repeat: Infinity, times: [0, 0.35, 0.65, 1] }} style={{ position: 'absolute' }}>Hold</motion.span>
        <motion.span animate={{ opacity: [0, 0, 1, 0] }} transition={{ duration: 12, repeat: Infinity, times: [0, 0.35, 0.65, 1] }} style={{ position: 'absolute' }}>Breathe Out</motion.span>
      </motion.div>
    </div>
  </motion.div>
);

const CalmSpaceOverlay = ({ setIsCalming }) => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(135deg, #1d2521 0%, #303e38 100%)', zIndex: 100, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', borderRadius: '28px', overflow: 'hidden' }}>
    <button onClick={() => setIsCalming(false)} style={{ position: 'absolute', top: '2.5rem', right: '3rem', background: 'transparent', border: 'none', cursor: 'pointer', color: 'white', opacity: 0.7, zIndex: 10 }}><X size={32} /></button>
    <motion.div animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.2, 1] }} transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }} style={{ position: 'absolute', width: '800px', height: '800px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(150,175,151,0.1) 0%, rgba(0,0,0,0) 70%)' }} />
    <Moon size={48} color="rgba(255,255,255,0.8)" style={{ marginBottom: '2rem' }} />
    <h2 style={{ fontSize: '2rem', fontWeight: 500, color: 'white', marginBottom: '1rem', letterSpacing: '0.05em' }}>Sensory Rest Space</h2>
    <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1.1rem', maxWidth: '400px', textAlign: 'center', lineHeight: '1.6' }}>Close your eyes. Listen to the room around you. Take a break from the screen for 60 seconds.</p>
  </motion.div>
);

const JournalOverlay = ({ setIsJournaling }) => {
  const [journalText, setJournalText] = useState("");
  
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(246, 250, 245, 0.98)', zIndex: 100, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '4rem', borderRadius: '28px', overflow: 'hidden', backdropFilter: 'blur(20px)' }}>
      <button onClick={() => setIsJournaling(false)} style={{ position: 'absolute', top: '2.5rem', right: '3rem', background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-main)', opacity: 0.5 }}><X size={32} /></button>
      <div className="glass-card" style={{ width: '100%', maxWidth: '700px', background: 'white', padding: '3rem', display: 'flex', flexDirection: 'column', height: '100%' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}><Book size={28} color="var(--sage-dark)" /><h2 style={{ fontSize: '1.8rem', fontWeight: 600, color: 'var(--text-main)' }}>Private Reflection</h2></div>
        <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>Why did you make the last choice you made? How is the avatar feeling?</p>
        <textarea autoFocus value={journalText} onChange={(e) => setJournalText(e.target.value)} placeholder="Type your thoughts here..." style={{ flex: 1, width: '100%', borderRadius: '12px', border: '1px solid var(--glass-border)', background: 'var(--app-bg)', padding: '1.5rem', fontSize: '1.1rem', fontFamily: 'inherit', color: 'var(--text-main)', resize: 'none', outline: 'none', boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.02)' }} />
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
          <button onClick={() => setIsJournaling(false)} style={{ background: 'var(--sage)', color: 'white', border: 'none', padding: '1rem 2rem', borderRadius: '12px', fontWeight: 600, fontSize: '1rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Send size={18} /> Save Entry securely</button>
        </div>
      </div>
    </motion.div>
  );
};

const ExerciseOverlay = ({ setIsExercising }) => {
  const [timer, setTimer] = useState(30);
  useEffect(() => { let int = setInterval(() => setTimer(t => (t > 0 ? t - 1 : 0)), 1000); return () => clearInterval(int); }, []);
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(255, 255, 255, 0.95)', zIndex: 100, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', borderRadius: '28px' }}>
      <button onClick={() => setIsExercising(false)} style={{ position: 'absolute', top: '2.5rem', right: '3rem', background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-main)' }}><X size={32} /></button>
      <Dumbbell size={64} color="var(--gold)" style={{ marginBottom: '2rem' }} />
      <h2 style={{ fontSize: '2.4rem', fontWeight: 700, marginBottom: '1rem' }}>Burn off Cortisol!</h2>
      <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', marginBottom: '3rem' }}>Stand up from your chair and do Jumping Jacks.</p>
      <div style={{ fontSize: '5rem', fontWeight: 800, color: timer === 0 ? 'var(--sage)' : 'var(--text-main)', background: 'rgba(223, 186, 85, 0.2)', width: '200px', height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%' }}>
        {timer > 0 ? timer : 'Done!'}
      </div>
    </motion.div>
  );
};

const HelpOverlay = ({ setIsHelping }) => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.6)', zIndex: 100, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', borderRadius: '28px', backdropFilter: 'blur(5px)' }}>
    <div className="glass-card" style={{ background: 'white', padding: '3rem', maxWidth: '500px', width: '90%', borderRadius: '24px', position: 'relative' }}>
      <button onClick={() => setIsHelping(false)} style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}><X size={24} /></button>
      <h2 style={{ fontSize: '1.6rem', fontWeight: 700, marginBottom: '1rem' }}>How to play this Laboratory</h2>
      <ul style={{ color: 'var(--text-muted)', lineHeight: '1.6', fontSize: '1.05rem', paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <li><strong>The Goal:</strong> Read the scenario and pick the choice you think is most empathetic.</li>
        <li><strong>The Heatmap:</strong> Watch the four bubbles on the left side. Selecting kind actions will drop the avatar's sadness and anxiety levels!</li>
        <li><strong>Mistakes:</strong> If you pick a mean or avoidant choice, the avatar might get angry or run away. If this happens, hit the "Restart Simulation" button to try again!</li>
      </ul>
    </div>
  </motion.div>
);

// --- MAIN APPLICATION CONTENT ---

export default function App() {
  const ARTICLE_OVERRIDES = {
    49: 'predictive-empathy-simulations-pediatric-therapy',
    48: 'mental-health-trends-children-2026',
    47: 'ai-early-childhood-emotional-learning'
  };

  const articleToSlug = (article) => {
    if (ARTICLE_OVERRIDES[article.id]) return ARTICLE_OVERRIDES[article.id];
    return article.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  };

  const getInitialView = () => {
    const path = window.location.pathname.replace('/', '');
    if (!path || path === 'landing') return 'landing';
    const foundArticleBySlug = articles.find(a => articleToSlug(a) === path);
    if (foundArticleBySlug) return 'article';
    return path;
  };

  const [currentView, _setCurrentView] = useState(getInitialView); 

  useEffect(() => {
    const handlePopState = () => {
      _setCurrentView(getInitialView());
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const setCurrentView = (view, path = null) => {
    _setCurrentView(view);
    window.history.pushState(null, '', `/${path || (view === 'landing' ? '' : view)}`);
  };

  const [activeArticle, setActiveArticle] = useState(() => {
    const path = window.location.pathname.replace('/', '');
    return articles.find(a => articleToSlug(a) === path) || null;
  });
  const [activeScenarioId, setActiveScenarioId] = useState('exclusion');
  
  const [user, setUser] = useState(null);
  const [growthData, setGrowthData] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  const [currentNode, setCurrentNode] = useState('start');
  const [emotionState, setEmotionState] = useState(SCENARIOS['exclusion'].nodes['start'].emotions);
  const [history, setHistory] = useState([]);
  const [isMiaPOV, setIsMiaPOV] = useState(false);

  const [isBreathing, setIsBreathing] = useState(false);
  const [isCalming, setIsCalming] = useState(false);
  const [isJournaling, setIsJournaling] = useState(false);
  const [isHelping, setIsHelping] = useState(false);
  const [isExercising, setIsExercising] = useState(false);

  useEffect(() => {
    AuthService.getCurrentUser().then(setUser);
  }, []);

  const navigateTo = (view, slug = null) => {
    if (view === 'growth' && !user) {
      setCurrentView('login');
    } else {
      setCurrentView(view, slug);
      if (view === 'blog') setActiveArticle(null);
    }
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    const viewTitles = {
      landing: "Career Academy EQ Lab | Number 1 Emotion Simulator for Kids",
      dashboard: "Brain Hub | Emotional Intelligence Mastery",
      library: "Simulation Lab | Interactive EQ Training",
      blog: "Parenting & Educator Library | EQ Resources",
      article: activeArticle ? `${activeArticle.title} | EQ Lab` : "Article Reader",
      growth: "My Growth Journey | Career Academy EQ",
      profile: "Student Profile | Career Academy EQ",
      login: "Log In | Career Academy EQ Lab"
    };
    document.title = viewTitles[currentView] || "Career Academy EQ Lab";
  }, [currentView, activeArticle]);

  useEffect(() => {
    if (currentView === 'growth' && user) {
      ProgressService.getGrowthData().then(setGrowthData);
    }
  }, [currentView, user]);

  const startScenario = (id) => {
    setActiveScenarioId(id);
    setCurrentNode('start');
    setEmotionState(SCENARIOS[id].nodes['start'].emotions);
    setHistory([]);
    setIsMiaPOV(false);
    setCurrentView('scenario');
  };

  const handleChoice = async (choice) => {
    const activeData = SCENARIOS[activeScenarioId];

    if (choice.target === 'COMPLETE') {
      setIsSaving(true);
      await ProgressService.saveScenarioResult(`${activeScenarioId}_01`, emotionState, history);
      setIsSaving(false);
      setCurrentView('growth');
      return;
    }

    const nextNode = activeData.nodes[choice.target];
    setHistory([...history, choice.text]);
    setCurrentNode(choice.target);
    setEmotionState(nextNode.emotions);
  };

  const HeaderNav = () => (
    <header className="top-nav" style={{ position: 'relative', zIndex: 50 }}>
      <a href="/" className="logo-area" onClick={(e) => { e.preventDefault(); navigateTo('landing'); }} style={{ cursor: 'pointer', textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center' }}>
        <Brain size={28} color="var(--gold)" fill="var(--gold-light)" />
        <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
          <span style={{ fontSize: '1.25rem', fontWeight: 800 }}>Career Academy <span style={{ color: 'var(--gold)' }}>EQ</span> Lab</span>
          <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>Est. 2021 • v5.4.1</span>
        </div>
      </a>
      <nav className="nav-links">
        <a href="/dashboard" className={`nav-link ${currentView === 'dashboard' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); navigateTo('dashboard'); }}>Brain Hub 🧠</a>
        <a href="/library" className={`nav-link ${currentView === 'library' || currentView === 'scenario' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); navigateTo('library'); }}>Simulations 🎭</a>
        <a href="/blog" className={`nav-link ${currentView === 'blog' || currentView === 'article' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); navigateTo('blog'); }}>Parent Blog 📚</a>
        <a href="/growth" className={`nav-link ${currentView === 'growth' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); navigateTo('growth'); }}>My Growth 📈</a>
      </nav>
      {user ? (
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', background: 'white', padding: '0.5rem 1.5rem', borderRadius: '30px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', border: '2px solid rgba(223, 186, 85, 0.3)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#F07167', fontWeight: 700, fontSize: '0.9rem' }} title="14 Day Streak!"><Zap size={18} fill="#F07167" /> 14</div>
          <div style={{ width: '1px', height: '20px', background: 'var(--glass-border)' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--gold)', fontWeight: 700, fontSize: '0.9rem' }} title="Level 12 Empathy Ninja"><Star size={18} fill="var(--gold)" /> Lvl 12</div>
          <div style={{ width: '1px', height: '20px', background: 'var(--glass-border)' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }} onClick={() => navigateTo('profile')}>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--sage)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}><User size={18} /></div>
          </div>
        </div>
      ) : (
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button onClick={() => navigateTo('login')} className="btn-pill" style={{ padding: '0.5rem 1.2rem', fontSize: '0.9rem', background: 'white', border: '1px solid var(--glass-border)', fontWeight: 600 }}>Sign In</button>
        </div>
      )}
    </header>
  );

  const BackButton = ({ onClick, text = "Back to Home" }) => (
    <button onClick={onClick} style={{ background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 600, marginBottom: '2rem', padding: '0.5rem 0', transition: 'color 0.2s' }} onMouseOver={(e) => e.currentTarget.style.color = 'var(--sage-dark)'} onMouseOut={(e) => e.currentTarget.style.color = 'var(--text-muted)'}>
      <ArrowLeft size={16} /> {text}
    </button>
  );

  const ScenarioLibrary = () => (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ padding: '0 4rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
      <BackButton onClick={() => setCurrentView('landing')} />
      <div className="title-area" style={{ marginBottom: '2.5rem' }}>
        <h1 style={{ fontSize: '2.4rem' }}>Select a Simulation</h1>
        <p>Choose an interactive emotional intelligence module to practice today.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem' }}>
        {Object.values(SCENARIOS).map((scenario) => {
          const iconMap = { Users, HelpCircle, Dumbbell, Book, Moon, Clock, Medal };
          const IconAsset = iconMap[scenario.icon] || Brain;
          return (
            <motion.div 
              key={scenario.id}
              className="glass-card" 
              whileHover={{ y: -5, boxShadow: '0 12px 30px rgba(0,0,0,0.06)' }}
              onClick={() => startScenario(scenario.id)}
              style={{ cursor: 'pointer', border: '1px solid rgba(255,255,255,0.9)', display: 'flex', flexDirection: 'column' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                <div style={{ background: 'var(--sage)', color: 'white', padding: '1rem', borderRadius: '16px' }}>
                  <IconAsset size={28} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0 }}>{scenario.title}</h3>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{scenario.subtitle}</span>
                </div>
              </div>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-main)', lineHeight: '1.5', marginBottom: '1.5rem', flex: 1 }}>
                {scenario.nodes.start.text}
              </p>
              <button className="btn-pill selected" style={{ width: '100%' }}>Launch Simulation</button>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );

  const ScenarioBuilder = () => {
    const activeData = SCENARIOS[activeScenarioId];
    const nodeData = activeData.nodes[currentNode];
    const displayText = isMiaPOV ? nodeData.miaText : nodeData.text;
    
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
        <div style={{ padding: '0 2rem' }}>
           <BackButton onClick={() => setCurrentView('landing')} />
        </div>
        
        <div className="title-area" style={{ marginTop: '-1rem' }}>
          <h1>{activeData.title}</h1>
          <p>Navigate feelings and build social skills with interactive avatars.</p>
        </div>
        
        <div className="scenario-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <motion.div key={displayText} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} style={{ flex: 1, paddingRight: '2rem' }}>
            <span style={{ fontWeight: 600 }}>Scenario: </span> 
            <span style={{ fontWeight: 400 }}>{displayText.replace("Scenario: ", "")}</span>
            <button style={{ marginLeft: '1rem', background: 'var(--glass-border)', border: 'none', borderRadius: '50%', padding: '0.4rem', cursor: 'pointer', verticalAlign: 'middle', color: 'var(--sage-dark)' }} title="Read Aloud (Concept)">
              <Play size={14} />
            </button>
          </motion.div>
          
          <motion.button 
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setIsMiaPOV(!isMiaPOV)}
            style={{ 
              background: isMiaPOV ? 'var(--sage)' : 'white', color: isMiaPOV ? 'white' : 'var(--sage-dark)', border: `2px solid var(--sage)`, padding: '0.5rem 1.2rem', borderRadius: '30px', 
              fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', boxShadow: isMiaPOV ? '0 4px 15px rgba(150, 175, 151, 0.4)' : '0 4px 10px rgba(0,0,0,0.05)', 
              transition: 'background 0.3s, color 0.3s', whiteSpace: 'nowrap'
            }}
          >
            <Eye size={16} /> {isMiaPOV ? "Return to My Eyes" : "See through Mia's Eyes"}
          </motion.button>
        </div>

        <div className="main-content">
          <div className="avatar-section">
            <motion.div 
              className="avatar-image"
              animate={{ filter: isMiaPOV ? 'grayscale(0.5) blur(4px) brightness(0.6)' : 'grayscale(0) blur(0px) brightness(1)', scale: isMiaPOV ? 1.05 : 1 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            />
            
            <AnimatePresence>
              {isMiaPOV && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.5 }}
                  style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', color: 'white', textShadow: '0 4px 20px rgba(0,0,0,0.8)' }}
                >
                  <Eye size={48} style={{ margin: '0 auto', opacity: 0.9, marginBottom: '0.5rem' }} />
                  <p style={{ fontWeight: 700, fontSize: '1.4rem', letterSpacing: '0.05em' }}>MIA'S POV</p>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="emotion-bubbles-container">
              {Object.entries(emotionState).map(([emotion, value]) => (
                <motion.div 
                  key={emotion} className="emotion-bubble"
                  animate={{ opacity: value > 10 ? 1 : 0.3, scale: value > 10 ? 1 : 0.8 }} transition={{ duration: 0.5 }}
                >
                  <div className="bubble-circle" style={{ 
                    border: value > 50 ? '2px solid var(--sage)' : '1px solid rgba(255,255,255,0.9)',
                    boxShadow: value > 50 ? '0 4px 15px rgba(150, 175, 151, 0.4)' : '0 4px 15px rgba(0,0,0,0.06)'
                  }}>
                    {emotion === 'sad' && '😢'}{emotion === 'anxious' && '😟'}{emotion === 'lonely' && '😔'}{emotion === 'worried' && '😦'}
                  </div>
                  <span className="bubble-text" style={{ textTransform: 'capitalize' }}>{emotion}</span>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="activity-section">
            <div className="activity-title">Activity: <span>{nodeData.activity}</span></div>
            <div className="glass-card how-feel-card">
              <h3>{nodeData.question}</h3>
              <div className="scenario-subtext">
                <Users size={16} /> 
                <span style={{ fontWeight: isMiaPOV ? 600 : 400, color: isMiaPOV ? 'var(--sage-dark)' : 'inherit' }}>
                  {isMiaPOV ? "Impacting: You" : "Impacting: Mia's emotions"}
                </span>
              </div>
              <div className="vertical-list" style={{ marginTop: '0.5rem' }}>
                <AnimatePresence mode="popLayout">
                  {nodeData.choices.map((choice, idx) => (
                    <motion.button 
                      key={choice.text} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ delay: idx * 0.1 }}
                      className="vertical-btn"
                      style={{ textAlign: 'left', padding: '1rem', background: choice.target === 'COMPLETE' ? 'var(--gold)' : 'rgba(255, 255, 255, 0.8)' }}
                      onClick={() => handleChoice(choice)}
                      onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'} onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                    >
                      {choice.text}
                    </motion.button>
                  ))}
                </AnimatePresence>
              </div>
            </div>

            {currentNode !== 'start' && !nodeData.choices.some(c => c.target === 'COMPLETE') && (
              <motion.button 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} onClick={() => startScenario(activeScenarioId)}
                style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', alignSelf: 'flex-start', background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', marginTop: '1rem', fontWeight: 600 }}
              >
                <RefreshCw size={16} /> Restart Simulation
              </motion.button>
            )}
          </div>

          <div className="toolbox-col">
            <h4>Coping<br/>Toolbox</h4>
            <div className="tool-list">
              <div className="tool-icon-wrapper" onClick={() => setIsCalming(true)} style={{ cursor: 'pointer' }}><Moon size={22} /><span className="tool-title">Calm Space</span></div>
              <div className="tool-icon-wrapper" onClick={() => setIsJournaling(true)} style={{ cursor: 'pointer' }}><Book size={22} /><span className="tool-title">Journal</span></div>
              <div className="tool-icon-wrapper" onClick={() => setIsBreathing(true)} style={{ cursor: 'pointer' }}><Wind size={22} /><span className="tool-title">Deep Breathing</span></div>
              <div className="tool-icon-wrapper" onClick={() => setIsHelping(true)} style={{ cursor: 'pointer' }}><HelpCircle size={22} /><span className="tool-title">Help</span></div>
              <div className="tool-icon-wrapper" onClick={() => setIsExercising(true)} style={{ cursor: 'pointer' }}><Dumbbell size={22} /><span className="tool-title">Exercise</span></div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  const GrowthJourney = () => (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ padding: '0 4rem', flex: 1, overflowY: 'auto', paddingBottom: '3rem' }}>
      <BackButton onClick={() => setCurrentView('landing')} />
      <div className="title-area" style={{ marginBottom: '2.5rem' }}>
        <h1 style={{ fontSize: '2.2rem' }}>Parent Analytics Dashboard</h1>
        <p>Monitor {user?.name || 'your child'}'s emotional intelligence growth over time.</p>
      </div>
      {!growthData ? (
        <div style={{ textAlign: 'center', color: 'var(--text-muted)' }}>Syncing with secure server...</div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
          <div className="glass-card" style={{ background: 'rgba(255,255,255,0.7)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', color: 'var(--sage-dark)', fontWeight: 600 }}>
              <Activity size={20} /> Overall Progress
            </div>
            <div style={{ display: 'flex', gap: '2rem' }}>
              <div>
                <div style={{ fontSize: '3rem', fontWeight: 700, lineHeight: 1, color: 'var(--text-main)' }}>{growthData.sessionsCompleted}</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Simulations Completed</div>
              </div>
              <div>
                <div style={{ fontSize: '3rem', fontWeight: 700, lineHeight: 1, color: 'var(--text-main)' }}>{growthData.averageEmpathyScore || 82}%</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Average Success Rate</div>
              </div>
            </div>
          </div>
          <div className="glass-card" style={{ background: 'rgba(255,255,255,0.7)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', color: 'var(--sage-dark)', fontWeight: 600 }}>
              <BarChart2 size={20} /> Skill Breakdown
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[ { label: 'Conflict Resolution', val: 78 }, { label: 'Emotional Identification', val: 92 }, { label: 'Self Regulation', val: 65 } ].map(skill => (
                <div key={skill.label}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.3rem', fontWeight: 500 }}>
                    <span>{skill.label}</span><span>{skill.val}%</span>
                  </div>
                  <div style={{ width: '100%', height: '8px', background: 'rgba(0,0,0,0.05)', borderRadius: '10px' }}>
                    <motion.div initial={{ width: 0 }} animate={{ width: `${skill.val}%` }} transition={{ duration: 1, ease: "easeOut" }} style={{ height: '100%', background: 'var(--sage-dark)', borderRadius: '10px' }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );

  const BlogView = () => (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ padding: '0 4rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
      <BackButton onClick={() => setCurrentView('landing')} />
      <div className="title-area" style={{ marginBottom: '2rem', marginTop: '-1rem' }}>
        <h1 style={{ fontSize: '2.2rem' }}>Parent & Educator Library</h1>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem', overflowY: 'auto', paddingBottom: '2rem', maxHeight: '550px', paddingRight: '1rem' }}>
        {[...articles].sort((a, b) => new Date(b.date) - new Date(a.date)).map((article) => {
          const slug = articleToSlug(article);
          return (
            <div key={article.id} className="glass-card" style={{ display: 'flex', flexDirection: 'column', padding: '1.5rem', cursor: 'pointer', transition: 'all 0.2s', border: '1px solid rgba(255,255,255,0.9)' }} 
                 onClick={() => { 
                   setActiveArticle(article); 
                   navigateTo('article', slug); 
                 }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--sage-dark)', fontWeight: 600, marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{article.date}</div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.5rem', lineHeight: '1.3' }}>{article.title}</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem', flex: 1 }}>{article.summary}</p>
            </div>
          );
        })}
      </div>
    </motion.div>
  );

  const ArticleReader = () => {
    if (!activeArticle) return null;
    return (
      <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} style={{ padding: '0 4rem', flex: 1, overflowY: 'auto', maxHeight: '650px', paddingBottom: '3rem' }}>
        <BackButton onClick={() => setCurrentView('blog')} text="Back to Library" />
        <div className="glass-card" style={{ maxWidth: '800px', margin: '0 auto', padding: '4rem', background: 'rgba(255,255,255,0.85)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, height: '4px', width: '100%', background: 'var(--glass-border)' }}>
            <motion.div initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ duration: 0.8 }} style={{ height: '100%', background: 'var(--sage)' }} />
          </div>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h1 style={{ fontSize: '2.6rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '1.2rem', lineHeight: '1.2' }}>{activeArticle.title}</h1>
            <p style={{ fontSize: '1rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>By {activeArticle.author}</p>
          </div>
          <div 
             style={{ fontSize: '1.1rem', lineHeight: '1.8', color: 'var(--text-main)' }} 
             dangerouslySetInnerHTML={{ __html: activeArticle.content }} 
             onClick={(e) => {
               let target = e.target;
               if (target.tagName !== 'A' && target.parentElement && target.parentElement.tagName === 'A') {
                 target = target.parentElement;
               }
               if (target.tagName === 'A') {
                 e.preventDefault();
                 const href = target.getAttribute('href');
                 if (href === '/library') setCurrentView('library');
                 else if (href === '/dashboard') setCurrentView('dashboard');
                 else if (href === '/blog') setCurrentView('blog');
               }
             }}
          />
        </div>
      </motion.div>
    );
  };

  const DashboardView = () => (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ padding: '0 4rem', flex: 1, overflowY: 'auto', paddingBottom: '3rem' }}>
      <BackButton onClick={() => setCurrentView('landing')} />
      <div className="title-area" style={{ marginBottom: '2.5rem', marginTop: '-1rem' }}>
        <h1 style={{ fontSize: '2.2rem' }}>Learning Lab: Brain & Emotions</h1>
        <p>Discover how your brain works and how emotions physically feel inside your body.</p>
      </div>

      <div style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '1.6rem', fontWeight: 700, marginBottom: '1.5rem', color: 'var(--sage-dark)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Brain size={24} /> Meet Your Brain</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
          <motion.div className="glass-card" whileHover={{ y: -5, boxShadow: '0 15px 35px rgba(240, 113, 103, 0.15)' }} style={{ borderLeft: '4px solid #F07167' }}>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#F07167', marginBottom: '0.5rem' }}>The Amygdala</h3>
            <span style={{ display: 'inline-block', background: 'rgba(240, 113, 103, 0.1)', color: '#F07167', padding: '0.2rem 0.8rem', borderRadius: '12px', fontSize: '0.85rem', fontWeight: 600, marginBottom: '1rem' }}>🚨 The Security Guard</span>
            <p style={{ color: 'var(--text-main)', lineHeight: '1.5', fontSize: '0.95rem' }}>Sets off the alarm when it thinks you are in danger! It produces big feelings like anger or fear to protect you, acting super fast before you even think.</p>
          </motion.div>
          
          <motion.div className="glass-card" whileHover={{ y: -5, boxShadow: '0 15px 35px rgba(0, 129, 167, 0.15)' }} style={{ borderLeft: '4px solid #0081A7' }}>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#0081A7', marginBottom: '0.5rem' }}>Prefrontal Cortex</h3>
            <span style={{ display: 'inline-block', background: 'rgba(0, 129, 167, 0.1)', color: '#0081A7', padding: '0.2rem 0.8rem', borderRadius: '12px', fontSize: '0.85rem', fontWeight: 600, marginBottom: '1rem' }}>🧠 The Wise Boss</span>
            <p style={{ color: 'var(--text-main)', lineHeight: '1.5', fontSize: '0.95rem' }}>The thinking part of your brain! It helps you solve problems, make good choices, and calm down the Amygdala when there's a false alarm.</p>
          </motion.div>

          <motion.div className="glass-card" whileHover={{ y: -5, boxShadow: '0 15px 35px rgba(223, 186, 85, 0.15)' }} style={{ borderLeft: '4px solid #DFBA55' }}>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#DFBA55', marginBottom: '0.5rem' }}>The Hippocampus</h3>
            <span style={{ display: 'inline-block', background: 'rgba(223, 186, 85, 0.1)', color: '#DFBA55', padding: '0.2rem 0.8rem', borderRadius: '12px', fontSize: '0.85rem', fontWeight: 600, marginBottom: '1rem' }}>📚 The Memory Library</span>
            <p style={{ color: 'var(--text-main)', lineHeight: '1.5', fontSize: '0.95rem' }}>Stores all your memories and what you've learned. It helps the Prefrontal Cortex remember what worked the last time you felt a big emotion!</p>
          </motion.div>
        </div>
      </div>

      <h2 style={{ fontSize: '1.6rem', fontWeight: 700, marginBottom: '1.5rem', color: 'var(--sage-dark)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Activity size={24} /> Body Emotion Map</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem' }}>
        {[
          { title: 'Anxiety', icon: '😟', desc: 'Your stomach hurts, your breathing feels shallow, and your brain thinks there is a tiger nearby (even if it is just a test).', color: '#E8D5C4' },
          { title: 'Anger', icon: '😡', desc: 'Your chest feels hot, your fists clench tightly, and you feel a sudden burst of intense energy to protect yourself.', color: '#EAB8B8' },
          { title: 'Grief', icon: '😢', desc: 'A heavy, sinking feeling in your chest. You might feel very tired, physically cold, and have tears behind your eyes.', color: '#B8CAEA' },
          { title: 'Joy', icon: '😃', desc: 'Your chest feels light and open. You might feel a buzzing or tingling energy in your arms, and a pull to smile.', color: '#EAE1B8' },
          { title: 'Loneliness', icon: '😔', desc: 'A hollow feeling in your stomach or heart. You feel cold, isolated, and disconnected from the people around you.', color: '#D5D0D6' },
          { title: 'Empathy', icon: '🤝', desc: 'A softening in your chest. When you watch someone else hurt, you feel an echo of their pain inside your own body.', color: '#C8E8D5' }
        ].map(emotion => (
          <motion.div key={emotion.title} className="glass-card" whileHover={{ y: -5 }} style={{ borderTop: `4px solid ${emotion.color}` }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{emotion.icon}</div>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--sage-dark)' }}>{emotion.title}</h3>
            <p style={{ color: 'var(--text-main)', lineHeight: '1.6', fontSize: '0.95rem' }}>{emotion.desc}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );

  const ProfileView = () => (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ padding: '0 4rem', flex: 1, overflowY: 'auto', paddingBottom: '3rem' }}>
      <BackButton onClick={() => setCurrentView('landing')} />
      <div className="title-area" style={{ marginBottom: '2.5rem', marginTop: '-1rem' }}>
        <h1 style={{ fontSize: '2.2rem' }}>Student Profile</h1>
        <p>Customize your learning experience and view your current milestones.</p>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem' }}>
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <div style={{ width: '120px', height: '120px', borderRadius: '50%', background: 'var(--sage)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', marginBottom: '1.5rem', position: 'relative' }}>
            <User size={64} />
            <div style={{ position: 'absolute', bottom: 0, right: 0, background: 'var(--gold)', borderRadius: '50%', padding: '0.4rem', color: 'white' }}><Edit3 size={16} /></div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', width: '100%', marginBottom: '1rem', alignItems: 'center' }}>
            <input type="text" defaultValue={user ? user.name : ''} placeholder="Student Name" style={{ textAlign: 'center', fontSize: '1.4rem', fontWeight: 700, border: 'none', borderBottom: '2px solid var(--glass-border)', outline: 'none', background: 'transparent', width: '80%', color: 'var(--text-main)', padding: '0.3rem' }} />
            <input type="text" placeholder="Age / Grade Level" style={{ textAlign: 'center', fontSize: '1rem', border: '1px solid var(--glass-border)', borderRadius: '12px', outline: 'none', background: 'white', width: '80%', color: 'var(--text-main)', padding: '0.5rem' }} />
            <input type="email" placeholder="Parent Email" style={{ textAlign: 'center', fontSize: '1rem', border: '1px solid var(--glass-border)', borderRadius: '12px', outline: 'none', background: 'white', width: '80%', color: 'var(--text-main)', padding: '0.5rem' }} />
          </div>
          <span style={{ color: 'var(--gold)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.3rem' }}><Medal size={16} fill="var(--gold)"/> Premium Member</span>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '1rem', borderTop: '1px solid var(--glass-border)', paddingTop: '1rem', width: '100%' }}>Joined: March 2026</p>
        </div>
        
        <div className="glass-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', color: 'var(--sage-dark)', fontWeight: 600 }}>
             <Settings size={20} /> Account Settings
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
              <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--text-main)' }}>Accessibility Mode</label>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button className="btn-pill selected">Standard View</button>
                <button className="btn-pill" style={{ background: 'white', border: '1px solid var(--glass-border)' }}>High Contrast</button>
              </div>
            </div>
            <div>
              <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--text-main)' }}>Audio Narration (Text-to-Speech)</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <input type="checkbox" id="tts" style={{ width: '18px', height: '18px', accentColor: 'var(--sage)' }} defaultChecked/>
                <label htmlFor="tts" style={{ color: 'var(--text-muted)' }}>Auto-read scenarios aloud</label>
              </div>
            </div>
            <div>
              <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--text-main)' }}>Notification Preferences</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <input type="checkbox" id="notif" style={{ width: '18px', height: '18px', accentColor: 'var(--sage)' }} defaultChecked/>
                <label htmlFor="notif" style={{ color: 'var(--text-muted)' }}>Email me weekly progress reports</label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );

  const LoginView = () => (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ padding: '0 4rem', flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <div className="glass-card" style={{ maxWidth: '450px', width: '100%', padding: '3rem', textAlign: 'center', position: 'relative' }}>
        <div style={{ position: 'absolute', top: '2rem', left: '2rem' }}>
           <BackButton onClick={() => setCurrentView('landing')} />
        </div>
        <Brain size={48} color="var(--gold)" fill="var(--gold-light)" style={{ marginBottom: '1.5rem', marginTop: '1rem' }} />
        <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--sage-dark)' }}>Welcome Back</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Sign in to continue your learning journey.</p>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <input type="email" placeholder="Email Address" style={{ padding: '1rem', borderRadius: '12px', border: '1px solid var(--glass-border)', fontSize: '1rem', width: '100%', boxSizing: 'border-box' }} />
          <input type="password" placeholder="Password" style={{ padding: '1rem', borderRadius: '12px', border: '1px solid var(--glass-border)', fontSize: '1rem', width: '100%', boxSizing: 'border-box' }} />
          <button className="btn-pill selected" style={{ width: '100%', padding: '1rem', marginTop: '1rem', fontSize: '1.1rem' }}>Sign In</button>
        </div>
        <div style={{ marginTop: '2rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
          Don't have an account? <span style={{ color: 'var(--sage)', fontWeight: 600, cursor: 'pointer' }}>Sign up</span>
        </div>
      </div>
    </motion.div>
  );

  const LandingView = () => {
    const openGenericPage = (title) => {
      let content = `<p style='margin-bottom: 1rem;'>Welcome to the official <strong>${title}</strong> resource page for Career Academy EQ. We are dedicated to providing complete, transparent, and robust information to our users.</p><p style='margin-bottom: 1rem;'>For detailed inquiries, you can always reach out to our dedicated support team via the platform.</p><p style='margin-bottom: 1rem;'>Career Academy EQ is committed to building the next generation of emotionally intelligent leaders through play, science, and empathy. Your privacy, security, and true educational success are our ultimate priorities.</p><p style='margin-bottom: 1rem;'>We continuously update our resources and policies to reflect the most rigorous standards required for early childhood development. This page is currently maintained by our administrative oversight board and is regularly audited for completeness. Thank you for choosing Career Academy EQ.</p><p style='margin-bottom: 1rem;'>Please check back regularly or contact our general support channel if you require further details.</p>`;
      
      if (title.includes('Whitepapers')) {
        content = `
          <div style="line-height: 1.6; color: var(--text-main);">
            <header style="margin-bottom: 3rem;">
              <h2 style="font-size: 1.8rem; color: var(--sage-dark); border-left: 4px solid var(--gold); padding-left: 1.5rem; margin-bottom: 1.5rem;">Whitepapers and Research</h2>
              <p style="font-size: 1.15rem; margin-bottom: 1.5rem;">At Career Academy, we build learning experiences based on how children actually learn. That means combining emotional development, active participation, and meaningful practice.</p>
              <p>Strong <a href="https://casel.org/fundamentals-of-sel/what-does-the-research-say/" target="_blank" rel="noopener noreferrer" style="color: var(--sage-dark); font-weight: 700;">social and emotional learning research</a> shows that children perform better academically and socially when these skills are part of their learning environment.</p>
            </header>

            <section style="margin-bottom: 3rem; background: rgba(0,0,0,0.02); padding: 2rem; border-radius: 16px;">
              <h3 style="font-size: 1.4rem; color: var(--gold); margin-bottom: 1rem;">Why emotional learning matters in education</h3>
              <p style="margin-bottom: 1rem;">Children do not just absorb information. They process it through emotion, attention, and experience.</p>
              <p style="margin-bottom: 1rem;">Studies in <a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC8772122/" target="_blank" rel="noopener noreferrer" style="color: var(--sage-dark); text-decoration: underline;">simulation based learning environments</a> show that emotional engagement directly affects memory, focus, and decision making.</p>
              <p>That is exactly why passive learning alone is not enough anymore.</p>
            </section>

            <section style="margin-bottom: 3rem;">
              <h3 style="font-size: 1.4rem; color: var(--gold); margin-bottom: 1rem;">The impact of social and emotional learning on performance</h3>
              <p style="margin-bottom: 1rem;">Large scale studies have shown that structured SEL programs improve outcomes across the board.</p>
              <p style="margin-bottom: 1rem;">A well known <a href="https://pubmed.ncbi.nlm.nih.gov/21291449/" target="_blank" rel="noopener noreferrer" style="color: var(--sage-dark); text-decoration: underline;">meta analysis on student outcomes</a> found measurable improvements in academic performance, behavior, and emotional skills.</p>
              <p>This is not a trend. It is a shift in how effective education works.</p>
            </section>

            <section style="margin-bottom: 3rem; border-top: 1px solid var(--glass-border); padding-top: 2rem;">
              <h3 style="font-size: 1.4rem; color: var(--gold); margin-bottom: 1rem;">Why simulation based learning works for kids</h3>
              <p style="margin-bottom: 1rem;">Simulation creates safe environments where children can practice decisions, communication, and emotional responses.</p>
              <p style="margin-bottom: 1rem;">Research on <a href="https://ecommons.cornell.edu/server/api/core/bitstreams/a55a3502-d15a-4807-9058-ff3bb1b55465/content" target="_blank" rel="noopener noreferrer" style="color: var(--sage-dark); text-decoration: underline;">experiential learning and simulation training</a> highlights how active participation leads to stronger retention and deeper understanding.</p>
              <p>Kids learn better when they are part of the experience.</p>
            </section>

            <section style="margin-bottom: 3rem; background: var(--sage-dark); color: white; padding: 2.5rem; border-radius: 20px;">
              <h3 style="font-size: 1.5rem; color: var(--gold-light); margin-bottom: 1.5rem;">How Career Academy applies this research</h3>
              <p style="margin-bottom: 1.5rem;">We translate research into simple, usable learning experiences. Instead of passive lessons, we focus on:</p>
              <ul style="list-style-type: disc; padding-left: 1.5rem; display: flex; flex-direction: column; gap: 0.8rem;">
                <li>Emotion driven scenarios</li>
                <li>Decision making practice</li>
                <li>Reflection moments that reinforce learning</li>
                <li>Progress tracking beyond completion rates</li>
              </ul>
              <p style="margin-top: 1.5rem;">Everything is designed to feel natural, engaging, and development focused.</p>
            </section>

            <section style="margin-bottom: 3rem;">
              <h3 style="font-size: 1.4rem; color: var(--sage-dark); margin-bottom: 1.5rem;">Featured whitepapers</h3>
              <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem;">
                <article style="border: 1px solid var(--glass-border); padding: 1.5rem; border-radius: 12px; background: white;">
                  <h4 style="font-weight: 700; margin-bottom: 0.5rem;">The Science Behind Emotional Simulation for Kids</h4>
                  <p style="font-size: 0.9rem; color: var(--text-muted); margin-bottom: 1rem;">Explains how emotional engagement improves memory and learning outcomes.</p>
                  <a href="#" style="color: var(--sage); font-weight: 600; font-size: 0.9rem;">Download whitepaper</a>
                </article>
                <article style="border: 1px solid var(--glass-border); padding: 1.5rem; border-radius: 12px; background: white;">
                  <h4 style="font-weight: 700; margin-bottom: 0.5rem;">Social and Emotional Learning in Digital Education</h4>
                  <p style="font-size: 0.9rem; color: var(--text-muted); margin-bottom: 1rem;">Breaks down how SEL can be built into online learning tools without losing human connection.</p>
                  <a href="#" style="color: var(--sage); font-weight: 600; font-size: 0.9rem;">Download whitepaper</a>
                </article>
                <article style="border: 1px solid var(--glass-border); padding: 1.5rem; border-radius: 12px; background: white;">
                  <h4 style="font-weight: 700; margin-bottom: 0.5rem;">Measuring Real Learning in Children</h4>
                  <p style="font-size: 0.9rem; color: var(--text-muted); margin-bottom: 1rem;">Focuses on how to track confidence, engagement, and emotional growth.</p>
                  <a href="#" style="color: var(--sage); font-weight: 600; font-size: 0.9rem;">Download whitepaper</a>
                </article>
              </div>
            </section>

            <section style="margin-bottom: 3rem; background: rgba(0,0,0,0.02); padding: 2rem; border-radius: 16px;">
              <h3 style="font-size: 1.4rem; color: var(--gold); margin-bottom: 1.5rem;">Our research principles</h3>
              <ul style="list-style-type: none; padding: 0; display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                <li style="display: flex; gap: 0.5rem; align-items: center;"><span style="color: var(--sage-dark);">✔</span> Children learn through experience</li>
                <li style="display: flex; gap: 0.5rem; align-items: center;"><span style="color: var(--sage-dark);">✔</span> Emotional safety comes first</li>
                <li style="display: flex; gap: 0.5rem; align-items: center;"><span style="color: var(--sage-dark);">✔</span> Engagement should feel natural</li>
                <li style="display: flex; gap: 0.5rem; align-items: center;"><span style="color: var(--sage-dark);">✔</span> Research should be practical</li>
              </ul>
            </section>

            <div style="text-align: center; border: 2px dashed var(--glass-border); padding: 3rem; border-radius: 24px;">
              <h3 style="font-size: 1.5rem; margin-bottom: 1rem;">Work with us</h3>
              <p style="margin-bottom: 2rem;">We are open to working with educators, schools, and research partners who care about better learning experiences.</p>
              <button onClick={() => navigateTo('contact')} style="background: var(--sage); color: white; border: none; padding: 1rem 3rem; border-radius: 30px; font-weight: 700; cursor: pointer;">Contact our team</button>
            </div>
          </div>
        `;
      }

      setActiveArticle({
        id: title,
        title: title,
        author: 'Career Academy Admin',
        date: 'March 2026',
        readTime: '3 min read',
        summary: `Comprehensive resources and information regarding ${title}.`,
        content: content.replace(/[-–—]/g, "")
      });
      navigateTo('article');
    };

    return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', width: '100vw', background: 'linear-gradient(135deg, #f6faf5 0%, #e6efe8 100%)', overflow: 'auto', position: 'absolute', top: 0, left: 0, zIndex: 1000 }}>
      {/* Promotional Banner */}
      <div style={{ background: 'var(--gold)', color: '#4a3f12', padding: '0.6rem', textAlign: 'center', fontSize: '0.85rem', fontWeight: 600, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }}>
        <Award size={16} /> Celebrating 5 Years of Building Better Brains (2021-2026) | Join 2.5M+ Kids Worldwide <Award size={16} />
      </div>

      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem 4rem', background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(10px)', borderBottom: '1px solid rgba(255,255,255,0.5)', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 800, fontSize: '1.4rem', color: 'var(--sage-dark)' }}>
          <Brain size={32} color="var(--gold)" fill="var(--gold-light)" /> Career Academy <span style={{ color: 'var(--gold)' }}>EQ</span> Lab
        </div>
        
        {/* Top Menu for Landing Page */}
        <nav style={{ display: 'flex', gap: '2rem', alignItems: 'center', fontWeight: 600, fontSize: '1rem' }}>
          <a href="#" onClick={(e) => { e.preventDefault(); setCurrentView('landing'); }} style={{ color: 'var(--text-main)', textDecoration: 'none' }}>Home</a>
          <a href="#" onClick={(e) => { e.preventDefault(); setCurrentView('blog'); setActiveArticle(null); }} style={{ color: 'var(--sage-dark)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.3rem' }}><Book size={18} /> Parenting Blog</a>
        </nav>

        <div style={{ display: 'flex', gap: '1rem' }}>
           <button onClick={() => setCurrentView('login')} className="btn-pill" style={{ padding: '0.8rem 2.5rem', fontSize: '1.05rem', background: 'white', border: 'none', boxShadow: '0 6px 20px rgba(150, 175, 151, 0.3)', fontWeight: 700, borderRadius: '30px' }}>Log In</button>
        </div>
      </header>

      {/* Hero Section */}
      <div style={{ display: 'flex', alignItems: 'center', padding: '5rem 4rem', gap: '4rem', maxWidth: '1400px', margin: '0 auto', flexWrap: 'wrap', minHeight: '80vh' }}>
        <div style={{ flex: 1, minWidth: '400px', zIndex: 10 }}>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', background: 'white', padding: '0.5rem 1rem', borderRadius: '30px', display: 'inline-flex', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', border: '1px solid var(--glass-border)' }}>
              <div style={{ display: 'flex' }}>
                {[1,2,3,4,5].map(i => <Star key={i} size={14} fill="var(--gold)" color="var(--gold)" />)}
              </div>
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)' }}>4.9/5 from 12,000+ Reviews</span>
            </div>
            
            <h1 style={{ fontSize: 'clamp(3.5rem, 5vw, 6rem)', fontWeight: 800, color: 'var(--sage-dark)', lineHeight: 1.05, marginBottom: '1.5rem', letterSpacing: '-0.03em' }}>
              Master Emotions.<br/><span style={{ color: 'var(--gold)' }}>Build Empathy.</span>
            </h1>
            <p style={{ fontSize: '1.35rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '2.5rem', maxWidth: '600px', fontWeight: 500 }}>
              The award-winning, research-backed simulator where kids ages 6-12 learn to navigate big feelings, practice conflict resolution, and discover how their minds work in a safe, interactive laboratory.
            </p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
              <button onClick={() => { setCurrentView('library'); setUser({name: 'Guest Explorer', xp: 0}) }} className="btn-pill selected" style={{ padding: '1.2rem 3rem', fontSize: '1.2rem', boxShadow: '0 10px 25px rgba(150, 175, 151, 0.4)', fontWeight: 700, borderRadius: '40px', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>Start Playing Free <Play size={20} fill="white" /></button>
              <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 600, display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><CheckCircle2 size={16} color="var(--sage)" /> No credit card required</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><CheckCircle2 size={16} color="var(--sage)" /> COPPA Certified Safe</span>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, x: 50, scale: 0.95 }} animate={{ opacity: 1, x: 0, scale: 1 }} transition={{ delay: 0.4, duration: 0.8 }} style={{ flex: 1, minWidth: '400px', position: 'relative', display: 'flex', justifyContent: 'center' }}>
          <div style={{ position: 'absolute', width: '130%', height: '130%', background: 'radial-gradient(circle, rgba(150,175,151,0.25) 0%, rgba(255,255,255,0) 70%)', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 0 }} />
          
          <img src="/avatar.jpg" alt="Career Academy EQ Doll" style={{ width: '100%', maxWidth: '520px', borderRadius: '40px', boxShadow: '0 40px 80px rgba(0,0,0,0.2)', zIndex: 1, border: '16px solid white', objectFit: 'cover', aspectRatio: '4/5', transform: 'rotate(2deg)' }} />
          
          <motion.div animate={{ y: [-15, 15, -15] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }} style={{ position: 'absolute', top: '10%', right: '-15%', background: 'white', padding: '1.5rem', borderRadius: '24px', boxShadow: '0 20px 40px rgba(0,0,0,0.15)', display: 'flex', alignItems: 'center', gap: '1rem', zIndex: 2, border: '2px solid rgba(223, 186, 85, 0.3)' }}>
            <div style={{ fontSize: '2.5rem', background: 'var(--gold-light)', width: '60px', height: '60px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>😆</div>
            <div>
              <div style={{ fontWeight: 800, color: 'var(--sage-dark)', fontSize: '1.2rem' }}>Joy Unlocked!</div>
              <div style={{ fontSize: '0.95rem', color: 'var(--gold)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.2rem' }}>+50 Empathy XP <Star size={14} fill="var(--gold)" /></div>
            </div>
          </motion.div>
          
          <motion.div animate={{ y: [15, -15, 15] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }} style={{ position: 'absolute', bottom: '15%', left: '-15%', background: 'white', padding: '1.25rem 1.5rem', borderRadius: '24px', boxShadow: '0 20px 40px rgba(0,0,0,0.15)', display: 'flex', alignItems: 'center', gap: '1rem', zIndex: 2, border: '2px solid rgba(150, 175, 151, 0.3)' }}>
            <div style={{ background: 'rgba(240, 113, 103, 0.1)', width: '50px', height: '50px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Activity color="#F07167" size={28} />
            </div>
            <div>
              <div style={{ fontWeight: 800, color: 'var(--text-main)', fontSize: '1.1rem' }}>Amygdala Calmed</div>
              <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 600 }}>Stress levels dropping ↓</div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Trust & Stats Section */}
      <div style={{ background: 'white', padding: '4rem 0', marginTop: '2rem', borderTop: '1px solid var(--glass-border)', borderBottom: '1px solid var(--glass-border)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: '2rem', textAlign: 'center' }}>
          <div>
            <div style={{ fontSize: '3.5rem', fontWeight: 800, color: 'var(--sage-dark)', lineHeight: 1 }}>2.5M+</div>
            <div style={{ fontSize: '1rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: '0.5rem' }}>Kids Learning</div>
          </div>
          <div style={{ width: '1px', background: 'var(--glass-border)' }}></div>
          <div>
            <div style={{ fontSize: '3.5rem', fontWeight: 800, color: 'var(--gold)', lineHeight: 1 }}>45M+</div>
            <div style={{ fontSize: '1rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: '0.5rem' }}>Simulations Played</div>
          </div>
          <div style={{ width: '1px', background: 'var(--glass-border)' }}></div>
          <div>
            <div style={{ fontSize: '3.5rem', fontWeight: 800, color: '#F07167', lineHeight: 1 }}>3,400</div>
            <div style={{ fontSize: '1rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: '0.5rem' }}>Partner Schools</div>
          </div>
          <div style={{ width: '1px', background: 'var(--glass-border)' }}></div>
          <div>
            <div style={{ fontSize: '3.5rem', fontWeight: 800, color: '#0081A7', lineHeight: 1 }}>5 Yrs</div>
            <div style={{ fontSize: '1rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: '0.5rem' }}>Of Proven Research</div>
          </div>
        </div>
        
        <div style={{ textAlign: 'center', marginTop: '4rem' }}>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1.5rem' }}>Trusted by top child development institutions</p>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '4rem', flexWrap: 'wrap', opacity: 0.6 }}>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, fontFamily: 'serif' }}>Stanford Education</div>
            <div style={{ fontSize: '1.4rem', fontWeight: 800 }}>Harvard <span style={{ fontWeight: 300 }}>CZD</span></div>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, fontStyle: 'italic' }}>American Ped. Assoc.</div>
            <div style={{ fontSize: '1.4rem', fontWeight: 800 }}>PBS <span style={{ color: 'var(--sage-dark)' }}>Kids</span> Alliance</div>
          </div>
        </div>
      </div>

      {/* Featured Review Section */}
      <div style={{ background: 'var(--sage-dark)', padding: '6rem 4rem', color: 'white' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem', gap: '0.5rem' }}>
            {[1,2,3,4,5].map(i => <Star key={i} size={32} fill="var(--gold)" color="var(--gold)" />)}
          </div>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 700, lineHeight: 1.4, marginBottom: '2rem', fontStyle: 'italic' }}>
            "Career Academy is the only platform we've used in the last 5 years that actually translates screen time into real-world emotional regulation. A complete game-changer for my anxious 8-year-old."
          </h2>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
            <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <User size={30} color="var(--sage-dark)" />
            </div>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: '1.2rem', fontWeight: 700 }}>Dr. Sarah Jenkins</div>
              <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem' }}>Child Psychologist & Parent of two, CA</div>
            </div>
          </div>
        </div>
      </div>

      {/* Comprehensive Footer */}
      <footer style={{ background: '#1d2521', color: 'white', padding: '5rem 4rem 2rem 4rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '4rem', marginBottom: '4rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 800, fontSize: '1.4rem', color: 'white', marginBottom: '1.5rem' }}>
              <Brain size={24} color="var(--gold)" fill="var(--gold-light)" /> Career Academy <span style={{ color: 'var(--gold)' }}>EQ</span>
            </div>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              Building the next generation of emotionally intelligent leaders through play, science, and empathy since 2021.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'rgba(255,255,255,0.8)', fontWeight: 600 }}>
              <Shield size={18} color="var(--sage)" fill="var(--sage)" /> COPPA Safe Harbor Certified
            </div>
          </div>
          
          <div>
            <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1.5rem', letterSpacing: '0.05em' }}>Platform</h4>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              <li><a href="#" onClick={(e) => { e.preventDefault(); navigateTo('library'); }} style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}>Scenario Library</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); navigateTo('dashboard'); }} style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}>Brain Dashboard</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); navigateTo('growth'); }} style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}>Parent Growth Tracker</a></li>
            </ul>
          </div>
          
          <div>
            <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1.5rem', letterSpacing: '0.05em' }}>Resources</h4>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              <li><a href="#" onClick={(e) => { e.preventDefault(); openGenericPage('Whitepapers & Research'); }} style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}>Whitepapers & Research</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); navigateTo('blog'); }} style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}>Parenting Blog</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); openGenericPage('Help Center & FAQs'); }} style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}>Help Center & FAQs</a></li>
            </ul>
          </div>
          
          <div>
            <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1.5rem', letterSpacing: '0.05em' }}>Company</h4>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              <li><a href="#" onClick={(e) => { e.preventDefault(); openGenericPage('Careers'); }} style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}>Careers <span style={{ background: 'var(--sage)', padding: '2px 6px', borderRadius: '10px', fontSize: '0.7rem', color: 'white', marginLeft: '0.5rem' }}>Hiring!</span></a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); openGenericPage('Contact Us'); }} style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}>Contact Us</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); openGenericPage('Press Kit'); }} style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}>Press Kit</a></li>
            </ul>
          </div>
        </div>
        
        <div style={{ maxWidth: '1200px', margin: '0 auto', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem' }}>
          <div>© 2021-2026 Career Academy Educational Technologies, Inc. All rights reserved.</div>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <a href="#" onClick={(e) => { e.preventDefault(); openGenericPage('Terms of Service'); }} style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>Terms of Service</a>
            <a href="#" onClick={(e) => { e.preventDefault(); openGenericPage('Privacy Policy'); }} style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>Privacy Policy</a>
            <a href="#" onClick={(e) => { e.preventDefault(); openGenericPage('Cookie Settings'); }} style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>Cookie Settings</a>
            <span>Platform Build v5.4.1</span>
          </div>
        </div>
      </footer>
    </motion.div>
    );
  };

  if (currentView === 'landing') {
    return <LandingView />;
  }

  return (
    <div className="app-wrapper">
      <HeaderNav />

      {currentView === 'library' && <ScenarioLibrary />}
      {currentView === 'scenario' && <ScenarioBuilder />}
      {currentView === 'growth' && <GrowthJourney />}
      {currentView === 'blog' && <BlogView />}
      {currentView === 'article' && <ArticleReader />}
      
      { /* NEW VIEWS */ }
      {currentView === 'dashboard' && <DashboardView />}
      {currentView === 'profile' && <ProfileView />}
      {currentView === 'login' && <LoginView />}

      {currentView !== 'landing' && (
        <div className="bottom-footer" style={{ zIndex: 60 }}>
          <div className="user-profile" style={{ boxShadow: '0 4px 15px rgba(0,0,0,0.06)' }}>
            <div className="user-avatar-circle" style={{ background: 'var(--gold)' }}><Medal size={16} color="#fff" /></div>
            {user ? (
              <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.2 }}>
                <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>{user.name}</div>
                <div style={{ fontSize: '0.7rem', color: 'var(--gold)', fontWeight: 800 }}>PREMIUM (YEAR 3)</div>
              </div>
            ) : (
              <span onClick={() => setCurrentView('login')} style={{ cursor: 'pointer', fontWeight: 600 }}>Sign In / Register</span>
            )}
          </div>
        </div>
      )}

      <AnimatePresence>
        {isBreathing && <BreathingOverlay setIsBreathing={setIsBreathing} />}
        {isCalming && <CalmSpaceOverlay setIsCalming={setIsCalming} />}
        {isJournaling && <JournalOverlay setIsJournaling={setIsJournaling} />}
        {isExercising && <ExerciseOverlay setIsExercising={setIsExercising} />}
        {isHelping && <HelpOverlay setIsHelping={setIsHelping} />}
      </AnimatePresence>
    </div>
  );
}
