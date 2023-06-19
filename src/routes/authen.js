const express = require('express');
const router = express.Router();

const authenController = require('../app/controllers/AuthenController');

router.get('/login', authenController.login_get);
router.post('/login', authenController.login_post);
router.get('/signup', authenController.signup_get);
router.post('/signup', authenController.signup_post);

module.exports = router;
