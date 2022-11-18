import './summary-stats-card.css';
import { useAppSelector} from "../../../hooks/redux-hooks";
import {convertTime} from "../../../settings/convert-time";
import {
    getFilteredFlights,
    getPeriodTitleName,
} from "../../../store/selectors";


function SummaryStatsCard(): JSX.Element {
    const filteredFlights = useAppSelector(getFilteredFlights);
    const titleName = useAppSelector(getPeriodTitleName);

    const flightsAmount = filteredFlights.length;
    let flightTime = 0;
    let workTimeFact = 0;
    let workTimePlan = 0;
    filteredFlights.forEach((flight)=>{
        flightTime += flight.timeFlight;
        flight.type === 0 ? workTimeFact += flight.timeWork : workTimePlan += flight.timeWork;
    })

    return (
        <div className="summary-stats-card-wrapper">
            <h4 className="summary-stats-title">{`Сводная статистика за период: ${titleName}`}</h4>
            <section className="stats-card-section">
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
            </section>
        </div>
    );
}

export default SummaryStatsCard;
