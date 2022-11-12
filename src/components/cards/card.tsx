import './card.css'
import {FlightType} from "../../types/flight-type";
import {PeriodName} from "../../settings/period-name";
import {useAppDispatch, useAppSelector} from "../../hooks/redux-hooks";
import {getShowedPeriod} from "../../store/selectors";
import {getFlightsPerPeriod} from "../../settings/get-flights-per-period";
import {
    changeChosenDay,
    changeChosenMonth,
    changeChosenYear,
    changeShowedPeriod,
} from "../../store/data-process/data-process";
import {monthNames} from "../../settings/months-names";
import {convertTime} from "../../settings/convert-time";

type CardProps = {
    name: number | string;
    flightsInAbovePeriod: FlightType[];
}

function Card({name, flightsInAbovePeriod}: CardProps): JSX.Element {
    const dispatch = useAppDispatch();
    // const chosenYear = useAppSelector(getChosenYear);
    // const chosenMonth = useAppSelector(getChosenMonth);
    // const chosenDay = useAppSelector(getChosenDay);
    let currentPeriod = PeriodName.Year
    let cardTitleName = name;
    const showedPeriod = useAppSelector(getShowedPeriod);

    switch (showedPeriod) {
        case PeriodName.Year:
            currentPeriod = PeriodName.Month;
            cardTitleName = monthNames[+name];
            break;
        case PeriodName.Month:
            currentPeriod = PeriodName.Day;
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

    let flight: FlightType = flightsInAbovePeriod[0];
    let workTimeName:string = '';
    if (showedPeriod === PeriodName.Day) {
        flight = flightsInAbovePeriod.filter(flight => flight.flight === name )[0];
        workTimeName = flight.type === 0 ? "фактическое" : "плановое";

    }

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
                        <h6 className="card-title">{`рейс: ${name}`}</h6>
                        <div className="card-stats">
                            <div className="card-stat-line">{`Налет: ${flight.timeFlight}`}</div>
                            <div className="card-stat-line">{`Рабочее время ${workTimeName}: ${convertTime(flight.timeWork)}`}</div>
                            <div className="card-stat-line">{`Воздушное судно: ${flight.plnType}`}</div>
                            <div className="card-stat-line">{`Бортовой номер: ${flight.pln}`}</div>
                            <div className="card-stat-line">{`Полетное время: ${convertTime(flight.timeBlock)}`}</div>
                            <div className="card-stat-line">{`Ночное время: ${convertTime(flight.timeNight)}`}</div>
                            <div className="card-stat-line">{`Биологическая ночь: ${convertTime(flight.timeBiologicalNight)}`}</div>
                            <div className="card-stat-line">{`Аэродром вылета: ${flight.takeoff.name}`}</div>
                            <div className="card-stat-line">{`Аэродром посадки: ${flight.landing.name}`}</div>
                        </div>
                    </>
                :
                    <>
                        <h6 className="card-title">{`${cardTitleName}`}</h6>
                        <div className="card-stats">
                            <div className="card-stat-line">{`Количество рейсов: ${flightsAmount}`}</div>
                            <div className="card-stat-line">{`Налет: ${convertTime(flightTime)}`}</div>
                            <div className="card-stat-line">{`Рабочее время по факту: ${convertTime(workTimeFact)}`}</div>
                            <div className="card-stat-line">{`Рабочее время по плану: ${convertTime(workTimePlan)}`}</div>
                        </div>
                        <button className="expand-btn" onClick={onExpandBtnClick}>Развернуть</button>
                    </>
            }
        </div>
    );
}

export default Card;
