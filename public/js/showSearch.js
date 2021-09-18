const search = document.querySelector('#search');
const list = document.querySelector('#results');
const searchBtn = document.querySelector('#searchBtn');
const clearBtn = document.querySelector('#clearBtn');

clearBtn.addEventListener('click', (e) => {
    e.preventDefault();
    list.innerHTML = '';
});

searchBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    const res = await getShows(search.value);
    search.value = '';

//    for (let item of res) {
//        const li = document.createElement('li');
//        li.innerText = item.show.name;
//        list.append(li);
//    }

    for (let item of res) {
        let genres = '';
        for (let genre of item.show.genres) {
            genres += `<li class="list-group-item">${genre}</li>`; 
        }
        const card = `<div class="col-3 card mb-5">
                        <div class="show-poster">
                            <img src="${
                                (item.show.image === null ? null :
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
                        </div>
                    </div>`
        list.innerHTML += card;
    }
});

const getShows = async (searchTerm) => {
    const results = await fetch(`http://api.tvmaze.com/search/shows?q=${searchTerm}`);
    const json = await results.json();
    return json;
}
