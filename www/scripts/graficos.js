const GRAFICOS = {
    NENHUM: "Nenhum",

    TENSAO1: "Tensão 1 (mV)",
    TENSAO2: "Tensão 2 (mV)",

    CORRENTE1: "Corrente 1 (mA)",
    CORRENTE2: "Corrente 2 (mA)",

    POTENCIA1: "Potência 1 (mW)",
    POTENCIA2: "Potência 2 (mW)",

    TEMPERATURA: "Temperatura (°C)"
};

let graficoAtivo = GRAFICOS.TENSAO1;

function criarGrafico(canvasID) {
    return new Chart(document.getElementById(canvasID), {
        type: 'line',
        options: {
            plugins: { legend: { display: false } }, scales: {
                y: {
                    min: 0,
                    max: 100,
                }
            }
        },
        data: {
            labels: [],
            datasets: [
                { graficoTipo: GRAFICOS.TENSAO1, label: GRAFICOS.TENSAO1, data: [], hidden: true },
                { graficoTipo: GRAFICOS.TENSAO2, label: GRAFICOS.TENSAO2, data: [], hidden: true },
                { graficoTipo: GRAFICOS.CORRENTE1, label: GRAFICOS.CORRENTE1, data: [], hidden: true },
                { graficoTipo: GRAFICOS.CORRENTE2, label: GRAFICOS.CORRENTE2, data: [], hidden: true },
                { graficoTipo: GRAFICOS.POTENCIA1, label: GRAFICOS.POTENCIA1, data: [], hidden: true },
                { graficoTipo: GRAFICOS.POTENCIA2, label: GRAFICOS.POTENCIA2, data: [], hidden: true },
                { graficoTipo: GRAFICOS.TEMPERATURA, label: GRAFICOS.TEMPERATURA, data: [], hidden: true },
            ]
        }
    })
}

const __grafico = criarGrafico('grafico');
const maxValues = 30;

function atualizarGrafico() {
    $('#titulo').text(graficoAtivo)

    __grafico.data.datasets.forEach((set) => {
        set.hidden = set.graficoTipo != graficoAtivo;
    })

    __grafico.update();
}

function addData(hora, raw) {
    for (data in raw) {
        tipo = GRAFICOS[data.toUpperCase()];

        if (tipo != undefined) {
            let g = __grafico.data.datasets.find((x) => (x.graficoTipo == tipo))
            g.data.push(raw[data])
        }

    }
    __grafico.data.labels.push(hora);

    if (__grafico.data.labels.length > maxValues) {
        let quantos = (__grafico.data.labels.length - maxValues);
        __grafico.data.labels.splice(0, quantos);
        __grafico.data.datasets.forEach((set) => {
            set.data.splice(0, (quantos))
        })
    }
    __grafico.update();
}

$(document).ready(function () {
    atualizarGrafico();

})