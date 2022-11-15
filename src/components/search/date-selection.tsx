import "flatpickr/dist/themes/material_green.css";
import Flatpickr from "react-flatpickr";
import {useState} from "react";

function DateSelection(): JSX.Element {
    const [startDate, setStartDate] = useState(new Date());

    return (
        <fieldset className="date-selection-fieldset">
            <legend className="date-selection-fieldset-legend">Показать за период</legend>

            <Flatpickr
                value={startDate}
                onChange={([date]) => {
                    setStartDate(date);
                }}
            />

        </fieldset>
    );
}

export default DateSelection;
