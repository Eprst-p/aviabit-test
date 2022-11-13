import {FlightType} from "./flight-type";
import {SortOrder} from "../settings/sort-order";
import {store} from "../store";
import {PeriodName} from "../settings/period-name";

export type DataProcess = {
  allFlights: FlightType[];
  flightsToShow: FlightType[];
  showedPeriod: PeriodName;
  chosenYear: number | undefined;
  chosenMonth: number | undefined;
  chosenDay: number | undefined;
};

export type InterfaceProcess = {
  sortOrder: SortOrder;
};

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
