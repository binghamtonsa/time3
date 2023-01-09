import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './App.css'
import logo from './sa_log.png'

const Dashboard = () => {

  const URL = 'http://localhost:8080';
  const navigate = useNavigate();
  
  
  const [lat, setLat] = useState('0');
  const [lng, setLng] = useState('0');
  const [clockedOutNotes, setClockOutNotes] = useState(false);
  const [notes, setNotes] = useState(''); 
  const [showClockOut, setClockout] = useState(false);
  const [clockedIn, setClockIn] = useState(true);
  const [time, setTime] = useState("0");

  const getTime = async() => {
    const current = new Date();
    const timeNow = current.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2 digit"
    });
    setTime(timeNow);
  }

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
    //await getTime();
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
          setClockout(true);
          setClockIn(false);
        } else {
          alert('Error status: ' + response.status);
        }
    })  
    e.preventDefault();
  }

  const handleClockOutNotes = async(e) => {
    setClockOutNotes(true);
    setClockout(false);
  }
  
  const handleNotes = (e) => {
    setNotes(e.target.value);
  }

  const handleClockOut = async(e) => {
    //await getTime();
    await getLocationLat();
    await getLocationLng();

    var details = {
      'latitude': lat,
      'longitude': lng,
      'text': notes
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
          setClockOutNotes(false);
          setClockout(false);
          setClockIn(true);
          
        } else {
          alert('Error status: ' + response.status);
        }
    })  
    e.preventDefault();
    setNotes("");
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
      }
      else {
        alert('Error status: ' + response.status);
      }
    })
    e.preventDefault();
  }

  const handlePrint = async(e) => {
    fetch(URL + "/v1/api/print", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      }
    })
    .then((response) => {
      if (response.status === 200) {
        alert("printed");
      } else {
        alert("Error status: " + response.status);
      }
    })
  }

  return(
    <div className='dashboard-container'>
      <div className='nav-container'>
          <img id="logo" src={logo} alt='logo-main' />
          <h1 id='header'>Dashboard</h1>
          <button type='button' className='logout' onClick={handleLogOut}>Log Out</button>
      </div>
      <div className='timesheet-container'>
        <div className="time-wrap">
          { clockedIn && <button type='button' className='clock-in' onClick={handleClockIn}>Clock in</button> }
          { showClockOut && <button type='button' className='clock-in' onClick={handleClockOutNotes}>Clock out</button> }
          { clockedOutNotes && 
            <div className='notes'>
              <input id='clockedOutNotes' type='text' placeholder='Notes:' value={notes} required onChange={ (e) => handleNotes(e) } />
              <button type='button' className='clock-in' onClick={handleClockOut}>Save</button>
            </div> 
          }
        </div>
        
        <div className='status'>Status:
           { clockedIn && <p id='out'>Clocked Out </p> }
           { showClockOut &&  <p id='in'>Clocked In</p> }
        </div> 
        { <div className='details'>Details</div> }
        { <div className='print'>
          <button type='button' className='clock-in' onClick={handlePrint}>Print</button>
        </div> }
      </div>
    </div>
  );
}

export default Dashboard