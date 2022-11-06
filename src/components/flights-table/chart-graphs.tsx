import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import {getFlightsPerYear} from "../../settings/getFlightsPerYear";


ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend);

type ChartGraphsProps = {
    years: number[];
}
function ChartGraphs({years}: ChartGraphsProps): JSX.Element {

   const options =
       {
           plugins: {
               legend: {
                   position: 'top' as const,
                   labels: {
                       color: "white",
                       font: {
                           size: 20,
                       }
                   },
               },
               title: {
                   display: true,
                   text: 'График фактического и планового налета',
                   color: "white",
                   font: {
                       size: 20,
                   }
               },
           },
           scales: {
               xAxes: {
                   ticks: {
                       color: "white",
                       font: {
                           size: 15,
                       }
                   },
               },
               yAxes: {
                   ticks: {
                       color: "white",
                       font: {
                           size: 15,
                       }
                   },
               },
           },
       };


   const labels = years;

   const data = {
        labels,
        datasets: [
            {
                fill: true,
                label: 'Фактическое время',
                data: labels.map((year) => {
                    const flightsPerYear = getFlightsPerYear(year);
                    let workTimeFact = 0;
                    flightsPerYear.forEach((flight)=>{
                        if (flight.type === 0) {
                            workTimeFact += flight.timeWork
                        }
                    })
                    return workTimeFact;
                }),
                borderColor: 'rgb(245,70,19)',
                backgroundColor: 'rgb(246,227,35)',
            },
            {
                fill: true,
                label: 'Плановое время',
                data: labels.map((year) => {
                    const flightsPerYear = getFlightsPerYear(year);
                    let workTimePlan = 0;
                    flightsPerYear.forEach((flight)=>{
                        if (flight.type === 1) {
                            workTimePlan += flight.timeWork
                        }
                    })
                    return workTimePlan;
                }),
                borderColor: 'rgb(14,45,115)',
                backgroundColor: 'rgb(0,243,200)',
            },
        ],
    };

   return (
       <Line options={options} data={data} />
   );
}

export default ChartGraphs;
