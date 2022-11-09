import {State} from '../types/state';
import {createSelector} from "reselect";
import {FlightType} from "../types/flight-type";

export const getAllFlights = (state:State) => state.DATA.allFlights;
export const getUniqueYears = createSelector(getAllFlights, (flights: FlightType[]) => {
    const yearsSet = new Set<number>();
    flights.forEach(flight => {
        const flightDate = new Date(flight.dateFlight);
        const year = flightDate.getFullYear();
        yearsSet.add(year);
    });
    return Array.from(yearsSet);
});

export const getSortOrder = (state:State) => state.INTERFACE.sortOrder;
export const getYear = (state:State) => state.INTERFACE.year;
