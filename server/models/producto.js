const mongoose = require('mongoose');
//declarar esquema
let Schema = mongoose.Schema;

let schemaCafeteria = new Schema({
    strNombre: {
        type: String,
        required: [true, 'El strNombre es requerido, favor de ingresarlo']
    },
    strDescripcion: {
        type: String,
        required: [true, 'El strDescripción es requerido, favor de ingresarlo']
    },
    nmbPrecio: {
        type: Number,
        required: [true, 'El nmbPrecio es requerido, favor de ingresarlo']
    },
    nmbCantidad: {
        type: Number,
        required: [true, 'El nmbCantidad es requerido, favor de ingresarlo']
    },
    strImagen: String,
    blnActivo: {
        type: Boolean,
        default: true
    }
})

module.exports = mongoose.model('producto', schemaCafeteria)