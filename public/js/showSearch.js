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
        for (let genre of item.show.genres) {
            genres += `<li class="list-group-item">${genre}</li>`; 
        }
        const card = `<div class="col-3 card mb-5">
                        <div class="show-poster">
                            <img src="${
                                (item.show.image === null ? '#' :
                                (item.show.image.medium !== null ? item.show.image.medium :
                                (item.show.image.original !== null ?
                                item.show.image.original : null)))
                            }">
                        </div>
                        <div class="card-body">
                            <div class="card-title">
                                <h3>${item.show.name}</h3>
                            </div>
                            <p class="card-text">${item.show.summary}</p>
                            <h4>Genres</h4>
                            <ul class="list-group list-group-flush">
                                ${genres}
                            </ul>
                            <a href="/shows" method="POST" class="btn btn-primary mt-5 stretched-link">Add Show</a>
                        </div>
                    </div>`
        list.innerHTML += card;
    }
};
