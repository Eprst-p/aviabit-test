import './cancel-filters-btn.scss';
import {useAppDispatch} from "../../../hooks/redux-hooks";
import {
    changeEndDateFilter,
    changeLandingAirportFilter,
    changePlaneTypeFilter, changeSearchedFlight,
    changeSideNumberFilter, changeStartDateFilter, changeTakeOffAirportFilter,
    changeWorkTimeFilter
} from "../../../store/interface-process/interface-process";
import {
    changeChosenDay,
    changeChosenMonth,
    changeChosenYear,
    changeShowedCardsPeriod
} from "../../../store/data-process/data-process";
import {ShowedCardsPeriods} from "../../../settings/showed-cards-periods";


function CancelFiltersBtn(): JSX.Element {
    const dispatch = useAppDispatch();

    const handlerCancelBtnClick = () => {
        dispatch(changeWorkTimeFilter(undefined));
        dispatch(changePlaneTypeFilter(undefined));
        dispatch(changeSideNumberFilter(undefined));
        dispatch(changeTakeOffAirportFilter(undefined));
        dispatch(changeLandingAirportFilter(undefined));
        dispatch(changeStartDateFilter(undefined));
        dispatch(changeEndDateFilter(undefined));
        dispatch(changeSearchedFlight(undefined));
        dispatch(changeChosenYear(undefined));
        dispatch(changeChosenMonth(undefined));
        dispatch(changeChosenDay(undefined));
        dispatch(changeShowedCardsPeriod(ShowedCardsPeriods.Years));
    }

        return (
        <div className="cancel-filters-btn-wrapper">
            <button className="cancel-filters-btn" onClick={handlerCancelBtnClick}>Сбросить все фильтры</button>

        </div>
    );
}

export default CancelFiltersBtn;
