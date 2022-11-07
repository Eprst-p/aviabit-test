import './App.css';
import FlightsTable from "../flights-table/flights-table";
import {useAppDispatch} from "../../hooks/redux-hooks";
import {loadFlights} from "../../store/data-process/data-process";
import {flights} from "../../mocks/create-flights";

function App() {
    const dispatch = useAppDispatch();
    dispatch(loadFlights(flights));

    return (
    <div className="App">
      <header className="App-header">
        <FlightsTable />
      </header>
    </div>
  );
}

export default App;
