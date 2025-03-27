const router = require('express').Router()
const db = require('../modules/db')
const uploads = require('../modules/uploads')
const moment = require('moment')
const path = require('path')
const fs = require('fs/promises')



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

router.post('/user-orgs', (req, res) => {

    var sql = 'SELECT * FROM sessions WHERE token = ? AND user_id = ?'
    var sql2 = 'SELECT * FROM users_org WHERE user_id = ?'

    if((!req.session.token || req.session.token == undefined) || (!req.session.user_id || req.session.user_id == undefined)){
        return res.json({notlogin: true})
    }  
    var user_id = req.session.user_id
    var token = req.session.token

    db.query(sql, [token, user_id], (err,result) => {
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
            
            var organizations = result
            var dataToSend = {
                status: true,
                organizations: organizations
            }

            res.json(dataToSend)
        })

    })

})

router.post('/create-game', uploads.any(), (req,res) =>{

    var sql = 'SELECT * FROM sessions WHERE token = ? AND user_id = ?' 
    var sql2 = 'SELECT * FROM licenses WHERE user_id = ?'
    var sql3 = 'INSERT INTO games (user_id, game_name, type, description, game_private, game_org, game_time, game_minutes) VALUES (?, ?, ?, ?, ?,?,?,?)'
    var sql4 = 'SELECT * FROM users_org WHERE user_id = ?'


    
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


            db.query(sql4, [user_id], (err, result) => {
                if (err){
                    return console.error(err.message)
                }
                if(!result[0]){
                    return res.json({notorg: true})
                }

                var database = [
                    user_id,
                    req.body.gameName,
                    req.body.gameType,
                    req.body.gameDescription,
                    gamePrivate,
                    req.body.gameOrg,
                    req.body.gameTime, 
                    req.body.minutes


    
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

})

router.post('/create-org',uploads.single('orgLogo'), (req,res) =>{
    var sql = 'SELECT * FROM sessions WHERE token = ? AND user_id = ?'
    var sql2 = 'SELECT * FROM licenses WHERE user_id = ?'
    var sql3 = 'SELECT * FROM users WHERE user_id = ?'
    var sql4 =  'INSERT INTO organizations (org_name, owner_id, owner_name) VALUES (?,?,?)'
    var sql5 = 'INSERT INTO users_org (name, user_id, org_id, org_name) VALUES (?,?,?,?)'
   

    if((!req.session.token || req.session.token == undefined) || (!req.session.user_id || req.session.user_id ==  undefined)){
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
                return res.json({notlicense: true})
            }

            var atualDate = moment()
            var expireDate = moment(result[0].validate)
            var diffDate =  atualDate.diff(expireDate,'days')


            if(diffDate > 5 ) { // 5( numero de dias que o cliente pode acessar após expirar sua licensa )
                return res.json({expiredlicense: true, daysleft: diffDate})
            }

            db.query(sql3,[user_id], (err, result) => {
                if(err){
                    return console.error(err.message)
                }

                if(!result[0]){
                    return res.json({notlogin: true})
                }

                var name = `${result[0].name} ${result[0].surname}`
                var database = [
                    req.body.orgName , 
                    user_id ,
                    name 
                ]

                db.query(sql4, database, (err, result) => {
                    if(err){
                        return console.error(err.message)
                    }     
                    
                    if(req.file){
                        var nameOld = req.file.filename
                        var arqOld = path.join('uploads', nameOld)
                        var newName = `logo_${result.insertId}.png`
                        var newArq = path.join('uploads', newName)
                        fs.rename(arqOld, newArq)
                    }

                    var database = [
                        name,
                        user_id,
                        result.insertId,
                        req.body.orgName
                    ]

                    db.query(sql5, database, (err) => {
                        if(err){
                            return console.error(err.message)
                        }

                        res.json({status: true})
                    })

                })


            })
            
        })
    })
    
})

module.exports = router

