let workTime, restTime, rounds;
let isWorking = true;
let timer, remaining, currentRound = 1;
const beep = new Audio("/assets/sounds/beep.mp3");

const modeEl = document.getElementById("mode");
const countdownEl = document.getElementById("countdown");

document.getElementById("startBtn").addEventListener("click", startTimer);
document.getElementById("pauseBtn").addEventListener("click", pauseTimer);
document.getElementById("resetBtn").addEventListener("click", resetTimer);

function startTimer() {
  workTime = parseInt(document.getElementById("workTime").value);
  restTime = parseInt(document.getElementById("restTime").value);
  rounds = parseInt(document.getElementById("rounds").value);
  remaining = isWorking ? workTime : restTime;
  beep.play();
  
  if (!timer) {
    updateDisplay();
    timer = setInterval(tick, 1000);
  }
}

function pauseTimer() {
  clearInterval(timer);
  timer = null;
}

function resetTimer() {
  pauseTimer();
  isWorking = true;
  currentRound = 1;
  modeEl.textContent = "Listo";
  countdownEl.textContent = "00:00";
}

function tick() {
  remaining--;

  // Aviso previo de 5 segundos
  if (remaining === 5) {
    beep.play();
    if (navigator.vibrate) navigator.vibrate(500);
  }

  if (remaining <= 0) {
    beep.play();
    if (navigator.vibrate) navigator.vibrate([300, 200, 300]);
    if (isWorking) {
      isWorking = false;
      remaining = restTime;
      modeEl.textContent = "Descanso";
    } else {
      isWorking = true;
      currentRound++;
      if (currentRound > rounds) {
        resetTimer();
        modeEl.textContent = "¡Completado!";
        return;
      }
      remaining = workTime;
      modeEl.textContent = "Trabajo";
    }
  }

  updateDisplay();
}

function updateDisplay() {
  modeEl.textContent = isWorking ? `Trabajo (${currentRound}/${rounds})` : `Descanso (${currentRound}/${rounds})`;
  const min = String(Math.floor(remaining / 60)).padStart(2, "0");
  const sec = String(remaining % 60).padStart(2, "0");
  countdownEl.textContent = `${min}:${sec}`;
}
