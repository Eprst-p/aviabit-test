import './cards-section.css';
import {useAppSelector} from "../../hooks/redux-hooks";
import {
     getPeriodNames,
    getShowedPeriod
} from "../../store/selectors";
import {PeriodName} from "../../settings/period-name";
import Card from "./card";
import {sortAsc} from "../../settings/sort-functions";
import SummaryStats from "./summary-stats";

function CardsSection(): JSX.Element {
    const showedPeriod = useAppSelector(getShowedPeriod);
    const periodNames = useAppSelector(getPeriodNames);

    if (showedPeriod !== PeriodName.Day) {
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
