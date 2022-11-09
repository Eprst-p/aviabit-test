import './year-stats.css';
import MonthsTable from "./months-table";
import {useState} from "react";
import "./icons/icon-plus-24.png"
import "./icons/icon-minus-24.png"
import {getFlightsPerPeriod} from "../../../settings/get-flights-per-period";
import {useAppSelector} from "../../../hooks/redux-hooks";
import {getAllFlights} from "../../../store/selectors";
import {PeriodName} from "../../../settings/period-name";
import {generatePath, Link} from "react-router-dom";
import {AppRoute} from "../../../settings/app-route";

type FlightProps = {
    year: number;
}

function YearStats({year}: FlightProps): JSX.Element {
    const allFlights = useAppSelector(getAllFlights);

    const [showMonths, setShowMonths] = useState(false);

    const flightsPerYear = getFlightsPerPeriod(allFlights, year, PeriodName.Year);
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
                <Link
                    className="year-link"
                    to={generatePath(AppRoute.DetailedScreenYear, {year: `${year}`})}
                >
                    {year}
                </Link>
            </div>
            <div className="table-cell">{flightsPerYear.length}</div>
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
