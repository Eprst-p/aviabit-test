import './stats-section.scss';
import SummaryStatsCard from "./summary-stats-card";

function StatsSection(): JSX.Element {

    return (
        <div className="stats-section-wrapper">
            <SummaryStatsCard />
        </div>
    );
}

export default StatsSection;
