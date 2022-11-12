
const sortAsc = (first:string, second:string) => {
    return +first - +second;
};

const sortDesc = (first:string, second:string) => {
    return +second - +first;
};

export {sortAsc, sortDesc};
