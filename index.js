const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const clienteRoutes = require('./routes/clientes');
const piezasRoutes = require('./routes/piezas');

app.use(bodyParser.json());
app.use('/clientes', clienteRoutes);
app.use('/piezas', piezasRoutes);

module.exports = app;
