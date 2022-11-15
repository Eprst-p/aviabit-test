import './header.css';
import {commanderName} from "../../settings/consts";
import Filter from "../filter/filter";
import Search from "../search/search";

function Header(): JSX.Element {

    return (
        <header className="header">
                <h1 className="header-title">{commanderName}</h1>
                <Search />
                <Filter />
        </header>
    );
}

export default Header;
