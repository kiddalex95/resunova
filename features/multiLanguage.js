export const supportedLanguages=['en','fr','es','de','zh'];
export function translateResume(userData,template,lang){
    if(!supportedLanguages.includes(lang)) return {userData,template};
    const translations={fr:{'Experience':'Expérience','Skills':'Compétences','Achievements':'Réalisations'},
                        es:{'Experience':'Experiencia','Skills':'Habilidades','Achievements':'Logros'},
                        de:{'Experience':'Erfahrung','Skills':'Fähigkeiten','Achievements':'Erfolge'},
                        zh:{'Experience':'经验','Skills':'技能','Achievements':'成就'}};
    const tMap=translations[lang];
    const translatedTemplate={...template};
    translatedTemplate.sections=template.sections.map(sec=>({title:tMap[sec.title]||sec.title,items:sec.items}));
    return {userData,template:translatedTemplate};
}