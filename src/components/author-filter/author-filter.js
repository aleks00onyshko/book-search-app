import './author-filter.css';
import { selectors, actions } from '../../store.js';
import { signal, effect } from '../../utils/signal.js';
import { AuthorFilterRow } from "./author-filter-row/author-filter-row.js";

export function AuthorFilter() {
    const { container, button, dropdown } = createLayout();
    const isOpen = signal(false);

    const toggleOpen = (forceState) => {
        if (button.disabled) return;

        isOpen.set(forceState !== undefined ? forceState : !isOpen());
    };

    setupEventListeners(container, button, toggleOpen, isOpen);

    effect(() => renderToggleState(button, dropdown, isOpen()));

    effect(() => {
        const authors = selectors.authors();
        const activeFilters = selectors.activeFilter();
        const hasAuthors = authors.length > 0;

        updateDisabledState(button, hasAuthors);

        if (!hasAuthors) {
            if (isOpen()) isOpen.set(false);
            return;
        }

        updateTriggerLabel(button, activeFilters);
        renderDropdownContent(dropdown, authors, activeFilters);
    });

    return container;
}

// Helper Functions
function createLayout() {
    const container = document.createElement('div');
    container.className = 'filter-container';

    const button = document.createElement('button');
    button.className = 'filter-trigger';
    button.textContent = 'Filter by Author';

    const dropdown = document.createElement('div');
    dropdown.className = 'filter-dropdown';

    container.append(button, dropdown);

    return { container, button, dropdown };
}

function setupEventListeners(container, button, toggleFn, isOpenSignal) {
    button.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleFn();
    });

    document.addEventListener('click', (e) => {
        if (isOpenSignal() && !container.contains(e.target)) {
            toggleFn(false);
        }
    });
}

function renderToggleState(button, dropdown, isOpen) {
    if (isOpen) {
        button.classList.add('open');
        dropdown.classList.add('visible');
    } else {
        button.classList.remove('open');
        dropdown.classList.remove('visible');
    }
}

function updateDisabledState(button, hasAuthors) {
    if (!hasAuthors) {
        button.disabled = true;
        button.classList.add('disabled');
        button.textContent = 'Filter by Author';
    } else {
        button.disabled = false;
        button.classList.remove('disabled');
    }
}

function updateTriggerLabel(button, activeFilters) {
    const count = activeFilters.length;

    if (count === 0) {
        button.textContent = 'Filter by Author';
        button.classList.remove('active');
    } else {
        button.textContent = count === 1
            ? `Filter: ${activeFilters[0]}`
            : `Filter: ${count} authors selected`;
        button.classList.add('active');
    }
}

function renderDropdownContent(dropdown, authors, activeFilters) {
    dropdown.innerHTML = '';

    if (activeFilters.length > 0) {
        dropdown.appendChild(generateClearFiltersButton());
    }

    dropdown.append(...generateAuthorsRows(authors, activeFilters));
}

function generateAuthorsRows(authors, activeFilters) {
    return authors.map(author => {
        const isChecked = activeFilters.includes(author);

        return AuthorFilterRow(
            author,
            isChecked,
            (checked) => {
                const newFilters = checked
                    ? [...activeFilters, author]
                    : activeFilters.filter(a => a !== author);

                actions.changeAuthorFilter(newFilters);
            }
        );
    });
}

function generateClearFiltersButton() {
    const clearRow = document.createElement('div');
    clearRow.className = 'filter-row clear-row';
    clearRow.innerHTML = `<span>Clear Filters</span>`;
    clearRow.addEventListener('click', () => actions.changeAuthorFilter([]));

    return clearRow;
}