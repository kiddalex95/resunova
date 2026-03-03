export function analyzeResumeKeywords(userData, template) {
    const keywords = ['Leadership','Management','JavaScript','Python','Project','Innovation','Communication','Teamwork','Problem Solving','Excel','Marketing'];
    const text = [userData.fullName,userData.summary,...(template.sections?.flatMap(sec=>sec.items)||[])].join(' ').toLowerCase();
    let score = 0; keywords.forEach(word=>{ if(text.includes(word.toLowerCase())) score+=1; });
    return {score,maxScore:keywords.length,percentage:Math.round((score/keywords.length)*100),summary:`Your resume matches ${Math.round((score/keywords.length)*100)}% of common ATS keywords.`};
}