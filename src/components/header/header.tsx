import './header.scss';
import {commanderName} from "../../settings/consts";
import Filter from "../filter/filter";
import Search from "../search/search";
import CancelFiltersBtn from "../cards/stats-section/cancel-filters-btn";
import ShowFlightsOnlySwitcher from "../cards/stats-section/show-flights-only-switcher";

function Header(): JSX.Element {

    return (
        <header className="header">
            <div className="filter-btns-wrapper">
                <CancelFiltersBtn />
                <ShowFlightsOnlySwitcher />
            </div>
            <h2 className="header-title">{commanderName}</h2>
                <Search />
                <Filter />
        </header>
    );
}

export default Header;
