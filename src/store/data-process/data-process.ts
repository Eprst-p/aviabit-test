import {createSlice} from '@reduxjs/toolkit';
import {NameSpace} from '../../settings/name-space';
import {DataProcess} from '../../types/state';
import {PeriodName} from "../../settings/period-name";

const initialState: DataProcess = {
    allFlights: [],
    flightsToShow: [],
    showedPeriod: PeriodName.AllYears,
    chosenYear: undefined,
    chosenMonth: undefined,
    chosenDay: undefined,
};

export const dataProcess = createSlice({
    name: NameSpace.Data,
    initialState,
    reducers: {
        loadFlights: (state, {payload}) => {state.allFlights = payload},
        changeFlightsToShow: (state, {payload}) => {state.flightsToShow = payload},
        changeShowedPeriod: (state, {payload}) => {state.showedPeriod = payload},
        changeChosenYear: (state, {payload}) => {state.chosenYear = payload},
        changeChosenMonth: (state, {payload}) => {state.chosenMonth = payload},
        changeChosenDay: (state, {payload}) => {state.chosenDay = payload},
    },
});

export const {loadFlights, changeFlightsToShow, changeShowedPeriod, changeChosenYear, changeChosenMonth, changeChosenDay } = dataProcess.actions;
