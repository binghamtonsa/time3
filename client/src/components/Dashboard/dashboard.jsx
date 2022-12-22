import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './App.css'
import logo from './sa_log.png'

const Dashboard = () => {

  const URL = 'http://localhost:8080';
  const navigate = useNavigate();
  
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

  // creating the x-www-form-urlencoding 
  function createFormBody(data) {
    var formBody = [];
    for (var property in data) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(data[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
    return formBody;
  }

  const handleClockIn = async(e) => {
    await getLocationLat();
    await getLocationLng();
    var details = {
      'latitude': lat,
      'longitude': lng,
    };
    
    fetch(URL + "/v1/api/clockin", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      body: createFormBody(details)
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

    fetch(URL + "/v1/api/clockout", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      body: createFormBody(details)
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

  const handleLogOut = async(e) => {
    fetch(URL + "/v1/api/logout", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      }
    })
    .then((response) => {
      if (response.status === 204) {
        navigate('/');
        alert("logged out");
      }
      else {
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
          <button type='button' className='clock-in' onClick={handleLogOut}>Log Out</button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard