//var mysql = require('mysql');
// const pg = require('pg')
var bcrypt = require('bcryptjs');
const connection = require('.././database/config');
var pg = require("pg")


var client = new pg.Client(connection);
client.connect();
module.exports = {
	
	getSignUp : function(req, res, next){
		return res.render('users/signup');
	},


	postSignUp: function(req, res, next){
		
		var salt = bcrypt.genSaltSync(10);
		var password = bcrypt.hashSync(req.body.password, salt);

		var user = {
			email : req.body.email,
			nombre : req.body.nombre,
			password : password
		}
		
       /* const {Pool} = require('pg')

		const pool = new Pool({
		user: 'emmas',
		host: 'localhost',
		database: 'tesis',
		password: 'emmas',
		port: 5432,
		})*/
		var email = req.body.email;
		var nombre = req.body.nombre;
		var password1 =password;
		// var password1 = req.body.password;
	
		// connection.query('SELECT * FROM public.users where  email = $1',[email],(err,results) => {
		// 	console.log(err,results)
		client.query('INSERT INTO public.users(email,nombre,password) values($1,$2,$3)',
		[email,nombre,password1],(err, results) => {
			
			console.log(err,results)
			console.log("-------------------------------------------");
			// var resp =JSON.stringify(results.rows);
			console.log(resp);
			//console.log(results.rows);
			console.log("-------------------------------------------");
			
			
  		 });
		//revsar 
		//connection.end()
		req.flash('info', 'Se ha registrado correctamente, ya puede iniciar sesion');
		return res.redirect('/');
	},

	getSignIn: function(req, res, next){
		return res.render('users/signin', {message: req.flash('info'), authmessage : req.flash('authmessage')});
	},
	
	logout : function(req, res, next){
		req.logout();
		res.redirect('/');
	},

	
	getInvestigador:function(req,res,next){
		client.query(`select i.id, i.nombre,i.apellido_1,i.apellido_2,i.esexterno,
		g.ngenero,
		g1.ngrado,
		d.ndepartamento
		from investigador i
		inner join genero g on i.genero_id=g.id
		inner join grado g1 on i.grado_id=g1.id
		inner join departamento d on i.departamento_id=d.id`,(err,results) => {
			console.log(err,results)
			
			//connection.end()

			res.render('users/investigador', {
				isAuthenticated : req.isAuthenticated(),
				user : req.user,
				items: results.rows,
				
			});
		});
	},
	getRegistrarTesis: function(req, res, next){

		client.query('SELECT * FROM public.investigador',(err,results) => {
			console.log(err,results)
			
			//connection.end()

			return res.render('users/registrarTesis', {
				isAuthenticated : req.isAuthenticated(),
				user : req.user,
				items: results.rows,
				
			});
		});
		
	},
	postRegistrarTesis : function(req,res, next){
		var titulo =req.body.titulo;
		var resumen = req.body.description;
		console.log(req.body.titulo);
		console.log(resumen)
		
		// const connection = require('.././database/config');
		// connection.query('INSERT INTO tesis(id,titulodetesis,resumen) values($1,$2,$3)',
		// [51,titulo,resumen],(err, results) => {
		// 	console.log(err,results)
		// 	console.log("-------------------------------------------");
		// 	var resp =JSON.stringify(results.rows);
		// 	console.log(resp);
		// 	//console.log(results.rows);
		// 	console.log("-------------------------------------------");
			return res.redirect('/users/status');
   		// });
	},
	getStatus: function(req, res, next){

		connection.query('SELECT * FROM public.tesis',(err,results) => {
			console.log(err,results)
			
			//connection.end()

			return res.render('users/status', {
				isAuthenticated : req.isAuthenticated(),
				user : req.user,
				items: results.rows,
				
			});
		});
		
	}
};