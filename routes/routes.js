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
router.get('/auth/logout', AuthMiddleware.isLogged , controllers.UserController.logout);
router.get('/users/panel', AuthMiddleware.isLogged , controllers.UserPanel.getUserPanel);
router.post('/users/panel', AuthMiddleware.isLogged ,controllers.UserPanel.postUserPanel);
router.get('/users/panel/data', AuthMiddleware.isLogged ,controllers.UserPanel.data);
router.get('/users/panel/persona', AuthMiddleware.isLogged ,controllers.UserPanel.persona);
router.post('/users/panel/insert', AuthMiddleware.isLogged ,controllers.UserPanel.insert);
router.post('/users/panel/delete', AuthMiddleware.isLogged ,controllers.UserPanel.delete);
router.post('/users/panel/update', AuthMiddleware.isLogged ,controllers.UserPanel.update);
router.post('/users/panel/add', AuthMiddleware.isLogged ,controllers.UserPanel.add);
router.post('/users/panel/aceptar', AuthMiddleware.isLogged ,controllers.UserPanel.aceptar);
// router.get('/users/status', AuthMiddleware.isLogged , controllers.UserController.getStatus);
router.get('/users/registrarTesis', AuthMiddleware.isLogged , controllers.UserController.getRegistrarTesis);
router.get('/users/investigador', AuthMiddleware.isLogged , controllers.UserController.getInvestigador);

// Entidades
// --->Acta
router.get('/acta/acta', controllers.acta.getActa);
router.get('/datosActa', controllers.acta.datosActa);
router.post('/acta/acta',  AuthMiddleware.isLogged , controllers.acta.postActa);

// --->Tesis
router.get('/tesis/tesis', AuthMiddleware.isLogged , controllers.tesis.getTesis);
router.get('/tesis/tesis/data', AuthMiddleware.isLogged,  controllers.tesis.data);
router.post('/tesis/tesis/insert', AuthMiddleware.isLogged,  controllers.tesis.insert);
router.post('/tesis/tesis/delete', AuthMiddleware.isLogged,  controllers.tesis.delete);
router.post('/tesis/tesis/update', AuthMiddleware.isLogged,  controllers.tesis.update);

// --->ActaPersona
router.get('/actaPersona/actaPersona', AuthMiddleware.isLogged , controllers.actaPersona.getActaPersona);
router.post('/actaPersona/actaPersona', AuthMiddleware.isLogged , controllers.actaPersona.postActaPersona);

// --->Alumno
router.get('/alumno/alumno', AuthMiddleware.isLogged,  controllers.alumno.getAlumno);
router.get('/datosAlumno', AuthMiddleware.isLogged,  controllers.alumno.dataAlumno);
router.post('/insertAlumno', AuthMiddleware.isLogged, controllers.alumno.insertAlumno);
router.post('/updateAlumno', AuthMiddleware.isLogged, controllers.alumno.updateAlumno);
router.post('/deleteAlumno', AuthMiddleware.isLogged, controllers.alumno.deleteAlumno);
router.post('/alumno/alumno', AuthMiddleware.isLogged , controllers.alumno.postAlumno);

// --->Alumno2
router.get('/alumno/showAlumno', AuthMiddleware.isLogged , controllers.ShowAlumno.getShowAlumno);
router.post('/alumno/showAlumno', AuthMiddleware.isLogged , controllers.ShowAlumno.postShowAlumno);

//--->Departamento
router.get('/departamento/departamento', AuthMiddleware.isLogged, controllers.departamento.getDepartamento);
router.get('/dataDepartamento', AuthMiddleware.isLogged, controllers.departamento.dataDepartamento);
router.post('/insertDepartamento', AuthMiddleware.isLogged , controllers.departamento.insertDepartamento);
router.post('/updateDepartamento', AuthMiddleware.isLogged , controllers.departamento.updateDepartamento);
router.post('/deleteDepartamento', AuthMiddleware.isLogged , controllers.departamento.deleteDepartamento);

//--->Especialidad
router.get('/especialidad/especialidad', AuthMiddleware.isLogged, controllers.especialidad.get);
router.get('/especialidad/especialidad/data', AuthMiddleware.isLogged, controllers.especialidad.data);
router.post('/especialidad/especialidad/insert', AuthMiddleware.isLogged, controllers.especialidad.insert);
router.post('/especialidad/especialidad/update', AuthMiddleware.isLogged, controllers.especialidad.update);
router.post('/especialidad/especialidad/delete', AuthMiddleware.isLogged, controllers.especialidad.delete);
router.post('/especialidad/especialidad', AuthMiddleware.isLogged , controllers.especialidad.postEspecialidad);

//--->Genero
router.get('/genero/genero', AuthMiddleware.isLogged,  controllers.genero.getGenero);
router.get('/genero/genero/data', AuthMiddleware.isLogged,  controllers.genero.data);
router.post('/genero/genero/insert', AuthMiddleware.isLogged , controllers.genero.insert);
router.post('/genero/genero/delete', AuthMiddleware.isLogged , controllers.genero.delete);
router.post('/genero/genero/update', AuthMiddleware.isLogged , controllers.genero.update);
// router.post('/genero/genero' , controllers.genero.postGenero);


//--->Grado
router.get('/grado/grado', AuthMiddleware.isLogged, controllers.grado.getGrado);
router.get('/grado/grado/data', AuthMiddleware.isLogged, controllers.grado.data);
router.post('/grado/grado/insert', AuthMiddleware.isLogged, controllers.grado.insert);
router.post('/grado/grado/update', AuthMiddleware.isLogged, controllers.grado.update);
router.post('/grado/grado/delete', AuthMiddleware.isLogged, controllers.grado.delete);
router.post('/grado/grado', AuthMiddleware.isLogged , controllers.grado.postGrado);

//--->Persona
router.get('/persona/persona', AuthMiddleware.isLogged,  controllers.persona.getPersona);
router.get('/persona/persona/data', AuthMiddleware.isLogged,  controllers.persona.data);
router.post('/persona/persona/insert', AuthMiddleware.isLogged,  controllers.persona.insert);
router.post('/persona/persona/update', AuthMiddleware.isLogged,  controllers.persona.update);
router.post('/persona/persona/delete', AuthMiddleware.isLogged,  controllers.persona.delete);
router.post('/persona/persona', AuthMiddleware.isLogged,  controllers.persona.postPersona);

//--->Unidad
router.get('/unidad/unidad', AuthMiddleware.isLogged, controllers.unidad.getUnidad);
router.get('/unidad/unidad/data', AuthMiddleware.isLogged, controllers.unidad.data);
router.post('/unidad/unidad/insert', AuthMiddleware.isLogged, controllers.unidad.insert);
router.post('/unidad/unidad/update', AuthMiddleware.isLogged, controllers.unidad.update);
router.post('/unidad/unidad/delete', AuthMiddleware.isLogged, controllers.unidad.delete);
router.post('/unidad/unidad', AuthMiddleware.isLogged , controllers.unidad.postUnidad);

//--->User
router.get('/usuario/usuario', AuthMiddleware.isLogged, controllers.usuario.getUsuario);
router.get('/usuario/usuario/data', AuthMiddleware.isLogged, controllers.usuario.data);
router.post('/usuario/usuario/insert', AuthMiddleware.isLogged, controllers.usuario.insert);
router.post('/usuario/usuario/update', AuthMiddleware.isLogged, controllers.usuario.update);
router.post('/usuario/usuario/delete', AuthMiddleware.isLogged, controllers.usuario.delete);


module.exports = router;