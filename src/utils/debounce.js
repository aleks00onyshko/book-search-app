export function debounce(func, delay) {
    let timeout;

    const debounced = function (...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };

        clearTimeout(timeout);
        timeout = setTimeout(later, delay);
    };

    debounced.cancel = () => {
        clearTimeout(timeout);
    };

    return debounced;
}