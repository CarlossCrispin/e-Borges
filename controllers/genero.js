var pg = require("pg")
const connection = require('.././database/config');
const connectionString = process.env.DATABASE_URL || connection;

module.exports = {
    /*--------------------------------------------
    *         CONSULTAS PARA LA VISTA GENERO
    CREATE SEQUENCE hibernate_sequence START WITH 1 INCREMENT BY 1 NO CYCLE;
	*-----------------------------------------------*/
    getGenero: function (req, res, next) {
        return res.render('genero/genero',{
            isAuthenticated: req.isAuthenticated(),
            user: req.user
        });

    },
    data : function(req,res,next){
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
            const query = client.query(`SELECT *
            FROM "Tesis".genero`);
            // Stream results back one row at a time
            query.on('row', (row) => {
                results.push(row);
            });
            // After all data is returned, close connection and return results
            query.on('end', () => {
                done();
                console.log("se cerro base de datos")
                // console.log(JSON.stringify(results))
                console.log(results)
                return res.json(results);
            });
            
        });    
    },
    insert : function(req,res,next){
        const results = [];
        var opc = req.body.opc;
        var genero = req.body.genero;
        var eliminar=req.body.eliminar;
        var editar =req.body.editar;
        console.log(`-------DATOS------\n${opc}\n${genero}\n${eliminar}\n${editar}`)
        pg.connect(connectionString, function(err, client, done)  {
            // Handle connection errors
            if (err) {
                done();
                console.log(err);
                return res.status(500).json({ success: false, data: err });
            }
            // SQL Query > Select Data
            
            const query = client.query(`INSERT INTO "Tesis".genero(
                genero)
                VALUES ('${genero}')`);
            // Stream results back one row at a time
            query.on('row', (row) => {
                results.push(row);
            });
            // After all data is returned, close connection and return results
            query.on('end', () => {
                done();
                console.log("se cerro base de datos")
                // console.log(results)
                // req.flash('Insert', 'Se ha registrado correctamente');
                console.log(results)
                return res.json(results);
                
            });
            
        }); 

    },
    delete : function (req, res, next) {
        const results = [];
        var opc = req.body.opc;
        var genero = req.body.genero;
        var eliminar=req.body.eliminar;
        // const id = req.params.id
        var editar =req.body.editar;
        console.log(`-------DATOS------\n${opc}\n${eliminar}\n${editar}`)
        // Get a Postgres client from the connection pool
        pg.connect(connectionString, (err, client, done) => {
            // Handle connection errors
            if (err) {
                done();
                console.log(err);
                return res.status(500).json({ success: false, data: err });
            }
            // SQL Query > Delete Data
            client.query(`DELETE FROM "Tesis".genero
            WHERE idgenero=${eliminar}`);
            // SQL Query > Select Data
            var query = client.query('SELECT * FROM "Tesis".genero ORDER BY idgenero ASC');
            // Stream results back one row at a time
            query.on('row', (row) => {
                results.push(row);
            });
            // After all data is returned, close connection and return results
            query.on('end', () => {
                done();
                console.log("se cerro base de datos")
                return res.json(results);
            });
        });
    },
    update  : function (req, res, next) {
        console.log("entro a update")
        const results = [];
        var genero = req.body.genero;
        var eliminar=req.body.eliminar;
        var editar =req.body.idgenero;
        console.log(`-------DATOS------\n${genero}\n${eliminar}\n${editar}`)
        pg.connect(connectionString, (err, client, done) => {
            if (err) {
                done();
                console.log(err);
                return res.status(500).json({ success: false, data: err });
            }
            client.query(`UPDATE "Tesis".genero SET
            genero='${genero}' WHERE idgenero=${editar}`);
            // SQL Query > Select Data
            var query = client.query('SELECT * FROM "Tesis".genero ORDER BY idgenero ASC');
            // Stream results back one row at a time
            query.on('row', (row) => {
                results.push(row);
            });
            // After all data is returned, close connection and return results
            query.on('end', () => {
                done();
                console.log("se cerro base de datos")
                return res.json(results);
            });
        });

    },
    // postGenero : function(req,res,next){
      
        
    //     if(opc ==='3'){

    //         pg.connect(connectionString, function(err, client, done)  {
    //             // Handle connection errors
    //             if (err) {
    //                 done();
    //                 console.log(err);
    //                 return res.status(500).json({ success: false, data: err });
    //             }
    //             // SQL Query > Select Data
    //             const query = client.query(`UPDATE "Tesis".genero SET
    //             genero='${genero}' WHERE idgenero=${editar}`);
    //             // Stream results back one row at a time
    //             query.on('row', (row) => {
    //                 results.push(row);
    //             });
    //             // After all data is returned, close connection and return results
    //             query.on('end', () => {
    //                 done();
    //                 console.log("se cerro base de datos")
    //                 // console.log(results)
    //                 req.flash('Edit', 'Se ha editado correctamente');
    //                 return res.redirect('/genero/genero');
    //             });
                
    //         });    
    //     }
    // }
}