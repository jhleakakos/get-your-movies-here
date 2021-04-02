// correct merged comment line
const express = require('express');
const app = express();
const path = require('path');
const ejs = require('ejs');

app.use(express.static(__dirname + '/public'));

app.listen(3000, () => console.log('express listening on port 3000'));
app.engine('ejs', ejs);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.sendFile('index.html', { root: path.join(__dirname, 'views') });
})
