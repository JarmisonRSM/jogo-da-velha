const xClass = 'x'
const oClass = 'o'
let xTurn

const opcoes = document.querySelectorAll('.matriz')
const borda = document.querySelector('#borda')

const gameEndMessage = document.querySelector('[data-game-end-message]')
const gameEndElement = document.querySelector('#gameEndElement')

const reiniciar = document.querySelector('#reiniciar')

const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
]

startGame()

function startGame() {
    xTurn = true
    borda.classList.add('x')

    opcoes.forEach(matriz => {
        matriz.classList.remove(xClass)
        matriz.classList.remove(oClass)
        borda.classList.replace('o', 'x')


        matriz.addEventListener('click', handleClick, { once: true })
    })

    reiniciar.addEventListener('click', startGame)

    gameEndElement.classList.remove('show')
    document.querySelector('main').classList.remove('end')
}

function handleClick(e) {
    let matriz = e.target
    let turnClass = xTurn ? xClass : oClass

    placeMark(matriz, turnClass)

    if (checkWin(turnClass)) {
        endGame(false)
    } else if (checkDraw()) {
        endGame(true)
    }

    swapTurn()
    setBoardHover()
}

function placeMark(matriz, turnClass) {
    matriz.classList.add(turnClass)
}

function swapTurn() {
    xTurn = !xTurn
}

function setBoardHover() {
    xTurn ? borda.classList.replace('o', 'x') : borda.classList.replace('x', 'o')
}

function checkWin(turnClass) {
    return lines.some(line => {
        return line.every(index => {
            return opcoes[index].classList.contains(turnClass)
        })
    })
}

function checkDraw() {
    return [...opcoes].every(matriz => {
        return matriz.classList.contains(xClass) || matriz.classList.contains(oClass)
    })
}

function endGame(draw) {
    if (draw) {
        gameEndMessage.innerText = "VELHA!"
    } else {
        gameEndMessage.innerText = `${xTurn ? "X" : "BOLA"} VENCEU!`
    }

    gameEndElement.classList.add('show')
    document.querySelector('main').classList.add('end')
}
