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
router.get('/users/panel', controllers.UserPanel.getUserPanel);
router.post('/users/panel', AuthMiddleware.isLogged ,controllers.UserPanel.postUserPanel);
router.post('/users/panel', AuthMiddleware.isLogged ,controllers.UserPanel.postUserPanel);
router.get('/users/panel/data',controllers.UserPanel.data);
// router.get('/users/status', AuthMiddleware.isLogged , controllers.UserController.getStatus);
router.get('/users/registrarTesis', AuthMiddleware.isLogged , controllers.UserController.getRegistrarTesis);
router.get('/users/investigador', AuthMiddleware.isLogged , controllers.UserController.getInvestigador);

// Entidades
// --->Acta
router.get('/acta/acta' , controllers.acta.getActa);
router.get('/datosActa',  controllers.acta.datosActa);
router.post('/acta/acta', AuthMiddleware.isLogged , controllers.acta.postActa);

// --->Tesis
router.get('/tesis/tesis' , controllers.tesis.getTesis);
router.get('/tesis/tesis/data',  controllers.tesis.data);
router.post('/deleteTesis',  controllers.tesis.deleteTesis);

// --->ActaPersona
router.get('/actaPersona/actaPersona', AuthMiddleware.isLogged , controllers.actaPersona.getActaPersona);
router.post('/actaPersona/actaPersona', AuthMiddleware.isLogged , controllers.actaPersona.postActaPersona);

// --->Alumno
router.get('/alumno/alumno',  controllers.alumno.getAlumno);
router.get('/datosAlumno',  controllers.alumno.dataAlumno);
router.post('/insertAlumno', controllers.alumno.insertAlumno);
router.post('/updateAlumno', controllers.alumno.updateAlumno);
router.post('/deleteAlumno', controllers.alumno.deleteAlumno);
router.post('/alumno/alumno', AuthMiddleware.isLogged , controllers.alumno.postAlumno);

// --->Alumno2
router.get('/alumno/showAlumno', AuthMiddleware.isLogged , controllers.ShowAlumno.getShowAlumno);
router.post('/alumno/showAlumno', AuthMiddleware.isLogged , controllers.ShowAlumno.postShowAlumno);

//--->Departamento
router.get('/departamento/departamento', controllers.departamento.getDepartamento);
router.get('/dataDepartamento', controllers.departamento.dataDepartamento);
router.post('/insertDepartamento' , controllers.departamento.insertDepartamento);
router.post('/updateDepartamento' , controllers.departamento.updateDepartamento);
router.post('/deleteDepartamento' , controllers.departamento.deleteDepartamento);

//--->Especialidad
router.get('/especialidad/especialidad', controllers.especialidad.get);
router.get('/especialidad/especialidad/data', controllers.especialidad.data);
router.post('/especialidad/especialidad/insert', controllers.especialidad.insert);
router.post('/especialidad/especialidad/update', controllers.especialidad.update);
router.post('/especialidad/especialidad/delete', controllers.especialidad.delete);
router.post('/especialidad/especialidad', AuthMiddleware.isLogged , controllers.especialidad.postEspecialidad);

//--->Genero
router.get('/genero/genero',  controllers.genero.getGenero);
router.get('/genero/genero/data',  controllers.genero.data);
router.post('/genero/genero/insert' , controllers.genero.insert);
router.post('/genero/genero/delete' , controllers.genero.delete);
router.post('/genero/genero/update' , controllers.genero.update);
// router.post('/genero/genero' , controllers.genero.postGenero);


//--->Grado
router.get('/grado/grado', controllers.grado.getGrado);
router.get('/grado/grado/data', controllers.grado.data);
router.post('/grado/grado/insert', controllers.grado.insert);
router.post('/grado/grado/update', controllers.grado.update);
router.post('/grado/grado/delete', controllers.grado.delete);
router.post('/grado/grado', AuthMiddleware.isLogged , controllers.grado.postGrado);

//--->Persona
router.get('/persona/persona',  controllers.persona.getPersona);
router.get('/persona/persona/data',  controllers.persona.data);
router.post('/persona/persona/insert',  controllers.persona.insert);
router.post('/persona/persona/update',  controllers.persona.update);
router.post('/persona/persona/delete',  controllers.persona.delete);
router.post('/persona/persona',  controllers.persona.postPersona);

//--->Unidad
router.get('/unidad/unidad', controllers.unidad.getUnidad);
router.get('/unidad/unidad/data', controllers.unidad.data);
router.post('/unidad/unidad/insert', controllers.unidad.insert);
router.post('/unidad/unidad/update', controllers.unidad.update);
router.post('/unidad/unidad/delete', controllers.unidad.delete);
router.post('/unidad/unidad', AuthMiddleware.isLogged , controllers.unidad.postUnidad);

//--->User
router.get('/usuario/usuario', controllers.usuario.getUsuario);
router.get('/usuario/usuario/data', controllers.usuario.data);
router.post('/usuario/usuario/insert', controllers.usuario.insert);
router.post('/usuario/usuario/update', controllers.usuario.update);
router.post('/usuario/usuario/delete', controllers.usuario.delete);


module.exports = router;