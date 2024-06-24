const router = require('express').Router();
const socket = require('../socket');

const clients = require('../clients');

router.post('/add', (req, res) => {
    let data = req.body;

    clients.pushData(data);
    socket.emit('data', data);

    res.sendStatus(200);
})

router.get('/latest', (req, res) => {
    console.log(req.body)
    socket.emit('data', latestData);
    res.sendStatus(200);
})

module.exports = router;