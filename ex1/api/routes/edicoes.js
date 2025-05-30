var express = require('express');
var router = express.Router();
var Edicao = require('../controllers/edicao');

/* GET /edicoes ou /edicoes?org=EEEE */
router.get('/', function(req, res, next) {
  if (req.query.org) {
    Edicao.listarEdicoesPorOrganizador(req.query.org)
      .then(dados => res.status(200).jsonp(dados))
      .catch(erro => res.status(500).jsonp(erro));
  } else {
    Edicao.listarEdicoes()
      .then(dados => res.status(200).jsonp(dados))
      .catch(erro => res.status(500).jsonp(erro));
  }
});

/* GET /edicoes/completo - Lista todas as edições com todos os detalhes */
router.get('/completo', function(req, res, next) {
  Edicao.listarEdicoesCompleto()
    .then(dados => res.status(200).jsonp(dados))
    .catch(erro => res.status(500).jsonp({ error: erro.message }));
});

/* GET /edicoes/:id */
router.get('/:id', function(req, res, next) {
  Edicao.consultarEdicao(req.params.id)
    .then(dados => res.status(200).jsonp(dados))
    .catch(erro => res.status(500).jsonp(erro));
});

/* POST /edicoes */
router.post('/', function(req, res, next) {
  Edicao.inserirEdicao(req.body)
    .then(dados => res.status(201).jsonp(dados)) // 201 Created
    .catch(erro => res.status(500).jsonp(erro));
});

/* DELETE /edicoes/:id */
router.delete('/:id', function(req, res, next) {
  Edicao.removerEdicao(req.params.id)
    .then(dados => {
      // O resultado de deleteOne é um objeto com deletedCount
      if (dados.deletedCount > 0) {
        res.status(200).jsonp(dados);
      } else {
        res.status(404).jsonp({erro: "Edição não encontrada"});
      }
    })
    .catch(erro => res.status(500).jsonp(erro));
});

/* PUT /edicoes/:id */
router.put('/:id', function(req, res, next) {
  Edicao.alterarEdicao(req.params.id, req.body)
    .then(dados => {
      if (dados) {
        res.status(200).jsonp(dados);
      } else {
        res.status(404).jsonp({erro: "Edição não encontrada"});
      }
    })
    .catch(erro => res.status(500).jsonp(erro));
});

module.exports = router;