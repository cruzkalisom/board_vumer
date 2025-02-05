const router = require('express').Router()
const db = require('../modules/db')

router.post('/', (req , res) => {
    var sql = 'SELECT * FROM sessions WHERE  user_id = ? AND  token = ?'
    var sql2 = 'SELECT * FROM licenses WHERE user_id = ?'    
    var slq3 = 'SELECT * FROM organizations WHERE owner_id = ?'


    if((!req.session.token || req.session.token == undefined) || (!req.session.user_id || req.session.user_id == undefined)){
        return res.json ({ notlogin: true})
    } 
    
    var token =req.session.token
    var user_id = req.session.user_id

    db.query(sql, [user_id, token], (err, result) => {
        if (err) {
            return console.error(err.message)
        }

        if (!result[0]){
            return res.json({notlogin: true})
        } 
        
        db.query(sql2, [user_id], (err, result) => {
            if (err) {
                return console.error(err.message)
            }

            if (!result[0]){
                return res.json({invalidlicense: true})
            }

            db.query(slq3, [user_id], (err, result) => {
                if (err) {
                    return console.error(err.message)
                }

                if(!result[0]){
                    return res.json({noorganizations: true})
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
})



module.exports = router
