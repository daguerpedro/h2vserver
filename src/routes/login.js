const router = require('express').Router();
const config = require('../../config.json')
const path = require('path')

const rateLimit = require('express-rate-limit')
const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minutes
    limit: 30, // Limitar 30  requests por windowMs, aqui 1 minuto.
    standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
    handler: function (req, res, next) {
        res.status(429).sendFile(path.join(__dirname, '../www/pages/ratelimit.html'))
        console.log(`O IP ${req.ip} está enviando muitas requests, enviando um rate-limit.`)
    }
})

router.post('/', limiter, (req, res) => {
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

module.exports = router;