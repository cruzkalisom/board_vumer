var urlcontrolscoreboard = '/scoreboard/control'
var timer = 90 * 60; // 90 minutes in seconds
var isRunning = false
var timerId = null

const socket = io()

$.ajax ({
    url : urlcontrolscoreboard,
    type : 'post',
    success : (data) =>{
       
    },
    error : (err)=>{
        console.err('erro ao solicitar resposta na rota ' +url)
        console.error(err)
    }
      
})

$('#point-more-1').on('click', ()=>{
    socket.emit ('point-more-1')
})

$('#point-more-2').on('click', ()=>{
    socket.emit ('point-more-2')
})

$('#point-less-1').on('click', ()=>{
    socket.emit ('point-less-1')
})

$('#point-less-2').on('click', ()=>{
    socket.emit ('point-less-2')
})

$('#start-pause').on('click', ()=> {
    var startPause = document.getElementById('start-pause')

    if(isRunning){
        startPause.innerHTML = '<i class="fa-solid fa-play"></i>'
        isRunning = false
        clearInterval(timerId)
    } else{
        isRunning = true
        startTimer()
        startPause.innerHTML = '<i class="fa-solid fa-pause"></i>'
        
    }

    
})

function startTimer(){
    if (isRunning){
        timerId = setInterval(() => {
            timer -= 1
            document.getElementById('timer').innerHTML = formatTime(timer)
            socket.emit('updatetimer',timer)
        },1000)


    }

}

function formatTime(timer){ 
    if (timer < 60){
        return `00:${String(timer).padStart(2, '0')}`
    }
    
    const minutes = Math.floor(timer / 60)

    const seconds = timer % 60

    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
}

    

 // iniciar o timer

/* let scores = {
    team1: 0,
    team2: 0
};

// Timer variables
let timeLeft = 12 * 60; // 12 minutes in seconds
let timerId = null;
let isRunning = false;

function updateScore(team, points) {
    const teamKey = `team${team}`;
    scores[teamKey] += points;
    
    // Prevent negative scores
    if (scores[teamKey] < 0) scores[teamKey] = 0;
    
    document.getElementById(`score${team}`).textContent = scores[teamKey];
    updateStatus();
}

function updateStatus() {
    const statusElement = document.getElementById('status');
    const scoreDiff = Math.abs(scores.team1 - scores.team2);
    
    if (scoreDiff > 20) {
        statusElement.textContent = 'Blowout Game!';
    } else if (scoreDiff > 10) {
        statusElement.textContent = 'Comfortable Lead';
    } else if (scoreDiff > 5) {
        statusElement.textContent = 'Close Game';
    } else if (scoreDiff > 0) {
        statusElement.textContent = 'Very Close Game!';
    } else {
        statusElement.textContent = 'Tied Game!';
    }
}

function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

function updateTimer() {
    if (timeLeft > 0) {
        timeLeft--;
        document.getElementById('timer').textContent = formatTime(timeLeft);
    } else {
        pauseTimer();
        document.getElementById('status').textContent = 'Game Over!';
    }
}

function startTimer() {
    if (!isRunning && timeLeft > 0) {
        isRunning = true;
        timerId = setInterval(updateTimer, 1000);
    }
}

function pauseTimer() {
    isRunning = false;
    clearInterval(timerId);
}

function resetTimer() {
    pauseTimer();
    timeLeft = 12 * 60;
    document.getElementById('timer').textContent = formatTime(timeLeft);
    document.getElementById('status').textContent = 'Game in Progress';
} */



