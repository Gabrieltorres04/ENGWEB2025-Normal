var express = require('express');
var router = express.Router();
var axios = require('axios'); 

const API_URL = 'http://localhost:25000';

/* GET home page - Lista de todas as edições */
router.get('/', function(req, res, next) {
  axios.get(`${API_URL}/edicoes`)
    .then(response => {
      res.render('edicoesList', { title: 'Lista de Edições Eurovisão', edicoes: response.data });
    })
    .catch(error => {
      console.error("Erro ao buscar edições:", error.message);
      res.render('error', { message: 'Não foi possível carregar as edições.', error: error });
    });
});

/* GET detalhes de uma edição */
router.get('/:id', function(req, res, next) {
  const edicaoId = req.params.id;
  axios.get(`${API_URL}/edicoes/${edicaoId}`)
    .then(response => {
      if (response.data) {
        res.render('edicaoDetails', { title: `Detalhes da Edição ${edicaoId}`, edicao: response.data });
      } else {
        res.render('error', { message: `Edição ${edicaoId} não encontrada.`, error: { status: 404 } });
      }
    })
    .catch(error => {
      console.error(`Erro ao buscar detalhes da edição ${edicaoId}:`, error.message);
      res.render('error', { message: `Não foi possível carregar os detalhes da edição ${edicaoId}.`, error: error });
    });
});

/* GET detalhes de um país */
router.get('/paises/:pais', function(req, res, next) {
  const nomePais = req.params.pais;
  axios.get(`${API_URL}/edicoes/completo`)
    .then(response => {
      const todasEdicoes = response.data;
      const participacoes = [];
      const organizacoes = [];

      todasEdicoes.forEach(edicao => {
        if (edicao.musicas && Array.isArray(edicao.musicas)) {
          edicao.musicas.forEach(musica => {
            if (musica.pais === nomePais) {
              participacoes.push({
                idEdicao: edicao._id,
                ano: edicao.anoEdicao,
                musica: musica.titulo,
                interprete: musica.interprete,
                venceu: edicao.vencedor === nomePais
              });
            }
          });
        }
        if (edicao.organizacao === nomePais) {
          organizacoes.push({
            idEdicao: edicao._id,
            ano: edicao.anoEdicao
          });
        }
      });

      if (participacoes.length === 0 && organizacoes.length === 0) {
         const paisExisteComoVencedor = todasEdicoes.some(ed => ed.vencedor === nomePais);
         if (!paisExisteComoVencedor) {
            return res.render('error', { message: `País "${nomePais}" não encontrado nos registos.`, error: {status: 404} });
         }
      }
      
      res.render('paisDetails', {
        title: `Detalhes do País: ${nomePais}`,
        nomePais: nomePais,
        participacoes: participacoes,
        organizacoes: organizacoes
      });
    })
    .catch(error => {
      console.error(`Erro ao buscar dados para o país ${nomePais}:`, error.message);
      res.render('error', { message: `Não foi possível carregar os dados para o país ${nomePais}.`, error: error });
    });
});

module.exports = router;