import './bread-crumbs.css';
import {useAppDispatch, useAppSelector} from "../../hooks/redux-hooks";
import {getChosenDay, getChosenMonth, getChosenYear} from "../../store/selectors";
import {monthNames} from "../../settings/months-names";
import {
    changeChosenDay,
    changeChosenMonth,
    changeChosenYear,
    changeShowedPeriod
} from "../../store/data-process/data-process";
import {PeriodName} from "../../settings/period-name";


function BreadCrumbs(): JSX.Element {
    const dispatch = useAppDispatch();
    const chosenYear = useAppSelector(getChosenYear);
    const chosenMonth = useAppSelector(getChosenMonth);
    const chosenDay = useAppSelector(getChosenDay);

    const onAllYearsCrumbClick = () => {
        dispatch(changeShowedPeriod(PeriodName.AllYears));
        dispatch(changeChosenYear(undefined));
        dispatch(changeChosenMonth(undefined));
        dispatch(changeChosenDay(undefined));
    }

    const onYearCrumbClick = () => {
        dispatch(changeShowedPeriod(PeriodName.Year));
        dispatch(changeChosenYear(chosenYear));
        dispatch(changeChosenMonth(undefined));
        dispatch(changeChosenDay(undefined));
    }

    const onMonthCrumbClick = () => {
        dispatch(changeShowedPeriod(PeriodName.Month));
        dispatch(changeChosenYear(chosenYear));
        dispatch(changeChosenMonth(chosenMonth));
        dispatch(changeChosenDay(undefined));
    }



    return (
        <ul className="bread-crumbs">
            <li className="crumb-element" onClick={onAllYearsCrumbClick}>{`Все года`}</li>
            {chosenYear ? <li className="crumb-element" onClick={onYearCrumbClick}>{` -> ${chosenYear}`}</li> : ''}
            {chosenMonth ? <li className="crumb-element" onClick={onMonthCrumbClick}>{` -> ${monthNames[+chosenMonth]}`}</li> : ''}
            {chosenDay ? <li className="crumb-element">{` -> ${chosenDay} число`}</li> : ''}
        </ul>
    );
}

export default BreadCrumbs;
