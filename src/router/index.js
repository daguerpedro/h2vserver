const server = require('../server');

const path = require('path')
const log = require('../log')
const router = require('express').Router()

const config = require('../../config.json')

//Middleware
function protected(req, res, next)
{
    if (!req.session.liberado)
        res.sendFile(path.join(__dirname, '../../www/pages/login.html'));
    else
        next();
}

router.get('/logout', protected, (req, res) => {
    req.session.destroy()
    res.sendFile(path.join(__dirname, '../../www/pages/logout.html'));
});

// Quando entrar no raiz, se estiver logado vai para /dashboard, caso contrário irá para login.html
router.get('/', protected, (req, res) => {
    res.redirect('/dashboard')
});

//O diretório Raiz
router.get('/dashboard', protected, (req, res) => {
    res.sendFile(path.join(__dirname, '../../www/pages/dashboard.html'));
})

//Envia outras págnias para o 404.
router.get('*', (req, res, next) => {
    res.sendFile(path.join(__dirname, '../../www/pages/404.html'))
})

router.post('/login', (req, res) => {
    if (!req.body['password']) {
        res.send({ message: "Envie uma senha", code: 400 });
    }

    if (req.body['password'] != config.senha)
        res.send({ message: "Senha incorreta", code: 400 });
    else {
        req.session.liberado = true;
        res.send({ message: "Logado!", code: 200 });
    }
})

router.post('/add', (req, res) => {
    if(req.session.liberado)
    {
        let data = req.body;
        
        server.emit('data', [data.tempo, data.valor]);
    }
    else
    {
        res.sendStatus(400);
    }
})

module.exports = router;