
//get data from level
function getLevelData(level, callback){
    const sqlConnection = require('../dbinit');
    sqlConnection.query(
        `SELECT * FROM ${level}`,
        (err, result, fields) => {
            if (err) { 
                console.log(err)
                callback("error")
            }
            else {
                callback(result.map((element) => {
                    let obj = JSON.parse(JSON.stringify(element))
                    return obj
                }));
            }
        }
    );
}

//insert data into level
function insertLevelData(data, level, callback){
    const sqlConnection = require('../dbinit');
    sqlConnection.query(
        `INSERT INTO ${level} (time) VALUES (${data})`,
        (err, result, fields) => {
            if (err) { 
                console.log(err)
                callback("error")
            }
            else {
                callback(result);
            }
        }
    );
}

module.exports = [getLevelData, insertLevelData];
