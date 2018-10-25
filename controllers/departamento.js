var pg = require("pg")
const connection = require('.././database/config');
const connectionString = process.env.DATABASE_URL || connection;

module.exports = {
    /*--------------------------------------------
	*         CONSULTAS PARA LA VISTA Departamento  
	*-----------------------------------------------*/
    getDepartamento: function (req, res, next) {
        return res.render('departamento/departamento', {
            isAuthenticated: req.isAuthenticated(),
            user: req.user,
           
        });

    },
    dataDepartamento : function(req,res,next){
        var results = [];
        var results2 = [];
        var datos = [];

        pg.connect(connectionString, function(err, client, done)  {
     
            if (err) {
                done();
                console.log(err);
                return res.status(500).json({ success: false, data: err });
            }
            // SQL Query > Select Data
            var select= client.query(`SELECT d.iddepartamento, d.departamento, d.idespecialidad,
                e.especialidad
                FROM "Tesis".departamento d
                left join "Tesis".especialidad e on d.idespecialidad=e.idespecialidad`);
            // const query = client.query(`SELECT a.iddepartamento, a.departamento,
            // c.especialidad
            // FROM "Tesis".departamento a
            // inner join "Tesis".especialidad c on a.idespecialidad=c.idespecialidad`);
            const select2 = client.query(`SELECT * from "Tesis".especialidad`);
    
            var query = select;
            query.on('row', (row) => {
                results.push(row);
            });
            
            var query = select2;
            query.on('row', (row) => {
                results2.push(row);
            });
            
            query.on('end', () => {
                done();
                console.log("se cerro base de datos")
                // console.log(JSON.stringify(results2))
                datos=[{
                    departamentos:results,
                    especialidad:results2
                }]
                return res.json(datos);
            });
            
        });    

    },
    insertDepartamento:function(req,res,next){

        var results = [];
        var departamento = req.body.departamento;
        var especialidad = req.body.especialidad;

        // console.log(`-------DATOS------\n${departamento}\n${especialidad}\n---------------------`)

        pg.connect(connectionString, function(err, client, done)  {
            
            if (err) {
                done();
                console.log(err);
                return res.status(500).json({ success: false, data: err });
            }
        
            
            const query = client.query(`INSERT INTO "Tesis".departamento(
                departamento, idespecialidad)
                VALUES ( '${departamento}','${especialidad}')`);
        
            query.on('row', (row) => {
                results.push(row);
            });

            query.on('end', () => {
                done();
                console.log("se cerro base de datos");
              
                // return res.redirect('/departamento/departamento');
                return res.json(results);
            });
            
        });
    },
    updateDepartamento : function(req,res,next){
        var results = [];
        var id = req.body.id;
        var departamento = req.body.departamento;
        var especialidad = req.body.idespecialidad;
        // console.log(`-------DATOS------\n${departamento}\n${especialidad}\n${id}---------------------`)

        pg.connect(connectionString, function(err, client, done)  {
           
            if (err) {
                done();
                console.log(err);
                return res.status(500).json({ success: false, data: err });
            }
           
            const query = client.query(`UPDATE "Tesis".departamento SET
                departamento='${departamento}', idespecialidad=${especialidad}
                WHERE iddepartamento=${id}`);
          
            query.on('row', (row) => {
                results.push(row);
            });
        
            query.on('end', () => {
                done();
                console.log("se cerro base de datos")
                
                // return res.redirect('/departamento/departamento');
                return res.json(results);
            });
            
        });  

    },
    deleteDepartamento: function(req,res,next){
        var results = [];
        var id = req.body.id;
        // console.log(`-------DATOS------\n${id}\n---------------------`)
        pg.connect(connectionString, function(err, client, done)  {
            
            if (err) {
                done();
                console.log(err);
                return res.status(500).json({ success: false, data: err });
            }
            
            const query = client.query(`DELETE FROM "Tesis".departamento
            WHERE iddepartamento=${id}`);
           
            query.on('row', (row) => {
                results.push(row);
            });
    
            query.on('end', () => {
                done();
                console.log("se cerro base de datos")
              
                return res.redirect('/departamento/departamento');
            });
            
        });    
    }
}