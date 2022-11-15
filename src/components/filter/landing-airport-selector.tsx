import {useAppDispatch, useAppSelector} from "../../hooks/redux-hooks";
import {getFilteredFlights} from "../../store/selectors";
import React from "react";
import {changeLandingAirportFilter} from "../../store/interface-process/interface-process";


function LandingAirportSelector(): JSX.Element {
    const dispatch = useAppDispatch();
    const filteredFlights = useAppSelector(getFilteredFlights);
    const allLandingAirportsSet = new Set<string>();
    filteredFlights.forEach((flight) => allLandingAirportsSet.add(flight.landing.name))
    const allLandingAirports = Array.from(allLandingAirportsSet);
    const defaultSelectValue = 'любой'

    const onSelectChange = (evt: React.ChangeEvent<HTMLSelectElement>) => {
        const airport = evt.target.value;
        if (airport === defaultSelectValue) {
            dispatch(changeLandingAirportFilter(undefined));
        } else {
            dispatch(changeLandingAirportFilter(airport));
        }
    }

    return (
        <fieldset className="landing-selection-filedset" id="airport-fieldset">
            <legend className="landing-selection-legend">Аэропорт посадки</legend>
            <select className="filter-selector landing-select" id="airport-selector" defaultValue={defaultSelectValue} onChange={onSelectChange}>
                <option className="landing-option" value={defaultSelectValue}>{defaultSelectValue}</option>
                {
                    allLandingAirports.map((airport) =>
                        <option className="landing-option" value={airport} key={airport}>{airport}</option>
                    )
                }
            </select>
        </fieldset>
    );
}

export default LandingAirportSelector;
