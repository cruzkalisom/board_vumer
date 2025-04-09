var initSocket = (io) => {
    io.on('connection' , (socket) => {
        console.log('usuario conectado '  + socket.request.session.id);

        socket.on('updatetimer',(data)=>{
            io.emit('updatetimer',data)
        })

        socket.on('point-more-1',(data)=>{
            io.emit('point-more-1',data)
        })

        socket.on('point-more-2',(data)=>{
            io.emit('point-more-2',data)
        })

        socket.on('point-less-1',(data)=>{
            io.emit('point-less-1',data)
        })

        socket.on('point-less-2',(data)=>{
            io.emit('point-less-2',data)
        })
    })
}


module.exports = initSocket;