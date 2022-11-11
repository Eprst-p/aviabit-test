import {useAppDispatch} from "../../hooks/redux-hooks";
import {changeFlightsInAbovePeriod, loadFlights} from "../../store/data-process/data-process";
import {flights} from "../../mocks/create-flights";
import MainScreen from "../main-screen/main-screen";
import {AppRoute} from "../../settings/app-route";
import DetailedScreen from "../detailed-screen/detailed-screen";
import {Route, Routes} from "react-router-dom";
import Layout from "../layout/layout";
import NotFound from "../not-found/not-found";

function App() {
    const dispatch = useAppDispatch();
    dispatch(loadFlights(flights));
    dispatch(changeFlightsInAbovePeriod(flights));

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
                <Route
                    path={AppRoute.DetailedScreenYear}
                    element={<DetailedScreen/>}
                />
                <Route
                    path={AppRoute.DetailedScreenMonth}
                    element={<DetailedScreen/>}
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
