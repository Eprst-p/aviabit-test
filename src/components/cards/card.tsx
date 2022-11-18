import './card.css'
import {FlightType} from "../../types/flight-type";
import {ShowedCardsPeriods} from "../../settings/showed-cards-periods";
import {useAppDispatch, useAppSelector} from "../../hooks/redux-hooks";
import {getFilteredFlights, getShowedCardsPeriods} from "../../store/selectors";
import {getFlightsPerPeriod} from "../../settings/get-flights-per-period";
import {
    changeChosenDay,
    changeChosenMonth,
    changeChosenYear,
    changeShowedCardsPeriod,
} from "../../store/data-process/data-process";
import {monthNames} from "../../settings/months-names";
import {convertTime} from "../../settings/convert-time";
import BreadCrumbs from "../bread-crumbs/bread-crumbs";
import {PeriodName} from "../../settings/PeriodName";
import {setPeriodDataForBreadCrumbs} from "../../settings/set-period-data-for-bread-crumbs";

type CardProps = {
    name: number | string;
}

function Card({name}: CardProps): JSX.Element {
    const dispatch = useAppDispatch();
    let cardTitleName:string | number = name;
    const showedCardsPeriods = useAppSelector(getShowedCardsPeriods);
    const filteredFlights = useAppSelector(getFilteredFlights);
    let periodInCard:PeriodName = PeriodName.Year;
    let flightsForCard: FlightType[] = getFlightsPerPeriod(filteredFlights, +name, periodInCard);
    let flight: FlightType = filteredFlights[0];
    let workTimeName:string = '';

    switch (showedCardsPeriods) {
        case ShowedCardsPeriods.Months:
            periodInCard = PeriodName.Month;
            cardTitleName = monthNames[+name];
            flightsForCard = getFlightsPerPeriod(filteredFlights, +name, periodInCard);
            flight = flightsForCard[0];
            break;
        case ShowedCardsPeriods.Days:
            periodInCard = PeriodName.Day;
            flightsForCard = getFlightsPerPeriod(filteredFlights, +name, periodInCard);
            flight = flightsForCard[0];
            break;
        case ShowedCardsPeriods.SingleFlights:
            periodInCard = PeriodName.SingleFlight;
            workTimeName = flight.type === 0 ? "фактическое" : "плановое";
            flightsForCard = getFlightsPerPeriod(filteredFlights, name, periodInCard);
            flight = flightsForCard[0];
            break;
    }

    const flightsAmount = flightsForCard.length;
    let flightTime = 0;
    let workTimeFact = 0;
    let workTimePlan = 0;
    flightsForCard.forEach((flight)=>{
        flightTime += flight.timeFlight;
        flight.type === 0 ? workTimeFact += flight.timeWork : workTimePlan += flight.timeWork;
    })

    const onExpandBtnClick = () => {
        switch (periodInCard) {
            case PeriodName.Year:
                dispatch(changeChosenYear(+name))
                dispatch(changeShowedCardsPeriod(ShowedCardsPeriods.Months));
                break;
            case PeriodName.Month:
                dispatch(changeChosenMonth(+name));
                dispatch(changeShowedCardsPeriod(ShowedCardsPeriods.Days));
                break;
            case PeriodName.Day:
                dispatch(changeChosenDay(+name));
                dispatch(changeShowedCardsPeriod(ShowedCardsPeriods.SingleFlights));
                break;
        }
    }

    return (
        <div className="card">
            {
                showedCardsPeriods === ShowedCardsPeriods.SingleFlights
                ?
                    <>
                        <div className="bread-crumbs-wrapper">
                            <BreadCrumbs periodData={setPeriodDataForBreadCrumbs(flight, periodInCard)} />
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
                            <div className="stat-name">{` - широта: `}</div>
                            <div className="stat-value">{`${flight.takeoff.lat}`}</div>
                            <div className="stat-name">{` - долгота: `}</div>
                            <div className="stat-value">{`${flight.takeoff.long}`}</div>
                            <div className="stat-name">{`Аэродром посадки: `}</div>
                            <div className="stat-value">{`${flight.landing.name}`}</div>
                            <div className="stat-name">{` - широта: `}</div>
                            <div className="stat-value">{`${flight.landing.lat}`}</div>
                            <div className="stat-name">{` - долгота: `}</div>
                            <div className="stat-value">{`${flight.landing.long}`}</div>
                        </div>
                    </>
                :
                    <>
                        {
                            showedCardsPeriods === ShowedCardsPeriods.Years
                            ?
                                ''
                            :
                                <div className="bread-crumbs-wrapper">
                                    <BreadCrumbs periodData={setPeriodDataForBreadCrumbs(flight, periodInCard)} />
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
