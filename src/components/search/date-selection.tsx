import "flatpickr/dist/themes/material_green.css";
import './date-selection.scss';
import Flatpickr from "react-flatpickr";
import {useEffect, useState} from "react";
import flatpickr from "flatpickr";
import { Russian } from "flatpickr/dist/l10n/ru.js";
import {useAppDispatch, useAppSelector} from "../../hooks/redux-hooks";
import {getFilteredFlights} from "../../store/selectors";
import {sortByISODate} from "../../settings/sort-functions";
import {changeEndDateFilter, changeStartDateFilter} from "../../store/interface-process/interface-process";

function DateSelection(): JSX.Element {
    const dispatch = useAppDispatch();
    flatpickr.localize(Russian);
    const filteredFlights = useAppSelector(getFilteredFlights);
    const dates = filteredFlights.map(flight => flight.dateFlight);
    dates.sort(sortByISODate);
    const minDate = dates[0];
    const maxDate = dates[dates.length - 1];

    const [startDate, setStartDate] = useState<Date | undefined>(new Date(minDate));
    const [endDate, setEndDate] = useState<Date | undefined>(new Date(maxDate));

    useEffect(() => {
        setStartDate(new Date(minDate));
        setEndDate(new Date(maxDate));
    }, [minDate, maxDate])

    const flatpickrOptions: flatpickr.Options.Options = {
        minDate: minDate,
        maxDate: maxDate,
    }

    return (
        <fieldset className="date-selection-fieldset">
            <legend className="date-selection-fieldset-legend">Рейсы за период</legend>
            <p>с</p>
            <Flatpickr
                value={startDate}
                onChange={([date]) => {
                    setStartDate(date);
                    dispatch(changeStartDateFilter(date.toISOString()));
                }}
                options={flatpickrOptions}
            />
            <p>по</p>
            <Flatpickr
                value={endDate}
                onChange={([date]) => {
                    setEndDate(date);
                    dispatch(changeEndDateFilter(date.toISOString()));
                }}
                options={flatpickrOptions}
            />
        </fieldset>
    );
}

export default DateSelection;
