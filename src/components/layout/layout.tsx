import './layout.css';
import {Outlet} from 'react-router-dom';
import Header from "../header/header";


function Layout(): JSX.Element {

    return (
        <div className="layout-wrapper">
                <Header />
                <Outlet />
        </div>
    );
}

export default Layout;
