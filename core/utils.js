export function hashString(str){
    let hash = 0, i, chr;
    if(str.length === 0) return hash.toString();
    for(i=0;i<str.length;i++){
        chr = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + chr;
        hash |= 0; // Convert to 32bit int
    }
    return hash.toString();
}

export function debounce(fn, delay=300){
    let timer;
    return function(...args){
        clearTimeout(timer);
        timer = setTimeout(()=>fn.apply(this,args), delay);
    }
}