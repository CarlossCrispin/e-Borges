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
    data: function(req,res,next){
        var results = [];
        var results2 = [];
        var results3 = [];
        var results4 = [];
        var results5 = [];
        var results6 = [];
        var datos=[];
        console.log(results)
    
        pg.connect(connectionString, function(err, client, done)  {
         
            if (err) {
                done();
                console.log(err);
                return res.status(500).json({ success: false, data: err });
            }
            
            var select = client.query(`SELECT * FROM "Tesis".vtesis`);
            var select2=client.query(`SELECT a.idalumno,
                (a.nombre || ' '|| a.nombre2||' '||a.nombre3|| ' '|| a.apellido|| ' '|| a.apellido2||' '||a.apellido3)as nombre,
                a.matricula, 
                a.idgenero, 
                g.genero,
                a.iddepartamento,
                c.departamento
                
                FROM "Tesis".alumno a
                left join "Tesis".genero g on a.idgenero=g.idgenero
                left join "Tesis".departamento c on a.iddepartamento=c.iddepartamento`);
            var select3 = client.query(`SELECT * FROM "Tesis".grado`);
            var select4 = client.query(`SELECT * FROM "Tesis".departamento`);
            var select5 = client.query(`SELECT * FROM "Tesis".unidad`);
            // var select6 = client.query(`SELECT idpersona, nombre FROM "Tesis".persona`);
            var select6 = client.query(`SELECT idpersona, 
                (nombre || ' '||  nombre2 || ' '|| nombre3 || ' '|| apellido || ' '|| apellido2 || ' '|| apellido3) as nombre, 
                idgrado, idgenero, iddepartamento, esexterno, institucion, puesto
                    FROM "Tesis".persona
                    ORDER BY idpersona`);
                
            var query=select
            query.on('row', (row) => {
                results.push(row);
            });
            var query=select2
            query.on('row', (row) => {
                results2.push(row);
            });
            var query=select3
            query.on('row', (row) => {
                results3.push(row);
            });
            var query=select4
            query.on('row', (row) => {
                results4.push(row);
            });
            var query=select5
            query.on('row', (row) => {
                results5.push(row);
            });
            var query=select6
            query.on('row', (row) => {
                results6.push(row);
            });
            
            query.on('end', () => {
                done();
                console.log("se cerro base de datos")
                // console.log(JSON.stringify(results))
                // console.log(results)
                datos=[{
                    tesis:results,
                    alumno:results2,
                    grado:results3,
                    departamento:results4,
                    unidad:results5,
                    persona:results6
                }];
                
                return res.json(datos);
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