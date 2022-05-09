const probEl = document.querySelector(".problem")
const form1 = document.querySelector(".our-form")
const field1 = document.querySelector(".our-field")
const neededPts = document.querySelector(".points-needed")
const numOfMistakes = document.querySelector(".mistakes-allowed")
const progBar = document.querySelector(".progress-inner")
const gameEnd = document.querySelector(".end-message")
const startOver = document.querySelector(".reset-button")

let start = {
  score: 0,
  wrongAnswers: 0
}

function updateProb() {
  start.currentProblem = createProb()
  probEl.innerText = `${start.currentProblem.numberOne} ${start.currentProblem.operator} ${start.currentProblem.numberTwo}`
  field1.value = ""
  field1.focus()
}

 updateProb()

function createNumber(max) {
  return Math.floor(Math.random() * (max + 1))
}

function createProb() {
  return {
    numberOne: createNumber(10),
    numberTwo: createNumber(10),
    operator: ['+', '-', 'x'][createNumber(2)]
  }
}

form1.addEventListener("submit", handleSubmit)

function handleSubmit(e) {
  e.preventDefault()

  let correctAnswer
  const p = start.currentProblem
  if (p.operator == "+") correctAnswer = p.numberOne + p.numberTwo
  if (p.operator == "-") correctAnswer = p.numberOne - p.numberTwo
  if (p.operator == "x") correctAnswer = p.numberOne * p.numberTwo

  if (parseInt(field1.value, 10) === correctAnswer) {
    start.score++
    neededPts.textContent = 10 - start.score
    updateProb()
    progBarMove()
  } else {
    start.wrongAnswers++
    numOfMistakes.textContent = 2 - start.wrongAnswers
    probEl.classList.add("animate-wrong")
    setTimeout(() => probEl.classList.remove("animate-wrong"), 451)
  }
  checkAns()
}

function checkAns() {
  // if you won
  if (start.score === 10) {
    gameEnd.textContent = "YOU WIN!!!"
    document.body.classList.add("overlay-is-open")
    setTimeout(() => startOver.focus(), 331)
  }

  // if you lost
  if (start.wrongAnswers === 3) {
    gameEnd.textContent = "You LOSE!!! Try again!"
    document.body.classList.add("overlay-is-open")
    setTimeout(() => startOver.focus(), 331)
  }
}

startOver.addEventListener("click", resetGame)

function resetGame() {
  document.body.classList.remove("overlay-is-open")
  updateProb()
  start.score = 0
  start.wrongAnswers = 0
  neededPts.textContent = 10
  numOfMistakes.textContent = 2
  progBarMove()
}

function progBarMove() {
  progBar.style.transform = `scaleX(${start.score / 10})`
}
progBar.style.background = 'red';
progBar.style.textAlign = 'bottom';