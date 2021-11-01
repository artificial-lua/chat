console.log("123")

//변경 가능변수
//let a = 0;
//a = 2;

//상수
//const c = 1;
//c = 3;

//http 서비스를 실행
const express = require('express');
const app = express();

//정적 파일 제공
app.use('/', express.static('static'))

app.get('/', function(req,res){
    res.send('123');
})

app.get('/test',function(req,res) {
    let a = 1+2;

    res.send('result= ' + a);
})

//잘 안씀
app.get('/index', function(req,res){

    result=
        `
        <!DOCTYPE html>
        <head>
            <script type = "text/javascript" src="chat_client.js"></script>
            <link rel="stylesheet" href="style.css">
        </head>
        
        <body>
            <div id="default">
                <textarea id = "default_logs"></textarea><br>
                <input id="default_message"><br>
                <button id="input_send" onclick="default_on_click()">send</button>
            </div>
            <div id="chat_client">
            </div>
        </body>
        
        
        <script>
            function default_on_click(){
                document.getElementById('default_logs').value += document.getElementById('default_message').value  + '\n';
                document.getElementById('default_message').value = '';
            }
        
            on_load();
        </script>
        
        <style>
            #default_logs{
                min-width: 250px;
                min-height: 250px;
            }
        
            #default_message{
                min-width: 250px;
            }
        </style>
        `
    res.send(result);
})

app.listen(8080);
