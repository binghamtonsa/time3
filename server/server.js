const Login = require('./auth.js')
const express = require('express');

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/v1/api/login', function(req, res) {
    let data = req.body;
    res.send({
      'usrnme': usrnme,
      'pswrd': pswrd,
    });
    console.log(data.usrnme + " " + data.pswrd); 
  });

//   var login1 = new Login(usrnme, pswrd, 8080);
//   login1.request(login1.createOptions(), login1.createBody());
  
  app.listen(port);
  console.log('Server started at http://localhost:' + port);

// var login1 = new Login(process.env.USRNME,process.env.PSWRD, process.env.PORT);
