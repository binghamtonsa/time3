import { Login } from './auth.js'
import { clockIn, clockOut, dbConnect, logOut } from './app.js';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import axios from 'axios';
dotenv.config();

const app = express();
const port = 5000;
const apiPort = process.env.API_PORT;
const dbHost = process.env.SQL_GATE;
const dbPass = process.env.SQL_PASSWORD;
const user =  'root';
const database = 'time3';
const URL = "https://api.getsling.com";

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

var auth = "";

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
      callBack(null, './public/images')
  },
  filename: (req, file, callBack) => {
      callBack(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
})
var upload = multer({
  storage: storage
});

app.post('/v1/api/print', function(req, res) {
  var foundUserFlag = 0;
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
                if (((obj.user.email) == row[i].email) && (row[i].signature != null)) {
                    foundUserFlag = 1;
                    console.log("User not found");
                }
              }
            }
            })
          } 
      })
  })
  .then(() => {
    if (foundUserFlag == 1) {
      console.log("Found copy");
      res.sendStatus(200);
    }
    else {
      console.log("Didn't find copy");
      res.sendStatus(100);
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
                      var imgsrc = 'http://127.0.0.1:5000/images' + req.file.filename
                      let userName = obj.user.name + " " + obj.user.lastname;
                      let email = obj.user.email;
                      // position will change when I get a seperate table in database
                      var insertQuery = "INSERT INTO users (name, email, position) VALUES (?,?,?)"

                      connection.query(insertQuery, [userName, email, imgsrc], (err, result) => {
                        if (err) {
                          console.log("error in query");
                        }
                        else {
                          console.log("File uploaded and user added");
                        }
                      })
                    }
                  }
                }
            })
        }
    });
  })    
})

app.listen(port);
console.log('Server started at http://localhost:' + port);
