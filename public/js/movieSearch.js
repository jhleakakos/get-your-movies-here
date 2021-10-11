const search = document.querySelector('#search');
const list = document.querySelector('#results');
const searchBtn = document.querySelector('#searchBtn');
const clearBtn = document.querySelector('#clearBtn');
const clearSearchBtn = document.querySelector('#clearSearchBtn');


searchBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    await getResults();
});

clearBtn.addEventListener('click', (e) => {
    e.preventDefault();
    clearResults();
});

clearSearchBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    clearResults();
    await getResults();
});

const clearResults = () => {
    list.innerHTML = '';
};

const getResults = async () => {
    const results = await fetch(`/movies/new/${search.value}`);
    const json = await results.json();
    search.value = '';

    const baseUrl = 'https://image.tmdb.org/t/p/';
    const size = 'w500';

    for (let item of json.results) {
        let genres = '';
        let genreString = '';
        for (let genre of item.genreNames) {
            genres += `<li class="list-group-item bg-secondary text-light">${genre.movieGenreName}</li>`; 
            genreString += `${genre.movieGenreName}, `;
        }
        genreString = genreString.slice(0, -2);

        const card = `<div class="col-3 card mb-5 bg-secondary text-light">

                        <div class="card-header mb-3">
                            <form action="/movies/new" method="POST" class="d-flex">
                                <div>
                                    <label class="form-label for="inventory">Inventory</label>
                                    <input class="form-control" type="number" id="inventory" name="inventory" value="2" min="0" max="5" required>
                                </div>
                                <button class="btn btn-primary mt-3 ms-2">Add</button>
                                <input type="hidden" id="tmdbID" name="tmdbID" value="${item.id}">
                                <input type="hidden" id="name" name="name" value="${item.original_title}">
                                <input type="hidden" id="genres" name="genres" value="${genreString}">
                                <input type="hidden" id="poster" name="poster" value="${baseUrl.concat(size, item.poster_path)}">
                                <input type="hidden" id="overview" name="overview" value="${item.overview.replace(/<\/?.>/g, ' ')}">
                            </form>
                        </div>

                        <img src="${baseUrl.concat(size, item.poster_path)}">
                        <div class="card-body d-flex flex-column justify-content-between">
                            <div>
                                <div class="card-title">
                                    <h3>${item.original_title}</h3>
                                </div>
                                <p class="card-text">${item.overview.replace(/<\/?.>/g, ' ')}</p>
                            </div>
                            <div class="mt-5">
                                <h4 class="border-top pt-2">Genres</h4>
                                <ul class="list-group list-group-flush">
                                    ${genres}
                                </ul>
                            </div>
                        </div>
                    </div>`
        list.innerHTML += card;
    }
};
