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

//interface-process
export const getSortOrder = (state:State) => state.INTERFACE.sortOrder;
export const getPeriodTitleName = createSelector(getShowedPeriod, getChosenYear, getChosenMonth, getChosenDay, (showedPeriod, year, month, day) => {
    const yearTitle = year ? `${year}` : '';
    const monthTitle = month ? `${monthNames[month]}` : '';
    const dayTitle = day ? `${day} число` : '';
    return showedPeriod === PeriodName.AllYears ? 'все года' : `${yearTitle} ${monthTitle} ${dayTitle}`;
});
export const getWorkTypeFilter = (state:State) => state.INTERFACE.workTimeTypeFilter;
export const getPlaneTypeFilter = (state:State) => state.INTERFACE.planeTypeFilter;
export const getSideNumberFilter = (state:State) => state.INTERFACE.sideNumberFilter;
export const getTakeOffAirportFilter = (state:State) => state.INTERFACE.takeOffAirportFilter;
export const getLandingAirportFilter = (state:State) => state.INTERFACE.landingAirportFilter;

//filter
export const getFilteredFlights = createSelector(
    getAllFlights,
    getWorkTypeFilter,
    getPlaneTypeFilter,
    getSideNumberFilter,
    getTakeOffAirportFilter,
    getLandingAirportFilter,
        (allFlights,
         workType,
         planeType,
         sideNumber,
         takeOffAirport,
         landingAirport
        ) => {
            return allFlights.filter((flight) => {
                let workTypeFilter = true;
                let planeTypeFilter = true;
                let sideNumberFilter = true;
                let takeOffAirportFilter = true;
                let landingAirportFilter = true;

                if (workType !== undefined) {
                    workTypeFilter = flight.type === workType;
                }
                if (planeType) {
                    planeTypeFilter = flight.plnType === planeType
                }
                if (sideNumber) {
                    sideNumberFilter = flight.pln === sideNumber
                }
                if (takeOffAirport) {
                    takeOffAirportFilter = flight.takeoff.name === takeOffAirport
                }
                if (landingAirport) {
                    landingAirportFilter = flight.landing.name === landingAirport
                }
                return workTypeFilter && planeTypeFilter && sideNumberFilter && takeOffAirportFilter && landingAirportFilter;
            })
});


//getPerPeriod
export const getFlightsPerYear = createSelector(getFilteredFlights, getChosenYear, (flights, year) => {
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








