import {FlightType} from "../types/flight-type";
import {ShowedCardsPeriods} from "./showed-cards-periods";

export const getUniquePeriodsNames = (flights: FlightType[], chosenPeriod: ShowedCardsPeriods) => {
    const uniqueNames = new Set<string>();
    flights.forEach(flight => {
        const flightDate = new Date(flight.dateFlight);
        let name:string = '';
        switch (chosenPeriod) {
            case ShowedCardsPeriods.Years:
                name = `${flightDate.getFullYear()}`;
                break;
            case ShowedCardsPeriods.Months:
                name = `${flightDate.getMonth()}`;
                break;
            case ShowedCardsPeriods.Days:
                name = `${flightDate.getDate()}`;
                break;
            case ShowedCardsPeriods.SingleFlights:
                name = flight.flight;
                break;
        }
        uniqueNames.add(name);
    });
    return Array.from(uniqueNames);
}
