import {createSlice} from '@reduxjs/toolkit';
import {NameSpace} from '../../settings/name-space';
import {DataProcess} from '../../types/state';
import {ShowedCardsPeriods} from "../../settings/showed-cards-periods";

const initialState: DataProcess = {
    allFlights: [],
    flightsToShow: [],
    showedCardsPeriods: ShowedCardsPeriods.Years,
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
        changeShowedCardsPeriod: (state, {payload}) => {state.showedCardsPeriods = payload},
        changeChosenYear: (state, {payload}) => {state.chosenYear = payload},
        changeChosenMonth: (state, {payload}) => {state.chosenMonth = payload},
        changeChosenDay: (state, {payload}) => {state.chosenDay = payload},
    },
});

export const {loadFlights, changeFlightsToShow, changeShowedCardsPeriod, changeChosenYear, changeChosenMonth, changeChosenDay } = dataProcess.actions;
