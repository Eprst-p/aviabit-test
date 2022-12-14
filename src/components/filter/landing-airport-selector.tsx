import {useAppDispatch, useAppSelector} from "../../hooks/redux-hooks";
import {getFilteredFlights, getLandingAirportFilter} from "../../store/selectors";
import React, {useEffect, useRef} from "react";
import {changeLandingAirportFilter} from "../../store/interface-process/interface-process";
import {defaultSelectFilterValue} from "../../settings/consts";


function LandingAirportSelector(): JSX.Element {
    const dispatch = useAppDispatch();
    const filteredFlights = useAppSelector(getFilteredFlights);
    const allLandingAirportsSet = new Set<string>();
    filteredFlights.forEach((flight) => allLandingAirportsSet.add(flight.landing.name))
    const allLandingAirports = Array.from(allLandingAirportsSet);
    const selectorField = useRef<HTMLSelectElement>(null);
    const landingAirportFilter = useAppSelector(getLandingAirportFilter);


    const onSelectChange = (evt: React.ChangeEvent<HTMLSelectElement>) => {
        const airport = evt.target.value;
        if (airport === defaultSelectFilterValue) {
            dispatch(changeLandingAirportFilter(undefined));
        } else {
            dispatch(changeLandingAirportFilter(airport));
        }
    }

    useEffect(() => {
        if (landingAirportFilter === undefined) {
            if (selectorField.current?.value !== undefined) {
                selectorField.current.value = defaultSelectFilterValue;
            }
        }
    }, [landingAirportFilter]);


    return (
        <fieldset className="landing-selection-filedset" id="airport-fieldset">
            <legend className="landing-selection-legend">Аэропорт посадки</legend>
            <select className="filter-selector landing-select" id="airport-selector" defaultValue={defaultSelectFilterValue} onChange={onSelectChange} ref={selectorField}>
                <option className="landing-option" value={defaultSelectFilterValue}>{defaultSelectFilterValue}</option>
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
