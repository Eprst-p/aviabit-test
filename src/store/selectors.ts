import {State} from '../types/state';
import {createSelector} from "reselect";
import {ShowedCardsPeriods} from "../settings/showed-cards-periods";
import {monthNames} from "../settings/months-names";
import {getDayFromIso, getMonthFromIso, getYearFromIso} from "../settings/getDateFromIso";

//data-process
export const getAllFlights = (state:State) => state.DATA.allFlights;
export const getFlightsToShow = (state:State) => state.DATA.flightsToShow;
export const getShowedCardsPeriods = (state:State) => state.DATA.showedCardsPeriods;
export const getChosenYear = (state:State) => state.DATA.chosenYear;
export const getChosenMonth = (state:State) => state.DATA.chosenMonth;
export const getChosenDay = (state:State) => state.DATA.chosenDay;

//interface-process
export const getSortOrder = (state:State) => state.INTERFACE.sortOrder;
export const getPeriodTitleName = createSelector(getShowedCardsPeriods, getChosenYear, getChosenMonth, getChosenDay, (showedPeriod, year, month, day) => {
    const yearTitle = year ? `${year}` : '';
    const monthTitle = month ? `${monthNames[month]}` : '';
    const dayTitle = day ? `${day} число` : '';
    return showedPeriod === ShowedCardsPeriods.Years ? 'все года' : `${yearTitle} ${monthTitle} ${dayTitle}`;
});
export const getWorkTypeFilter = (state:State) => state.INTERFACE.workTimeTypeFilter;
export const getPlaneTypeFilter = (state:State) => state.INTERFACE.planeTypeFilter;
export const getSideNumberFilter = (state:State) => state.INTERFACE.sideNumberFilter;
export const getTakeOffAirportFilter = (state:State) => state.INTERFACE.takeOffAirportFilter;
export const getLandingAirportFilter = (state:State) => state.INTERFACE.landingAirportFilter;
export const getStartDateFilter = (state:State) => state.INTERFACE.startDateFilter;
export const getEndDateFilter = (state:State) => state.INTERFACE.endDateFilter;
export const getSearchedFlight = (state:State) => state.INTERFACE.searchedFlight;

//alfa-filter
export const getFilteredFlights = createSelector(
    getAllFlights,
    getChosenYear,
    getChosenMonth,
    getChosenDay,
    getWorkTypeFilter,
    getPlaneTypeFilter,
    getSideNumberFilter,
    getTakeOffAirportFilter,
    getLandingAirportFilter,
    getStartDateFilter,
    getEndDateFilter,
    getSearchedFlight,
        (allFlights,
         year,
         month,
         day,
         workType,
         planeType,
         sideNumber,
         takeOffAirport,
         landingAirport,
         startDate,
         endDate,
         searchedFlight,
        ) => {
            return allFlights.filter((flight) => {
                let yearFilter = true;
                let monthFilter = true;
                let dayFilter = true;
                let workTypeFilter = true;
                let planeTypeFilter = true;
                let sideNumberFilter = true;
                let takeOffAirportFilter = true;
                let landingAirportFilter = true;
                let startDateFilter = true;
                let endDateFilter = true;
                let searchedFLightFilter = true;

                if (year !== undefined) {
                    const flightDate = new Date(flight.dateFlight);
                    yearFilter = flightDate.getFullYear() === year;
                }
                if (month !== undefined) {
                    const flightDate = new Date(flight.dateFlight);
                    monthFilter = flightDate.getMonth() === month;
                }
                if (day !== undefined) {
                    const flightDate = new Date(flight.dateFlight);
                    dayFilter = flightDate.getDate() === day;
                }
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
                if (startDate) {
                    const flightYear = getYearFromIso(flight.dateFlight);
                    const flatpickrYear = getYearFromIso(startDate);
                    const flightMonth = getMonthFromIso(flight.dateFlight);
                    const flatpickrMonth = getMonthFromIso(startDate);
                    const flightDay = getDayFromIso(flight.dateFlight);
                    const flatpickrDay = getDayFromIso(startDate);
                    const dateFlight = new Date(flightYear, flightMonth, flightDay);
                    const dateFlatPicker = new Date(flatpickrYear, flatpickrMonth, flatpickrDay);
                    startDateFilter = dateFlight >= dateFlatPicker;
                }
                if (endDate) {
                    const flightYear = getYearFromIso(flight.dateFlight);
                    const flatpickrYear = getYearFromIso(endDate);
                    const flightMonth = getMonthFromIso(flight.dateFlight);
                    const flatpickrMonth = getMonthFromIso(endDate);
                    const flightDay = getDayFromIso(flight.dateFlight);
                    const flatpickrDay = getDayFromIso(endDate);
                    const dateFlight = new Date(flightYear, flightMonth, flightDay);
                    const dateFlatPicker = new Date(flatpickrYear, flatpickrMonth, flatpickrDay);
                    endDateFilter = dateFlight <= dateFlatPicker;
                }
                if (searchedFlight) {
                    searchedFLightFilter = flight.flight === searchedFlight
                }

                return (
                    yearFilter &&
                    monthFilter &&
                    dayFilter &&
                    workTypeFilter &&
                    planeTypeFilter &&
                    sideNumberFilter &&
                    takeOffAirportFilter &&
                    landingAirportFilter &&
                    startDateFilter &&
                    endDateFilter &&
                    searchedFLightFilter
                );
            })
});


//reselectors
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

export const getPeriodNames = createSelector(getFilteredFlights, getShowedCardsPeriods, (flights, showedPeriod) => {
    if (showedPeriod === ShowedCardsPeriods.SingleFlights) {
        return flights.map((flight) => flight.flight);
    }
    const uniqueNames = new Set<string>();
    flights.forEach(flight => {
        const flightDate = new Date(flight.dateFlight);
        let name:string = '';
        switch (showedPeriod) {
            case ShowedCardsPeriods.Years:
                name = `${flightDate.getFullYear()}`;
                break;
            case ShowedCardsPeriods.Months:
                name = `${flightDate.getMonth()}`;
                break;
            case ShowedCardsPeriods.Days:
                name = `${flightDate.getDate()}`;
                break;
        }
        uniqueNames.add(name);
    });
    return Array.from(uniqueNames);
});

export const getFlightNames = createSelector(getAllFlights, (flights) => {
    return flights.map((flight)=> flight.flight);
});









