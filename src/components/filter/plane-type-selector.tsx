import {useAppDispatch, useAppSelector} from "../../hooks/redux-hooks";
import {getFilteredFlights, getPlaneTypeFilter} from "../../store/selectors";
import React, {useEffect, useRef} from "react";
import {changePlaneTypeFilter} from "../../store/interface-process/interface-process";
import {defaultSelectFilterValue} from "../../settings/consts";


function PlaneTypeSelector(): JSX.Element {
    const dispatch = useAppDispatch();
    const filteredFlights = useAppSelector(getFilteredFlights);
    const allPlaneTypesSet = new Set<string>();
    filteredFlights.forEach((flight) => allPlaneTypesSet.add(flight.plnType))
    const allPlaneTypes = Array.from(allPlaneTypesSet);
    const selectorField = useRef<HTMLSelectElement>(null);
    const planeTypeFilter = useAppSelector(getPlaneTypeFilter);

    const onSelectChange = (evt: React.ChangeEvent<HTMLSelectElement>) => {
        const planeType = evt.target.value;
        if (planeType === defaultSelectFilterValue) {
            dispatch(changePlaneTypeFilter(undefined));
        } else {
            dispatch(changePlaneTypeFilter(planeType));
        }
    }

    useEffect(() => {
        if (planeTypeFilter === undefined) {
            if (selectorField.current?.value !== undefined) {
                selectorField.current.value = defaultSelectFilterValue;
            }
        }
    }, [planeTypeFilter]);

    return (
        <fieldset className="plane-type-selection-filedset">
            <legend className="plane-type-selection-legend">Тип возд судна</legend>
            <select className="filter-selector plane-type-select" defaultValue={defaultSelectFilterValue} onChange={onSelectChange} ref={selectorField}>
                <option className="plane-type-option" value={defaultSelectFilterValue}>{defaultSelectFilterValue}</option>
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
