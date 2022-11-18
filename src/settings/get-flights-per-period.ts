import {FlightType} from "../types/flight-type";
import {PeriodName} from "./PeriodName";

export const getFlightsPerPeriod = (enterFlightsArr: FlightType[], period: number | string, periodName: PeriodName) => {
    return enterFlightsArr.filter((flight) => {
        const flightDate = new Date(flight.dateFlight);
        let currentPeriod:number | string = 0;
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
            case PeriodName.SingleFlight:
                currentPeriod = flight.flight;
                break;
        }
        return currentPeriod === period;
    });
}
