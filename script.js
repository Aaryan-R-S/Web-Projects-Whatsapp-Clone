const socket = io('http://localhost:8080');

//Get dom elements in respective js variables
//css linked-- sendf, text, .cont, mess, messl, messr
const form = document.getElementById('sendf')
const messageInput = document.getElementById('text')
const messageContainer = document.querySelector(".cont")

//audio
var audio = new Audio('chat.mp3')

//function which will append event to container
//css linked-- sendf, text, .cont, mess, messl, messr
const append = (message, position)=>{
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('mess');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position =='messl'){
        audio.play();
    }
 }

const name = prompt('Enter your name to Join chat!')

socket.emit('new-user-joined', name);

//if a new user joins, receive the event from the server
socket.on('user-joined', name =>{
      append(`${name} joined the chat!`, 'messc')
})

//if server send a message then receive it
socket.on('receive', data =>{
      append(`${data.name}: ${data.message}`, 'messl')
})

//if a user leaves the chat append the info to container
socket.on('left', name =>{
      append(`${name} left the chat`, 'messc')
})

//if form submits then send the message to srver
form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`, 'messr');
    socket.emit('send', message);
    messageInput.value = '' ;
})