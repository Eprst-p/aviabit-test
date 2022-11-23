import {useAppDispatch} from "../../hooks/redux-hooks";
import {loadFlights} from "../../store/data-process/data-process";
import {flightsJSON} from "../../mocks/create-flights";
import MainScreen from "../main-screen/main-screen";
import {AppRoute} from "../../settings/app-route";
import {Route, Routes} from "react-router-dom";
import Layout from "../layout/layout";
import NotFound from "../not-found/not-found";
import './App.scss';

function App() {
    const dispatch = useAppDispatch();
    const flights = JSON.parse(flightsJSON);
    dispatch(loadFlights(flights));

    return (
        <Routes>
            <Route
                path={AppRoute.Root}
                element={<Layout />}
            >
                <Route
                    path={AppRoute.MainScreen}
                    element={<MainScreen/>}
                />
            </Route>
            <Route
                path="*"
                element={<NotFound />}
            />
        </Routes>
  );
}

export default App;
