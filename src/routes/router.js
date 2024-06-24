const router = require('express').Router();
const path = require('path')

const dashboard = require('./dashboard')
const login = require('./login')
const logout = require('./logout')
const data = require('./data')

//Verifica se o usuário está logado
protected = (req, res, next) => { if (!req.session.liberado) res.sendFile(path.join(__dirname, '../../www/pages/login.html')); else next(); }

router.use('/data', data)
router.use('/dashboard', protected, dashboard);
router.use('/login', login); 
router.use('/logout', logout);
router.use('/', protected, (req, res) => res.redirect('/dashboard')); //A rota raiz será apenas um redirect para login ou dashboard.

//Todas as demais req serão redirecionadas para um 404.
router.get('*', (req, res) => res.sendFile(path.join(__dirname, '../../www/pages/404.html')))
module.exports = router;