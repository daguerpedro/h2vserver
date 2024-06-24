const Server = require('socket.io').Server;
let io = new Server()

const clients = require('./clients')

function init(server)
{
    io = new Server(server);
    io.on('connection', (socket) => {
        clients.pushClientID(socket.id);

        socket.on('disconnect', () => {
            clients.removeClientID(socket.id);
        });
    });
}

function emit(eventName, ...data)
{
    io.volatile.emit(eventName, data);
}

function tell(id, ...data)
{
    io.volatile.to(id).emit(data);
}


module.exports.init = init;
module.exports.emit = emit;