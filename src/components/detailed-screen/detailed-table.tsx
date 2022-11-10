import './detailed-screen.css'
import {useParams} from "react-router-dom";
import {FlightType} from "../../types/flight-type";
import {getUniquePeriods} from "../../settings/get-unique-periods";
import {PeriodName} from "../../settings/period-name";
import MonthLine from "./month-line";

type FlightProps = {
    flights: FlightType[];
}

function DetailedTable({flights}: FlightProps): JSX.Element {
    const params = useParams();
    const isMonth = params.hasOwnProperty('month');
    let year:number = 0;
    let month:string = '';
    if (params.year) {
        year = +params.year;
    }
    if (params.month) {
        month = params.month;
    }

    const monthsToShow = getUniquePeriods(flights, PeriodName.Month)


    //можно плановые и фактические покрасить в разный цвет
    return (
        <div className="detailed-table-container" >
            <p className="detailed-table-title">{`Таблица рейсов за ${month} ${year} год`}</p>
            <div className="details-table">
                <div className="table-cell">Дата</div>
                <div className="table-cell">Рейс</div>
                <div className="table-cell">Воздушное судно</div>
                <div className="table-cell">Бортовой номер</div>
                {/*<div className="table-cell">Налет</div>*/}
                {/*<div className="table-cell">Полетное время</div>*/}
                {/*<div className="table-cell">Ночное время</div>*/}
                {/*<div className="table-cell">Биологическая ночь</div>*/}
                {/*<div className="table-cell">Рабочее время</div>*/}
                {/*<div className="table-cell">Аэродром вылета</div>*/}
                {/*<div className="table-cell">Аэродром посадки</div>*/}
                {
                    monthsToShow.map((month) =>
                        <MonthLine flightsPerYear={flights} month={month} key={month} />,
                    )
                }

            </div>
        </div>
    );
}

export default DetailedTable;
