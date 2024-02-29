const API_URL = 'https://api.thecatapi.com/v1';
const API_KEY = 'api_key=live_g6kgi6v1ZV19U1ITPoERmgi5jc0EXzZs1ByMS7kfZztsqYvT82DckDXrcK32hajd';

const swiper = () =>{ new Swiper(".swiperHome", {
  slidesPerView: 3,
  spaceBetween: 30,
  centeredSlides: true,
  pagination: {
    el: ".swiper-pagination",
    dynamicBullets: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    640: {
        slidesPerView: 1,
        spaceBetween: 20,
    },
    768: {
        slidesPerView: 2,
        spaceBetween: 20,
    },
    1024: {
        slidesPerView: 3,
        spaceBetween: 30,
    },
  },
  });
}

async function loadRamdomCats () {
  try {
    const response = await fetch(`${API_URL}/images/search?limit=5&${API_KEY}`);
    const status = response.status;

    if(status !== 200) throw Error(`Gatitos Random: ${status}`);

    const data = await response.json();

    const img1 = document.getElementById('img1');
    const img2 = document.getElementById('img2');
    const img3 = document.getElementById('img3');
    const img4 = document.getElementById('img4');
    const img5 = document.getElementById('img5');
  
    const btn1 = document.getElementById('btn1');
    const btn2 = document.getElementById('btn2');
    const btn3 = document.getElementById('btn3');
    const btn4 = document.getElementById('btn4');
    const btn5 = document.getElementById('btn5');

    btn1.firstElementChild.src = 'img/corazonvacio.png';
    btn2.firstElementChild.src = 'img/corazonvacio.png';
    btn3.firstElementChild.src = 'img/corazonvacio.png';
    btn4.firstElementChild.src = 'img/corazonvacio.png';
    btn5.firstElementChild.src = 'img/corazonvacio.png';

    btn1.addEventListener('click', () => {
      btn1.firstElementChild.src = 'img/corazonlleno.png';
    });

    btn2.addEventListener('click', () => {
      btn2.firstElementChild.src = 'img/corazonlleno.png';
    });

    btn3.addEventListener('click', () => {
      btn3.firstElementChild.src = 'img/corazonlleno.png';
    });

    btn4.addEventListener('click', () => {
      btn4.firstElementChild.src = 'img/corazonlleno.png';
    });

    btn5.addEventListener('click', () => {
      btn5.firstElementChild.src = 'img/corazonlleno.png';
    });

    btn1.onclick  = () => saveFavoriteCat(data[0].id); 
    btn2.onclick  = () => saveFavoriteCat(data[1].id);
    btn3.onclick  = () => saveFavoriteCat(data[2].id);
    btn4.onclick  = () => saveFavoriteCat(data[3].id);
    btn5.onclick  = () => saveFavoriteCat(data[4].id);

    img1.src = data[0].url;
    img2.src = data[1].url;
    img3.src = data[2].url;
    img4.src = data[3].url;
    img5.src = data[4].url;

  }catch (error) {
    alert(`Ups... Gatitos ocupados en el error ${error}`);
  }
}

async function loadFavoritesCats () {
  try{
    const contenedor = document.querySelector('#contenedor-fav');
    const response = await fetch(`${API_URL}/favourites?order=DESC&${API_KEY}`);
    const status = response.status;
    
    contenedor.innerHTML = '';

    if(status !== 200) throw Error(`Gatitos Favoritos: ${status}`);

    const data = await response.json();
    
    if (data.length <= 0) {
      contenedor.innerHTML = `<span class="text-4xl w-full text-center text-white">Upss... Aún no tienes gatitos en favoritos</span>`;
    } else {
      data.forEach((element) => {
        contenedor.innerHTML += `
        <div class="swiper-slide bg-[#f99f9f]/50 rounded-lg w-[300px] h-[300px] relative">
          <button value="${element.id}" onclick="" class="absolute right-0 w-[30px]"><img src="img/corazonlleno.png" alt=""></button>
          <img class="size-full rounded-xl" src="${element.image.url}"  alt="">
        </div>
        `;
      });
      
    }
  }catch (error) {
    alert(`Ups... Gatitos ocupados en el error ${error}`);
  } finally {
    const favoritos = document.querySelectorAll('.swiper-slide');
    favoritos.forEach((element) => {
      element.firstElementChild.onclick = () => deleteFavoriteCat(element.firstElementChild.value);
    });
    swiper();
  }
}

async function saveFavoriteCat (id) {
  try {
    const response = await fetch(`${API_URL}/favourites?${API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        image_id: id
      }),
    });

    const status = response.status;
    
    if(status !== 200) throw Error(`Gatitos salvados: ${status}`);
  
  }catch(error) {
    alert(`Ups... Gatitos ocupados en el error ${error}`);
  } finally {
    loadFavoritesCats();
  }
}

async function deleteFavoriteCat(id) {
  try {
    const response = await fetch(`${API_URL}/favourites/${id}?${API_KEY}`, {
      method: 'DELETE',
    });

    const status = response.status;
    
    if(status !== 200) throw Error(`Gatitos borrados: ${status}`);

  }catch(error) {
    alert(`Ups... Gatitos ocupados en el error ${error}`);
  } finally {
    loadFavoritesCats();
  }
}

loadRamdomCats();
loadFavoritesCats();