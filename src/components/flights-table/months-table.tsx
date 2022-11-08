import {FlightType} from "../../types/flight-type";
import MonthStats from "./month-stats";
import {sortAsc} from "../../settings/sort-functions";
import {getUniqueMonths} from "../../settings/get-unique-months";

type MonthsStatsProps = {
    flightsPerYear: FlightType[];
}

function MonthsTable({flightsPerYear}: MonthsStatsProps): JSX.Element {
    const monthsArr = getUniqueMonths(flightsPerYear);
    monthsArr.sort(sortAsc);

    return (
        <>
            {
                monthsArr.map((month) =>
                    <MonthStats flightsPerYear={flightsPerYear} month={month} key={month} />,
                )
            }
        </>
    );
}

export default MonthsTable;
