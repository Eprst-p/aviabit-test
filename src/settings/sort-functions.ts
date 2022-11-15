
const sortAsc = (first:string, second:string) => {
    return +first - +second;
};

const sortDesc = (first:string, second:string) => {
    return +second - +first;
};

const sortByISODate = (first:string, second:string) => {
    const firstDate = new Date(first);
    const secondDate = new Date(second);
    return +firstDate - +secondDate;
};

export {sortAsc, sortDesc, sortByISODate};
