import './card.css'
import {FlightType} from "../../types/flight-type";
import {PeriodName} from "../../settings/period-name";
import {useAppDispatch, useAppSelector} from "../../hooks/redux-hooks";
import {getChosenSummaryPeriod} from "../../store/selectors";
import {getFlightsPerPeriod} from "../../settings/get-flights-per-period";
import {
    changeFlightsInAbovePeriod,
    changeSummaryPeriod,
    changeSummaryPeriodValue
} from "../../store/data-process/data-process";
import {monthNames} from "../../settings/months-names";
import {convertTime} from "../../settings/convert-time";

type CardProps = {
    name: number | string;
    flightsInAbovePeriod: FlightType[];
}

function CardForPeriod({name, flightsInAbovePeriod}: CardProps): JSX.Element {
    const dispatch = useAppDispatch();
    let currentPeriod = PeriodName.Year
    let cardTitleName = name;
    const chosenSummaryPeriod = useAppSelector(getChosenSummaryPeriod);

    switch (chosenSummaryPeriod) {
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

    const onExpandBtnClick = () => {
        dispatch(changeSummaryPeriod(currentPeriod));
        dispatch(changeSummaryPeriodValue(name));
        dispatch(changeFlightsInAbovePeriod(flightsPerPeriod));
    }

    return (
        <div className="card">
            <h6 className="card-title">{`${cardTitleName}`}</h6>
                <div className="card-stats">
                    <div className="card-stat-line">{`Количество рейсов: ${flightsAmount}`}</div>
                    <div className="card-stat-line">{`Налет: ${convertTime(flightTime)}`}</div>
                    <div className="card-stat-line">{`Рабочее время по факту: ${convertTime(workTimeFact)}`}</div>
                    <div className="card-stat-line">{`Рабочее время по плану: ${convertTime(workTimePlan)}`}</div>
                </div>
            <button className="expand-btn" onClick={onExpandBtnClick}>Развернуть</button>
        </div>
    );
}

export default CardForPeriod;
