import './work-time-types.css';
import {useAppDispatch, useAppSelector} from "../../hooks/redux-hooks";
import {getFilteredFlights} from "../../store/selectors";
import React from "react";
import {changePlaneTypeFilter, changeWorkTimeFilter} from "../../store/interface-process/interface-process";
import {WorkTimeType} from "../../settings/work-time-type";


function WorkTimeTypes(): JSX.Element {
    const dispatch = useAppDispatch();

    const onRadioChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
        const chosenRadio = evt.target.value;
        switch (chosenRadio) {
            case 'fact':
                dispatch(changeWorkTimeFilter(WorkTimeType.Fact));
                break;
            case 'plan':
                dispatch(changeWorkTimeFilter(WorkTimeType.Plan));
                break;
            case 'all':
                dispatch(changeWorkTimeFilter(undefined));
                break;
        }
    }

    return (
        <fieldset className="work-time-types-filedset">
            <legend className="work-time-types-legend">Рабочее время</legend>
            <div className="work-time-types-wrapper">
                <label className="radio-label">
                    <input className="work-time-radio" name="work-time-radio" value="fact" type="radio" onChange={onRadioChange}/>факт
                </label>
                <label className="radio-label">
                    <input className="work-time-radio" name="work-time-radio" value="plan" type="radio" onChange={onRadioChange}/>план
                </label>
                <label className="radio-label">
                    <input className="work-time-radio" name="work-time-radio" value="all" type="radio" onChange={onRadioChange} defaultChecked={true}/>все
                </label>
            </div>
        </fieldset>
    );
}

export default WorkTimeTypes;
