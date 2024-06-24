const watch = document.querySelector('#watch');
const lapsContainer = document.querySelector('#laps');
let milliseconds = 0;
let timer;
let laps = [];

function startWatch() {
    watch.classList.remove('paused');
    clearInterval(timer);
    timer = setInterval(() => {
        milliseconds += 10;
        let dateTimer = new Date(milliseconds);
        watch.innerHTML =
            ('0' + dateTimer.getUTCHours()).slice(-2) + ':' +
            ('0' + dateTimer.getUTCMinutes()).slice(-2) + ':' +
            ('0' + dateTimer.getUTCSeconds()).slice(-2) + ':' +
            ('0' + dateTimer.getUTCMilliseconds()).slice(-3, -1);
    }, 10);
}

function pauseWatch() {
    watch.classList.add('paused');
    clearInterval(timer);
}

function resetWatch() {
    watch.classList.remove('paused');
    clearInterval(timer);
    milliseconds = 0;
    laps = [];
    watch.innerHTML = '00:00:00:00';
    lapsContainer.innerHTML = '';  // Clear the laps display
}

function recordLap() {
    let dateTimer = new Date(milliseconds);
    let lapTime =
        ('0' + dateTimer.getUTCHours()).slice(-2) + ':' +
        ('0' + dateTimer.getUTCMinutes()).slice(-2) + ':' +
        ('0' + dateTimer.getUTCSeconds()).slice(-2) + ':' +
        ('0' + dateTimer.getUTCMilliseconds()).slice(-3, -1);
    laps.push(lapTime);
    console.log('Lap recorded:', lapTime);  // Log lap time
    displayLaps();
}

function displayLaps() {
    console.log('Displaying laps:', laps);  // Log laps array
    lapsContainer.innerHTML = laps.map((lap, index) => `<div>Lap ${index + 1}: ${lap}</div>`).join('');
}

document.addEventListener('click', (e) => {
    const el = e.target;
    if (el.id === 'start') startWatch();
    if (el.id === 'pause') pauseWatch();
    if (el.id === 'reset') resetWatch();
    if (el.id === 'lap') recordLap();
});
