import './chart-graphs.css';
import {
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip,
} from 'chart.js';
import {Line} from 'react-chartjs-2';
import {createChartOptions} from "./chart-options";
import {createChartData} from "./chart-data";
import {useAppSelector} from "../../hooks/redux-hooks";
import {
    getFlightsToShow, getPeriodNames, getPeriodTitleName,
    getShowedPeriod,
} from "../../store/selectors";
import {PeriodName} from "../../settings/period-name";
import {sortAsc} from "../../settings/sort-functions";


ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend);


function ChartGraphs(): JSX.Element {
    const showedPeriod = useAppSelector(getShowedPeriod);
    const titleName = useAppSelector(getPeriodTitleName);
    const periodNames = useAppSelector(getPeriodNames);
    const flightsToShow = useAppSelector(getFlightsToShow);

    if (showedPeriod !== PeriodName.Day) {
        periodNames.sort(sortAsc);
    }
    const data = createChartData(flightsToShow, periodNames, showedPeriod)
    const options = createChartOptions(titleName);

    return (
       <section className="graph-section">
           <Line options={options} data={data} />
       </section>
    );
}

export default ChartGraphs;
