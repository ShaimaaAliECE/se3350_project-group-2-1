const mysql = require('mysql');

let connection = mysql.createConnection(
    {
        host:'34.134.6.101',
        user:'root',
        password:'password',
        database:'Mergesort-admin',
    }
);

module.exports = connection;