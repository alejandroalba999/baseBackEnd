const mongoose = require('mongoose');
//declarar esquema
let Schema = mongoose.Schema;

let apiSchema = new Schema({
    strRuta: {
        type: String,
        required: [true, 'Por favor ingresa la ruta del api']
    },
    strDescripcion: {
        type: String,
        required: [true, 'Por favor ingresa el nombre la descripción del api']
    }
});

//crea una coleccion
module.exports = mongoose.model('Api', apiSchema);