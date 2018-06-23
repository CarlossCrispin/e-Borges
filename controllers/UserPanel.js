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

        var valor= req.body.name
       
       
		// connection.query('SELECT * FROM public.investigador',(err,results) => {
		// 	console.log(err,results)
			
		// 	//connection.end()

		// 	res.render('users/panel', {
		// 		isAuthenticated : req.isAuthenticated(),
		// 		user : req.user,
		// 		items: results.rows,
				
		// 	});
		// });
		client.query(`select 
            t.id,
            t.titulodetesis,
            t.resumen,
            (a.nombre || ' '|| a.apellido_1 ||' '||a.apellido_2) as alumno,
            a1.id as id_alumno,
            g.ngrado, 
            d.ndepartamento,
            u.nunidad,
            (i.nombre || ' '|| i.apellido_1 ||' '||i.apellido_2) as director1,
            (i2.nombre || ' '|| i2.apellido_1 ||' '||i2.apellido_2) as director2,
            (i3.nombre || ' '|| i3.apellido_1 ||' '||i3.apellido_2) as director3,
            (i4.nombre || ' '|| i4.apellido_1 ||' '||i4.apellido_2) as director4,
            (i5.nombre || ' '|| i5.apellido_1 ||' '||i5.apellido_2) as director5
            from  tesis t
            inner join alumno a on t.alumno_id=a.id
            inner join alumno a1 on t.alumno_id=a1.id
            inner join grado g on t.grado_id=g.id
            inner join unidad u on t.unidad_id=u.id
            inner join departamento d on t.departamento_id=d.id
            inner join investigador i on t.investigador1_id=i.id
            left join investigador i2 on t.investigador2_id=i2.id
            left join investigador i3 on t.investigador2_id=i3.id
            left join investigador i4 on t.investigador2_id=i4.id
            left join investigador i5 on t.investigador2_id=i5.id`,(err,results) => {
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
                items4: results4.rows,
                tesis : req.flash('tesis'),
                tesiser : req.flash('tesiser')
				
			});
        });
        });
        });
        });
        });
	},
	postUserPanel : function(req, res, next){
      
        var bot=req.body.valor1
        var alumno = req.body.alumno;
        var titulo= req.body.titulo;
        var description= req.body.description;
        var grado = req.body.grado;
        var departamento=req.body.departamento;
        var unidad=req.body.unidad;
        var investigador1=req.body.investigador1;
        var tipo1=951;
       
        var investigador2 = ( req.body.investigador2  ) ? 'req.body.investigador2' : 'null';
        var tipo2=952;
        var investigador3 = ( req.body.investigador3  ) ? 'req.body.investigador3' : 'null';
        var investigador4 = ( req.body.investigador4  ) ? 'req.body.investigador4' : 'null';
        var investigador5 = ( req.body.investigador5  ) ? 'req.body.investigador5' : 'null';
        var eliminar1=req.body.eliminart;
        var eliminar2=req.body.eliminarg;

        if(bot ==="1")
        {
            console.log("*****************************************************");
            console.log("*****************************************************");
            console.log("*****************************************************");
            console.log("entra 1")
            client.query(
                'INSERT INTO public.tesis(id,titulodetesis,fechadepublicacion,resumen,'+
                'clasificacion,clasificacion_1,anio,mes,alumno_id,grado_id,departamento_id,unidad_id,'+
                'investigador1_id,tipoasesor1_id,investigador2_id,tipoasesor2_id,investigador3_id,tipoasesor3_id,'+
                'investigador4_id,tipoasesor4_id,investigador5_id,tipoasesor5_id) values (nextval (\'hibernate_sequence\'),\''+
                titulo+'\', null,\''+description+'\',null,null,null,null,\''+alumno+'\',\''+grado+'\',\''+departamento+'\','+
                '\''+unidad+'\',\''+investigador1+'\',\''+tipo1+'\','+
                'null,\''+tipo2+'\',null,\''+tipo2+'\',null,\''+tipo2+'\',null,\''+tipo2+'\')',
                (err, results) => {
                console.log(err,results)
                if(err) throw err;
                    req.flash('tesiser', 'Se ha presentado un erro');
                console.log("-------------------------------------------");
                // var resp =JSON.stringify(results.rows);
                // console.log();
                //console.log(results.rows);
                console.log("-------------------------------------------");
    
            });
            req.flash('tesis', 'Se ha registrado correctamente su tesis');
            return res.redirect('/users/panel');
        }
        if(bot ==="2")
        {
            console.log(eliminar1);
            console.log("*****************************************************");
            console.log("*****************************************************");
            console.log("*****************************************************");
            console.log("*****************************************************");
            console.log("entra 2")
            client.query('Delete from tesis where id=\''+eliminar1+'\'',
                (err, results) => {
                console.log(err,results)
                if(err) throw err;
                    req.flash('tesiser', 'Se ha presentado un erro');
                console.log("-------------------------------------------");
                // var resp =JSON.stringify(results.rows);
                // console.log();
                //console.log(results.rows);
                console.log("-------------------------------------------");
    
            });
            req.flash('tesis', 'Se ha registrado correctamente su tesis');
            return res.redirect('/users/panel');
        }
      
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
        
	}
}