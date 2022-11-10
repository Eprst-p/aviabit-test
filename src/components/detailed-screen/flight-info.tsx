import {FlightType} from "../../types/flight-type";
import {getDayFromIso} from "../../settings/getDateFromIso";


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
        </>
    );
}

export default FlightInfo;
