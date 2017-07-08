const express = require('express'),
    app = express(),
    http = require('http').createServer(app),
    io = require('socket.io')(http),
    path = require('path');

app.use(express.static(path.join(__dirname, 'css')));

//Send file HTML Native
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});


let userOnline = 0;
// Define Socket.io if http client is on connection
io.on('connection', socket => {
    userOnline += 1;
    console.log(userOnline + ' user connected!');

    io.emit('userOn', userOnline);

    // Define Socket.io if http client is disconnect
    socket.on('disconnect', () => {
        // console.log('user diconnected!');
        userOnline -= 1;
        io.emit('userOn', userOnline);
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