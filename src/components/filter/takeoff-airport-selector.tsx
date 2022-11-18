import {useAppDispatch, useAppSelector} from "../../hooks/redux-hooks";
import {getFilteredFlights, getTakeOffAirportFilter} from "../../store/selectors";
import React, {useEffect, useRef} from "react";
import {changeTakeOffAirportFilter} from "../../store/interface-process/interface-process";
import {defaultSelectFilterValue} from "../../settings/consts";


function TakeOffAirportSelector(): JSX.Element {
    const dispatch = useAppDispatch();
    const filteredFlights = useAppSelector(getFilteredFlights);
    const allTakeOffAirportsSet = new Set<string>();
    filteredFlights.forEach((flight) => allTakeOffAirportsSet.add(flight.takeoff.name))
    const allTakeOffAirports = Array.from(allTakeOffAirportsSet);
    const selectorField = useRef<HTMLSelectElement>(null);
    const takeoffAirportFilter = useAppSelector(getTakeOffAirportFilter);


    const onSelectChange = (evt: React.ChangeEvent<HTMLSelectElement>) => {
        const airport = evt.target.value;
        if (airport === defaultSelectFilterValue) {
            dispatch(changeTakeOffAirportFilter(undefined));
        } else {
            dispatch(changeTakeOffAirportFilter(airport));
        }
    }

    useEffect(() => {
        if (takeoffAirportFilter === undefined) {
            if (selectorField.current?.value !== undefined) {
                selectorField.current.value = defaultSelectFilterValue;
            }
        }
    }, [takeoffAirportFilter]);


    return (
        <fieldset className="takeoff-airport-selection-filedset" id="airport-fieldset">
            <legend className="takeoff-airport-selection-legend">Аэропорт взлета</legend>
            <select className="filter-selector takeoff-airport-select" id="airport-selector" defaultValue={defaultSelectFilterValue} onChange={onSelectChange} ref={selectorField}>
                <option className="takeoff-airport-option" value={defaultSelectFilterValue}>{defaultSelectFilterValue}</option>
                {
                    allTakeOffAirports.map((airport) =>
                        <option className="takeoff-airport-option" value={airport} key={airport}>{airport}</option>
                    )
                }
            </select>
        </fieldset>
    );
}

export default TakeOffAirportSelector;
