import {useAppDispatch, useAppSelector} from "../../hooks/redux-hooks";
import {getFilteredFlights} from "../../store/selectors";
import React from "react";
import {changeTakeOffAirportFilter} from "../../store/interface-process/interface-process";


function TakeOffAirportSelector(): JSX.Element {
    const dispatch = useAppDispatch();
    const filteredFlights = useAppSelector(getFilteredFlights);
    const allTakeOffAirportsSet = new Set<string>();
    filteredFlights.forEach((flight) => allTakeOffAirportsSet.add(flight.takeoff.name))
    const allTakeOffAirports = Array.from(allTakeOffAirportsSet);
    const defaultSelectValue = 'любой'

    const onSelectChange = (evt: React.ChangeEvent<HTMLSelectElement>) => {
        const airport = evt.target.value;
        if (airport === defaultSelectValue) {
            dispatch(changeTakeOffAirportFilter(undefined));
        } else {
            dispatch(changeTakeOffAirportFilter(airport));
        }
    }

    return (
        <fieldset className="takeoff-airport-selection-filedset" id="airport-fieldset">
            <legend className="takeoff-airport-selection-legend">Аэропорт взлета</legend>
            <select className="filter-selector takeoff-airport-select" id="airport-selector" defaultValue={defaultSelectValue} onChange={onSelectChange}>
                <option className="takeoff-airport-option" value={defaultSelectValue}>{defaultSelectValue}</option>
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
