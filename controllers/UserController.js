//var mysql = require('mysql');
//const {Pool}  = require("pg")
var bcrypt = require('bcryptjs');

module.exports = {

	getSignUp : function(req, res, next){
		return res.render('users/signup');
	},

	postSignUp: function(req, res, next){
		
		var salt = bcrypt.genSaltSync(10);
		var password = bcrypt.hashSync(req.body.password, salt);

		/*var user = {
			email : req.body.email,
			nombre : req.body.nombre,
			password : password
		
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
		var password1 = password;
		const connection = require('.././database/config');
		// connection.query('SELECT * FROM public.users where  email = $1',[email],(err,results) => {
		// 	console.log(err,results)
		connection.query('INSERT INTO users(email,nombre,password) values($1,$2,$3)',
		[email,nombre,password1],(err, results) => {
			console.log(err,results)
			console.log("-------------------------------------------");
			var resp =JSON.stringify(results.rows);
			console.log(resp);
			//console.log(results.rows);
			console.log("-------------------------------------------");
			
   });
   //revsar 
//connection.end()
		req.flash('info', 'Se ha registrado correctamente, ya puede iniciar sesion');
		return res.redirect('/auth/signin');
	},

	getSignIn: function(req, res, next){
		return res.render('users/signin', {message: req.flash('info'), authmessage : req.flash('authmessage')});
	},

	logout : function(req, res, next){
		req.logout();
		res.redirect('/auth/signin');
	},

	getUserPanel : function(req, res, next){
		res.render('users/panel', {
			isAuthenticated : req.isAuthenticated(),
			user : req.user
		});
	}



};