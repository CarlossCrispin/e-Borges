var pg = require("pg")
const connection = require('.././database/config2');
const connectionString = process.env.DATABASE_URL || connection;

module.exports = {
    /*--------------------------------------------
	*         CONSULTAS PARA LA VISTA ESPECIALIDAD  
	*-----------------------------------------------*/
    get: function (req, res, next) {
        return res.render('especialidad/especialidad', {
            isAuthenticated: req.isAuthenticated(),
            user: req.user
        });
    },
    data : function(req,res,next){
        const results = [];
        pg.connect(connectionString, function(err, client, done)  {
           
            if (err) {
                done();
                console.log(err);
                return res.status(500).json({ success: false, data: err });
            }
         
            const query = client.query('SELECT * FROM "Tesis".especialidad ');
            
            query.on('row', (row) => {
                results.push(row);
            });
           
            query.on('end', () => {
                done();
                console.log("se cerro base de datos")
                // console.log(JSON.stringify(results))
                return res.json(results);
               
            });
            
        });    
    },
    insert : function(req,res,next){
        const results = [];
        var especialidad = req.body.especialidad;
        
        pg.connect(connectionString, function(err, client, done)  {
           
            if (err) {
                done();
                console.log(err);
                return res.status(500).json({ success: false, data: err });
            }
         
            const query = client.query(`INSERT INTO "Tesis".especialidad(
                especialidad)
                VALUES ('${especialidad}')`);
            query.on('row', (row) => {
                results.push(row);
            });
           
            query.on('end', () => {
                done();
                console.log("se cerro base de datos")
                return res.redirect('/especialidad/especialidad');
               
            });
            
        });    
    },
    update: function(req,res,next){
        const results = [];
        var especialidad = req.body.especialidad;
        var id = req.body.id;
       
        pg.connect(connectionString, function(err, client, done)  {
           
            if (err) {
                done();
                console.log(err);
                return res.status(500).json({ success: false, data: err });
            }
         
            const query = client.query(`UPDATE "Tesis".especialidad SET
                especialidad='${especialidad}' WHERE idespecialidad=${id}`);
            query.on('row', (row) => {
                results.push(row);
            });
           
            query.on('end', () => {
                done();
                console.log("se cerro base de datos")
                console.log(JSON.stringify(results))
                return res.redirect('/especialidad/especialidad');
               
            });
            
        });    
    },
    delete: function(req,res,next){
        const results = [];
        var especialidad = req.body.especialidad;
        var id = req.body.id;
        console.log(`-------DATOS------\n${id}\n${especialidad}\n------------------`)
       
        pg.connect(connectionString, function(err, client, done)  {
           
            if (err) {
                done();
                console.log(err);
                return res.status(500).json({ success: false, data: err });
            }
         
            const query = client.query(`DELETE FROM "Tesis".especialidad
                WHERE idespecialidad=${id}`);
            query.on('row', (row) => {
                results.push(row);
            });
           
            query.on('end', () => {
                done();
                console.log("se cerro base de datos")
                console.log(JSON.stringify(results))
                return res.redirect('/especialidad/especialidad');
               
            });
            
        });    
    },
    postEspecialidad : function(req,res,next){
        var opc = req.body.opc;
        var especialidad = req.body.especialidad;
        var eliminar=req.body.eliminar;
        var editar =req.body.editar;
        console.log(`-------DATOS------\n${opc}\n${especialidad}\n${eliminar}\n${editar}`)
       
        if(opc ==='2'){

            pg.connect(connectionString, function(err, client, done)  {
                // Handle connection errors
                if (err) {
                    done();
                    console.log(err);
                    return res.status(500).json({ success: false, data: err });
                }
                // SQL Query > Select Data
                
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
                    return res.redirect('/especialidad/especialidad');
                });
                
            });    
        }
        
        
    }
}