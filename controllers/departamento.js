var pg = require("pg")
const connection = require('.././database/config2');
const connectionString = process.env.DATABASE_URL || connection;

module.exports = {
    /*--------------------------------------------
	*         CONSULTAS PARA LA VISTA Departamento  
	*-----------------------------------------------*/
    getDepartamento: function (req, res, next) {

        const results = [];
        const results2 = [];
  
        // cliente de Postgres del grupo de conexiones
        pg.connect(connectionString, function(err, client, done)  {
            // Handle connection errors
            if (err) {
                done();
                console.log(err);
                return res.status(500).json({ success: false, data: err });
            }
            // SQL Query > Select Data
            const query = client.query(`SELECT a.id, a.departamento,
            c.especialidad
            FROM "Tesis".departamento a
            inner join "Tesis".especialidad c on a.idespecialidad=c.id`);
            const query2 = client.query(`SELECT * from "Tesis".especialidad`);
            // Stream results back one row at a time
            query.on('row', (row) => {
                results.push(row);
            });
            query2.on('row', (row) => {
                results2.push(row);
            });
            // After all data is returned, close connection and return results
            query.on('end', () => {
                done();
                console.log("se cerro base de datos")
                console.log(JSON.stringify(results))
                
            });
            query2.on('end', () => {
                done();
                console.log("se cerro base de datos\n------------->\n\n\n")
                console.log(JSON.stringify(results2))
                return res.render('departamento/departamento', {
                    isAuthenticated: req.isAuthenticated(),
                    user: req.user,
                    items: results,
                    items2: results2,
                    Insert:req.flash('Insert'),
                    Delete:req.flash('Delete'),
                    Edit:req.flash('Edit')
                });;
            });
            
        });    

    },
    postDepartamento : function(req,res,next){
        var opc = req.body.opc;
        var departamento = req.body.departamento;
        var especialidad = req.body.especialidad;
        var eliminar=req.body.eliminar;
        var editar =req.body.editar;
        console.log(`-------DATOS------\n${opc}\n${departamento}\n${eliminar}
        \n${editar}\n${especialidad}\n---------------------`)
        if(opc ==='1'){

            pg.connect(connectionString, function(err, client, done)  {
                // Handle connection errors
                if (err) {
                    done();
                    console.log(err);
                    return res.status(500).json({ success: false, data: err });
                }
                // SQL Query > Select Data
                
                const query = client.query(`INSERT INTO "Tesis".departamento(
                    id, departamento, idespecialidad)
                    VALUES (nextval (\'hibernate_sequence\'), '${departamento}','${especialidad}')`);
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
                    return res.redirect('/departamento/departamento');
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
                const query = client.query(`DELETE FROM "Tesis".departamento
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
                    return res.redirect('/departamento/departamento');
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
                const query = client.query(`UPDATE "Tesis".departamento SET
                departamento='${departamento}', idespecialidad=${especialidad}
                WHERE id=${editar}`);
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
                    return res.redirect('/departamento/departamento');
                });
                
            });    
        }
    }
}