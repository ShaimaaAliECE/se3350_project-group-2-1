const express = require('express');
const Connection = require('mysql/lib/Connection');
const path = require('path')

const app = express()
const sqlConnection = require('./sql/dbinit');


app.use(express.static(path.join(__dirname, '../client/build')))

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});



//sql calls
//get data
app.get('/getData', (req, res) =>{
    sqlConnection.connect()
    sqlConnection.query(
        'SELECT * FROM mergeSortData',
        (err, result, fields) => {
            if (err) res.send(err);
            res.send(result);
        }
    );
    connection.end();
});

//get data
app.post('/postData', (req, res) =>{
    let var1 = req.body.var1;
    let var2 = req.body.var2;
    sqlConnection.connect()
    sqlConnection.query(
        `INSERT INTO mergeSortData (var1, var2) VALUES (${va1}, ${var2})`,
        (err, result, fields) => {
            if (err) res.send(err);
            res.send(result);
        }
    );
    connection.end();
});

const createTable = () => {
    sqlConnection.connect()
    sqlConnection.query(
        '"CREATE TABLE mergeSortData ()"',
        (err, result, fields) => {
            if (err) console.log(err);
            console.log(result);
        }
    );
    sqlConnection.end();
};




app.listen(8080);