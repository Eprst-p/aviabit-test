
export const getYearFromIso = (dateInIso: string) => {
    const date = new Date(dateInIso);
    return date.getFullYear();
}

export const getMonthFromIso = (dateInIso: string) => {
    const date = new Date(dateInIso);
    return date.getMonth();
}

export const getDayFromIso = (dateInIso: string) => {
    const date = new Date(dateInIso);
    return date.getDate();
}
