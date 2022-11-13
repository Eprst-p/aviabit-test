import './cards-section.css';
import {useAppDispatch, useAppSelector} from "../../hooks/redux-hooks";
import {
    getAllFlights,
    getChosenDay,
    getChosenMonth,
    getChosenYear,
    getFligthsPerDay,
    getFligthsPerMonth,
    getFligthsPerYear, getPeriodNames,
    getShowedPeriod
} from "../../store/selectors";
import {PeriodName} from "../../settings/period-name";
import Card from "./card";
import {sortAsc} from "../../settings/sort-functions";
import {convertTime} from "../../settings/convert-time";
import {FlightType} from "../../types/flight-type";
import {monthNames} from "../../settings/months-names";
import {changeFlightsToShow} from "../../store/data-process/data-process";
import BreadCrumbs from "../bread-crumbs/bread-crumbs";
import {useEffect} from "react";

function CardsSection(): JSX.Element {
    const dispatch = useAppDispatch();
    const allFlights = useAppSelector(getAllFlights);
    const showedPeriod = useAppSelector(getShowedPeriod);
    const chosenYear = useAppSelector(getChosenYear) || '';
    const chosenMonth = useAppSelector(getChosenMonth) || '';
    const chosenDay = useAppSelector(getChosenDay) || '';
    const dayTitle = chosenDay ? `${chosenDay} число` : '';
    let flightsToShow:FlightType[];
    const flightsPerYear = useAppSelector(getFligthsPerYear)
    const flightsPerMonth = useAppSelector(getFligthsPerMonth)
    const flightsPerDay = useAppSelector(getFligthsPerDay)
    const titleName = showedPeriod === PeriodName.AllYears ? 'все года' : `${chosenYear} ${monthNames[+chosenMonth]} ${dayTitle}`;

    switch (showedPeriod) {
        case PeriodName.AllYears:
            flightsToShow = allFlights;
            break;
        case PeriodName.Year:
            flightsToShow = flightsPerYear;
            break;
        case PeriodName.Month:
            flightsToShow = flightsPerMonth;
            break;
        case PeriodName.Day:
            flightsToShow = flightsPerDay;
            break;
    }

    useEffect(() => {
        dispatch(changeFlightsToShow(flightsToShow));
    }, [dispatch, flightsToShow]);

    const periodNames = useAppSelector(getPeriodNames);

    if (showedPeriod !== PeriodName.Day) {
        periodNames.sort(sortAsc);
    }

    const flightsAmount = flightsToShow.length;
    let flightTime = 0;
    let workTimeFact = 0;
    let workTimePlan = 0;
    flightsToShow.forEach((flight)=>{
        flightTime += flight.timeFlight;
        flight.type === 0 ? workTimeFact += flight.timeWork : workTimePlan += flight.timeWork;
    })


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
                <BreadCrumbs />
            </div>
            <div className="cards-wrapper">
                {
                    periodNames.map((name, index) =>
                            <Card name={name} key={index} />,
                        )
                }
            </div>
        </section>
    );
}

export default CardsSection;
