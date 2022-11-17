import './cards-section.css';
import {useAppSelector} from "../../hooks/redux-hooks";
import {
     getPeriodNames,
    getShowedCardsPeriods
} from "../../store/selectors";
import {ShowedCardsPeriods} from "../../settings/showed-cards-periods";
import Card from "./card";
import {sortAsc} from "../../settings/sort-functions";
import SummaryStats from "./summary-stats";

function CardsSection(): JSX.Element {
    const showedPeriod = useAppSelector(getShowedCardsPeriods);
    const periodNames = useAppSelector(getPeriodNames);

    if (showedPeriod !== ShowedCardsPeriods.SingleFlights) {
        periodNames.sort(sortAsc);
    }

    return (
        <section className="cards-section" >
            <SummaryStats />
            <div className="cards-wrapper">
                {
                    periodNames.map((name, index) =>
                            <Card name={name} key={index} />,
                        )
                }
            </div>
        </section>
    );
}

export default CardsSection;
