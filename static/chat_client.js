function on_load(){
    let form = document.getElementById('chat_client');
    form.innerHTML = `
        <textarea id="logs"></textarea>
        <input id="message">
        <button id="send" onclick="on_click_send()">send</button>
    `
}

function on_click_send(){

}