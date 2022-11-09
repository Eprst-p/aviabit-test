import FlightsTable from "./flights-table/flights-table";
import ChartGraphs from "../chart-graphs/chart-graphs";


function MainScreen(): JSX.Element {

   return (
        <main className="page-content">
            <FlightsTable />
            <ChartGraphs />
        </main>
   );
}

export default MainScreen;
