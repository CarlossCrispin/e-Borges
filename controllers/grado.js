var pg = require("pg")
const connection = require('.././database/config2');
const connectionString = process.env.DATABASE_URL || connection;

module.exports = {
    /*--------------------------------------------
	*         CONSULTAS PARA LA VISTA GRADO
	*-----------------------------------------------*/
    getGrado: function (req, res, next) {
        return res.render('grado/grado', {
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

            const query = client.query('SELECT * FROM "Tesis".grado ');

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
        var grado = req.body.grado;
        console.log(`-------DATOS------\n${grado}\n$-----------------------`)
        pg.connect(connectionString, function (err, client, done) {

            if (err) {
                done();
                console.log(err);
                return res.status(500).json({ success: false, data: err });
            }

            // const query = client.query('SELECT * FROM "Tesis".grado ');
            const query = client.query(`INSERT INTO "Tesis".grado(grado) VALUES ('${grado}')`);
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
    update : function (req, res, next) {
        const results = [];
        var grado = req.body.grado;
        var id = req.body.id;
        console.log(`-------DATOS------\n${id}\n${grado}\n$-----------------------`)
        pg.connect(connectionString, function (err, client, done) {

            if (err) {
                done();
                console.log(err);
                return res.status(500).json({ success: false, data: err });
            }

            const query = client.query(`UPDATE "Tesis".grado SET grado='${grado}' WHERE idgrado=${id}`);
            query.on('row', (row) => {
                results.push(row);
            });

            query.on('end', () => {
                done();
                console.log("se cerro base de datos")
                // console.log(JSON.stringify(results))
                // return res.json(results);
                return res.redirect('/grado/grado');
            });

        });
    },
    delete : function (req, res, next) {
        const results = [];
        var grado = req.body.grado;
        var id = req.body.id;
        console.log(`-------DATOS------\n${id}\n${grado}\n$-----------------------`)
        pg.connect(connectionString, function (err, client, done) {

            if (err) {
                done();
                console.log(err);
                return res.status(500).json({ success: false, data: err });
            }

            const query = client.query(`DELETE FROM "Tesis".grado WHERE idgrado=${id}`);
            query.on('row', (row) => {
                results.push(row);
            });

            query.on('end', () => {
                done();
                console.log("se cerro base de datos")
                // console.log(JSON.stringify(results))
                // return res.json(results);
                return res.redirect('/grado/grado');
            });

        });
    },
    postGrado: function (req, res, next) {
       
    }
}