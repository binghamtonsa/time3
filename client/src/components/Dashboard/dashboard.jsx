import React, { useState } from 'react'
import './App.css'
import logo from './sa_log.png'




const Dashboard = () => {

  const handleClockIn = (e) => {
    var details = {
      'latitude': '70.003',
      'longitude': '52.004',
    };
  
    // creating the x-www-form-urlencoding 
    var formBody = [];
    for (var property in details) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
  
    fetch("http://localhost:8080/v1/api/clockin", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      body: formBody
    })
    .then((response) => {
        if (response.status === 200) {
          alert("Clocked In");
        } else {
          alert('Didnt not work');
        }
    })  
    e.preventDefault();
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