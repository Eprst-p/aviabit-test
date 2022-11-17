import './period-switcher.css';
import {useAppDispatch, useAppSelector} from "../../hooks/redux-hooks";
import React, {useEffect} from "react";
import {changeFlightsToShow} from "../../store/data-process/data-process";
import {ShowedCardsPeriods} from "../../settings/showed-cards-periods";
import {convertTime} from "../../settings/convert-time";
import BreadCrumbs from "../bread-crumbs/bread-crumbs";
import {
    getChosenDay,
    getChosenMonth,
    getChosenYear,
    getFilteredFlights, getFlightsPerDay,
    getFlightsPerMonth,
    getFlightsPerYear,
    getPeriodTitleName,
    getShowedCardsPeriods
} from "../../store/selectors";
import {FlightType} from "../../types/flight-type";
import {PeriodData} from "../../types/period-data";
import CancelFiltersBtn from "./cancel-filters-btn";
import PeriodSwitcher from "./period-switcher";


function SummaryStats(): JSX.Element {
    const dispatch = useAppDispatch();
    const filteredFlights = useAppSelector(getFilteredFlights);
    // const flightsPerYear = useAppSelector(getFlightsPerYear)
    // const flightsPerMonth = useAppSelector(getFlightsPerMonth)
    // const flightsPerDay = useAppSelector(getFlightsPerDay)
    // let flightsToShow:FlightType[];
    const titleName = useAppSelector(getPeriodTitleName);
    const showedPeriod = useAppSelector(getShowedCardsPeriods);

    // const chosenYear = useAppSelector(getChosenYear);
    // const chosenMonth = useAppSelector(getChosenMonth);
    // const chosenDay = useAppSelector(getChosenDay);
    // const periodDataForBreadCrumbs:PeriodData = {
    //     year: chosenYear,
    //     month: chosenMonth,
    //     day: chosenDay
    // }

    // switch (showedPeriod) {
    //     case PeriodName.AllYears:
    //         flightsToShow = allFilteredFlights;
    //         break;
    //     case PeriodName.Year:
    //         flightsToShow = flightsPerYear;
    //         break;
    //     case PeriodName.Month:
    //         flightsToShow = flightsPerMonth;
    //         break;
    //     case PeriodName.Day:
    //         flightsToShow = flightsPerDay;
    //         break;
    // }

    // useEffect(() => {
    //     dispatch(changeFlightsToShow(flightsToShow));
    // }, [dispatch, flightsToShow]);


    const flightsAmount = filteredFlights.length;
    let flightTime = 0;
    let workTimeFact = 0;
    let workTimePlan = 0;
    filteredFlights.forEach((flight)=>{
        flightTime += flight.timeFlight;
        flight.type === 0 ? workTimeFact += flight.timeWork : workTimePlan += flight.timeWork;
    })


    return (
        <div className="summary-stats-wrapper">
            <h4 className="summary-stats-title">{`Сводная статистика за период: ${titleName}`}</h4>
            <section className="stats-section">
                <CancelFiltersBtn />
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
                <PeriodSwitcher />
            </section>


            {/*{*/}
            {/*    showedPeriod === PeriodName.AllYears*/}
            {/*        ?*/}
            {/*        ''*/}
            {/*        :*/}
            {/*        <BreadCrumbs perodData={periodDataForBreadCrumbs} />*/}
            {/*}*/}
        </div>
    );
}

export default SummaryStats;
