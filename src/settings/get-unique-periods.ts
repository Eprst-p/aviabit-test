import {FlightType} from "../types/flight-type";
import {PeriodName} from "./period-name";

export const getUniquePeriods = (flights: FlightType[], chosenPeriod: PeriodName) => {
    const uniquePeriods = new Set<number>();
    flights.forEach(flight => {
        const flightDate = new Date(flight.dateFlight);
        let period = 0;
        switch (chosenPeriod) {
            case PeriodName.Month:
                period = flightDate.getMonth();
                break;
            case PeriodName.Day:
                period = flightDate.getDate();
                break;
        }
        uniquePeriods.add(period);
    });
    return Array.from(uniquePeriods);
}
