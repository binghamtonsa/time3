import React, { useState } from 'react'
import './App.css'
import logo from './sa_log.png'




const Dashboard = () => {

  const handleClockIn = (e) => {
    
  }

  const handleClockOut = (e) => {
    
  }


  return(
    <div className='dashboard-container'>
      <div className='nav-container'>
        <div className='nav-wrapper'>
          {/* <nav className='navbar'></nav> */}
          <img id="logo" src={logo} alt='logo-main' />
          <h1 id='header'>Dashboard</h1>
        </div>
      </div>
      <div className='timesheet-container'>
        <div className='timesheet-wrapper'>
          <button type='button' className='clock-in' onClick={handleClockIn}>Clock in</button>
          <button type='button' className='clock-in' onClick={handleClockOut}>Clock out</button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard