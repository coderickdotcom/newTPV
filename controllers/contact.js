/*jshint esversion: 6 */
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
  service: 'SendGrid',
  auth: {
    user: process.env.SENDGRID_USER,
    pass: process.env.SENDGRID_PASSWORD
  }
});

/**
 * GET /contact
 * Contact form page.
 */
exports.getContact = (req, res) => {
  res.render('contact', {
    title: 'contacto'
  });
};

/**
 * POST /contact
 * Send a contact form via Nodemailer.
 */
exports.postContact = (req, res) => {
  req.assert('name', 'Nombre no puede estar en Blanco').notEmpty();
  req.assert('email', 'Email no valido').isEmail();
  req.assert('message', 'Mensaje no puede estar en Blanco').notEmpty();

  const errors = req.validationErrors();

  if (errors) {
    req.flash('errors', errors);
    return res.redirect('/contact');
  }

  const mailOptions = {
    to: 'rasabatino@hotmail.com',
    from: `${req.body.name} <${req.body.email}>`,
    subject: 'Formulario de Contacto | PAGINA WEB',
    text: req.body.message
  };

  transporter.sendMail(mailOptions, (err) => {
    if (err) {
      req.flash('errors', { msg: err.message });
      return res.redirect('/contact');
    }
    req.flash('success', { msg: 'Email enviado con exito!' });
    res.redirect('/contact');
  });
};
