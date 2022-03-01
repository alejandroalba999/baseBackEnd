//agrupa todos los archivos-rutas
const express = require('express');
const app = express();

app.use('/usuario', require('./usuario'));
app.use(require('./inicio'));
app.use('/login', require('./Auth/login'));
app.use('/imagen', require('./imagen'));
app.use('/modelo', require('./getGeneral/modelo'));
app.use('/permisos/rol', require('./permisos/rol'));
app.use('/permisos/api', require('./permisos/api'));


module.exports = app;