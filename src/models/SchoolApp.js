var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define collection and schema for School
var SchoolApp = new Schema({
    schoolName: String,
    email: String,
    schoolLogo: String,
    endereco: String,
    unidadeCodigo: String,
    unidades: [{
        type: Schema.Types.ObjectId,
        ref: 'Unidades'
    }]
});

module.exports = mongoose.model('SchoolApp', SchoolApp);