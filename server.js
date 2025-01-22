const express = require('express')
const ejs = require('ejs')
const http = require('http')
const BodyParser = require('body-parser')
const session = require('express-session')

const general = require('./routes/general')
const admin = require('./routes/admin')

const scoreboard = require('./routes/scoreboard')


var port = 50553 //80: Porta padrão HTTP | 443: Porta padrão HTTPS

const app = express()
const server = http.createServer(app)

app.use(BodyParser.urlencoded({extended: false}))
app.use(BodyParser.json())

app.use(session({
    secret: 'ljkydqpw456duhasudu23wywueyhf9ue',
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 24 * 60 * 60 * 1000
    }
}))

app.set('view engine', 'ejs')
app.use(express.static(__dirname+'/public'))

app.use('/', general)
app.use('/admin', admin)
app.use('/scoreboard', scoreboard )

app.use((req, res) => {
    res.status(404).render('errors/404')
})

server.listen(port, () => {
    console.log('Servidor rodando')
})