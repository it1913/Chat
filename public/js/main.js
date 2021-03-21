const socket = io();
const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-message');

const{username} = Qs.parse(location.search, {
ignoreQueryPrefix: true
});

socket.on('message', message => {
    console.log(message);
    outputMessage(message);

    chatMessages.scrollTop = chatMessages.scrollHeight;
})

socket.emit('joinChat',{username});

chatForm.addEventListener('submit', e => {
    e.preventDefault();
    const msg = e.target.elements.msg.value;
    socket.emit('chatMessage', msg);
    //vyčištení prostoru, kde píšeme    
    e.target.elements.msg.value = '';
    e.target.elements.msg.focus();
})

function outputMessage(message){
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML = `<p class="meta">${message.username} <span> ${message.time}</span></p>
    <p class="text">
        ${message.text}
    </p>`;
    document.querySelector('.chat-message').appendChild(div);
}