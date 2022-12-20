import React, { useState } from 'react'
import './App.css'
import logo from './sa_log.png'

const Dashboard = () => {
  
  const [lat, setLat] = useState('0');
  const [lng, setLng] = useState('0');

  const getLocationLat = async() => {
    if (!navigator.geolocation) {
      alert("Can't get location");
    }
    else {
      navigator.geolocation.getCurrentPosition((pos) => {
        setLat(pos.coords.latitude);
      })
    }
  }

  const getLocationLng = async() => {
    if (!navigator.geolocation) {
      alert("Can't get location");
    }
    else {
      (navigator.geolocation.getCurrentPosition((pos) => {
        setLng(pos.coords.longitude);
      }))
    }
  }

  const handleClockIn = async(e) => {
    await getLocationLat();
    await getLocationLng();
    var details = {
      'latitude': lat,
      'longitude': lng,
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
          // change a status 
          alert("Clocked In");
        } else {
          alert('Error status: ' + response.status);
        }
    })  
    e.preventDefault();
  }

  const handleClockOut = async(e) => {
    // eslint-disable-next-line
    await getLocationLat();
    await getLocationLng();

    var details = {
      'latitude': lat,
      'longitude': lng,
    };

    var formBody = [];
    for (var property in details) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    fetch("http://localhost:8080/v1/api/clockout", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      body: formBody
    })
    .then((response) => {
        if (response.status === 200) {
          alert("Clocked Out");
        } else {
          alert('Error status: ' + response.status);
        }
    })  
    e.preventDefault();

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