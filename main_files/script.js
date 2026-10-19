import { CAREERS, CAREER_ORDER, SKILL_PREREQUISITES } from './data/careers.js';
import { QUESTIONS } from './data/questions.js';

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const STORAGE_KEY = 'skillpath-progress-v1';

const state = {
  mode: null,
  flowStep: 0,
  profile: { branch: '', year: '', careerId: 'data_analyst', skills: [], hours: 6 },
  answers: {},
  recommendations: [],
  selectedCareerId: null,
  roadmap: null,
  dashboardView: 'overview',
  completed: new Set()
};

function loadSavedProgress() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    state.completed = new Set(saved.completed || []);
  } catch { state.completed = new Set(); }
}

function saveProgress() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ completed: [...state.completed] }));
}

function showView(id) {
  $$('.view').forEach(view => view.classList.toggle('active', view.id === id));
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showToast(message) {
  const toast = $('#toast');
  toast.textContent = message;
  toast.classList.add('visible');
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove('visible'), 2800);
}

function skillChip(skill, selected = false) {
  return `<button type="button" class="skill-chip ${selected ? 'selected' : ''}" data-skill="${skill}"><span>${selected ? '✓' : '+'}</span>${skill}</button>`;
}

function renderKnownForm() {
  const allSkills = [...new Set(Object.values(CAREERS).flatMap(career => career.skills).filter(skill => !skill.toLowerCase().includes('project')))].sort();
  const careerOptions = CAREER_ORDER.map(id => `<option value="${id}" ${state.profile.careerId === id ? 'selected' : ''}>${CAREERS[id].name}</option>`).join('');
  $('#flow-content').innerHTML = `
    <div class="flow-heading"><span class="section-kicker">YOUR STARTING POINT</span><h1>Let’s map your <em>way forward.</em></h1><p>A few details help us make the roadmap feel like yours — not a generic checklist.</p></div>
    <form class="profile-form" id="profile-form">
      <div class="form-row two-col"><label><span>Academic branch</span><input name="branch" value="${state.profile.branch}" placeholder="e.g. Computer Science" /></label><label><span>Year of study</span><select name="year"><option value="">Choose your year</option><option ${state.profile.year === '1st Year' ? 'selected' : ''}>1st Year</option><option ${state.profile.year === '2nd Year' ? 'selected' : ''}>2nd Year</option><option ${state.profile.year === '3rd Year' ? 'selected' : ''}>3rd Year</option><option ${state.profile.year === '4th Year' ? 'selected' : ''}>4th Year</option><option ${state.profile.year === 'Graduate' ? 'selected' : ''}>Graduate</option></select></label></div>
      <label><span>What career are you aiming for?</span><select name="career">${careerOptions}</select></label>
      <div class="form-field"><span>What can you already do? <small>Choose everything that feels familiar. None is a great answer too.</small></span><div class="skill-picker">${allSkills.map(skill => skillChip(skill, state.profile.skills.includes(skill))).join('')}</div><button type="button" class="none-skills" id="none-skills">I’m starting from zero</button></div>
      <div class="form-row two-col"><label><span>Weekly learning time</span><select name="hours"><option value="3" ${state.profile.hours === 3 ? 'selected' : ''}>2–4 hours</option><option value="6" ${state.profile.hours === 6 ? 'selected' : ''}>5–7 hours</option><option value="10" ${state.profile.hours === 10 ? 'selected' : ''}>8–12 hours</option><option value="14" ${state.profile.hours === 14 ? 'selected' : ''}>12+ hours</option></select></label><div class="form-note"><span class="note-icon">✦</span><p>Your roadmap adapts when your time or goals change.</p></div></div>
      <button class="primary-button form-submit" type="submit">Build my roadmap <span>→</span></button>
    </form>`;
  $$('.skill-chip', $('#flow-content')).forEach(chip => chip.addEventListener('click', () => {
    chip.classList.toggle('selected');
    const skill = chip.dataset.skill;
    state.profile.skills = chip.classList.contains('selected') ? [...new Set([...state.profile.skills, skill])] : state.profile.skills.filter(item => item !== skill);
    $('#none-skills')?.classList.remove('active');
  }));
  $('#none-skills').addEventListener('click', () => { state.profile.skills = []; $$('.skill-chip').forEach(chip => chip.classList.remove('selected')); $('#none-skills').classList.add('active'); });
  $('#profile-form').addEventListener('submit', event => { event.preventDefault(); const form = new FormData(event.currentTarget); state.profile.branch = form.get('branch'); state.profile.year = form.get('year'); state.profile.careerId = form.get('career'); state.profile.hours = Number(form.get('hours')); state.selectedCareerId = state.profile.careerId; state.roadmap = buildRoadmap(CAREERS[state.selectedCareerId], state.profile.skills, state.profile.hours); openDashboard(); });
}

