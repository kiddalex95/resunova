import { getState } from '../core/state.js';

export function getPremiumTemplate() {
    return {
        sections: [
            { title: 'Experience', items: ['Add experience here...'] },
            { title: 'Skills', items: ['Add skills here...'] },
            { title: 'Achievements', items: ['Add achievements here...'] }
        ]
    };
}

export function isPremiumPlan() {
    return getState('plan') === 'premium';
}