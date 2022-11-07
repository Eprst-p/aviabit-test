import {createSlice} from '@reduxjs/toolkit';
import {NameSpace} from '../../settings/name-space';
import {DataProcess} from '../../types/state';

const initialState: DataProcess = {
    allFlights: [],
};

export const dataProcess = createSlice({
    name: NameSpace.Data,
    initialState,
    reducers: {
        loadFlights: (state, {payload}) => {state.allFlights = payload},
    },
});

export const {loadFlights} = dataProcess.actions;
