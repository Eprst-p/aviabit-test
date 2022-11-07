import {createSlice} from '@reduxjs/toolkit';
import {NameSpace} from '../../settings/name-space';
import {InterfaceProcess} from '../../types/state';
import {SortOrder} from "../../settings/sort-order";

const initialState: InterfaceProcess = {
   sortOrder: SortOrder.Asc,
   year: 0,
};

export const interfaceProcess = createSlice({
  name: NameSpace.Interface,
  initialState,
  reducers: {
    changeSortOrder: (state, {payload}) => {state.sortOrder = payload;},
    changeYear: (state, {payload}) => {state.year = payload;},
  },
});

export const {changeSortOrder, changeYear} = interfaceProcess.actions;
