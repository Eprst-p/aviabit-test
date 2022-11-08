import {FlightType} from "../types/flight-type";

export const getUniqueMonths = (flightsPerYear: FlightType[]) => {
    const uniqueMonths = new Set<number>();
    flightsPerYear.forEach(flight => {
        const flightDate = new Date(flight.dateFlight);
        const month = flightDate.getMonth();
        uniqueMonths.add(month);
    });
    return Array.from(uniqueMonths);
}
