var pg = require("pg")
const connection = require('.././database/config2');
const connectionString = process.env.DATABASE_URL || connection;

module.exports = {
    /*--------------------------------------------
	*         CONSULTAS PARA LA VISTA UNIDAD
	*-----------------------------------------------*/
    getUnidad: function (req, res, next) {
        return res.render('unidad/unidad', {
            isAuthenticated: req.isAuthenticated(),
            user: req.user
        });



    },
    data: function (req, res, next) {
        const results = [];
        pg.connect(connectionString, function (err, client, done) {
            
            if (err) {
                done();
                console.log(err);
                return res.status(500).json({ success: false, data: err });
            }
           
            const query = client.query(`SELECT *  FROM "Tesis".unidad`);

           
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
    insert: function (req, res, next) {
        const results = [];
        var nombre = req.body.unidad;
        var lugar = req.body.lugar;
        // console.log(`-------DATOS------\n${nombre} \n${lugar}\n---------------------`)
        pg.connect(connectionString, function (err, client, done) {
            
            if (err) {
                done();
                console.log(err);
                return res.status(500).json({ success: false, data: err });
            }
           
 
            const query = client.query(`INSERT INTO "Tesis".unidad(
                 nombre, lugar)
                VALUES ('${nombre}','${lugar}')`);
           
            query.on('row', (row) => {
                results.push(row);
            });

            

            query.on('end', () => {
                done();
                console.log("se cerro base de datos")
                // console.log(JSON.stringify(results))
                // return res.json(results);
                return res.render('unidad/unidad');

            });

        });   

    },
    update: function (req, res, next) {
        const results = [];
        var nombre = req.body.nombre;
        var lugar = req.body.lugar;
        var id = req.body.id;
        console.log(`-------DATOS------\n${id}\n${nombre}\n${lugar}\n---------------------`)
        pg.connect(connectionString, function (err, client, done) {
            
            if (err) {
                done();
                console.log(err);
                return res.status(500).json({ success: false, data: err });
            }
            const query = client.query(`UPDATE "Tesis".unidad
                SET nombre='${nombre}', lugar='${lugar}'
                WHERE  idunidad=${id}`);
            
            query.on('row', (row) => {
                results.push(row);
            });

            

            query.on('end', () => {
                done();
                console.log("se cerro base de datos")
                // console.log(JSON.stringify(results))
                // return res.json(results);
                return res.render('unidad/unidad');

            });

        });   

    },
    delete : function (req, res, next) {
        const results = [];
        var id = req.body.id;
        console.log(`-------DATOS------\n${id}\n---------------------`)
        pg.connect(connectionString, function (err, client, done) {
            
            if (err) {
                done();
                console.log(err);
                return res.status(500).json({ success: false, data: err });
            }
            const query = client.query(`DELETE FROM "Tesis".unidad
                WHERE idunidad=${id}`);
            query.on('row', (row) => {
                results.push(row);
            });

            

            query.on('end', () => {
                done();
                console.log("se cerro base de datos")
                // console.log(JSON.stringify(results))
                // return res.json(results);
                return res.render('unidad/unidad');

            });

        });   

    },
    postUnidad: function (req, res, next) {
        var opc = req.body.opc;
        var nombre = req.body.unidad;
        var lugar = req.body.lugar;
        var eliminar = req.body.eliminar;
        var editar = req.body.editar;
        console.log(`-------DATOS------\n${opc}\n${nombre}\n${eliminar}
        \n${lugar}\n${editar}\n---------------------`)
       
      
    }
}