var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define collection and schema for Ocorridos
var Ocorridos = new Schema({
    ocorrido: String,
    data: String,
    time: String,
    tipo: String,
    schoolAppId: String
});

module.exports = mongoose.model('Ocorridos', Ocorridos);