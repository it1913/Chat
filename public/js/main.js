const socket = io();
const message = document.getElementById('message');
const send = document.getElementById('send');
const chatBox = document.getElementById('chatbox');

send.addEventListener('click', function(e){
    if(message.value){
        socket.emit('chat', message.value);
    }
});

socket.on('message', msg => {
    console.log(msg);
   
})