import FlightsTable from "./flights-table/flights-table";
import ChartGraphs from "../chart-graphs/chart-graphs";
import CardsSection from "../cards/cards-section";


function MainScreen(): JSX.Element {

   return (
        <main className="page-content">
            <FlightsTable />
            <CardsSection />
            <ChartGraphs />
        </main>
   );
}

export default MainScreen;
