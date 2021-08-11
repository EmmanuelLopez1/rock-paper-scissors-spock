import { functions } from "./funcionesGenerales.js";

const funciones = new functions()

export const game = class Game {
    constructor() {
        this.animationTime = 0
        this.scoreNode = document.querySelector('.header-score__number')
        this.score = 0
        //contenedor de eleccion del modo de juego
        this.gameMode = document.querySelector('.game-mode')
        //botones
        this.buttonNormalMode = document.querySelector('.normalMode')
        this.buttonSpockMode = document.querySelector('.spockMode')

        //contenedor del juego
        this.game = document.querySelector('.game')

        //modos de juego
        this.normalMode = document.querySelector('.normal-mode')
        this.spockMode = document.querySelector('.bonus-mode')

        //elementos del component rules
        this.rules = document.querySelector('.content-rules')
        this.rulesImg = document.querySelector('.content-rules__img')
        this.buttonCloseRules = document.querySelector('.content-rules__icon')

        //botones
        this.buttonShowRules = document.querySelector('.rules')
        this.buttonHome = document.querySelector('.home')

        //stateGameModenes reglas del juego
        this.rulesImgNormalMode = './images/image-rules.svg'
        this.rulesImgSpockMode = './images/image-rules-bonus.svg'
        this.stateGameMode = ''

        //Match
        this.match = document.querySelector('.match')
        this.player = document.querySelector('.player')
        this.bot = document.querySelector('.bot')
        this.playerImg = document.querySelector('.player__img')
        this.botImg = document.querySelector('.bot__img')
        this.infoGame = {
            rock: {
                class: 'select-rock',
                name: 'rock',
                lose: ['paper', 'spock'],
                beat: ['scissors', 'lizard']
            },
            paper: {
                class: 'select-paper',
                name: 'paper',
                lose: ['scissors', 'lizard'],
                beat: ['rock', 'spock'],
            },
            scissors: {
                class: 'select-scissors',
                name: 'scissors',
                lose: ['rock', 'spock'],
                beat: ['paper', 'lizard']
            },
            lizard: {
                class: 'select-lizard',
                name: 'lizard',
                lose: ['scissors', 'rock'],
                beat: ['spock', 'paper']
            },
            spock: {
                class: 'select-spock',
                name: 'spock',
                lose: ['paper', 'lizard'],
                beat: ['scissors', 'rock']
            }
        }

        //FINAL
        this.final = document.querySelector('.final');
        this.win = document.querySelector('.final__result')
        this.btnplayAgain = document.querySelector('.play-again')
    }

    gameModeSelect() {
        this.resetValues()
        this.closeRules()
        this.buttonRules()
        this.botSelectCard()
        this.selectMovement()
        this.playAgain()
        
        this.buttonHome.addEventListener('click', () => {
            funciones.hideInterface(this.game)
            funciones.hideInterface(this.match)
            funciones.hideInterface(this.final)
            funciones.showInterface(this.gameMode, 'flex')
            this.resetValues()
        })

        this.buttonNormalMode.addEventListener('click', () => {
            this.stateGameMode = 1
            this.showRules(this.rulesImgNormalMode)
            this.showButtons()
           
        })

        this.buttonSpockMode.addEventListener('click', () => {
            this.stateGameMode = 2
            this.showRules(this.rulesImgSpockMode)
            this.showButtons()
        })
    }

    closeRules() {
        this.buttonCloseRules.addEventListener('click', () => {
            funciones.hideInterface(this.rules)
            funciones.showInterface(this.game, 'flex')
        })
    }

    showRules(src) {
        funciones.changeSrc(this.rulesImg, src)
        funciones.hideInterface(this.gameMode)
        funciones.hideInterface(this.game)
        // funciones.hideInterface(this.match)
        funciones.showInterface(this.rules, 'flex')
    }

    buttonRules() {
        this.buttonShowRules.addEventListener('click', () => {
            if (this.stateGameMode === 1) {
                this.showRules(this.rulesImgNormalMode)
            }
            else {
                this.showRules(this.rulesImgSpockMode)
            }
        })
    }

    showButtons() {
        if (this.stateGameMode == 1) {
            funciones.showInterface(this.normalMode, 'flex')
            funciones.showInterface(this.spockMode, 'none')
        } else {
            funciones.showInterface(this.spockMode, 'grid')
            funciones.showInterface(this.normalMode, 'none')
        }
    }

    selectMovement() {
        for (const i in this.infoGame) {
            const name = this.infoGame[i].name
            const button = document.querySelectorAll(`.${this.infoGame[i].class}`)
            for (const j of button) {
                j.addEventListener('click', () => {
                    funciones.hideInterface(this.normalMode)
                    funciones.hideInterface(this.spockMode)
                    funciones.showInterface(this.match, 'flex')
                    funciones.removeTextNodes(this.player.childNodes)
                    funciones.removeTextNodes(this.bot.childNodes)
                    const botMove = this.botSelectCard()

                    this.player.firstChild.setAttribute('class', `button ${name}`)
                    this.bot.firstChild.setAttribute('class', `button ${botMove}`)

                    console.log(this.player.firstChild.classList);
                    console.log(this.bot.firstChild.classList);
                    
                    funciones.changeSrc(this.playerImg, `./images/icon-${name}.svg`)
                    funciones.changeSrc(this.botImg, `./images/icon-${botMove}.svg`)

                    this.animacion(this.player.firstChild, 100)
                    this.animacion(this.bot.firstChild, 2000)

                    setTimeout(()=>{
                        this.winner(name, botMove)
                    }, this.animationTime + 1000)
                })
            }
        }
    }

    botSelectCard(){
        function randomNumber(num){
            return num = Math.floor(Math.random() * num)
        }
        const jugadas = {
            0:'paper',
            1:'rock',
            2:'scissors',
            3:'spock',
            4:'lizard'
        }
        let movement = 0
        if(this.stateGameMode === 1){
             movement = randomNumber(3) 
        }
        else{
            movement = randomNumber(5)
        }
        return jugadas[movement]
    }

    animacion(element, time){
        this.animationTime += time
        funciones.zoom(element, 0)
        setTimeout(()=>{
            funciones.zoom(element, 1)
        }, time)
    }

    winner(playerMove, botMove){
        const win = this.infoGame[playerMove]
        funciones.showInterface(this.final, 'block')
        if(playerMove === botMove){
            this.win.innerHTML = 'EMPATE'
        }else{
            for(let i of win.lose){
                if(i === botMove){
                    this.win.innerHTML = 'YOU LOSE'
                }
            }
            for(let i of win.beat){
                if(i === botMove){
                    this.win.innerHTML = 'YOU WIN'
                    this.score += 1
                    this.scoreNode.innerHTML = this.score
                }
            }
        }
    }

    playAgain(){
        this.btnplayAgain.addEventListener('click',()=>{
            this.animationTime = 0
            funciones.hideInterface(this.match)
            funciones.hideInterface(this.final)
            if(this.stateGameMode == 1){
                funciones.showInterface(this.normalMode, 'flex')
            }
            else{
                funciones.showInterface(this.spockMode, 'grid')
            }
            
        })
    }

    resetValues(){
        this.score = 0
        this.scoreNode.innerHTML = '0'
        this.animationTime = 0
    }
}