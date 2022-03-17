const ApiModel = require('../../models/permisos/api');
const express = require('express');
const { verificaToken } = require('../../middlewares/autenticacion');
const app = express.Router();


app.post('/', verificaToken, async (req, res) => {
    try {
        let body = req.body;
        let api = new ApiModel(body);
        let errorModel = api.validateSync()
        if (errorModel) {
            return res.status(400).json({
                ok: false,
                resp: 500,
                msg: 'Error al intentar registrar el api.',
                cont: {
                    err: Object.keys(errorModel).length === 0 ? errorModel.message : errorModel
                }
            });
        } else {
            const encontrarRuta = await ApiModel.findOne({ strRuta: req.body.strRuta });
            if (encontrarRuta) {
                return res.status(400).json({
                    ok: false,
                    resp: 500,
                    msg: 'La ruta ya se encuentra registrada en el modelo API.',
                    err: {
                        encontrarRuta
                    }
                });
            } else {
                const apiRegistrado = await api.save()
                if (apiRegistrado) return res.status(200).json({
                    ok: true,
                    apiRegistrado
                });
            }
        }
    } catch (error) {
        return res.status(400).json({
            ok: false,
            resp: 500,
            msg: 'Error al intentar registrar el api.',
            cont: {
                err: Object.keys(error).length === 0 ? error.message : error
            }
        });
    }
});

module.exports = app;