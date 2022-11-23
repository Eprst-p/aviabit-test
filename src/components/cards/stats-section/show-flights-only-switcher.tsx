import './show-flights-only-switcher.scss';
import {useAppDispatch, useAppSelector} from "../../../hooks/redux-hooks";
import {
    changeChosenDay,
    changeChosenMonth,
    changeChosenYear,
    changeShowedCardsPeriod
} from "../../../store/data-process/data-process";
import {ShowedCardsPeriods} from "../../../settings/showed-cards-periods";
import {getShowedCardsPeriods} from "../../../store/selectors";


function ShowFlightsOnlySwitcher(): JSX.Element {
    const dispatch = useAppDispatch();
    const showedCardsPeriods = useAppSelector(getShowedCardsPeriods);


    const handleShowFlightsOnlyBtnClick = () => {
        if (showedCardsPeriods !== ShowedCardsPeriods.SingleFlights) {
            dispatch(changeShowedCardsPeriod(ShowedCardsPeriods.SingleFlights));
        } else {
            dispatch(changeShowedCardsPeriod(ShowedCardsPeriods.Years));
            dispatch(changeChosenYear(undefined));
            dispatch(changeChosenMonth(undefined));
            dispatch(changeChosenDay(undefined));
        }
    }

    return (
        <div className="show-flights-only-switcher-wrapper">
            <button className={`show-flights-only-btn ${showedCardsPeriods === ShowedCardsPeriods.SingleFlights ? 'active': ''}`} onClick={handleShowFlightsOnlyBtnClick}>Рейсы</button>
        </div>
    );
}

export default ShowFlightsOnlySwitcher;
