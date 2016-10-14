/*jshint esversion: 6 */
const async = require('async');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const passport = require('passport');
const User = require('../models/User');

/**
 * GET /login
 * Login page.
 */
exports.getLogin = (req, res) => {
  if (req.user) {
    return res.redirect('/');
  }
  res.render('account/login', {
    title: 'Login'
  });
};

/**
 * POST /login
 * Sign in using email and password.
 */
exports.postLogin = (req, res, next) => {
  req.assert('email', 'Email no valido').isEmail();
  req.assert('password', 'Contraseña no puede estar en blanco').notEmpty();
  req.sanitize('email').normalizeEmail({ remove_dots: false });

  const errors = req.validationErrors();

  if (errors) {
    req.flash('errors', errors);
    return res.redirect('/login');
  }

  passport.authenticate('local', (err, user, info) => {
    if (err) { return next(err); }
    if (!user) {
      req.flash('errors', info);
      return res.redirect('/login');
    }
    req.logIn(user, (err) => {
      if (err) { return next(err); }
      req.flash('success', { msg: 'Exito! Has iniciado sesion.' });
      res.redirect(req.session.returnTo || '/');
    });
  })(req, res, next);
};

/**
 * GET /logout
 * Log out.
 */
exports.logout = (req, res) => {
  req.logout();
  res.redirect('/');
};

/**
 * GET /signup
 * Signup page.
 */
exports.getSignup = (req, res) => {
  if (req.user) {
    return res.redirect('/');
  }
  res.render('account/signup', {
    title: 'Create Account'
  });
};

/**
 * POST /signup
 * Create a new local account.
 */
exports.postSignup = (req, res, next) => {
  req.assert('email', 'Email is not valid').isEmail();
  req.assert('password', 'Contraseña debe ser de al menos 8 caracteres').len(8);
  req.assert('confirmPassword', 'Contraseñas no coinciden').equals(req.body.password);
  req.sanitize('email').normalizeEmail({ remove_dots: false });

  const errors = req.validationErrors();

  if (errors) {
    req.flash('errors', errors);
    return res.redirect('/signup');
  }

  const user = new User({
    email: req.body.email,
    password: req.body.password
  });

  User.findOne({ email: req.body.email }, (err, existingUser) => {
    if (err) { return next(err); }
    if (existingUser) {
      req.flash('errors', { msg: 'Alguien ya uso ese email en nuestra pagina.' });
      return res.redirect('/signup');
    }
    user.save((err) => {
      if (err) { return next(err); }
      req.logIn(user, (err) => {
        if (err) {
          return next(err);
        }
        res.redirect('/');
      });
    });
  });
};

/**
 * GET /account
 * Profile page.
 */
exports.getAccount = (req, res) => {
  res.render('account/profile', {
    title: 'Manejo de Cuenta'
  });
};

/**
 * POST /account/profile
 * Update profile information.
 */
exports.postUpdateProfile = (req, res, next) => {
  req.assert('email', 'Por favor ingrese un email valido.').isEmail();
  req.sanitize('email').normalizeEmail({ remove_dots: false });

  const errors = req.validationErrors();

  if (errors) {
    req.flash('errors', errors);
    return res.redirect('/account');
  }

  User.findById(req.user.id, (err, user) => {
    if (err) { return next(err); }
    user.email = req.body.email || '';
    user.profile.name = req.body.name || '';
    user.profile.gender = req.body.gender || '';
    user.profile.location = req.body.location || '';
    user.profile.website = req.body.website || '';
    user.save((err) => {
      if (err) {
        if (err.code === 11000) {
          req.flash('errors', { msg: 'Este email ya se encuentra asociado a otra cuenta.' });
          return res.redirect('/account');
        }
        return next(err);
      }
      req.flash('success', { msg: 'Informacion de perfil ha sido actualizada.' });
      res.redirect('/account');
    });
  });
};

/**
 * POST /account/password
 * Update current password.
 */
exports.postUpdatePassword = (req, res, next) => {
  req.assert('password', 'Contraseña debe ser de al menos 8 caracteres').len(8);
  req.assert('confirmPassword', 'Contraseña no coinciden').equals(req.body.password);

  const errors = req.validationErrors();

  if (errors) {
    req.flash('errors', errors);
    return res.redirect('/account');
  }

  User.findById(req.user.id, (err, user) => {
    if (err) { return next(err); }
    user.password = req.body.password;
    user.save((err) => {
      if (err) { return next(err); }
      req.flash('success', { msg: 'Contraseña ha sido cambiada.' });
      res.redirect('/account');
    });
  });
};

/**
 * POST /account/delete
 * Delete user account.
 */
exports.postDeleteAccount = (req, res, next) => {
  User.remove({ _id: req.user.id }, (err) => {
    if (err) { return next(err); }
    req.logout();
    req.flash('info', { msg: 'Su cuenta ha sido borrada.' });
    res.redirect('/');
  });
};

/**
 * GET /account/unlink/:provider
 * Unlink OAuth provider.
 */
