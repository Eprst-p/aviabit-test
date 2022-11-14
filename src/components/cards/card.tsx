import './card.css'
import {FlightType} from "../../types/flight-type";
import {PeriodName} from "../../settings/period-name";
import {useAppDispatch, useAppSelector} from "../../hooks/redux-hooks";
import {getFlightsToShow, getShowedPeriod} from "../../store/selectors";
import {getFlightsPerPeriod} from "../../settings/get-flights-per-period";
import {
    changeChosenDay,
    changeChosenMonth,
    changeChosenYear,
    changeShowedPeriod,
} from "../../store/data-process/data-process";
import {monthNames} from "../../settings/months-names";
import {convertTime} from "../../settings/convert-time";
import BreadCrumbs from "../bread-crumbs/bread-crumbs";
import {PeriodData} from "../../types/period-data";
import {getDayFromIso, getMonthFromIso, getYearFromIso} from "../../settings/getDateFromIso";

type CardProps = {
    name: number | string;
}

function Card({name}: CardProps): JSX.Element {
    const dispatch = useAppDispatch();
    let currentPeriod = PeriodName.Year
    let cardTitleName = name;
    const showedPeriod = useAppSelector(getShowedPeriod);
    const flightsInAbovePeriod = useAppSelector(getFlightsToShow);

    const periodDataForBreadCrumbs:PeriodData = {
        year: undefined,
        month: undefined,
        day: undefined
    }

    let flight: FlightType = flightsInAbovePeriod[0];
    const flightYear = getYearFromIso(flight.dateFlight);
    const flightMonth = getMonthFromIso(flight.dateFlight);
    const flightDay = getDayFromIso(flight.dateFlight);

    let workTimeName:string = '';
    if (showedPeriod === PeriodName.Day) {
        flight = flightsInAbovePeriod.filter(flight => flight.flight === name )[0];
        workTimeName = flight.type === 0 ? "фактическое" : "плановое";
        periodDataForBreadCrumbs.year = flightYear;
        periodDataForBreadCrumbs.month = flightMonth;
        periodDataForBreadCrumbs.day = flightDay;
    }

    switch (showedPeriod) {
        case PeriodName.Year:
            currentPeriod = PeriodName.Month;
            cardTitleName = monthNames[+name];
            periodDataForBreadCrumbs.year = flightYear;
            break;
        case PeriodName.Month:
            currentPeriod = PeriodName.Day;
            periodDataForBreadCrumbs.year = flightYear;
            periodDataForBreadCrumbs.month = flightMonth;
            break;
    }

    const flightsPerPeriod = getFlightsPerPeriod(flightsInAbovePeriod, +name, currentPeriod);

    const flightsAmount = flightsPerPeriod.length;
    let flightTime = 0;
    let workTimeFact = 0;
    let workTimePlan = 0;
    flightsPerPeriod.forEach((flight)=>{
        flightTime += flight.timeFlight;
        flight.type === 0 ? workTimeFact += flight.timeWork : workTimePlan += flight.timeWork;
    })


    const onExpandBtnClick = () => {
        dispatch(changeShowedPeriod(currentPeriod));
        switch (currentPeriod) {
            case PeriodName.Year:
                dispatch(changeChosenYear(+name))
                break;
            case PeriodName.Month:
                dispatch(changeChosenMonth(+name))
                break;
            case PeriodName.Day:
                dispatch(changeChosenDay(+name))
                break;
        }
    }

    return (
        <div className="card">
            {
                showedPeriod === PeriodName.Day
                ?
                    <>
                        <div className="bread-crumbs-wrapper">
                            <BreadCrumbs perodData={periodDataForBreadCrumbs} />
                        </div>
                        <h6 className="card-title">{`рейс: ${name}`}</h6>
                        <div className="card-stats">
                            <div className="stat-name">{`Налет: `}</div>
                            <div className="stat-value">{`${flight.timeFlight}`}</div>
                            <div className="stat-name">{`Рабочее время ${workTimeName}: `}</div>
                            <div className="stat-value">{`${convertTime(flight.timeWork)}`}</div>
                            <div className="stat-name">{`Воздушное судно: `}</div>
                            <div className="stat-value">{`${flight.plnType}`}</div>
                            <div className="stat-name">{`Бортовой номер: `}</div>
                            <div className="stat-value">{`${flight.pln}`}</div>
                            <div className="stat-name">{`Полетное время: `}</div>
                            <div className="stat-value">{`${convertTime(flight.timeBlock)}`}</div>
                            <div className="stat-name">{`Ночное время: `}</div>
                            <div className="stat-value">{`${convertTime(flight.timeNight)}`}</div>
                            <div className="stat-name">{`Биологическая ночь: `}</div>
                            <div className="stat-value">{`${convertTime(flight.timeBiologicalNight)}`}</div>
                            <div className="stat-name">{`Аэродром вылета: `}</div>
                            <div className="stat-value">{`${flight.takeoff.name}`}</div>
                            <div className="stat-name">{`Аэродром посадки: `}</div>
                            <div className="stat-value">{`${flight.landing.name}`}</div>
                        </div>
                    </>
                :
                    <>
                        {
                            showedPeriod === PeriodName.AllYears
                            ?
                                ''
                            :
                                <div className="bread-crumbs-wrapper">
                                    <BreadCrumbs perodData={periodDataForBreadCrumbs} />
                                </div>
                        }
                        <h6 className="card-title">{`${cardTitleName}`}</h6>
                        <div className="card-stats">
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
                        <button className="expand-btn" onClick={onExpandBtnClick}>Развернуть</button>
                    </>
            }
        </div>
    );
}

export default Card;
