import axios from 'axios';
import { response } from 'express';
import mysql from 'mysql';

const URL = "https://api.getsling.com";

export class clockIn {
    constructor(auth, lat, lng) { 
        this.auth = auth;
        this.lat = lat;
        this.lng = lng;
    }

    request() {
        return axios.get(URL + `/v1/account/session`, {headers: {Authorization: this.auth}})
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
            return axios.post(URL + `/v1/timeclock/clockin?locationId=${obj.user.groups[2].id}&positionId=${obj.user.groups[1].id}`, data, {
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
    constructor(auth, lat, lng, notes ) {
        this.auth = auth;
        this.lat = lat;
        this.lng = lng;
        this.notes = notes;
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
                "text": this.notes
                }
            ]
        })
        return axios.post(URL + '/v1/timeclock/clockout', data, {
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

export class logOut {
    constructor(auth) {
        this.auth = auth;
    }

    request() {
        return axios.delete(URL + '/v1/account/session', {
            headers: {
                'Authorization': this.auth
            }
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

export class dbConnect {
    constructor(host, user, pswrd, db, auth) {
        this.host = host;
        this.user = user;
        this.pswrd = pswrd;
        this.db = db;
        this.auth = auth;
    }
    
    conn() {
        return axios.get(URL + `/v1/account/session`, {headers: {Authorization: this.auth}})
            .then((res) => {

                var json = JSON.stringify(res.data);
                var obj = JSON.parse(json);

                const connection = mysql.createConnection({
                    host: this.host,
                    user: this.user,
                    password: this.pswrd,
                    database: this.db
                })
        
                connection.connect((err) => {
                    if (err) {
                        throw err;
                    }
                    else {
                        console.log("connected to DB");
                        connection.query("SELECT email FROM users", function( err, result, fields ) {
                            if (err) {
                                throw err;
                            } else {
                                let row = Object.values(JSON.parse(JSON.stringify(result)));
                                // can worry about optimizing later (for loop won't be the best if the table gets larger)
                                // row[i].email -> returns the emails of everyone
                                console.log(obj.user.email);
                                for (let i = 0; i < row.length; i++) {
                                    
                                    if ((obj.user.email) == row[i].email) {
                                        // check if user has a signature and add signature if they don't
                                    }
                                    else {
                                       // 1. add user to database 
                                       let addQuery = `INSERT INTO users (name, email) VALUES (?,?);`;
                                       let userName = obj.user.name + " " + obj.user.lastname;
                                       let email = obj.user.email;
                                       connection.query(addQuery, [userName, email], (err, rows) => {
                                        if (err) {
                                            throw err;
                                        } else {
                                            console.log(`Inserted new row with ${userName} : ${email}`);
                                        }
                                       })

                                        // 2. add user signature to database
                                        
                                    }
                                }
                                
                            }
                        })
                    }
                }); 
        })
    }   
}



