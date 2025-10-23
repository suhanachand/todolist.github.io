let steps = [];
let currentStep = 0;
let routineInterval;

const stepName = document.getElementById("stepName");
const stepDuration = document.getElementById("stepDuration");
const routineList = document.getElementById("routineList");
const routinePlayer = document.getElementById("routinePlayer");
const currentStepEl = document.getElementById("currentStep");
const routineTimer = document.getElementById("routineTimer");
const routineProgress = document.getElementById("routineProgress");
const startRoutineBtn = document.getElementById("startRoutine");
const completeStepBtn = document.getElementById("completeStep");

function renderSteps() {
  routineList.innerHTML = "";
  steps.forEach((s, i) => {
    const li = document.createElement("li");
    li.textContent = `${s.name} - ${s.duration} min`;
    routineList.appendChild(li);
  });
}

document.getElementById("addStep").onclick = () => {
  if (!stepName.value || !stepDuration.value) return;
  steps.push({ name: stepName.value, duration: parseInt(stepDuration.value) });
  stepName.value = "";
  stepDuration.value = "";
  renderSteps();
};

startRoutineBtn.onclick = () => {
  if (steps.length === 0) return;
  currentStep = 0;
  routinePlayer.style.display = "block";
  startStep();
};

function startStep() {
  if (currentStep >= steps.length) {
    routinePlayer.style.display = "none";
    alert("Routine complete!");
    return;
  }
  let time = steps[currentStep].duration * 60;
  currentStepEl.textContent = steps[currentStep].name;
  routineTimer.textContent = `${steps[currentStep].duration}:00`;
  routineProgress.value = 0;
  clearInterval(routineInterval);
  routineInterval = setInterval(() => {
    if (time <= 0) {
      clearInterval(routineInterval);
      alert("Time's up! Complete the task to move on.");
    } else {
      time--;
      const m = Math.floor(time / 60).toString().padStart(2, "0");
      const s = (time % 60).toString().padStart(2, "0");
      routineTimer.textContent = `${m}:${s}`;
      routineProgress.value = ((steps[currentStep].duration*60 - time)/(steps[currentStep].duration*60))*100;
    }
  }, 1000);
}

completeStepBtn.onclick = () => {
  clearInterval(routineInterval);
  currentStep++;
  startStep();
};
