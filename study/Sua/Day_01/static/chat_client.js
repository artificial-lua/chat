function on_load(){
    document.getElementById('chat_client').innerHTML=`
    <textarea id="logs"></textarea><br>
    <input id="message"><br>
    <button id="send" onclick="on_click_send()">send</button>
    `;
}

function on_click_send(){
    document.getElementById('logs').value += document.getElementById('message').value  + '\n';
    document.getElementById('message').value = '';
}