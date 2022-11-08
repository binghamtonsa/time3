const Login = require('./auth.js')

var login1 = new Login(process.env.USRNME,process.env.PSWRD, process.env.PORT);
login1.request(login1.createOptions(), login1.createBody());