const Server = require('socket.io').Server;
let io = new Server()

const datahandler = require('./datahandler')

function init(server)
{
    io = new Server(server);
    io.on('connection', (socket) => {  
        console.log(`[+] Socket: ${socket.id}`)    
         
        socket.on('disconnect', () => {
            console.log(`[-] Socket: ${socket.id}`)      
        });        

        socket.on('requestLatest', ()=> {
            sendToID(socket.id, 'latest', datahandler.latestData);
        });
    });
}

function sendGlobal(eventName, ...data)
{
    io.volatile.emit(eventName, data);
}

function sendToID(id, event, ...data)
{
    io.to(id).emit(event, data);
}


module.exports.init = init;
module.exports.sendGlobal = sendGlobal;