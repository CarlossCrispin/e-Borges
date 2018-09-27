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
// --->Acta
router.get('/acta/acta', AuthMiddleware.isLogged , controllers.acta.getActa);
router.post('/acta/acta', AuthMiddleware.isLogged , controllers.acta.postActa);

// --->ActaPersona
router.get('/actaPersona/actaPersona', AuthMiddleware.isLogged , controllers.actaPersona.getActaPersona);
router.post('/actaPersona/actaPersona', AuthMiddleware.isLogged , controllers.actaPersona.postActaPersona);

// --->Alumno
router.get('/alumno/alumno', AuthMiddleware.isLogged , controllers.alumno.getAlumno);
router.post('/alumno/alumno', AuthMiddleware.isLogged , controllers.alumno.postAlumno);

// --->Alumno2
router.get('/alumno/showAlumno', AuthMiddleware.isLogged , controllers.ShowAlumno.getShowAlumno);
router.post('/alumno/showAlumno', AuthMiddleware.isLogged , controllers.ShowAlumno.postShowAlumno);

//--->Departamento
router.get('/departamento/departamento', AuthMiddleware.isLogged , controllers.departamento.getDepartamento);
router.post('/departamento/departamento', AuthMiddleware.isLogged , controllers.departamento.postDepartamento);

//--->Especialidad
router.get('/especialidad/especialidad', AuthMiddleware.isLogged , controllers.especialidad.getEspecialidad);
router.post('/especialidad/especialidad', AuthMiddleware.isLogged , controllers.especialidad.postEspecialidad);

//--->Genero
router.get('/genero/genero',  controllers.genero.getGenero);
router.get('/datos',  controllers.genero.data);
// router.post('/genero/genero' , controllers.genero.postGenero);
router.post('/insert' , controllers.genero.insert);
router.post('/delete' , controllers.genero.delete);
router.post('/update' , controllers.genero.update);


//--->Grado
router.get('/grado/grado', AuthMiddleware.isLogged , controllers.grado.getGrado);
router.post('/grado/grado', AuthMiddleware.isLogged , controllers.grado.postGrado);

//--->Persona
router.get('/persona/persona',  controllers.persona.getPersona);
router.get('/datos/persona',  controllers.persona.data);
router.post('/persona/persona',  controllers.persona.postPersona);

//--->Unidad
router.get('/unidad/unidad', AuthMiddleware.isLogged , controllers.unidad.getUnidad);
router.post('/unidad/unidad', AuthMiddleware.isLogged , controllers.unidad.postUnidad);

//--->User
router.get('/usuario/usuario', AuthMiddleware.isLogged , controllers.usuario.getUsuario);



module.exports = router;