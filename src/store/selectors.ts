import {State} from '../types/state';

export const getAllFlights = (state:State) => state.DATA.allFlights;
export const getChosenSummaryPeriod = (state:State) => state.DATA.chosenSummaryPeriod;
export const getSummaryStatsPeriodValue = (state:State) => state.DATA.summaryPeriodValue;
export const getFlightsInAbovePeriod = (state:State) => state.DATA.flightsInAbovePeriod;


export const getSortOrder = (state:State) => state.INTERFACE.sortOrder;
