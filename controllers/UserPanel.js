
var pg = require("pg")
const connection = require('.././database/config');
const connectionString = process.env.DATABASE_URL || connection;
module.exports = {
    getUserPanel: function (req, res, next) {

        return res.render('users/panel', {
            isAuthenticated: req.isAuthenticated(),
            user: req.user

        });
        // // var valor= req.body.departamento_id
        // client.query(`select 
        //     t.id,
        //     t.titulodetesis,
        //     t.resumen,
        //     (a.nombre || ' '|| a.apellido_1 ||' '||a.apellido_2) as alumno,
        //     a1.id as id_alumno,
        //     g.ngrado, 
        //     d.ndepartamento,
        //     u.nunidad,
        //     (i.nombre || ' '|| i.apellido_1 ||' '||i.apellido_2) as director1,
        //     i11.id as id_dir1,
        //     (i2.nombre || ' '|| i2.apellido_1 ||' '||i2.apellido_2) as director2,
        //     i22.id as id_dir2,
        //     (i3.nombre || ' '|| i3.apellido_1 ||' '||i3.apellido_2) as director3,
        //     i33.id as id_dir3,
        //     (i4.nombre || ' '|| i4.apellido_1 ||' '||i4.apellido_2) as director4,
        //     i44.id as id_dir4,
        //     (i5.nombre || ' '|| i5.apellido_1 ||' '||i5.apellido_2) as director5,
        //     i55.id as id_dir5
        //     from  tesis t
        //     inner join alumno a on t.alumno_id=a.id
        //     inner join alumno a1 on t.alumno_id=a1.id
        //     inner join grado g on t.grado_id=g.id
        //     inner join unidad u on t.unidad_id=u.id
        //     inner join departamento d on t.departamento_id=d.id
        //     inner join investigador i on t.investigador1_id=i.id
        //     inner join investigador i11 on t.investigador1_id=i11.id
        //     left join investigador i2 on t.investigador2_id=i2.id
        //     left join investigador i22 on t.investigador2_id=i22.id
        //     left join investigador i3 on t.investigador3_id=i3.id
        //     left join investigador i33 on t.investigador3_id=i33.id
        //     left join investigador i4 on t.investigador4_id=i4.id
        //     left join investigador i44 on t.investigador4_id=i44.id
        //     left join investigador i5 on t.investigador5_id=i5.id
        //     left join investigador i55 on t.investigador5_id=i55.id`, (err, results) => {
        //         client.query('SELECT * FROM public.grado', (err, results1) => {
        //             //console.log(err,results1)	
        //             client.query('SELECT * FROM public.unidad', (err, results2) => {
        //                 //console.log(err,results2)
        //                 client.query('SELECT * FROM public.departamento', (err, results3) => {
        //                     //console.log(err,results3)
        //                     client.query('SELECT * FROM public.investigador', (err, results4) => {

        //                         client.query('SELECT * FROM public.alumno', (err, results5) => {

        //                             //console.log(err,results4)
        //                             //connection.end()

        //                             return res.render('users/panel', {
        //                                 isAuthenticated: req.isAuthenticated(),
        //                                 user: req.user,
        //                                 // items: results.rows,
        //                                 // items1: results1.rows,
        //                                 // items2: results2.rows,
        //                                 // items3: results3.rows,
        //                                 // items4: results4.rows,
        //                                 // items5: results5.rows,
        //                                 tesis: req.flash('tesis'),
        //                                 tesisEliminar: req.flash('tesisEliminar'),
        //                                 tesisEditar: req.flash('tesisEditar'),
        //                                 tesiser: req.flash('tesiser')

        //                             });
        //                         });
        //                     });
        //                 });
        //             });
        //         });
        //     });
    },
    data: function (req, res, next) {
        var results = [];
        var results2 = [];
        var results3 = [];
        var results4 = [];
        var results5 = [];
        var results6 = [];
        var results7 = [];
        var results8 = [];
        var results9 = [];
        var datos=[];
        console.log(results)
        var id = req.user.id
        var rol = req.user.rol
        // var query;
        console.log("-------->" + rol)
        console.log("-------->" + id)
        // cliente de Postgres del grupo de conexiones

        pg.connect(connectionString, function (err, client, done) {
            // Handle connection errors
            if (err) {
                done();
                console.log(err);
                return res.status(500).json({ success: false, data: err });
            }
            // SQL Query > Select Data
            var select = client.query(`SELECT * FROM "Tesis".vtesis`);
            var select2 = client.query(`SELECT * FROM "Tesis".vtesis where idalumno=${id}`);
            var select3 = client.query(`SELECT * FROM "Tesis".vtesis where iddirector=${id} OR idcodirector1=${id} OR idcodirector2=${id}
                OR idcodirector3=${id} OR idcodirector4=${id}`);
            var select4 = client.query(`SELECT * FROM "Tesis".alumno`);
            var select5 = client.query(`SELECT * FROM "Tesis".grado`);
            var select6 = client.query(`SELECT * FROM "Tesis".departamento`);
            var select7 = client.query(`SELECT * FROM "Tesis".unidad`);
            var select8 = client.query(`SELECT a.idpersona, 
                (a.nombre || ' '||  a.nombre2 || ' '|| a.nombre3 || ' '|| a.apellido || ' '|| a.apellido2 || ' '|| a.apellido3) as nombre, 
                a.idgrado, a.idgenero, 
                a.iddepartamento, c.departamento,
                a.esexterno, a.institucion, a.puesto
                FROM "Tesis".persona a
                left join "Tesis".departamento c on a.iddepartamento=c.iddepartamento
                ORDER BY idpersona`);
            var select9 = client.query(`SELECT * FROM "Tesis".genero`);
            if(rol === 'Administrador')  
                var query = select
            if (rol === 'alumno') 
                var query = select2
            if (rol === 'persona') 
                var query = select3


            query.on('row', (row) => {
                results.push(row);
            });
           
            var query = select4
            query.on('row', (row) => {
                results4.push(row);
            });
            var query = select5
            query.on('row', (row) => {
                results5.push(row);
            });
            var query = select6
            query.on('row', (row) => {
                results6.push(row);
            });
            var query = select7
            query.on('row', (row) => {
                results7.push(row);
            });
            var query = select8
            query.on('row', (row) => {
                results8.push(row);
            });
            var query = select9
            query.on('row', (row) => {
                results9.push(row);
            });
           
            query.on('end', () => {
                done();
                console.log("se cerro base de datos")
                // console.log(JSON.stringify(results))
                // console.log(results)
                datos=[{
                    tesis:results,
                    alumno:results4,
                    grado:results5,
                    departamento:results6,
                    unidad:results7,
                    persona:results8,
                    genero:results9,
                    isAuthenticated: req.isAuthenticated(),
                    user: req.user
                }]
                return res.json(datos);
            });


        });
    },
    insert : function(req,res,next){
        console.log(`-------entrayaaaaaaaaaaaaaaaaaaaaaaa----------------`);
        var results=[];
        var results2=[];
        var alumno=  req.body.alumno;
        var titulo =req.body.titulo;
        var resumen = req.body.resumen;
        var grado = req.body.grado;
        var departamento =  req.body.departamneto;
        var unidad = req.body.unidad;
        var mes =  req.body.mes;
        var anio =  req.body.anio;
        var director =  req.body.director;
 
        var codirector = req.body.codirector === "" ? inv1 = null : inv1 = req.body.codirector
        var codirector2 = req.body.codirector2 === "" ? inv2 = null : inv2 = req.body.codirector2
        var codirector3 = req.body.codirector3 === "" ? inv3 = null : inv3 = req.body.codirector3
        var codirector4 = req.body.codirector4 === "" ? inv4 = null : inv4 = req.body.codirector4
        console.log(`-------DATOS------\n${alumno}\n${titulo}\n${resumen}
        \n${grado}\n${departamento}\n${unidad}\n${mes}\n${anio}\n${director}\n${inv1}\n${inv2}\n${inv3}\n${inv4}\n-----------------`)



        pg.connect(connectionString, function (err, client, done) {
      
            if (err) {
                done();
                console.log(err);
                return res.status(500).json({ success: false, data: err });
            }
            
            
            var select = client.query(`INSERT INTO "Tesis".tesis(
                mes, anio, idalumno, titulo, idgrado, resumen, iddepartamento, idunidad, "fechapublicación")
               VALUES (${mes},${anio},${alumno}, '${titulo}', ${grado}, '${resumen}', ${departamento}, ${unidad}, null)`);

            var select2 = client.query(`INSERT INTO "Tesis".tesispersona(
                idtesis, iddirector, idcodirector1, idcodirector2, idcodirector3, idcodirector4)
                VALUES ((SELECT MAX(idtesis) FROM "Tesis".tesis),${director},${inv1},${inv2},${inv3},${inv4} )`);
    
           
            var query=select;
            query.on('row', (row) => {
                results.push(row);
            });
            var query=select2;
            query.on('row', (row) => {
                results2.push(row);
            });
            
            query.on('end', () => {
                done();
                console.log("se cerro base de datos")
                // console.log(results)
                // req.flash('Insert', 'Se ha registrado correctamente');
                // return res.redirect('/tesis/tesis');
                return res.json(results);
            });

        });

    },
    add :function (req, res, next) {
        const results = [];
        const results2 = [];
        var datos=[];
        var nombre = req.body.nombre;
        var apellido = req.body.apellido;
        var editar = req.body.editar;
        var nom2 = req.body.nombre2 === undefined ? nombre2 = '' : nombre2 = req.body.nombre2
        var nom3 = req.body.nombre3 === undefined ? nombre3 = '' : nombre3 = req.body.nombre3
        var ape2 = req.body.apellido2 === undefined ? apellido2 = '' : apellido2 = req.body.apellido2
        var ape3 = req.body.apellido3 === undefined ? apellido3 = '' : apellido3 = req.body.apellido3
        var grado = req.body.grado;
        var genero = req.body.genero;
        var departamento = req.body.departamento;
        var externo = req.body.esexterno;
        var insti = req.body.institucion === undefined ? institucion = null : institucion = req.body.institucion
        var pue = req.body.puesto === undefined ? puesto = null : puesto = req.body.puesto

  

        console.log(`-------DATOS------\n${nombre}\n${nombre2}\n${nombre3}\n${apellido}
        \n${apellido2}\n${apellido3}\n${grado}\n${genero}\n${departamento}\n${externo}\n${institucion}\n${puesto}
        \n----------------------------------`)
        pg.connect(connectionString, function (err, client, done) {
            // Handle connection errors
            if (err) {
                done();
                console.log(err);
                return res.status(500).json({ success: false, data: err });
            }
            // SQL Query > Select Data

            var select = client.query(`INSERT INTO "Tesis".persona(
                nombre, nombre2, nombre3, apellido, apellido2, apellido3,
                idgrado, idgenero, iddepartamento, esexterno, institucion, puesto)
                VALUES ('${nombre}', '${nombre2}', '${nombre3}','${apellido}', '${apellido2}','${apellido3}',
                ${grado},${genero}, ${departamento}, ${externo},'${institucion}','${puesto}') RETURNING idpersona `);

            var select2 = client.query(`SELECT a.idpersona, 
                (a.nombre || ' '||  a.nombre2 || ' '|| a.nombre3 || ' '|| a.apellido || ' '|| a.apellido2 || ' '|| a.apellido3) as nombre, 
                a.idgrado, a.idgenero, 
                a.iddepartamento, c.departamento,
                a.esexterno, a.institucion, a.puesto
                FROM "Tesis".persona a
                left join "Tesis".departamento c on a.iddepartamento=c.iddepartamento
                ORDER BY idpersona`);  
            // Stream results back one row at a time
            var query=select
            query.on('row', (row) => {
                results.push(row);
            });
            var query=select2
            query.on('row', (row) => {
                results2.push(row);
            });
            
            // After all data is returned, close connection and return results
            query.on('end', () => {
                done();
                console.log("se cerro base de datos")
                console.log(results)
                // req.flash('Insert', 'Se ha registrado correctamente');
                // return res.redirect('/persona/persona');
                
                return res.json(results);
            });

        });

    },

    update : function(req,res,next){
        console.log(`-------entra  22222222222222----------------`);
        var results=[];
        var results2=[];
        var id=  req.body.id;
        var alumno=  req.body.alumno;
        var titulo =req.body.titulo;
        var resumen = req.body.resumen;
        var grado = req.body.grado;
        var departamento =  req.body.departamneto;
        var unidad = req.body.unidad;
        var mes =  req.body.mes;
        var anio =  req.body.anio;
        var director =  req.body.director;
 
        var codirector = req.body.codirector === "" ? inv1 = null : inv1 = req.body.codirector
        var codirector2 = req.body.codirector2 === "" ? inv2 = null : inv2 = req.body.codirector2
        var codirector3 = req.body.codirector3 === "" ? inv3 = null : inv3 = req.body.codirector3
        var codirector4 = req.body.codirector4 === "" ? inv4 = null : inv4 = req.body.codirector4
        console.log(`-------DATOS------\n${id}\n${alumno}\n${titulo}\n${resumen}
        \n${grado}\n${departamento}\n${unidad}\n${mes}\n${anio}\n${director}\n${inv1}\n${inv2}\n${inv3}\n${inv4}\n-----------------`)



        pg.connect(connectionString, function (err, client, done) {
      
            if (err) {
                done();
                console.log(err);
                return res.status(500).json({ success: false, data: err });
            }
            
            
            var select = client.query(`UPDATE "Tesis".tesis
                SET mes=${mes}, anio=${anio}, idalumno=${alumno}, titulo='${titulo}', idgrado=${grado}, resumen='${resumen}', 
                iddepartamento=${departamento}, idunidad=${unidad}
                WHERE idtesis=${id}`);
                
            var select2 = client.query(`UPDATE "Tesis".tesispersona
                SET  iddirector=${director}, idcodirector1=${inv1}, idcodirector2=${inv2}, idcodirector3=${inv3}, idcodirector4=${inv4}
                WHERE idtesis=${id}`);

            
    
           
            var query=select;
            query.on('row', (row) => {
                results.push(row);
            });
            var query=select2;
            query.on('row', (row) => {
                results2.push(row);
            });
            
            query.on('end', () => {
                done();
                console.log("se cerro base de datos")
                // console.log(results)
                // req.flash('Insert', 'Se ha registrado correctamente');
                // return res.redirect('/tesis/tesis');
                return res.json(results);
            });

        });

    },
    delete: function (req, res, next) {
        const results = [];
        
        var id = req.body.id;
        var idp = req.body.idp;
        console.log(`-------DATOS------\n${id}\n${idp}
        \n--------------------------------`)
        pg.connect(connectionString, function (err, client, done) {

            if (err) {
                done();
                console.log(err);
                return res.status(500).json({ success: false, data: err });
            }
            
            var select = client.query(`DELETE FROM "Tesis".tesispersona  WHERE idtesispersona=${id}`);
            var select2 = client.query(`DELETE FROM "Tesis".tesis  WHERE idtesis=${id}`);
            
            var query = select
            query.on('row', (row) => {
                results.push(row);
            });
            var query = select2
            query.on('row', (row) => {
                results.push(row);
            });
            // After all data is returned, close connection and return results
            query.on('end', () => {
                done();
                console.log("se cerro base de datos")
                // console.log(results)
                req.flash('Delete', 'Se ha eliminado correctamente');
                return res.json(results);
                // return res.redirect('/persona/persona');
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
