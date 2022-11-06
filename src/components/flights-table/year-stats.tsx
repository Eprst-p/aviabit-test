import MonthsTable from "./months-table";
import {useState} from "react";
import "./icons/icon-plus-24.png"
import "./icons/icon-minus-24.png"
import {getFlightsPerYear} from "../../settings/getFlightsPerYear";

type FlightProps = {
    year: number;
}

function YearStats({year}: FlightProps): JSX.Element {
    const [showMonths, setShowMonths] = useState(false);

    const flightsPerYear = getFlightsPerYear(year);
    let flightTime = 0;
    let workTimeFact = 0;
    let workTimePlan = 0;
    flightsPerYear.forEach((flight)=>{
        flightTime += flight.timeFlight;
        flight.type === 0 ? workTimeFact += flight.timeWork : workTimePlan += flight.timeWork;
    })

    const handleShowMonthsBtnClick = () => {
        setShowMonths(!showMonths);
    }

    return (
        <>
            <div className="table-cell">
                <button className={`show-months-btn ${showMonths ? 'btn-minus' : 'btn-plus'}`} onClick={handleShowMonthsBtnClick}></button>
                {year}
            </div>
            <div className="table-cell">{flightTime}</div>
            <div className="table-cell">{workTimeFact}</div>
            <div className="table-cell">{workTimePlan}</div>
            {
                showMonths
                    ?
                    <MonthsTable flightsPerYear={flightsPerYear} />
                    :
                    ''
            }
        </>
    );
}

export default YearStats;
