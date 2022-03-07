const express = require('express');
const CafeteriaModel = require('../models/cafeteria');
const app = express.Router();

app.get('/', async (req, res) => {
    const obtenerCafeterias = await CafeteriaModel.find();
    // console.log(obtenerCafeterias);
    return res.status(200).json({
        msg: 'Información obtenida',
        cont: {
            obtenerCafeterias
        }
    })
})

app.post('/', async (req, res) => {
    try {
        const body = new CafeteriaModel(req.body);
        const err = body.validateSync();
        if (err) {
            return res.status(500).json({
                err: 'Sucedio un error',
                cont: {
                    err
                }
            })
        }
        const cafeteriaEncontrada = await CafeteriaModel.find({ strNombre: req.body.strNombre });
        if (cafeteriaEncontrada.length > 0) {
            return res.status(400).json({
                err: 'El nombre de la cafeteria ya se encuentra registrada',
                cont: {
                    cafeteriaEncontrada
                }
            })
        }
        const cafeteriaRegistrada = await body.save();

        if (cafeteriaRegistrada) {
            res.status(200).json({
                msg: 'Se registro la cafeteria de manera correcta',
                cont: {
                    cafeteriaRegistrada
                }
            })
        }

    } catch (error) {
        return res.status(500).json({
            err: 'Sucedio un error',
            cont: {
                error
            }
        })
    }

})

module.exports = app;