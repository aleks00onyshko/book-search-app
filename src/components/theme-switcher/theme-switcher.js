import './theme-switcher.css'

import {effect} from "../../utils/signal.js";
import {actions, selectors} from "../../store.js";

export function ThemeSwitcher() {
    const label = document.createElement('label');
    label.className = 'theme-switcher';
    label.title = "Toggle Theme";

    const input = document.createElement('input');
    input.type = 'checkbox';

    const slider = document.createElement('span');
    slider.className = 'slider round';

    effect(() => {
        input.checked = selectors.theme() === 'dark';
    });

    input.addEventListener('change', () => {
        actions.toggleTheme();
    });

    label.append(input, slider);

    return label;
}