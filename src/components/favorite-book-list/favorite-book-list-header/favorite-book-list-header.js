import './favorite-book-list-header.css'

export function FavoriteBookListHeader(count) {
    const header = document.createElement('div');
    header.className = 'favorite-book-list-header';

    header.innerHTML = `
        <h2>
            Favorites 
            <span class="fav-count">(${count})</span>
        </h2>
    `;

    return header;
}