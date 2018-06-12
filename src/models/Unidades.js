var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Unidades = new mongoose.Schema({
    nomeUnidade: String,
    unidadeCodigo: String,
    endereco: String,
    email: String,
    phone: String,
});

module.exports = mongoose.model("Unidades", Unidades);