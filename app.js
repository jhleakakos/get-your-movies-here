const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(__dirname + '/public'));

app.listen(3000, () => console.log('express listening on port 3000'));

app.get('/', (req, res) => {
    res.sendFile('index.html', { root: path.join(__dirname, 'views') });
})
