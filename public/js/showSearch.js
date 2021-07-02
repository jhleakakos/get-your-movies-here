const search = document.querySelector('#search');
const list = document.querySelector('#results');
const btn = document.querySelector('#searchBtn');

console.log('script loaded');

btn.addEventListener('click', async (e) => {
    e.preventDefault();
    const res = await getShows(search.value);
    search.value = '';

    const li = document.createElement('li');
    li.innerText = res;
    list.append(li);

    console.log(res);
});

const getShows = async (searchTerm) => {
    const results = await fetch(`http://api.tvmaze.com/search/shows?q=${searchTerm}`);
    const json = await results.json();
    console.log(json);
    return json;
}