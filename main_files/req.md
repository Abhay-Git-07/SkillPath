SKILLPATH
Personalized Career & Learning Roadmap

Core tagline

Know where you are. Know where you want to go. Know what to learn next.

---

# 1. WHAT ARE WE BUILDING?

We are building a web application, not a mobile app.

SkillPath is a personalized career guidance and learning roadmap platform for students.

It solves two problems:

Problem A — "I know what I want to become, but I don't know how to get there."

The system identifies the student's skill gaps and generates a step-by-step learning roadmap.

Problem B — "I don't know what career I should choose."

The system asks the student about their interests, subjects, preferences and strengths, recommends suitable careers, and then generates a beginner-friendly roadmap for the selected career.

Therefore:

SkillPath = Career Discovery + Skill Gap Analysis + Personalized Learning Roadmap

The project is based on the hackathon's EDU-02 requirement to generate personalized learning roadmaps based on a student's branch, career interests, current skills and target job roles.

---

# 2. THE MAIN USER JOURNEY

The landing page must immediately give the student two choices.

                    SKILLPATH
                        │
          ┌─────────────┴─────────────┐
          │                           │
          ▼                           ▼
"I Know My Career Goal"       "I'm Confused About My Career"
          │                           │
          ▼                           ▼
   Skill Gap Analysis          Career Assessment
          │                           │
          ▼                           ▼
   Personalized Roadmap       Career Recommendations
          │                           │
          └─────────────┬─────────────┘
                        ▼
              Personalized Roadmap
                        │
                        ▼
                Resources + Projects
                        │
                        ▼
                 Progress Tracking

This two-mode system is the main differentiating feature.

---

# 3. MODE 1 — I KNOW MY CAREER GOAL

This mode is for students who already know their target career.

## Input

Ask for:

- Academic branch
- Year
- Target career
- Current skills
- Skill level
- Learning hours per week

Example:

Branch: CSE
Year: 2nd Year

Target:
AI/ML Engineer

Current Skills:
✓ Python
✓ NumPy
✓ HTML
✓ CSS

Learning Time:
8 hours/week

---

# 4. MODE 1 — SKILL GAP ANALYSIS

The system contains a dataset of required skills for each career.

Example:

AI/ML Engineer requires:

Python
NumPy
Pandas
Statistics
Data Visualization
Machine Learning
Scikit-learn
Deep Learning

Student already knows:

Python
NumPy

The system compares the two.

Result:

✓ Python       Already Known
✓ NumPy        Already Known

→ Pandas       Immediate Next
→ Statistics   To Learn
→ ML           To Learn
→ Scikit-learn To Learn
→ Deep Learning To Learn

The system should never ask the student to relearn skills they already have.

---

# 5. MODE 1 — PERSONALIZED ROADMAP

The system uses prerequisites to determine the correct order.

Example:

Python ✓
   ↓
NumPy ✓
   ↓
Pandas
   ↓
Statistics
   ↓
Data Visualization
   ↓
Machine Learning
   ↓
Scikit-learn
   ↓
Deep Learning
   ↓
ML Project

This is more useful than simply displaying a list of missing skills.

The system answers:

"What should I learn next?"

---

# 6. MODE 2 — I'M CONFUSED ABOUT MY CAREER

This is the main new feature.

This mode is for students who:

- Don't know what career to choose
- Have interests but no clear direction
- Have little/no technical skills
- Don't know where to start
- Want career guidance before choosing a roadmap

Instead of immediately asking:

"What career do you want?"

we ask:

"Let's understand what you enjoy."

---

# 7. CAREER ASSESSMENT

Create a short questionnaire.

Do NOT make it extremely long.

Around 8–10 questions is enough for the MVP.

Example questions:

Q1. Which subjects do you enjoy?

○ Mathematics
○ Computer Science
○ Electronics
○ Business
○ Design
○ Science

Q2. Do you enjoy coding?

○ Love it
○ Somewhat
○ Not really

Q3. What type of problems do you enjoy?

○ Mathematical / analytical
○ Programming
○ Creative / visual
○ Hardware
○ Business / strategy
○ Communication

Q4. Do you enjoy working with data?

○ Yes
○ Sometimes
○ No

Q5. Do you enjoy designing things?

○ Yes
○ Sometimes
○ No

Q6. Do you like electronics/hardware?

○ Yes
○ Sometimes
○ No

Q7. Do you enjoy business/management?

○ Yes
○ Sometimes
○ No

Q8. Do you prefer:

○ Working with technology
○ Working with people
○ A mixture of both

Q9. What type of work sounds most interesting?

○ Building software
○ Analyzing data
○ Designing interfaces
○ Working with hardware
○ Protecting systems
○ Managing products/business

Q10. How much time can you spend learning each week?

