import {getFlightsPerPeriod} from "../../settings/get-flights-per-period";
import {FlightType} from "../../types/flight-type";
import {PeriodName} from "../../settings/period-name";
import {monthNames} from "../../settings/months-names";
import {WorkTimeType} from "../../settings/work-time-type";
import {sortAsc} from "../../settings/sort-functions";

export const createChartData = (allFlights:FlightType[], xAxisElements: number[], periodPerData: PeriodName) => {

    if (periodPerData === PeriodName.Month) {
        xAxisElements.sort(sortAsc);
    }

    const createXvalue = (element:number) => {
        switch (periodPerData) {
            case PeriodName.Month:
                return monthNames[element];
            default:
                return `${element}`;
        }
    }

    const createYvalue = (workTimeType: WorkTimeType, element:number) => {
        const flightsPerPeriod = getFlightsPerPeriod(allFlights, element, periodPerData);
        let y: number = 0;
        flightsPerPeriod.forEach((flight) => {
            if (flight.type === workTimeType) {
                y += flight.timeWork;
            }
        });
        return y;
    };


    return {
        datasets: [
            {
                fill: true,
                label: 'Фактическое время',
                data: xAxisElements.map((el) => {
                    return {
                        x: createXvalue(el),
                        y: createYvalue(WorkTimeType.Fact, el)
                    }
                }),
                borderColor: 'rgb(245,70,19)',
                backgroundColor: 'rgb(246,227,35)',
            },
            {
                fill: true,
                label: 'Плановое время',
                data: xAxisElements.map((el) => {
                    return {
                        x: createXvalue(el),
                        y: createYvalue(WorkTimeType.Plan, el)
                    }
                }),
                borderColor: 'rgb(14,45,115)',
                backgroundColor: 'rgb(0,243,200)',
            },
        ],
    };
};
