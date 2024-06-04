const express = require('express')
var jwt = require('jsonwebtoken')
var bodyParser = require('body-parser')
var cors = require('cors');
var multer = require('multer');
const fs = require('fs'); 
const dbMovil = require('./dal/movil')


const app = express()
const port = 3800

const server = require('http').Server(app);

const ruta = '/archivos';
const icon = '/icons';

app.use(bodyParser.json({ limit: '1000mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '1000mb' }));

app.use(cors());
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)


app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.use('/archivos', express.static(__dirname + ruta));
app.use('/icons', express.static(__dirname + icon));

/* Movil */
app.post('/api/movil/getusuario', dbMovil.getusuario);
app.get('/api/movil/getdato', dbMovil.getdato);

server.listen(port, function () {
  console.log('\n')
  console.log(`App running on port yes ${port}.`)
})

