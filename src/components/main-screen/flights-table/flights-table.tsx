import './flights-table.css';
import YearStats from "./year-stats";
import {SortOrder} from "../../../settings/sort-order";
import {sortAsc, sortDesc} from "../../../settings/sort-functions";
import {useAppDispatch, useAppSelector} from "../../../hooks/redux-hooks";
import {getAllFlights, getSortOrder} from "../../../store/selectors";
import {changeSortOrder} from "../../../store/interface-process/interface-process";
import {getUniquePeriods} from "../../../settings/get-unique-periods";
import {PeriodName} from "../../../settings/period-name";


function FlightsTable(): JSX.Element {
    const dispatch = useAppDispatch();
    const allFlights = useAppSelector(getAllFlights);

    const sortOrder = useAppSelector(getSortOrder)
    const years = getUniquePeriods(allFlights, PeriodName.Year);

    switch (sortOrder) {
        case SortOrder.Asc:
            years.sort(sortAsc);
            break;
        case SortOrder.Desc:
            years.sort(sortDesc);
            break;
    }

    const handleSortBtnDownClick = () => {
        dispatch(changeSortOrder(SortOrder.Asc))
    }

    const handleSortBtnUpClick = () => {
        dispatch(changeSortOrder(SortOrder.Desc))
    }

    return (
        <div className="flights-table-container" >
            <div className="flights-table">
                <div className="table-cell">Год
                    <button className={`sort-btn btn-down ${sortOrder === SortOrder.Asc ?'sort-btn--active' : ''}`} onClick={handleSortBtnDownClick}></button>
                    <button className={`sort-btn btn-up ${sortOrder === SortOrder.Desc ?'sort-btn--active' : ''}`} onClick={handleSortBtnUpClick}></button>
                </div>
                <div className="table-cell">Количество рейсов</div>
                <div className="table-cell">Налет</div>
                <div className="table-cell">Рабочее время по факту</div>
                <div className="table-cell">Рабочее время по плану</div>
                {
                    years.map((year) =>
                        <YearStats year={year} key={year} />,
                    )
                }
            </div>
        </div>
    );
}

export default FlightsTable;
