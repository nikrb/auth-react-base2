'use strict'

const { Router } = require('express');
const multer = require('multer');
const upload = multer({ dest: process.env.IMAGE_UPLOAD_DIR});

const auth = require('./auth');
const users = require('./users');
const images = require('./images');
const { catchAsyncErrors } = require('../utils');

const router = new Router();

// NOTE: no auth required
router.get('/api/v1/image/:id', catchAsyncErrors( images.grab));

router.get('/api/v1/user/:id*?', auth.isLoggedIn, catchAsyncErrors( users.getDetail));
router.post('/api/v1/user', auth.isLoggedIn, upload.array('blobs', 1), catchAsyncErrors(users.update));

/**
 * 1. Validate the registration data
 * 2. Register the user
 * 3. Log them in
 */
router.post('/api/v1/register',
  users.register.validateRegister,
  catchAsyncErrors(users.register.register),
  auth.login
);

router.post('/api/v1/login', auth.login);
router.get('/api/v1/logout', auth.logout);

module.exports = router;
