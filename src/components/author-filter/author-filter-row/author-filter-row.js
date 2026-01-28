export function AuthorFilterRow(author, isChecked, onChange) {
    const row = document.createElement('label');
    row.className = 'filter-row';

    const input = document.createElement('input');
    input.type = 'checkbox';
    input.checked = isChecked;

    input.addEventListener('change', (e) => {
        onChange(e.target.checked);
    });

    const span = document.createElement('span');
    span.textContent = author;

    row.append(input, span);

    return row;
}