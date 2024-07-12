document.addEventListener("DOMContentLoaded", function() {
    let startTime;
    let elapsedTime = 0;
    let timerInterval;
    let running = false;
    const display = document.getElementById('display');
    const startPauseButton = document.getElementById('startPause');
    const resetButton = document.getElementById('reset');
    const lapButton = document.getElementById('lap');
    const laps = document.getElementById('laps');

    function timeToString(time) {
        let diffInHrs = time / 3600000;
        let hh = Math.floor(diffInHrs);

        let diffInMin = (diffInHrs - hh) * 60;
        let mm = Math.floor(diffInMin);

        let diffInSec = (diffInMin - mm) * 60;
        let ss = Math.floor(diffInSec);

        let diffInMs = (diffInSec - ss) * 1000;
        let ms = Math.floor(diffInMs);

        let formattedHH = hh.toString().padStart(2, '0');
        let formattedMM = mm.toString().padStart(2, '0');
        let formattedSS = ss.toString().padStart(2, '0');
        let formattedMS = ms.toString().padStart(3, '0');

        return `${formattedHH}:${formattedMM}:${formattedSS}.${formattedMS}`;
    }

    function print(txt) {
        display.innerHTML = txt;
    }

    function start() {
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(function printTime() {
            elapsedTime = Date.now() - startTime;
            print(timeToString(elapsedTime));
        }, 10);
        showButton('PAUSE');
    }

    function pause() {
        clearInterval(timerInterval);
        showButton('PLAY');
    }

    function reset() {
        clearInterval(timerInterval);
        print("00:00:00.000");
        elapsedTime = 0;
        laps.innerHTML = '';
        showButton('PLAY');
    }

    function lap() {
        let li = document.createElement("li");
        li.innerHTML = timeToString(elapsedTime);
        laps.appendChild(li);
    }

    function showButton(buttonKey) {
        if (buttonKey === 'PLAY') {
            startPauseButton.innerHTML = 'Start';
        } else {
            startPauseButton.innerHTML = 'Pause';
        }
    }

    startPauseButton.addEventListener('click', function() {
        if (!running) {
            start();
            running = true;
        } else {
            pause();
            running = false;
        }
    });

    resetButton.addEventListener('click', reset);
    lapButton.addEventListener('click', lap);
});
