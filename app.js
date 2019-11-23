const express = require('express')
const app = express();
const PORT = process.env.PORT || 5000
const server = require('http').createServer(app);
const bodyParser = require('body-parser')
const path = require('path')

app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, './landingpage-meetbits')))
app.use((req, res, next) => {
	next();
});
app.use(require('./landingpage-meetbits/index'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

server.listen(PORT, () => {
	console.log(`Escuchando en el puerto ${PORT}`);
});
