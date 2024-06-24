const router = require('express').Router();
const socket = require('../socket');

const datahandler = require('../datahandler');

router.post('/add', (req, res) => {
    let data = req.body;

    datahandler.pushData(data);
    socket.sendGlobal('push', data);

    res.sendStatus(200);
})

module.exports = router;