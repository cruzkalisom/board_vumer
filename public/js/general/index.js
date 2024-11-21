var urlIndex = '/'

$.ajax({
    url: urlIndex,
    type: 'POST',
    success: (data) => {
        if(data.notlogin){
            document.getElementById('nav-user').hidden = true
            document.getElementById('buttons-users').hidden = false 
            return 
        }
        if(data.status){
            document.getElementById('nav-username').innerText = data.infoUser.name
            document.getElementById('nav-user').hidden = false
            document.getElementById('buttons-users').hidden = true
        }
    },
    error: (err) => {
        console.error('ERRO AO SOLICITAR RESPOSTA NA ROTA ' + urlIndex)
        console.error (err)
    }
})

$('#button-register').on('click', () => {
    location.href = '/register'
})

$('#button-login').on('click', () => {
    location.href = '/login'
})


