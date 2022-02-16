const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const RolModel = require('./permisos/rol');
//declarar esquema
let Schema = mongoose.Schema;

let usuarioSchema = new Schema({
    strNombre: {
        type: String,
        required: [true, 'Por favor ingresa el nombre del usuario']
    },
    strEmail: {
        type: String,
        required: [true, 'Por favor ingresa el email']
    },
    strPassword: {
        type: String,
        required: [true, 'Por favor ingresa la contraseña']
    },
    strDireccion: {
        type: String,
        required: [true, 'Porfavor ingrese la direccion']
    },
    strImagen: String,
    blnEstado: {
        type: Boolean,
        default: true
    },
    aJsnRol: [RolModel.schema]
});
//crea una coleccion
module.exports = mongoose.model('Usuario', usuarioSchema);