○ 2–4 hours
○ 5–7 hours
○ 8–12 hours
○ 12+ hours

---

# 8. CAREER RECOMMENDATION ENGINE

We do NOT need an advanced ML model.

For the one-day MVP, use a rule-based scoring system.

Each answer contributes points to different career categories.

Example:

Likes Mathematics
→ Data Analyst +2
→ Data Scientist +2
→ AI/ML +2

Likes Coding
→ Web Developer +2
→ AI/ML +2
→ Backend Developer +2

Likes Design
→ UI/UX +3

Likes Electronics
→ Embedded Systems +3

Likes Cybersecurity
→ Cybersecurity +3

Likes Business
→ Business/Data roles +2

The system adds the scores.

Example:

Career                 Match

Data Analyst             85%
AI/ML Engineer           76%
Web Developer            68%
UI/UX Designer           42%

Show the top 2–3 recommendations.

---

# 9. CAREER RECOMMENDATION SCREEN

After completing the assessment, show:

# Your Career Matches

### 🥇 Data Analyst
85% Match

Why:

- Strong interest in mathematics
- Enjoys working with data
- Likes analytical problem solving

### 🥈 AI/ML Engineer
76% Match

Why:

- Enjoys coding
- Interested in mathematics
- Likes technology and problem solving

### 🥉 Web Developer
68% Match

Why:

- Interested in programming
- Enjoys building things

Then:

[ Explore Data Analyst Roadmap ]

or allow the student to choose another recommended career.

---

# 10. ZERO-SKILL STUDENT SUPPORT

This is an important part of the product.

If the student has:

Current Skills:
None

the application must NOT break.

Instead, it generates a beginner roadmap.

Example:

ZERO SKILLS
    ↓
Career Assessment
    ↓
Recommended:
Data Analyst
    ↓
Computer Basics
    ↓
Python
    ↓
Excel
    ↓
SQL
    ↓
Pandas
    ↓
Statistics
    ↓
Data Visualization
    ↓
Power BI
    ↓
Data Analysis Project

The system should therefore support both:

Complete beginner

and

Already skilled student.

---

# 11. CAREER DATASET

For a one-day hackathon, support approximately 6–8 careers.

Recommended:

1. AI/ML Engineer
2. Data Analyst
3. Data Scientist
4. Web Developer
5. App Developer
6. UI/UX Designer
7. Cybersecurity Analyst
8. Embedded Systems Engineer

Optional if time permits:

9. Cloud/DevOps
10. Product/Business Analyst

Do NOT try to create 50 careers.

---

# 12. CAREER DATA STRUCTURE

Each career should contain:

Career Name
Description
Required Skills
Skill Prerequisites
Beginner Roadmap
Intermediate Roadmap
Resources
Projects
Career Assessment Rules

Example:

AI_ML_ENGINEER = {
    name: "AI/ML Engineer",

    skills: [
        "Python",
        "NumPy",
        "Pandas",
        "Statistics",
        "Machine Learning",
        "Scikit-learn",
        "Deep Learning"
    ],

    projects: [
        "Student Performance Prediction",
        "House Price Prediction"
    ]
}

---

# 13. SKILL PREREQUISITE SYSTEM

This is required for roadmap ordering.

Example:

Python
   ↓
NumPy
   ↓
Pandas
   ↓
Statistics
   ↓
Machine Learning
   ↓
Scikit-learn
   ↓
Deep Learning

Represent this in JavaScript/JSON.

Example:

const prerequisites = {

    "NumPy": ["Python"],

    "Pandas": [
        "Python",
        "NumPy"
    ],

    "Machine Learning": [
        "Python",
        "Pandas",
        "Statistics"
    ],

    "Scikit-learn": [
        "Machine Learning"
    ],

    "Deep Learning": [
        "Machine Learning"
    ]
};

---

# 14. PERSONALIZATION ENGINE

The engine must take:

Student Profile
+
Target Career
+
Current Skills
+
Learning Availability

and return:

Known Skills
+
Skill Gap
+
Next Skill
+
Ordered Roadmap
+
Resources
+
Project
+
Estimated Time

Basic algorithm:

1. Get career.

2. Get required career skills.

3. Get student's current skills.

4. Find skills already known.

5. Remove known skills from the roadmap.

6. Check prerequisites.

7. Determine which missing skill can be learned next.

8. Sort remaining skills.

9. Generate roadmap.

10. Attach resources.

11. Attach project recommendations.

12. Calculate progress.

---

# 15. RESULT DASHBOARD

Both modes should eventually lead to the same dashboard.

The dashboard should contain:

### Career

AI/ML Engineer

### Match

60%

### Current Skills

✓ Python
✓ NumPy
✓ HTML
✓ CSS

