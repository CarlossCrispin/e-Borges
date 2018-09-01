var express = require('express');
var router = express.Router();
var passport = require('passport');
var controllers = require('.././controllers');
var AuthMiddleware = require('.././middleware/auth');

router.get('/', controllers.HomeController.index);

//routas de usuario
router.get('/auth/signup', controllers.UserController.getSignUp);
router.post('/auth/signup', controllers.UserController.postSignUp);
router.get('/auth/signin', controllers.UserController.getSignIn);
router.post('/auth/signin',  passport.authenticate('local', {
	successRedirect : '/users/panel',
	failureRedirect : '/',
	failureFlash : true 
}));
router.get('/auth/logout', controllers.UserController.logout);
router.get('/users/panel', AuthMiddleware.isLogged ,controllers.UserPanel.getUserPanel);
router.post('/users/panel', AuthMiddleware.isLogged ,controllers.UserPanel.postUserPanel);
// router.get('/users/status', AuthMiddleware.isLogged , controllers.UserController.getStatus);
router.get('/users/registrarTesis', AuthMiddleware.isLogged , controllers.UserController.getRegistrarTesis);
router.get('/users/investigador', AuthMiddleware.isLogged , controllers.UserController.getInvestigador);

// Entidades
// --->Alumno
router.get('/alumno/showAlumno', AuthMiddleware.isLogged , controllers.ShowAlumno.getShowAlumno);
router.post('/alumno/showAlumno', AuthMiddleware.isLogged , controllers.ShowAlumno.postShowAlumno);

//--->Genero
router.get('/genero/genero', AuthMiddleware.isLogged , controllers.genero.getGenero);
router.post('/genero/genero', AuthMiddleware.isLogged , controllers.genero.postGenero);


module.exports = router;
