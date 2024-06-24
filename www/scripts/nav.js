function setActive(id, tipoGrafico) {
    if ($(".active").length > 0)
        $(".active").removeClass("active")

    $(`${id}`).addClass('active')

    graficoAtivo = tipoGrafico;
    atualizarGrafico();
}

$( document ).ready(function() {
    $("#v1").click(() => setActive("#v1", GRAFICOS.TENSAO1))
    $("#v2").click(() => setActive("#v2", GRAFICOS.TENSAO2))
    
    $("#i1").click(() => setActive("#i1", GRAFICOS.CORRENTE1))
    $("#i2").click(() => setActive("#i2", GRAFICOS.CORRENTE2))
    
    $("#p1").click(() => setActive("#p1", GRAFICOS.POTENCIA1))
    $("#p2").click(() => setActive("#p2", GRAFICOS.POTENCIA2))
    
    $("#t").click(() => setActive("#t", GRAFICOS.TEMPERATURA))

    $('#sair').click(() => {
        location.replace('/logout')
    });
});