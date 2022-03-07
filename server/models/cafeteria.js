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
    }
})

module.exports = mongoose.model('cafeteria', schemaCafeteria)