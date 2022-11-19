import './stats-section.css';
import CancelFiltersBtn from "./cancel-filters-btn";
import ShowFlightsOnlySwitcher from "./show-flights-only-switcher";
import SummaryStatsCard from "./summary-stats-card";

function StatsSection(): JSX.Element {

    return (
        <div className="stats-section-wrapper">
            <div className="stats-btns-wrapper">
                <CancelFiltersBtn />
                <ShowFlightsOnlySwitcher />
            </div>
            <SummaryStatsCard />
        </div>
    );
}

export default StatsSection;
