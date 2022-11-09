import React from 'react'
import Dashboard from './components/Dashboard/dashboard';
import Login from './components/Login/login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="wrapper">
      <BrowserRouter>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />}></Route>
          <Route path="/" element={<Login />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App