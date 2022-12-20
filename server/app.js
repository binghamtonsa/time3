import axios from 'axios';

export class clockIn {
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
        console.log(data);

        const header = {
            'Accept': '*/*',
            'Authorization': this.auth,
            'Content-Type': 'application/json'
        }
        // need to use getUserInfo to get the locationID and positionID per each user
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

export class clockOut {
    constructor(auth, lat, lng ) {
        this.auth = auth;
        this.lat = lat;
        this.lng = lng;
    }

    request() {

        const header = {
            'Accept': '*/*',
            'Authorization': this.auth,
            'Content-Type': 'application/json'
        }

        const data = JSON.stringify({
            "latitude": this.lat,
            "longitude": this.lng,
            "accuracy": "low",
            "attestations": [{
                "text": "hello world"
                }
            ]
        })
        axios.post('https://api.getsling.com/v1/timeclock/clockout', data, {
            headers: header
        })
        .then((res) => {
            console.log("clockout Status: "+ res.status)
        })
        .catch((err) => {
            if (err.response) {
                console.log(err.response.status);
                console.log(err.response.data);
            }
        })
    }
}