function renderAssessment() {
  const question = QUESTIONS[state.flowStep];
  const selected = state.answers[question.id];
  const options = question.options.map(option => `<button type="button" class="assessment-option ${selected === option.value ? 'selected' : ''}" data-value="${option.value}"><span class="option-icon">${option.icon}</span><span>${option.label}</span><span class="option-radio">${selected === option.value ? '✓' : ''}</span></button>`).join('');
  $('#flow-content').innerHTML = `<div class="assessment-wrap"><div class="assessment-copy"><span class="section-kicker">CAREER DISCOVERY · ${String(state.flowStep + 1).padStart(2, '0')} / ${QUESTIONS.length}</span><h1>${question.label}</h1><p>${question.helper}</p></div><div class="assessment-options">${options}</div><div class="assessment-actions"><button class="secondary-button" id="assessment-back" type="button" ${state.flowStep === 0 ? 'disabled' : ''}>← Back</button><button class="primary-button" id="assessment-next" type="button">${state.flowStep === QUESTIONS.length - 1 ? 'See my matches' : 'Continue'} <span>→</span></button></div></div>`;
  $$('.assessment-option').forEach(option => option.addEventListener('click', () => { state.answers[question.id] = option.dataset.value; renderAssessment(); }));
  $('#assessment-back').addEventListener('click', () => { if (state.flowStep > 0) { state.flowStep -= 1; updateFlowMeta(); renderAssessment(); } });
  $('#assessment-next').addEventListener('click', () => { if (state.answers[question.id] === undefined) return showToast('Choose the answer that feels closest to you.'); if (state.flowStep < QUESTIONS.length - 1) { state.flowStep += 1; updateFlowMeta(); renderAssessment(); } else { buildRecommendations(); } });
}

function updateFlowMeta() {
  const isAssessment = state.mode === 'confused';
  const total = isAssessment ? QUESTIONS.length : 2;
  const step = isAssessment ? state.flowStep + 1 : 1;
  $('#flow-progress-label').textContent = `STEP ${step} OF ${total}`;
  $('#flow-progress-bar').style.width = `${Math.min(100, (step / total) * 100)}%`;
  $('#flow-mode-label').textContent = isAssessment ? 'Career discovery' : 'Career roadmap';
}

function buildRecommendations() {
  const totals = {};
  const reasons = {};
  CAREER_ORDER.forEach(id => { totals[id] = 0; reasons[id] = []; const career = CAREERS[id]; Object.entries(state.answers).forEach(([questionId, value]) => { const question = QUESTIONS.find(item => item.id === questionId); const option = question?.options.find(item => String(item.value) === String(value)); const key = option?.value; const points = career.rules[key] || 0; totals[id] += points; if (points >= 2 && reasons[id].length < 3) reasons[id].push(reasonFor(key)); }); });
  const maxTotal = Math.max(...CAREER_ORDER.map(id => totals[id]), 1);
  state.recommendations = CAREER_ORDER.map(id => ({ id, score: Math.max(42, Math.round((totals[id] / maxTotal) * 96)), reasons: reasons[id] })).sort((a, b) => b.score - a.score).slice(0, 3);
  state.selectedCareerId = state.recommendations[0].id;
  state.profile.hours = Number(state.answers.time || 6);
  state.profile.skills = [];
  renderRecommendations();
}

