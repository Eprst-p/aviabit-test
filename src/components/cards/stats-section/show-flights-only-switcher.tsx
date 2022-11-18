import './show-flights-only-switcher.css';
import {useAppDispatch} from "../../../hooks/redux-hooks";
import React, {useRef} from "react";
import {
    changeChosenDay,
    changeChosenMonth,
    changeChosenYear,
    changeShowedCardsPeriod
} from "../../../store/data-process/data-process";
import {ShowedCardsPeriods} from "../../../settings/showed-cards-periods";


function ShowFlightsOnlySwitcher(): JSX.Element {
    const dispatch = useAppDispatch();
    const switcherCheckboxField = useRef<HTMLInputElement>(null);

    const handlerCheckboxChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
        const checked = evt.target.checked;
        if (checked) {
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
            <p className="show-flights-only-title">Показывать только рейсы</p>
            <label className="switcher">
                <input type="checkbox" ref={switcherCheckboxField} onChange={handlerCheckboxChange}/>
                    <span className="slider round"></span>
            </label>
        </div>
    );
}

export default ShowFlightsOnlySwitcher;
