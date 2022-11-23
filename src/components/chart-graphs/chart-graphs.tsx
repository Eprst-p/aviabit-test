import './chart-graphs.scss';
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
    getFilteredFlights,
    getPeriodNames, getPeriodTitleName,
    getShowedCardsPeriods,
} from "../../store/selectors";
import {ShowedCardsPeriods} from "../../settings/showed-cards-periods";
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
    const showedPeriod = useAppSelector(getShowedCardsPeriods);
    const titleName = useAppSelector(getPeriodTitleName);
    const periodNames = useAppSelector(getPeriodNames);
    const filteredFlights = useAppSelector(getFilteredFlights);

    if (showedPeriod !== ShowedCardsPeriods.SingleFlights) {
        periodNames.sort(sortAsc);
    }
    const data = createChartData(filteredFlights, periodNames, showedPeriod)
    const options = createChartOptions(titleName);

    return (
       <section className="graph-section">
           <Line id="graph-canvas" options={options} data={data} width={0.5} height={0.5} />
       </section>
    );
}

export default ChartGraphs;
