import {createSlice} from '@reduxjs/toolkit';
import {NameSpace} from '../../settings/name-space';
import {InterfaceProcess} from '../../types/state';
import {SortOrder} from "../../settings/sort-order";

const initialState: InterfaceProcess = {
   sortOrder: SortOrder.Asc,
    workTimeTypeFilter: undefined,
    planeTypeFilter: undefined,
    sideNumberFilter: undefined,
    takeOffAirportFilter: undefined,
    landingAirportFilter: undefined,
    startDateFilter: undefined,
    endDateFilter: undefined,
};

export const interfaceProcess = createSlice({
  name: NameSpace.Interface,
  initialState,
  reducers: {
    changeSortOrder: (state, {payload}) => {state.sortOrder = payload;},
    changeWorkTimeFilter: (state, {payload}) => {state.workTimeTypeFilter = payload;},
    changePlaneTypeFilter: (state, {payload}) => {state.planeTypeFilter = payload;},
    changeSideNumberFilter: (state, {payload}) => {state.sideNumberFilter = payload;},
    changeTakeOffAirportFilter: (state, {payload}) => {state.takeOffAirportFilter = payload;},
    changeLandingAirportFilter: (state, {payload}) => {state.landingAirportFilter = payload;},
    changeStartDateFilter: (state, {payload}) => {state.startDateFilter = payload;},
    changeEndDateFilter: (state, {payload}) => {state.endDateFilter = payload;},
  },
});

export const {
    changeSortOrder,
    changeWorkTimeFilter,
    changePlaneTypeFilter,
    changeSideNumberFilter,
    changeTakeOffAirportFilter,
    changeLandingAirportFilter,
    changeStartDateFilter,
    changeEndDateFilter,
} = interfaceProcess.actions;
