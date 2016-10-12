/*jshint esversion: 6 */
const _ = require('lodash');
const async = require('async');
const Videos = require('../models/Video');
const User = require('../models/User');

exports.searching= (req, res) => {
  res.render('search', {
    title: 'Busqueda',
    searchTerm: req.query.search,
    // cantidadDeResultados: TODO: set this up
  });
};
