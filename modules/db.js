const db = require('mysql4')

var connect = db.createConnection({
    host: 'localhost',
    user: 'root', 
    database: 'board_vumer',
    password: 'VumerKalis003'
})

connect.connect((err) => {
    if(err){
        return console.error(err.message)
    }

    console.log('Conexão com o Banco de dados bem sucedida!')
})

module.exports = connect