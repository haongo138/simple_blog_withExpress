import multer from 'multer';
const upload = multer();
const router = require('express').Router();
const userController = require('../../controllers/user.controller');
const signupValidate = require('../../validates/signup.validate');
const loginValidate = require('../../validates/login.validate');
const authMiddleware = require('../../middlewares/auth.middleware');

// GET requests
router.get('/users', authMiddleware.requireAuth, userController.index);
router.get('/users/signup', userController.signupForm);
router.get('/users/login', userController.loginForm);

// POST requests 
router.post('/users/signup',
    upload.single('avatar'),
    signupValidate.postSignup, 
    userController.postSignup);

router.post('/users/login', loginValidate.postLogin, userController.postLogin);
module.exports = router;