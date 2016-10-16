/*jshint esversion: 6 */
const _ = require('lodash');
const async = require('async');
const Videos = require('../models/video');
const Block = require('../models/block');
const videodb = require('../videodb'); // TODO: QUITAR ESTA PIRATERIA DE AQUI


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
console.log(videodb.length);


// HORRIBLE TEST THAT SHOULD NEVER EVER BE DONE
//TODO: FUNCTION THAT RETURNS THIS
var blockData = [
  {'title': 'Los Numeros',
    'description': 'El bloque fundamental de la Ciencia Moderna.',
    'subject':'Matematica',
    'color':'#00ff6b',
    'totalTime': '3h',
    'videoNumber':'100'
  },
  {'title': 'Sustancias, mezclas , y soluciones',
    'description': 'El bloque fundamental de la quimica moderna.',
    'subject':'Quimica',
    'color':'#ff3100',
    'totalTime': '2h',
    'videoNumber': '35'
  },
  {'title': 'Leyes de Newton',
    'description': 'Toda accion tiene una reaccion.',
    'subject':'Fisica',
    'color':'#0cb6ff',
    'totalTime': '4h',
    'videoNumber':'20'
  },
  {'title': 'Pitagoras',
    'description': 'el padre de la trigonometria.',
    'subject':'Fisica',
    'color':'#0cb6ff',
    'totalTime': '3h',
    'videoNumber':'10'
  },
  {'title': 'Estequiometria',
    'description': 'Como entender los compuestos quimicos.',
    'subject':'Quimica',
    'color':'#ff3100',
    'totalTime': '3h',
    'videoNumber':'10'
  }
];
// END OF HORRIBLE TEST

var video = {
  title: 'NÚMEROS ENTEROS. Potenciación. Ejercicio 1',
  link: 'https://www.youtube.com/embed/GEB0FLtjvuE?rel=0&showinfo=0',
  theme: 'los numeros'
};

exports.ultimosVideos = (req, res) => {
   res.render('videos/nuevos', {
     title: 'Videos',
     data: blockData
   });
 };

 exports.verVideo = (req, res) => {
   res.render('videos/ver', {
     title: req.query.name + ' - TuProfesorVirtual',
     video: video
   });
 };

 exports.bloque = (req, res) => {

   res.render('videos/bloque', {
     title: 'bloque'
   });
 };
