import {FlightType} from "../types/flight-type";
import {ShowedCardsPeriods} from "./showed-cards-periods";
import {PeriodName} from "./PeriodName";


export const getFlightsPerPeriod = (enterFlightsArr: FlightType[], period: number, periodName: PeriodName) => {
    return enterFlightsArr.filter((flight) => {
        const flightDate = new Date(flight.dateFlight);
        let currentPeriod = 0;
        switch (periodName) {
            // case PeriodName.Year:
            //     return enterFlightsArr;
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
