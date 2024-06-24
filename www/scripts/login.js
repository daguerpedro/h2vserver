function failed(title, message) {
    $.toast({
        class: 'error',
        displayTime: 0,
        title: title,
        message: message
    });
}


$form = $('.ui.form')
$form.form({
    fields: {
        h2vpass: {
            identifier: 'h2vpass',
            rules: [
                {
                    type: 'empty',
                    prompt: 'Insira uma senha!'
                }
            ]
        },
    }
}).on('submit', (e) => {
    let pass = $('#h2vpass').val();
    $.post("login/", { password: pass }, function (data) {
        if (data.code == 200) {
            location.replace('/dashboard')
        }
        else {
            failed(`Erro ${data.code}`, data.message)
        }
    }).fail(function (e) {
        failed("Erro", e);
    });

    return false;
});