import {FlightType} from "../types/flight-type";
import {PeriodName} from "./PeriodName";
import {PeriodData} from "../types/period-data";
import {getDayFromIso, getMonthFromIso, getYearFromIso} from "./getDateFromIso";

export const setPeriodDataForBreadCrumbs = (flight:FlightType, periodName:PeriodName) => {
    const breadCrumbsData:PeriodData = {
        year: undefined,
        month: undefined,
        day: undefined
    }
    const flightYear = getYearFromIso(flight.dateFlight);
    const flightMonth = getMonthFromIso(flight.dateFlight);
    const flightDay = getDayFromIso(flight.dateFlight);

    switch (periodName) {
        case PeriodName.Month:
            breadCrumbsData.year = flightYear;
            break;
        case PeriodName.Day:
            breadCrumbsData.year = flightYear;
            breadCrumbsData.month = flightMonth;
            break;
        case PeriodName.SingleFlight:
            breadCrumbsData.year = flightYear;
            breadCrumbsData.month = flightMonth;
            breadCrumbsData.day = flightDay;
            break;
    }

    return breadCrumbsData;
};
