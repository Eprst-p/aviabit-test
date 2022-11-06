import {FlightType} from "../../types/flight-type";
import MonthStats from "./month-stats";
import {sortAsc} from "../../settings/sort-functions";

type MonthsStatsProps = {
    flightsPerYear: FlightType[];
}

function MonthsTable({flightsPerYear}: MonthsStatsProps): JSX.Element {
    const uniqueMonths = new Set<number>();
    flightsPerYear.forEach(flight => {
        const flightDate = new Date(flight.dateFlight);
        const month = flightDate.getMonth();
        uniqueMonths.add(month);
    });
    const monthsArr:number[] = Array.from(uniqueMonths);
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
