import {createSlice} from '@reduxjs/toolkit';
import {NameSpace} from '../../settings/name-space';
import {DataProcess} from '../../types/state';
import {PeriodName} from "../../settings/period-name";

const initialState: DataProcess = {
    allFlights: [],
    chosenSummaryPeriod: PeriodName.AllYears,
    summaryPeriodValue: 0,
    flightsInAbovePeriod: [],
};

export const dataProcess = createSlice({
    name: NameSpace.Data,
    initialState,
    reducers: {
        loadFlights: (state, {payload}) => {state.allFlights = payload},
        changeSummaryPeriod: (state, {payload}) => {state.chosenSummaryPeriod = payload},
        changeSummaryPeriodValue: (state, {payload}) => {state.summaryPeriodValue = payload},
        changeFlightsInAbovePeriod: (state, {payload}) => {state.flightsInAbovePeriod = payload},
    },
});

export const {loadFlights, changeSummaryPeriod, changeSummaryPeriodValue, changeFlightsInAbovePeriod} = dataProcess.actions;
