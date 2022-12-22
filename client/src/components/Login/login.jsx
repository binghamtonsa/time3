import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './App.css'
import logo from './sa_log.png'

// const username = process.env.REACT_APP_LOGIN_U;
// const password = process.env.REACT_APP_LOGIN_P;

const Login = () => {

  const [username, setUsername] = useState('');
  const [password, setPassowrd] = useState('');
  const [status, setStatus] = useState('');
  const navigate = useNavigate();


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
    setStatus('');
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
        if (response.status === 200) {
          navigate('/dashboard');
        } else {
          alert('Didnt not work');
        }
    })  
    e.preventDefault();
    clearState();
  }
  

  return (
    <div className='login-container'>
      <div className='spacer layer1'>
        <img id="logo-main" src={logo} alt='logo-main' />
      </div>
      <div className='form-wrapper'>
        <form id='form' onSubmit={ (e) => handleSubmit(e)}>
          <h2 id='form-header'>Timesheet</h2>
          <img id="logo" src={logo} alt='logo-main' />
          <input id='values' type='text' placeholder='Email' value={username} required onChange={ (e) => handleEmailChange(e)} />
          <input id='values' type='password'  placeholder='Password' value={password} required onChange={ (e) => handlePasswordChange(e)} />
          <input id='valuesSub' type="submit" value="Submit"/>
        </form>
      </div>
    </div>
  )
}

export default Login