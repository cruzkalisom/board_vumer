var initSocket = (io) => {
    io.on('connection' , (socket) => {
        console.log('usuario conectado '  + socket.request.session.id);
    })
}

module.exports = initSocket;