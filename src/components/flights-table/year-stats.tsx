import {flights} from "../../mocks/create-flights";
import MonthsTable from "./months-table";
import {useState} from "react";

type FlightProps = {
    year: number;
}

function YearStats({year}: FlightProps): JSX.Element {
    const [showMonths, setShowMonths] = useState(false);

    const flightsPerYear = flights.filter((flight) => {
        const flightDate = new Date(flight.dateFlight);
        const currentYear = flightDate.getFullYear();
        return currentYear === year;
    })
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
            <div className="table-cell">{year}
                <button className="show-months-btn" onClick={handleShowMonthsBtnClick}>Показать месяцы</button>
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
