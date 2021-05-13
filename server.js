//Handle socket io connections
const io = require('socket.io')(process.env.PORT || 8000)

const users ={};
 
io.on('connection', socket =>{
        //If any new user joined the server ....let others nknow
        socket.on('new-user-joined', name =>{
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name);
    });
   //if someone sends a messagge, broadcast it to others
    socket.on('send', message =>{
        socket.broadcast.emit('receive', {message: message, name: users[socket.id]})
    });
    //if someone leaves server, let others know
    socket.on('disconnect', message =>{
         socket.broadcast.emit('left', users[socket.id]);
         delete users[socket.id];
     });


});