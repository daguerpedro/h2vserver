
const socket = io();

$(document).ready(function () {

    socket.on('connect', () => socket.emit("requestLatest"))

    socket.on("latest", (data) => {
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