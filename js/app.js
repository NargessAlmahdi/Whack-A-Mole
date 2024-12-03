/*-------------- Constants -------------*/

/*---------- Variables (state) ---------*/
let score = 0
let hiscore = 0
let hole = ""
let molespop = ""





/*----- Cached Element References  -----*/

let holes = document.querySelectorAll('.hole')
const startBtnEl = document.querySelector('.startButton')
const restartBtnEl = document.querySelector('.restartButton')

let scoreEl = document.querySelector('#score')
let hiscoreEl = document.querySelector('#hiscore')
const timerCount = document.querySelector('.countdown')
const timerCount2 = document.querySelector('.countdown2')

const openBtn = document.querySelector('#openModal')
const closeBtn = document.querySelector('#closeModal')
const modal = document.querySelector('#modal')

let messageEl = document.querySelector('#message')

let play = document.querySelector('#music')
let audio = new Audio ('audio/backgroundmusic.mp3')
let musicIcon = document.querySelector('#music-icon')





/*-------------- Functions -------------*/

const molesShow = () => { 
    molespop = setInterval(()=> {
        let arrayNo = Math.floor(Math.random()*6)
        hole = holes[arrayNo]
        
        let image = document.createElement('img')
        image.setAttribute('src', 'images/mole.png')
        image.setAttribute('class', 'mole')
        hole.appendChild(image)
        
        
        image.addEventListener('click', () => {
            image.setAttribute('src', 'images/whacked.png')
            score += 10
            scoreEl.textContent = `SCORE: ${score}`
            
        })
        
        setTimeout(() => {
            hole.removeChild(image)
            
        }, 800)
    }, 900)
}



const startGame = () => {
    score = 0
    timeSecond = 3
    timerCount.style.display = 'block'
    timerCount.textContent = timeSecond
    
    
    const countDown = setInterval (() => {
        timeSecond -- 
        timerCount.textContent = (timeSecond)
        
        if(timeSecond <=0){
            clearInterval(countDown)
            endTime()
            molesShow()
            setTimeout(secondTimer, 1000)
            
        }
    }, 1000)
}



function endTime (){
    timerCount.textContent = 'GO!'
    setTimeout(() => {
        timerCount.style.display = 'none'
    }, 1000)
}



let timeSecond2 = 30 
timerCount2.textContent = `00:${timeSecond2}`

const secondTimer = () => {
    timerCount2.style.display = 'block'
    const countdown2 = setInterval (() => {
        timeSecond2 --
        timerCount2.textContent = `00:${timeSecond2}`
        if(timeSecond2 <= 0){
            clearInterval(countdown2)
            endTime2()
            clearInterval(molespop)
            updateMessage()
        }
    },1000)
}



function updateMessage(){
    if(score > hiscore){
        messageEl.textContent = `YOU SET A NEW HI-SCORE!`
    }
    else {
        messageEl.textContent = `TRY AGAIN TO BEAT THE HI-SCORE!`
    }
    messageEl.style.display = 'block'
}



function endTime2 (){
    timerCount2.textContent = 'TIMES UP!'
    setTimeout(() => {
        updateMessage()
        
        if(score > hiscore){
            hiscore = score
            hiscoreEl.textContent = `HI-SCORE: ${hiscore}`
        }
    }, 1000)
}


function playMusic(){
    if (audio.paused){
        audio.play()
        musicIcon.src = 'images/music-icon.png'
        play.style.backgroundColor = '#ff4b16'
        
    } else {
        audio.pause()
        audio.currentTime = 0
        musicIcon.src = 'images/mute-icon.png'
        play.style.backgroundColor = '#f5ce33'
        
    }
}






/*----------- Event Listeners ----------*/

startBtnEl.addEventListener('click', () => {
    startBtnEl.style.display = 'none'
    
    startGame()
})

restartBtnEl.addEventListener('click', () => {
    
    
    messageEl.style.display = 'none'
    timerCount2.style.display = 'none'
    
    
    score = 0
    scoreEl.textContent = `SCORE: ${score}`
    
    timeSecond2 = 30
    timerCount2.textContent = `00:${timeSecond2}`
    
    startBtnEl.style.display  = 'none'
    startGame()
})


timerCount.style.display = 'none'
timerCount2.style.display = 'none'
restartBtnEl.style.display = 'block'



openBtn.addEventListener('click', () => {
    modal.classList.add('open')
})
closeBtn.addEventListener('click', () => {
    modal.classList.remove('open')
})


play.addEventListener('click', playMusic)