const BASE_URL = 'https://openlibrary.org/search.json';
const COVER_URL = 'https://covers.openlibrary.org/b/id/';

export async function searchBooks(query = '') {
    if (!query || query.trim() === '') {
        return [];
    }

    const url = `${BASE_URL}?q=${encodeURIComponent(query)}`;

    try {
        const response = await fetch(url);

        if(!response.ok) {
            throw new Error(`Error during network request: ${response.statusText}`);
        }

        const data = await response.json();

        return data.docs ?? [];
    } catch (error) {
        throw error;
    }
}

export function getBookCoverUrl(coverId) {
    if (!coverId) return null;
    return `${COVER_URL}${coverId}.jpg`;
}