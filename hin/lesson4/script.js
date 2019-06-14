
io.on('connection', function (socket) {
    for(var i in messages) {
      io.sockets.emit("display message", messages[i]);
    }
    socket.on("send message", function (data) {
        messages.push(data);
        io.sockets.emit("display message", data);
    });
 });

 function handleMessage(msg) {
    var p = document.createElement('p');
    p.innerText = msg;
    chatDiv.appendChild(p);
    input.value = "";
}

socket.on('display message', handleMessage);
 // main closing bracket

window.onload = main;   