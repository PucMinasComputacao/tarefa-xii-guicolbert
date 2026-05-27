const API_KEY = "1b295c1e26352d90c2e7ee379f7cb0ed";

const BASE_URL = "https://api.themoviedb.org/3";

const IMAGE_URL = "https://image.tmdb.org/t/p/w500";

const movieList = document.getElementById("movie-list");

const message = document.getElementById("message");

const searchInput = document.getElementById("search");

const btnSearch = document.getElementById("btnSearch");


// ===============================
// MOSTRAR MENSAGEM
// ===============================

function showMessage(text) {

  message.textContent = text;

}


// ===============================
// BUSCAR FILMES
// ===============================

async function fetchMovies(query = "") {

  try {

    showMessage("Carregando filmes...");

    let url = "";

    if (query) {

      url = `${BASE_URL}/search/movie?api_key=${API_KEY}&language=pt-BR&query=${query}`;

    } else {

      url = `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=pt-BR`;

    }

    const response = await fetch(url);

    const data = await response.json();

    showMessage("");

    return data.results;

  }

  catch (error) {

    showMessage("Erro ao carregar filmes");

    console.log(error);

  }

}


// ===============================
// CRIAR CARD
// ===============================

function createMovieCard(movie) {

  const col = document.createElement("div");

  col.classList.add("col-md-4");


  const card = document.createElement("div");

  card.classList.add("card", "h-100", "shadow");


  card.innerHTML = `

    <img
      src="${IMAGE_URL + movie.poster_path}"
      class="card-img-top"
      alt="${movie.title}"
    >

    <div class="card-body">

      <h5 class="card-title">
        ${movie.title}
      </h5>

      <p class="card-text">
        ${movie.overview.substring(0, 120)}...
      </p>

      <p>
        ⭐ Nota: ${movie.vote_average}
      </p>

      <p>
        📅 ${movie.release_date}
      </p>

    </div>

  `;

  col.appendChild(card);

  return col;

}


// ===============================
// RENDERIZAR FILMES
// ===============================

function renderMovies(movies) {

  movieList.innerHTML = "";

  if (!movies || movies.length === 0) {

    showMessage("Nenhum filme encontrado");

    return;

  }

  movies.forEach(movie => {

    const card = createMovieCard(movie);

    movieList.appendChild(card);

  });

}


// ===============================
// BOTÃO PESQUISA
// ===============================

btnSearch.addEventListener("click", async () => {

  const query = searchInput.value;

  const movies = await fetchMovies(query);

  renderMovies(movies);

});


// ===============================
// ENTER NO INPUT
// ===============================

searchInput.addEventListener("keypress", async (event) => {

  if (event.key === "Enter") {

    const query = searchInput.value;

    const movies = await fetchMovies(query);

    renderMovies(movies);

  }

});


// ===============================
// INICIAR SITE
// ===============================

async function init() {

  const movies = await fetchMovies();

  renderMovies(movies);

}

init();
