const router = require('express').Router()
const path = require('path')

//O diretório Raiz
router.get('/', (req, res) => res.sendFile(path.join(__dirname, '../../www/pages/dashboard.html')));

module.exports = router;