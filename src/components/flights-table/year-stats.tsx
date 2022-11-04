import {flights} from "../../mocks/create-flights";

type FlightProps = {
    year: number;
}

function YearStats({year}: FlightProps): JSX.Element {
    const flightsPerYear = flights.filter((flight) => {
        const flightDate = new Date(flight.dateFlight);
        const currentYear = flightDate.getFullYear();
        return currentYear === year;
    })
    let flightTime = 0;
    let workTimeFact = 0;
    let workTimePlan = 0;
    flightsPerYear.forEach((flight)=>{
        flightTime += flight.timeFlight;
        flight.type === 0 ? workTimeFact += flight.timeWork : workTimePlan += flight.timeWork;
    })

    return (
        <>
            <div className="table-cell">{year}</div>
            <div className="table-cell">{flightTime}</div>
            <div className="table-cell">{workTimeFact}</div>
            <div className="table-cell">{workTimePlan}</div>
        </>
    );
}

export default YearStats;
