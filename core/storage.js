export function saveData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

export function loadData(key) {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : null;
}