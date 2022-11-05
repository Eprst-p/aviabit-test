import './flights-table.css';
import {flights} from "../../mocks/create-flights";
import YearStats from "./year-stats";

function FlightsTable(): JSX.Element {
    const uniqueYears = new Set<number>();
    flights.forEach(flight => {
        const flightDate = new Date(flight.dateFlight);
        const year = flightDate.getFullYear();
        uniqueYears.add(year);
    });
    const yearsArr:number[] = Array.from(uniqueYears);
    yearsArr.sort();

    return (
        <main className="page-content">
            <div className="container" data-testid="main-container">
                <h1 className="page-content__title">Командир воздушного судна USS Enterprise</h1>
                <div className="flights-table">
                        <div className="table-cell">Год</div>
                        <div className="table-cell">Налет</div>
                        <div className="table-cell">Рабочее время по факту</div>
                        <div className="table-cell">Рабочее время по плану</div>
                    {
                        yearsArr.map((year) =>
                            <YearStats year={year} key={year} />,
                        )
                    }
                </div>
            </div>
        </main>
    );
}

export default FlightsTable;
