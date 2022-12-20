const axios = require('axios');

class clockIn {
    constructor(auth, lat, lng) { 
        this.auth = auth;
        this.lat = lat;
        this.lng = lng;
    }

    getUserInfo() {

        const data = JSON.stringify({
            // nothing 
        });

        const config = {
            headers:{
                'Accept': '*/*',
                'Authorization': this.auth,
                'Content-Type': 'application/json',
                'Content-Length': data.length
            }
        }

        axios.get(`https://api.getsling.com/account/session`, config)
        .then((res) => {
            console.log('session info status: ' + res);
        })
        .catch((err) => {
            if (err.response) {
                console.log(err.response.status);
                console.log(err.response.data);
            }
        })
    }

    request() {

        const data = JSON.stringify( {
            'latitude': this.lat,
            'longitude': this.lng
        })

        const header = {
            'Accept': '*/*',
            'Authorization': this.auth,
            'Content-Type': 'application/json'
        }

        axios.post(`https://api.getsling.com/timeclock/clockin?locationId=10833120&positionId=10833096`, data, {
            headers: header
        })
        .then((res) => {
            console.log('timeclock status: ' + res.status);
        })
        .catch((err) => {
            if (err.response) {
                console.log(err.response.status);
                console.log(err.response.data);
            }
        })
    }
}

module.exports = clockIn;

// class clockIn {
//     constructor(lat, lon, code, port, locID, posID) {
//         this.lat = lat;
//         this.lon = lon;
//         this.port = port;
//         this.code = code;
//         this.locID = locID;
//         this.posID = posID;
//     }

//     createBody() {
//         var body = JSON.stringify({
//             'latitude': this.lat,
//             'longitude': this.lon,
//         })
//         return body;
//     }

//     createOptions() {
//         var length = this.createBody();
//         var options = {
//             hostname: 'api.getsling.com',
//             port: this.port,
//             path: '/v1/timeclock/clockin?locationId=10833120&positionId=10833096',
//             method: 'POST',
//             headers: {
//                 'Accept': '*/*',
//                 'Authorization': this.code,
//                 'Content-Type': 'application/json',
//                 'Content-Length': length.length

//             }
//         }
//         return options;
//     }  

//     request(options, body) {
//         console.log(options);
//         console.log(body);
//         return new Promise((resolve, reject) => {
//             var request = https.request(options, function (response) {
//                 console.log("here");
//                 console.log(request);
//                 console.log(response);
//                 return resolve(response);
//             })
//             request.on('error', (error) => {
//                 console.log("here error");
//                 reject(error);
//             })
//             request.write(body);
//             request.end();
//         })
//     }
// } 

// module.exports = clockIn;
// var clocked = new clockIn('70.954', '30.567', "f577dd7ed34e4780b64007eaa7354711", 433, 10833120, 10833096);
// clocked.request(clocked.createOptions(), clocked.createBody())
// .then((data) => {
//     console.log(data.headers);
// })

