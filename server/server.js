import { Login } from './auth.js'
import { clockIn, clockOut } from './app.js';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();

const app = express();
const port = process.env.PORT || 8080;
const apiPort = process.env.API_PORT

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

var auth = "";

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
      auth = data.headers.authorization;
      console.log(auth);
      res.sendStatus(data.statusCode);
      
    })
  });

  app.post('/v1/api/clockin', function(req, res) {
    let data = req.body;
    var clocked = new clockIn(auth, data.latitude, data.longitude);
    clocked.request();
    res.sendStatus(200);
  })

  app.post('/v1/api/clockout', function(req, res) {
    let data = req.body;
    var clockedOut = new clockOut(auth, data.latitude, data.longitude);
    clockedOut.request();
    res.sendStatus(200);
  })

  app.listen(port);
  console.log('Server started at http://localhost:' + port);

// var login1 = new Login(process.env.USRNME,process.env.PSWRD, process.env.PORT);
