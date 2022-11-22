import './work-time-types.scss';
import {useAppDispatch, useAppSelector} from "../../hooks/redux-hooks";
import {getWorkTypeFilter} from "../../store/selectors";
import React, {useEffect, useRef} from "react";
import {changeWorkTimeFilter} from "../../store/interface-process/interface-process";
import {WorkTimeType} from "../../settings/work-time-type";


function WorkTimeTypes(): JSX.Element {
    const dispatch = useAppDispatch();
    const radioBtnAllWorkTime = useRef<HTMLInputElement>(null);
    const workTimeFilter = useAppSelector(getWorkTypeFilter);

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

    useEffect(() => {
        if (workTimeFilter === undefined) {
            if (radioBtnAllWorkTime.current?.value !== undefined) {
                radioBtnAllWorkTime.current.checked = true;
            }
        }
    }, [workTimeFilter]);


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
                    <input className="work-time-radio" name="work-time-radio" value="all" type="radio" onChange={onRadioChange} defaultChecked={true} ref={radioBtnAllWorkTime}/>все
                </label>
            </div>
        </fieldset>
    );
}

export default WorkTimeTypes;
