// Hacer conexión
var socket = io();

// DOM Query
var message     = document.getElementById('message'),
    handle      = document.getElementById('handle'),
    button      = document.getElementById('send'),
    output      = document.getElementById('output'),
    feedback    = document.getElementById('feedback');

// Emisión de eventos
button.addEventListener('click', function() {
    socket.emit('chat', {
        message: message.value,
        handle: handle.value
    });
    message.value = "";
});

message.addEventListener('keypress', function() {
    socket.emit('typing', handle.value);
});

// Escucha de eventos
socket.on('chat', function(data) {
    feedback.innerHTML = "";
    output.innerHTML += '<p><b>' + data.handle + ': </b>' + data.message + '</p>';
});

// Mensaje a los demás
socket.on('typing', function(data) {
    feedback.innerHTML = '<p><em>' + data + 'está escribiendo... </em></p>';
});