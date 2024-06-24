const config = require('../config.json')
const express = require('express')
const app = express()

const session = require('express-session')

const server = require('http').createServer(app)
const socket = require('./socket');

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(session({
    secret: config.secret,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))

const router = require('./routes/router')

app.use(express.static('www'))
app.use(router)

require('./clients').clearLatest();

socket.init(server);

server.listen(config.port, () => {
    console.log(`Iniciado o servidor na porta: ${config.port}`)
});