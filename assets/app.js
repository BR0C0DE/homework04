//  TIMER  // 
// Set the date we're counting down to
var countDownDate = new Date("Jan 5, 2022 15:37:25").getTime();

// Update the count down every 1 second
var x = setInterval(function () {

  // Get today's date and time
  var now = new Date().getTime();

  // Find the distance between now and the count down date
  var distance = countDownDate - now;

  // Time calculations for days, hours, minutes and seconds
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Display the result in the element with id="demo"
  document.getElementById("demo").innerHTML = days + "d " + hours + "h "
    + minutes + "m " + seconds + "s ";

  // If the count down is finished, write some text
  if (distance < 0) {
    clearInterval(x);
    document.getElementById("demo").innerHTML = "EXPIRED";
  }
}, 1000);


// GAME FUNCTIONS //

const questions = ['JavaScript is interpreted by _________', 'What is mean by "this" keyword in javascript?', 'How does JavaScript store dates in a date object?', '______ tag is an extension to HTML that can enclose any number of JavaScript statements.']
let guessedLetters = []
let chosenGame = ''
let isQuizStarted = false
let guesses = 10
let points = 0
// 
let scores = JSON.parse(localStorage.getItem('scores')) || []

const renderWord = () => {
  let finishedWord = true
  let chosenGameArr = chosenGame.split('') //gets the name of the chosen game and splits it into characters //
  let wordRender = ''
  chosenGameArr.forEach(char => {
    if (char === ' ') {
      wordRender += '    '
    } else if (guessedLetters.indexOf(char.toLowerCase()) !== -1) { //allows the player to guess lowercase numbers//
      wordRender += `${char} `
    } else {
      finishedWord = false
      wordRender += '_ '
    }
  })
  document.getElementById('word').textContent = wordRender

  if (finishedWord) {
    points += 10 + (guesses * 5)
    isQuizStarted = false
    if (games.length > 0) {
      document.getElementById('roundInfo').style.display = 'none'
      document.getElementById('newRoundInfo').style.display = 'block'
    } else {
      document.getElementById('win').style.display = 'block'
      document.getElementById('viewScores').style.display = 'block'
    }
  }
}

const newGame = () => {
  document.getElementById('scores').style.display = 'none'
  document.getElementById('game').style.display = 'block'
  document.getElementById('win').style.display = 'none'
  document.getElementById('lose').style.display = 'none'
  guesses = 10
  guessedLetters = []
  document.getElementById('guesses').textContent = guesses
  document.getElementById('guessed').textContent = guessedLetters.join(', ')
  const index = Math.floor(Math.random() * games.length)
  chosenGame = games[index]
  games.splice(index, 1)
  // console.log(chosenGame)
  isQuizStarted = true
  document.getElementById('start').style.display = 'none'
  document.getElementById('newRoundInfo').style.display = 'none'
  document.getElementById('roundInfo').style.display = 'block'
  renderWord()
}

document.getElementById('newRound').addEventListener('click', () => newGame())

document.getElementById('start').addEventListener('click', () => newGame())

document.getElementById('viewScores').addEventListener('click', () => {
  document.getElementById('game').style.display = 'none'
  document.getElementById('scores').style.display = 'block'
  document.getElementById('myScore').textContent = points
})

document.getElementById('submitScore').addEventListener('click', event => {
  event.preventDefault()
  const record = {
    username: document.getElementById('username').value,
    score: points
  }
  scores.push(record)
  localStorage.setItem('scores', JSON.stringify(scores))
  document.getElementById('addScores').style.display = 'none'
  document.getElementById('displayScores').style.display = 'block'
  scores = scores.sort((a, b) => b.score - a.score)
  scores.forEach(score => {
    let scoreElem = document.createElement('div')
    scoreElem.innerHTML = `<h6>Username: ${score.username} | Score: ${score.score}</h6><hr>`
    document.getElementById('displayScores').append(scoreElem)
  })
  points = 0
  document.getElementById('start').style.display = 'block'
})

document.onkeyup = event => {
  if (isQuizStarted && event.keyCode >= 65 && event.keyCode <= 90 && guessedLetters.indexOf(event.key) === -1) {
    guessedLetters.push(event.key)
    document.getElementById('guessed').textContent = guessedLetters.join(', ')
    let isInWord = false
    let chosenGameArr = chosenGame.split('')
    chosenGameArr.forEach(char => {
      if (char.toLowerCase() === event.key) {
        isInWord = true
      }
    })
    if (!isInWord) {
      guesses--
      document.getElementById('guesses').textContent = guesses
      if (guesses <= 0) {
        document.getElementById('roundInfo').style.display = 'none'
        document.getElementById('lose').style.display = 'block'
        document.getElementById('viewScores').style.display = 'block'
      }
    }
    renderWord()
  }
}

