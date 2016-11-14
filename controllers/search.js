/*jshint esversion: 6 */
const _ = require('lodash');
const async = require('async');
const Videos = require('../models/video');
const User = require('../models/User');
// const videodb = require('../videoDB'); // TODO: QUITAR ESTA PIRATERIA DE AQUI

exports.searching= (req, res) => {
  //llevo el user input a minuscula
  let busqueda = _.toLower(req.query.search);
  let resultados = _.filter(videodb, function(item) {
    //llevo el indice de busqueda a minuscula tambien para que sean compatibles
    let tema = _.toLower(item.theme);
    let bloque = _.toLower(item.block);
    let titulo = _.toLower(item.title);

    if (tema.indexOf(busqueda)>= 0 || bloque.indexOf(busqueda)>= 0 || titulo.indexOf(busqueda)>= 0){
      return item;
    }
  });

  let hits = resultados.length;

  console.log(resultados);

  res.render('search', {
    title: 'Busqueda',
    searchTerm: req.query.search,
    results: resultados,
    hits: hits
    // cantidadDeResultados: TODO: set this up
  });
};
