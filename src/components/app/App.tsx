import React from 'react';
import './App.css';
import FlightsTable from "../flights-table/flights-table";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <FlightsTable />
      </header>
    </div>
  );
}

export default App;