### Skill Gap

Pandas
Statistics
Machine Learning
Scikit-learn
Deep Learning

### Current Stage

→ Pandas

### Upcoming

Statistics
Machine Learning
Scikit-learn
Deep Learning

---

# 16. ROADMAP TIMELINE

Use a visual timeline.

Example:

✓ Python
   │
✓ NumPy
   │
🔵 Pandas
   │
○ Statistics
   │
○ Machine Learning
   │
○ Scikit-learn
   │
○ Deep Learning
   │
🚀 ML Project

Legend:

✓ MASTERED

🔵 IN PROGRESS

○ UPCOMING

🚀 PROJECT

---

# 17. RESOURCES

Each major skill gets a small resource section.

Example:

### Pandas

Learn:
Pandas Fundamentals

Resources:
📖 Documentation
🎥 Beginner Tutorial
🧪 Practice Exercises

Do not collect hundreds of links.

One or two good resources per important skill are enough.

---

# 18. PROJECT RECOMMENDATIONS

Every roadmap should eventually lead to practical work.

Example:

### Machine Learning

Recommended project:

Student Performance Prediction

Skills:

Python
Pandas
Scikit-learn
Machine Learning

Example:

### Web Development

Recommended project:

Personal Portfolio Website

Skills:

HTML
CSS
JavaScript

This solves one of the problems identified in our presentation:

Students often consume tutorials without knowing what to build.

---

# 19. LEARNING TIME

If the student provides weekly learning hours, use it to estimate the roadmap.

Example:

Learning Time:
5 hours/week

Display:

Estimated Roadmap:
12–14 weeks

Keep this calculation simple.

It doesn't need to be scientifically accurate for the MVP.

---

# 20. PROGRESS TRACKING

Allow the student to mark skills complete.

Example:

Pandas

[ Mark as Complete ]

After completion:

✓ Pandas Completed

Update:

Progress

██████░░░░ 60%

Calculate:

completed modules /
total modules

---

# 21. WEBSITE SCREENS

The final web application should have approximately these screens:

### SCREEN 1

Landing Page

Two buttons:

[ I Know My Career Goal ]

