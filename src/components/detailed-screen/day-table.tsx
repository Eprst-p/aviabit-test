import './day-table.css'
import {FlightType} from "../../types/flight-type";
import {getFlightsPerPeriod} from "../../settings/get-flights-per-period";
import {PeriodName} from "../../settings/period-name";
import FlightInfo from "./flight-info";


type DayTableProps = {
    flightsPerMonth: FlightType[];
    day: number;
}


function DayTable({flightsPerMonth, day}: DayTableProps): JSX.Element {
    const flightsPerDay = getFlightsPerPeriod(flightsPerMonth, day, PeriodName.Day)

    const dayCellStyle = {
        gridRow: `span ${flightsPerDay.length}`,
}

    return (
        <>
            <div className="table-cell day-cell" style={dayCellStyle}>{day}</div>
            {
                flightsPerDay.map((flight, index) =>
                        <FlightInfo flight={flight}  key={index} />,
                    )
            }
        </>
    );
}

export default DayTable;
