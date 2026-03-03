import { loadTemplate } from './templateLoader.js';
import { exportToPDF } from './pdfExporter.js';
import { saveData, loadData } from './storage.js';
import { renderBasicFeatures } from './basicFeatures.js';
import { renderProFeatures } from './proFeatures.js';
import { hashString, debounce } from './utils.js';

const form = document.getElementById('formFields');
const templateSelect = document.getElementById('templateSelect');
const resumePreview = document.getElementById('resumePreview');
const premiumPanel = document.getElementById('premiumPanel');
const versionPanel = document.getElementById('versionPanel');
const exportBtn = document.getElementById('exportPDF');
const togglePlanBtn = document.getElementById('togglePlanBtn');
const themeToggleBtn = document.getElementById('themeToggleBtn');

let currentPlan = 'basic';
let theme = 'light';
let versions = [];

// ===============================
// INIT
// ===============================
window.addEventListener('load', async () => {
    // Load regions and provinces
    await populateRegions();
    // Load last saved data
    const saved = await loadData('resumeData');
    if(saved) populateForm(saved);
    renderPreview();
});

// ===============================
// FORM SUBMISSION
// ===============================
form.addEventListener('submit', e => {
    e.preventDefault();
    const data = new FormData(form);
    const resumeData = Object.fromEntries(data.entries());
    saveData('resumeData', resumeData);
    renderPreview();
    addVersion(resumeData);
});

// ===============================
// PDF EXPORT
// ===============================
exportBtn.addEventListener('click', () => {
    exportToPDF(resumePreview, templateSelect.value);
});

// ===============================
// PLAN TOGGLE
// ===============================
togglePlanBtn.addEventListener('click', () => {
    currentPlan = currentPlan === 'basic' ? 'premium' : 'basic';
    togglePlanBtn.textContent = currentPlan === 'basic' ? 'Switch to Premium' : 'Switch to Basic';
    renderPreview();
});

// ===============================
// THEME TOGGLE
// ===============================
themeToggleBtn.addEventListener('click', () => {
    theme = theme === 'light' ? 'dark' : 'light';
    document.body.classList.toggle('dark-theme', theme === 'dark');
});

// ===============================
// PREVIEW RENDERING
// ===============================
async function renderPreview() {
    const data = Object.fromEntries(new FormData(form).entries());
    const template = await loadTemplate(templateSelect.value, data.audience || 'professional');
    resumePreview.innerHTML = template;

    // Render skill bars dynamically
    renderSkillBars(data.skills);

    // Render plan features
    if(currentPlan === 'basic') {
        renderBasicFeatures(data, resumePreview);
        premiumPanel.classList.add('hidden');
    } else {
        renderProFeatures(data, resumePreview, premiumPanel);
        premiumPanel.classList.remove('hidden');
    }
}

// ===============================
// SKILL BARS
// ===============================
function renderSkillBars(skillsStr) {
    const skills = skillsStr ? skillsStr.split(',').map(s => s.trim()) : [];
    const container = resumePreview.querySelector('.skills-container');
    if(!container) return;
    container.innerHTML = '';
    skills.forEach(skill => {
        const div = document.createElement('div');
        div.className = 'skill-bar';
        div.innerHTML = `<span>${skill}</span><div class="skill-fill" style="width:${Math.floor(Math.random()*100)}%"></div>`;
        container.appendChild(div);
    });
}

// ===============================
// FORM POPULATE (LOAD SAVED)
// ===============================
function populateForm(data) {
    for(const [key, value] of Object.entries(data)) {
        const el = form.elements[key];
        if(el) el.value = value;
    }
}

// ===============================
// VERSION CONTROL
// ===============================
function addVersion(data) {
    const versionHash = hashString(JSON.stringify(data));
    versions.push({ hash: versionHash, timestamp: new Date().toISOString(), data });
    updateVersionPanel();
}

function updateVersionPanel() {
    const list = document.getElementById('versionList');
    list.innerHTML = '';
    versions.forEach(v => {
        const li = document.createElement('li');
        li.textContent = `${v.timestamp} | ID: ${v.hash.slice(0,6)}`;
        list.appendChild(li);
    });
    versionPanel.classList.toggle('hidden', versions.length === 0);
}

// ===============================
// REGIONS & PROVINCES
// ===============================
async function populateRegions() {
    const regionSelect = document.getElementById('regionSelect');
    const locationSelect = document.getElementById('locationSelect');
    const clusters = await fetch('config/clusters.json').then(r=>r.json());
    const provinces = await fetch('config/provinces.json').then(r=>r.json());

    // Fill region dropdown
    Object.keys(clusters).forEach(region => {
        const opt = document.createElement('option');
        opt.value = region;
        opt.textContent = region.charAt(0).toUpperCase() + region.slice(1);
        regionSelect.appendChild(opt);
    });

    // On region change, fill provinces/states
    regionSelect.addEventListener('change', e => {
        const selected = e.target.value;
        locationSelect.innerHTML = '';
        if(provinces[selected]){
            provinces[selected].forEach(loc => {
                const opt = document.createElement('option');
                opt.value = loc;
                opt.textContent = loc;
                locationSelect.appendChild(opt);
            });
        }
    });

    // Trigger initial population
    regionSelect.dispatchEvent(new Event('change'));
}