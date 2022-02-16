const jwt = require('jsonwebtoken');
const colors = require('colors')
let verificaToken = (req, res, next) => {
    let token = req.get('token');
    if (!token) {
        return res.status(401).json({  //Checa ue la firma sea igual y la hora de expiracion
            ok: false,
            msg: 'No se recibio un token de usuario valido'
        });
    }
    //console.log('hola querido padre, he entrado al middleware pero no te diste cuenta');
    jwt.verify(token, process.env.SEED, (err, decoded) => {
        if (err) {
            console.log('se denegó el acceso a la ruta', req.originalUrl.red, ' del metodo', req.method.yellow);
            return res.status(401).json({  //Checa ue la firma sea igual y la hora de expiracion
                ok: false,
                err,
                msg: 'El token es invalido o expiro'
            });
        }
        console.log('se permitió el acceso a la ruta', req.originalUrl.blue, ' del metodo', req.method.yellow);
        req.usuario = decoded.usuario;
        next();
    });
}

module.exports = {
    verificaToken
}