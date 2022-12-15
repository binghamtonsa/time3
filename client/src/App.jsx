import React from 'react'
import Dashboard from './components/Dashboard/dashboard';
import Login from './components/Login/login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PrivateRoutes from './utils/PrivateRoutes';

function App() {
  return (
    <div className="wrapper">
      <BrowserRouter>
        <Routes>
          <Route element={<PrivateRoutes />} >
              <Route element={<Dashboard />} path="/dashboard" exact />
          </Route>
          <Route path="/" element={<Login />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App
