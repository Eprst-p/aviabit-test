import './header.css';
import {commanderName} from "../../settings/consts";
import Filter from "../filter/filter";

function Header(): JSX.Element {

    return (
        <header className="header">
                <h1 className="header-title">{commanderName}</h1>
                <p className="search-form">Поиск</p>
                <p className="filter-form">Фильтрация</p>
                <Filter />
        </header>
    );
}

export default Header;
