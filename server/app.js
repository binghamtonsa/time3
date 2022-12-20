import axios from 'axios';

export class clockIn {
    constructor(auth, lat, lng) { 
        this.auth = auth;
        this.lat = lat;
        this.lng = lng;
    }

    request() {
        axios.get(`https://api.getsling.com/v1/account/session`, {headers: {Authorization: this.auth}})
        .then((res) => {
            var json = JSON.stringify(res.data);
            var obj = JSON.parse(json);
            console.log();

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
            // need to get the locationID and positionID per each user
            axios.post(`https://api.getsling.com/v1/timeclock/clockin?locationId=${obj.user.groups[2].id}&positionId=${obj.user.groups[1].id}`, data, {
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



