import './header.css';
import {commanderName} from "../../settings/consts";

function Header(): JSX.Element {

    return (
        <header className="header">
                <h1 className="header-title">{commanderName}</h1>
                <p className="search-form">Поиск</p>
                <p className="filter-form">Фильтрация</p>
        </header>
    );
}

export default Header;
