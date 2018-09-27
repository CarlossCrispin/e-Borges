var LocalStrategy = require('passport-local').Strategy;
// var mysql = require('mysql');
// var bcrypt = require('bcryptjs');
const pg = require('pg');

var config = require('.././database/config');
const connectionString = process.env.DATABASE_URL || config;

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
		const results = [];
		pg.connect(connectionString, (err, client) => {
		  // Handle connection errors
		  if(err) {
			done();
			console.log(err);
			// return res.status(500).json({success: false, data: err});
		  }
		  // SQL Query > Select Data
		  const query = client.query('SELECT * FROM "Tesis".users WHERE email = ($1)', [email]);
		  // Stream results back one row at a time
		  query.on('row', (row) => {
			results.push(row);
			console.log(JSON.stringify(row));
		  });
		  // After all data is returned, close connection and return results
		  query.on('end', () => {
			//done();
			console.log("se cerro base de datos")
			console.log('numer: '+results.length)
			if(results.length > 0){
				console.log('si entra al if ')
					var user = results[0];
					console.log('-----------------'+JSON.stringify(results))
					console.log(user.password+'888888'+password)
					if(password == user.password){
						return done(null, {
							id: user.id, 
							nombre : user.nombre,
							email : user.email
						});
					}
			}
			return done(null, false, req.flash('authmessage', 'Email o Password incorrecto.'));
			
			//return res.json(results);
		  });
        });
// ----------------------------------------------------------------
// client.query('SELECT * FROM public.alumno where  nombre = $1 and matricula= $2' ,[email,password],(err,results) => {
		// 	// console.log(err,results)
		// 	if(err) throw err;
		// 		console.log(err)

		// 	// client.end((err) => {
		// 	// 	console.log('client has disconnected')
		// 	// 	if (err) {
		// 	// 	  console.log('error during disconnection', err.stack)
		// 	// 	}
		// 	//   })
		// client.query('SELECT * FROM public.investigador where  nombre = $1 and id= $2',[email,password],(err,results1) => {
		// 	// console.log(err,results1)
		// 	if(err) throw err;
		// 		console.log(err)
		// client.query('SELECT * FROM public.jhi_user where  login = $1 and id= $2',[email,password],(err,results2) => {
		// 	// console.log(err,results2)
		// 	if(err) throw err;
		// 		console.log(err)



		// 	if(results.rows.length  !== 0){

		// 		var user = results.rows[0];
		// 		/*console.log(password);
		// 		console.log('-----'+bcrypt.compareSync(password, user.password));
		// 		if(bcrypt.compareSync(password, user.password)){*/
		// 		if(password == user.matricula){
		// 			return done(null, {
		// 				id:user.id,
		// 				nombre : user.nombre,
		// 				apellido_1: user.apellido_1,
		// 				apellido_2: user.apellido_2,
		// 				matricula :user.matricula,
		// 				departamento_id: user.departamento_id,
		// 				rol:'alumno'
		// 			});
		// 		}
		// 	}
		// 	if(results1.rows.length  > 0){
		// 		// console.log(JSON.stringify(results1))

		// 		var user = results1.rows[0];
		// 		console.log(user);
		// 		console.log(password+'-------------'+user.id);
		// 		/*console.log(password);
		// 		console.log('-----'+bcrypt.compareSync(password, user.password));
		// 		if(bcrypt.compareSync(password, user.password)){*/
		// 		if(password == user.id){
		// 			console.log('si entra')
		// 			return done(null, {
		// 				id:user.id,
		// 			nombre : user.nombre,
		// 			apellido_1: user.apellido_1,
		// 			apellido_2: user.apellido_2,
		// 			rol:'investigador'
		// 			});
		// 		}
		// 	}
		// 	if(results2.rows.length  > 0){
		// 		// console.log(JSON.stringify(results1))

		// 		var user = results2.rows[0];
		// 		console.log(user);
		// 		console.log(password+'-------------'+user.id);
		// 		/*console.log(password);
		// 		console.log('-----'+bcrypt.compareSync(password, user.password));
		// 		if(bcrypt.compareSync(password, user.password)){*/
		// 		if(password == user.id){
		// 			// console.log('si entra')
		// 			return done(null, {
		// 				id:user.id,
		// 			nombre : user.login,
		// 			rol:'administrador'
		// 			});
		// 		}
		// 	}




		// 		return done(null, false, req.flash('authmessage', 'Email o Password incorrecto.'));

		// 			});
		// 		});
		// 		//client.end()
		// 	});

		// var config = require('.././database/config');
		// var db = mysql.createConnection(config);
		// db.connect();

		// db.query('SELECT * FROM users WHERE email = ?', email, function(err, rows, fields){
		// 	if(err) throw err;

		// 	db.end();
			
		// 	if(rows.length > 0){

		// 		var user = rows[0];
		// 		/*console.log(password);
		// 		console.log('-----'+bcrypt.compareSync(password, user.password));
		// 		if(bcrypt.compareSync(password, user.password)){*/
		// 		if(password == user.password){
		// 			return done(null, {
		// 				id: user.id, 
		// 				nombre : user.nombre,
		// 				email : user.email
		// 			});
		// 		}
		// 	}

		// 	return done(null, false, req.flash('authmessage', 'Email o Password incorrecto.'));

		// });

	}
	));

};
// var LocalStrategy = require('passport-local').Strategy;
// var mysql = require('mysql');
// var bcrypt = require('bcryptjs');

