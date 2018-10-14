var pg = require("pg")
const connection = require('.././database/config');
const connectionString = process.env.DATABASE_URL || connection;

module.exports = {
    /*--------------------------------------------
    *         CONSULTAS PARA LA VISTA Persona
//     *-----------------------------------------------*/
//    SELECT p.idpersona,
//    p.nombre,
//    p.nombre2,
//    p.nombre3,
//    p.apellido,
//    p.apellido2,
//    p.apellido3,
//    g.grado,
//    c.genero,
//    d.departamento,
//    p.esexterno,
//    p.institucion,
//    p.puesto
//   FROM "Tesis".persona p
//     JOIN "Tesis".grado g ON p.idgrado = g.idgrado
//     JOIN "Tesis".genero c ON p.idgenero = c.idgenero
//     JOIN "Tesis".departamento d ON p.iddepartamento = d.iddepartamento;
    getPersona: function (req, res, next) {
        return res.render('persona/persona', {
            isAuthenticated: req.isAuthenticated(),
            user: req.user,
           
            // items2: results2,
            // items3: results3,
            // items4: results4,
            Insert: req.flash('Insert'),
            Delete: req.flash('Delete'),
            Edit: req.flash('Edit')
        });;

       
    },
    data:function (req, res, next) {
        const results = [];
      
        console.log(results)
        // cliente de Postgres del grupo de conexiones
        pg.connect(connectionString, function (err, client, done) {
            // Handle connection errors
            if (err) {
                done();
                console.log(err);
                return res.status(500).json({ success: false, data: err });
            }
            // SQL Query > Select Data
            var select= client.query(`SELECT * FROM "Tesis".vpersona`);
            var select2 = client.query(`SELECT *
            FROM "Tesis".genero`);
            const query3 = client.query(`SELECT *
            FROM "Tesis".departamento`);
            const query4 = client.query(`SELECT *
            FROM "Tesis".grado`);
            // Stream results back one row at a time
            
            var query = select
            query.on('row', (row) => {
                results.push(row);
            });
           
            // query2.on('row', (row) => {
            //     results2.push(row);
            // });
            // query3.on('row', (row) => {
            //     results3.push(row);
            // });
            // query4.on('row', (row) => {
            //     results4.push(row);
            // });
            // After all data is returned, close connection and return results
            // query.on('end', () => {
            //     done();
            //     console.log("se cerro base de datos")
            //     console.log(JSON.stringify(results))
            // });
            // query2.on('end', () => {
            //     done();
            //     console.log("se cerro base de datos")
            //     // console.log(JSON.stringify(results2))
            // });
            // query3.on('end', () => {
            //     done();
            //     console.log("se cerro base de datos")
            //     // console.log(JSON.stringify(results3))
            // });
            query.on('end', () => {
                done();
                console.log("se cerro base de datos")
                // console.log(results)
                return res.json(results);

                
            });

        });


    },
    dataGenero:function (req, res, next) {
        const results = [];
        console.log(results)
        // cliente de Postgres del grupo de conexiones
        pg.connect(connectionString, function (err, client, done) {
            // Handle connection errors
            if (err) {
                done();
                console.log(err);
                return res.status(500).json({ success: false, data: err });
            }
            // SQL Query > Select Data
          
            var select = client.query(`SELECT *
            FROM "Tesis".genero`);
            const query3 = client.query(`SELECT *
            FROM "Tesis".departamento`);
            const query4 = client.query(`SELECT *
            FROM "Tesis".grado`);
            // Stream results back one row at a time
            
            var query = select
            query.on('row', (row) => {
                results.push(row);
            });
         
            query.on('end', () => {
                done();
                console.log("se cerro base de datos")
                // console.log(results)
                return res.json(results);

                
            });

        });


    },
    dataGrado:function (req, res, next) {

        const results = [];
     
        pg.connect(connectionString, function (err, client, done) {
      
            if (err) {
                done();
                console.log(err);
                return res.status(500).json({ success: false, data: err });
            }
           
            const select= client.query(`SELECT * FROM "Tesis".grado`);
        
            var query = select
            query.on('row', (row) => {
                results.push(row);
            });
         
            query.on('end', () => {
                done();
                console.log("se cerro base de datos")
                // console.log(results)
                return res.json(results);

                
            });

        });


    },
    dataDepto:function (req, res, next) {

        const results = [];
     
        pg.connect(connectionString, function (err, client, done) {
      
            if (err) {
                done();
                console.log(err);
                return res.status(500).json({ success: false, data: err });
            }
           
            const select= client.query(`SELECT * FROM "Tesis".departamento`);
        
            var query = select
            query.on('row', (row) => {
                results.push(row);
            });
         
            query.on('end', () => {
                done();
                console.log("se cerro base de datos")
                // console.log(results)
                return res.json(results);

                
            });

        });


    },
    insertPersona:function (req, res, next) {
        const results = [];
        var opc = req.body.opc;
        var nombre = req.body.nombre;
        var apellido = req.body.apellido;
        var eliminar = req.body.eliminar;
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

  

        console.log(`-------DATOS------\n${opc}\n${eliminar}\n${editar}
        \n----------------------------------\n${nombre}\n${nombre2}\n${nombre3}\n${apellido}
        \n${apellido2}\n${apellido3}\n${grado}\n${genero}\n${departamento}\n${externo}\n${institucion}\n${puesto}`)
        pg.connect(connectionString, function (err, client, done) {
            // Handle connection errors
            if (err) {
                done();
                console.log(err);
                return res.status(500).json({ success: false, data: err });
            }
            // SQL Query > Select Data

            const query = client.query(`INSERT INTO "Tesis".persona(
                nombre, nombre2, nombre3, apellido, apellido2, apellido3,
                idgrado, idgenero, iddepartamento, esexterno, institucion, puesto)
                VALUES ('${nombre}', '${nombre2}', '${nombre3}','${apellido}', '${apellido2}','${apellido3}',
                ${grado},${genero}, ${departamento}, ${externo},'${institucion}','${puesto}')`);
            // Stream results back one row at a time
            query.on('row', (row) => {
                results.push(row);
            });
            // After all data is returned, close connection and return results
            query.on('end', () => {
                done();
                console.log("se cerro base de datos")
                // console.log(results)
                req.flash('Insert', 'Se ha registrado correctamente');
                return res.redirect('/persona/persona');
            });

        });

    },
    updatePersona : function (req, res, next) {
        const results = [];
        var nombre = req.body.nombre;
        var apellido = req.body.apellido;
        var editar = req.body.idpersona;
        var nom2 = req.body.nombre2 === undefined ? nombre2 = NULL : nombre2 = req.body.nombre2
        var nom3 = req.body.nombre3 === undefined ? nombre3 = NULL : nombre3 = req.body.nombre3
        var ape2 = req.body.apellido2 === undefined ? apellido2 = NULL : apellido2 = req.body.apellido2
        var ape3 = req.body.apellido3 === undefined ? apellido3 =NULL : apellido3 = req.body.apellido3
        var grado = req.body.grado;
        var genero = req.body.genero;
        var departamento = req.body.departamento;
        var externo = req.body.esexterno;
        var insti = req.body.institucion === undefined ? institucion =NULL  : institucion = req.body.institucion
        var pue = req.body.puesto === undefined ? puesto =NULL  : puesto= req.body.puesto
        pg.connect(connectionString, function (err, client, done) {
            // Handle connection errors
            if (err) {
                done();
                console.log(err);
                return res.status(500).json({ success: false, data: err });
            }
            // SQL Query > Select Data
            const query = client.query(`UPDATE "Tesis".persona
                SET  nombre='${nombre}', nombre2='${nombre2}', nombre3='${nombre3}', apellido='${apellido}',
                apellido2= '${apellido2}', apellido3='${apellido3}', idgrado=${grado},idgenero=${genero}, 
                iddepartamento= ${departamento},esexterno=${externo}, institucion='${institucion}', puesto='${puesto}'
                WHERE  idpersona=${editar} `);
            query.on('row', (row) => {
                results.push(row);
            });
            query.on('end', () => {
                done();
                console.log("se cerro base de datos")
                // console.log(results)
                req.flash('Edit', 'Se ha editado correctamente');
                return res.redirect('/persona/persona');
            });

        });
  

       


    },
    deletePersona: function (req, res, next) {
        const results = [];
        
        var eliminar = req.body.idpersona;
        console.log(`-------DATOS------\n${eliminar}
        \n--------------------------------`)
        pg.connect(connectionString, function (err, client, done) {
            // Handle connection errors
            if (err) {
                done();
                console.log(err);
                return res.status(500).json({ success: false, data: err });
            }
            // SQL Query > Select Data
            const query = client.query(`DELETE FROM "Tesis".persona
            WHERE idpersona=${eliminar}`);
            // Stream results back one row at a time
            query.on('row', (row) => {
                results.push(row);
            });
            // After all data is returned, close connection and return results
            query.on('end', () => {
                done();
                console.log("se cerro base de datos")
                // console.log(results)
                req.flash('Delete', 'Se ha eliminado correctamente');
                return res.redirect('/persona/persona');
            });

        });

    },
    postPersona: function (req, res, next) {
        const results = [];
        var opc = req.body.opc;
        var nombre = req.body.nombre;
        var apellido = req.body.apellido;
        var eliminar = req.body.eliminar;
        var editar = req.body.editar;
        var nom2 = req.body.nombre2 === undefined ? nombre2 = NULL : nombre2 = req.body.nombre2
        var nom3 = req.body.nombre3 === undefined ? nombre3 = '' : nombre3 = req.body.nombre3
        var ape2 = req.body.apellido2 === undefined ? apellido2 = '' : apellido2 = req.body.apellido2
        var ape3 = req.body.apellido3 === undefined ? apellido3 = '' : apellido3 = req.body.apellido3
        var grado = req.body.grado;
        var genero = req.body.genero;
        var departamento = req.body.departamento;
        var externo = req.body.esexterno;
        var insti = req.body.institucion === undefined ? institucion = '' : institucion = req.body.institucion
        var pue = req.body.puesto === undefined ? puesto = '' : puesto= req.body.puesto

  

        console.log(`-------DATOS------\n${opc}\n${eliminar}\n${editar}
        \n----------------------------------\n${nombre}\n${nombre2}\n${nombre3}\n${apellido}
        \n${apellido2}\n${apellido3}\n${grado}\n${genero}\n${departamento}\n${externo}\n${institucion}\n${puesto}`)
        if (opc === '1') {

            pg.connect(connectionString, function (err, client, done) {
                // Handle connection errors
                if (err) {
                    done();
                    console.log(err);
                    return res.status(500).json({ success: false, data: err });
                }
                // SQL Query > Select Data

                const query = client.query(`INSERT INTO "Tesis".persona(
                    nombre, nombre2, nombre3, apellido, apellido2, apellido3,
                     idgrado, idgenero, iddepartamento, esexterno, institucion, puesto)
                    VALUES (${nombre}, ${nombre2}, '${nombre3}','${apellido}', '${apellido2}','${apellido3}',
                    ${grado},${genero}, ${departamento}, ${externo},'${institucion}','${puesto}')`);
                // Stream results back one row at a time
                query.on('row', (row) => {
                    results.push(row);
                });
                // After all data is returned, close connection and return results
                query.on('end', () => {
                    done();
                    console.log("se cerro base de datos")
                    // console.log(results)
                    req.flash('Insert', 'Se ha registrado correctamente');
                    return res.redirect('/persona/persona');
                });

            });
        }
        
       
    }
}