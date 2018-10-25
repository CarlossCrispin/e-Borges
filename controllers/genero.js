var pg = require("pg")
const connection = require('.././database/config');
const connectionString = process.env.DATABASE_URL || connection;

module.exports = {
    /*--------------------------------------------
    *         CONSULTAS PARA LA VISTA GENERO
    CREATE SEQUENCE hibernate_sequence START WITH 1 INCREMENT BY 1 NO CYCLE;
	*-----------------------------------------------*/
    getGenero: function (req, res, next) {
        return res.render('genero/genero', {
            isAuthenticated: req.isAuthenticated(),
            user: req.user
        });

    },
    data: function (req, res, next) {
        const results = [];
        // console.log(results)
        // cliente de Postgres del grupo de conexiones
        pg.connect(connectionString, function (err, client, done) {
            // Handle connection errors
            if (err) {
                done();
                console.log(err);
                return res.status(500).json({ success: false, data: err });
            }
            // SQL Query > Select Data
            const query = client.query(`SELECT * FROM "Tesis".genero`);
            // Stream results back one row at a time
            query.on('row', (row) => {
                results.push(row);
            });
            // After all data is returned, close connection and return results
            query.on('end', () => {
                done();
                console.log("se cerro base de datos")
                // console.log(JSON.stringify(results))
                // console.log(results)
                return res.json(results);
                // return res.render('genero/genero')
            });

        });
    },
    insert: function (req, res, next) {
        const results = [];

        var genero = req.body.genero;

        // console.log(`-------DATOS------\n${genero}\n-----------------------`)
        pg.connect(connectionString, function (err, client, done) {
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
                // console.log(results)
                // return res.json(results);
                return res.render('genero/genero')
            });

        });

    },
    delete: function (req, res, next) {
        const results = [];

        var id = req.body.id;
       
        
        // console.log(`-------DATOS------\n${opc}\n${eliminar}\n${editar}`)
        
        pg.connect(connectionString, (err, client, done) => {
            // Handle connection errors
            if (err) {
                done();
                console.log(err);
                return res.status(500).json({ success: false, data: err });
            }
            // SQL Query > Delete Data
            
            const query = client.query(`DELETE FROM "Tesis".genero WHERE idgenero=${id}`);
            // SQL Query > Select Data
            // var query = client.query('SELECT * FROM "Tesis".genero ORDER BY idgenero ASC');
            // Stream results back one row at a time
            query.on('row', (row) => {
                results.push(row);
            });
            // After all data is returned, close connection and return results
            query.on('end', () => {
                done();
                console.log("se cerro base de datos")
                // return res.json(results);
                return res.render('genero/genero')
            });
        });
    },
    update: function (req, res, next) {
        // console.log("entro a update")
        const results = [];
        var genero = req.body.genero;
        var id = req.body.id;
        // console.log(`-------DATOS------\n${genero}\n${id}\n----------------`)
        pg.connect(connectionString, (err, client, done) => {
            if (err) {
                done();
                console.log(err);
                return res.status(500).json({ success: false, data: err });
            }
            const query = client.query(`UPDATE "Tesis".genero SET genero='${genero}' WHERE idgenero=${id}`);
         
            // var query = client.query('SELECT * FROM "Tesis".genero ORDER BY idgenero ASC');
            
            query.on('row', (row) => {
                results.push(row);
            });
        
            query.on('end', () => {
                done();
                console.log("se cerro base de datos")
                // return res.json(results);
                return res.render('genero/genero')
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