
export const convertTime = (seconds:number) => {
    const Allminutes = Math.floor(seconds / 60);
    const hours = Math.floor(Allminutes / 60);
    const minutes = Allminutes % 60;
    return `${hours}ч ${minutes}мин`;
}
