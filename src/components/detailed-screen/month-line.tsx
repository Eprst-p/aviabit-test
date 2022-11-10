import './month-line.css';
import {useState} from "react";
import "../../images/icons/icon-plus-24.png"
import "../../images/icons/icon-minus-24.png"
import {getUniquePeriods} from "../../settings/get-unique-periods";
import {FlightType} from "../../types/flight-type";
import {PeriodName} from "../../settings/period-name";
import {getFlightsPerPeriod} from "../../settings/get-flights-per-period";
import {monthNames} from "../../settings/months-names";
import DayTable from "./day-table";

type MonthLineProps = {
    flightsPerYear: FlightType[],
    month: number;
}

function MonthLine({flightsPerYear, month}: MonthLineProps): JSX.Element {

    const [showDays, setShownDays] = useState(true);
    const flightsPerMonth = getFlightsPerPeriod(flightsPerYear, month, PeriodName.Month);
    const days = getUniquePeriods(flightsPerMonth, PeriodName.Day);

    const handleShowMonthsBtnClick = () => {
        setShownDays(!showDays);
    }


    return (
        <>
            <div className="table-cell month-line">
                <button className={`show-months-btn ${showDays ? 'btn-minus' : 'btn-plus'}`} onClick={handleShowMonthsBtnClick}></button>
                    {monthNames[month]}
            </div>
            {
                showDays
                    ?
                    days.map((day) =>
                        <DayTable flightsPerMonth={flightsPerMonth} day={day} key={day} />,
                    )
                    :
                    ''
            }
        </>
    );
}

export default MonthLine;
