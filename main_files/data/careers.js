export const CAREERS = {
  ai_ml_engineer: {
    name: 'AI / ML Engineer', shortName: 'AI / ML Engineer', icon: '◉', color: 'purple', description: 'Turn data into models that learn, predict, and improve.',
    skills: ['Python', 'NumPy', 'Pandas', 'Statistics', 'Data Visualization', 'Machine Learning', 'Scikit-learn', 'Deep Learning'],
    skillHours: { Python: 12, NumPy: 8, Pandas: 10, Statistics: 14, 'Data Visualization': 10, 'Machine Learning': 18, 'Scikit-learn': 10, 'Deep Learning': 22 },
    project: { name: 'Student performance predictor', description: 'Build a model that predicts student outcomes and explains the factors behind its predictions.', skills: ['Python', 'Pandas', 'Scikit-learn'] },
    resources: { Python: ['Python for Everybody — free course', 'Python docs: Beginner’s guide'], NumPy: ['NumPy quickstart', 'Array manipulation exercises'], Pandas: ['Pandas 10 minutes', 'Real Python: Pandas'], Statistics: ['Khan Academy: Statistics', 'StatQuest fundamentals'], 'Data Visualization': ['Python Graph Gallery', 'Matplotlib tutorials'], 'Machine Learning': ['Google ML Crash Course', 'Hands-On ML chapters'], 'Scikit-learn': ['Scikit-learn user guide'], 'Deep Learning': ['fast.ai: Practical Deep Learning', 'Neural Networks from Scratch'] },
    rules: { math: 2, coding: 2, analytical: 2, data: 3, technology: 2, build: 1 }
  },
  data_analyst: {
    name: 'Data Analyst', shortName: 'Data Analyst', icon: '◌', color: 'green', description: 'Find the story inside data and turn it into better decisions.',
    skills: ['Excel & Spreadsheets', 'Python', 'SQL', 'Pandas', 'Statistics', 'Data Visualization', 'Power BI'],
    skillHours: { 'Excel & Spreadsheets': 8, Python: 12, SQL: 14, Pandas: 10, Statistics: 14, 'Data Visualization': 10, 'Power BI': 12 },
    project: { name: 'Student outcomes dashboard', description: 'Clean a student dataset, uncover trends, and present your findings in an interactive dashboard.', skills: ['Excel & Spreadsheets', 'SQL', 'Power BI'] },
    resources: { 'Excel & Spreadsheets': ['Microsoft Excel training', 'Chandoo spreadsheet basics'], Python: ['Python for Everybody — free course'], SQL: ['SQLBolt interactive lessons', 'Mode SQL tutorial'], Pandas: ['Pandas 10 minutes'], Statistics: ['Khan Academy: Statistics'], 'Data Visualization': ['Storytelling with data'], 'Power BI': ['Microsoft Learn: Power BI'] },
    rules: { math: 2, coding: 1, analytical: 3, data: 3, business: 2, strategy: 2, technology: 1 }
  },
  data_scientist: {
    name: 'Data Scientist', shortName: 'Data Scientist', icon: '✣', color: 'blue', description: 'Use experimentation, statistics, and code to answer complex questions.',
    skills: ['Python', 'SQL', 'Statistics', 'Pandas', 'Data Visualization', 'Machine Learning', 'Experimentation'],
    skillHours: { Python: 12, SQL: 14, Statistics: 18, Pandas: 10, 'Data Visualization': 10, 'Machine Learning': 18, Experimentation: 12 },
    project: { name: 'A/B test case study', description: 'Design an experiment, analyze the results, and communicate a clear product recommendation.', skills: ['Python', 'Statistics', 'Data Visualization'] },
    resources: { Python: ['Python for Everybody — free course'], SQL: ['SQLBolt interactive lessons'], Statistics: ['StatQuest fundamentals', 'Khan Academy: Statistics'], Pandas: ['Pandas 10 minutes'], 'Data Visualization': ['Storytelling with data'], 'Machine Learning': ['Google ML Crash Course'], Experimentation: ['Udacity A/B testing notes'] },
    rules: { math: 3, coding: 2, analytical: 3, data: 3, technology: 1, strategy: 1 }
  },
  web_developer: {
    name: 'Web Developer', shortName: 'Web Developer', icon: '⌘', color: 'orange', description: 'Design and build the websites and digital experiences people use every day.',
    skills: ['HTML', 'CSS', 'JavaScript', 'Git & GitHub', 'Responsive Design', 'APIs & JSON', 'Frontend Project'],
    skillHours: { HTML: 6, CSS: 10, JavaScript: 20, 'Git & GitHub': 6, 'Responsive Design': 10, 'APIs & JSON': 12, 'Frontend Project': 18 },
    project: { name: 'Personal portfolio website', description: 'Ship a responsive portfolio that shows your story, skills, and three projects.', skills: ['HTML', 'CSS', 'JavaScript'] },
    resources: { HTML: ['MDN HTML basics'], CSS: ['MDN CSS basics', 'Flexbox Froggy'], JavaScript: ['javascript.info', 'Frontend Mentor'], 'Git & GitHub': ['GitHub Skills: Introduction'], 'Responsive Design': ['web.dev responsive design'], 'APIs & JSON': ['MDN: Working with APIs'], 'Frontend Project': ['Frontend Mentor challenges'] },
    rules: { coding: 3, programming: 3, creative: 2, build: 3, technology: 2, design: 1 }
  },
  app_developer: {
    name: 'App Developer', shortName: 'App Developer', icon: '▣', color: 'pink', description: 'Create useful mobile experiences from an idea to an app people can hold.',
    skills: ['Programming Basics', 'JavaScript', 'UI Fundamentals', 'APIs & JSON', 'Git & GitHub', 'Mobile Framework', 'Mobile Project'],
    skillHours: { 'Programming Basics': 14, JavaScript: 20, 'UI Fundamentals': 10, 'APIs & JSON': 12, 'Git & GitHub': 6, 'Mobile Framework': 24, 'Mobile Project': 20 },
    project: { name: 'Habit tracker app', description: 'Build a small mobile-first app that helps someone make a habit visible and actionable.', skills: ['JavaScript', 'UI Fundamentals', 'Mobile Framework'] },
    resources: { 'Programming Basics': ['freeCodeCamp: JavaScript basics'], JavaScript: ['javascript.info'], 'UI Fundamentals': ['Material Design foundations'], 'APIs & JSON': ['MDN: Working with APIs'], 'Git & GitHub': ['GitHub Skills: Introduction'], 'Mobile Framework': ['Expo tutorial'], 'Mobile Project': ['App Ideas collection'] },
    rules: { coding: 3, programming: 3, creative: 1, build: 3, technology: 2, people: 1 }
  },
  ui_ux_designer: {
    name: 'UI / UX Designer', shortName: 'UI / UX Designer', icon: '✧', color: 'pink', description: 'Make digital products feel clear, useful, and surprisingly human.',
    skills: ['Design Principles', 'User Research', 'Wireframing', 'Figma', 'Prototyping', 'Design Systems', 'UX Case Study'],
    skillHours: { 'Design Principles': 10, 'User Research': 12, Wireframing: 8, Figma: 10, Prototyping: 12, 'Design Systems': 12, 'UX Case Study': 18 },
    project: { name: 'Campus experience redesign', description: 'Interview students, identify friction, and prototype a simpler experience for a campus task.', skills: ['User Research', 'Figma', 'Prototyping'] },
    resources: { 'Design Principles': ['Laws of UX'], 'User Research': ['Nielsen Norman Group articles'], Wireframing: ['Figma wireframing guide'], Figma: ['Figma Learn'], Prototyping: ['Figma prototyping basics'], 'Design Systems': ['Design systems checklist'], 'UX Case Study': ['Case study examples'] },
    rules: { creative: 3, design: 3, visual: 3, people: 2, communication: 2, technology: 1 }
  },
  cybersecurity_analyst: {
    name: 'Cybersecurity Analyst', shortName: 'Cybersecurity Analyst', icon: '⌾', color: 'red', description: 'Help keep systems, people, and information safe from evolving threats.',
    skills: ['Computer Networks', 'Linux Basics', 'Python', 'Security Fundamentals', 'Web Security', 'Threat Analysis', 'Security Project'],
    skillHours: { 'Computer Networks': 14, 'Linux Basics': 10, Python: 12, 'Security Fundamentals': 16, 'Web Security': 16, 'Threat Analysis': 18, 'Security Project': 18 },
    project: { name: 'Secure a student portal', description: 'Audit a sample web app, document vulnerabilities, and recommend practical fixes.', skills: ['Web Security', 'Threat Analysis', 'Python'] },
    resources: { 'Computer Networks': ['Cisco networking basics'], 'Linux Basics': ['Linux Journey'], Python: ['Python for Everybody — free course'], 'Security Fundamentals': ['TryHackMe: Pre-Security'], 'Web Security': ['PortSwigger Web Security Academy'], 'Threat Analysis': ['MITRE ATT&CK basics'], 'Security Project': ['OWASP Juice Shop'] },
    rules: { coding: 2, analytical: 2, technology: 3, systems: 3, security: 4, programming: 1 }
  },
  embedded_engineer: {
    name: 'Embedded Systems Engineer', shortName: 'Embedded Systems', icon: '◫', color: 'teal', description: 'Bring hardware to life with code, electronics, and careful problem solving.',
    skills: ['Electronics Basics', 'C Programming', 'Microcontrollers', 'Digital Logic', 'Sensors & Actuators', 'Embedded C', 'Hardware Project'],
    skillHours: { 'Electronics Basics': 14, 'C Programming': 18, Microcontrollers: 16, 'Digital Logic': 14, 'Sensors & Actuators': 14, 'Embedded C': 20, 'Hardware Project': 20 },
    project: { name: 'Smart plant monitor', description: 'Build a sensor-based device that measures soil moisture and communicates its status.', skills: ['C Programming', 'Microcontrollers', 'Sensors & Actuators'] },
    resources: { 'Electronics Basics': ['All About Circuits textbook'], 'C Programming': ['Learn C — free course'], Microcontrollers: ['Arduino getting started'], 'Digital Logic': ['Ben Eater digital logic'], 'Sensors & Actuators': ['Arduino project hub'], 'Embedded C': ['Embedded Artistry guides'], 'Hardware Project': ['Arduino project ideas'] },
    rules: { math: 2, coding: 2, hardware: 4, systems: 3, technology: 3, build: 2 }
  }
};