function reasonFor(key) { return ({ math: 'You enjoy analytical thinking', coding: 'You’re curious about code', programming: 'You like solving structured problems', data: 'You’re drawn to patterns and evidence', creative: 'You have a creative problem-solving side', design: 'You notice how experiences feel', visual: 'Visual thinking comes naturally to you', hardware: 'You’re interested in how things work', business: 'You’re energized by decisions and outcomes', strategy: 'You like thinking about the bigger picture', technology: 'You want to work close to technology', people: 'You value the human side of work', build: 'You want to make useful things', security: 'You care about protecting systems', analytical: 'You enjoy making sense of complexity', communication: 'You like connecting ideas and people', systems: 'You think in systems' })[key] || 'Your interests point in this direction'; }

function renderRecommendations() {
  const primary = state.recommendations[0];
  const cards = state.recommendations.map((item, index) => { const career = CAREERS[item.id]; return `<button class="recommendation-card ${index === 0 ? 'featured' : ''} ${item.id === state.selectedCareerId ? 'chosen' : ''}" data-recommendation="${item.id}" type="button"><div class="rec-rank">0${index + 1}</div><div class="rec-icon ${career.color}">${career.icon}</div><div class="rec-body"><div class="rec-name-row"><h3>${career.name}</h3><span class="match-percent">${item.score}%</span></div><p>${career.description}</p><div class="rec-reasons">${item.reasons.slice(0, 2).map(reason => `<span>✓ ${reason}</span>`).join('')}</div></div><span class="rec-select">${item.id === state.selectedCareerId ? 'Selected' : 'Explore'} ${item.id === state.selectedCareerId ? '✓' : '→'}</span></button>`; }).join('');
  $('#flow-content').innerHTML = `<div class="recommendations-wrap"><div class="flow-heading compact"><span class="section-kicker">YOUR RESULTS</span><h1>Here’s a direction worth <em>exploring.</em></h1><p>You don’t need to have it all figured out. Start with the path that feels most like you, then learn by doing.</p></div><div class="recommendation-list">${cards}</div><div class="recommendation-footer"><span class="privacy-note">✦ Your result is a starting point, not a label.</span><button class="primary-button" id="recommendation-continue" type="button">Explore ${CAREERS[primary.id].shortName} <span>→</span></button></div></div>`;
  $$('[data-recommendation]').forEach(card => card.addEventListener('click', () => { state.selectedCareerId = card.dataset.recommendation; renderRecommendations(); }));
  $('#recommendation-continue').addEventListener('click', () => { state.roadmap = buildRoadmap(CAREERS[state.selectedCareerId], [], state.profile.hours); openDashboard(); });
}

function orderMissingSkills(career, known) {
  const remaining = career.skills.filter(skill => !known.has(skill));
  const ordered = []; const available = new Set(known);
  while (remaining.length) { const next = remaining.find(skill => (SKILL_PREREQUISITES[skill] || []).every(prereq => available.has(prereq) || !career.skills.includes(prereq))); if (!next) { ordered.push(...remaining); break; } ordered.push(next); available.add(next); remaining.splice(remaining.indexOf(next), 1); }
  return ordered;
}

function buildRoadmap(career, knownSkills = [], hours = 6) {
  const known = new Set(knownSkills); const missing = orderMissingSkills(career, known); const next = missing[0]; const modules = career.skills.map(skill => ({ skill, status: known.has(skill) ? 'mastered' : skill === next ? 'current' : 'upcoming', hours: career.skillHours[skill] || 10 }));
  const totalHours = missing.reduce((sum, skill) => sum + (career.skillHours[skill] || 10), 0); return { careerId: CAREER_ORDER.find(id => CAREERS[id] === career), career, known: [...known], missing, next, modules, totalHours, weeks: Math.max(3, Math.ceil(totalHours / Math.max(hours, 2))) };
}

