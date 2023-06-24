// open-games

let createGameForm = document.querySelector('.create-game');
let gamesList = document.querySelector('.open-games');
let token = "";
let playerId = "";

createGameForm.addEventListener('submit', (e) => {
  e.preventDefault();

  if (!token) getToken();

  let name = e.target[0].value;
  setName(name)
  createGame()

})

function getToken() {

    fetch("http://rps-backend-production.up.railway.app/api/user/auth/token", {
      method: "post",
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => {
      token = data;
    })
    .catch(error => {
      console.log(error);
    });
}

function setName (name) {
  fetch("http://rps-backend-production.up.railway.app/api/user/auth/token", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "Token": token    
      },
      body: {
        name
      }
    })
    .then(response => response.json())
    .then(data => {
      playerId = data;
    })
    .catch(error => {
      console.log(error);
    });
}

function createGame() {
  fetch("http://rps-backend-production.up.railway.app/api/user/auth/token", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        // "Token": token    ????
      },
      body: {
        playerId
      }
    })
    .then(response => response.json())
    .then(data => {
      console.log(data) // <<<<<< vi får gameId, sen kan vi föra användaren till annan sida där hen kan vänta tills nån joinar spelet
    })
    .catch(error => {
      console.log(error);
    });
}

function fetchGames() {
    fetch("http://rps-backend-production.up.railway.app/api/games/games", {
      method: "get",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      }
    })
    .then(response => response.json())
    .then(data => {
      loadGames(data)
    })
    .catch(error => {
      console.log(error);
    });
}

function loadGames(games) {
  games.forEach(game => {
    let gameLink = document.createElement("a");

    gameLink.classList.add("game-link");
    gameLink.href = `./game/${game.id}`;
    
    gamesList.appendChild(gameLink);
  })
}


// function generateToken(){
//   var openGames = document.querySelector('.generate-token');
//   openGames.innerHTML = "";
// }

fetchGames();