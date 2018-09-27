var pg = require("pg")
const connection = require('.././database/config2');
const connectionString = process.env.DATABASE_URL || connection;

module.exports = {
    /*--------------------------------------------
	*         CONSULTAS PARA LA VISTA UNIDAD
	*-----------------------------------------------*/
    getUnidad: function (req, res, next) {

        const results = [];
  
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
                FROM "Tesis".unidad`);
            
            // Stream results back one row at a time
            query.on('row', (row) => {
                results.push(row);
            });
            
            // After all data is returned, close connection and return results
            
            query.on('end', () => {
                done();
                console.log("se cerro base de datos\n------------->\n\n\n")
                console.log(JSON.stringify(results))
                return res.render('unidad/unidad', {
                    isAuthenticated: req.isAuthenticated(),
                    user: req.user,
                    items: results,
                    Insert:req.flash('Insert'),
                    Delete:req.flash('Delete'),
                    Edit:req.flash('Edit')
                });;
            });
            
        });    

    },
    postUnidad: function(req,res,next){
        var opc = req.body.opc;
        var nombre= req.body.unidad;
        var lugar= req.body.lugar;
        var eliminar=req.body.eliminar;
        var editar =req.body.editar;
        console.log(`-------DATOS------\n${opc}\n${nombre}\n${eliminar}
        \n${lugar}\n${editar}\n---------------------`)
        if(opc ==='1'){

            pg.connect(connectionString, function(err, client, done)  {
                // Handle connection errors
                if (err) {
                    done();
                    console.log(err);
                    return res.status(500).json({ success: false, data: err });
                }
                // SQL Query > Select Data
                // INSERT INTO "Tesis".unidad(
                //     id, unidad, especialidad_id)
                //     VALUES (nextval (\'hibernate_sequence\'), '${nombre}','${lugar}'
                const query = client.query(`
                    INSERT INTO "Tesis".unidad(
                         nombre, lugar)
                        VALUES ('${nombre}','${lugar}')`);
                // Stream results back one row at a time
                query.on('row', (row) => {
                    results.push(row);
                    console.log(JSON.stringify(row));
                });
                // After all data is returned, close connection and return results
                query.on('end', () => {
                    done();
                    console.log("se cerro base de datos")
                    // console.log(results.row)
                    req.flash('Insert', 'Se ha registrado correctamente');
                    return res.redirect('/unidad/unidad');
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
                const query = client.query(`DELETE FROM "Tesis".unidad
                WHERE idunidad=${eliminar}`);
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
                    return res.redirect('/unidad/unidad');
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
                const query = client.query(`UPDATE "Tesis".unidad
                SET nombre='${nombre}', lugar='${lugar}'
                WHERE  idunidad=${editar}`);
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
                    return res.redirect('/unidad/unidad');
                });
                
            });    
        }
    }
}