function openDashboard() { if (!state.roadmap) state.roadmap = buildRoadmap(CAREERS[state.selectedCareerId], state.profile.skills, state.profile.hours); state.dashboardView = 'overview'; updateDashboardShell(); showView('dashboard-view'); renderDashboard(); }

function updateDashboardShell() { const career = state.roadmap.career; const match = state.recommendations.find(item => item.id === state.selectedCareerId)?.score || (state.mode === 'known' ? 72 : 68); $('#sidebar-career').textContent = career.shortName; $('#sidebar-match').textContent = `${match}% match`; }

function renderDashboard() {
  $$('.dash-nav-item').forEach(item => item.classList.toggle('active', item.dataset.dashboardView === state.dashboardView));
  const roadmap = state.roadmap; const career = roadmap.career; const completedCount = roadmap.modules.filter(module => state.completed.has(module.skill) || module.status === 'mastered').length; const progress = Math.round((completedCount / (roadmap.modules.length + 1)) * 100); const focus = currentFocusSkill(roadmap);
  const header = `<div class="dashboard-header"><div><span class="section-kicker">${state.dashboardView === 'overview' ? 'WELCOME TO YOUR NEXT CHAPTER' : 'YOUR LEARNING SPACE'}</span><h1>${dashboardTitle()}</h1><p>${dashboardSubtitle()}</p></div><div class="dashboard-date"><span class="mini-label">CURRENT FOCUS</span><b>${focus || 'Your project'}</b><span class="focus-status">${progress}% complete</span></div></div>`;
  let content = header;
  if (state.dashboardView === 'overview') content += renderOverview(progress, completedCount);
  if (state.dashboardView === 'roadmap') content += renderRoadmap(progress);
  if (state.dashboardView === 'resources') content += renderResources();
  if (state.dashboardView === 'progress') content += renderProgress(progress);
  $('#dashboard-content').innerHTML = content;
  bindDashboardEvents();
}

function currentFocusSkill(roadmap) {
  return roadmap.modules.find(module => module.status !== 'mastered' && !state.completed.has(module.skill))?.skill || null;
}

function dashboardTitle() { return state.dashboardView === 'overview' ? `Your path to <em>${state.roadmap.career.shortName}.</em>` : ({ roadmap: 'A path you can follow.', resources: 'Learn by making.', progress: 'Keep your momentum.' }[state.dashboardView]); }
function dashboardSubtitle() { return state.dashboardView === 'overview' ? 'A clear next step beats a perfect five-year plan.' : ({ roadmap: 'Prerequisites first, confidence next, real projects always.', resources: 'A focused set of resources to help each step click.', progress: 'Every completed module is evidence that you are moving.' }[state.dashboardView]); }

function renderOverview(progress, completedCount) {
  const roadmap = state.roadmap; const career = roadmap.career; const focus = currentFocusSkill(roadmap); const upcoming = roadmap.modules.filter(module => module.status !== 'mastered' && !state.completed.has(module.skill)).slice(0, 3).map(module => module.skill); return `<div class="overview-grid"><div class="overview-main"><div class="next-card"><div class="next-card-copy"><span class="section-kicker">UP NEXT · MODULE ${String(career.skills.indexOf(focus) + 1).padStart(2, '0')}</span><h2>${focus || 'Your first project'}</h2><p>${focus ? `Build the foundation for your ${career.shortName} path.` : 'You’re ready to turn your skills into something real.'}</p><div class="next-meta"><span>◷ ${career.skillHours[focus] || 18} hours</span><span>↗ ${progress === 0 ? 'Not started' : 'In motion'}</span></div></div><div class="next-card-art"><div class="art-orbit"></div><span>${career.icon}</span></div></div><div class="mini-section-heading"><h2>Your roadmap at a glance</h2><button class="inline-link" data-dashboard-view="roadmap" type="button">See full roadmap →</button></div><div class="glance-list">${upcoming.length ? upcoming.map((skill, index) => `<div class="glance-row"><span class="glance-index">0${index + 1}</span><span class="glance-status ${index === 0 ? 'current' : ''}">${index === 0 ? 'Now' : 'Next'}</span><b>${skill}</b><span class="glance-time">${career.skillHours[skill] || 10}h</span></div>`).join('') : '<div class="empty-state">You have completed the skill gap. Time for your project ✦</div>'}</div></div><div class="overview-side"><div class="progress-card"><div class="progress-ring" style="--progress:${progress * 3.6}deg"><div><b>${progress}%</b><span>complete</span></div></div><h3>Your progress</h3><p>${completedCount} of ${roadmap.modules.length + 1} milestones complete</p><button class="small-button" data-dashboard-view="progress" type="button">View progress</button></div><div class="quote-card"><span>“</span><p>The path is not a test. It’s a set of experiments to find what you enjoy doing.</p><small>— Your future self</small></div></div></div>`;
}

