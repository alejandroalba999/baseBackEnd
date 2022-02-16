const express = require('express');
const { verificaToken } = require('../middlewares/autenticacion');
const app = express();

app.all('/', verificaToken, (req, res) => {
    return res.status(200).json({
        ok: true,
        msg: 'Inicio del backend ',
    });

});

module.exports = app;