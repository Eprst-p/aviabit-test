import {State} from '../types/state';
import {createSelector} from "reselect";
import {PeriodName} from "../settings/period-name";
import {monthNames} from "../settings/months-names";

//data-process
export const getAllFlights = (state:State) => state.DATA.allFlights;
export const getFlightsToShow = (state:State) => state.DATA.flightsToShow;
export const getShowedPeriod = (state:State) => state.DATA.showedPeriod;
export const getChosenYear = (state:State) => state.DATA.chosenYear;
export const getChosenMonth = (state:State) => state.DATA.chosenMonth;
export const getChosenDay = (state:State) => state.DATA.chosenDay;

export const getFlightsPerYear = createSelector(getAllFlights, getChosenYear, (flights, year) => {
    return flights.filter((flight)=> {
        const flightDate = new Date(flight.dateFlight);
        return  flightDate.getFullYear() === year;
    })
});
export const getFlightsPerMonth = createSelector(getFlightsPerYear, getChosenMonth, (flights, month) => {
    return flights.filter((flight)=> {
        const flightDate = new Date(flight.dateFlight);
        return  flightDate.getMonth() === month;
    })
});
export const getFlightsPerDay = createSelector(getFlightsPerMonth, getChosenDay, (flights, day) => {
    return flights.filter((flight)=> {
        const flightDate = new Date(flight.dateFlight);
        return  flightDate.getDate() === day;
    })
});
export const getPeriodNames = createSelector(getFlightsToShow, getShowedPeriod, (flights, showedPeriod) => {
    if (showedPeriod === PeriodName.Day) {
        return flights.map((flight) => flight.flight);
    }
    const uniqueNames = new Set<string>();
    flights.forEach(flight => {
        const flightDate = new Date(flight.dateFlight);
        let name:string = '';
        switch (showedPeriod) {
            case PeriodName.AllYears:
                name = `${flightDate.getFullYear()}`;
                break;
            case PeriodName.Year:
                name = `${flightDate.getMonth()}`;
                break;
            case PeriodName.Month:
                name = `${flightDate.getDate()}`;
                break;
        }
        uniqueNames.add(name);
    });
    return Array.from(uniqueNames);
});



//interface-process
export const getSortOrder = (state:State) => state.INTERFACE.sortOrder;
export const getPeriodTitleName = createSelector(getShowedPeriod, getChosenYear, getChosenMonth, getChosenDay, (showedPeriod, year, month, day) => {
    const yearTitle = year ? `${year}` : '';
    const monthTitle = month ? `${monthNames[month]}` : '';
    const dayTitle = day ? `${day} число` : '';
    return showedPeriod === PeriodName.AllYears ? 'все года' : `${yearTitle} ${monthTitle} ${dayTitle}`;
});