[ I'm Confused About My Career ]

---

### SCREEN 2A

Known Career — Profile

Branch
Year
Target Career
Current Skills
Experience
Learning Hours

---

### SCREEN 2B

Career Discovery — Assessment

8–10 questions about:

Interests
Subjects
Activities
Work preferences
Learning time

---

### SCREEN 3A

Career Recommendations

Show top 2–3 career matches.

---

### SCREEN 3B

Skill Gap

Show:

Known
Missing
Next

---

### SCREEN 4

Personalized Roadmap

Timeline with:

Mastered
Current
Upcoming
Project

---

### SCREEN 5

Resources & Projects

Learning resources and practical project recommendations.

---

### SCREEN 6

Progress

Progress percentage and completed modules.

These can be implemented as sections/views within a single-page application rather than separate HTML pages.

---

# 22. LANDING PAGE CONTENT

Use:

# SkillPath

### Personalized Career & Learning Roadmap

Don't know what to become?
We'll help you discover a direction.

Know your goal?
We'll show you exactly how to reach it.

Buttons:

I Know My Career Goal

I'm Confused About My Career

---

# 23. VISUAL STYLE

The website should look like a modern technology product.

Use:

- Clean typography
- Modern cards
- Rounded components
- Clear spacing
- Skill chips
- Progress bars
- Roadmap timeline
- Subtle animations
- Consistent icons
- Responsive layout

Avoid making it look like a basic college form.

The landing page should immediately look polished.

---

# 24. TECHNOLOGY STACK

Keep it simple because we have only one day.

### Frontend

HTML5
CSS3
JavaScript

### Data

JSON / JavaScript objects

### Logic

Rule-based recommendation engine
Skill-gap engine
Prerequisite roadmap engine

### Tools

VS Code
Git
GitHub

Do NOT introduce React, Flask, a complex database, or an ML model unless the core product is already finished.

The MVP should work entirely in the browser.

---

# 25. PROJECT ARCHITECTURE

                         USER
                           │
                           ▼
                    ┌─────────────┐
                    │  LANDING    │
                    │    PAGE     │
                    └──────┬──────┘
                           │
                ┌──────────┴──────────┐
                │                     │
                ▼                     ▼
       KNOW MY CAREER          CONFUSED ABOUT CAREER
                │                     │
                ▼                     ▼
         PROFILE INPUT          INTEREST ASSESSMENT
                │                     │
                ▼                     ▼
         SKILL GAP ENGINE       CAREER SCORING ENGINE
                │                     │
                │                     ▼
                │              TOP CAREER MATCHES
                │                     │
                └──────────┬──────────┘
                           ▼
                  ROADMAP ENGINE
                           │
                           ▼
                PERSONALIZED ROADMAP
                           │
                  ┌────────┴────────┐
                  ▼                 ▼
              RESOURCES          PROJECTS
                  │                 │
                  └────────┬────────┘
                           ▼
                    PROGRESS TRACKING

---

# 26. FILE STRUCTURE

Use:

SkillPath/
│
├── index.html
├── style.css
├── script.js
│
├── data/
│   ├── careers.js
│   ├── skills.js
│   ├── questions.js
│   └── resources.js
│
└── assets/
    ├── icons/
    └── images/

Keep everything lightweight.

---

# 27. ONE-DAY BUILD ORDER

We only have one day.

## PHASE 1 — Career & Skill Data

Create:

- 6–8 careers
- Required skills
- Prerequisites
- Resources
- Projects
- Career scoring rules

Target: 1–2 hours

---

# PHASE 2 — Recommendation Logic

Build:

### Mode 1

Career
→ Required Skills
→ Current Skills
→ Skill Gap
→ Ordered Roadmap

### Mode 2

Assessment
→ Career Scores
→ Top 3 Careers
→ Selected Career
→ Beginner Roadmap

Target: 2 hours

---

# PHASE 3 — Website

Build:

- Landing page
- Two mode buttons
- Forms
- Assessment
- Career recommendations
- Roadmap dashboard

Target: 3 hours

---

# PHASE 4 — Resources / Projects / Progress

Add:

- Resources
- Project cards
- Completion buttons
- Progress bar

Target: 1–2 hours

---

# PHASE 5 — DESIGN

Polish:

- Typography
- Spacing
- Colors
- Cards
- Animations
- Responsive layout

Target: 1–2 hours

---

# PHASE 6 — TESTING

Test both paths.

### Path A

Know Career
→ AI/ML
→ Python + NumPy
→ Roadmap

### Path B

Confused
→ Assessment
→ Data Analyst 85%
→ Select Data Analyst
→ Beginner Roadmap

Also test:

- Zero skills
- Multiple skills
- No selected skills
- All skills
- Mobile layout
- Refreshing page
- Progress buttons

---

# 28. PRIMARY DEMO

The strongest demo should demonstrate BOTH modes.

## Demo 1 — Career Discovery

Start with:

"Imagine a second-year student who has no idea what career to choose."

Select interests:

Mathematics
Coding
Data
Problem Solving

Show:

Data Analyst       85%
AI/ML Engineer     76%
Web Developer      68%

Select:

Data Analyst

Then generate:

Computer Basics
↓
Excel
↓
SQL
↓
Python
↓
Pandas
↓
Statistics
↓
Data Visualization
↓
Power BI
↓
Data Analysis Project

---

# 29. SECOND DEMO

Then demonstrate:

"Now imagine a student who already knows what they want."

Choose:

CSE
2nd Year
AI/ML Engineer

Current skills:

Python
NumPy

The system should immediately skip those skills and generate:

Pandas
↓
Statistics
↓
Data Visualization
↓
Machine Learning
↓
Scikit-learn
↓
Deep Learning
↓
ML Project

This proves that the system is personalized.

---

# 30. WHAT MAKES THE PROJECT UNIQUE

Do NOT pitch SkillPath as simply:

"A website that creates learning roadmaps."

Pitch it as:

# "A two-path career guidance system."

A student can enter from either direction:

### They know their destination:

Career → Skill Gap → Roadmap

### They don't know their destination:

Interests → Career Discovery → Roadmap

Both eventually reach:

Learning → Projects → Progress

That is our strongest differentiator.

---

# 31. CURRENT FEATURES VS FUTURE FEATURES

## CURRENT MVP

We actually build:

- Two-mode landing page
- Career assessment
- Rule-based career scoring
- Career recommendations
- Skill-gap analysis
- Skill prerequisites
- Personalized roadmap
- Resources
- Projects
- Progress tracking
- Responsive web interface

## FUTURE

Do NOT pretend these already exist.

Future possibilities:

- AI-powered resume analysis
- AI skill extraction
- Adaptive quizzes
- Dynamic weekly schedules
- Job-market analysis
- Personalized resource ranking
- AI career mentor
- Industry demand analysis
- Advanced ML-based recommendations

---

# 32. FINAL PRODUCT DEFINITION

SkillPath should answer three questions:

### 1. WHERE AM I?

Current skills and competency.

### 2. WHERE SHOULD I GO?

Career recommendation or selected target career.

### 3. HOW DO I GET THERE?

Personalized, ordered learning roadmap.

Therefore:

# SkillPath
## From Career Confusion to a Clear Learning Path

Current Skills → Career → Skill Gap → Roadmap → Resources → Projects → Progress

