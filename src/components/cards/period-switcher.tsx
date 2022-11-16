import './period-switcher.css';
// import {useAppDispatch, useAppSelector} from "../../hooks/redux-hooks";
// import React from "react";
// import {changeFlightsToShow, changeShowedPeriod} from "../../store/data-process/data-process";
// import {PeriodName} from "../../settings/period-name";
// import {getFilteredFlights} from "../../store/selectors";
//
//
// function PeriodSwitcher(): JSX.Element {
//     const dispatch = useAppDispatch();
//     const allFilteredFlights = useAppSelector(getFilteredFlights);
//
//     const onPeriodRadioChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
//         const chosenRadio = evt.target.value;
//         switch (chosenRadio) {
//             case 'years':
//                 dispatch(changeShowedPeriod(PeriodName.AllYears));
//                 dispatch(changeFlightsToShow(allFilteredFlights));
//                 break;
//             case 'months':
//                 dispatch(changeShowedPeriod(PeriodName.Year));
//                 dispatch(changeFlightsToShow(allFilteredFlights));
//                 break;
//             case 'days':
//                 dispatch(changeShowedPeriod(PeriodName.Month));
//                 dispatch(changeFlightsToShow(allFilteredFlights));
//                 break;
//             case 'flights':
//                 dispatch(changeShowedPeriod(PeriodName.Day));
//                 dispatch(changeFlightsToShow(allFilteredFlights));
//                 break;
//         }
//     }
//
//     return (
//         <fieldset className="period-switcher-fieldset">
//             <legend className="period-switch-legend">Отображаемый период:</legend>
//             <div className="period-switcher-wrapper">
//                 <label className="period-label">
//                     <input className="period-radio" name="period-radio" value="years" type="radio" onChange={onPeriodRadioChange} defaultChecked={true}/>года
//                 </label>
//                 <label className="period-label">
//                     <input className="period-radio" name="period-radio" value="months" type="radio" onChange={onPeriodRadioChange}/>месяцы
//                 </label>
//                 <label className="period-label">
//                     <input className="period-radio" name="period-radio" value="days" type="radio" onChange={onPeriodRadioChange}/>дни
//                 </label>
//                 <label className="period-label">
//                     <input className="period-radio" name="period-radio" value="flights" type="radio" onChange={onPeriodRadioChange}/>рейсы
//                 </label>
//             </div>
//         </fieldset>
//     );
// }
//
// export default PeriodSwitcher;
