const Login = require('./auth.js')
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();

const app = express();
const port = process.env.PORT || 8080;
const apiPort = process.env.API_PORT

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/v1/api/login', function(req, res) {
    let data = req.body;
    console.log(data);
    var login1 = new Login(data.usrnme, data.pswrd, apiPort);
    login1.request(login1.createOptions(), login1.createBody())
    .then((data) => {
      if (data.statusCode == 200) {
        console.log("Logged In!");
      } else {
        console.log(`Some Error Code: ${data.statusCode} Occured.`);
      }
      res.send({
        'status': data.statusCode,
        'auth': data.headers.authorization
      })
    })
  });

  app.listen(port);
  console.log('Server started at http://localhost:' + port);

// var login1 = new Login(process.env.USRNME,process.env.PSWRD, process.env.PORT);