function renderRoadmap(progress) {
  const roadmap = state.roadmap; const career = roadmap.career; const focus = currentFocusSkill(roadmap); const items = roadmap.modules.map((module, index) => { const done = state.completed.has(module.skill) || module.status === 'mastered'; const live = module.skill === focus && !done; return `<div class="timeline-item ${done ? 'done' : ''} ${live ? 'live' : ''}"><div class="timeline-marker">${done ? '✓' : live ? '•' : String(index + 1).padStart(2, '0')}</div><div class="timeline-line"></div><div class="timeline-content"><div class="timeline-top"><div><span class="timeline-status">${done ? 'MASTERED' : live ? 'CURRENT FOCUS' : 'UPCOMING'}</span><h3>${module.skill}</h3></div><span class="timeline-hours">${module.hours} hrs</span></div><p>${moduleDescription(module.skill, live, career)}</p>${live ? `<button class="complete-button" data-complete="${module.skill}" type="button">Mark as complete <span>→</span></button>` : ''}</div></div>`; }).join(''); return `<div class="roadmap-panel"><div class="roadmap-summary"><div><span class="section-kicker">${career.name.toUpperCase()}</span><h2>${roadmap.missing.length ? `${roadmap.missing.length} skills between you and your next role.` : 'You’re ready to build.'}</h2></div><div class="summary-stat"><b>${roadmap.weeks}</b><span>weeks at<br />${state.profile.hours}h / week</span></div></div><div class="timeline">${items}<div class="timeline-item project-item"><div class="timeline-marker project-marker">↗</div><div class="timeline-content"><span class="timeline-status">CAPSTONE PROJECT</span><h3>${career.project.name}</h3><p>${career.project.description}</p><div class="project-skill-list">${career.project.skills.map(skill => `<span>${skill}</span>`).join('')}</div></div></div></div></div>`;
}

function moduleDescription(skill, live, career) { if (live) return `This is the best next step based on your current skills. ${career.resources[skill]?.[0] || 'Start with the fundamentals, then practice by building.'}`; return ({ Python: 'Learn to express ideas and automate repetitive work with code.', Pandas: 'Turn raw tables into clean, useful datasets.', Statistics: 'Build the intuition to tell signal from noise.', 'Data Visualization': 'Make insights clear enough that people can act on them.', SQL: 'Ask precise questions of the data behind real products.', JavaScript: 'Add behavior and interaction to what you build.', Figma: 'Translate ideas into interfaces people can understand.', 'Security Fundamentals': 'Learn how systems fail — and how to make them safer.' }[skill] || `Build practical confidence in ${skill}.`); }

