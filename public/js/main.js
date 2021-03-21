const socket = io();
const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-message');


socket.on('message', message => {
    console.log(message);
    outputMessage(message);

    chatMessages.scrollTop = chatMessages.scrollHeight;
})

chatForm.addEventListener('submit', e => {
    e.preventDefault();
    const msg = e.target.elements.msg.value;

    socket.emit('chatMessage', msg);
})

function outputMessage(message){
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML = `<p class="meta">Anonymous <span>0:00</span></p>
    <p class="text">
        ${message}
    </p>`;
    document.querySelector('.chat-message').appendChild(div);
}