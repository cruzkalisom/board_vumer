const router = require('express').Router()
const db = require('../modules/db')

router.post('/', (req, res) => {
    var sql = 'SELECT * FROM sessions WHERE token = ? AND user_id = ?'
    var sql2 = 'SELECT * FROM users WHERE user_id = ?'

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

            var dataToSend = {
                status: true,
                name: name,
            }

            res.json(dataToSend)
        })
    })
})

router.get('/', (req, res) => {
    req.session.oldpage = '/admin'
    res.render('admin/index')
})


module.exports = router