$('#button-submit').on('click', (event) => {
    event.preventDefault()
    var name = document.getElementById('name')
    var surname = document.getElementById('surname')
    var email = document.getElementById('email')
    var password = document.getElementById('password')
    var confirmPassword = document.getElementById('confirm-password')
    var terms = document.getElementById('agreeTerms').checked

    var formData = new FormData()

    name.classList.remove('is-invalid')
    surname.classList.remove('is-invalid')
    email.classList.remove('is-invalid')
    password.classList.remove('is-invalid')
    confirmPassword.classList.remove('is-invalid')

    var auth = true
    var message = ''

    if(!terms){
        message = 'Aceite os termos para registrar'
        auth = false
    }

    if(confirmPassword.value !== password.value){
        password.classList.add('is-invalid')
        confirmPassword.classList.add('is-invalid')
        message = 'Senhas divergentes'
        auth = false
    }

    if(password.value.length == 0){
        password.classList.add('is-invalid')
        message = 'Digite uma senha válida'
        auth = false
    }

    if(!(/^[a-zA-Z0-9@#$%^&*\-_+={}[\]:;<>,.?~\\/()]+$/).test(email.value)){
        email.classList.add('is-invalid')
        message = 'Digite um e-mail válido'
        auth = false
    }

    if(!(/[a-zA-Z]/).test(surname.value)){
        surname.classList.add('is-invalid')
        message = 'Digite um sobrenome válido'
        auth = false
    }

    if(!(/[a-zA-Z]/).test(name.value)){
        name.classList.add('is-invalid')
        message = 'Digite um nome válido'
        auth = false
    }
    
    if(!auth){
        return alerta(message)
    }

    formData.append('name', name.value)
    formData.append('surname', surname.value)
    formData.append('email', email.value)
    formData.append('password', password.value)

    var url = '/register'

    $.ajax({
        url: url,
        method: 'POST',
        data: formData,
        contentType: false,
        processData: false,
        success: (data) => {
            alerta(data.status)
        },
        error: (err) => {
            console.error('Erro ao solicitar resposta na rota ' + url)
            console.log(err)
        }
    })
})

function alerta(message){
    var alert = document.getElementById('alert')

    alert.innerHTML = `
        <div class="alert alert-danger" role="alert">
            <div>${message}</div>
        </div>
    `
}