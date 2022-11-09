// Basic JS function to check the API and see if the call works

const https = require('https')
const dotenv = require('dotenv')
dotenv.config();

class Login {
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
    var request = https.request(options, (response) => {
      console.log('STATUS: ' + response.statusCode);
      console.log(response.statusMessage);
    })
    request.on('error', (error) => {
    console.error(error)
    })

    // write body 
    request.write(body)
    request.end()
  }
}

module.exports = Login;


