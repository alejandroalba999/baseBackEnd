const express = require('express');
require('../config/config');
const app = express();
const ApiModel = require('../models/permisos/api');

app.all('/', async (req, res) => {
    const getApis = await ApiModel.aggregate([{ $project: { _id: 0, strRuta: 1, blnEsMenu: 1 } }]);
    return res.status(200).json({
        ok: true,
        msg: 'Indice del servidor cafeteria',
        cont: {
            rutas: getApis.map(res => { return { strRuta: `${process.env.RUTA}${res.strRuta}`, blnEsMenu: res.blnEsMenu } })
        }
    });

});

module.exports = app;