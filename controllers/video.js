/*jshint esversion: 6 */
const _ = require('lodash');
const async = require('async');
const Videos = require('../models/video');
const Block = require('../models/block');
const videodb = require('../videoDB'); // TODO: QUITAR ESTA PIRATERIA DE AQUI


// Videos.find((err, videos) => {
//   lista = videos;
//   for (var i = 0; i < lista.length; i++) {
//     filtrado = _.uniqBy(lista, 'block');
//   }
//   filtrado.map((e)=>{
//       console.log(e.block);
//   });
// });

// Block.find((err,blocks)=>{
//   blocks.map((e)=>{
//     return e.titlenp;
//   });
// });



// HORRIBLE TEST THAT SHOULD NEVER EVER BE DONE
//TODO: FUNCTION THAT RETURNS THIS
const subjectDb = [
  {'title': 'Numeros',
    'description': 'El bloque fundamental de la Ciencia Moderna.',
    'subject':'matematica',
    'color':'00ff6b',
    'totalTime': '3h',
    'videoNumber':'100'
  },
  {'title': 'Quimica General',
    'description': 'El bloque fundamental de la quimica.',
    'subject':'quimica',
    'color':'ff3100',
    'totalTime': '2h',
    'videoNumber': '35'
  },
  {'title': 'conceptos fundamentales',
    'description': 'El bloque basico de la fisica.',
    'subject':'fisica',
    'color':'0cb6ff',
    'totalTime': '4h',
    'videoNumber':'20'
  }
];
// END OF HORRIBLE TEST


// ======================= controlador de pagina de videos general ======================= //
exports.ultimosVideos = (req, res) => {
   res.render('videos/nuevos', {
     title: 'Videos',
     subjectdata: subjectDb
   });
 };

// ======================= videos de matematica ========================================= //
exports.matematicaVideos = (req, res) => {

  let videosEstaMateria = _.filter(subjectDb, function(item) {
    return item.subject === 'matematica';
  });

   res.render('videos/nuevos', {
     title: 'Matematica',
     subjectdata: videosEstaMateria,
     materia: 'Matemática'
   });
 };

 // ======================= videos de quimica ========================================= //
 exports.quimicaVideos = (req, res) => {

   let videosEstaMateria = _.filter(subjectDb, function(item) {
     return item.subject === 'quimica';
   });

    res.render('videos/nuevos', {
      title: 'Quimica',
      subjectdata: videosEstaMateria,
      materia: 'Química'
    });
  };

// ======================= videos de fisica ========================================= //
exports.fisicaVideos = (req, res) => {

  let videosEstaMateria = _.filter(subjectDb, function(item) {
    return item.subject === 'fisica';
  });

   res.render('videos/nuevos', {
     title: 'Fisica',
     subjectdata: videosEstaMateria,
     materia: 'Física'
   });
 };


// ======================= vista de bloques de materias ========================================= //
 exports.bloque = (req, res) => {

   let videosBloque = _.filter(videodb, function(item) {
     return item.block === req.query.name;
   });

   //toma los primeros 10 videos de el bloque seleccionado
   videosBloque = _.take(videosBloque, 10);
   //carga en un documento aparte los temas de este bloque
   let temasDelBloque =  _.uniqBy(videosBloque, 'theme');



   res.render('videos/bloque', {
     title: req.query.name,
     color: req.query.c,
     blockName: req.query.name,
     temas: temasDelBloque,
     dbVideos: videosBloque
   });
 };

 // ======================= vista de ver videos ========================================= //
  exports.verVideo = (req, res) => {
    res.render('videos/ver', {
      title: req.query.title,
      link: req.query.link,
      theme: req.query.theme
    });
  };
