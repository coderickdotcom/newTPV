/*jshint esversion: 6 */
const _ = require('lodash');
const async = require('async');
const Videos = require('../models/video');
const Block = require('../models/block');
const subjectdb = require('../subjectdb');



//to finding all the blocks
  // Videos.find().exec(function (error, video){
  //   if (error) {
  //     throw error;
  //   }
  //   let videosBloque = video;
  //   let b =  _.uniqBy(videosBloque, 'block');
  //   console.log(b);
  // });


// ======================= controlador de pagina de videos general ======================= //
exports.ultimosVideos = (req, res) => {

   res.render('videos/nuevos', {
     title: 'Videos',
     subjectdata: subjectdb
   });
 };

// ======================= videos de matematica ========================================= //
exports.matematicaVideos = (req, res) => {

  let videosEstaMateria = _.filter(subjectdb, function(item) {
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

   let videosEstaMateria = _.filter(subjectdb, function(item) {
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

  let videosEstaMateria = _.filter(subjectdb, function(item) {
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
   let blockName = req.query.name;
   let blockColor = req.query.c;

   Videos.find({'block': blockName}).exec(function (error, video){
     if (error) {
       throw error;
     }

     let videosBloque = video;
     let temasDelBloque =  _.uniqBy(videosBloque, 'theme');

     res.render('videos/bloque', {
       title: blockName,
       color: blockColor,
       blockName: blockName,
       temas: temasDelBloque,
       dbVideos: videosBloque
     });

   });

   //toma los primeros 10 videos de el bloque seleccionado

   //carga en un documento aparte los temas de este bloque

 };



 // ======================= vista de ver videos ========================================= //
  exports.verVideo = (req, res) => {
    res.render('videos/ver', {
      title: req.query.title,
      link: req.query.link,
      theme: req.query.bloque
    });
  };
