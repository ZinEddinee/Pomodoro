function toggleMenu() {
    document.querySelector('.nav-links').classList.toggle('open');
}

let pomodoro = document.getElementById("pomodoro-timer")
let short = document.getElementById("short-timer")
let long = document.getElementById("long-timer")
let timers = document.querySelectorAll(".timer-display")
let session = document.getElementById("pomodoro-session")
let shortBreak = document.getElementById("short-break")
let longBreak = document.getElementById("long-break")
let startBtn = document.getElementById("start")
let stopBtn = document.getElementById("stop")
let timerMsg = document.getElementById("timer-message")
let increaseBtn = document.getElementById("increase-time")
let decreaseBtn = document.getElementById("decrease-time")

let currentTimer = pomodoro
let myInterval = null
let remainingTime = 25 * 60 * 1000 // default 25 min
let isPaused = false

function hideAll() {
    timers.forEach((timer) => (timer.style.display = "none"))
}

function updateTimerDisplay(ms) {
    let minutes = Math.floor(ms / 60000)
    let seconds = Math.floor((ms % 60000) / 1000)
    currentTimer.querySelector('.time').textContent = `${minutes}:${seconds.toString().padStart(2,"0")}`
}

session.addEventListener("click", () => {
    clearInterval(myInterval)
    hideAll()
    pomodoro.style.display = "block"
    session.classList.add("active")
    shortBreak.classList.remove("active")
    longBreak.classList.remove("active")
    currentTimer = pomodoro
    remainingTime = 25 * 60 * 1000
    updateTimerDisplay(remainingTime)
})

shortBreak.addEventListener("click", () => {
    clearInterval(myInterval)
    hideAll()
    short.style.display = "block"
    session.classList.remove("active")
    shortBreak.classList.add("active")
    longBreak.classList.remove("active")
    currentTimer = short
    remainingTime = 5 * 60 * 1000
    updateTimerDisplay(remainingTime)
})

longBreak.addEventListener("click", () => {
    clearInterval(myInterval)
    hideAll()
    long.style.display = "block"
    session.classList.remove("active")
    shortBreak.classList.remove("active")
    longBreak.classList.add("active")
    currentTimer = long
    remainingTime = 10 * 60 * 1000
    updateTimerDisplay(remainingTime)
})

function startTimer() {
    let endTime = Date.now() + remainingTime
    myInterval = setInterval(() => {
        remainingTime = endTime - Date.now()
        if (remainingTime <= 0) {
            clearInterval(myInterval)
            updateTimerDisplay(0)
            const alarm = new Audio("https://www.freespecialeffects.co.uk/soundfx/scifi/electronic.wav")
            alarm.play()
        } else {
            updateTimerDisplay(remainingTime)
        }
    }, 1000)
}

startBtn.addEventListener("click", () => {
    if (!currentTimer) {
        timerMsg.style.display = "block"
        return
    }
    timerMsg.style.display = "none"
    if (isPaused) {
        isPaused = false
        startTimer()
    } else {
        clearInterval(myInterval)
        startTimer()
    }
})

stopBtn.addEventListener("click", () => {
    clearInterval(myInterval)
    isPaused = true
})

increaseBtn.addEventListener("click", () => {
    remainingTime += 60 * 1000 // add 1 min
    updateTimerDisplay(remainingTime)
})

decreaseBtn.addEventListener("click", () => {
    remainingTime = Math.max(0, remainingTime - 60 * 1000)
    updateTimerDisplay(remainingTime)
})

// Ensure default state
hideAll()
pomodoro.style.display = "block"
currentTimer = pomodoro
remainingTime = 25 * 60 * 1000
updateTimerDisplay(remainingTime)
session.classList.add("active")
