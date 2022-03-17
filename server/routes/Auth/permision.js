const express = require('express');
const getRol = require('../../Libraries/usuarioRol');
const { verificaToken } = require('../../middlewares/autenticacion');
const app = express();

app.post('/', async (req, res) => {
    const idUsuario = req.body.idUsuario;
    const strUrl = req.body.strUrl;
    try {
        if (!idUsuario || !strUrl) {
            return res.status(400).json({
                msg: 'No se recibio el identificador de usuario o la strRuta',
                cont: {
                    idUsuario,
                    strUrl
                }
            })
        }
        const [getRolUsuario] = await getRol.getRolUsuario(idUsuario);
        const encontrarRutaUsuario = getRolUsuario.rol ? getRolUsuario.rol.apis ? getRolUsuario.rol.apis.find(res => res.strRuta == strUrl) : undefined : undefined;
        if (encontrarRutaUsuario) {
            return res.status(200).json({
                msg: 'Se obtuvo la información correctamente',
                cont: {
                    encontrarRutaUsuario
                }
            })
        } else {
            return res.status(400).json({
                msg: 'El usuario no cuenta con permiso para acceder a la Ruta ' + strUrl,
                cont: {
                    strUrl
                }
            })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Error del servidor',
            err: {
                error
            }
        })
    }
})
app.post('/modulos', async (req, res) => {
    const idUsuario = req.body.idUsuario;
    try {
        if (!idUsuario) {
            return res.status(400).json({
                msg: 'No se recibio el identificador de usuario o la strRuta',
                cont: {
                    idUsuario,
                }
            })
        }
        const [getRolUsuario] = await getRol.getRolUsuario(idUsuario);
        if (getRolUsuario) {
            return res.status(200).json({
                msg: 'Se obtuvo la información correctamente',
                cont: {
                    modulos: getRolUsuario.rol ? getRolUsuario.rol.apis ? getRolUsuario.rol.apis.filter(modulos => modulos.blnEsMenu == true) : [] : []
                }
            })
        } else {
            return res.status(400).json({
                msg: 'No se encontraro el rol del usuario',
                cont: {
                    getRolUsuario
                }
            })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Error del servidor',
            err: {
                error
            }
        })
    }
})

module.exports = app;