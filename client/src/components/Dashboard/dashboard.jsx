import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './App.css'
import logo from './sa_log.png'
import axios from 'axios'
import jsPDF from 'jspdf';
import DateRangePicker from './datepicker'

const Dashboard = () => {

  const URL = 'http://localhost:8000';
  const navigate = useNavigate();
  
  const [lat, setLat] = useState('0');
  const [lng, setLng] = useState('0');
  const [clockedOutNotes, setClockOutNotes] = useState(false);
  const [notes, setNotes] = useState(''); 
  const [showClockOut, setClockout] = useState(false);
  const [clockedIn, setClockIn] = useState(true);
  const [time, setTime] = useState("0");
  const [file, setFile] = useState();
  const [filename, setFileName] = useState("");
  const [needFileInput, setFileInput] = useState(false);
  const [timesheetInfo, setTimesheetInfo] = useState("");
  const [dateSelected, setDateSelected] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  // Handle save button click
  const handleSave = (start, end) => {
    //console.log(start + " -  " + end);
    let updatedStart = start.toString();
    let finalStart = updatedStart.replace(" 00:00:00 GMT-0400 (Eastern Daylight Time)", "");
    // finalStart = updatedStart.replace(" 00:00:00 GMT-0200 (Eastern Daylight Time)", "");
    // finalStart = updatedStart.replace(" 00:00:00 GMT-0300 (Eastern Daylight Time)", "");
    // finalStart = updatedStart.replace(" 00:00:00 GMT-0400 (Eastern Daylight Time)", "");
    // finalStart = updatedStart.replace(" 00:00:00 GMT-0500 (Eastern Daylight Time)", "");
    // finalStart = updatedStart.replace(" 00:00:00 GMT-0600 (Eastern Daylight Time)", "");
    // finalStart = updatedStart.replace(" 00:00:00 GMT-0700 (Eastern Daylight Time)", "");
    // finalStart = updatedStart.replace(" 00:00:00 GMT-0800 (Eastern Daylight Time)", "");
    // finalStart = updatedStart.replace(" 00:00:00 GMT-0900 (Eastern Daylight Time)", "");
    let upadtedEnd = end.toString();
    let finalEnd = upadtedEnd.replace(" 00:00:00 GMT-0400 (Eastern Daylight Time)", "");
    // finalEnd = upadtedEnd.replace(" 00:00:00 GMT-0200 (Eastern Daylight Time)", "");
    // finalEnd = upadtedEnd.replace(" 00:00:00 GMT-0300 (Eastern Daylight Time)", "");
    // finalEnd = upadtedEnd.replace(" 00:00:00 GMT-0400 (Eastern Daylight Time)", "");
    // finalEnd = upadtedEnd.replace(" 00:00:00 GMT-0500 (Eastern Daylight Time)", "");
    // finalEnd = upadtedEnd.replace(" 00:00:00 GMT-0600 (Eastern Daylight Time)", "");
    // finalEnd = upadtedEnd.replace(" 00:00:00 GMT-0700 (Eastern Daylight Time)", "");
    // finalEnd = upadtedEnd.replace(" 00:00:00 GMT-0800 (Eastern Daylight Time)", "");
    // finalEnd = upadtedEnd.replace(" 00:00:00 GMT-0900 (Eastern Daylight Time)", "");
    setStartDate(finalStart);
    setEndDate(finalEnd);
    setDateSelected(true);
  };

  useEffect(() => {
    handlePrint()
  }, [])

  const saveFile = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };


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

  const handleUploadFile = async(e) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("filename", filename);
    try {
      const res = await axios.post(URL + "/v1/api/upload", formData);
      if (res.status === 200) {
        setFileInput(false);
      }
    } catch(ex) {
      console.log(ex);
    }
  }

  const handleClockIn = async(e) => {
    //await getTime();
    await getLocationLat();
    await getLocationLng();
    var details = {
      'latitude': lat,
      'longitude': lng,
    };
    
    fetch(URL + '/v1/api/clockin', {
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
      console.log(response.status);
      if (response.status === 200) {
        setFileInput(false);
        alert("Already Found singature on Database");
      } else {
        setFileInput(true);
      }
    })
    e.preventDefault();
  }

  const handleTS = async(e) => {
    fetch(URL + '/v1/api/timesheet', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      }
    })
    .then((response) => {
      if (response.status === 200) {
        let res = response.json();
        console.log(response);

        setTimesheetInfo(res);
      }
      else {
        alert("error occured");
      }
    })
  }

  function handleCreatePDF() {
    const doc = new jsPDF();

   // Column widths
   const col1Width = 40;
   const col2Width = 30;
   const col3Width = 30;
   const col4Width = 30;
   const col5Width = 30;
   const col6Width = 30;
   
   // Row height
   const rowHeight = 10;
   
   // Logo
   const logoWidth = 30;
   const logoHeight = 30;
   const logoXPos = 10;
   const logoYPos = 15;
   doc.addImage(logo, 'PNG', logoXPos, logoYPos, logoWidth, logoHeight);
   
   // Main header
   doc.setFontSize(20);
   doc.setFont('helvetica', 'bold');
   doc.text('SA Timesheet', 80, 30);

   doc.setFontSize(16);
   doc.setFont('helvetica', 'bold');
   doc.text(startDate + " - " + endDate, 50, 42);
   
   // Table header
   doc.setFontSize(12);
   doc.setFont('helvetica', 'bold');
   doc.text('Name', 10, 65);
   doc.rect(10, 66, col1Width, rowHeight, 'S');
   doc.text('Date', 50, 65);
   doc.rect(50, 66, col2Width, rowHeight, 'S');
   doc.text('Team', 80, 65);
   doc.rect(80, 66, col3Width, rowHeight, 'S');
   doc.text('Clock In', 110, 65);
   doc.rect(110, 66, col4Width, rowHeight, 'S');
   doc.text('Clock Out', 140, 65);
   doc.rect(140, 66, col5Width, rowHeight, 'S');
   doc.text('Shift Duration', 170, 65);
   doc.rect(170, 66, col6Width, rowHeight, 'S');
   
   // Draw table grid
   let xPos = 10;
   let yPos = 75;
   doc.setDrawColor(0);
   doc.setFillColor(255);
   doc.setFont('helvetica', 'normal');
   for (let i = 0; i <= 5; i++) {
     doc.rect(xPos, yPos, col1Width, rowHeight, 'FD');
     doc.rect(xPos + col1Width, yPos, col2Width, rowHeight, 'FD');
     doc.rect(xPos + col1Width + col2Width, yPos, col3Width, rowHeight, 'FD');
     doc.rect(xPos + col1Width + col2Width + col3Width, yPos, col4Width, rowHeight, 'FD');
     doc.rect(xPos + col1Width + col2Width + col3Width + col4Width, yPos, col5Width, rowHeight, 'FD');
     doc.rect(xPos + col1Width + col2Width + col3Width + col4Width + col5Width, yPos, col6Width, rowHeight, 'FD');
     yPos += rowHeight;
   }

   // Date and signature spot
   const signatureXPos = 20;
   const signatureYPos = 70 + (5 * rowHeight) + 20;
   const signatureWidth = 100;
   const signatureHeight = 40;
   doc.rect(signatureXPos, signatureYPos, signatureWidth, signatureHeight);
   doc.text('Signature', signatureXPos + (signatureWidth / 2), signatureYPos + (signatureHeight / 2), { align: 'center', baseline: 'middle' });
   
   // Date spot
   const dateXPos = 130;
   const dateYPos = 70 + (5 * rowHeight) + 20;
   const dateWidth = 60;
   const dateHeight = 10;
   doc.rect(dateXPos, dateYPos, dateWidth, dateHeight);
   doc.text('Date', dateXPos + (dateWidth / 2), dateYPos + (dateHeight / 2), { align: 'center', baseline: 'middle' });


    doc.save('timesheet.pdf');
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

        <div className='details'>Details
           {console.log(timesheetInfo)}
        </div>
        <div className='print'>
          { needFileInput && <input type="file" onChange={saveFile} /> }
          { needFileInput && <button onClick={handleUploadFile}>Upload</button> }
          { !needFileInput && !dateSelected && <DateRangePicker onSave={handleSave}/> }
          { !needFileInput && dateSelected && <button type='button' className='clock-in' onClick={handleCreatePDF}>Print</button> }
        </div>
      </div>
    </div>
  );
}

export default Dashboard