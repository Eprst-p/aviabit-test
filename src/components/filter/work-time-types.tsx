import './work-time-types.scss';
import {useAppDispatch, useAppSelector} from "../../hooks/redux-hooks";
import {getFilteredFlights, getWorkTypeFilter} from "../../store/selectors";
import React, {useEffect, useRef, useState} from "react";
import {changeWorkTimeFilter} from "../../store/interface-process/interface-process";
import {WorkTimeType} from "../../settings/work-time-type";


function WorkTimeTypes(): JSX.Element {
    const dispatch = useAppDispatch();
    const radioBtnAllWorkTime = useRef<HTMLInputElement>(null);
    const workTimeFilter = useAppSelector(getWorkTypeFilter);
    const filteredFlights = useAppSelector(getFilteredFlights);
    const [factTimeExists, setFactTimeExists] = useState(true);
    const [planTimeExists, setPlanTimeExists] = useState(true);

    useEffect(() => {
        const anyFlightWithFactTime = filteredFlights.find(flight => flight.type === WorkTimeType.Fact);
        const anyFlightWithPlanTime = filteredFlights.find(flight => flight.type === WorkTimeType.Plan);
        if (!anyFlightWithFactTime) {
            setFactTimeExists(false);
        } else {
            setFactTimeExists(true);
        }
        if (!anyFlightWithPlanTime) {
            setPlanTimeExists(false);
        } else {
            setPlanTimeExists(true);
        }
    }, [filteredFlights])




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
                    <input className="work-time-radio" name="work-time-radio" value="fact" type="radio" onChange={onRadioChange} disabled={!factTimeExists}/>факт
                </label>
                <label className="radio-label">
                    <input className="work-time-radio" name="work-time-radio" value="plan" type="radio" onChange={onRadioChange} disabled={!planTimeExists}/>план
                </label>
                <label className="radio-label">
                    <input className="work-time-radio" name="work-time-radio" value="all" type="radio" onChange={onRadioChange} defaultChecked={true} ref={radioBtnAllWorkTime}/>все
                </label>
            </div>
        </fieldset>
    );
}

export default WorkTimeTypes;