export const SKILL_PREREQUISITES = {
  'NumPy': ['Python'], Pandas: ['Python', 'NumPy'], Statistics: [], 'Data Visualization': ['Pandas'], 'Machine Learning': ['Python', 'Pandas', 'Statistics'], 'Scikit-learn': ['Machine Learning'], 'Deep Learning': ['Machine Learning'], SQL: [], 'Power BI': ['Data Visualization'], JavaScript: ['HTML'], 'Git & GitHub': [], 'Responsive Design': ['HTML', 'CSS'], 'APIs & JSON': ['JavaScript'], 'Frontend Project': ['JavaScript', 'Responsive Design'], 'Mobile Framework': ['JavaScript', 'UI Fundamentals'], 'Mobile Project': ['Mobile Framework'], Wireframing: ['Design Principles'], Figma: ['Design Principles'], Prototyping: ['Wireframing', 'Figma'], 'Design Systems': ['Figma'], 'UX Case Study': ['User Research', 'Prototyping'], 'Linux Basics': [], Python: [], 'Security Fundamentals': ['Computer Networks'], 'Web Security': ['Security Fundamentals'], 'Threat Analysis': ['Web Security'], 'Security Project': ['Threat Analysis'], 'C Programming': [], Microcontrollers: ['C Programming', 'Electronics Basics'], 'Digital Logic': ['Electronics Basics'], 'Sensors & Actuators': ['Microcontrollers'], 'Embedded C': ['C Programming', 'Microcontrollers'], 'Hardware Project': ['Embedded C', 'Sensors & Actuators'], 'Excel & Spreadsheets': [], 'Programming Basics': [], 'UI Fundamentals': [], 'Design Principles': [], 'User Research': [], 'Computer Networks': [], 'Electronics Basics': []
};

export const CAREER_ORDER = Object.keys(CAREERS);
