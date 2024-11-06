let clickCount = 0;
let timer;
let timeLeft;
let isTesting = false;
let selectedTime = 5;

const startButton = document.getElementById('startButton');
const resetButton = document.getElementById('resetButton');
const clickArea = document.getElementById('clickArea');
const result = document.getElementById('result');
const timerDisplay = document.getElementById('timer');
const timeSelect = document.getElementById('timeSelect');

// Set initial time based on the select option
timeSelect.addEventListener('change', () => {
    selectedTime = parseInt(timeSelect.value);
});

startButton.addEventListener('click', startTest);
resetButton.addEventListener('click', resetTest);
clickArea.addEventListener('click', countClick);

function startTest() {
    if (isTesting) return;
    isTesting = true;
    clickCount = 0;
    timeLeft = selectedTime;
    result.textContent = 'CPS: 0';
    timerDisplay.textContent = `Time: ${timeLeft}s`;
    resetButton.style.display = 'none';
    startButton.textContent = 'Test Running...';
    clickArea.textContent = 'Click Here';

    timer = setInterval(updateTimer, 1000);
}

function updateTimer() {
    timeLeft--;
    timerDisplay.textContent = `Time: ${timeLeft}s`;

    if (timeLeft <= 0) {
        clearInterval(timer);
        endTest();
    }
}

function countClick() {
    if (isTesting) {
        clickCount++;
        const cps = (clickCount / (selectedTime - timeLeft + 1)).toFixed(2);
        result.textContent = `CPS: ${cps}`;
    }
}

function endTest() {
    isTesting = false;
    startButton.textContent = 'Start Test';
    resetButton.style.display = 'inline-block';
    clickArea.textContent = 'Test Complete!';
}

function resetTest() {
    clickCount = 0;
    result.textContent = 'CPS: 0';
    timerDisplay.textContent = 'Time: 0s';
    selectedTime = 5;
    timeSelect.value = '5';
    resetButton.style.display = 'none';
    clickArea.textContent = 'Click Here';
}
