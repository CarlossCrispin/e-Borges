var pg = require("pg")
const connection = require('.././database/config');
const connectionString = process.env.DATABASE_URL || connection;

module.exports = {
    getTesis: function (req, res, next) {

        return res.render('tesis/tesis',{
            isAuthenticated: req.isAuthenticated(),
            user: req.user
        });

    },
    datosTesis : function(req,res,next){
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
            FROM "Tesis".vtesis`);
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
    deleteTesis: function (req, res, next) {
        const results = [];
        
        var eliminar = req.body.idtesis;
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
            const query = client.query(`DELETE FROM "Tesis".tesis
            WHERE idtesis=${eliminar}`);
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
}   