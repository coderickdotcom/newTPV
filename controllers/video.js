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

// Block.find((err,blocks)=>{
//   blocks.map((e)=>{
//     return e.titlenp;
//   });
// });

// HORRIBLE TEST THAT SHOULD NEVER EVER BE DONE
//TODO: FUNCTION THAT RETURNS THIS
var blockData = [
  {'title': 'Los Numeros',
    'description': 'El bloque fundamental de la Ciencia Moderna.',
    'subject':'Matematica',
    'color':'#00ff6b',
    'totalTime': '3h',
    'videoNumber':'10'
  },
  {'title': 'Las Sales',
    'description': 'Compuesto Quimico esencial para la vida en nuestro Planeta.',
    'subject':'Quimica',
    'color':'#e15258',
    'totalTime': '>1h',
    'videoNumber':'5'
  },
  {'title': 'Leyes de Newton',
    'description': 'Toda accion tiene una reaccion.',
    'subject':'Fisica',
    'color':'#69d1f1',
    'totalTime': '4h',
    'videoNumber':'20'
  },
  {'title': 'Pitagoras',
    'description': 'el padre de la trigonometria.',
    'subject':'Fisica',
    'color':'#69d1f1',
    'totalTime': '3h',
    'videoNumber':'10'
  },
  {'title': 'Estequiometria',
    'description': 'Como entender los compuestos quimicos.',
    'subject':'Quimica',
    'color':'#e15258',
    'totalTime': '3h',
    'videoNumber':'10'
  }
];
// END OF HORRIBLE TEST


exports.ultimosVideos = (req, res) => {
   res.render('videos/nuevos', {
     title: 'Videos',
     data: blockData
   });
 };

 exports.verVideo = (req, res) => {
   res.render('videos/ver', {
     title: req.query.name + ' - TuProfesorVirtual'
   });
 };

 exports.materias = (req, res) => {

   res.render('videos/materias', {
     title: 'Materias'
   });
 };
