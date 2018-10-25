var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcryptjs');
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
	}, function (req, username, password, done) {
		var results = [];
		var results2 = [];
		var results3 = [];
		pg.connect(connectionString, (err, client) => {
			var str = username
			var username2 = str.toLowerCase();
			var username3 = str.toUpperCase();
			// console.log(username2 +"----"+username3 )
			if (err) {
				done();
				console.log(err);
				// return res.status(500).json({success: false, data: err});
			}


			// var select = client.query('SELECT * FROM "Tesis".usuario where  nombre = $1 and contrasena= $2', [username, password]);
			var select = client.query('SELECT * FROM "Tesis".usuario where  nombre = $1 ', [username]);
			var select2 = client.query('SELECT * FROM "Tesis".alumno where  nombre = $1 or nombre = $2 ', [username2,username3]);
			var select3 = client.query('SELECT * FROM "Tesis".persona where  nombre = $1 or nombre = $2', [username2,username3]);
			// var select3 = client.query('SELECT * FROM "Tesis".persona where  (nombre = $1 or nombre = $2) and idpersona= $3', [username2,username3,password]);
			var query = select
			query.on('row', (row) => {
				results.push(row);
				// console.log(JSON.stringify(row));
			});
			var query = select2
			query.on('row', (row) => {
				results2.push(row);
				// console.log(JSON.stringify(row));
			});
			var query = select3
			query.on('row', (row) => {
				results3.push(row);
				// console.log(JSON.stringify(row));
			});
			// After all data is returned, close connection and return results
			query.on('end', () => {
				//done();
				console.log("se cerro base de datos")
				console.log('usuario numer: ' + results.length)
				console.log('alumno numer: ' + results2.length)
				console.log('persona numer: ' + results3.length)



				// console.log(password + '--->' + user.matricula)
					// if (password == user.matricula) {
				if (results3.length > 0) {
					
					// console.log('-----------------' + JSON.stringify(results3))
					for(i=0;i<results3.length;i++){
						var user = results3[i];
						// console.log('-----------------' + JSON.stringify(results3))
						// console.log(password + '--->' + user.idpersona)
						if (password == user.idpersona) {
							return done(null, {
								id: user.idpersona,
								nombre: user.nombre,
								nombre2: user.nombre2,
								nombre3: user.nombre3,
								nombre: user.nombre,
								rol: 'persona'
							});
						}
					}

				}
				if (results2.length > 0) {
					for(i=0;i<results2.length;i++){
						
						var user = results2[i];
						// console.log(user);
						// console.log(password + '-------------' + user.idalumno);
						if (password == user.idalumno) {
							// console.log('si entra')
							return done(null, {
								id: user.idalumno,
								nombre: user.nombre,
								rol: 'alumno'
							});
						}
					}

				}
				if (results.length > 0) {
					// console.log(JSON.stringify(results1))
					for(i=0;i<results.length;i++){

						var user = results[i];
						// console.log(user);
						// console.log(password + '-------------' + user.contrasena);
						/*console.log(password);
						console.log('-----'+bcrypt.compareSync(password, user.password));
						if(bcrypt.compareSync(password, user.password)){*/
	
						// if (password == user.contrasena) {
						if (bcrypt.compareSync(password, user.contrasena)) {
							console.log('si entra')
							return done(null, {
								id: user.idusuario,
								nombre: user.nombre,
								nombre2: user.nombre2,
								nombre3: user.nombre3,
								nombre: user.nombre,
								rol: user.rol
								
							});
						}
					}
					
				}
				return done(null, false, req.flash('authmessage', 'username o Password incorrecto.'));
			});
		});
	}
	));
};