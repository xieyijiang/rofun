
const handleConnection = function (socket) {
  console.log(`socket ${socket.id} connected!`)
  socket.on('disconnect', (reason) => {
    console.log(`${socket.id} disconnected, reason: ${reason}`)
  })
}

module.exports = { handleConnection }