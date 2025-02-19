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

$('#control-org').on('click', (event) =>{
    event.preventDefault()
    var url = '/orgs'
    $.ajax({
        url: url,
        type : 'POST',
        success : (data) => {
            if (data.notlogin){
                return warning('Cancelado','Você precisa estar logado para acessar essa página')
            }

            if (data.invalidlicense){
                return danger('Negado','Você precisa ter uma licença para acessar essa página')
            }

            if(data.noorganizations){
                return warning('Cancelado','Você não está em nenhuma organização')
            }

            if(data.status){
                console.log(data.noorganizations)
            }

        },        
        
        error : (err) => {
            console.error('Erro ao solicitar resposta na rota ' + url)   
            console.error(err)         
        }
    })
})

$('#create-game').on('click', () => {
    var gameType = document.getElementById('create-game-type')
    var gameName = document.getElementById('create-game-name')
    var gameDescription = document.getElementById('create-game-description')
    var gamePrivate = document.getElementById('create-game-private')
    var url = '/admin/create-game'
    var formData = new FormData()
    
    if(!(/[a-zA-Z]/).test(gameName.value)){
        return warning('Recusado','Digite um nome para o jogo')
    }

    formData.append('gameName', gameName.value)
    formData.append('gameType', gameType.value)
    formData.append('gameDescription', gameDescription.value)
    formData.append('gamePrivate', gamePrivate.checked)

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

            if(data.notorg){
                return warning('Recusado', 'Você não está em nenhuma organização')
            }

            if(data.status){
                gameName.value = null
                gameDescription.value = null
                gamePrivate.checked = false
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

$('#new-organization').on('click', (event) => {
    event.preventDefault()
})

$('#create-org').on('click', () =>{
    var orgName = document.getElementById('create-org-name')
    var logOrg = $('#org-logo')[0].files[0]
    var valid = true
    var url = '/admin/create-org'
    var formData = new FormData()


    orgName.classList.remove('is-invalid')

    if(!(/[a-zA-Z]/).test(orgName.value)){
        valid = false
        orgName.classList.add('is-invalid')
    }

    if(!valid){
        return danger('Negado','Nome da Organização inválido')
    }

    formData.append('orgName', orgName.value)
    formData.append('orgLogo', logOrg)

    $.ajax({
        url: url,
        type: 'POST',
        data: formData,
        contentType: false,
        processData: false,
        success: (data) =>{
            if(data.notlogin){
                orgName.value = null
                document.getElementById('org-logo').value = null
                return warning('Recusado','Você não está logado ou sua sessão expirou. Por favor, atualize novamente')
            }
        },
        error: (err) =>{
            console.error('Erro ao solicitar resposta na rota ' + url)
            console.error(err)
        }

    })

})
function viewscoreboard(){
    var buttons = document.querySelectorAll('[id^="buttons-scoreboard-view-"]')
    buttons.forEach((button) => {
        button.addEventListener('click', () => {
            var url = `/scoreboard/view/${button.dataset.id}`

            window.open(url, '_blank')
        })
    })
}

function controlscoreboard(){
    var buttons = document.querySelectorAll('[id^="buttons-scoreboard-control-"]')
    buttons.forEach((button) => {
        button.addEventListener('click', () => {
            var url = `/scoreboard/control/${button.dataset.id}`

            window.open(url, '_blank')
        })
    })
}


function loadgames(games){
    var html = ''
    
    games.forEach((game,i) =>{
        html += `
            <tr>
                <th>${game.id}</th>
                <td>${game.game_name}</td>
                <td>${game.type}</td>
                <td>${game.description}</td>
                <td class=" project-actions text-right">
                    <button id="buttons-scoreboard-view-${i}" data-id="${game.id}" class=" btn btn-sm btn-success">placar</button>
                    <button id="buttons-scoreboard-control-${i}" data-id="${game.id}" class="btn btn-sm btn-warning"> controle</button>
                </td>
            </tr>
        `
    })
    document.getElementById('table-body-games').innerHTML = html

    controlscoreboard()
    viewscoreboard()


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




