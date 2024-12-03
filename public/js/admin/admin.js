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