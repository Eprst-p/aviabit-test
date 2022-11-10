import {FlightType} from "../types/flight-type";
import {PeriodName} from "./period-name";


export const getFlightsPerPeriod = (enterFlightsArr: FlightType[], period: number, periodName: PeriodName) => {
    return enterFlightsArr.filter((flight) => {
        const flightDate = new Date(flight.dateFlight);
        let currentPeriod = 0;
        switch (periodName) {
            case PeriodName.Year:
                currentPeriod = flightDate.getFullYear();
                break;
            case PeriodName.Month:
                currentPeriod = flightDate.getMonth();
                break;
            case PeriodName.Day:
                currentPeriod = flightDate.getDate();
                break;
        }
        return currentPeriod === period;
    });
}
