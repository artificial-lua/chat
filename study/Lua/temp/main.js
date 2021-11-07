const express = require('express');
const app = express();
const ws = require('ws');
const wss = new ws.Server({port:30000});

wss.on('connection', function(ws) {
    //give client random id number
    ws.id = Math.floor(Math.random() * 1000000);
    console.log(ws.id + ": connected");

    const user_info = {
        type : 'info',
        user_id: ws.id
    }
    ws.send(JSON.stringify(user_info));

    ws.on('message', function(message){
        message = message + ""
        console.log(ws.id + ":" + message);
        const data = JSON.parse(message);
        if(data.whisper !== undefined){
            ws.send(message);
            //send to target client.id
            wss.clients.forEach(function(client){
                if(client.id == data.whisper){
                    client.send(message);
                }
            });
        }
        else{
            //send all client
            wss.clients.forEach(function(client){
                client.send(message);
            });
        }
    });

    ws.on('close', function(){
        const data = {
            type : 'message',
            user_id: 'system',
            message: ws.id + "가 연결을 종료했습니다."
        };
        wss.clients.forEach(function(client){
            client.send(JSON.stringify(data));
        });
    });
});

app.use('/static/', express.static('static'));

PORT = 8080;

app.listen(PORT, function(){
    console.log('listening on port ' + PORT);
})