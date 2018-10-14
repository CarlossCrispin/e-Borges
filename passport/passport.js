var LocalStrategy = require('passport-local').Strategy;

var pg = require("pg")
const connection = require('.././database/config');
const connectionString = process.env.DATABASE_URL || connection;

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
		var results = [];
		var results2 = [];
		var results3 = [];
		pg.connect(connectionString, (err, client) => {

			if (err) {
				done();
				console.log(err);
				// return res.status(500).json({success: false, data: err});
			}

			
			var select = client.query('SELECT * FROM "Tesis".usuario where  nombre = $1 and contrasena= $2', [email, password]);
			var query=select
			query.on('row', (row) => {
				results.push(row);
				console.log(JSON.stringify(row));
			});
			// After all data is returned, close connection and return results
			query.on('end', () => {
				//done();
				console.log("se cerro base de datos")
				console.log('numer: ' + results.length)

				// if (results.length > 0) {
				// 	var user = results[0];
				// 	console.log('-----------------' + JSON.stringify(results))
				// 	console.log(password + '--->' + user.matricula)
				// 	if (password == user.matricula) {
				// 		return done(null, {
				// 			id: user.id,
				// 			nombre: user.nombre,
				// 			apellido_1: user.apellido_1,
				// 			apellido_2: user.apellido_2,
				// 			matricula: user.matricula,
				// 			departamento_id: user.departamento_id,
				// 			rol: 'alumno'
				// 		});
				// 	}

				// }
				// if (results2.length > 0) {
				// 	var user = results2[0];
				// 	console.log(user);

				// 	if (password == user.id) {
				// 		// console.log('si entra')
				// 		return done(null, {
				// 			id: user.id,
				// 			nombre: user.login,
				// 			rol: 'administrador'
				// 		});
				// 	}

				// }
				if (results.length > 0) {
					// console.log(JSON.stringify(results1))

					var user = results[0];
					console.log(user);
					console.log(password + '-------------' + user.contrasena);
					/*console.log(password);
					console.log('-----'+bcrypt.compareSync(password, user.password));
					if(bcrypt.compareSync(password, user.password)){*/
					if (password == user.contrasena) {
						console.log('si entra')
						return done(null, {
							id: user.id,
							nombre: user.nombre,
							rol: 'administrador'
						});
					}
					// return done(null, false, req.flash('authmessage', 'Email o Password incorrecto.'));
				}
				return done(null, false, req.flash('authmessage', 'Email o Password incorrecto.'));
			});
		});
	}
	));
};