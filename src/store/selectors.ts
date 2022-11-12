import {State} from '../types/state';
import {createSelector} from "reselect";

export const getAllFlights = (state:State) => state.DATA.allFlights;
export const getShowedPeriod = (state:State) => state.DATA.showedPeriod;
export const getChosenYear = (state:State) => state.DATA.chosenYear;
export const getChosenMonth = (state:State) => state.DATA.chosenMonth;
export const getChosenDay = (state:State) => state.DATA.chosenDay;

export const getFligthsPerYear = createSelector(getAllFlights, getChosenYear, (flights, year) => {
    return flights.filter((flight)=> {
        const flightDate = new Date(flight.dateFlight);
        return  flightDate.getFullYear() === year;
    })
});
export const getFligthsPerMonth = createSelector(getFligthsPerYear, getChosenMonth, (flights, month) => {
    return flights.filter((flight)=> {
        const flightDate = new Date(flight.dateFlight);
        return  flightDate.getMonth() === month;
    })
});
export const getFligthsPerDay = createSelector(getFligthsPerMonth, getChosenDay, (flights, day) => {
    return flights.filter((flight)=> {
        const flightDate = new Date(flight.dateFlight);
        return  flightDate.getDate() === day;
    })
});



export const getSortOrder = (state:State) => state.INTERFACE.sortOrder;
