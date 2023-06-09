let gameInfo = JSON.parse(localStorage.getItem("gameInfo")); // sen få tillbaks bara game id?
console.log(gameInfo);
let gameData = {};
// setTimeout(function() {
//     console.log(gameInfo);
//   }, 2000);

// let user1Score = gameData.PlayerOneWins ;
// let user2Score = gameData.PlayerTwoWins;
const userScore_span = document.getElementById('user-score');
const user2Score_span = document.getElementById('computer-score');
const scoreBoard_div = document.querySelector('.score-board');
const result_p = document.querySelector('.result > p');
const rock_div = document.getElementById('r');
const paper_div = document.getElementById('p');
const scissors_div = document.getElementById('s');

function fetchGameInfo() {
    if (!gameInfo) return
    fetch(`http://localhost:8080/api/games/${gameInfo?.gameId}`,{
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // playerId: token
        playerId: gameInfo?.playerOne?.playerId
        
      })
    })
    .then(response => response.json())
    .then(data => {
      console.log(data, "gameData")
        gameData = data
      // update game score:
      userScore_span.innerHTML = gameData.playerOneWins;
      user2Score_span.innerHTML = gameData.playerTwoWins;
    })
    .catch(error => {
      console.log(error, "createGame");
     

    });
}
setInterval(fetchGameInfo, 1000);

function makeMove(move) {
    if (!gameInfo) return
    fetch(`http://localhost:8080/api/games/move`,{
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // playerId: token
        playerId: gameInfo?.playerOne?.playerId,
        gameId: gameInfo?.gameId,
        playerMove: move

        
      })
    })
    .then(response => response.json())
    .then(data => {
        gameData = data
      console.log(gameInfo)
    })
    .catch(error => {
      console.log(error, "createGame");
     

    });

}

// function getComputerChoice() {
//     const choices = ['r', 'p', 's'];
//     const randomNumber = Math.floor (Math.random() * 3);
//     return choices[randomNumber];
// }

function convertToWord(letter) {
    if (letter === 'r') return 'ROCK';
    if (letter === 'p') return 'PAPER';
    return 'SCISSORS'
}

// function win(userChoice, computerChoice){
//     userScore++;
//     userScore_span.innerHTML = userScore;
//     computerScore_span.innerHTML = user2Score;
//     const samllUserWord = 'user'.fontsize(3);
//     const samllCompWord = 'comp'.fontsize(3);
//     result_p.innerHTML = `${convertToWord(userChoice)}${samllUserWord} beats ${convertToWord(computerChoice)}${samllCompWord}. You Win! `;
//     // document.getElementById(userChoice).classList.add('green-glow');
//     // setTimeout(function() {}, 1000);
// }

// function lose(userChoice, computerChoice) {
//     user2Score++;
//     userScore_span.innerHTML = userScore;
//     computerScore_span.innerHTML = user2Score;
//     const samllUserWord = 'user'.fontsize(3);
//     const samllCompWord = 'comp'.fontsize(3);
//     result_p.innerHTML = `${convertToWord(userChoice)}${samllUserWord} loses to ${convertToWord(computerChoice)}${samllCompWord}. You Lost... `;
//     // document.getElementById(computerChoice).classList.add('red-glow');
// }

// function draw(userChoice, computerChoice) {
//     const samllUserWord = 'user'.fontsize(3);
//     const samllCompWord = 'comp'.fontsize(3);
//     result_p.innerHTML = `${convertToWord(userChoice)}${samllUserWord} = ${convertToWord(computerChoice)}${samllCompWord}. Draw`;
//     // document.getElementById(userChoice).classList.add('gray-glow');
// }



// function game(userChoice) {
//     const computerChoice = getComputerChoice();
//     switch (userChoice + computerChoice) {
//         case "rs":
//         case "pr":
//         case "sp":
//             win(userChoice + computerChoice);
//             break;   
//         case "rp":
//         case "ps":
//         case "sr":
//             lose(userChoice + computerChoice);
//             break;
//         case "rr":
//         case "pp":
//         case "ss":
//             draw(userChoice + computerChoice);
//             break; 
//     }

// }

function main() {

    rock_div.addEventListener('click', function(){
        makeMove(convertToWord('r'));
    })

    paper_div.addEventListener('click', function(){
      makeMove(convertToWord('p'));
    })

    scissors_div.addEventListener('click', function(){
      makeMove(convertToWord('s'));
    })

}

main();