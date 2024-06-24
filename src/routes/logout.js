const router = require('express').Router();
const path = require('path')

router.get('/', (req, res) => {
    req.session.destroy()
    res.sendFile(path.join(__dirname, '../../www/pages/logout.html'));
});

module.exports = router;