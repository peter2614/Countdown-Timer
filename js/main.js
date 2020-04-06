let countdown;
const timerDisplay = document.querySelector('.time-left');
const endTime = document.querySelector('.end-time');
const buttons = document.querySelectorAll('[data-time]');
const player = document.getElementById('player');
const btns = document.getElementById('btns');
const pause = document.getElementsByClassName('pause')[0];
const stop = document.getElementsByClassName('stop')[0];
const displayTime = document.getElementsByClassName('display')[0];
let isPaused = false;
let seconds_left;

function timer(seconds) {
    displayTime.style.display = 'flex';
    btns.style.display = 'flex';
    seconds_left = seconds;
    
    clearInterval(countdown);  // clear any existing timers

    const now = Date.now();
    const then = now + seconds * 1000;

    displayTimeLeft(seconds);
    displayEndTime(then);
    countdown = setInterval(() => {
        const secondsLeft = Math.round((then - Date.now()) / 1000);
        seconds_left = secondsLeft;

        // check if we need to stop
        if(secondsLeft < 0) {
            clearInterval(countdown);
            randomSound();
            return;
        }
        displayTimeLeft(secondsLeft);  // display time
    }, 1000);       
}

function displayTimeLeft(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainderSeconds = seconds % 60;
    const display = `${minutes}:${remainderSeconds < 10 ? '0' : '' }${remainderSeconds}`;
    document.title = display;
    timerDisplay.textContent = display;
}

function displayEndTime(timestamp) {
    const end = new Date(timestamp);
    const hour = end.getHours();
    const adjustedHour = hour > 12 ? hour - 12 : hour;
    const minutes = end.getMinutes();
    endTime.textContent = `Be Back At ${adjustedHour}:${minutes < 10 ? '0' : ''}${minutes}`;
}

function startTimer() {
    resetAlarm();
    const seconds = parseInt(this.dataset.time);
    timer(seconds);
}

function randomSound(){
    var rand = [
        'sound/alarm1.mp3',
        'sound/alarm2.mp3',
        'sound/alarm3.mp3',
        'sound/alarm4.mp3',
        'sound/alarm5.mp3',
        'sound/alarm6.mp3',
        'sound/alarm7.mp3',
        'sound/alarm8.mp3',
        'sound/alarm9.mp3',
        'sound/alarm10.mp3',
        'sound/alarm11.mp3',
        'sound/alarm12.mp3',
        'sound/alarm13.mp3',
        'sound/alarm14.mp3',
        'sound/alarm15.mp3',
        'sound/alarm16.mp3',
        'sound/alarm17.mp3',
        'sound/alarm18.mp3',
        'sound/alarm19.mp3',
        'sound/alarm20.mp3',
        'sound/alarm21.mp3',
        'sound/alarm22.mp3',
        'sound/alarm23.mp3'
    ];

    var randSound = rand[Math.floor(Math.random() * rand.length)];
    
    // var player=document.getElementById('player');
    var source=document.getElementById('source');

    source.src = randSound;
    
   player.load();
   player.play();
}

function resetAlarm() {
    player.pause();
    player.currentTime = 0;
}

buttons.forEach(button => button.addEventListener('click', startTimer));
document.customForm.addEventListener('submit', function(e) {
    e.preventDefault();
    resetAlarm();
    const mins = this.minutes.value;
    timer(mins * 60);
    this.reset();
});

// Pause/Resume timer when pause is clicked
pause.addEventListener('click', () => {
    isPaused = !isPaused;
    if(isPaused) {
        pause.innerHTML = 'Resume';
        clearInterval(countdown);
    }
    else {
        pause.innerHTML = 'Pause';
        timer(seconds_left);
    }
});

stop.addEventListener('click', () => {
    displayTime.style.display = 'none';
    resetAlarm();
    clearInterval(countdown);  // clear any existing timers
    document.title = 'Countdown Timer';
});

