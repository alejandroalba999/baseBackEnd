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
            return res.status(400).json({
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
            return res.status(200).json({
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


app.put('/', async (req, res) => {
    const idCafeteria = req.query.idCafeteria;
    try {
        if (!idCafeteria || idCafeteria.length != 24) {
            return res.status(400).json({
                msg: 'No se recibio el parametro idCafeteria',
                cont: {
                    idCafeteria
                }
            })
        }
        const cafeteriaActualizada = await CafeteriaModel.findByIdAndUpdate({ _id: idCafeteria }, { strNombre: req.body.strNombre, strDescripcion: req.body.strDescripcion }, { new: true })
        if (cafeteriaActualizada) {
            return res.status(200).json({
                msg: 'Cafeteria actualizada de manera exitosa',
                cont: {
                    cafeteriaActualizada
                }
            })
        } else {
            return res.status(400).json({
                msg: 'Error al actualizar la cafeteria',
                cont: {
                    cafeteriaActualizada
                }
            })
        }
    } catch (error) {
        return res.status(500).json({
            msg: 'Error en el servidor al actualizar la cafeteria',
            cont: {
                error
            }
        })
    }
})

app.delete('/', async (req, res) => {
    const idCafeteria = req.query.idCafeteria;
    const blnActivo = req.body.blnActivo;
    try {
        if (!idCafeteria || idCafeteria.length != 24) {
            return res.status(400).json({
                msg: 'No se recibio el parametro idCafeteria',
                cont: {
                    idCafeteria
                }
            })
        }
        if (!blnActivo) {
            return res.status(400).json({
                msg: 'No se recibio el parametro blnActivo',
                cont: {
                    blnActivo
                }
            })
        }
        const cafeteriaActualizada = await CafeteriaModel.findByIdAndUpdate({ _id: idCafeteria }, { blnActivo: blnActivo }, { new: true })
        if (cafeteriaActualizada) {
            return res.status(200).json({
                msg: `La cafeteria se ${blnActivo == 'true' ? 'activo' : 'desactivo'} de manera exitosa`,
                cont: {
                    cafeteriaActualizada
                }
            })
        } else {
            return res.status(400).json({
                msg: 'Error al desactivar la cafeteria',
                cont: {
                    cafeteriaActualizada
                }
            })
        }
    } catch (error) {
        return res.status(500).json({
            msg: 'Error en el servidor al desactivar la cafeteria',
            cont: {
                error
            }
        })
    }
})

module.exports = app;