const mongoose = require('mongoose');
//declarar esquema
let Schema = mongoose.Schema;

let apiSchema = new Schema({
    strNombre: {
        type: String,
        required: [true, 'Por favor ingresa el nombre de la ruta']
    },
    strIcono: {
        type: String,
        required: [true, 'Por favor ingresa un icono a la ruta']
    },
    strRuta: {
        type: String,
        required: [true, 'Por favor ingresa la ruta del api']
    },
    strDescripcion: {
        type: String,
        required: [true, 'Por favor ingresa la descripción del api']
    },
    blnEsMenu: {
        type: Boolean,
        default: false
    }
});

//crea una coleccion
module.exports = mongoose.model('Api', apiSchema);