import './cards-section.css';
import {useAppSelector} from "../../hooks/redux-hooks";
import {
    getChosenSummaryPeriod,
    getFlightsInAbovePeriod,
    getSummaryStatsPeriodValue
} from "../../store/selectors";
import {getFlightsPerPeriod} from "../../settings/get-flights-per-period";
import {getUniquePeriods} from "../../settings/get-unique-periods";
import {PeriodName} from "../../settings/period-name";
import CardForPeriod from "./cardForPeriod";
import {sortAsc, sortDesc} from "../../settings/sort-functions";
import CardForFlight from "./cardForFlight";
import {convertTime} from "../../settings/convert-time";

function CardsSection(): JSX.Element {
    const flightsInAbovePeriod = useAppSelector(getFlightsInAbovePeriod);
    const chosenSummaryPeriod = useAppSelector(getChosenSummaryPeriod);
    const summaryPeriodValue = useAppSelector(getSummaryStatsPeriodValue);
    const flightsPerSummaryPeriod = getFlightsPerPeriod(flightsInAbovePeriod, summaryPeriodValue, chosenSummaryPeriod);
    const titleName = summaryPeriodValue === 0 ? 'все года' : summaryPeriodValue;

    const flightsAmount = flightsPerSummaryPeriod.length;
    let flightTime = 0;
    let workTimeFact = 0;
    let workTimePlan = 0;
    flightsPerSummaryPeriod.forEach((flight)=>{
        flightTime += flight.timeFlight;
        flight.type === 0 ? workTimeFact += flight.timeWork : workTimePlan += flight.timeWork;
    })

    let namesOfShowedCards: number[] | string[] = getUniquePeriods(flightsPerSummaryPeriod, PeriodName.Year);

    switch (chosenSummaryPeriod) {
        case PeriodName.AllYears:
            namesOfShowedCards = getUniquePeriods(flightsPerSummaryPeriod, PeriodName.Year);
            namesOfShowedCards.sort(sortAsc);
            break;
        case PeriodName.Year:
            namesOfShowedCards = getUniquePeriods(flightsPerSummaryPeriod, PeriodName.Month);
            namesOfShowedCards.sort(sortAsc);
            break;
        case PeriodName.Month:
            namesOfShowedCards = getUniquePeriods(flightsPerSummaryPeriod, PeriodName.Day);
            namesOfShowedCards.sort(sortAsc);
            break;
        case PeriodName.Day:
            namesOfShowedCards = flightsPerSummaryPeriod.map((flight) => flight.flight);
            break;
    }


    return (
        <section className="cards-section" >
            <div className="summary-stats-wrapper">
                <h4 className="summary-stats-title">{`Сводная статистика за период: ${titleName}`}</h4>
                <div className="summary-stats">
                    <div className="stat-line">{`Количество рейсов: ${flightsAmount}`}</div>
                    <div className="stat-line">{`Налет: ${convertTime(flightTime)}`}</div>
                    <div className="stat-line">{`Рабочее время по факту: ${convertTime(workTimeFact)}`}</div>
                    <div className="stat-line">{`Рабочее время по плану: ${convertTime(workTimePlan)}`}</div>
                </div>
            </div>
            <div className="cards-wrapper">
                {
                    chosenSummaryPeriod === PeriodName.Day
                    ?
                        namesOfShowedCards.map((name, index) =>
                            <CardForFlight name={name} flightsInAbovePeriod={flightsPerSummaryPeriod} key={index} />,
                        )
                    :
                        namesOfShowedCards.map((name, index) =>
                            <CardForPeriod name={name} flightsInAbovePeriod={flightsPerSummaryPeriod} key={index} />,
                        )
                }
            </div>
        </section>
    );
}

export default CardsSection;
