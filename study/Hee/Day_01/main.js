console.log("123")
const express = require("express");
const app = express();

app.use("/", express.static('static'));

// app.get('/', function(req, res){
//     // result = `
//     // <!DOCTYPE html>
//     // <body>
//     //     index page
//     // </body>
//     // `
//     res.send('123');
// })

app.get('/test', function(req, res){
    let a = 1 + 2;

    res.send("result = " + a);
})

app.get('/index', function(req, res){
    result = 
    `
        <!DOCTYPE html>
        <body>
            <div id = "defualt">
                <textarea id = "default_logs">

                </textarea><br>
                <input id = "default_message"><br>
                <button id = "default_send" onclick = "default_on_click()">send</button>
            </div>
        </body>
    `
    res.send(result)
})

app.listen(8080);

function logs(str){
    console.log(str)
}

function err(str){
    console.log(str)
}