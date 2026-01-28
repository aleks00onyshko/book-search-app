const BOOK_APP_KEY = 'favorite_books';
const THEME_KEY = 'theme';

// favorite books part
export function getFavoriteBooks() {
    try {
        const storedFavoriteBooks = localStorage.getItem(BOOK_APP_KEY);

        return storedFavoriteBooks ? JSON.parse(storedFavoriteBooks) : [];
    } catch (err) {
        console.warn('Could not retrieve favorite books frm storage:', err);
        return []
    }
}

export function addFavoriteBook(newBook) {
    const currentFavoriteBooks = getFavoriteBooks();

    if(currentFavoriteBooks.some(book => book.key === newBook.key)) {
        return currentFavoriteBooks;
    }

    const updatedFavoriteBooks = [...currentFavoriteBooks, newBook];

    localStorage.setItem(BOOK_APP_KEY, JSON.stringify(updatedFavoriteBooks));

    return updatedFavoriteBooks;
}

export function removeFavoriteBook(targetBook) {
    const currentFavoriteBooks = getFavoriteBooks();
    const updatedFavoriteBooks = currentFavoriteBooks.filter(book => book.key !== targetBook.key);

    localStorage.setItem(BOOK_APP_KEY, JSON.stringify(updatedFavoriteBooks));

    return updatedFavoriteBooks;
}

// theme management
export function getTheme() {
    return localStorage.getItem(THEME_KEY) || 'dark';
}

export function setTheme(theme) {
    localStorage.setItem(THEME_KEY, theme);
}