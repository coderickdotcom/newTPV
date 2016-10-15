/**
 * GET /
 * Home page.
 */
exports.privacy = (req, res) => {
  res.render('privacy', {
    title: 'informacion de privacidad'
  });
};
