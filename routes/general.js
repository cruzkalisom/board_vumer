const router = require('express').Router()
const uploads = require('../modules/uploads')
const db = require('../modules/db')
const encodes = require('../modules/encodes')

//Comments

router.post('/', (req, res) =>{
    var sql = 'SELECT * FROM sessions WHERE token = ? AND user_id = ?'
    var sql2 = 'SELECT * FROM users WHERE user_id = ?'

    if((!req.session.token || req.session.token == undefined) || (!req.session.user_id || req.session.user_id == undefined)){
        return res.json({notlogin: true})
    }

    var token = req.session.token
    var user_id = req.session.user_id

    db.query(sql, [token, user_id], (err, result) => {
        if(err){
            return console.error(err.message)
        }

        if(!result[0]){
            return res.json({notlogin: true})
        }

        db.query(sql2, [user_id], (err, result) => {
            if(err){
                return console.error(err.message)
            }

            if(!result[0]){
                return res.json({notlogin: true})
            }

            var infoUser = result[0]

            var dataToSend = {
                status: true,
                infoUser: infoUser
            } 

            res.json(dataToSend)
        })
    })
})

router.post('/login', uploads.any(), (req, res) => {
    var sql = 'SELECT * FROM users WHERE email = ?'
    var sql2 = 'INSERT INTO sessions (user_id) VALUES (?)'

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
        
        encodes.bcrypt.compare(req.body.password, result[0].password, (err, success) => {
            if(err){
                return console.log(err.message)
            }

            if(!success){
                return res.json({invalidPassword: true})
            }

            var user_id = result[0].user_id

            db.query(sql2, [user_id], (err, result) => {
                if(err){
                    return console.log(err.message)
                }
    
                req.session.user_id = user_id
                req.session.token = result.insertId
    
                if(!req.session.oldpage || req.session.oldpage == undefined){
                    return res.json({status: true, oldpage: '/'})
                }
    
                res.json({status: true, oldpage: req.session.oldpage})
            })
        }) 
    })
})

router.get('/login', (req, res) => {
    res.render('general/login')
})

router.post('/register', uploads.any(), (req, res) => {
    var sql = 'SELECT * FROM users WHERE email = ?'
    var sql2 = 'INSERT INTO users (name, surname, email, password) VALUES (?, ?, ?, ?)'
    var sql3 = 'INSERT INTO sessions (user_id) VALUES (?)'

    db.query(sql, [req.body.email], (err, result) => {
        if(err){
            return console.log(err.message)
        }

        if(result[0]){
            return res.json({utilEmail: true})
        }

        var passencode = encodes.encodePassword(req.body.password)

        var database = [
            req.body.name,
            req.body.surname,
            req.body.email,
            passencode
        ]

        db.query(sql2, database, (err, result) => {
            if(err){
                return console.error(err.message)
            }

            var user_id = result.insertId

            db.query(sql3, [user_id], (err, result) => {
                if(err){
                    return console.error(err.message)
                }

                req.session.user_id = user_id
                req.session.token = result.insertId

                if(!req.session.oldpage || req.session.oldpage == undefined){
                    return res.json({status: true, oldpage: '/'})
                }

                res.json({status: true, oldpage: req.session.oldpage})
            })
        })
    })
})

router.get('/register', (req, res) => {
    res.render('general/register')
})

router.get('/', (req, res) => {
    res.render('general/index')
})



module.exports = router