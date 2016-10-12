/*jshint esversion: 6 */
const _ = require('lodash');
const async = require('async');
const Videos = require('../models/Video');
const Block = require('../models/Block');

var lista = [];
var filtrado = [];
var BlockAgreggator = [];

// Videos.find((err, videos) => {
//   lista = videos;
//   for (var i = 0; i < lista.length; i++) {
//     filtrado = _.uniqBy(lista, 'block');
//   }
//   filtrado.map((e)=>{
//       console.log(e.block);
//   });
// });


exports.ultimosVideos = (req, res) => {
   res.render('videos/nuevos', {
     title: 'Videos'
   });
 };

 exports.verVideo = (req, res) => {
   res.render('videos/ver', {
     title: req.query.name + ' - TuProfesorVirtual'
   });
 };

 exports.materias = (req, res) => {

   Block.find((err,blocks)=>{
     blocks.map((e)=>{
       return e.title;
     });
   });

   res.render('videos/materias', {
     title: 'Materias'
   });
 };
