import './month-stats.css';
import {FlightType} from "../../types/flight-type";
import {monthNames} from "../../settings/months-names";
import {getFlightsPerPeriod} from "../../settings/get-flights-per-period";
import {PeriodName} from "../../settings/period-name";

type MonthProps = {
    flightsPerYear: FlightType[];
    month: number;
}

function MonthStats({flightsPerYear, month}: MonthProps): JSX.Element {
    const flightsPerMonth = getFlightsPerPeriod(flightsPerYear, month, PeriodName.Month);

    let flightTime = 0;
    let workTimeFact = 0;
    let workTimePlan = 0;
    flightsPerMonth.forEach((flight)=>{
        flightTime += flight.timeFlight;
        flight.type === 0 ? workTimeFact += flight.timeWork : workTimePlan += flight.timeWork;
    })
    const monthName:string = monthNames[month];

    return (
        <>
            <div className="table-cell month-cell">{monthName}</div>
            <div className="table-cell">{flightTime}</div>
            <div className="table-cell">{workTimeFact}</div>
            <div className="table-cell">{workTimePlan}</div>
        </>
    );
}

export default MonthStats;
