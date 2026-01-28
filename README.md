# 📚 Reactive Book Search (Vanilla JS)

## 🚀 Key Features

* **⚡ Reactive UI:** Updates instantly based on state changes using a custom Signal implementation.
* **🔍 Smart Search:** Real-time search with **Debouncing** (500ms) to minimize API calls.
* **🌪️ Dynamic Filtering:** Client-side filtering by Author that updates as you search.
* **🌗 Theme System:** Dark/Light mode support with persistence.
* **❤️ Favorites:** Save books to your local storage.

---

## !!! "Note": Custom Reactivity System

The core of this application is a lightweight, dependency-free reactivity library found in `src/utils/signal.js`.

### How it Works
I introduced Angular-like signal/effects system
1.  **Signals (`signal(value)`)**: Wrappers around values that notify listeners when they change.
2.  **Effects (`effect(() => {})`)**: Functions that automatically track which signals they use.

> **Curious how it works?**
> I wrote a detailed breakdown of how this system works internally on dev.to.
> 📖 **Read the article:** [Reactive Library in 60 Lines of Code](https://dev.to/aleks00onyshko/reactive-library-in-60-lines-of-code-57a8)

---

## 🏗️ Architecture & State Management

The application follows a unidirectional data flow pattern, similar to Ngrx signal store, but simplified a little.

### The Store (`src/store.js`)
All application state lives in a single source of truth.
* **State:** Private signals holding the raw data (e.g., `books`, `searchQuery`, `theme`).
* **Selectors:** Public functions to access data. They encapsulate logic (e.g., `filteredBooks` automatically derives the result based on the `books` and `filter` signals).
* **Actions:** The *only* way to modify state (e.g., `setBooks`, `toggleFavorite`).


> **Note**
> Important to notice, that I didn't implement `computed()` functionality, just didn't want to overcomplicate things

### Components
Introduced components which are just simple functions that render html. Just found it simpler then writing procedural code
1.  **Read State:** They subscribe to `selectors` inside an `effect()`.
2.  **Render:** They rebuild only their specific DOM subtree when that `effect()` triggers.
3.  **Interact:** They delegate events to **Actions**, which updated the `store` -> `selectors` -> `effect()` -> `UI rerenders`.

**Example Flow:**
`User types` → `Action (setQuery)` → `Signal Update` → `Effect Triggers` → `BookList Re-renders`

---

## 🛠️ Setup & Installation

1. **Install dependencies**
    ```bash
    npm install
    ```

2. **Run the development server**
    ```bash
    npm run dev
    ```

3. **Open in Browser**
    Typically runs at `http://localhost:5173`

---

## 📂 Project Structure

```text
src/
├── components/        # UI Components (BookList, Search, Header)
├── utils/
│   ├── signal.js      # ⚡ Reactivity implementaion
│   ├── storage.js     # LocalStorage wrappers
│   ├── api.js         # API fetchers
│   └── debounce.js    # self explanatory
├── store.js           # Global State Management
├── main.js            # Entry Point (Bootstrapping)
└── style.css          # Global Styles

Also, each component imports it's corresponding .css file, so it is included in the bundle
```

## 📂 Theming

```text
I have implemented theme switching, aka in Angular Material

:root {
  /* --- Palette --- */
  --color-primary: #10b981;       /* Emerald Green */
  --color-primary-dark: #059669;
  --color-warn: #ef4444;          /* Red */

  /* --- Backgrounds --- */
  --bg-body: #f3f4f6;             /* Light Gray Background */
  --bg-surface: #ffffff;          /* White Cards */
  --bg-shimmer-1: #f3f4f6;        /* Skeleton light */
  --bg-shimmer-2: #e5e5e5;        /* Skeleton dark */

  /* --- Text --- */
  --text-main: #1f2937;           /* Dark Gray */
  --text-muted: #6b7280;          /* Medium Gray */
  --icon-inactive: #d1d1d1;       /* Gray Heart */

  /* --- Borders & UI Lines --- */
  --border-color: #e5e7eb;
  --border-focus: rgba(16, 185, 129, 0.15); /* Primary color low opacity */

  /* --- Spacing --- */
  --radius: 0.8rem;
  --radius-pill: 1.2rem;
  --radius-circle: 50%;

  /* --- Shadows --- */
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-card: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  --shadow-hover: 0 0.8rem 1.6rem rgba(0,0,0,0.1);
  --shadow-btn: 0 0.2rem 0.6rem rgba(0,0,0,0.15);

  /* --- Transitions --- */
  --trans-fast: 0.2s ease;
  --trans-med: 0.3s ease;
  --trans-slow: 0.4s ease-out;
  --bounce: cubic-bezier(0.175, 0.885, 0.32, 1.275);

  /* --- Typography --- */
  --font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
  font-family: var(--font-family), serif;
  font-size: 62.5%; /* 1rem = 10px */
}

I can switch it by setting corresponding attribute on html element

document.documentElement.setAttribute('data-theme', selectors.theme());
```

