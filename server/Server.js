const express = require('express');
const Connection = require('mysql/lib/Connection');
const path = require('path')
const [getLevelData, insertLevelData] = require('./sql/levels/sqlFunctions');
const createTables = require('./sql/levels/createTables')

const app = express()


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
    2:'level2Data',
    3:'level3Data',
    4:'level4Data',
    5:'level5Data',
    custom: 'levelCustomData'
}

app.get('/getData', (req, res) =>{
    let level = levelMapping[req.body.level];
    getLevelData(level, returnData);

    //callback
    function returnData(data){
        res.send(data);
    }
});

app.get('/createTables', (req, res) =>{
    createTables();
});

//insert data
app.post('/postData', (req, res) =>{
    let level = levelMapping[req.body.level];
    let time = req.body.time;
    insertLevelData(time, level, returnData);

    //callback
    function returnData(data){
        res.send(data);
    }
});



app.listen(8080);