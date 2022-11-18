import React, { useState } from 'react'
import './App.css'

// const username = process.env.REACT_APP_LOGIN_U;
// const password = process.env.REACT_APP_LOGIN_P;

function Login() {

  const [username, setUsername] = useState('');
  const [password, setPassowrd] = useState('');


  const handleEmailChange = (e) => {
    setUsername(e.target.value);
  }

  const handlePasswordChange = (e) => {
    setPassowrd(e.target.value);
  }

  // zeros 
  const clearState = (e) => {
    setUsername('');
    setPassowrd('');
  }

  const handleSubmit = (e) => {
    var details = {
      'usrnme': username,
      'pswrd': password,
    };
  
    // creating the x-www-form-urlencoding 
    var formBody = [];
    for (var property in details) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
  
    fetch("http://localhost:8080/v1/api/login", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      body: formBody
    })
    .then((response) => {
        console.log(response.status);
        alert('Login submitted with : ' + username + ' & ' + password);
    })  
    e.preventDefault();
    clearState();
  }
  

  return (
    <div className='login-container'>
      <div className='login-wrapper'>
        <div className='form-container'>
          <div className='form-wrapper'>
            <form id='form' onSubmit={ (e) => handleSubmit(e)}>
              <h2 id='form-header'>SA Timesheet</h2>
              <h3 id='form-secondary' >Login Form</h3>
              <input id='values' type='text' placeholder='Email' value={username} required onChange={ (e) => handleEmailChange(e)} />
              <input id='values' type='text'  placeholder='Password' value={password} required onChange={ (e) => handlePasswordChange(e)} />
              <input id='values' type="submit" value="Submit"/>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login