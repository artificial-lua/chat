//nodejs websocket server

const express = require('express');
const app = express();
const ws = require('ws');
const wss = new ws.Server({port: 30000});

wss.on('connection', function(ws) {
    // when client first connect, give personal id
    ws.id = Math.random();
    console.log('client connected: ' + ws.id);

    // when client send message, broadcast to all clients
    ws.on('message', function(message) {
        console.log('received: ' + message);
        wss.clients.forEach(function(client) {
            if (client.readyState === ws.OPEN) {
                client.send(ws.id + " : " + message);
            }
        });
    });

    // when client disconnect, send message to all client
    ws.on('close', function() {
        wss.clients.forEach(function(client) {
            client.send('client disconnect');
        });
    });
});

app.use('/', express.static('static'))

app.listen(8080);