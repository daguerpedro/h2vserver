const path = require('path')
const config = require('../config.json')
const log = require('./log')

const rateLimit = require('express-rate-limit')
const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minutes
    limit: 30, // Limitar 30  requests por windowMs, aqui 1 minuto.
    standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
    handler: function (req, res, next) {
        res.status(429).sendFile(path.join(__dirname, '../www/ratelimit.html'))
        log.warn(`O IP ${req.ip} está enviando muitas requests, enviando um rate-limit.`)
    }
})

/* 
CONFIGURAR SERVIDORES
*/
const express = require('express')
const app = express()

const session = require('express-session')

const server = require('http').createServer(app)
const io = require('socket.io')(server)

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(session({
    secret: config.secret,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))

const router = require('./router')

app.use(limiter);
app.use(express.static('www'))
app.use(router)

/* 
INICIAR SERVIDORES
*/

log.init();

io.on('connection', (socket) => {
    socket.on('disconnect', () => {

    });
});

server.listen(config.port, () => {
    log.info(`Iniciado o servidor na porta: ${config.port}`)
});

module.exports.emit = function(a, b){
    io.emit(a, b);
};