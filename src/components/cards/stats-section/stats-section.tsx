import './stats-section.css';
import { useAppSelector} from "../../../hooks/redux-hooks";
import {getFilteredFlights} from "../../../store/selectors";
import CancelFiltersBtn from "./cancel-filters-btn";
import ShowFlightsOnlySwitcher from "./show-flights-only-switcher";
import {AmountOfFlightsToShowSwitcher} from "../../../settings/consts";
import SummaryStatsCard from "./summary-stats-card";

function StatsSection(): JSX.Element {
    const filteredFlights = useAppSelector(getFilteredFlights);

    return (
        <div className="stats-section-wrapper">
            <div className="stats-btn-wrapper">
                <CancelFiltersBtn />
                {
                    filteredFlights.length <= AmountOfFlightsToShowSwitcher
                        ?
                        <ShowFlightsOnlySwitcher />
                        :
                        ''
                }
            </div>
            <SummaryStatsCard />
        </div>
    );
}

export default StatsSection;
