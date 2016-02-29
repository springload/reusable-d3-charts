export function humanNumber(num) {
    const parts = num.toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    return parts.join('.');
}

export const dollar = num => `$${num.toFixed(2)}`;

export function padNumber(num) {
    return `${num >= 0 && num <= 9 ? '0' : ''}${num}`;
}

export function monthName(monthNumber = (new Date()).getMonth()) {
    const names = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December',
    ];

    return names[monthNumber];
}
