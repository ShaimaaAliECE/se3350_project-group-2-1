const express = require('express');
const Connection = require('mysql/lib/Connection');
const path = require('path')
const [getLevelData, insertLevelData] = require('./sql/levels/sqlFunctions');
const createTables = require('./sql/levels/createTables')
var bodyParser = require('body-parser');
const { rmSync } = require('fs');
var jsonParser = bodyParser.json()

const app = express()

app.use(
    (request, response, next) => {
        response.set({
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': '*'
        })

        if (request.method === 'OPTIONS') {
            response.sendStatus(200)
        }
        else {
            next()
        }
    }
)

app.use(express.static(path.join(__dirname, '../client/build')))

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.get('/admin', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../admin', 'index.html'));
});

//sql calls
//get data
let levelMapping = {
    '2': 'level2Data',
    '3': 'level3Data',
    '4': 'level4Data',
    '5': 'level5Data',
    'custom': 'levelCustomData'
}

app.get('/getData', (req, res) => {
    let level = levelMapping[req.query.level];

    getLevelData(level, (data) => {
        console.log(data)
        res.json(data);
    })
});

/*
app.get('/createTables', (req, res) => {
    createTables();
});
*/

app.get('/postTest', (req, res) => {
    let html = `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
            <title>test.html</title>
            <script>
                function testSendingStats() {
                    var JSONCall = "";
                    var JSONString = "";
                    var xmlhttp = new XMLHttpRequest();
                    JSONCall += "http://127.0.0.1:3000";
                    JSONString += document.getElementById("GameStats_Text").value;
                    xmlhttp.open("POST", JSONCall, false);
                    xmlhttp.setRequestHeader("Content-Type", "text/html");
                    try {
                        xmlhttp.send(JSONString);	            
                    }
                    catch (err) {
                        console.log("<br>Could not connect to the service.");
                        return("");
                    }
                    if  (xmlhttp.status != 200 || xmlhttp.responseText == "") {
                        console.log("No Response Provided from Server" + xmlhttp.statusText);
                        return("");
                    }               
                    return(xmlhttp.responseText);
                }
            </script>
        </head>
        <body>
        <div style="float:left;background-color:white;">
            <input id="GameStats_Text" type="text" style="float:left;width:600px;height:50px;font-size:30px;margin-left:50px;margin-top:150px;"><br><br>
            <input type="button" onclick="testSendingStats('These are the game stats');" style="float:left;margin-top:50px;height:100px;margin-left:200px;width:300px;background-color:navy;color:white" value="RUN TEST">
        </div>
        </body>
        </html>`

        res.writeHead(200, {'Content-Type': 'text/html'})
        res.end(html)
})

app.get('/testDB', (req, res) => {
    function returnData(data) {
        res.send(data)
    }

    getLevelData(2, returnData);
})
*/

//insert data
app.post('/postData', jsonParser, (req, res) => {
    console.log(req.body)

    let level = levelMapping[req.body.level];
    let time = req.body.timeDelta;

    insertLevelData(time, level, (data) => {
        res.send(data);
    });
});

app.listen(8080, () => {
    console.log("listenining on: " + 8080)
});