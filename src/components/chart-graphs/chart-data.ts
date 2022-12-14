import {getFlightsPerPeriod} from "../../settings/get-flights-per-period";
import {FlightType} from "../../types/flight-type";
import {ShowedCardsPeriods} from "../../settings/showed-cards-periods";
import {monthNames} from "../../settings/months-names";
import {WorkTimeType} from "../../settings/work-time-type";
import {convertTime} from "../../settings/convert-time";
import {PeriodName} from "../../settings/PeriodName";

export const createChartData = (filteredFlights:FlightType[], xAxisElements: string[], showedPeriod: ShowedCardsPeriods) => {
    let periodPerData:PeriodName = PeriodName.Year;
    switch (showedPeriod) {
        case ShowedCardsPeriods.Months:
            periodPerData = PeriodName.Month;
            break;
        case ShowedCardsPeriods.Days || ShowedCardsPeriods.SingleFlights:
            periodPerData = PeriodName.Day;
            break;
    }

    const createXvalue = (element:string) => {
        switch (periodPerData) {
            case PeriodName.Month:
                return monthNames[+element];
            default:
                return `${element}`;
        }
    }

    const createYvalue = (workTimeType: WorkTimeType, element:string) => {
        const flightsPerPeriod = getFlightsPerPeriod(filteredFlights, +element, periodPerData);
        let y: number = 0;
        flightsPerPeriod.forEach((flight) => {
            if (flight.type === workTimeType) {
                y += flight.timeWork;
            }
        });
        const hourSymbol = convertTime(y).indexOf('ч');
        return +convertTime(y).slice(0, hourSymbol);
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
