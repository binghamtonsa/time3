import mysql from 'mysql';
import dotenv from 'dotenv'
dotenv.config();

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: process.env.SQL_PASSWORD,
    database: 'dashboard'
})

connection.connect((err) => {
    if (err) {
        throw err;
    }
    else {
        console.log("connected to DB");
        connection.query("SELECT * FROM users", function( err, result, fields ) {
            if (err) {
                throw err;
            } else {
                console.log(result);
            }
        })
    }
});

