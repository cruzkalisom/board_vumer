const router = require('express').Router()
const uploads = require('../modules/uploads')
const db = require('../modules/db')

router.post('/login', uploads.any(), (req, res) => {
    console.log(req.body)
})

router.post('/register', uploads.any(), (req, res) => {
    console.log(req.body)
    res.json({status: 'Olá, Mundo!'})
})

router.get('/register', (req, res) => {
    res.render('general/register')
})

router.get('/', (req, res) => {
    res.render('general/index')
})

module.exports = router