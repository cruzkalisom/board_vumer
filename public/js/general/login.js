var alert = document.getElementById('alert')

$("#button-submit").on('click', (event) => {
    event.preventDefault()

    alert.hidden = true

    var email = document.getElementById('email')
    var password = document.getElementById('password')
    var remember = document.getElementById('remember')

    email.classList.remove('is-invalid')
    password.classList.remove('is-invalid')

    var auth = true
    var message = ''

    if(password.value.length == 0){
        password.classList.add('is-invalid')
        auth = false
        message = 'Senha Inválida'
    }

    if(!(/^[^\s@]+@[^\s@]+\.[^\s@]+$/).test(email.value)){
        email.classList.add('is-invalid')
        auth = false
        message = 'E-mail inválido'
    }

    if(!auth){
        return alerta(message) 
    }

    var formData = new FormData()
    var url = '/login'

    formData.append('email', email.value)
    formData.append('password', password.value)
    formData.append('remember', remember.checked)

    $.ajax({
        url: url,
        method: 'POST',
        data: formData,
        contentType: false,
        processData: false,
        success: (data) => {
            if(data.invalid){
                alerta('E-mail ou senha inválidos')
            }

            if(data.invalidEmail){
                alerta('E-mail inválido')
            }   

            if(data.invalidPassword){
                alerta('Senha inválida')
            }
            
            if(data.status){
                location.href = data.oldpage
            }    
        },
        error: (err) => {
            console.error('Erro ao solicitar resposta na rota ' + url)
            console.error(err)
        }
    })
})

function alerta (message){
    alert.innerHTML = `
        <div class="alert alert-danger alert-dimissible" role="alert">
            <div>${message}</div>
        </div>
    `

    alert.hidden = false
}