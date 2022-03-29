const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');
//const port = process.argv[2] || 9000;



const server = http.createServer(function(request, response) {
    //console.dir(request.param)

    if  (request.method == 'POST') {
        //console.log('POST')
        var body = ''
        request.on('data', function(data) {
            body += data
        })
        request.on('end', function() {
            console.log('Body: ' + body);
            body += '\n';
            response.writeHead(200, {'Content-Type': 'text/html'});
            response.writeHead(200, {'Access-Control-Allow-Origin': '*'});            
            response.end('post received with data: ' + body);
            
            if  (fs.existsSync('GameStats.txt')) {
                fs.appendFileSync('GameStats.txt', body);
                console.log("The GameStats.txt file was apended to!");
            }
            else {
                fs.writeFile("GameStats.txt", body, function(err) {
                    if  (err) {
                        return console.log(err);
                    }
                    console.log("The GameStats.txt file was created!");
                }); 
            }
        })
    } 
    else {
        console.log('GET')
        var html = `
        <!DOCTYPE html>
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
        response.writeHead(200, {'Content-Type': 'text/html'})
        response.end(html)
    }
});

const port = 3000
const host = '127.0.0.1'
server.listen(port, host)
console.log(`Listening at http://${host}:${port}`)
