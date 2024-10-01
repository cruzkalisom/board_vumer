const express = require('express')
const ejs = require('ejs')
const http = require('http')

const routes = require('./routes/routes')

var port = 50553 //80: Porta padrão HTTP | 443: Porta padrão HTTPS

const app = express()
const server = http.createServer(app)

app.set('view engine', 'ejs')
app.use(express.static(__dirname+'/public'))

app.use('/', routes)

server.listen(port, () => {
    console.log('Servidor rodando')
})