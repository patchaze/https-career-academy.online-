export const forumCategories = ['All Discussions', 'AI Research', 'Career Advice', 'Project Showcases', 'Bug Reports'];

export const forumThreads = [
  { 
    id: 1, 
    title: 'How are you guys optimizing Llama 3 for edge devices?', 
    author: 'QuantizedKing', 
    category: 'AI Research', 
    replies: 24, 
    votes: 156, 
    time: '2h ago',
    content: 'I have been trying to run it on a Raspberry Pi 5. The latency is okay but I am seeing some degradation in reasoning. Anyone tried 4-bit quantization?'
  },
  { 
    id: 2, 
    title: 'Just landed my first AI Engineer role! My roadmap inside.', 
    author: 'CareerShifter_01', 
    category: 'Career Advice', 
    replies: 89, 
    votes: 432, 
    time: '5h ago',
    content: 'It took me 8 months on Lumina but it finally happened. Here is exactly what I focused on to pass the technical interview.'
  },
  { 
    id: 3, 
    title: 'Showcase: My autonomous drone pathfinder using Lumina lessons.', 
    author: 'SkyHighTech', 
    category: 'Project Showcases', 
    replies: 12, 
    votes: 98, 
    time: '12h ago',
    content: 'Check out this video of the drone navigating my backyard using the neural net I built in Module 4.'
  },
  { 
    id: 4, 
    title: 'The ethics of synthetic data in 2026.', 
    author: 'EthicsFirst', 
    category: 'AI Research', 
    replies: 45, 
    votes: 211, 
    time: '1d ago',
    content: 'Are we hitting a ceiling because we are training on our own output? Let us discuss the model collapse theory.'
  },
  { 
    id: 5, 
    title: 'Anyone else struggling with the Backpropagation Quiz?', 
    author: 'MathHater', 
    category: 'Bug Reports', 
    replies: 6, 
    votes: -2, 
    time: '3d ago',
    content: 'I keep getting the matrix multiplication question wrong. Is the answer key broken?'
  }
];

export const threadComments = [
  { id: 101, threadId: 1, author: 'ComputeMax', content: 'Try using the GGUF format with Q4_K_M quantization. It is the sweet spot for Pi 5.', votes: 45 },
  { id: 102, threadId: 1, author: 'LuminaTutor', content: 'We are actually releasing a specific "Edge AI" module next week that covers this!', votes: 82 },
];
