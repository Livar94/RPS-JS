let gameInfo = JSON.parse(localStorage.getItem("gameInfo")); // sen få tillbaks bara game id?
console.log(gameInfo);
let gameData = {};

const userScore_span = document.getElementById('user-score');
const user2Score_span = document.getElementById('computer-score');
const scoreBoard_div = document.querySelector('.score-board');
const result_p = document.querySelector('.result > p');
const rock_div = document.getElementById('r');
const paper_div = document.getElementById('p');
const scissors_div = document.getElementById('s');
const user1Label = document.getElementById('user-label');
const user2Label = document.getElementById('computer-label');


function fetchGameInfo() {
    if (!gameInfo.gameId) return; 
    fetch(`http://localhost:8080/api/games/${gameInfo?.gameId}`,{
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        playerId: gameInfo.playerOne.playerId
        
      })
    })
    .then(response => response.json())
    .then(data => {
      console.log(gameInfo);
      console.log(data, "gameData")
        gameData = data

      if (gameInfo.playerOne.playerName == gameData.playerOne) {
            user1Label.innerText = gameInfo.playerOne.playerName
            user2Label.innerText = gameData.playerTwo
          } else {
            user1Label.innerText = gameData.playerOne
            user2Label.innerText = gameInfo.playerOne.playerName
    }
            userScore_span.innerHTML = gameData.playerOneWins;
            user2Score_span.innerHTML = gameData.playerTwoWins;

            if (gameInfo.playerOne.playerName == gameData.playerOne) {

              result_p.innerText = `You ${gameData.playerOneMove}, ${gameData.playerTwo} ${gameData.playerTwoMove}`

            } else {

              result_p.innerText = `You ${gameData.playerTwoMove}, ${gameData.playerOne} ${gameData.playerOneMove}`
            };
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


function convertToWord(letter) {
    if (letter === 'r') return 'ROCK';
    if (letter === 'p') return 'PAPER';
    return 'SCISSORS'
}


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