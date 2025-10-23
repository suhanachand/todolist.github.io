let pomTime = 25 * 60;
let pomInterval;
let sessions = 0;

const display = document.getElementById("pomDisplay");
const startBtn = document.getElementById("pomStart");
const pauseBtn = document.getElementById("pomPause");
const resetBtn = document.getElementById("pomReset");
const sessionsEl = document.getElementById("pomSessions");

function updateDisplay() {
  const m = Math.floor(pomTime / 60).toString().padStart(2, "0");
  const s = (pomTime % 60).toString().padStart(2, "0");
  display.textContent = `${m}:${s}`;
}

startBtn.onclick = () => {
  clearInterval(pomInterval);
  pomInterval = setInterval(() => {
    if (pomTime <= 0) {
      clearInterval(pomInterval);
      sessions++;
      sessionsEl.textContent = sessions;
      pomTime = 25 * 60;
      updateDisplay();
      alert("Pomodoro complete!");
    } else {
      pomTime--;
      updateDisplay();
    }
  }, 1000);
};

pauseBtn.onclick = () => clearInterval(pomInterval);

resetBtn.onclick = () => {
  clearInterval(pomInterval);
  pomTime = 25 * 60;
  updateDisplay();
};
updateDisplay();
