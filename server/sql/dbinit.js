const mysql = require('mysql');

let connection = mysql.createConnection(
    {
        host:'35.225.207.238',
        user:'root',
        password:'password',
        database:'Mergesort-admin',
    }
);

module.exports = connection;