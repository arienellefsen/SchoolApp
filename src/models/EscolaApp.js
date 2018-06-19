var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define collection and schema for School
var EscolaApp = new Schema({
    schoolName: String,
    email: String,
    schoolLogo: String,
    endereco: String,
    unidadeCodigo: String
});

module.exports = mongoose.model('EscolaApp', EscolaApp);