$('#reator2').hide();

$('#b_reator1').click(() => {
    $('#reator2').hide();
    $('#b_reator2').removeClass('active');
    
    $('#reator1').show();    
    $('#b_reator1').addClass('active');
})

$('#b_reator2').click(() => {
    $('#reator1').hide();
    $('#b_reator1').removeClass('active');

    $('#reator2').show();    
    $('#b_reator2').addClass('active');
})