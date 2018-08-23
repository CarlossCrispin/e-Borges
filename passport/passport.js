var LocalStrategy = require('passport-local').Strategy;
//var mysql = require('mysql');
var pg = require("pg")
var bcrypt = require('bcryptjs');
const connection = require('.././database/config');
var client = new pg.Client(connection);
client.connect();
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
		

		
			// console.log("-------------------------------------------");
			// var resp =JSON.stringify(results.rows);
			// console.log(resp);
			// console.log(results.rows);
			// console.log("-------------------------------------------");
            // //console.log(`----> ${password}`);
			// if(results.rows.length > 0){
				
			// 	var user = results.rows[0];
			// 	//if(bcrypt.compareSync(password, user.password)){
			// 	console.log(resp);
			// 	if(password == user.matricula){
			// 		return done(null, {
			// 			id:user.id,
			// 			nombre : user.nombre,
			// 			apellido_1: user.apellido_1,
			// 			apellido_2: user.apellido_2,
			// 			matricula :user.matricula,
			// 			departamento_id: user.departamento_id,
			// 			rol:'alumno'
						
			// 		});
			// 	}
			// }
			//connection.end()

		
		client.query('SELECT * FROM public.alumno where  nombre = $1 and matricula= $2' ,[email,password],(err,results) => {
			console.log(err,results)
			if(err) throw err;
			// client.end((err) => {
			// 	console.log('client has disconnected')
			// 	if (err) {
			// 	  console.log('error during disconnection', err.stack)
			// 	}
			//   })
		client.query('SELECT * FROM public.investigador where  nombre = $1 and id= $2',[email,password],(err,results1) => {
			console.log(err,results1)
			if(err) throw err;
				console.log(err)
		client.query('SELECT * FROM public.jhi_user where  login = $1 and id= $2',[email,password],(err,results2) => {
			console.log(err,results2)
			if(err) throw err;
				console.log(err)
			
		
			
			if(results.rows.length  !== 0){
				
				var user = results.rows[0];
				/*console.log(password);
				console.log('-----'+bcrypt.compareSync(password, user.password));
				if(bcrypt.compareSync(password, user.password)){*/
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
			if(results1.rows.length  > 0){
				console.log(JSON.stringify(results1))
				
				var user = results1.rows[0];
				console.log(user);
				console.log(password+'-------------'+user.id);
				/*console.log(password);
				console.log('-----'+bcrypt.compareSync(password, user.password));
				if(bcrypt.compareSync(password, user.password)){*/
				if(password == user.id){
					console.log('si entra')
					return done(null, {
						id:user.id,
					nombre : user.nombre,
					apellido_1: user.apellido_1,
					apellido_2: user.apellido_2,
					rol:'investigador'
					});
				}
			}
			if(results2.rows.length  > 0){
				console.log(JSON.stringify(results1))
				
				var user = results2.rows[0];
				console.log(user);
				console.log(password+'-------------'+user.id);
				/*console.log(password);
				console.log('-----'+bcrypt.compareSync(password, user.password));
				if(bcrypt.compareSync(password, user.password)){*/
				if(password == user.id){
					console.log('si entra')
					return done(null, {
						id:user.id,
					nombre : user.login,
					rol:'administrador'
					});
				}
			}
				
				
			
				
				return done(null, false, req.flash('authmessage', 'Email o Password incorrecto.'));
				
					});
				});
				//client.end()
			});
		}
	));
};