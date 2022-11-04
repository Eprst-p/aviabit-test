import {FlightType} from '../types/flight-type';
import {getRandomElement, getRandomPositiveNumber} from "./randomaizers";
import {fligthNumbers, planeNumber, planeTypes} from "./names";
import {airports} from "./airports";
import {Airport} from "../types/airport";


const createFlight = () => {
    const timeFlight = getRandomPositiveNumber(15000, 45000);
    const takeoffAirport: Airport = getRandomElement(airports);
    const landingAirport = () => {
        let airport: Airport = getRandomElement(airports);
        while (airport.name === takeoffAirport.name) {
            airport = getRandomElement(airports);
        }
        return airport;
    }
    const generateDate = () => {
        const date = new Date();
        date.setFullYear(date.getFullYear()  - 5 + getRandomPositiveNumber(0, 10));
        date.setMonth(date.getMonth() + getRandomPositiveNumber(0, 15));
        date.setDate(date.getDate() + getRandomPositiveNumber(5, 15));
        date.setHours(date.getHours() + getRandomPositiveNumber(0, 24));
        date.setMinutes(date.getMinutes() + getRandomPositiveNumber(0, 60));
        date.setSeconds(date.getSeconds() + getRandomPositiveNumber(0, 60));
        date.setMilliseconds(date.getMilliseconds() + getRandomPositiveNumber(0, 1000));
        return date;
    }
    const date = generateDate();
    const defineFlightType = () => {
        const currentDate = new Date();
        return +(currentDate < date);
    }

    return ({
    dateFlight: date.toISOString(),
    flight: getRandomElement(fligthNumbers),
    plnType: getRandomElement(planeTypes),
    pln: getRandomElement(planeNumber),
    timeFlight: timeFlight,
    timeBlock: timeFlight + getRandomPositiveNumber(500, 1500),
    timeNight: Math.floor(timeFlight*0.45),
    timeBiologicalNight: timeFlight*0.45 + getRandomPositiveNumber(1000, 3000),
    timeWork: timeFlight + getRandomPositiveNumber(7500, 15000),
    type: defineFlightType(),
    takeoff: takeoffAirport,
    landing: landingAirport(),
    } as FlightType);
};

export const fligths = Array.from({length: 10}, () => createFlight());
