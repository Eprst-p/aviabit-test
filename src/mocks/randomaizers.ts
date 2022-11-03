export const getRandomPositiveNumber = (a: number, b: number) => {
    const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
    const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
    return Math.floor(Math.random() * (upper - lower + 1)) + lower;
}

export const getRandomElement = (array: any) => {
    return array[getRandomPositiveNumber(0, array.length-1)];
};
