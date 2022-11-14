import './cards-section.css';
import {useAppDispatch, useAppSelector} from "../../hooks/redux-hooks";
import {
    getAllFlights,
    getChosenDay,
    getChosenMonth,
    getChosenYear, getFilteredFlights,
    getFlightsPerDay,
    getFlightsPerMonth,
    getFlightsPerYear, getPeriodNames, getPeriodTitleName,
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
import {PeriodData} from "../../types/period-data";

function CardsSection(): JSX.Element {
    const dispatch = useAppDispatch();
    const allFilteredFlights = useAppSelector(getFilteredFlights);
    const showedPeriod = useAppSelector(getShowedPeriod);
    const chosenYear = useAppSelector(getChosenYear);
    const chosenMonth = useAppSelector(getChosenMonth);
    const chosenDay = useAppSelector(getChosenDay);
    const titleName = useAppSelector(getPeriodTitleName);
    let flightsToShow:FlightType[];
    const flightsPerYear = useAppSelector(getFlightsPerYear)
    const flightsPerMonth = useAppSelector(getFlightsPerMonth)
    const flightsPerDay = useAppSelector(getFlightsPerDay)
    const periodDataForBreadCrumbs:PeriodData = {
        year: chosenYear,
        month: chosenMonth,
        day: chosenDay
    }

    switch (showedPeriod) {
        case PeriodName.AllYears:
            flightsToShow = allFilteredFlights;
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
                <div className="summary-stats-card">
                    <div className="stat-name">{`Количество рейсов: `}</div>
                    <div className="stat-value">{`${flightsAmount}`}</div>
                    <div className="stat-name">{`Налет: `}</div>
                    <div className="stat-value">{`${convertTime(flightTime)}`}</div>
                    <div className="stat-name">{`Рабочее время:`}</div>
                    <div className="stat-value"></div>
                    {
                        workTimeFact !== 0
                            ?
                                <>
                                    <div className="stat-name">{` - фактическое: `}</div>
                                    <div className="stat-value">{`${convertTime(workTimeFact)}`}</div>
                                </>
                            :
                                ''
                    }
                    {
                        workTimePlan !== 0
                            ?
                                <>
                                    <div className="stat-name">{` - плановое: `}</div>
                                    <div className="stat-value">{`${convertTime(workTimePlan)}`}</div>
                                </>
                            :
                                ''
                    }
                </div>
                {
                    showedPeriod === PeriodName.AllYears
                        ?
                            ''
                        :
                            <BreadCrumbs perodData={periodDataForBreadCrumbs} />
                }
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
