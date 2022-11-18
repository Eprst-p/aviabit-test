import ChartGraphs from "../chart-graphs/chart-graphs";
import CardsSection from "../cards/cards-section";
import {useAppSelector} from "../../hooks/redux-hooks";
import {getShowedCardsPeriods} from "../../store/selectors";
import {ShowedCardsPeriods} from "../../settings/showed-cards-periods";


function MainScreen(): JSX.Element {
    const showedPeriod = useAppSelector(getShowedCardsPeriods);

   return (
        <main className="page-content">
            <CardsSection />
            {
                showedPeriod !== ShowedCardsPeriods.SingleFlights
                ?
                    <ChartGraphs />
                :
                    ''
            }
        </main>
   );
}

export default MainScreen;
