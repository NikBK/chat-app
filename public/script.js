let form = document.getElementById('send-container');
let messageBox = document.getElementById('message-container');
let input = document.getElementById('message-input');


// console.log(io("http://localhost:8080"));

// const socket = io("http://localhost:8080");

const socket = io();


const name = prompt('Your Name');
let msg_holder = document.createElement("div");
msg_holder.classList.add("render-popup-msg");
let h3 = document.createElement("h3");
h3.innerText = "Note";
let msgDiv = document.createElement("div");
let msg = document.createElement("div");
msg.innerText = "Render might have hosting issues";
msgDiv.appendChild(msg);
msg_holder.appendChild(h3);
msg_holder.appendChild(msgDiv);
let main_container = document.querySelector("#main-container");
main_container.insertBefore(msg_holder, main_container.children[0]);

addUser('You joined');
socket.emit('new-user', name);

socket.on('user-connected', name => {
    addUser(`${name} connected`);
});

socket.on('chat-message', data => {
    addMessage(data);
});

socket.on('user-disconnected', name => {
    addUser(`${name} disconnected`);
});


form.addEventListener('submit', (e) => {
    e.preventDefault();
    let message = input.value;
    if (message.trim() !== '') {
        addMessage({ name: 'me', message: message });
        socket.emit('send-message', message);
    }
    input.value = '';
})

function addMessage(data) {
    const div = document.createElement('div');
    div.setAttribute('class', data.name == 'me' ? 'myMsg' : 'othersMsg');
    div.innerText = `${data.name}: ${data.message}`;
    messageBox.append(div);
}

function addUser(user) {
    const div = document.createElement('div');
    div.setAttribute('class', 'user');
    div.innerText = user;
    messageBox.append(div);
}

