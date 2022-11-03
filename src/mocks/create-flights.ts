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
        date.setDate(date.getDate() + getRandomPositiveNumber(5, 15));
        date.setMonth(date.getMonth() - 6 + getRandomPositiveNumber(0, 15));
        return date.toISOString();
    }

    return ({
    dateFlight: generateDate(),
    flight: getRandomElement(fligthNumbers),
    plnType: getRandomElement(planeTypes),
    pln: getRandomElement(planeNumber),
    timeFlight: timeFlight,
    timeBlock: timeFlight + getRandomPositiveNumber(500, 1500),
    timeNight: Math.floor(timeFlight*0.45),
    timeBiologicalNight: timeFlight*0.45 + getRandomPositiveNumber(1000, 3000),
    timeWork: timeFlight + getRandomPositiveNumber(7500, 15000),
    type: getRandomPositiveNumber(0, 1),//сделать логику для сравнения с датой
    takeoff: takeoffAirport,
    landing: landingAirport(),
    } as FlightType);
};

export const fligths = Array.from({length: 10}, () => createFlight());
