import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './App.css'
import logo from './sa_log.png'

// const username = process.env.REACT_APP_LOGIN_U;
// const password = process.env.REACT_APP_LOGIN_P;

const Login = () => {

  const [username, setUsername] = useState('');
  const [password, setPassowrd] = useState('');
  const [showLoading, setLoading] = useState(false);
  const [showSubmit, setSubmit] = useState(true);
  const [showStatus, setStatus] = useState(false);
  const [showErrorStyle, setErrorStyle] = useState("values");
  const navigate = useNavigate();


  const handleLoading = () => {
    setSubmit(false);
    setLoading(true);
  }

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
    
    handleLoading();
    setStatus(false);
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
  
    return new Promise((resolve) => {
      fetch("http://localhost:5000/v1/api/login", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      body: formBody
      })
      .then((response) => {
          if (response.status === 200) {
            resolve(response);
            navigate('/dashboard');
            setLoading(false);
            setSubmit(true);
            setErrorStyle('values')
          } else {
            resolve(response);
            setLoading(false);
            setSubmit(true);
            setStatus(true);
            setErrorStyle('errorInputs')
          }
      })  
      e.preventDefault();
      clearState();
    })
    
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
          <input id={ showErrorStyle } type='text' placeholder='Email' value={username} required onChange={ (e) => handleEmailChange(e)} />
          <input id={ showErrorStyle } type='password'  placeholder='Password' value={password} required onChange={ (e) => handlePasswordChange(e)} />
          
          { showLoading && 
            <div className="spinner">
              <svg viewBox='0 0 100 100'>
                <circle cx="50" cy="50" r="20" />
              </svg>
            </div> }
          { showStatus && <p className='error'>Error logging in, incorrect email or password</p> }
          { showSubmit && <button id='valuesSub' type="submit" value="Submit">Submit</button> }
        </form>
      </div>
    </div>
  )
}

export default Login