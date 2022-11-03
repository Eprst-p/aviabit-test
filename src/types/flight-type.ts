import {Airport} from "./airport";

export type FlightType = {
    dateFlight: string;
    flight: string
    plnType: string
    pln: string
    timeFlight: number
    timeBlock: number
    timeNight: number
    timeBiologicalNight: number
    timeWork: number
    type: number
    takeoff: Airport
    landing: Airport
}
