const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');
const app = express();

app.post('/', (req, res) => {
    let body = req.body;

    Usuario.findOne({ strEmail: body.strEmail, blnEstado: true }, (err, usrDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        if (!usrDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario y/o contraseña incorrecta'
                }
            });
        }

        if (!bcrypt.compareSync(body.password, usrDB.password)) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario y/o *contraseña incorrecta'
                }
            });
        }

        let token = jwt.sign({
            usuario: usrDB
        }, process.env.SEED, { expiresIn: process.env.CADUCIDAD_TOKEN });

        return res.status(200).json({
            ok: true,
            usuario: usrDB,
            token
        });
    });
});

module.exports = app;