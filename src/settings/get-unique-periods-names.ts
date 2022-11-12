import {FlightType} from "../types/flight-type";
import {PeriodName} from "./period-name";

export const getUniquePeriodsNames = (flights: FlightType[], chosenPeriod: PeriodName) => {
    const uniqueNames = new Set<string>();
    flights.forEach(flight => {
        const flightDate = new Date(flight.dateFlight);
        let name:string = '';
        switch (chosenPeriod) {
            case PeriodName.AllYears:
                name = `${flightDate.getFullYear()}`;
                break;
            case PeriodName.Year:
                name = `${flightDate.getMonth()}`;
                break;
            case PeriodName.Month:
                name = `${flightDate.getDate()}`;
                break;
            case PeriodName.Day:
                name = flight.flight;
                break;
        }
        uniqueNames.add(name);
    });
    return Array.from(uniqueNames);
}
