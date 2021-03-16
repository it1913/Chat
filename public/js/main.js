const socket = io();
const message = document.getElementById('message');
const send = document.getElementById('send');
const chatBox = document.getElementById('chatbox');

send.addEventListener('click', function(e){
    if(message.value){
        socket.emit('chat', message.value);
    }

});

socket.on('chat', msg => {
    console.log(msg);
    chatBox.innerHTML += `<div>${msg}</div>`;
})