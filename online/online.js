// open-games

let createGameForm = document.querySelector('.create-game');
let gamesList = document.querySelector('.open-games');
let token = "";

createGameForm.addEventListener('submit', (e) => {
  e.preventDefault();

  if (!token) getToken(createGame);

  let name = e.target[0].value;
  setName(name)
  

})

function getToken(func) {

    fetch("http://localhost:8080/api/user/auth/token", {
      method: "POST",
    //   headers: new Headers({
    //     accept: 'application/json',
    //     'Content-Type': 'application/json'
    // })
    })
    .then(response => response.json())
    .then(data => {
      token = data;
      func()
    })
    .catch(error => {
      console.error(error)
    });
}

// async function getToken() {

//   try {
//     const response = await fetch("http://localhost:8080/api/user/auth/token", {
//       method: "POST", // or 'PUT'
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });

//     const result = await response.json();
//     console.log("Success:", result);
//     // token = result;
//   } catch (error) {
//     console.error("Error:", error);
//   }

// }

function setName (name) {
  fetch("http://localhost:8080/api/user/auth/token", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "Token": token    
      },
      body: JSON.stringify({
        name
      })
    })
    .then(response => response.json())
    .then(data => {
      console.log(data)
    })
    .catch(error => {
      console.log(error);
    });
}

function createGame() {
  fetch("http://localhost:8080/api/games/game", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // playerId: token
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
    fetch("http://localhost:8080/api/games/games", {
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

function loadGames(games) {
  games.forEach(game => {
    let gameLink = document.createElement("a");

    gameLink.classList.add("game-link");
    gameLink.href = `./game/${game.id}`;
    gameLink.innerText = game.id
    
    gamesList.appendChild(gameLink);
  })
}


// function generateToken(){
//   var openGames = document.querySelector('.generate-token');
//   openGames.innerHTML = "";
// }

fetchGames();

// createGame();
