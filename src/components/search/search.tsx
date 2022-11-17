import './search.css';
import DateSelection from "./date-selection";
import FlightsSearchForm from "./flights-search-form";

function Search(): JSX.Element {

    return (
        <section className="search-section">
            <DateSelection />
            <FlightsSearchForm />
        </section>
    );
}

export default Search;