// module.exports = function(passport){

// 	passport.serializeUser(function(user, done){
// 		done(null, user);
// 	});

// 	passport.deserializeUser(function(obj, done){
// 		done(null, obj);
// 	});

// 	passport.use(new LocalStrategy({
// 		passReqToCallback : true
// 	}, function(req, email, password, done){

// 		var config = require('.././database/config');
// 		var db = mysql.createConnection(config);
// 		db.connect();

// 		db.query('SELECT * FROM users WHERE email = ?', email, function(err, rows, fields){
// 			if(err) throw err;

// 			//db.end();
			
// 				/////////////////////////////////////////////prueba
// 		db.query('SELECT * FROM users1 WHERE email = ?', email, function(err, rows1, fields){
// 			if(err) throw err;

// 			//db.end();
			
		
		
// ///////////////////////////////////////////////////////////////
			
// 			if(rows.length !== 0){

// 				var user = rows[0];
// 				/*console.log(password);
// 				console.log('-----'+bcrypt.compareSync(password, user.password));
// 				if(bcrypt.compareSync(password, user.password)){*/
// 				if(password == user.password){
// 					return done(null, {
// 						id: user.id, 
// 						nombre : user.nombre,
// 						email : user.email
// 					});
// 				}
// 			}else{
// 			if(rows1.length > 0){
// 				console.log(JSON.stringify(rows1))
// 				var user = rows1[0];
// 				console.log(user);
// 				console.log(password+'-------------'+user.password);
// 				/*console.log(password);
// 				console.log('-----'+bcrypt.compareSync(password, user.password));
// 				if(bcrypt.compareSync(password, user.password)){*/
// 				if(password == user.password){
// 					console.log('si entra')
// 					return done(null, {
// 						id: user.id, 
// 						nombre : user.nombre,
// 						email : user.email
// 					});
// 				}
// 			}
// 			}

// 			return done(null, false, req.flash('authmessage', 'Email o Password incorrecto.'));

// 		});
		
// 	})
// 	}
// 	));

// };
// // 
// postTesis : function(req,res,next){
// 	var consulta= "";
// 	var user = {
// 		departamento : req.body.departamento,
// 		grado : req.body.grado,
// 		especialidad : req.body.especialidad,
// 		desde : req.body.desde,
// 		hasta : req.body.hasta,
// 		alumno : req.body.alumno,
// 		titulo : req.body.titulo,
// 		director : req.body.director,
// 		Sinodal : req.body.sinodal


// 	}; 
// 	var inv1;    investigador2 = req.body.investigador2 ==="" ? 'null':inv1= req.body.investigador2
// 	var inv1;    investigador2 = req.body.investigador2 ===undefined? 'null':inv1= req.body.investigador2
// 	var consultaAvanzada = req.body.departamento === ''?"": consulta ="`DEPARTAMENTO` = \""+ req.body.departamento+"\" AND ";
// 		consultaAvanzada = req.body.grado === ''?"": consulta = consulta +"`GRADO` = \""+ req.body.grado+"\" AND ";
// 		consultaAvanzada = req.body.especialidad === ''?"": consulta = consulta +"`especialidad` = \""+ req.body.especialidad+"\" AND ";
// 		consultaAvanzada = req.body.desde === ''?"":consulta= consulta +"`fechapublicacion` BETWEEN '"+req.body.desde+"' and '"+ req.body.hasta+"'";
// 		consultaAvanzada = req.body.alumno === ''?"": consulta = consulta +" AND `ALUMNO` = \""+ req.body.alumno+"\"";
// 		consultaAvanzada = req.body.titulo === ''?"": consulta = consulta +" AND `TITULO` = \""+req.body.titulo+"\"";
// 		consultaAvanzada = req.body.director === ''?"": consulta = consulta+" AND `DIRECTOR`= \""+req.body.director + "\" OR `DIRECTOR1`= \""+req.body.director + "\" OR `DIRECTOR2`= \""+req.body.director + "\" OR `DIRECTOR3`= \""+req.body.director + "\" OR `DIRECTOR4`= \""+req.body.director + "\" ";
// 		consultaAvanzada = req.body.sinodal === ''?"": consulta = consulta+"AND `SINODAL`=  \""+req.body.sinodal + "\" OR `SINODAL1`= \""+req.body.sinodal + "\" OR `SINODAL2`= \""+req.body.sinodal + "\" OR `SINODAL3`= \""+req.body.sinodal + "\" OR `SINODAL4`= \""+req.body.sinodal + "\""; 
// 	console.log(user);
// 	console.log(consulta)
// 	var config = require('.././database/config');
// 			var db = mysql.createConnection(config);
// 			db.connect();
						
// 			db.query(`select * from v_tesis where (`+consulta+')',function(err,rows,fields){
// 					console.log(JSON.stringify(rows))
// 					if(err) throw err;

// 					db.end();
// 					consultaT.shift();
// 					consultaT.push(rows)
// 					enviarrowsTesis(req,res);							
// 			});	
// }



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