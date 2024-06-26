const GRAFICOS = {
    NENHUM: "Nenhum",

    TENSAO1: {
        titulo: "Tensão 1 (mV)",
        ativo: true,
    },
    TENSAO2: {
        titulo: "Tensão 2 (mV)",
        ativo: false,
    },

    CORRENTE1: {
        titulo: "Corrente 1 (mA)",
        ativo: false
    },

    CORRENTE2: {
        titulo: "Corrente 2 (mA)",
        ativo: false,
    },

    POTENCIA1: {
        titulo: "Potência 1 (mW)",
        ativo: false,
    },
    POTENCIA2: {
        titulo: "Potência 2 (mW)",
        ativo: false,
    },

    TEMPERATURA: {
        titulo: "Temperatura (°C)",
        ativo: false
    }
};

function criarGrafico(canvasID) {
    return new Chart(document.getElementById(canvasID), {
        type: 'line',
        options: { plugins: { legend: { display: false } }, },
        data: {
            labels: [],
            datasets: [
                { graficoTipo: GRAFICOS.TENSAO1, label: GRAFICOS.TENSAO1.titulo, data: [], hidden: true },
                { graficoTipo: GRAFICOS.TENSAO2, label: GRAFICOS.TENSAO2.titulo, data: [], hidden: true },
                { graficoTipo: GRAFICOS.CORRENTE1, label: GRAFICOS.CORRENTE1.titulo, data: [], hidden: true },
                { graficoTipo: GRAFICOS.CORRENTE2, label: GRAFICOS.CORRENTE2.titulo, data: [], hidden: true },
                { graficoTipo: GRAFICOS.POTENCIA1, label: GRAFICOS.POTENCIA1.titulo, data: [], hidden: true },
                { graficoTipo: GRAFICOS.POTENCIA2, label: GRAFICOS.POTENCIA2.titulo, data: [], hidden: true },
                { graficoTipo: GRAFICOS.TEMPERATURA, label: GRAFICOS.TEMPERATURA.titulo, data: [], hidden: true },
            ]
        }
    })
}

const __grafico = criarGrafico('grafico');

function atualizarGrafico() {
    __grafico.data.datasets.forEach((set) => { 
        set.hidden = set.graficoTipo.ativo == false;
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

    if (__grafico.data.labels.length > maxValues()) {
        let quantos = (__grafico.data.labels.length - maxValues());
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