function renderResources() { const career = state.roadmap.career; const skills = [...new Set([...career.skills, ...career.project.skills])]; return `<div class="resources-panel"><div class="resource-intro"><div><span class="section-kicker">A SMALL, GOOD LIBRARY</span><h2>Resources for the road.</h2><p>One or two strong starting points for every important skill. Save the rabbit holes for later.</p></div><div class="resource-count"><b>${skills.length}</b><span>focus areas</span></div></div><div class="resource-grid">${skills.map((skill, index) => `<article class="resource-card"><div class="resource-card-top"><span class="resource-number">${String(index + 1).padStart(2, '0')}</span><span class="resource-icon">↗</span></div><h3>${skill}</h3><ul>${(career.resources[skill] || ['Start with a hands-on beginner guide']).map(resource => `<li><span>↗</span>${resource}</li>`).join('')}</ul></article>`).join('')}</div><div class="project-feature"><div><span class="section-kicker">WHEN YOU’RE READY TO BUILD</span><h2>${career.project.name}</h2><p>${career.project.description}</p><div class="project-skill-list">${career.project.skills.map(skill => `<span>${skill}</span>`).join('')}</div></div><span class="project-big-icon">↗</span></div></div>`; }

function renderProgress(progress) { const roadmap = state.roadmap; const modules = roadmap.modules; return `<div class="progress-panel"><div class="progress-hero"><div><span class="section-kicker">YOUR MOMENTUM</span><h2>${progress === 0 ? 'Every journey starts with one checkmark.' : `${progress}% is already yours.`}</h2><p>Mark a module complete when you can use the skill in a small project — not when you have watched every tutorial.</p></div><div class="big-progress"><b>${progress}%</b><div class="big-progress-bar"><span style="width:${progress}%"></span></div><small>${modules.filter(item => state.completed.has(item.skill) || item.status === 'mastered').length} of ${modules.length + 1} milestones</small></div></div><div class="progress-module-list">${modules.map(module => { const done = state.completed.has(module.skill) || module.status === 'mastered'; return `<button type="button" class="progress-module ${done ? 'complete' : ''}" data-complete="${module.skill}"><span class="progress-check">${done ? '✓' : ''}</span><span><b>${module.skill}</b><small>${module.status === 'mastered' ? 'Already knew this' : `${module.hours} hours · ${module.status === 'current' ? 'Current focus' : 'Upcoming'}`}</small></span><span class="progress-module-action">${done ? 'Completed' : 'Mark complete'}</span></button>`; }).join('')}</div><div class="progress-tip"><span>✦</span><p><b>A useful rule:</b> if you can explain it simply and use it once, count it as progress.</p></div></div>`; }

function bindDashboardEvents() { $$('[data-dashboard-view]').forEach(button => button.addEventListener('click', () => { state.dashboardView = button.dataset.dashboardView; renderDashboard(); })); $$('[data-complete]').forEach(button => button.addEventListener('click', () => { const skill = button.dataset.complete; if (state.completed.has(skill)) state.completed.delete(skill); else state.completed.add(skill); saveProgress(); renderDashboard(); showToast(state.completed.has(skill) ? `${skill} marked complete ✦` : `${skill} moved back to your roadmap`); })); }

function startFlow(mode) { state.mode = mode; state.flowStep = 0; updateFlowMeta(); showView('flow-view'); if (mode === 'known') renderKnownForm(); else renderAssessment(); }

function resetApp() { state.mode = null; state.flowStep = 0; state.answers = {}; state.recommendations = []; state.selectedCareerId = null; state.roadmap = null; state.profile = { branch: '', year: '', careerId: 'data_analyst', skills: [], hours: 6 }; showView('home-view'); }

loadSavedProgress();
$$('[data-mode]').forEach(button => button.addEventListener('click', () => startFlow(button.dataset.mode)));
$('#reset-button').addEventListener('click', resetApp);
$('#flow-back').addEventListener('click', () => { if (state.mode === 'confused' && state.flowStep > 0) { state.flowStep -= 1; updateFlowMeta(); renderAssessment(); } else resetApp(); });
$('#dashboard-home').addEventListener('click', resetApp); $('#mobile-dashboard-home').addEventListener('click', resetApp);
