export function renderProFeatures(data, previewEl, premiumPanel) {
    // ATS Keyword Analysis
    const keywords = ['JavaScript','Python','React','AI','Management','Leadership'];
    let matchCount = 0;
    const text = Object.values(data).join(' ').toLowerCase();
    keywords.forEach(kw => { if(text.includes(kw.toLowerCase())) matchCount++; });
    const score = Math.floor((matchCount/keywords.length)*100);
    premiumPanel.querySelector('#keywordScore').textContent = `ATS Match Score: ${score}%`;

    // Auto-generate cover letter
    const coverLetter = `Dear Hiring Manager,\n\nI am excited to apply for the ${data.audience} position. My skills in ${data.skills} and experience in ${data.experience} make me a strong candidate.\n\nSincerely,\n${data.fullName}`;
    premiumPanel.querySelector('#coverLetter').value = coverLetter;

    // Skill bars
    if(!previewEl.querySelector('.skills-container')){
        const div = document.createElement('div');
        div.className = 'skills-container';
        previewEl.appendChild(div);
    }
}