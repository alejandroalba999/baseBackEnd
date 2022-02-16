//agrupa todos los archivos-rutas
const express = require('express');
const app = express();

app.use('/usuario', require('./usuario'));
app.use(require('./inicio'));
app.use('/login', require('./login'));
app.use('/imagen', require('./imagen'));

module.exports = app;