import './search.css';
import { debounce } from "../../utils/debounce.js";

export function Search(onSearch) {
    const container = document.createElement('div');
    container.className = 'search-control';

    container.innerHTML = `
        <form class="search-form">
            <input 
                type="text" 
                class="search-input" 
                placeholder="Search for books (e.g. 'Cyberpunk')..." 
                required
            >
        </form>
    `;

    const form = container.querySelector('.search-form');
    const input = container.querySelector('.search-input');

    const debouncedSearch = debounce((query) => {
        onSearch(query);
    }, 500);

    input.addEventListener('input', (e) => {
        const query = e.target.value.trim();

        if (query.length > 0) {
            debouncedSearch(query);
        } else {
            debouncedSearch.cancel();
            onSearch('');
        }
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Cancel pending debounce to avoid double-search
        debouncedSearch.cancel();

        const query = input.value.trim();
        onSearch(query);
    });

    return container;
}