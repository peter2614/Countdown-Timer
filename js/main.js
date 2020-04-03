let countdown;
const timerDisplay = document.querySelector('.time-left');
const endTime = document.querySelector('.end-time');
const buttons = document.querySelectorAll('[data-time]');

function timer(seconds) {
    clearInterval(countdown);  // clear any existing timers
    const now = Date.now();
    const then = now + seconds * 1000;
    displayTimeLeft(seconds);
    displayEndTime(then);
    countdown = setInterval(() => {
        const secondsLeft = Math.round((then - Date.now()) / 1000);

        // check if we need to stop
        if(secondsLeft < 0) {
            clearInterval(countdown);
            document.getElementById('alarm').play();
            document.getElementById('alarm').loop = true;
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
    document.getElementById('alarm').pause();
    document.getElementById('alarm').currentTime = 0;
    const seconds = parseInt(this.dataset.time);
    timer(seconds);
}

buttons.forEach(button => button.addEventListener('click', startTimer));
document.customForm.addEventListener('submit', function(e) {
    e.preventDefault();
    document.getElementById('alarm').pause();
    document.getElementById('alarm').currentTime = 0;
    const mins = this.minutes.value;
    console.log(mins);
    timer(mins * 60);
    this.reset();
});
