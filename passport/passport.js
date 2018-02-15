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
		
		connection.query('SELECT * FROM public.users where  email = $1',[email],(err,results) => {
			console.log(err,results)
			
			console.log("-------------------------------------------");
			var resp =JSON.stringify(results.rows);
			console.log(resp);
			//console.log(results.rows);
			console.log("-------------------------------------------");
            //console.log(`----> ${password}`);
			if(results.rows.length > 0){
				
				var user = results.rows[0];
				if(bcrypt.compareSync(password, user.password)){
					return done(null, {
						id: user.idusers, 
						nombre : user.nombre,
						email : user.email
					});
				}
			}
			//connection.end()

			return done(null, false, req.flash('authmessage', 'Email o Password incorrecto.'));

		});

	}
	));

};