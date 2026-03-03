import { getState } from '../core/state.js';

export function getBasicTemplate() {
    return {
        sections: [
            { title: 'Experience', items: ['Add your experience here...'] }
        ]
    };
}

export function isBasicPlan() {
    return getState('plan') === 'basic';
}