import './style.css';
import { Header } from './components/header/Header.js';
import { Search } from './components/search/Search.js';
import { searchBooks } from './utils/api.js';
import { actions, selectors } from './store.js';
import { effect } from './utils/signal.js';
import {BookList} from "./components/book-list/book-list.js";
import {FavoriteBookList} from "./components/favorite-book-list/favorite-book-list.js";
import {AuthorFilter} from "./components/author-filter/author-filter.js";


export function App() {
    // We use a Fragment to avoid unnecessary wrapper divs in the DOM
    const fragment = document.createDocumentFragment();

    fragment.append(Header());

    const controlsContainer = document.createElement('div');
    controlsContainer.className = 'container controls-row';

    const searchComponent = Search(actions.performSearch);
    const filterComponent = AuthorFilter();

    controlsContainer.append(searchComponent, filterComponent);
    fragment.append(controlsContainer);

    const contentGrid = document.createElement('div');
    contentGrid.className = 'container content-grid';

    const resultsArea = document.createElement('div');
    resultsArea.className = 'results-area';
    resultsArea.append(BookList());

    const favoritesArea = document.createElement('div');
    favoritesArea.className = 'favorites-area';
    favoritesArea.append(FavoriteBookList());

    contentGrid.append(resultsArea, favoritesArea);
    fragment.append(contentGrid);

    return fragment;
}

const appRoot = document.querySelector('#app');

effect(() => {
    document.documentElement.setAttribute('data-theme', selectors.theme());
});

appRoot.innerHTML = ''; // Ensure clean slate
appRoot.append(App());