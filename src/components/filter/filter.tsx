import './filter.css';
import PlaneTypeSelector from "./plane-type-selector";
import WorkTimeTypes from "./work-time-types";
import SideNumberSelector from "./side-number-selector";
import TakeOffAirportSelector from "./takeoff-airport-selector";
import LandingAirportSelector from "./landing-airport-selector";


function Filter(): JSX.Element {

    return (
        <section className="filter-section">
            <WorkTimeTypes />
            <PlaneTypeSelector />
            <SideNumberSelector />
            <TakeOffAirportSelector />
            <LandingAirportSelector />

        </section>
    );
}

export default Filter;
