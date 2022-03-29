
//get data from level
function getLevelData(level, callback){
    const sqlConnection = require('../dbinit');
    sqlConnection.query(
        `SELECT * FROM ${level}`,
        (err, result, fields) => {
            if (err) callback(err);
            callback(result);
        }
    );
}

//insert data into level
function insertLevelData(data, level, callback){
    const sqlConnection = require('../dbinit');
    sqlConnection.query(
        `INSERT INTO ${level} (time) VALUES (${data})`,
        (err, result, fields) => {
            if (err) callback(err);
            callback(result);
        }
    );
}

module.exports = [getLevelData, insertLevelData];
