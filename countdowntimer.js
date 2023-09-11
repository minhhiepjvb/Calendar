const timer = document.getElementById("timer");
const startResetButton = document.getElementById("start-stop-button");
const addTimeButton = document.getElementById("add-time-button");
const subtractTimeButton = document.getElementById("subtract-time-button");
const focustext = document.getElementById('focus-text')

let countdown;
let minutes = 25;
let seconds = 0;
let isRunning = false;

// Update time
function updateTimer() {
    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(seconds).padStart(2, "0");
    timer.textContent = `${formattedMinutes}:${formattedSeconds}`;
}

// Set countdown
function startOrResetCountdown() {
    if (!isRunning) {
        minutes = 25;
        seconds = 0;
        updateTimer();
        countdown = setInterval(function () {
            if (minutes === 0 && seconds === 0) {
                clearInterval(countdown);
                startResetButton.textContent = "Start";
            } else {
                if (seconds === 0) {
                    minutes--;
                    seconds = 59;
                } else {
                    seconds--;
                }
                updateTimer();
            }
        }, 1000);
        focustext.textContent = "End session";
    } else {
        clearInterval(countdown);
        minutes = 25;
        seconds = 0;
        updateTimer();
        focustext.textContent = "Focus";
    }
    isRunning = !isRunning;
}

//  "Start/Reset" event
startResetButton.addEventListener("click", startOrResetCountdown);

// add time
addTimeButton.addEventListener("click", function () {
    if (!isRunning) {
        minutes++;
        updateTimer();
    }
});

// substrct time
subtractTimeButton.addEventListener("click", function () {
    if (!isRunning && minutes > 0) {
        minutes--;
        updateTimer();
    }
});

// update time
updateTimer();