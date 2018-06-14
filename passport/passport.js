var LocalStrategy = require('passport-local').Strategy;
//var mysql = require('mysql');
//var pg = require("pg")
var bcrypt = require('bcryptjs');

module.exports = function(passport){

	passport.serializeUser(function(user, done){
	done(null, user);
	});

	passport.deserializeUser(function(obj, done){
		done(null, obj);
	});

	passport.use(new LocalStrategy({
		passReqToCallback : true
	}, function(req, email, password, done){

		//var config = require('.././database/config');
		//const db = pgp(config)
		/*var db = mysql.createConnection(config);
		db.connect();

		db.query('SELECT * FROM users WHERE email = ?'*/
		const connection = require('.././database/config');
		
		connection.query('SELECT * FROM public.alumno where  nombre = $1',[email],(err,results) => {
			console.log(err,results)
			
			console.log("-------------------------------------------");
			var resp =JSON.stringify(results.rows);
			console.log(resp);
			console.log(results.rows);
			console.log("-------------------------------------------");
            //console.log(`----> ${password}`);
			if(results.rows.length > 0){
				
				var user = results.rows[0];
				//if(bcrypt.compareSync(password, user.password)){
				console.log(resp);
				if(password == user.matricula){
					return done(null, {
						id:user.id,
						nombre : user.nombre,
						apellido_1: user.apellido_1,
						apellido_2: user.apellido_2,
						matricula :user.matricula,
						departamento_id: user.departamento_id,
						rol:'alumno'
						
					});
				}
			}
			//connection.end()

			return done(null, false, req.flash('authmessage', 'Email o Password incorrecto.'));

		});
		//investigador
		connection.query('SELECT * FROM public.investigador where  nombre = $1',[email],(err,results) => {
			console.log(err,results)
			
			console.log("-------------------------------------------");
			var resp =JSON.stringify(results.rows);
			console.log(resp);
			console.log(results.rows);
			console.log("-------------------------------------------");
            //console.log(`----> ${password}`);
			if(results.rows.length > 0){
				
				var user = results.rows[0];
				//if(bcrypt.compareSync(password, user.password)){
				console.log(resp);
				if(password == user.matricula){
					return done(null, {
						id:user.id,
						nombre : user.nombre,
						apellido_1: user.apellido_1,
						apellido_2: user.apellido_2,
						rol:'Investigador'
						
					});
				}
			}
			//connection.end()

			return done(null, false, req.flash('authmessage', 'Email o Password incorrecto.'));

		});
//asta
	}
	));

};