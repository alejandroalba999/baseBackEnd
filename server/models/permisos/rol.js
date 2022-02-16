const mongoose = require('mongoose');
const ApiModel = require('./api');
//declarar esquema
let Schema = mongoose.Schema;

let rolSchema = new Schema({
    strNombre: {
        type: String,
        required: [true, 'Por favor ingresa el nombre del rol']
    },
    aJsnApi: [ApiModel.schema]
});

//crea una coleccion
module.exports = mongoose.model('Rol', rolSchema);