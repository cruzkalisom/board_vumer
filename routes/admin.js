const router = require('express').Router()
const db = require('../modules/db')
const uploads = require('../modules/uploads')



router.post('/', (req, res) => {
    var sql = 'SELECT * FROM sessions WHERE token = ? AND user_id = ?'
    var sql2 = 'SELECT * FROM users WHERE user_id = ?'
    var sql3 = 'SELECT * FROM games WHERE user_id = ?'

    if((!req.session.token || req.session.token == undefined) || (!req.session.user_id || req.session.user_id == undefined)){
        return res.json({notlogin: true})
    }

    var user_id = req.session.user_id
    var token = req.session.token

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

            var name = `${result[0].name} ${result[0].surname}`

            db.query(sql3,[user_id], (err, result) => {
                if(err){
                    return console.error(err.message)
                }
                var games = result

                
                var dataToSend = {
                    status: true,
                    name: name,
                    games: games
                }  
                res.json(dataToSend)
            })
        })
    })
})

router.get('/', (req, res) => {
    req.session.oldpage = '/admin'
    res.render('admin/index')
})

router.post('/create-game', uploads.any(), (req,res) =>{

    var sql = 'SELECT * FROM sessions WHERE token = ? AND user_id = ?' 
    var sql2 = 'SELECT * FROM licenses WHERE user_id = ?'
    var sql3 = 'INSERT INTO games (user_id, game_name, type, description, game_private) VALUES (?, ?, ?, ?, ?)'
    
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
                return res.json({notlicense: true})
            }

            var gamePrivate = 'N'
            if(req.body.gamePrivate == 'true') {
                gamePrivate = 'Y'
            }

            var database = [
                user_id,
                req.body.gameName,
                req.body.gameType,
                req.body.gameDescription,
                gamePrivate

            ]
            db.query(sql3, database,(err) => {
                if(err){
                    return console.error(err.message)
                }
                res.json({status: true})
            }) 
        })
    })

})


module.exports = router

