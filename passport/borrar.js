var LocalStrategy = require('passport-local').Strategy;
var mysql = require('mysql');
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

		var config = require('.././database/config');
		var db = mysql.createConnection(config);
		db.connect();

		db.query('SELECT * FROM users WHERE email = ?', email, function(err, rows, fields){
			if(err) throw err;

			//db.end();
			
				/////////////////////////////////////////////prueba
		db.query('SELECT * FROM users1 WHERE email = ?', email, function(err, rows1, fields){
			if(err) throw err;

			//db.end();
			
		
		
///////////////////////////////////////////////////////////////
			
			if(rows.length !== 0){

				var user = rows[0];
				/*console.log(password);
				console.log('-----'+bcrypt.compareSync(password, user.password));
				if(bcrypt.compareSync(password, user.password)){*/
				if(password == user.password){
					return done(null, {
						id: user.id, 
						nombre : user.nombre,
						email : user.email
					});
				}
			}else{
			if(rows1.length > 0){
				console.log(JSON.stringify(rows1))
				var user = rows1[0];
				console.log(user);
				console.log(password+'-------------'+user.password);
				/*console.log(password);
				console.log('-----'+bcrypt.compareSync(password, user.password));
				if(bcrypt.compareSync(password, user.password)){*/
				if(password == user.password){
					console.log('si entra')
					return done(null, {
						id: user.id, 
						nombre : user.nombre,
						email : user.email
					});
				}
			}
			}

			return done(null, false, req.flash('authmessage', 'Email o Password incorrecto.'));

		});
		
	})
	}
	));

};