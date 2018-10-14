var pg = require("pg")
const connection = require('.././database/config2');
const connectionString = process.env.DATABASE_URL || connection;

module.exports = {
    /*--------------------------------------------
    *         CONSULTAS PARA LA VISTA Acta
    CREATE SEQUENCE hibernate_sequence START WITH 1 INCREMENT BY 1 NO CYCLE;
	*-----------------------------------------------*/
    getActa: function (req, res, next) {

        return res.render('acta/acta',{
            isAuthenticated: req.isAuthenticated(),
            user: req.user
        });

    },
    datosActa : function(req,res,next){
        var results = [];
        var results2 = [];
        var results3 = [];
        var datos=[];
        console.log(results)
        // cliente de Postgres del grupo de conexiones
        pg.connect(connectionString, function(err, client, done)  {
            // Error
            if (err) {
                done();
                console.log(err);
                return res.status(500).json({ success: false, data: err });
            }
            // SQL Query > Select Data
            var select = client.query(`SELECT * FROM "Tesis".vacta`);
            var select2 = client.query(`SELECT idtesis,titulo FROM "Tesis".tesis`);
            var select3 = client.query(`SELECT * FROM "Tesis".unidad`);
            

            var query = select
            query.on('row', (row) => {
                results.push(row);
            });
            var query = select2
            query.on('row', (row) => {
                results2.push(row);
            });
            var query = select3
            query.on('row', (row) => {
                results3.push(row);
            });
            // After all data is returned, close connection and return results
            query.on('end', () => {
                done();
                console.log("se cerro base de datos")
                // console.log(JSON.stringify(results))
                datos=[{
                    actas:results,
                    tesis:results2,
                    unidad:results3

                }]
                console.log(datos)
                return res.json(datos);
            });
            
        });    
    },
    insertActa : function(req,res,next){

    },
    postActa : function(req,res,next){
        var opc = req.body.opc;
        var tesis = req.body.tesis;
        var folio = req.body.folio;
        var lugar = req.body.lugar;
        var fecha = req.body.fecha;
        var eliminar=req.body.eliminar;
        var editar =req.body.editar;
        console.log(`-------DATOS------\n${opc}\n${tesis}\n${folio}\n${lugar}\n${fecha}\n${eliminar}\n${editar}`)
        if(opc ==='1'){

            pg.connect(connectionString, function(err, client, done)  {
                // Handle connection errors
                if (err) {
                    done();
                    console.log(err);
                    return res.status(500).json({ success: false, data: err });
                }
                // SQL Query > Select Data
                
                const query = client.query(`INSERT INTO "Tesis".acta(
                    idtesis, folio, idunidad, fecha)
                    VALUES ( ${tesis},${folio},${lugar},'${fecha}')`);
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
                    return res.redirect('/acta/acta');
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
                const query = client.query(`DELETE FROM "Tesis".acta
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
                    return res.redirect('/acta/acta');
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
                const query = client.query(`UPDATE "Tesis".acta SET
                acta='${acta}' WHERE id=${editar}`);
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
                    return res.redirect('/acta/acta');
                });
                
            });    
        }
    }
}