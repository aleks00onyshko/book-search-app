import {signal} from "./utils/signal.js";
import {addFavoriteBook, getFavoriteBooks, getTheme, removeFavoriteBook, setTheme} from "./utils/storage.js";
import {searchBooks} from "./utils/api.js";

export const state = {
    books: signal([]),
    authors: signal([]),
    favoriteBooks: signal(getFavoriteBooks()),
    authorFilter: signal([]),
    searchQuery: signal(''),
    loading: signal(false),
    error: signal(null),
    theme: signal(getTheme()),
}

export const selectors = {
    authors: () => state.authors(),
    books: () => state.books(),
    filteredBooks: () => {
        const books = state.books();
        const activeFilters = state.authorFilter();

        if (activeFilters.length === 0) {
            return books;
        }

        return books.filter(book =>
            book.author_name &&
            book.author_name.some(author => activeFilters.includes(author))
        );
    },
    activeFilter: () => state.authorFilter(),
    loading: () => state.loading(),
    error: () => state.error(),
    theme: () => state.theme(),
    favoriteBooks: () => state.favoriteBooks(),
    searchQuery: () => state.searchQuery(),
}

export const actions = {
    setBooks(books) {
        const authorsSet = new Set();

        state.books.set([...books])
        state.authorFilter.set([]);

        books.forEach(book => {
            if (book.author_name) book.author_name.forEach(a => authorsSet.add(a));
        });

        state.authors.set(Array.from(authorsSet).sort());
    },
    setSearchQuery(query) {
        state.searchQuery.set(query);
    },
    changeAuthorFilter(newFilterArray) {
        state.authorFilter.set(newFilterArray);
    },
    setLoading(loading) {
        state.loading.set(loading)
    },
    setError(error) {
        state.error.set(error)
    },
    toggleFavorite(targetBook) {
        const currentFavoriteBooks = getFavoriteBooks();

        if(currentFavoriteBooks.some(book => targetBook.key === book.key)) {
            state.favoriteBooks.set(removeFavoriteBook(targetBook));
        } else {
            state.favoriteBooks.set(addFavoriteBook(targetBook));
        }
    },
    toggleTheme() {
        const currentTheme = state.theme();
        const nextTheme = currentTheme === 'light' ? 'dark' : 'light';

        state.theme.set(nextTheme);

        setTheme(nextTheme);
    },
    async performSearch(query) {
        actions.setSearchQuery(query);

        if (!query) {
            actions.setBooks([]);
            actions.setError(null);
            actions.setLoading(false);
            return;
        }

        actions.setLoading(true);
        actions.setError(null);

        try {
            const books = await searchBooks(query);

            actions.setBooks(books);
        } catch (err) {
            actions.setError(err.message);
            actions.setBooks([]);
        } finally {
            actions.setLoading(false);
        }
    }
}