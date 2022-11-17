import {useAppDispatch, useAppSelector} from "../../hooks/redux-hooks";
import {getFilteredFlights, getPlaneTypeFilter, getSideNumberFilter} from "../../store/selectors";
import React, {useEffect, useRef} from "react";
import {changeSideNumberFilter} from "../../store/interface-process/interface-process";


function SideNumberSelector(): JSX.Element {
    const dispatch = useAppDispatch();
    const filteredFlights = useAppSelector(getFilteredFlights);
    const allSideNumbersSet = new Set<string>();
    filteredFlights.forEach((flight) => allSideNumbersSet.add(flight.pln))
    const allSideNumbers = Array.from(allSideNumbersSet);
    const defaultSelectValue = 'любой';
    const selectorField = useRef<HTMLSelectElement>(null);
    const sideNumberFilter = useAppSelector(getSideNumberFilter);


    const onSelectChange = (evt: React.ChangeEvent<HTMLSelectElement>) => {
        const sideNumber = evt.target.value;
        if (sideNumber === defaultSelectValue) {
            dispatch(changeSideNumberFilter(undefined));
        } else {
            dispatch(changeSideNumberFilter(sideNumber));
        }
    }

    useEffect(() => {
        if (sideNumberFilter === undefined) {
            if (selectorField.current?.value !== undefined) {
                selectorField.current.value = defaultSelectValue;
            }
        }
    }, [sideNumberFilter]);


    return (
        <fieldset className="side-number-selection-filedset">
            <legend className="side-number-selection-legend">Борт номер</legend>
            <select className="filter-selector side-number-select" defaultValue={defaultSelectValue} onChange={onSelectChange} ref={selectorField}>
                <option className="side-number-option" value={defaultSelectValue}>{defaultSelectValue}</option>
                {
                    allSideNumbers.map((sideNumber) =>
                        <option className="side-number-option" value={sideNumber} key={sideNumber}>{sideNumber}</option>
                    )
                }
            </select>
        </fieldset>
    );
}

export default SideNumberSelector;
