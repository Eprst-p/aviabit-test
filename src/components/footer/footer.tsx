import './footer.css';

function Footer(): JSX.Element {

    //сделать футер не исчезающим при прокрутке приложения (для мобилок особенно)
    //сделать фильтры и прочее иконками небольшими, либо сделать и хедер и футер непрокручиваемыми

    return (
        <header className="footer">
                <p className="search-form">Поиск</p>
                <p className="filter-form">Фильтрация</p>
                <p className="bread-crumbs">Хлебные крошки</p>
        </header>
    );
}

export default Footer;
