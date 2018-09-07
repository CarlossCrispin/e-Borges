var LocalStrategy = require('passport-local').Strategy;
// var mysql = require('mysql');
// var bcrypt = require('bcryptjs');
const pg = require('pg');

var config = require('.././database/config');
const connectionString = process.env.DATABASE_URL || config;
module.exports = function (passport) {

	passport.serializeUser(function (user, done) {
		done(null, user);
	});

	passport.deserializeUser(function (obj, done) {
		done(null, obj);
	});

	passport.use(new LocalStrategy({
		passReqToCallback: true
	}, function (req, email, password, done) {
		const results = [];
		const results2 = [];
		const results3 = [];
		// Alumno
		pg.connect(connectionString, (err, client) => {
			// Handle connection errors
			if (err) {
				done();
				console.log(err);
				// return res.status(500).json({success: false, data: err});
			}
			// SQL Query > Select Data
			const query = client.query(`SELECT * FROM public.alumno where  nombre = $1 and matricula= $2`, [email,password]);
			// Stream results back one row at a time
			query.on('row', (row) => {
				results.push(row);
				console.log(JSON.stringify(row));
			});
			// After all data is returned, close connection and return results
			query.on('end', () => {
				//done();
				console.log("se cerro base de datos")
				console.log('numer: ' + results.length)
				if (results.length > 0) {
					console.log('si entra al if ')
					var user = results[0];
					console.log('-----------------' + JSON.stringify(results))
					console.log(password + '--->' + user.matricula)
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
					return done(null, false, req.flash('authmessage', 'Email o Password incorrecto.'));
				}

				//return res.json(results);
			});
		});
		//Admin
		pg.connect(connectionString, (err, client) => {
			// Handle connection errors
			if (err) {
				done();
				console.log(err);
				// return res.status(500).json({success: false, data: err});
			}
			// SQL Query > Select Data
			const query = client.query('SELECT * FROM public.jhi_user where  login = $1 and id= $2',[email,password]);
			// Stream results back one row at a time
			query.on('row', (row) => {
				results2.push(row);
				console.log(JSON.stringify(row));
			});
			// After all data is returned, close connection and return results
			query.on('end', () => {
				//done();
				console.log("se cerro base de datos")
				console.log('numer: ' + results2.length)
				if(results2.length  > 0){
					// console.log(JSON.stringify(results1))
	
					var user = results2[0];
					console.log(user);
					// console.log(password+'-------------'+user.id);
					/*console.log(password);
					console.log('-----'+bcrypt.compareSync(password, user.password));
					if(bcrypt.compareSync(password, user.password)){*/
					if(password == user.id){
						// console.log('si entra')
						return done(null, {
							id:user.id,
						nombre : user.login,
						rol:'administrador'
						});
					}
					return done(null, false, req.flash('authmessage', 'Email o Password incorrecto.'));
				}
			});
		});
		//Investigador
		pg.connect(connectionString, (err, client) => {
			// Handle connection errors
			if (err) {
				done();
				console.log(err);
				// return res.status(500).json({success: false, data: err});
			}
			// SQL Query > Select Data
			const query = client.query('SELECT * FROM public.investigador where  nombre = $1 and id= $2',[email,password]);
			// Stream results back one row at a time
			query.on('row', (row) => {
				results3.push(row);
				console.log(JSON.stringify(row));
			});
			// After all data is returned, close connection and return results
			query.on('end', () => {
				//done();
				console.log("se cerro base de datos")
				console.log('numer: ' + results3.length)
				if(results3.length  > 0){
					// console.log(JSON.stringify(results1))
	
					var user = results3[0];
					console.log(user);
					console.log(password+'-------------'+user.id);
					/*console.log(password);
					console.log('-----'+bcrypt.compareSync(password, user.password));
					if(bcrypt.compareSync(password, user.password)){*/
					if(password == user.id){
						// console.log('si entra')
						return done(null, {
							id:user.id,
							nombre : user.nombre,
							apellido_1: user.apellido_1,
							apellido_2: user.apellido_2,
							rol:'investigador'
						});
					}
					return done(null, false, req.flash('authmessage', 'Email o Password incorrecto.'));
				}
			});
		});
		// return done(null, false, req.flash('authmessage', 'Email o Password incorrecto.'));
	}
	));
};