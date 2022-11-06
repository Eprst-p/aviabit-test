import './flights-table.css';
import {flights} from "../../mocks/create-flights";
import YearStats from "./year-stats";
import {SortOrder} from "../../settings/sort-order";
import {useState} from "react";
import {sortAsc, sortDesc} from "../../settings/sort-functions";
import ChartGraphs from "./chart-graphs";


function FlightsTable(): JSX.Element {
    const [sortOrder, setSortOrder] = useState(SortOrder.Asc)

    const uniqueYears = new Set<number>();
    flights.forEach(flight => {
        const flightDate = new Date(flight.dateFlight);
        const year = flightDate.getFullYear();
        uniqueYears.add(year);
    });
    const yearsArr:number[] = Array.from(uniqueYears);

    switch (sortOrder) {
        case SortOrder.Asc:
            yearsArr.sort(sortAsc);
            break;
        case SortOrder.Desc:
            yearsArr.sort(sortDesc);
            break;
    }

    const handleSortBtnDownClick = () => {
        setSortOrder(SortOrder.Asc);
    }

    const handleSortBtnUpClick = () => {
        setSortOrder(SortOrder.Desc);
    }

    return (
        <main className="page-content">
            <div className="container" data-testid="main-container">
                <h1 className="page-content__title">Командир воздушного судна USS Enterprise</h1>
                <div className="flights-table">
                        <div className="table-cell">Год
                            <button className={`sort-btn btn-down ${sortOrder === SortOrder.Asc ?'sort-btn--active' : ''}`} onClick={handleSortBtnDownClick}></button>
                            <button className={`sort-btn btn-up ${sortOrder === SortOrder.Desc ?'sort-btn--active' : ''}`} onClick={handleSortBtnUpClick}></button>
                        </div>
                        <div className="table-cell">Налет</div>
                        <div className="table-cell">Рабочее время по факту</div>
                        <div className="table-cell">Рабочее время по плану</div>
                    {
                        yearsArr.map((year) =>
                            <YearStats year={year} key={year} />,
                        )
                    }
                </div>
                <div className="chart-container">
                    <ChartGraphs years={yearsArr} />
                </div>
            </div>
        </main>
    );
}

export default FlightsTable;
