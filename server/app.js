import axios from 'axios';

export class clockIn {
    constructor(auth, lat, lng) { 
        this.auth = auth;
        this.lat = lat;
        this.lng = lng;
    }

    request() {
        return axios.get(`https://api.getsling.com/v1/account/session`, {headers: {Authorization: this.auth}})
        .then((res) => {
            var json = JSON.stringify(res.data);
            var obj = JSON.parse(json);

            const data = JSON.stringify( {
                'latitude': this.lat,
                'longitude': this.lng
            })

            const header = {
                'Accept': '*/*',
                'Authorization': this.auth,
                'Content-Type': 'application/json'
            }
            // need to to get the locationID and positionID per each user
            return axios.post(`https://api.getsling.com/v1/timeclock/clockin?locationId=${obj.user.groups[2].id}&positionId=${obj.user.groups[1].id}`, data, {
                headers: header
            })
            .then((res) => {
                return res;
            })
            .catch((err) => {
                if (err.response) {
                    return err;
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
        return axios.post('https://api.getsling.com/v1/timeclock/clockout', data, {
            headers: header
        })
        .then((res) => {
            return res;
        })
        .catch((err) => {
            if (err.response) {
                return err;
            }
        })
    }
}



