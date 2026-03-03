// Core templateEngine.js
import { getState } from './state.js';

export function renderTemplate(template, userData) {
    const preview = document.getElementById('resumePreview');
    preview.innerHTML = ''; // clear previous render

    const container = document.createElement('div');
    container.className = 'p-4';

    // Header
    const header = document.createElement('div');
    header.className = 'text-center mb-4';
    header.innerHTML = `
        <h1 class="text-3xl font-bold">${userData.fullName}</h1>
        <p>${userData.email} | ${userData.phone}</p>
    `;
    container.appendChild(header);

    // Meta
    const meta = document.createElement('p');
    meta.className = 'text-sm italic text-gray-500 mb-4';
    meta.textContent = `${userData.region} • ${userData.audience} • Plan: ${getState('plan').toUpperCase()}`;
    container.appendChild(meta);

    // Summary
    if (userData.summary) {
        const summary = document.createElement('p');
        summary.className = 'mb-4';
        summary.textContent = userData.summary;
        container.appendChild(summary);
    }

    // Sections from template
    if (template?.sections) {
        template.sections.forEach(sec => {
            const secDiv = document.createElement('div');
            secDiv.className = 'mb-3';
            const title = document.createElement('h3');
            title.className = 'font-semibold text-lg';
            title.textContent = sec.title;
            secDiv.appendChild(title);

            sec.items.forEach(item => {
                const p = document.createElement('p');
                p.className = 'ml-2';
                p.textContent = item;
                secDiv.appendChild(p);
            });

            container.appendChild(secDiv);
        });
    }

    preview.appendChild(container);
}