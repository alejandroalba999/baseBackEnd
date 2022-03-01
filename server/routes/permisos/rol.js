const RolModel = require('../../models/permisos/rol');
const express = require('express')
const app = express.Router();

app.post('/', async (req, res) => {
    try {
        let body = req.body;
        let rol = new RolModel(body);
        let errorModel = rol.validateSync()
        if (errorModel) {
            return res.status(400).json({
                ok: false,
                resp: 500,
                msg: 'Error al intentar registrar el rol.',
                cont: {
                    err: Object.keys(errorModel).length === 0 ? errorModel.message : errorModel
                }
            });
        } else {
            const rolRegistrado = await rol.save()
            if (rolRegistrado) return res.status(200).json({
                ok: true,
                rolRegistrado
            });
        }
    } catch (error) {
        return res.status(400).json({
            ok: false,
            resp: 500,
            msg: 'Error al intentar registrar el rol.',
            cont: {
                err: Object.keys(error).length === 0 ? error.message : error
            }
        });
    }
});


module.exports = app;