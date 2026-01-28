import './book-list.css';
import { selectors } from "../../store.js";
import { Book } from "../book/book.js";
import { effect } from "../../utils/signal.js";

export function BookList() {
    const container = document.createElement('div');
    container.className = 'book-list-container';

    effect(() => {
        const loading = selectors.loading();
        const error = selectors.error();
        const query = selectors.searchQuery();
        const filteredBooks = selectors.filteredBooks();
        const allBooksCount = selectors.books().length

        container.innerHTML = '';

        if (loading) {
            showLoading(container, query);
            return;
        }

        if (error) {
            showStatus(container, error, '⚠️');
            return;
        }

        if (!query) {
            showStatus(container, "Welcome! Type in the search bar to find books.", "📚");
            return;
        }

        if (allBooksCount === 0) {
            showStatus(container, `No books found for "${query}".`, "🔍");
            return;
        }

        if (filteredBooks.length === 0) {
            showStatus(container, "No books match your selected filters.", "🌪️");
            return;
        }

        showGrid(container, filteredBooks);
    });

    return container;
}

// helper functions
function showLoading(container, query) {
    container.innerHTML = `
        <div class="status-message">
            <div class="spinner"></div>
            <p>Searching for "${query}"...</p>
        </div>`;
}

function showStatus(container, message, icon = '') {
    container.innerHTML = `
        <div class="status-message">
            ${icon ? `<div class="status-icon">${icon}</div>` : ''}
            <p>${message}</p>
        </div>
    `;
}

function showGrid(container, books) {
    const grid = document.createElement('div');
    grid.className = 'book-grid';

    books.forEach(book => {
        grid.appendChild(Book(book));
    });

    container.appendChild(grid);
}