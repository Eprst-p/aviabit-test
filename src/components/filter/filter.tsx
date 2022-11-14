

function Filter(): JSX.Element {

    return (
        <section className="filter-section">
            <fieldset className="work-time-type-filedset">
                <legend className="work-time-type-legend">Рабочее время</legend>
                <div className="work-time-checkbox-wrapper">
                    <input
                        className="work-time-checkbox"
                        type="checkbox"
                        name="fact"
                    />
                    <label htmlFor="fact">факт</label>
                </div>
                <div className="work-time-checkbox-wrapper">
                    <input
                        className="work-time-checkbox"
                        type="checkbox"
                        name="fact"
                    />
                    <label htmlFor="fact">факт</label>
                </div>
            </fieldset>
            <select className="plane-type-selection">
                <option></option>

            </select>

        </section>
    );
}

export default Filter;
