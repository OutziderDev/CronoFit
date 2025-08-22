/* Variables Generales */
const beep = new Audio("/assets/sounds/beep.mp3");
let workTime, restTime, rounds;
let isWorking = true;
let timer = null;
let remaining = 0;
let currentRound = 1;
const max = 283;

/* Variables de Display */
const countdownEl = document.getElementById("countdown");
const modeEl = document.getElementById("mode");
const nextmode = document.querySelector('#n-mode');
const numRound = document.querySelector('#n-round');
const circuloAmutar = document.querySelector("#aumCirculo");

/* Variables de botones */
const btnStart = document.getElementById("startBtn");
const btnPause = document.getElementById("pauseBtn");
const btnReset = document.getElementById("resetBtn");

btnStart.addEventListener("click", startTimer);
btnPause.addEventListener("click", pauseTimer);
btnReset.addEventListener("click", resetTimer);

function startTimer() {
    
  if ( remaining === 0) {
    workTime = parseInt(document.getElementById("inpWorkTime").value);
    restTime = parseInt(document.getElementById("inpRestTime").value);
    rounds = parseInt(document.getElementById("iptRounds").value); 
    remaining = isWorking ? workTime : restTime;  
    circuloAmutar.setAttribute("stroke-dashoffset", max);
    beep.play();
  }

  if (!timer) {
    timer = setInterval(tick, 1000);
  }

  btnStart.style.display = ("none");
  btnPause.classList.remove("hidden");
}

function pauseTimer() {
  clearInterval(timer);
  timer = null;
  btnStart.style.display = ("flex");
  btnPause.classList.add("hidden");
}

function resetTimer() {
  pauseTimer();
  isWorking = true;
  currentRound = 1;
  remaining = 0;
  modeEl.textContent = "Listo";
  countdownEl.textContent = "00:00";
  circuloAmutar.setAttribute("stroke-dashoffset",max);
}

function tick() {
  remaining--;
  //Cargar la barra
  updateBar();

  // Aviso previo de 5 segundos
  if (remaining === 3 || remaining === 2 || remaining === 1) {
    beep.play();
   }

  if (remaining <= 0) {
    beep.play();
     
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

// ------------- EVENTOS BOTONES COMPLEMENTARIOS---------------- //
  
/* BOTON ACTUALIZAR DISPLAY*/
const btnSave = document.querySelector('#save-data').addEventListener('click', () => { 
  resetTimer();
  const min = String(Math.floor(parseInt(document.getElementById("inpWorkTime").value) / 60)).padStart(2, "0");
  const sec = String(parseInt(document.getElementById("inpWorkTime").value) % 60).padStart(2, "0");
  countdownEl.textContent = `${min}:${sec}`;
  numRound.textContent = `${currentRound}/${parseInt(document.getElementById("iptRounds").value)}`;
  document.querySelector("#dialog-timer").close();
})