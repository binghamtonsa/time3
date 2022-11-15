const Login = require('./auth.js')
const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const port = process.env.PORT || 8080;
const apiPort = process.env.API_PORT

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/v1/api/login', function(req, res) {
    let data = req.body;
    var login1 = new Login(data.usrnme, data.pswrd, apiPort);
    login1.request(login1.createOptions(), login1.createBody())
    .then((data) => {
      // delete all console logs later
      console.log('Status Code: ' + data.statusCode);
      console.log("Auth Token: " + data.headers.authorization);
      res.send({
        'status': data.statusCode,
        'auth': data.headers.authorization
      })
    })
  });

  
  app.listen(port);
  console.log('Server started at http://localhost:' + port);

// var login1 = new Login(process.env.USRNME,process.env.PSWRD, process.env.PORT);
