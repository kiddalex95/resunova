export function renderBasicFeatures(data, previewEl) {
    // Example: Add skill bars container if missing
    if(!previewEl.querySelector('.skills-container')){
        const div = document.createElement('div');
        div.className = 'skills-container';
        previewEl.appendChild(div);
    }
    // Additional basic logic can go here
}