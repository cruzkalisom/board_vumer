const router = require('express').Router()
const db = require('../modules/db')
const uploads = require('../modules/uploads')


router.get('/view/:id', (req,res) => {
    var gameId = req.params.id

    if(isNaN(gameId)){
        return res.status(400).send({error: 'Jogo não encontrado.'})
    }

    req.session.gameid = req.params.id
    res.render('scoreboard/view')
}) 

router.get('/control/:id', (req,res) => {
    req.session.gameid = req.params.id
    res.render('scoreboard/control')
}) 

router.post('/view', (req, res) =>{
    var sql = 'SELECT * FROM games WHERE id = ?'

    var gameId = req.session.gameid

    db.query(sql, [gameId], (err, result)=>{
        if(err){
            console.error('Erro ao buscar jogos no banco de dados')
            return console.error(err.message)
        }

        if(!result[0]){
            return res.json({gameInvalid: true})
        }
    })
    
    
})

router.post('/control', (req, res) =>{
    res.json({status: true})
})

module.exports = router


