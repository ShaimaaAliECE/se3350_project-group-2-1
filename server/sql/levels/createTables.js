const sqlConnection = require('../dbinit');

function createTables(){
    //conncet to db
    sqlConnection.connect()
    //queries
    sqlConnection.query(
        'CREATE TABLE level2Data (time VARCHAR(20))',
        (err, result, fields) => {
            if (err) console.log(err);
            console.log(result);
        }
    );
    sqlConnection.query(
        'CREATE TABLE level3Data (time VARCHAR(20))',
        (err, result, fields) => {
            if (err) console.log(err);
            console.log(result);
        }
    );
    sqlConnection.query(
        'CREATE TABLE level4Data (time VARCHAR(20))',

        (err, result, fields) => {
            if (err) console.log(err);
            console.log(result);
        }
    );
    sqlConnection.query(
        'CREATE TABLE level5Data (time VARCHAR(20))',

        (err, result, fields) => {
            if (err) console.log(err);
            console.log(result);
        }
    );
    sqlConnection.query(
        'CREATE TABLE levelCustomData (time VARCHAR(20))',

        (err, result, fields) => {
            if (err) console.log(err);
            console.log(result);
        }
    );
        //end connection
    sqlConnection.end();   
}

module.exports = createTables;
