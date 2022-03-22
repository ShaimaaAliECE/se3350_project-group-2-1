const express = require('express');
const Connection = require('mysql/lib/Connection');
const path = require('path')
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()

const app = express()
const sqlConnection = require('./sql/dbinit');

app.use(
    (request, response, next) => {
        response.set({
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type *'
        })

        if (request.method === 'OPTIONS') {
            response.sendStatus(200)
        }
        else {
            next()
        }
    },
    (request, response, next) => {
        if (request.method === 'POST') {
            let type = request.headers['content-type']
            let bodyStream = '';

            request.on('data', chunk => {
                bodyStream += chunk.toString()
            })

            request.on('end', () => {
                if (type === 'json') {
                    request.body = JSON.parse(bodyStream)
                    next()
                }

                if (type === 'xml') {
                    console.log(request.body)
                    next()
                }
            })
        }
        else {
            next();
        }
    }
)

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.get('/admin', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../admin', 'index.html'));
});


//sql calls
//get data
app.get('/getData', (req, res) => {
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
app.post('/postData', jsonParser, (req, res) => {
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