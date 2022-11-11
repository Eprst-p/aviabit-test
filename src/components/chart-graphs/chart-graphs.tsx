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
import React, {useState} from "react";
import {defaultSelectValue} from "../../settings/consts";
import {createChartOptions} from "./chart-options";
import {createChartData} from "./chart-data";
import {useAppSelector} from "../../hooks/redux-hooks";
import {getAllFlights, getSortOrder} from "../../store/selectors";
import {PeriodName} from "../../settings/period-name";
import {getUniquePeriods} from "../../settings/get-unique-periods";
import {getFlightsPerPeriod} from "../../settings/get-flights-per-period";


ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend);


function ChartGraphs(): JSX.Element {
    const allFlights = useAppSelector(getAllFlights);
    const sortOrder = useAppSelector(getSortOrder);//нужен только для ререндера, довольно криво, но как есть пока
    const years = getUniquePeriods(allFlights, PeriodName.Year);


    const [selectedYear, setSelectedValue] = useState(defaultSelectValue);

    const options = createChartOptions(selectedYear);

    let data;
    switch (selectedYear) {
        case defaultSelectValue:
            data = createChartData(allFlights, years, PeriodName.Year);
            break;
        default:
            const flightsPerYear = getFlightsPerPeriod(allFlights, +selectedYear, PeriodName.Year);
            const months = getUniquePeriods(flightsPerYear, PeriodName.Month);
            data = createChartData(flightsPerYear, months, PeriodName.Month);
            break;
    }

    const handleOnChange = (evt: React.ChangeEvent<HTMLSelectElement>) => {
       setSelectedValue(evt.target.value);
    }

    return (
       <section className="graph-section">
           <div className="chose-year-container">
               <p className="chose-year-title">Отобразить график за:</p>
               <select className="year-selecter" onChange={handleOnChange} defaultValue={defaultSelectValue}>
                   <option className="select-option" value={defaultSelectValue}>{defaultSelectValue}</option>
                   {
                       years.map((year) =>
                           <option className="select-option" key={year} value={year}>{year}</option>
                       )
                   }
               </select>
           </div>
           <Line options={options} data={data} />
       </section>
    );
}

export default ChartGraphs;
