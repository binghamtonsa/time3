import mysql from 'mysql';

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
})

connection.connect((err) => {
    if (err) {
        throw err;
    }
    else {
        console.log("connected to DB");
    }
});

connection.end();