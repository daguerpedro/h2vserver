
var socket = io();

function create(id, _label) {
    return new Chart(document.getElementById(id), {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: _label,
                data: [],
            }]
        }
    })
}
function add(chart, label, data) {
    chart.data.labels.push(label);
    chart.data.datasets.forEach((dataset) => {
        dataset.data.push(data);
    });
    chart.update();
}

let tensao1 = create('tensao1', 'Tensão (mV)');
let potencia1 = create('potencia1', 'Potência (mW)');
let temperatura1 = create('temperatura1', 'Temperatura (°C)');

let tensao2 = create('tensao2', 'Tensão (mV)');
let potencia2 = create('potencia2', 'Potência (mW)');
let temperatura2 = create('temperatura2', 'Temperatura (°C)');


socket.on('data', (data) => {
    //console.log(data);
})

$('#sair').click(() => {
    location.replace('/logout')
});