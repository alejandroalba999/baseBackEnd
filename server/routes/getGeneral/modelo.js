const express = require('express');
const { verificaToken } = require('../../middlewares/autenticacion');
const app = express.Router();

app.get('/', verificaToken, async (req, res) => {
    const strModelo = req.query.strModelo;
    try {
        if (!strModelo) {
            return res.status(200).json({
                msg: 'No se recibio un strModelo'
            })
        }
        const model = require(`../../models/${strModelo}`);
        const data = await model.find();
        if (data) {
            return res.status(400).json({
                msg: `Se consulto la información correctamente del modelo ${strModelo}`,
                modelo: strModelo,
                count: data.length,
                cont: {
                    data
                }
            })
        } else {
            return res.status(400).json({
                msg: `El modelo ${strModelo} no cuenta con datos`,
                err: {
                    data
                }
            })
        }
    } catch (error) {
        return res.status(400).json({
            msg: error.code ? `No se encontro el modelo ${strModelo}` : error,
            err: {
                error
            }
        })
    }

})




module.exports = app;