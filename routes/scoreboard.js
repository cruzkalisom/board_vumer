const router = require('express').Router()
const db = require('../modules/db')
const uploads = require('../modules/uploads')


router.get('/view/:id', (req,res) => {
    console.log(req.params.id)
    res.render('scoreboard/view')
}) 

router.get('/control/:id', (req,res) => {
    console.log(req.params.id)
    res.json({status: true})
}) 


module.exports = router


