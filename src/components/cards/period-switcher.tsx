import './period-switcher.css';
import {useAppDispatch, useAppSelector} from "../../hooks/redux-hooks";
import React from "react";
import {changeFlightsToShow, changeShowedCardsPeriod} from "../../store/data-process/data-process";
import {ShowedCardsPeriods} from "../../settings/showed-cards-periods";
import {getFilteredFlights} from "../../store/selectors";


function PeriodSwitcher(): JSX.Element {
    const dispatch = useAppDispatch();
    const allFilteredFlights = useAppSelector(getFilteredFlights);

    const onPeriodRadioChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
        const chosenRadio = evt.target.value;
        switch (chosenRadio) {
            case 'years':
                dispatch(changeShowedCardsPeriod(ShowedCardsPeriods.Years));
                //dispatch(changeFlightsToShow(allFilteredFlights));
                break;
            case 'months':
                dispatch(changeShowedCardsPeriod(ShowedCardsPeriods.Months));
                //dispatch(changeFlightsToShow(allFilteredFlights));
                break;
            case 'days':
                dispatch(changeShowedCardsPeriod(ShowedCardsPeriods.Days));
                // dispatch(changeFlightsToShow(allFilteredFlights));
                break;
            case 'flights':
                dispatch(changeShowedCardsPeriod(ShowedCardsPeriods.SingleFlights));
                // dispatch(changeFlightsToShow(allFilteredFlights));
                break;
        }
    }

    return (
        <div className="period-switcher-wrapper">
            <p className="period-switch-title">Отображаемый период:</p>
                <label className="period-label">
                    <input className="period-radio" name="period-radio" value="years" type="radio" onChange={onPeriodRadioChange} defaultChecked={true}/>года
                </label>
                <label className="period-label">
                    <input className="period-radio" name="period-radio" value="months" type="radio" onChange={onPeriodRadioChange}/>месяцы
                </label>
                <label className="period-label">
                    <input className="period-radio" name="period-radio" value="days" type="radio" onChange={onPeriodRadioChange}/>дни
                </label>
                <label className="period-label">
                    <input className="period-radio" name="period-radio" value="flights" type="radio" onChange={onPeriodRadioChange}/>рейсы
                </label>
        </div>
    );
}

export default PeriodSwitcher;
