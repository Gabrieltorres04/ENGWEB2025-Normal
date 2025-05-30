const Edicao = require('../models/edicao');

// GET /edicoes: Lista todas as edições (campos: anoEdição, organizador e vencedor)
module.exports.listarEdicoes = () => {
    return Edicao
        .find({}, { anoEdicao: 1, organizacao: 1, vencedor: 1 }) 
        .sort({ anoEdicao: 1 }) 
        .exec();
};

// GET /edicoes/completo: Lista todas as edições com todos os campos (Para usar na interface)
module.exports.listarEdicoesCompleto = () => {
    return Edicao
        .find({}) 
        .sort({ anoEdicao: 1 })
        .exec();
};

// GET /edicoes/:id: Devolve informação da edição com identificador id
module.exports.consultarEdicao = (id) => {
    return Edicao
        .findOne({ _id: id })
        .exec();
};

// GET /edicoes?org=EEEE: Devolve lista de edições organizadas por EEEE
module.exports.listarEdicoesPorOrganizador = (org) => {
    return Edicao
        .find({ organizacao: org }, { anoEdicao: 1, organizacao: 1, vencedor: 1 })
        .sort({ anoEdicao: 1 })
        .exec();
};

// GET /paises?papel=org: Devolve lista de países organizadores
module.exports.listarPaisesOrganizadores = () => {
    return Edicao.aggregate([
        { $group: { _id: "$organizacao", anos: { $addToSet: "$anoEdicao" } } },
        { $sort: { _id: 1 } },
        { $project: { pais: "$_id", anosOrganizou: "$anos", _id: 0 } }
    ]).exec();
};

// GET /paises?papel=venc: Devolve lista de países vencedores
module.exports.listarPaisesVencedores = () => {
    return Edicao.aggregate([
        { $match: { vencedor: { $ne: null, $ne: "" } } },
        { $group: { _id: "$vencedor", anos: { $addToSet: "$anoEdicao" } } },
        { $sort: { _id: 1 } },
        { $project: { pais: "$_id", anosVenceu: "$anos", _id: 0 } }
    ]).exec();
};

// GET /interpretes: Devolve lista de intérpretes com nome e país
module.exports.listarInterpretes = () => {
    return Edicao.aggregate([
        { $unwind: "$musicas" },
        { $group: { 
            _id: { interprete: "$musicas.interprete", pais: "$musicas.pais" }
        }},
        { $sort: { "_id.interprete": 1, "_id.pais": 1 } },
        { $project: { interprete: "$_id.interprete", pais: "$_id.pais", _id: 0 } }
    ]).exec();
};

// POST /edicoes: Acrescenta uma nova edição
module.exports.inserirEdicao = (edicao) => {
    if (!edicao._id) {
        edicao._id = "ed" + edicao.anoEdicao; // Gera um ID baseado no ano da edição
    }
    const novaEdicao = new Edicao(edicao);
    return novaEdicao.save();
};

// DELETE /edicoes/:id: Elimina a edição com o identificador id
module.exports.removerEdicao = (id) => {
    return Edicao
        .deleteOne({ _id: id })
        .exec();
};

// PUT /edicoes/:id: Altera a edição com o identificador id
module.exports.alterarEdicao = (id, edicao) => {
    return Edicao
        .findOneAndUpdate({ _id: id }, edicao, { new: true }) 
        .exec();
};