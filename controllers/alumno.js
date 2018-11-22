var pg = require("pg")
const connection = require('.././database/config2');
const connectionString = process.env.DATABASE_URL || connection;

module.exports = {
    /*--------------------------------------------
    *         CONSULTAS PARA LA VISTA Alumno
	*-----------------------------------------------*/
    getAlumno: function (req, res, next) {
        return res.render('alumno/alumno', {
            isAuthenticated: req.isAuthenticated(),
            user: req.user
        });

    },
    dataAlumno: function (req, res, next) {
        var results = [];
        var results2 = [];
        var results3 = [];
        var datos=[];
        
        pg.connect(connectionString, function(err, client, done)  {
            if (err) {
                done();
                console.log(err);
                return res.status(500).json({ success: false, data: err });
            }
            var select =client.query(`SELECT a.idalumno, a.nombre, a.nombre2,a.nombre3,a.apellido,a.apellido2,a.apellido3,a.matricula, 
                a.idgenero,
                g.genero,
                a.iddepartamento,
                a.iddepartamento
                FROM "Tesis".alumno a
                inner join "Tesis".genero g on a.idgenero=g.idgenero`);
                // SELECT a.idalumno, a.nombre, a.nombre2,a.nombre3,a.apellido,a.apellido2,a.apellido3,a.matricula, 
                // a.idgenero,
                // g.genero,
                // a.iddepartamento,
                // d.iddepartamento
                // FROM "Tesis".alumno a
                // inner join "Tesis".genero g on a.idgenero=g.idgenero
                // inner join "Tesis".departamento d on a.iddepartamento=d.iddepartamento
            var select2 = client.query(`SELECT *  FROM "Tesis".genero`);
            var select3 = client.query(`SELECT * FROM "Tesis".departamento`);

            var query = select;
            query.on('row', (row) => {
                results.push(row);
            });
            var query = select2;
            query.on('row', (row) => {
                results2.push(row);
            });
            var query = select3;
            query.on('row', (row) => {
                results3.push(row);
            });
            query.on('end', () => {
                done();
                console.log("se cerro base de datos")
                // console.log(JSON.stringify(results3))
                datos=[{
                    alumnos:results,
                    genero:results2,
                    departamento:results3
                }]
                // console.log(datos)
                return res.json(datos);
            });
            
        });

    },
    insertAlumno : function(req,res,next){
   
        console.log("ENTRA")
        const results = [];
        var nombre = req.body.nombre;
        var apellido = req.body.apellido;
        var nom2 = req.body.nombre2 === undefined ? nombre2 = '' : nombre2 = req.body.nombre2
        var nom3 = req.body.nombre3 === undefined ? nombre3 = '' : nombre3 = req.body.nombre3
        var ape2 = req.body.apellido2 === undefined ? apellido2 = '' : apellido2 = req.body.apellido2
        var ape3 = req.body.apellido3 === undefined ? apellido3 = '' : apellido3 = req.body.apellido3
        var genero = req.body.genero;
        var matricula = req.body.matricula;
        var departamento = req.body.departamento;
        console.log(`-------DATOS------\n
        \n----------------------------------\n${nombre}\n${nombre2}\n${nombre3}\n${apellido}
        \n${apellido2}\n${apellido3}\n${matricula}\n${genero}\n${departamento}`)

        pg.connect(connectionString, function(err, client, done)  {
            // Handle connection errors
            if (err) {
                done();
                console.log(err);
                return res.status(500).json({ success: false, data: err });
            }
            // SQL Query > Select Data
            
            const query = client.query(`INSERT INTO "Tesis".alumno(
                nombre, nombre2, nombre3, apellido,
                 apellido2, apellido3, matricula, idgenero, iddepartamento)
                VALUES ('${nombre}', '${nombre2}', '${nombre3}',
                '${apellido}', '${apellido2}', '${apellido3}', ${matricula}, ${genero}, ${departamento})`);
            // Stream results back one row at a time
            query.on('row', (row) => {
                results.push(row);
            });
            // After all data is returned, close connection and return results
            query.on('end', () => {
                done();
                console.log("se cerro base de datos")
                // console.log(results)
                return res.json(results);
            
            });
            
        });  

    },
    updateAlumno : function (req, res, next) {
        const results = [];
        var id= req.body.id;
        var nombre = req.body.nombre;
        var apellido = req.body.apellido;
        var nom2 = req.body.nombre2 === undefined ? nombre2 = '' : nombre2 = req.body.nombre2
        var nom3 = req.body.nombre3 === undefined ? nombre3 = '' : nombre3 = req.body.nombre3
        var ape2 = req.body.apellido2 === undefined ? apellido2 = '' : apellido2 = req.body.apellido2
        var ape3 = req.body.apellido3 === undefined ? apellido3 = '' : apellido3 = req.body.apellido3
        var genero = req.body.genero;
        var matricula = req.body.matricula;
        var departamento = req.body.departamento;
        console.log(`-------DATOS------\n
        \n----------------------------------\n${nombre}\n${nombre2}\n${nombre3}\n${apellido}
        \n${apellido2}\n${apellido3}\n${matricula}\n${genero}\n${departamento}\n${"---->"+id}`)
        pg.connect(connectionString, function(err, client, done)  {
            // Handle connection errors
            if (err) {
                done();
                console.log(err);
                return res.status(500).json({ success: false, data: err });
            }
            // SQL Query > Select Data
            const query = client.query(`UPDATE "Tesis".alumno
            SET  nombre='${nombre}', nombre2='${nombre2}', nombre3='${nombre3}', apellido='${apellido}',
            apellido2= '${apellido2}', apellido3='${apellido3}', matricula=${matricula}, idgenero=${genero}, 
            iddepartamento= ${departamento}
            WHERE  idalumno=${id} `);
            // Stream results back one row at a time
            query.on('row', (row) => {
                results.push(row);
            });
            // After all data is returned, close connection and return results
            query.on('end', () => {
                done();
                console.log("se cerro base de datos")
                // console.log(results)
                req.flash('Edit', 'Se ha editado correctamente');
                return res.redirect('/alumno/alumno');
            });
            
        });    


    },
    deleteAlumno : function (req, res, next) {
        const results = [];
        
        var eliminar = req.body.idalumno;
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
            const query = client.query(`DELETE FROM "Tesis".alumno
            WHERE idalumno=${eliminar}`);
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
                return res.redirect('/alumno/alumno');
            });

        });

    },
    postAlumno : function(req,res,next){
        var opc = req.body.opc;
        var nombre = req.body.nombre;
        // var nombre2 = req.body.nombre2;
        // var nombre3 = req.body.nombre3;
        var apellido = req.body.apellido;
        // var apellido2 = req.body.ap2;
        // var apellido3 = req.body.ap3;
        var matricula= req.body.matricula;
        var departamento= req.body.departamento;
        var genero=req.body.genero;
        var grado = req.body.grado;
        var eliminar=req.body.eliminar;
        var editar =req.body.editar;
        var nom2 = req.body.nombre2 === undefined ? nombre2 = '' : nombre2 = req.body.nombre2
        var nom3 = req.body.nombre3 === undefined ? nombre3 = '' : nombre3 = req.body.nombre3
        var ape2 = req.body.apellido2 === undefined ? apellido2 = '' : apellido2 = req.body.apellido2
        var ape3 = req.body.apellido3 === undefined ? apellido3 = '' : apellido3 = req.body.apellido3
        
        
        console.log(`-------DATOS------\n${opc}\n${eliminar}\n${editar}
        \n----------------------------------\n${nombre}\n${nombre2}\n${nombre3}\n${apellido}
        \n${apellido2}\n${apellido3}\n${matricula}\n${genero}\n${departamento}\n${grado}`)
        if(opc ==='1'){

              
        }
        if(opc ==='2'){

            pg.connect(connectionString, function(err, client, done)  {
                // Handle connection errors
                if (err) {
                    done();
                    console.log(err);
                    return res.status(500).json({ success: false, data: err });
                }
                // SQL Query > Select Data
                const query = client.query(`DELETE FROM "Tesis".alumno
                WHERE idalumno=${eliminar}`);
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
                    return res.redirect('/alumno/alumno');
                });
                
            });    
        }
        if(opc ==='3'){

            
        }
    }
}