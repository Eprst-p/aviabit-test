import './bread-crumbs.scss';
import {useAppDispatch, useAppSelector} from "../../hooks/redux-hooks";
import {getChosenDay, getChosenMonth, getChosenYear} from "../../store/selectors";
import {monthNames} from "../../settings/months-names";
import {
    changeChosenDay,
    changeChosenMonth,
    changeChosenYear,
    changeShowedCardsPeriod
} from "../../store/data-process/data-process";
import {ShowedCardsPeriods} from "../../settings/showed-cards-periods";
import {PeriodData} from "../../types/period-data";

type BreadCrumbsProps = {
    periodData: PeriodData
}

function BreadCrumbs({periodData}: BreadCrumbsProps): JSX.Element {
    const dispatch = useAppDispatch();
    const {year, month, day} = periodData;

    const onAllYearsCrumbClick = () => {
        dispatch(changeShowedCardsPeriod(ShowedCardsPeriods.Years));
        dispatch(changeChosenYear(undefined));
        dispatch(changeChosenMonth(undefined));
        dispatch(changeChosenDay(undefined));
    }

    const onYearCrumbClick = () => {
        dispatch(changeShowedCardsPeriod(ShowedCardsPeriods.Months));
        dispatch(changeChosenYear(year));
        dispatch(changeChosenMonth(undefined));
        dispatch(changeChosenDay(undefined));
    }

    const onMonthCrumbClick = () => {
        dispatch(changeShowedCardsPeriod(ShowedCardsPeriods.Days));
        dispatch(changeChosenYear(year));
        dispatch(changeChosenMonth(month));
        dispatch(changeChosenDay(undefined));
    }


    return (
        <ul className="bread-crumbs">
            <li className="crumb-element" onClick={onAllYearsCrumbClick}>{`Все года`}</li>
            {year ? <li className="crumb-element" onClick={onYearCrumbClick}>{` -> ${year}`}</li> : ''}
            {month ? <li className="crumb-element" onClick={onMonthCrumbClick}>{` -> ${monthNames[+month]}`}</li> : ''}
            {day ? <li className="crumb-element">{` -> ${day} число`}</li> : ''}
        </ul>
    );
}

export default BreadCrumbs;
