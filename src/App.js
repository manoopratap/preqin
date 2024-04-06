import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import InvestorsTable from './invester/InvestersTable';
import MainPage from './invester/index';
import './App.css';
// Main component
const InvesterPage = () => {


  return (
    <Router>
      <Routes>
        <Route path="/investors/:id" element={<MainPage/>} />
        <Route path="/" element={<InvestorsTable/>} />
      </Routes>
    </Router>
  );
};

export default InvesterPage;