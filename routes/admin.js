const router = require('express').Router()
const db = require('../modules/db')

router.post('/', (req, res) => {
    var sql = 'SELECT * FROM sessions WHERE token = ? AND user_id = ?'

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

        res.json({status: true})
    })
})

router.get('/', (req, res) => {
    res.render('admin/index')
})

module.exports = router