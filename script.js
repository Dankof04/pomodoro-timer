let workTime = 25;
let shortBreak = 5;
let longBreak = 15;
let cycles = 4;

const modeDisplay = document.getElementById('mode');
const timeDisplay = document.getElementById('time');
const startButton = document.getElementById('start');

let currentMode = 'Work';
let currentCycle = 0;
let timeLeft;
let timerInterval;

startButton.addEventListener('click', () => {
  workTime = parseInt(document.getElementById('workTime').value) * 60;
  shortBreak = parseInt(document.getElementById('shortBreak').value) * 60;
  longBreak = parseInt(document.getElementById('longBreak').value) * 60;
  cycles = parseInt(document.getElementById('cycles').value);

  currentMode = 'Work';
  currentCycle = 0;
  timeLeft = workTime;

  updateDisplay();
  startTimer();
});

function startTimer() {
  clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    timeLeft--;
    updateDisplay();

    if (timeLeft <= 0) {
      switchMode();
    }
  }, 1000);
}

function switchMode() {
  if (currentMode === 'Work') {
    currentCycle++;
    if (currentCycle % cycles === 0) {
      currentMode = 'Long Break';
      timeLeft = longBreak;
    } else {
      currentMode = 'Short Break';
      timeLeft = shortBreak;
    }
  } else {
    currentMode = 'Work';
    timeLeft = workTime;
  }
  updateDisplay();
}

function updateDisplay() {
  modeDisplay.textContent = currentMode;
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  timeDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds
    .toString()
    .padStart(2, '0')}`;
}
