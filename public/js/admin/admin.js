var urlAdmin = '/admin'

$.ajax({
    url: urlAdmin,
    method: 'POST',
    success: (data) => {
        if(data.notlogin){
            return location.href = '/login'
        }
        if(data.status){
            document.getElementById('username').innerText = data.name
        }
    },
    error: (err) => {
        console.error('Erro ao solicitar resposta na rota ' + urlAdmin)
        console.log(err)
    }
})

$('#create-game').on('click', () => {
    var gameType = document.getElementById('create-game-type')
    var gameName = document.getElementById('create-game-name')
    var gameDescription = document.getElementById('create-game-description')
    var url = '/admin/create-game'
    var formData = new FormData()
    
    if(!(/[a-zA-Z]/).test(gameName.value)){
        return alert('Digite um nome para o jogo')
    }

    formData.append('gameName', gameName.value)
    formData.append('gameType', gameType.value)
    formData.append('gameDescription', gameDescription.value)

    $.ajax({
        url: url,
        method: 'POST',
        data: formData,
        processData: false,
        contentType: false,
        success: (data) => {
            console.log(data)
        },
        error: (err) => {
            console.error('Erro ao solicitar resposta na rota ' + url)
            console.error(err)
        }


    })


})

$('#new-game').on('click', (event) => {
    event.preventDefault()
})


