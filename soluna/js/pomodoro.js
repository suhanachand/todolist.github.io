let minutes = 25;
let seconds = 0;
let interval;

const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');
const startBtn = document.getElementById('start-btn');
const resetBtn = document.getElementById('reset-btn');

function updateDisplay() {
    minutesEl.textContent = String(minutes).padStart(2, '0');
    secondsEl.textContent = String(seconds).padStart(2, '0');
}

function tick() {
    if (seconds === 0) {
        if (minutes === 0) {
            clearInterval(interval);
            alert("Pomodoro Finished!");
            return;
        }
        minutes--;
        seconds = 59;
    } else {
        seconds--;
    }
    updateDisplay();
}

startBtn.addEventListener('click', () => {
    clearInterval(interval);
    interval = setInterval(tick, 1000);
});

resetBtn.addEventListener('click', () => {
    clearInterval(interval);
    minutes = 25;
    seconds = 0;
    updateDisplay();
});
