// Basic JS function to check the API and see if the call works

import https from 'https'
import dotenv from'dotenv';

dotenv.config();

export class Login {
  constructor(username, password, port) {
    this.username = username;
    this.password = password;
    this.port = port;
  }

  createBody() {
    var body = JSON.stringify({
      'email': this.username,
      'password': this.password,
    })
    return body;
  }

  createOptions() {
    var length = this.createBody();
    var options = {
      hostname: 'api.getsling.com',
      port: this.port,
      path: '/account/login',
      method: 'POST',
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json',
        'Content-Length': length.length
      }
    }
    return options;
  }

  request(options, body) {
    // utlized promise to get .then() on server.js
    return new Promise((resolve, reject) => {
      var request = https.request(options, function(response) {
        return resolve(response);
      })
      request.on('error', (error) => {
        reject(error);
      })
  
      // write body 
      request.write(body)
      request.end()
    })
  }
}



