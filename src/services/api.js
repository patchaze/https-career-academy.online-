// This service mimics a real SaaS backend (like Supabase or Firebase).
// Currently it uses localStorage for immediate frictionless testing,
// but the async architecture allows for a seamless swap to real API endpoints.

export const AuthService = {
  login: async (email, password) => {
    // Simulate network latency
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Mock user
    const user = {
      id: 'usr_123',
      name: 'Patricia (Admin)',
      email: email,
      role: 'parent_premium',
      medals: 14
    };
    
    localStorage.setItem('eq_lab_user', JSON.stringify(user));
    return user;
  },

  getCurrentUser: async () => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const user = localStorage.getItem('eq_lab_user');
    if (user) return JSON.parse(user);
    
    // No default user, force login/guest state
    return null;
  },

  logout: async () => {
    localStorage.removeItem('eq_lab_user');
  }
};

export const ProgressService = {
  saveScenarioResult: async (scenarioId, emotions, choicesMade) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const history = JSON.parse(localStorage.getItem('eq_lab_history') || '[]');
    const newEntry = {
      id: Date.now().toString(),
      scenarioId,
      date: new Date().toISOString(),
      finalEmotions: emotions,
      choices: choicesMade
    };
    
    history.push(newEntry);
    localStorage.setItem('eq_lab_history', JSON.stringify(history));
    return newEntry;
  },

  getGrowthData: async () => {
    await new Promise(resolve => setTimeout(resolve, 600));
    const history = JSON.parse(localStorage.getItem('eq_lab_history') || '[]');
    
    // Aggregate analytics mimicking a real backend SQL query
    const totalSessions = history.length;
    let avgEmpathy = 0;
    
    if (totalSessions > 0) {
       avgEmpathy = history.reduce((acc, curr) => acc + (curr.finalEmotions.joy || 0), 0) / totalSessions;
    }

    return {
      sessionsCompleted: totalSessions,
      averageEmpathyScore: Math.round(avgEmpathy),
      history
    };
  }
};
