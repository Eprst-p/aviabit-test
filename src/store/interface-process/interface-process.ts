import {createSlice} from '@reduxjs/toolkit';
import {NameSpace} from '../../settings/name-space';
import {InterfaceProcess} from '../../types/state';
import {SortOrder} from "../../settings/sort-order";

const initialState: InterfaceProcess = {
   sortOrder: SortOrder.Asc,
    workTimeTypeFilter: undefined,
    planeTypeFilter: undefined,
};

export const interfaceProcess = createSlice({
  name: NameSpace.Interface,
  initialState,
  reducers: {
    changeSortOrder: (state, {payload}) => {state.sortOrder = payload;},
    changeWorkTimeFilter: (state, {payload}) => {state.workTimeTypeFilter = payload;},
    changePlaneTypeFilter: (state, {payload}) => {state.planeTypeFilter = payload;},
  },
});

export const {changeSortOrder, changeWorkTimeFilter, changePlaneTypeFilter} = interfaceProcess.actions;
