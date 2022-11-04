import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/app/App';
import reportWebVitals from './reportWebVitals';
import {flights} from "./mocks/create-flights";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

console.log(flights);

const uniqueYears = new Set();
flights.forEach(flight => {
    const flightDate = new Date(flight.dateFlight);
    const year = flightDate.getFullYear();
    uniqueYears.add(year);
});

console.log(uniqueYears);



