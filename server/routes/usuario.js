const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore');
const { verificaToken } = require('../middlewares/autenticacion');
const subidorArchivos = require('../Libraries/subirArchivo');
const Usuario = require('../models/usuario')
const app = express.Router();


app.get('/', verificaToken, async (req, res) => {
    try {
        const getUser = await Usuario.find();
        if (getUser.length > 0) {
            return res.status(200).json({
                msg: 'Se obtuvo la información correctamente',
                count: getUser.length,
                cont: {
                    usuario: getUser
                }
            })
        } else {
            return res.status(200).json({
                msg: 'No se encontrarón usuarios',
                count: getUser.length,
                cont: {
                    usuario: getUser
                }
            })
        }

    } catch (error) {
        return res.status(400).json({
            msg: 'Error al obtener la información del usuario',
            err: {
                error
            }
        })
    }
});
app.post('/', verificaToken, async (req, res) => {
    try {
        let body = { ...req.body, strPassword: req.body.strPassword ? bcrypt.hashSync(req.body.strPassword, 10) : '' };
        let usuario = new Usuario(body);
        let errorModel = usuario.validateSync()
        if (errorModel) {
            return res.status(400).json({
                ok: false,
                resp: 500,
                msg: 'Error al intentar registrar un usuario.',
                cont: {
                    err: Object.keys(errorModel).length === 0 ? errorModel.message : errorModel
                }
            });
        } else {
            if (req.files) {
                usuario.strImagen = await subidorArchivos.subirArchivo(req.files.strImagen, 'usuario', ['image/jpeg', 'image/png', 'image/gif']);
            }
            const usuarioRegister = await usuario.save()
            if (usuarioRegister) return res.status(200).json({
                ok: true,
                usuarioRegister
            });
        }
    } catch (error) {
        return res.status(400).json({
            ok: false,
            resp: 500,
            msg: 'Error al intentar registrar un usuario.',
            cont: {
                err: Object.keys(error).length === 0 ? error.message : error
            }
        });
    }
});
app.put('/:id', verificaToken, async (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['strNombre', 'strEmail', 'strPassword', 'strDireccion']); //FILTRAR del body, on el pick seleccionar los campos que interesan del body 
    //id 'su coleccion, new -> si no existe lo inserta, runVali-> sirve para validar todas las condiciones del modelo 
    await Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' }, (err, usrDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        return res.status(200).json({
            ok: true,
            usrDB
        });

    });
});

app.delete('/:id', verificaToken, async (req, res) => {
    let id = req.params.id;
    await Usuario.findByIdAndUpdate(id, { blnEstado: false }, { new: true, runValidators: true, context: 'query' }, (err, resp) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        return res.status(200).json({
            ok: true,
            resp
        });
    });
});

module.exports = app;