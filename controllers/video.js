/*jshint esversion: 6 */
/**
 * GET /
 * Home page.
 */

 exports.ultimosVideos = (req, res) => {
   res.render('videos/nuevos', {
     title: 'Videos'
   });
 };
