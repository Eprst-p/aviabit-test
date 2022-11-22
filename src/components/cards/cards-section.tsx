import './cards-section.scss';
import {useAppSelector} from "../../hooks/redux-hooks";
import {
     getPeriodNames,
    getShowedCardsPeriods
} from "../../store/selectors";
import {ShowedCardsPeriods} from "../../settings/showed-cards-periods";
import Card from "./card";
import {sortAsc} from "../../settings/sort-functions";
import StatsSection from "./stats-section/stats-section";

function CardsSection(): JSX.Element {
    const showedPeriod = useAppSelector(getShowedCardsPeriods);
    const periodNames = useAppSelector(getPeriodNames);

    if (showedPeriod !== ShowedCardsPeriods.SingleFlights) {
        periodNames.sort(sortAsc);
    }

    return (
        <section className="cards-section" >
            <StatsSection />
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
