var pg = require("pg")
const connection = require('.././database/config2');
const connectionString = process.env.DATABASE_URL || connection;

module.exports = {
    /*--------------------------------------------
    *         CONSULTAS PARA LA VISTA Alumno
	*-----------------------------------------------*/
    getAlumno: function (req, res, next) {

        const results = [];
        const results2 = [];
        const results3 = [];
        const results4 = [];
        console.log(results)
        // cliente de Postgres del grupo de conexiones
        pg.connect(connectionString, function(err, client, done)  {
            // Handle connection errors
            if (err) {
                done();
                console.log(err);
                return res.status(500).json({ success: false, data: err });
            }
            // SQL Query > Select Data
            const query = client.query(`SELECT *
            FROM "Tesis".alumno`);
            const query2 = client.query(`SELECT *
            FROM "Tesis".genero`);
            const query3 = client.query(`SELECT *
            FROM "Tesis".departamento`);
            const query4 = client.query(`SELECT *
            FROM "Tesis".grado`);
            // Stream results back one row at a time
            query.on('row', (row) => {
                results.push(row);
            });
            query2.on('row', (row) => {
                results2.push(row);
            });
            query3.on('row', (row) => {
                results3.push(row);
            });
            query4.on('row', (row) => {
                results4.push(row);
            });
            // After all data is returned, close connection and return results
            query.on('end', () => {
                done();
                console.log("se cerro base de datos")
                console.log(JSON.stringify(results))
            });
            query2.on('end', () => {
                done();
                console.log("se cerro base de datos")
                console.log(JSON.stringify(results2))
            });
            query3.on('end', () => {
                done();
                console.log("se cerro base de datos")
                console.log(JSON.stringify(results3))
            });
            query4.on('end', () => {
                done();
                console.log("se cerro base de datos")
                console.log(JSON.stringify(results4))
                return res.render('alumno/alumno', {
                    isAuthenticated: req.isAuthenticated(),
                    user: req.user,
                    items: results,
                    items2: results2,
                    items3: results3,
                    items4: results4,
                    Insert:req.flash('Insert'),
                    Delete:req.flash('Delete'),
                    Edit:req.flash('Edit')
                });;
            });
            
        });    

    },
    postAlumno : function(req,res,next){
        var opc = req.body.opc;
        var nombre = req.body.nombre;
        var nombre2 = req.body.nombre2;
        var nombre3 = req.body.nombre3;
        var apellido = req.body.ap;
        var apellido2 = req.body.ap2;
        var apellido3 = req.body.ap3;
        var matricula= req.body.matricula;
        var departamento= req.body.departamento;
        var genero=req.body.genero;
        var grado = req.body.grado;
        var eliminar=req.body.eliminar;
        var editar =req.body.editar;
        console.log(`-------DATOS------\n${opc}\n${eliminar}\n${editar}
        \n----------------------------------\n${nombre}\n${nombre2}\n${nombre3}\n${apellido}
        \n${apellido2}\n${apellido3}\n${matricula}\n${genero}\n${departamento}\n${grado}`)
        if(opc ==='1'){

            pg.connect(connectionString, function(err, client, done)  {
                // Handle connection errors
                if (err) {
                    done();
                    console.log(err);
                    return res.status(500).json({ success: false, data: err });
                }
                // SQL Query > Select Data
                
                const query = client.query(`INSERT INTO "Tesis".alumno(
                    idalumno, nombre, nombre2, nombre3, apellido,
                     apellido2, apellido3, matricula, idgenero, iddepartamento, idgrado)
                    VALUES (nextval (\'hibernate_sequence\'),'${nombre}', '${nombre2}', '${nombre3}',
                    '${apellido}', '${apellido2}', '${apellido3}', ${matricula}, ${genero}, ${departamento}, ${grado})`);
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
                    return res.redirect('/alumno/alumno');
                });
                
            });    
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
                const query = client.query(``);
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
                iddepartamento= ${departamento}, idgrado= ${grado}
                WHERE  idalumno=${editar} `);
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
        }
    }
}