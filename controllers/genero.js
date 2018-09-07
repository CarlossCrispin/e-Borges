var pg = require("pg")
const connection = require('.././database/config2');
const connectionString = process.env.DATABASE_URL || connection;

module.exports = {
    /*--------------------------------------------
    *         CONSULTAS PARA LA VISTA GENERO
    CREATE SEQUENCE hibernate_sequence START WITH 1 INCREMENT BY 1 NO CYCLE;
	*-----------------------------------------------*/
    getGenero: function (req, res, next) {

        const results = [];
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
            const query = client.query(`SELECT id, genero
            FROM "Tesis".genero`);
            // Stream results back one row at a time
            query.on('row', (row) => {
                results.push(row);
            });
            // After all data is returned, close connection and return results
            query.on('end', () => {
                done();
                console.log("se cerro base de datos")
                console.log(JSON.stringify(results))
                return res.render('genero/genero', {
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
    postGenero : function(req,res,next){
        var opc = req.body.opc;
        var genero = req.body.genero;
        var eliminar=req.body.eliminar;
        var editar =req.body.editar;
        console.log(`-------DATOS------\n${opc}\n${genero}\n${eliminar}\n${editar}`)
        if(opc ==='1'){

            pg.connect(connectionString, function(err, client, done)  {
                // Handle connection errors
                if (err) {
                    done();
                    console.log(err);
                    return res.status(500).json({ success: false, data: err });
                }
                // SQL Query > Select Data
                
                const query = client.query(`INSERT INTO "Tesis".genero(
                    id, genero)
                    VALUES (nextval (\'hibernate_sequence\'), '${genero}')`);
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
                    return res.redirect('/genero/genero');
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
                const query = client.query(`DELETE FROM "Tesis".genero
                WHERE id=${eliminar}`);
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
                    return res.redirect('/genero/genero');
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
                const query = client.query(`UPDATE "Tesis".genero SET
                genero='${genero}' WHERE id=${editar}`);
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
                    return res.redirect('/genero/genero');
                });
                
            });    
        }
    }
}