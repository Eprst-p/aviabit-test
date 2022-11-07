import {FlightType} from "./flight-type";
import {SortOrder} from "../settings/sort-order";
import {store} from "../store";

export type DataProcess = {
  allFlights: FlightType[];
};

export type InterfaceProcess = {
  sortOrder: SortOrder;
  year: number;
};

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
