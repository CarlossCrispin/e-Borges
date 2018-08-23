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