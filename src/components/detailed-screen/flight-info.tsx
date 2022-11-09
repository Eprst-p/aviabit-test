import {FlightType} from "../../types/flight-type";


type FlightInfoProps = {
    flight: FlightType;
}


//нужно месяц-день - затем рейс -номер-судно и все. Плюсик для добавления доп столбцов. И еще модальное окно с подробной инфой по рейсу.
function FlightInfo({flight}: FlightInfoProps): JSX.Element {

    return (
        <>
            <div className="table-cell">{flight.flight}</div>
            <div className="table-cell">{flight.plnType}</div>
            <div className="table-cell">{flight.pln}</div>
            <div className="table-cell">{flight.timeFlight}</div>
            <div className="table-cell">{flight.timeBlock}</div>
            <div className="table-cell">{flight.timeNight}</div>
            <div className="table-cell">{flight.timeBiologicalNight}</div>
            <div className="table-cell">{flight.timeWork}</div>
            <div className="table-cell">{flight.takeoff.name}</div>
            <div className="table-cell">{flight.landing.name}</div>
        </>
    );
}

export default FlightInfo;
