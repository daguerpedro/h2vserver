
var socket = io();
const ctx = document.getElementById('myChart');

let tensao = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Tensao',
            data: [],
        }]
    }
})

function add(chart, label, data) {
    chart.data.labels.push(label);
    chart.data.datasets.forEach((dataset) => {
        dataset.data.push(data);
    });
    chart.update();
}

socket.on('data', (data) => {
    add(tensao, data[0], data[1])
})