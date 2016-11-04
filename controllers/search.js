/*jshint esversion: 6 */
const _ = require('lodash');
const async = require('async');
const Videos = require('../models/video');
const User = require('../models/User');
const videodb = require('../videodb'); // TODO: QUITAR ESTA PIRATERIA DE AQUI

exports.searching= (req, res) => {
  //llevo el user input a minuscula
  let busqueda = _.toLower(req.query.search);
  let resultados = _.filter(videodb, function(item) {
    //llevo el indice de busqueda a minuscula tambien para que sean compatibles
    let indice = _.toLower(item.theme);
    if (indice.indexOf(busqueda)>= 0){
      return item;
    }

  });

  console.log(resultados);

  res.render('search', {
    title: 'Busqueda',
    searchTerm: req.query.search,
    results: resultados
    // cantidadDeResultados: TODO: set this up
  });
};
