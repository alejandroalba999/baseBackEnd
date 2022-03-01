const express = require('express');
const app = express.Router();

const usuariosDB = [{ strNombre: 'manuel998' }, { strNombre: 'al998' }, { strNombre: 'b998' }]
app.get('/', (req, res) => {
    return res.status(200).json({
        msg: 'se accedio a la ruta cafeteria',
        data: usuariosDB
    })
})

module.exports = app;