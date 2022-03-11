import React from 'react';
import './App.css';
import {BrowserRouter as Router, Link, Route, Routes} from 'react-router-dom';
import {HomePage} from "./HomePage";
import {AnalysePage} from "./AnalysePage";
import HeaderContainer from "./HeaderContainer";

function App() {
  return (
      <Router>
        <HeaderContainer/>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/analyse" element={<AnalysePage />} />
        </Routes>

        <div className='footer'>
          Contact: My BattleShip is a testing project for Lectra company.
        </div>
      </Router>
  );
}

export default App;
