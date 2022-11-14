// import FlightsTable from "./flights-table/flights-table";
import ChartGraphs from "../chart-graphs/chart-graphs";
import CardsSection from "../cards/cards-section";
import {useAppSelector} from "../../hooks/redux-hooks";
import {getShowedPeriod} from "../../store/selectors";
import {PeriodName} from "../../settings/period-name";


function MainScreen(): JSX.Element {
    const showedPeriod = useAppSelector(getShowedPeriod);

   return (
        <main className="page-content">
            <CardsSection />
            {
                showedPeriod !== PeriodName.Day
                ?
                    <ChartGraphs />
                :
                    ''
            }
        </main>
   );
}

export default MainScreen;
