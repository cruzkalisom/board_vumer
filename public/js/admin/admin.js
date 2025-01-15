var urlAdmin = '/admin'

$.ajax({
    url: urlAdmin,
    method: 'POST',
    success: (data) => {
        if(data.notlogin){
            return location.href = '/login'
        }
        if(data.status){
            loadgames(data.games)            
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
        return warning('Recusado','Digite um nome para o jogo')
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
            if(data.notlogin){
                return warning('Recusado','Faça Login Para criar seu Jogo')
            }

            if(data.notlicense){
                return danger('Negado','Adquira ou renove sua Licensa Para criar seu Jogo')
            }

            if(data.status){
                success('Otimo','Jogo criado com sucesso')
            }

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

function loadgames(games){
    var html = ''
    
    games.forEach((game) =>{
        html += `
            <tr>
                <th>${game.id}</th>
                <td>${game.game_name}</td>
                <td>${game.type}</td>
                <td>${game.description}</td>
                <td>
                    <button class=" btn btn-sm btn-success">placar</button>
                    <button class="btn btn-sm btn-warning"> controle</button>
                </td>
            </tr>
        `
    })
    document.getElementById('table-body-games').innerHTML = html


}

function danger(title,message){
    document.getElementById ("toast").classList.remove("text-bg-success")
    document.getElementById ("toast").classList.remove("text-bg-warning")

    document.getElementById ("toast").classList.add("text-bg-danger")

    document.getElementById("toast-title").innerText = title

    document.getElementById("toast-body").innerText = message

    bootstrap.Toast.getOrCreateInstance(toast).show()
}

function success(title,message){
    document.getElementById ("toast").classList.remove("text-bg-danger")
    document.getElementById ("toast").classList.remove("text-bg-warning")

    document.getElementById ("toast").classList.add("text-bg-success")

    document.getElementById("toast-title").innerText = title

    document.getElementById("toast-body").innerText = message

    bootstrap.Toast.getOrCreateInstance(toast).show()
}

function warning(title,message){
    document.getElementById ("toast").classList.remove("text-bg-success")
    document.getElementById ("toast").classList.remove("text-bg-danger")

    document.getElementById ("toast").classList.add("text-bg-warning")

    document.getElementById("toast-title").innerText = title

    document.getElementById("toast-body").innerText = message

    bootstrap.Toast.getOrCreateInstance(toast).show()
}




