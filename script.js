const timeTxt = document.querySelector('#time')
const timerBtn = document.querySelector('.timer')
const breakBtn = document.querySelector('.break')
const lBreakBtn = document.querySelector('.lbreak')
const btn = document.querySelector('.uiBtn')
let time = 1500
let resto;
let timedown;
let mode = 'timer'
let breakcount = 0
let running = false
const alertsound = new Audio('./audio/sound.mp3')
//format and display time

const showTime = () =>{
    if(time%60<10){
        resto = ((time%60).toString().padStart(2, '0'))
    }else{
        resto = time%60
    }
    timeTxt.innerHTML = `${parseInt(time/60)}:${resto}`
}
showTime()


//mode selector
const breakMode = () =>{
    mode = 'break'
    time = 300
    timerBtn.style.filter = 'brightness(100%)'
    lBreakBtn.style.filter = 'brightness(100%)'
    breakBtn.style.filter = 'brightness(80%)'
    showTime()
}

const timerMode = () =>{
    mode = 'timer'
    time = 1500
    breakBtn.style.filter = 'brightness(100%)'
    lBreakBtn.style.filter = 'brightness(100%)'
    timerBtn.style.filter = 'brightness(80%)'
    showTime()
}


const longBreakMode = () =>{
    mode = 'longbreak'
    time = 900
    timerBtn.style.filter = 'brightness(100%)'
    breakBtn.style.filter = 'brightness(100%)'
    lBreakBtn.style.filter = 'brightness(80%)'
    showTime()
}

timerMode()
// Start/stop/reset btns

const stop = () =>{
    clearInterval(timedown)
    running = false
}
function start(){
    if(running){
        return
    }
    running = true
    timedown = setInterval(() => {
    time--
    showTime()
    if(time===0){
       clearInterval(timedown)
       switch(mode){
        case 'timer':
            if(breakcount<5){
            breakMode()
            breakcount++}
            else{
                longBreakMode()
                breakcount = 0
            }
            break
        case 'break':
            timerMode()
            break
        case 'longbreak':
            timerMode()
            break
       }
       running = false
       alertsound.play()
       alert('Time is up champ!')
    }
}, 1000);}


function reset() {
    switch(mode){
        case 'timer':
            time = 1500
            break
        case 'break':
            time = 300
            break
        case 'longbreak':
            time = 900
            break
        default:
            time = 1500
            break
    }
   stop()
   showTime()
}