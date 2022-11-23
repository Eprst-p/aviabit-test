import './show-flights-only-switcher.scss';
import {useAppDispatch} from "../../../hooks/redux-hooks";
import React, {useEffect, useState} from "react";
import {
    changeChosenDay,
    changeChosenMonth,
    changeChosenYear,
    changeShowedCardsPeriod
} from "../../../store/data-process/data-process";
import {ShowedCardsPeriods} from "../../../settings/showed-cards-periods";


function ShowFlightsOnlySwitcher(): JSX.Element {
    const dispatch = useAppDispatch();
    const [isShowingFlightsOnly, setShowingFlightsOnly] = useState(false);

    useEffect(() => {
        if (isShowingFlightsOnly) {
            dispatch(changeShowedCardsPeriod(ShowedCardsPeriods.SingleFlights));
        } else {
            dispatch(changeShowedCardsPeriod(ShowedCardsPeriods.Years));
            dispatch(changeChosenYear(undefined));
            dispatch(changeChosenMonth(undefined));
            dispatch(changeChosenDay(undefined));
        }
    }, [dispatch, isShowingFlightsOnly])


    const handleShowFlightsOnlyBtnClick = () => {
        setShowingFlightsOnly(!isShowingFlightsOnly);
    }

    return (
        <div className="show-flights-only-switcher-wrapper">
            <button className={`show-flights-only-btn ${isShowingFlightsOnly ? 'active': ''}`} onClick={handleShowFlightsOnlyBtnClick}>Показывать только рейсы</button>
        </div>
    );
}

export default ShowFlightsOnlySwitcher;
