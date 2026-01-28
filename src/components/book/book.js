import './Book.css';
import { actions, selectors } from '../../store.js';
import { effect } from '../../utils/signal.js';

export function Book(book) {
    const card = document.createElement('div');
    card.className = 'book-card';

    const coverUrl = book.cover_i
        ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
        : null;

    // optimized load of the cover
    const imageHtml = coverUrl
        ? `<img 
            src="${coverUrl}" 
            alt="${book.title}" 
            class="book-cover" 
            loading="lazy" 
            onload="this.classList.add('loaded')"
           >`
        : `<div class="book-placeholder"><span>No Cover</span></div>`;

    card.innerHTML = `
        <div class="book-card-header">
            ${imageHtml}
            <button class="btn-favorite" title="Toggle Favorite">
                ♥
            </button>
        </div>
        <div class="book-card-body">
            <h3 class="book-title" title="${book.title}">
                ${book.title || 'Unknown'}
            </h3>
            <p class="book-author">
                ${book.author_name?.[0] || 'Unknown'}
            </p>
            <span class="book-year">
                ${book.first_publish_year || ''}
            </span>
        </div>
    `;

    const btn = card.querySelector('.btn-favorite');

    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        actions.toggleFavorite(book);
    });

    effect(() => {
        const favoriteBooks = selectors.favoriteBooks();
        const isFavoriteBook = favoriteBooks.some(b => b.key === book.key);

        if (isFavoriteBook) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    return card;
}