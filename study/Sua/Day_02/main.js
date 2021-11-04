const express= require('express');
const app = express();
const ws = require('ws');
const wss = new ws.Server({port:30000});

//static 디렉터리를 사용하겠다는 뜻
app.use('/', express.static('static'));

wss.on('connection',function(ws){
    //ws.send('hello');
    //give client random id number
    ws.id = Math.floor(Math.random()*1000000);
    console.log(ws.id+" is connected");
    
    const user_info = {
        type:'info',
        user_id:ws.id
    }

    ws.send(JSON.stringify(user_info));


    //message를 받으면 실행할 함수
    ws.on('message',function(message){
        message = message+""
        console.log(ws.id + ":" + message);
        const data = JSON.parse(message);

        if(data.whisper !== undefined){
            ws.send(message);
            //send to target id
            wss.clients.forEach(function(client){
                if(client.id == data.whisper){
                    client.send(message);    
                }
            });
        }else{
            //send too all client
            wss.clients.forEach(function(client){
                client.send(message);
            });
        }
    });

    ws.on('close',function(){
        const data = {
            type : 'message',
            user_id: 'system',
            message: ws.id+" 가 연결을 종료하였습니다"
        };

        wss.clients.forEach(function(client){
            client.send(JSON.stringify(data));
        });
    });

});


PORT = 9020;

app.listen(PORT,function(){
    console.log('listening on '+PORT);
})


