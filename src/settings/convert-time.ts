
export const convertTime = (seconds:number) => {
    const allMinutes = Math.floor(seconds / 60);
    const hours = Math.floor(allMinutes / 60);
    const minutes = allMinutes % 60;
    return `${hours}ч ${minutes}мин`;
}
