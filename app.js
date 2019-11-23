const express = require('express')
const app = express();
const { PORT } = require('./config.js')
const path = require('path')

app.use(express.static(path.join(__dirname, './landingpage-meetbits')))

app.use((req, res, next) => {
	next();
});

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.listen(PORT, () => {
	console.log(`Escuchando en el puerto ${PORT}`);
});

app.get('/',  (req, res) => {
    res.render('.index.html', {})
})
