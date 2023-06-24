// open-games

function fetchGames() {
    fetch('https://fakestoreapi.com/products')
    .then(response => response.json())
    .then(data => {
      
      console.log(data);
      displayProducts(data);
    })
    .catch(error => {
      console.error('Det uppstod ett fel:', error);
    });
}