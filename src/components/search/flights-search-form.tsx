import './flights-search-form.css';
import {useAppDispatch, useAppSelector} from "../../hooks/redux-hooks";
import React, {useRef, useState} from "react";
import {getFlightNames} from "../../store/selectors";
import {changeSearchedFlight} from "../../store/interface-process/interface-process";

function FlightsSearchForm(): JSX.Element {
    const dispatch = useAppDispatch();
    const searchField = useRef<HTMLInputElement>(null);
    const flightsNames = useAppSelector(getFlightNames);
    const [isOpenedSelectList, setSelectListStatus] = useState(false);
    const [flightsLikeTyped, setFlightsLikeTyped] = useState<string[]>([])

    const handleSearchFieldOnInput = () => {
        if (searchField.current?.value !== '') {
            const flightTyped = searchField.current?.value.toUpperCase();
            if (flightTyped && flightTyped.length === 2) {
                setSelectListStatus(true);
                setFlightsLikeTyped(flightsNames.filter(flightName => flightName.includes(flightTyped)));
            }
            if (flightTyped && flightsNames.includes(flightTyped)) {
                dispatch(changeSearchedFlight(flightTyped));
            }
        }
        if (searchField.current?.value === '') {
            setFlightsLikeTyped([]);
            setSelectListStatus(false);
        }
    }

    const handleSearchFieldOnBlur = () => {
        setTimeout(() => setSelectListStatus(false), 150);

    }

    const handleOnSelectItemClick = (evt: React.MouseEvent<HTMLLIElement>) => {
        if (searchField.current?.value !== undefined && evt.currentTarget.textContent !== null) {
            searchField.current.value = evt.currentTarget.textContent;
            dispatch(changeSearchedFlight(evt.currentTarget.textContent));
            setSelectListStatus(false);
        }
    }


    return (
        <fieldset className="flights-search-fieldset" id="flights-search-fieldset">
            <legend className="date-selection-fieldset-legend">Поиск среди всех рейсов</legend>
            <form className="form-search-flights" id="form-search">
                <input
                    className="form-search-input"
                    id="search"
                    type="text"
                    autoComplete="off"
                    placeholder="введите номер рейса"
                    onInput={handleSearchFieldOnInput}
                    onBlur={handleSearchFieldOnBlur}
                    ref={searchField}
                />
            </form>
            <ul className={`form-search-select-list ${isOpenedSelectList ? 'list-opened' : 'hidden'}`} >
                {
                    flightsLikeTyped.map((flightName) =>
                        (
                            <li className="form-search__select-item" tabIndex={1} key={flightName} onClick={handleOnSelectItemClick} >
                                {flightName}
                            </li>
                        ),
                    )
                }
            </ul>
        </fieldset>
    );
}

export default FlightsSearchForm;
