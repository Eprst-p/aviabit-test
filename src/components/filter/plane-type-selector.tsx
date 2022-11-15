import {useAppDispatch, useAppSelector} from "../../hooks/redux-hooks";
import {getFilteredFlights} from "../../store/selectors";
import React from "react";
import {changePlaneTypeFilter} from "../../store/interface-process/interface-process";


function PlaneTypeSelector(): JSX.Element {
    const dispatch = useAppDispatch();
    const filteredFlights = useAppSelector(getFilteredFlights);
    const allPlaneTypesSet = new Set<string>();
    filteredFlights.forEach((flight) => allPlaneTypesSet.add(flight.plnType))
    const allPlaneTypes = Array.from(allPlaneTypesSet);
    const defaultSelectValue = 'любое'

    const onSelectChange = (evt: React.ChangeEvent<HTMLSelectElement>) => {
        const planeType = evt.target.value;
        if (planeType === defaultSelectValue) {
            dispatch(changePlaneTypeFilter(undefined));
        } else {
            dispatch(changePlaneTypeFilter(planeType));
        }
    }

    return (
        <fieldset className="plane-type-selection-filedset">
            <legend className="plane-type-selection-legend">Тип возд судна</legend>
            <select className="filter-selector plane-type-select" defaultValue={defaultSelectValue} onChange={onSelectChange}>
                <option className="plane-type-option" value={defaultSelectValue}>{defaultSelectValue}</option>
                {
                    allPlaneTypes.map((planeType) =>
                        <option className="plane-type-option" value={planeType} key={planeType}>{planeType}</option>
                    )
                }
            </select>
        </fieldset>
    );
}

export default PlaneTypeSelector;
