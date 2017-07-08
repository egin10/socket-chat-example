const express = require('express'),
    app = express(),
    http = require('http').createServer(app);
io = require('socket.io')(http);

//Send file HTML Native
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});


// Define Socket.io if http client is on connection
io.on('connection', socket => {
    console.log('a user connected!');

    // Define Socket.io if http client is disconnect
    socket.on('disconnect', () => {
        console.log('user diconnected!');
    });

    // Fetch value from client and parsing it to callback
    socket.on('chat message', (data) => {
        // console.log('user: ' + data.usr);
        // console.log('message: ' + data.msg);

        //io.emmit() for send message to client
        io.emit('chat message', { usr: data.usr, msg: data.msg });
    });
});

const port = process.env.PORT || 8000;
http.listen(port, (err) => {
    if (err) throw err;

    console.log(`Server is running on PORT ${port}`);
});