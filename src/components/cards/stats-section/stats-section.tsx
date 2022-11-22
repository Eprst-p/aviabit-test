import './stats-section.scss';
import CancelFiltersBtn from "./cancel-filters-btn";
import ShowFlightsOnlySwitcher from "./show-flights-only-switcher";
import SummaryStatsCard from "./summary-stats-card";

function StatsSection(): JSX.Element {

    return (
        <div className="stats-section-wrapper">
            <SummaryStatsCard />
        </div>
    );
}

export default StatsSection;
