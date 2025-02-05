var initSocket = (io) => {
    io.on('connection' , (socket) => {
        console.log('usuario conectado '  + socket.request.session.id);

        socket.on('updatetimer',(data)=>{
            io.emit('updatetimer',data)
        })
    })
}


module.exports = initSocket;