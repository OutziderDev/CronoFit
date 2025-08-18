let workTime, restTime, rounds;
let isWorking = true;
let timer, remaining, currentRound = 1;
const max = 283;
const beep = new Audio("/assets/sounds/beep.mp3");

const modeEl = document.getElementById("mode");
const nextmode = document.querySelector('#n-mode');
const numRound = document.querySelector('#n-round');
const countdownEl = document.getElementById("countdown");
const circuloAmutar = document.querySelector("#aumCirculo");
const boxdialog = document.querySelector("#config-timer");

document.getElementById("startBtn").addEventListener("click", startTimer);
document.getElementById("pauseBtn").addEventListener("click", pauseTimer);
document.getElementById("resetBtn").addEventListener("click", resetTimer);

const btnSave = document.querySelector('#save-data').addEventListener('click', () => { 
  resetTimer();
  const min = String(Math.floor(parseInt(document.getElementById("workTime").value) / 60)).padStart(2, "0");
  const sec = String(parseInt(document.getElementById("workTime").value) % 60).padStart(2, "0");
  countdownEl.textContent = `${min}:${sec}`;
  numRound.textContent = `${currentRound}/${parseInt(document.getElementById("rounds").value)}`;
  boxdialog.close();
})

function startTimer() {
  workTime = parseInt(document.getElementById("workTime").value);
  restTime = parseInt(document.getElementById("restTime").value);
  rounds = parseInt(document.getElementById("rounds").value); 
  circuloAmutar.setAttribute("stroke-dashoffset",max)
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
  //Cargar la barra
  updateBar();

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
      circuloAmutar.setAttribute("stroke-dashoffset",max);
      modeEl.textContent = "Descanso";
    } else {
      isWorking = true;
      currentRound++;
      if (currentRound > rounds) {
        resetTimer();
        modeEl.style.color = 'var(--verdoso)';
        modeEl.textContent = "¡Completado!";
        nextmode.textContent = "¡Fin!"
        circuloAmutar.setAttribute('stroke', `var(--verdoso)`)
        return;
      }
      remaining = workTime;
      modeEl.textContent = "Trabajo";
    }
  }

  updateDisplay();
}

function updateDisplay() {
  /* modeEl.textContent = isWorking ? `Trabajo` : `Descanso`; */
  if (isWorking) {
    modeEl.style.color = 'var(--verdoso)';
    modeEl.textContent = `Trabajo`;
  }else {
    modeEl.style.color = 'var(--amarillo)';
    modeEl.textContent =`Descanso`;
  }
  nextmode.textContent = isWorking ? `Descanso` : `Trabajo`;
  numRound.textContent =  `${currentRound}/${rounds}`;
  
  const min = String(Math.floor(remaining / 60)).padStart(2, "0");
  const sec = String(remaining % 60).padStart(2, "0");
  countdownEl.textContent = `${min}:${sec}`;
}

function updateBar() {
  const total = isWorking ? workTime : restTime;
  const tiempoEnCurso = total - remaining;
  const progreso = (tiempoEnCurso / total) * max;
  const avanceFinal = max - progreso;
  const barcolor= isWorking ? `var(--verdoso)` : `var(--amarillo)`;
  circuloAmutar.setAttribute('stroke', barcolor);
  circuloAmutar.setAttribute("stroke-dashoffset",avanceFinal)
}


/* BOTON DIALOG */
const btnDialog = document.querySelector('#show-dialog');
btnDialog.addEventListener('click', () => {
  boxdialog.showModal();
})