const sqlConnection = require('../dbinit');

//get data from level
function getLevelData(level, callback){
    /*
    sqlConnection.connect()
    sqlConnection.query(
        `SELECT * FROM ${level}`,
        (err, result, fields) => {
            if (err) callback(err);
            callback(result);
        }
    );
    sqlConnection.end();
    */
}

//insert data into level
function insertLevelData(data, level, callback){
    sqlConnection.connect()
    sqlConnection.query(
        `INSERT INTO ${level} ( time) VALUES (${data})`,
        (err, result, fields) => {
            if (err) callback(err);
            callback(result);
        }
    );
    sqlConnection.end();
}

module.exports = [getLevelData, insertLevelData];
