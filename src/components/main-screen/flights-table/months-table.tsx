import {FlightType} from "../../../types/flight-type";
import MonthStats from "./month-stats";
import {sortAsc} from "../../../settings/sort-functions";
import {getUniquePeriods} from "../../../settings/get-unique-periods";
import {PeriodName} from "../../../settings/period-name";

type MonthsStatsProps = {
    flightsPerYear: FlightType[];
}

function MonthsTable({flightsPerYear}: MonthsStatsProps): JSX.Element {
    const monthsArr = getUniquePeriods(flightsPerYear, PeriodName.Month);
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
