
var pg = require("pg")
const connection = require('.././database/config');
var client = new pg.Client(connection);
client.connect();
module.exports = {
    getUserPanel: function (req, res, next) {

        // var valor= req.body.departamento_id
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
            i11.id as id_dir1,
            (i2.nombre || ' '|| i2.apellido_1 ||' '||i2.apellido_2) as director2,
            i22.id as id_dir2,
            (i3.nombre || ' '|| i3.apellido_1 ||' '||i3.apellido_2) as director3,
            i33.id as id_dir3,
            (i4.nombre || ' '|| i4.apellido_1 ||' '||i4.apellido_2) as director4,
            i44.id as id_dir4,
            (i5.nombre || ' '|| i5.apellido_1 ||' '||i5.apellido_2) as director5,
            i55.id as id_dir5
            from  tesis t
            inner join alumno a on t.alumno_id=a.id
            inner join alumno a1 on t.alumno_id=a1.id
            inner join grado g on t.grado_id=g.id
            inner join unidad u on t.unidad_id=u.id
            inner join departamento d on t.departamento_id=d.id
            inner join investigador i on t.investigador1_id=i.id
            inner join investigador i11 on t.investigador1_id=i11.id
            left join investigador i2 on t.investigador2_id=i2.id
            left join investigador i22 on t.investigador2_id=i22.id
            left join investigador i3 on t.investigador3_id=i3.id
            left join investigador i33 on t.investigador3_id=i33.id
            left join investigador i4 on t.investigador4_id=i4.id
            left join investigador i44 on t.investigador4_id=i44.id
            left join investigador i5 on t.investigador5_id=i5.id
            left join investigador i55 on t.investigador5_id=i55.id`, (err, results) => {
                client.query('SELECT * FROM public.grado', (err, results1) => {
                    //console.log(err,results1)	
                    client.query('SELECT * FROM public.unidad', (err, results2) => {
                        //console.log(err,results2)
                        client.query('SELECT * FROM public.departamento', (err, results3) => {
                            //console.log(err,results3)
                            client.query('SELECT * FROM public.investigador', (err, results4) => {

                                client.query('SELECT * FROM public.alumno', (err, results5) => {

                                    //console.log(err,results4)
                                    //connection.end()

                                    return res.render('users/panel', {
                                        isAuthenticated: req.isAuthenticated(),
                                        user: req.user,
                                        // items: results.rows,
                                        // items1: results1.rows,
                                        // items2: results2.rows,
                                        // items3: results3.rows,
                                        // items4: results4.rows,
                                        // items5: results5.rows,
                                        tesis: req.flash('tesis'),
                                        tesisEliminar: req.flash('tesisEliminar'),
                                        tesisEditar: req.flash('tesisEditar'),
                                        tesiser: req.flash('tesiser')

                                    });
                                });
                            });
                        });
                    });
                });
            });
    },
    postUserPanel: function (req, res, next) {

        var bot = req.body.valor1
        var alumno = req.body.alumno;
        var titulo = req.body.titulo;
        var description = req.body.description;
        var grado = req.body.grado;
        var departamento = req.body.departamento;
        var unidad = req.body.unidad;
        var investigador1 = req.body.investigador1;
        var tipo1 = 951;

        // var investigador2 = ( req.body.investigador2  ) ? !punt: 'null';
        var tipo2 = 952;
        var inv1, inv2, inv3, inv4;
        var eliminar1 = req.body.eliminart;
        var editar = req.body.editar;
        var investigador2 = req.body.investigador2 === undefined ? inv1 = null : inv1 = req.body.investigador2
        var investigador3 = req.body.investigador3 === undefined ? inv2 = null : inv2 = req.body.investigador3
        var investigador4 = req.body.investigador4 === undefined ? inv3 = null : inv3 = req.body.investigador4
        var investigador2 = req.body.investigador5 === undefined ? inv4 = null : inv4 = req.body.investigador5

        if (bot === "1") {
            console.log("*****************************************************");
            console.log("*****************************************************");
            console.log("*****************************************************");
            console.log("entra 1")


            console.log(`uno--->${inv1}`);
            console.log(`dos--->${inv2}`);
            console.log(`tres--->${inv3}`);
            console.log(`cuatro--->${inv4}`);
            console.log("*****************************************************");
            console.log("*****************************************************");
            console.log("*****************************************************");
            client.query(`INSERT INTO public.tesis(id,titulodetesis,fechadepublicacion,resumen,
                clasificacion,clasificacion_1,anio,mes,alumno_id,grado_id,departamento_id,unidad_id,
                investigador1_id,tipoasesor1_id,investigador2_id,tipoasesor2_id,investigador3_id,tipoasesor3_id,
                investigador4_id,tipoasesor4_id,investigador5_id,tipoasesor5_id) values (nextval (\'hibernate_sequence\'),
                '${titulo}',null,'${description}',null,null,null,null,${alumno},${grado},${departamento},
                ${unidad},${investigador1},${tipo1},${inv1},${tipo2},${inv2},${tipo2},${inv3},
                ${tipo2},${inv4},${tipo2})`, (err, results) => {
                    console.log(err, results)
                    // if(err) throw err;
                    // if(err){
                    //     req.flash('tesiser', 'Se ha presentado un erro');
                    // }else{

                    // }
                    console.log("-------------------------------------------");
                    // var resp =JSON.stringify(results.rows);
                    // console.log();
                    //console.log(results.rows);
                    console.log("-------------------------------------------");

                });
            req.flash('tesis', 'Se ha registrado correctamente su tesis');
            return res.redirect('/users/panel');
        }
        if (bot === "2") {
            console.log(eliminar1);
            console.log("*****************************************************");
            console.log("*****************************************************");
            console.log("*****************************************************");
            console.log("*****************************************************");
            console.log("entra 2")
            client.query(
                `Delete from tesis where id=${eliminar1}`,
                (err, results) => {
                    console.log(err, results)
                    if (err) throw err;
                    req.flash('tesiser', 'Se ha presentado un error');
                    console.log("-------------------------------------------");
                    // var resp =JSON.stringify(results.rows);
                    // console.log();
                    //console.log(results.rows);
                    console.log("-------------------------------------------");

                });
            req.flash('tesisEliminar', 'Se ha eliminado correctamente su tesis');
            return res.redirect('/users/panel');
        }
        if (bot === "3") {
            console.log("*****************************************************");
            console.log("*****************************************************");
            console.log("*****************************************************");
            console.log("entra 3")
            client.query(
                `UPDATE public.tesis SET titulodetesis='${titulo}',resumen='${description}',
                grado_id=${grado},departamento_id=${departamento},unidad_id=${unidad},
                investigador1_id=${investigador1},investigador2_id=${inv1},investigador3_id=${inv2},
                investigador4_id=${inv3},investigador5_id=${inv4} where id=${editar} `, (err, results) => {
                    console.log(err, results)
                    // if(err) throw err;
                    // if(err){
                    //     req.flash('tesiser', 'Se ha presentado un erro');
                    // }else{

                    // }
                    console.log("-------------------------------------------");
                    // var resp =JSON.stringify(results.rows);
                    // console.log();
                    //console.log(results.rows);
                    console.log("-------------------------------------------");

                });
            req.flash('tesisEditar', 'Se ha editado correctamente su tesis');
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
// otrooooo
