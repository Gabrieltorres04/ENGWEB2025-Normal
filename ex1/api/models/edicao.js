const mongoose = require('mongoose');

const musicaSchema = new mongoose.Schema({
    _id: String, 
    link: String,
    titulo: String,
    pais: String,
    compositor: String,
    interprete: String,
    letra: String
}, { _id: false }); 

const edicaoSchema = new mongoose.Schema({
    _id: String, 
    anoEdicao: String,
    organizacao: String,
    vencedor: String, // Pode ser null
    musicas: [musicaSchema]
}, { versionKey: false });

module.exports = mongoose.model('edicao', edicaoSchema, 'edicoes');