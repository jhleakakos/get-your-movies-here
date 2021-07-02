const search = document.querySelector('#search');
const list = document.querySelector('#results');
const btn = document.querySelector('#searchBtn');

console.log('script loaded');

btn.addEventListener('click', (e) => {
    e.preventDefault();
    const res = search.value;
    search.value = '';

    const li = document.createElement('li');
    li.innerText = res;
    list.append(li);

    console.log(res);
});