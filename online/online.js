let createGameBtn = document.querySelector('.create-game');
let writeNameForm = document.querySelector('.write-name');
let userOptions = document.querySelector('.user-options');
let gamesList = document.querySelector('.open-games');
let token = "";
let name = "";

writeNameForm.addEventListener('submit', (e) => {
  e.preventDefault();
   name = e.target[0].value;

  if (!token) getToken(setName, name);
})

createGameBtn.addEventListener('click', (e) => {
  e.preventDefault();
  
  createGame()
})


function getToken(func, p1) {

    fetch("http://localhost:7979/api/user/auth/token", {
      method: "POST",

    })
    .then(response => response.json())
    .then(data => {
      token = data;
      func(p1)
    })
    .catch(error => {
      console.error(error)
    });
}


function setName (name) {
  console.log(token, name);
  fetch("http://localhost:7979/api/user/name", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "Token": token    
      },
      body: JSON.stringify({
        name
      })
    })
    .then(response => response)
    .then(data => {
      userOptions.style.display = "block"
    })
    .catch(error => {
      console.log(error);
    });
}

function createGame() {
  fetch("http://localhost:7979/api/games/game", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        playerId: token
        
      })
    })
    .then(response => response.json())
    .then(data => {
      console.log(data)

      localStorage.setItem("gameInfo", JSON.stringify(data))
      window.location.href = 'game/index.html';
    })
    .catch(error => {
      console.log(error, "createGame");
     

    });
}

function fetchGames() {
    fetch("http://localhost:7979/api/games/games", {
      method: "get",
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then(response => response.json())
    .then(data => {
      console.log(data, "games")
      loadGames(data)
    })
    .catch(error => {
      console.log(error);
    });
}

function joinGame(gameId) {
  console.log(gameId, token, "getting game and player id")
  fetch(`http://localhost:7979/api/games/join`, {
    method: "post",
    headers: {
      'Content-Type': 'application/json' , 
      'gameId': gameId,
    },
    body: JSON.stringify({
      playerId: token,   

      
      
    })
  })
  .then(response => response.json())
  .then(data => {
    console.log(data, "joined game")
    localStorage.setItem("gameInfo", JSON.stringify({
      gameId: gameId,
      playerOne: {playerId: token, playerName: name}
    }))

    window.location.href = 'game/index.html';
  })
  .catch(error => {
    console.log(error);
  });
}

function loadGames(games) {
  games.forEach((game, index) => { // `index` will give us the position of the game in the array
    let gameButton = document.createElement("button");

 

    gameButton.classList.add("game-button");
    gameButton.innerText = `Game #${index + 1}`; // Add 1 to index because array indices start at 0

    gameButton.addEventListener("click", () => {
      joinGame(game.gameId)
    })

    gamesList.appendChild(gameButton);
  })
}




fetchGames();


