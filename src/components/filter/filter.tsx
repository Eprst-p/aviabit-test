import './filter.css';
import PlaneTypeSelector from "./plane-type-selector";
import WorkTimeTypes from "./work-time-types";


function Filter(): JSX.Element {

    return (
        <section className="filter-section">
            <WorkTimeTypes />
            <PlaneTypeSelector />

        </section>
    );
}

export default Filter;
