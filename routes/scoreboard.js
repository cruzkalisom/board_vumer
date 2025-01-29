const router = require('express').Router()
const db = require('../modules/db')
const uploads = require('../modules/uploads')


router.get('/view/:id', (req,res) => {
    req.session.gameid = req.params.id
    res.render('scoreboard/view')
}) 

router.get('/control/:id', (req,res) => {
    res.json({status: true})
}) 

router.post('/view', (req, res) =>{
    res.json({status: true})
})


module.exports = router


