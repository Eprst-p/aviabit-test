import {Outlet} from 'react-router-dom';
// import Footer from '../footer/footer';
// import Header from '../header/header';


function Layout(): JSX.Element {

    return (
        <div className="App">
            <header className="App-header">
                {/*<Header />*/}
                <Outlet />
                {/*<Footer />*/}
            </header>
        </div>
    );
}

export default Layout;
