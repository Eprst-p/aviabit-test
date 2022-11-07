import {flights} from "../mocks/create-flights";

export const getFlightsPerYear = (year:number) => {
    return flights.filter((flight) => {
        const flightDate = new Date(flight.dateFlight);
        const currentYear = flightDate.getFullYear();
        return currentYear === year;
    })
}
