import {FlightType} from "./flight-type";
import {SortOrder} from "../settings/sort-order";
import {store} from "../store";
import {ShowedCardsPeriods} from "../settings/showed-cards-periods";
import {WorkTimeType} from "../settings/work-time-type";

export type DataProcess = {
  allFlights: FlightType[];
  flightsToShow: FlightType[];
  showedCardsPeriods: ShowedCardsPeriods;
  chosenYear: number | undefined;
  chosenMonth: number | undefined;
  chosenDay: number | undefined;
};

export type InterfaceProcess = {
  sortOrder: SortOrder;
  workTimeTypeFilter: WorkTimeType | undefined;
  planeTypeFilter: string | undefined;
  sideNumberFilter: string | undefined;
  takeOffAirportFilter: string | undefined;
  landingAirportFilter: string | undefined;
  startDateFilter: string | undefined;
  endDateFilter: string | undefined;
  searchedFlight: string | undefined;
};

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
