console.log("Hola gatos")

const API_URL = 'https://api.thecatapi.com/v1';
const API_KEY = 'api_key=live_g6kgi6v1ZV19U1ITPoERmgi5jc0EXzZs1ByMS7kfZztsqYvT82DckDXrcK32hajd';

async function loadRamdomCats () {
  const response = await fetch(`${API_URL}/images/search?limit=5&${API_KEY}`);
  const data = await response.json();

  console.log(data);
  
  const img1 = document.getElementById('img1');
  const img2 = document.getElementById('img2');
  const img3 = document.getElementById('img3');
  const img4 = document.getElementById('img4');
  const img5 = document.getElementById('img5');


  img1.src = data[0].url;
  img2.src = data[1].url;
  img3.src = data[2].url;
  img4.src = data[3].url;
  img5.src = data[4].url;
}

loadRamdomCats();


async function loadFavorites () {
  const response = await fetch(`${API_URL}/favourites?limit=3&${API_KEY}`);
  const data = await response.json();
  
  console.log(data);
  
  const img1 = document.getElementById('img1');
  const img2 = document.getElementById('img2');
  const img3 = document.getElementById('img3');
  const img4 = document.getElementById('img4');
  const img5 = document.getElementById('img5');


  img1.src = data[0].url;
  img2.src = data[1].url;
  img3.src = data[2].url;
  img4.src = data[3].url;
  img5.src = data[4].url;
}