exports.getOauthUnlink = (req, res, next) => {
  const provider = req.params.provider;
  User.findById(req.user.id, (err, user) => {
    if (err) { return next(err); }
    user[provider] = undefined;
    user.tokens = user.tokens.filter(token => token.kind !== provider);
    user.save((err) => {
      if (err) { return next(err); }
      req.flash('info', { msg: `Cuenta de ${provider} ha sido eliminada.` });
      res.redirect('/account');
    });
  });
};

/**
 * GET /reset/:token
 * Reset Password page.
 */
exports.getReset = (req, res, next) => {
  if (req.isAuthenticated()) {
    return res.redirect('/');
  }
  User
    .findOne({ passwordResetToken: req.params.token })
    .where('passwordResetExpires').gt(Date.now())
    .exec((err, user) => {
      if (err) { return next(err); }
      if (!user) {
        req.flash('errors', { msg: 'Contraseña no valida o expirada.' });
        return res.redirect('/forgot');
      }
      res.render('account/reset', {
        title: 'Password Reset'
      });
    });
};

/**
 * POST /reset/:token
 * Process the reset password request.
 */
exports.postReset = (req, res, next) => {
  req.assert('password', 'Contraseña debe tener al menos 8 caracteres').len(8);
  req.assert('confirm', 'Contraseñas deben coincidir.').equals(req.body.password);

  const errors = req.validationErrors();

  if (errors) {
    req.flash('errors', errors);
    return res.redirect('back');
  }

  async.waterfall([
    function (done) {
      User
        .findOne({ passwordResetToken: req.params.token })
        .where('passwordResetExpires').gt(Date.now())
        .exec((err, user) => {
          if (err) { return next(err); }
          if (!user) {
            req.flash('errors', { msg: 'Token de seguridad invalido o expirado.' });
            return res.redirect('back');
          }
          user.password = req.body.password;
          user.passwordResetToken = undefined;
          user.passwordResetExpires = undefined;
          user.save((err) => {
            if (err) { return next(err); }
            req.logIn(user, (err) => {
              done(err, user);
            });
          });
        });
    },
    function (user, done) {
      const transporter = nodemailer.createTransport({
        service: 'SendGrid',
        auth: {
          user: process.env.SENDGRID_USER,
          pass: process.env.SENDGRID_PASSWORD
        }
      });
      const mailOptions = {
        to: user.email,
        from: 'robot@TuProfesorVirtual.com',
        subject: 'TuProfesorVirtual: contraseña actualizada.',
        text: `Hola,\n\n Hola esta es una confirmacion de que su cuenta ${user.email} ha sido cambiada.\n`
      };
      transporter.sendMail(mailOptions, (err) => {
        req.flash('success', { msg: 'Contraseña actualizada!.' });
        done(err);
      });
    }
  ], (err) => {
    if (err) { return next(err); }
    res.redirect('/');
  });
};

/**
 * GET /forgot
 * Forgot Password page.
 */
exports.getForgot = (req, res) => {
  if (req.isAuthenticated()) {
    return res.redirect('/');
  }
  res.render('account/forgot', {
    title: 'Recuperar Contraseña'
  });
};

/**
 * POST /forgot
 * Create a random token, then the send user an email with a reset link.
 */
exports.postForgot = (req, res, next) => {
  req.assert('email', 'Introduzca un email valido.').isEmail();
  req.sanitize('email').normalizeEmail({ remove_dots: false });

  const errors = req.validationErrors();

  if (errors) {
    req.flash('errors', errors);
    return res.redirect('/forgot');
  }

  async.waterfall([
    function (done) {
      crypto.randomBytes(16, (err, buf) => {
        const token = buf.toString('hex');
        done(err, token);
      });
    },
    function (token, done) {
      User.findOne({ email: req.body.email }, (err, user) => {
        if (err) { return done(err); }
        if (!user) {
          req.flash('errors', { msg: 'No existe una cuenta con ese email.' });
          return res.redirect('/forgot');
        }
        user.passwordResetToken = token;
        user.passwordResetExpires = Date.now() + 3600000; // 1 hour
        user.save((err) => {
          done(err, token, user);
        });
      });
    },
    function (token, user, done) {
      const transporter = nodemailer.createTransport({
        service: 'SendGrid',
        auth: {
          user: process.env.SENDGRID_USER,
          pass: process.env.SENDGRID_PASSWORD
        }
      });
      const mailOptions = {
        to: user.email,
        from: 'robot@tuprofesorvirtual.com',
        subject: 'TuProfesorVirtual: Cambio de Contraseña',
        text: `Estas recibiendo este email porque has solicitado un cambio de contraseña.\n\n
          Por favor haz click en el proximo link para terminar este proceso:\n\n
          http://${req.headers.host}/reset/${token}\n\n
          Por favor ignora este email si no pediste un cambio de contraseña.\n`
      };
      transporter.sendMail(mailOptions, (err) => {
        req.flash('info', { msg: `Un email fue enviado a  ${user.email} con las siguientes instrucciones.` });
        done(err);
      });
    }
  ], (err) => {
    if (err) { return next(err); }
    res.redirect('/forgot');
  });
};
