const jwt = require('jsonwebtoken');
const colors = require('colors')
const obtenerRol = require('../Libraries/usuarioRol');
require('../config/config');

let verificaToken = async (req, res, next) => {
    try {
        let token = req.get('token');
        if (!token) {
            return res.status(401).json({  //Checa ue la firma sea igual y la hora de expiracion
                ok: false,
                msg: 'No se recibio un token de usuario valido'
            });
        }
        //console.log('hola querido padre, he entrado al middleware pero no te diste cuenta');
        jwt.verify(token, process.env.SEED, async (err, decoded) => {
            if (err) {
                console.log('se denegó el acceso a la ruta', req.originalUrl.red, ' del metodo', req.method.yellow);
                if (err.name = "JsonWebTokenError") {
                    return res.status(401).json({  //Checa ue la firma sea igual y la hora de expiracion
                        ok: false,
                        err,
                        msg: 'El token es invalido'
                    });
                } else {
                    return res.status(401).json({  //Checa ue la firma sea igual y la hora de expiracion
                        ok: false,
                        err,
                        msg: 'El token expiro'
                    });
                }

            }
            const [getUsuario] = await obtenerRol.getRolUsuario(decoded.usuario._id)
            const rol = getUsuario.rol ? getUsuario.rol : undefined;
            const url = req.originalUrl.split('?');
            const originalUrl = url[0] ? url[0] : undefined;
            if (rol) {
                const validarPermisos = rol.apis.map(ret => `${process.env.RUTA}${ret.strRuta}`).find(res => res == originalUrl)
                if (validarPermisos) {
                    console.log('se permitió el acceso a la ruta', req.originalUrl.blue, ' del metodo', req.method.yellow);
                    req.usuario = decoded.usuario;
                    next();
                } else {
                    return res.status(400).json({  //Checa ue la firma sea igual y la hora de expiracion
                        ok: false,
                        msg: 'se denego el acceso a la ruta ' + req.originalUrl,
                        cont: {
                            usuario: getUsuario,
                            msg: 'No cuenta con permisos para acceder a la ruta'
                        }
                    });
                }
            } else {
                return res.status(400).json({  //Checa ue la firma sea igual y la hora de expiracion
                    ok: false,
                    usuario: getUsuario,
                    msg: 'El usuario no cuenta con un rol registrado'
                });
            }

        });
    } catch (error) {
        return error
    }
}

module.exports = {
    verificaToken
}