const mongoose = require('mongoose');

//declarar esquema
let Schema = mongoose.Schema;

let rolSchema = new Schema({
    strNombre: {
        type: String,
        required: [true, 'Por favor ingresa el nombre del rol']
    },
    arrApi: []
});

//crea una coleccion
module.exports = mongoose.model('Rol', rolSchema);