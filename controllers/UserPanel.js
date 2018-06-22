// var bcrypt = require('bcryptjs');

var pg = require("pg")
var bcrypt = require('bcryptjs');
const connection = require('.././database/config');
var client = new pg.Client(connection);
client.connect();
// var alumno =[], titulo=[], descripcion=[];
// function enviarRegistro(req, res) {
// 	res.render('estadisticas/tesis', {
// 		items1: graficasT[0],
// 		title: titleT[0],
// 		isAuthenticated: req.isAuthenticated(),
// 		user: req.user
// 	});
// }
module.exports = {
    getUserPanel : function(req, res, next){

        var depa = req.body.user
       
		// connection.query('SELECT * FROM public.investigador',(err,results) => {
		// 	console.log(err,results)
			
		// 	//connection.end()

		// 	res.render('users/panel', {
		// 		isAuthenticated : req.isAuthenticated(),
		// 		user : req.user,
		// 		items: results.rows,
				
		// 	});
		// });
		client.query('SELECT * FROM public.tesis',(err,results) => {
			// console.log(err,results)
        client.query('SELECT * FROM public.grado',(err,results1) => {
            //console.log(err,results1)	
        client.query('SELECT * FROM public.unidad',(err,results2) => {
            //console.log(err,results2)
        client.query('SELECT * FROM public.departamento',(err,results3) => {
            //console.log(err,results3)
        client.query('SELECT * FROM public.investigador',(err,results4) => {
            //console.log(err,results4)
			//connection.end()

			return res.render('users/panel', {
				isAuthenticated : req.isAuthenticated(),
				user : req.user,
                items: results.rows,
                items1: results1.rows,
                items2: results2.rows,
                items3: results3.rows,
                items4: results4.rows
				
			});
        });
        });
        });
        });
        });
	},
	postUserPanel : function(req, res, next){
      
        var alumno = req.body.alumno;
        var titulo= req.body.titulo;
        var description= req.body.description;
        var grado = req.body.grado;
        var departamento=req.body.departamento;
        var unidad=req.body.unidad;
        var investigador1=req.body.investigador1;
        var tipo1=951;
        var investigador2=req.body.investigador2;
        var tipo2=952;
        var investigador3=req.body.investigador3;
        var tipo3=952;
      
        // var num ="nextval (\'hibernate_sequence\')";
        // console.log("*****************************************************");
        // console.log(user.nombre);
        
       
        /*
        INSERT INTO public.tesis(id,titulodetesis,fechadepublicacion,resumen,clasificacion,clasificacion_1,anio,'+
                'mes,alumno_id,grado_id,departamento_id,unidad_id,investigador1_id,tipoasesor1_id,'+
                'investigador2_id,tipoasesor2_id,investigador3_id,tipoasesor3_id,investigador4_id,tipoasesor4_id,'+
                'investigador5_id,tipoasesor5_id) values'+
                '(nextval (\'hibernate_sequence\'),titulo,null,null,null,null,null,null,null,null,'+
                                                        'null,null,null,null,null,null,null,null,null,null,null,null)',
        */    
        client.query(
            'INSERT INTO public.tesis(id,titulodetesis,fechadepublicacion,resumen,'+
            'clasificacion,clasificacion_1,anio,mes,alumno_id,grado_id,departamento_id,unidad_id,'+
            'investigador1_id,tipoasesor1_id,investigador2_id,tipoasesor2_id,investigador3_id,tipoasesor3_id,'+
            'investigador4_id,tipoasesor4_id,investigador5_id,tipoasesor5_id) values (nextval (\'hibernate_sequence\'),\''+
            titulo+'\', null,\''+description+'\',null,null,null,null,\''+alumno+'\',\''+grado+'\',\''+departamento+'\','+
            '\''+unidad+'\',\''+investigador1+'\',\''+tipo1+'\','+
            '\''+investigador2+'\',\''+tipo2+'\',\''+investigador3+'\',\''+tipo3+'\',null,null,null,null)',
            (err, results) => {
            console.log(err,results)
			console.log("-------------------------------------------");
			// var resp =JSON.stringify(results.rows);
			// console.log();
			//console.log(results.rows);
			console.log("-------------------------------------------");

        });
        return res.redirect('/users/panel');
	}
}