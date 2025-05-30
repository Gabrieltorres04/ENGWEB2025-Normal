var express = require('express');
var router = express.Router();
var Edicao = require('../controllers/edicao'); 

/* GET /paises?papel=org ou /paises?papel=venc */
router.get('/', function(req, res, next) {
  if (req.query.papel === 'org') {
    Edicao.listarPaisesOrganizadores()
      .then(dados => res.status(200).jsonp(dados))
      .catch(erro => res.status(500).jsonp({ error: erro.message }));
  } else if (req.query.papel === 'venc') {
    Edicao.listarPaisesVencedores()
      .then(dados => res.status(200).jsonp(dados))
      .catch(erro => res.status(500).jsonp({ error: erro.message }));
  } else {
    res.status(400).jsonp({ error: "Parâmetro 'papel' inválido ou em falta. Use 'org' ou 'venc'." });
  }
});

module.exports = router;