import React from 'react'

const username = process.env.REACT_APP_LOGIN_U;
const password = process.env.REACT_APP_LOGIN_P;

function login() {

  function handleClick() {
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
      console.log(response);
      console.log(response.body);
    })  
  }
  

  return (
    <div onClick={handleClick} style={{
      textAlign: 'center',
      width: '100px',
      border: '1px solid gray',
      borderRadius: '5px'
    }}>
      Send data to backend
    </div>
  );
}

export default login