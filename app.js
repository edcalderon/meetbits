const express = require('express')
const app = express();
const PORT = process.env.PORT || 3001
const path = require('path')
const server = require('http').createServer(app);

app.use(express.static(path.join(__dirname, './landingpage-meetbits')))

app.use((req, res, next) => {
	next();
});

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
server.listen(PORT, () => {
	console.log(`Escuchando en el puerto ${PORT}`);
});

app.get('/',  (req, res) => {
    res.render('.index.html', {})
})
