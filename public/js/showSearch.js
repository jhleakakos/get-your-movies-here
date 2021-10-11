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
    const results = await fetch(`/shows/new/${search.value}`);
    const json = await results.json();
    search.value = '';

    for (let item of json) {
        let genres = '';
        let genreString = '';
        for (let genre of item.show.genres) {
            genres += `<li class="list-group-item">${genre}</li>`; 
            genreString += `${genre}, `;
        }
        genreString = genreString.slice(0, -2);

        const card = `<div class="col-3 card mb-5 bg-secondary text-light">

                        <div class="card-header mb-3">
                            <form action="/shows/new" method="POST" class="d-flex">
                                <div>
                                    <label class="form-label for="inventory">Inventory</label>
                                    <input class="form-control" type="number" id="inventory" name="inventory" value="2" min="0" max="5" required>
                                </div>
                                <button class="btn btn-primary mt-3 ms-2">Add</button>
                                <input type="hidden" id="tvmazeID" name="tvmazeID" value="${item.show.id}">
                                <input type="hidden" id="name" name="name" value="${item.show.name}">
                                <input type="hidden" id="genres" name="genres" value="${genreString}">
                                <input type="hidden" id="poster" name="poster" value="${
                                    (item.show.image === null ? '#' :
                                    (item.show.image.medium !== null ? item.show.image.medium :
                                    (item.show.image.original !== null ?
                                    item.show.image.original : null)))
                                }">
                                <input type="hidden" id="summary" name="summary" value="${item.show.summary || 'needs a desription'}">
                            </form>
                        </div>

                        <img src="${
                            (item.show.image === null ? '#' :
                            (item.show.image.medium !== null ? item.show.image.medium :
                            (item.show.image.original !== null ?
                            item.show.image.original : null)))
                        }">
                        <div class="card-body d-flex flex-column justify-content-between">
                            <div>
                                <div class="card-title">
                                    <h3>${item.show.name}</h3>
                                </div>
                                <p class="card-text">${item.show.summary}</p>
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
