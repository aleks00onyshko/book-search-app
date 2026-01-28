
import './favorite-book-list.css'
import { selectors } from "../../store.js";
import { effect } from "../../utils/signal.js";
import { Book } from "../book/book.js";
import { FavoriteBookListHeader } from "./favorite-book-list-header/favorite-book-list-header.js";

export function FavoriteBookList() {
    const container = document.createElement('aside');
    container.className = 'favorite-book-list';

    effect(() => {
        const books = selectors.favoriteBooks();

        container.innerHTML = '';

        container.appendChild(FavoriteBookListHeader(books.length));

        if (books.length === 0) {
            renderEmptyState(container);
        } else {
            renderBookList(container, books);
        }
    });

    return container;
}

// helper functions
function renderEmptyState(container) {
    const emptyState = document.createElement('div');
    emptyState.className = 'fav-empty';
    emptyState.textContent = 'No favorites yet.';

    container.appendChild(emptyState);
}

function renderBookList(container, books) {
    const list = document.createElement('div');
    list.className = 'fav-list';

    books.forEach(book => {
        list.appendChild(Book(book));
    });

    container.appendChild(list);
}