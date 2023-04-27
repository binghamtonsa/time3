import { Login } from './auth.js'
import { clockIn, clockOut, dbConnect, logOut, retTimesheet } from './app.js';
import express, { response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import axios from 'axios';
import bodyParser from 'body-parser';
import { log } from 'console';
// import PDFDocument from 'pdfkit';
dotenv.config();

const app = express();
const port = 8000;
const apiPort = process.env.API_PORT;
const dbHost = process.env.SQL_GATE;
const dbPass = process.env.SQL_PASSWORD;
const user =  'root';
const database = 'time3';
const URL = "https://api.getsling.com";

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))

var auth = "";
var foundUserFlag;

app.post('/v1/api/login', function(req, res) {
    let data = req.body;
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
    clocked.request()
    .then().then((data) => {
      if (data.status == 200) {
        console.log("Clocked In!");
      }
      else {
        console.log("Error clocking in: " + data.status)
      }
      res.sendStatus(data.status);
    })
  })

app.post('/v1/api/clockout', function(req, res) {
    let data = req.body;
    var clockedOut = new clockOut(auth, data.latitude, data.longitude, data.text);
    clockedOut.request()
    .then((data) => {
      if (data.status == 200) {
        console.log("Clocked Out!");
      }
      else {
        console.log("Error clocking out: " + data.status)
      }
      res.sendStatus(data.status);
    })
  })

app.post('/v1/api/logout', function(req, res) {
  var LoggedOut = new logOut(auth);
  LoggedOut.request()
  .then((data) => {
    if (data.status == 204) {
      console.log("Logged Out");
    }
    else {
      console.log("Error logging out: " + data.status)
    }
    res.sendStatus(data.status);
  })
})

var storage = multer.diskStorage({
  destination: (req, file, callBack) => {
      callBack(null, './uploads')
  },
  filename: (req, file, callBack) => {
      callBack(null, file.originalname)
  }
})
var upload = multer({
  storage: storage
});

app.post('/v1/api/print', function(req, res) {
  axios.get(URL + `/v1/account/session`, {headers: {Authorization: auth}})
    .then((res) => {
      var json = JSON.stringify(res.data);
      var obj = JSON.parse(json);

      var db = new dbConnect(dbHost, user, dbPass, database, auth);
      var connection = db.conn();
      connection.connect((err) => {
        if (err) {
          throw err;
        }
        else {
          console.log("connected to DB");
          connection.query(`SELECT email FROM Users`, function( err, result, fields ) {
            if (err) {
              throw err;
            } 
            else {
              let row = Object.values(JSON.parse(JSON.stringify(result)));
              // can worry about optimizing later (for loop won't be the best if the table gets larger)
              // row[i].email -> returns the emails of everyone
              
              for (let i = 0; i < row.length; i++) {
                if (((obj.user.email) == row[i].email)) {
                  foundUserFlag = 1;
                  console.log("same");
                }
                else {
                  foundUserFlag = 0;
                }
              }
            }
            })
          } 
      })
  })
  .then(() => {
    res.set({
      'access-control-allow-credentials': true ,
      'access-control-allow-headers': 'Authorization,Content-Type,Expires,Cache-Control,If-Modified-Since,Pragma,Access-Control-Allow-Origin,X-Sling-Instrumentation,X-HTTP-Method-Override', 
      'access-control-allow-methods': 'GET,POST,PUT,DELETE,OPTIONS', 
      'access-control-allow-origin': 'http://localhost:3000', //8000/v1/api/print
    });
    console.log(foundUserFlag);
    if (foundUserFlag >= 1) {
      console.log("Found copy");
      res.status(200).send("Found copy");
    }
    else {
      console.log("Didn't find copy");
      res.status(206).send("No Copy");
    }
  })
})


app.post('/v1/api/upload', upload.single('file'), (req, res) => {
  axios.get(URL + `/v1/account/session`, {headers: {Authorization: auth}})
    .then((res) => {
      var json = JSON.stringify(res.data);
      var obj = JSON.parse(json);

      var db = new dbConnect(dbHost, user, dbPass, database, auth);
      var connection = db.conn();

      connection.connect((err) => {
        if (err) {
          throw err;
        }
        else {
            console.log("connected to DB");
            connection.query("SELECT email FROM Users", function( err, result, fields ) {
                if (err) {
                    throw err;
                } else {
                  let row = Object.values(JSON.parse(JSON.stringify(result)));
                  // can worry about optimizing later (for loop won't be the best if the table gets larger)
                  // row[i].email -> returns the emails of everyone
                  var foundUserFlag = 0;
                  for (let i = 0; i < row.length; i++) {
                    if ((obj.user.email) == row[i].email) {
                        foundUserFlag = 1;
                    }
                  }
                  if (foundUserFlag == 0) {
                    if (!req.file) {
                      console.log("No file uploaded");
                    }
                    else {
                      var imgsrc = 'http:localhost:8000/images/' + req.file.filename
                      let userName = obj.user.name + " " + obj.user.lastname;
                      let email = obj.user.email;
                      // position will change when I get a seperate table in database
                      var insertQuery = "INSERT INTO Users (Username, email, signature) VALUES (?,?,?)"
                      console.log(userName + " " + email + " " + imgsrc);
                      connection.query(insertQuery, [userName, email, imgsrc], (err, result) => {
                        if (err) {
                          console.log("error in query" + err);
                        }
                        else {
                          console.log("File uploaded and user added");
                          foundUserFlag++;
                        }
                      })
                    }
                  }
                }
            })
        }
    });
  })
  .then(() => {
    res.sendStatus(200); 
  }) 
})

function timeConvert(data) {
  let update1 = data.replace("-", "");
  let update2 = update1.slice(10,20).split(":");
  var hours = Number(update2[0]);
  var minutes = Number(update2[1]);
  var timeValue;

  if (hours > 0 && hours <= 12) {
    timeValue= "" + hours;
  } else if (hours > 12) {
    timeValue= "" + (hours - 12);
  } else if (hours == 0) {
    timeValue= "12";
  } 
  timeValue += (minutes < 10) ? ":0" + minutes : ":" + minutes;  // get minutes
  timeValue += (hours >= 12) ? " P.M." : " A.M.";  // get AM/PM

  return timeValue;
}

app.post('/v1/api/timesheet', function(req, res) {
  axios.get('https://api.getsling.com/v1/reports/timesheets', {
    headers: {
        'Authorization': auth,
    },
    params: {
        'dates': '2023-01-01T13:00:00Z/2023-02-10T15:30:00Z'
    }
  })
  .then((response) => {
    var clockedInTime = response.data[0].timesheetEntries[0].timestamp;
    let formatedClockInTime = timeConvert(clockedInTime);

    var clockedOutTime = response.data[0].timesheetEntries[1].timestamp;
    let formatedClockOutTime = timeConvert(clockedOutTime);
    console.log("ClockedIn time: " + formatedClockInTime + " Clocked Out time: " + formatedClockOutTime);
  })
  .then(() => {
    res.set({
      'access-control-allow-credentials': true ,
      'access-control-allow-headers': 'Authorization,Content-Type,Expires,Cache-Control,If-Modified-Since,Pragma,Access-Control-Allow-Origin,X-Sling-Instrumentation,X-HTTP-Method-Override', 
      'access-control-allow-methods': 'GET,POST,PUT,DELETE,OPTIONS', 
      'access-control-allow-origin': 'http://localhost:3000', //8000/v1/api/print
    });
    res.json({'data': 'Dhruv'});
    console.log(res);
  })
})

app.listen(port);
console.log('Server started at http://localhost:' + port);
