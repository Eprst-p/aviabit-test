import {FlightType} from "../../types/flight-type";

type CardProps = {
    name: number | string;
    flightsInAbovePeriod: FlightType[];
}

function CardForFlight({name, flightsInAbovePeriod}: CardProps): JSX.Element {
    const flight = flightsInAbovePeriod.filter(flight => flight.flight === name )[0];
    const workTimeName = flight.type === 0 ? "фактическое" : "плановое";

    return (
        <div className="card">
            <h6 className="card-title">{`рейс: ${name}`}</h6>
                <div className="card-stats">
                    <div className="card-stat-line">{`Налет: ${flight.timeFlight}`}</div>
                    <div className="card-stat-line">{`Рабочее время ${workTimeName}: ${flight.timeWork}`}</div>
                    <div className="card-stat-line">{`Воздушное судно: ${flight.plnType}`}</div>
                    <div className="card-stat-line">{`Бортовой номер: ${flight.pln}`}</div>
                    <div className="card-stat-line">{`Полетное время: ${flight.timeBlock}`}</div>
                    <div className="card-stat-line">{`Ночное время: ${flight.timeNight}`}</div>
                    <div className="card-stat-line">{`Биологическая ночь: ${flight.timeBiologicalNight}`}</div>
                    <div className="card-stat-line">{`Аэродром вылета: ${flight.takeoff.name}`}</div>
                    <div className="card-stat-line">{`Аэродром посадки: ${flight.landing.name}`}</div>
                </div>
        </div>
    );
}

export default CardForFlight;
