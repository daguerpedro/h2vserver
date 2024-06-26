
const socket = io();

$(document).ready(function () {

    socket.on('connect', () => {
    	console.log('socket conectado');
    	socket.emit("requestLatest")
    	console.log('tentando buscar ultimos dados')
    })

    socket.on("latest", (data) => {
    console.log('ultimos dados recebidos')
        let list = data[0];
        for (var index in list)            
            processData(list[index])
            
    })

    socket.on("push", (raw) => {
        processData(raw[0]);
    })

    function processData(raw)
    {
        let data = raw;
        let hora = data.hora;

        delete data.hora;
        
        addData(hora, data)
    }
})
