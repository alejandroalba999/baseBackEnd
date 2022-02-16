const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore');
const { verificaToken } = require('../middlewares/autenticacion');
const Usuario = require('../models/usuario'); //subir nivel
const subidorArchivos = require('../Libraries/subirArchivo');
const app = express.Router();


app.get('/', verificaToken, async (req, res) => {
    await Usuario.find({ blnEstado: true }) //select * from usuario where estado=true
        //solo aceptan valores numericos
        .exec((err, usuarios) => { //ejecuta la funcion
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            return res.status(200).json({
                ok: true,
                count: usuarios.length,
                usuarios
            });
        });
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
                console.log('img');
                // usuario.strImagen = await subidorArchivos.subirArchivo(req.files.strImagen, 'usuario', ['image/jpeg', 'image/png', 'image/gif']);
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