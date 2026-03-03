// Core state.js — manages plan, user data, selected template, etc.
export const state = {
    plan: 'basic', // default, can be 'basic' or 'premium'
    userData: {},  // user input data
    template: null, // loaded template JSON
    clusters: [],   // loaded clusters
    audiences: []   // loaded audiences
};

// Update state safely
export function updateState(key, value) {
    state[key] = value;
}

// Get state safely
export function getState(key) {
    return state[key];
}