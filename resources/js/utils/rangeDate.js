export function rangeDate(startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const diffInMs = end - start;

    const weeks = Math.floor(diffInMs / (7 * 24 * 60 * 60 * 1000));

    const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());

    
    return `${months} мес. (${weeks > 0 ? weeks + 'нед.': null})`;
}