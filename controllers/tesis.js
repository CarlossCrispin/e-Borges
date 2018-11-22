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
        // console.log(results)
    
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
            var select6 = client.query(`SELECT a.idpersona, 
                (a.nombre || ' '||  a.nombre2 || ' '|| a.nombre3 || ' '|| a.apellido || ' '|| a.apellido2 || ' '|| a.apellido3) as nombre, 
                a.idgrado, a.idgenero, 
                a.iddepartamento, c.departamento,
                a.esexterno, a.institucion, a.puesto
                FROM "Tesis".persona a
                left join "Tesis".departamento c on a.iddepartamento=c.iddepartamento
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
    insert : function(req,res,next){
        console.log(`-------entra----------------`);
        var results=[];
        var results2=[];
        var alumno=  req.body.alumno;
        var titulo =req.body.titulo;
        var resumen = req.body.resumen;
        var grado = req.body.grado;
        var departamento =  req.body.departamneto;
        var unidad = req.body.unidad;
        var mes =  req.body.mes;
        var anio =  req.body.anio;
        var director =  req.body.director;
 
        var codirector = req.body.codirector === "" ? inv1 = null : inv1 = req.body.codirector
        var codirector2 = req.body.codirector2 === "" ? inv2 = null : inv2 = req.body.codirector2
        var codirector3 = req.body.codirector3 === "" ? inv3 = null : inv3 = req.body.codirector3
        var codirector4 = req.body.codirector4 === "" ? inv4 = null : inv4 = req.body.codirector4
        console.log(`-------DATOS------\n${alumno}\n${titulo}\n${resumen}
        \n${grado}\n${departamento}\n${unidad}\n${mes}\n${anio}\n${director}\n${inv1}\n${inv2}\n${inv3}\n${inv4}\n-----------------`)



        pg.connect(connectionString, function (err, client, done) {
      
            if (err) {
                done();
                console.log(err);
                return res.status(500).json({ success: false, data: err });
            }
            
            
            var select = client.query(`INSERT INTO "Tesis".tesis(
                mes, "anio", idalumno, titulo, idgrado, resumen, iddepartamento, idunidad, "fechapublicación")
               VALUES (${mes},${anio},${alumno}, '${titulo}', ${grado}, '${resumen}', ${departamento}, ${unidad}, null)`);

            var select2 = client.query(`INSERT INTO "Tesis".tesispersona(
                idtesis, iddirector, idcodirector1, idcodirector2, idcodirector3, idcodirector4)
                VALUES ((SELECT MAX(idtesis) FROM "Tesis".tesis),${director},${inv1},${inv2},${inv3},${inv4} )`);
    
           
            var query=select;
            query.on('row', (row) => {
                results.push(row);
            });
            var query=select2;
            query.on('row', (row) => {
                results2.push(row);
            });
            
            query.on('end', () => {
                done();
                console.log("se cerro base de datos")
                // console.log(results)
                // req.flash('Insert', 'Se ha registrado correctamente');
                // return res.redirect('/tesis/tesis');
                return res.json(results);
            });

        });

    },
    update : function(req,res,next){
        console.log(`-------entra  22222222222222----------------`);
        var results=[];
        var results2=[];
        var id=  req.body.id;
        var alumno=  req.body.alumno;
        var titulo =req.body.titulo;
        var resumen = req.body.resumen;
        var grado = req.body.grado;
        var departamento =  req.body.departamneto;
        var unidad = req.body.unidad;
        var mes =  req.body.mes;
        var anio =  req.body.anio;
        var director =  req.body.director;
 
        var codirector = req.body.codirector === "" ? inv1 = null : inv1 = req.body.codirector
        var codirector2 = req.body.codirector2 === "" ? inv2 = null : inv2 = req.body.codirector2
        var codirector3 = req.body.codirector3 === "" ? inv3 = null : inv3 = req.body.codirector3
        var codirector4 = req.body.codirector4 === "" ? inv4 = null : inv4 = req.body.codirector4
        console.log(`-------DATOS------\n${id}\n${alumno}\n${titulo}\n${resumen}
        \n${grado}\n${departamento}\n${unidad}\n${mes}\n${anio}\n${director}\n${inv1}\n${inv2}\n${inv3}\n${inv4}\n-----------------`)



        pg.connect(connectionString, function (err, client, done) {
      
            if (err) {
                done();
                console.log(err);
                return res.status(500).json({ success: false, data: err });
            }
            
            
            var select = client.query(`UPDATE "Tesis".tesis
                SET mes=${mes}, anio=${anio}, idalumno=${alumno}, titulo='${titulo}', idgrado=${grado}, resumen='${resumen}', 
                iddepartamento=${departamento}, idunidad=${unidad}
                WHERE idtesis=${id}`);
                
            var select2 = client.query(`UPDATE "Tesis".tesispersona
                SET  iddirector=${director}, idcodirector1=${inv1}, idcodirector2=${inv2}, idcodirector3=${inv3}, idcodirector4=${inv4}
                WHERE idtesis=${id}`);

            
    
           
            var query=select;
            query.on('row', (row) => {
                results.push(row);
            });
            var query=select2;
            query.on('row', (row) => {
                results2.push(row);
            });
            
            query.on('end', () => {
                done();
                console.log("se cerro base de datos")
                // console.log(results)
                // req.flash('Insert', 'Se ha registrado correctamente');
                // return res.redirect('/tesis/tesis');
                return res.json(results);
            });

        });

    },
    delete: function (req, res, next) {
        const results = [];
        
        var id = req.body.id;
        var idp = req.body.idp;
        console.log(`-------DATOS------\n${id}\n${idp}
        \n--------------------------------`)
        pg.connect(connectionString, function (err, client, done) {

            if (err) {
                done();
                console.log(err);
                return res.status(500).json({ success: false, data: err });
            }
            
            var select = client.query(`DELETE FROM "Tesis".tesispersona  WHERE idtesispersona=${id}`);
            var select2 = client.query(`DELETE FROM "Tesis".tesis  WHERE idtesis=${id}`);
            
            var query = select
            query.on('row', (row) => {
                results.push(row);
            });
            var query = select2
            query.on('row', (row) => {
                results.push(row);
            });
            // After all data is returned, close connection and return results
            query.on('end', () => {
                done();
                console.log("se cerro base de datos")
                // console.log(results)
                req.flash('Delete', 'Se ha eliminado correctamente');
                return res.json(results);
                // return res.redirect('/persona/persona');
            });

        });

    },
}   