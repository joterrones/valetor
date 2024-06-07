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
app.get('/api/movil/getequipo', dbMovil.getequipo);
app.get('/api/movil/gettipoproducto', dbMovil.gettipoproducto);
app.get('/api/movil/getproducto', dbMovil.getproducto);
app.get('/api/movil/getventa', dbMovil.getventa);
app.get('/api/movil/getdetalleventa', dbMovil.getdetalleventa);
app.post('/api/movil/insertarventa', dbMovil.insertarventa);
app.post('/api/movil/insertardetalleventa', dbMovil.insertardetalleventa);
app.post('/api/movil/actualizarhorainicio', dbMovil.actualizarhorainicio);
app.post('/api/movil/agregarhoras', dbMovil.agregarhoras);
app.get('/api/movil/gethoraventa', dbMovil.gethoraventa);



server.listen(port, function () {
  console.log('\n')
  console.log(`App running on port yes ${port}.`)
})

