document.addEventListener("DOMContentLoaded", () => {
    document.body.className = "dark";
    const timeDisplay = document.getElementById("time");
    const dateDisplay = document.getElementById("date");
    const alarmInput = document.getElementById("alarm-time");
    const setAlarmBtn = document.getElementById("set-alarm");
    const clearAlarmBtn = document.getElementById("clear-alarm");
    const themeSelector = document.getElementById("theme-selector");
    const alarmList = document.getElementById("alarm-list");
    let alarms = [];
    function renderAlarmList() {
        alarmList.innerHTML = "";
        alarms.forEach((alarm, index) => {
            const li = document.createElement("li");
            li.textContent = alarm;
            li.addEventListener("click", () => {
                deleteAlarm(index);
            });
            alarmList.appendChild(li);
        });
    }
    function deleteAlarm(index) {
        alarms.splice(index, 1);
        renderAlarmList();
    }
    function updateClock() {
        let now = new Date();
        let hours = now.getHours();
        let minutes = now.getMinutes();
        let seconds = now.getSeconds();
        hours = hours.toString().padStart(2, "0");
        minutes = minutes.toString().padStart(2, "0");
        seconds = seconds.toString().padStart(2, "0");
        timeDisplay.textContent = `${hours}:${minutes}:${seconds}`;
        dateDisplay.textContent = now.toDateString();
        if (alarms.includes(`${hours}:${minutes}`)) {
            timeDisplay.classList.add("shaking");
            alarms = alarms.filter(time => time !== `${hours}:${minutes}`);
            renderAlarmList();
            setTimeout(() => {
                timeDisplay.classList.remove("shaking");
            }, 5000);
        }
    }
    setInterval(updateClock, 1000);
    updateClock();
    setAlarmBtn.addEventListener("click", () => {
        if (!alarmInput.value) {
            alert("Please enter a valid alarm time.");
            return;
        }
        if (!alarms.includes(alarmInput.value)) {
            alarms.push(alarmInput.value);
            renderAlarmList();
        }
        alert(`✅ Alarm set for ${alarmInput.value}`);
    });
    clearAlarmBtn.addEventListener("click", () => {
        alarms = [];
        renderAlarmList();
        alert("❌ All alarms cleared.");
    });
    let stopwatchTime = 0, stopwatchInterval;
    const stopwatchDisplay = document.getElementById("stopwatch-display");
    const startStopwatchBtn = document.getElementById("start-stopwatch");
    const pauseStopwatchBtn = document.getElementById("pause-stopwatch");
    const resetStopwatchBtn = document.getElementById("reset-stopwatch");
    function updateStopwatch() {
        let hours = Math.floor(stopwatchTime / 3600);
        let minutes = Math.floor((stopwatchTime % 3600) / 60);
        let seconds = stopwatchTime % 60;
        stopwatchDisplay.textContent = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    }
    startStopwatchBtn.addEventListener("click", () => {
        if (!stopwatchInterval) {
            stopwatchInterval = setInterval(() => {
                stopwatchTime++;
                updateStopwatch();
            }, 1000);
        }
    });
    pauseStopwatchBtn.addEventListener("click", () => {
        clearInterval(stopwatchInterval);
        stopwatchInterval = null;
    });
    resetStopwatchBtn.addEventListener("click", () => {
        clearInterval(stopwatchInterval);
        stopwatchInterval = null;
        stopwatchTime = 0;
        updateStopwatch();
    });
    let countdownTime = 0, countdownInterval;
    const countdownInput = document.getElementById("countdown-input");
    const countdownDisplay = document.getElementById("countdown-display");
    const startCountdownBtn = document.getElementById("start-timer");
    startCountdownBtn.addEventListener("click", () => {
        countdownTime = parseInt(countdownInput.value, 10);
        if (isNaN(countdownTime) || countdownTime <= 0) {
            alert("Enter a valid time in seconds.");
            return;
        }
        clearInterval(countdownInterval);
        countdownInterval = setInterval(() => {
            countdownTime--;
            let minutes = Math.floor(countdownTime / 60);
            let seconds = countdownTime % 60;
            countdownDisplay.textContent = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
            if (countdownTime <= 0) {
                clearInterval(countdownInterval);
                alert("⏳ Time's up!");
            }
        }, 1000);
    });
    themeSelector.addEventListener("change", () => {
        document.body.className = themeSelector.value;
    });
});
