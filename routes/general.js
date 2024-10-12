const router = require('express').Router()
const uploads = require('../modules/uploads')
const db = require('../modules/db')

router.post('/login', uploads.any(), (req, res) => {
    var sql = 'SELECT * FROM users WHERE email = ?'

    if((!req.body.email || req.body.email == undefined) || (!req.body.password || req.body.password == undefined)){
        return res.json({invalid: true})
    }

    db.query(sql, [req.body.email], (err, result) => {
        if(err){
            return console.error(err.message)
        }

        if(!result[0]){
            return res.json({invalidEmail: true})
        }

        if(req.body.password !== result[0].password){
            return res.json({invalidPassword: true})
        }

        res.json({status: true})
    })
})

router.get('/login', (req, res) => {
    res.render('general/login')
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