import {useParams} from "react-router-dom";
// import {useAppSelector} from "../../hooks/redux-hooks";
// import {getAllFlights} from "../../store/selectors";
// import {getFlightsPerPeriod} from "../../settings/get-flights-per-period";
// import {PeriodName} from "../../settings/period-name";
// import {monthsInIso} from "../../settings/months-in-iso";
// import DetailedTable from "./detailed-table";
//
//
// function DetailedScreen(): JSX.Element {
//     const params = useParams();
//     const isMonth = params.hasOwnProperty('month');
//     let year:number = 0;
//     if (params.year) {
//         year = +params.year;
//     }
//
//     const allFlights = useAppSelector(getAllFlights);
//     let flightsToShow = getFlightsPerPeriod(allFlights, year, PeriodName.Year);
//
//     if (isMonth && params.month) {
//         const month = monthsInIso[params.month];
//         flightsToShow = getFlightsPerPeriod(flightsToShow, month, PeriodName.Month);
//     }
//
//     return (
//         <main className="page-content">
//             <DetailedTable flights={flightsToShow} />
//         </main>
//     );
// }
//
// export default DetailedScreen;
