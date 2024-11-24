const dropzone = document.getElementById('dropzone');
const startButton = document.getElementById('start');
const timerDisplay = document.getElementById('timer');
const bell = document.getElementById('bell'); // Seleccionar el audio
let blocks = [];
let currentBlockIndex = 0;
let timeLeft = 0;
let timerInterval;

// Hacer los bloques arrastrables
document.querySelectorAll('.block').forEach(block => {
  block.addEventListener('dragstart', e => {
    e.dataTransfer.setData('text/plain', block.outerHTML);
  });
});

// Permitir soltar en la zona
dropzone.addEventListener('dragover', e => {
  e.preventDefault();
});

dropzone.addEventListener('drop', e => {
  e.preventDefault();
  const blockHTML = e.dataTransfer.getData('text/plain');
  dropzone.innerHTML += blockHTML;
  updateBlocks();
});

// Actualizar la lista de bloques
function updateBlocks() {
  blocks = Array.from(dropzone.querySelectorAll('.block')).map(block => ({
    type: block.dataset.type,
    time: parseInt(block.querySelector('.time-input').value) * 60
  }));
}

// Iniciar temporizador
startButton.addEventListener('click', () => {
  if (blocks.length === 0) {
    alert('Por favor, añade bloques al plan.');
    return;
  }
  currentBlockIndex = 0;
  startNextBlock();
});

// Función para ejecutar cada bloque
function startNextBlock() {
  if (currentBlockIndex >= blocks.length) {
    clearInterval(timerInterval);
    alert('¡Plan completado!');
    return;
  }

  const currentBlock = blocks[currentBlockIndex];
  timeLeft = currentBlock.time;

  timerInterval = setInterval(() => {
    timeLeft--;
    updateTimerDisplay();

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      bell.play(); // Reproduce el sonido de la campana
      currentBlockIndex++;
      startNextBlock();
    }
  }, 1000);

  updateTimerDisplay();
}

function updateTimerDisplay() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds
    .toString()
    .padStart(2, '0')}`;
}


