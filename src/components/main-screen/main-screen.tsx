import ChartGraphs from "../chart-graphs/chart-graphs";
import CardsSection from "../cards/cards-section";
import {useAppSelector} from "../../hooks/redux-hooks";
import {getFilteredFlights, getShowedCardsPeriods} from "../../store/selectors";
import {ShowedCardsPeriods} from "../../settings/showed-cards-periods";


function MainScreen(): JSX.Element {
    const showedPeriod = useAppSelector(getShowedCardsPeriods);
    const filteredFlights = useAppSelector(getFilteredFlights);

   return (
        <main className="page-content">
            <CardsSection />
            {
                showedPeriod !== ShowedCardsPeriods.SingleFlights && filteredFlights.length !== 1
                ?
                    <ChartGraphs />
                :
                    ''
            }
        </main>
   );
}

export default MainScreen;
