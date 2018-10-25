var bcrypt = require('bcryptjs');
var pg = require("pg")
const connection = require('.././database/config2');
const connectionString = process.env.DATABASE_URL || connection;

module.exports = {
    /*--------------------------------------------
    *         CONSULTAS PARA LA VISTA GENERO
    CREATE SEQUENCE hibernate_sequence START WITH 1 INCREMENT BY 1 NO CYCLE;
	*-----------------------------------------------*/
    getUsuario: function (req, res, next) {
        return res.render('usuario/usuario', {
            isAuthenticated: req.isAuthenticated(),
            user: req.user
        });
        

    },
    data : function(req,res,next){
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
            const query = client.query(`SELECT * FROM "Tesis".usuario`);
            // Stream results back one row at a time
            query.on('row', (row) => {
                results.push(row);
            });
            // After all data is returned, close connection and return results
            query.on('end', () => {
                done();
                console.log("se cerro base de datos")
                // console.log(JSON.stringify(results))
                return res.json(results);
                
            });
            
        });    
    },
    insert : function(req,res,next){
        console.log(`-------entra----------------`)
        var salt = bcrypt.genSaltSync(10);
        var password = bcrypt.hashSync(req.body.password, salt);
        var hash = bcrypt.hashSync(password, salt);
      
        var nombre =  req.body.nombre;
        var nombre2 =  req.body.nombre2;
        var nombre3 =  req.body.nombre3;
        var apellido =  req.body.apellido;
        var apellido2 =  req.body.apellido2;
        var apellido3 =  req.body.apellido3;
        // var password = req.body.password;
        var email =  req.body.email;
        var rol =  req.body.rol;

        // console.log(`-------DATOS------\n${nombre}\n${nombre2}\n${nombre3}
        // \n${apellido}\n${apellido2}\n${apellido3}\n${password}\n${email}\n${rol}\n-----------------`)
        pg.connect(connectionString, function (err, client, done) {
      
            if (err) {
                done();
                console.log(err);
                return res.status(500).json({ success: false, data: err });
            }
            
            
            const query = client.query(`INSERT INTO "Tesis".usuario(
                nombre, nombre2, nombre3, apellido, apellido2, apellido3, contrasena, email, rol)
                VALUES ('${nombre}','${nombre2}','${nombre3}','${apellido}','${apellido2}','${apellido3}',
                '${password}','${email}','${rol}' )`);
            
           
            query.on('row', (row) => {
                results.push(row);
            });
            
            query.on('end', () => {
                done();
                console.log("se cerro base de datos")
                // console.log(results)
                req.flash('Insert', 'Se ha registrado correctamente');
                return res.redirect('/persona/persona');
            });

        });
    },
    update : function(req,res,next){
        console.log(`-------entra----------------`);
        var salt = bcrypt.genSaltSync(10);
        var contrasena = bcrypt.hashSync(req.body.contrasena, salt);
        var hash = bcrypt.hashSync(password, salt);
      
        var id =  req.body.id;
        var nombre =  req.body.nombre;
        var nombre2 =  req.body.nombre2;
        var nombre3 =  req.body.nombre3;
        var apellido =  req.body.apellido;
        var apellido2 =  req.body.apellido2;
        var apellido3 =  req.body.apellido3;
        // var contrasena = req.body.contrasena;
        var email =  req.body.email;
        var rol =  req.body.rol;

        // console.log(`-------DATOS------\n${id}\n${nombre}\n${nombre2}\n${nombre3}
        // \n${apellido}\n${apellido2}\n${apellido3}\n${contrasena}\n${email}\n${rol}\n-----------------`)
        pg.connect(connectionString, function (err, client, done) {
      
            if (err) {
                done();
                console.log(err);
                return res.status(500).json({ success: false, data: err });
            }
            
            const query = client.query(`UPDATE "Tesis".usuario
                SET nombre='${nombre}', nombre2='${nombre2}', nombre3='${nombre3}', apellido='${apellido}', 
                apellido2='${apellido2}', apellido3='${apellido3}', contrasena='${contrasena}', email='${email}', rol='${rol}'
                WHERE idusuario=${id}`);
           
            query.on('row', (row) => {
                results.push(row);
            });
            
            query.on('end', () => {
                done();
                console.log("se cerro base de datos")
                // console.log(results)
                req.flash('Insert', 'Se ha registrado correctamente');
                return res.redirect('/persona/persona');
            });

        });
    },
    delete : function(req,res,next){
        console.log(`-------entra----------------`);
        // var salt = bcrypt.genSaltSync(10);
        // var password = bcrypt.hashSync(req.body.password, salt);
        // var hash = bcrypt.hashSync(password, salt);
      
        var id =  req.body.id;

        console.log(`-------DATOS------\n${id}\n-----------------`)
        pg.connect(connectionString, function (err, client, done) {
      
            if (err) {
                done();
                console.log(err);
                return res.status(500).json({ success: false, data: err });
            }
            
            const query = client.query(`DELETE FROM "Tesis".usuario WHERE idusuario=${id}`);
           
            query.on('row', (row) => {
                results.push(row);
            });
            
            query.on('end', () => {
                done();
                console.log("se cerro base de datos")
                // console.log(results)
                req.flash('Insert', 'Se ha registrado correctamente');
                return res.redirect('/persona/persona');
            });

        });
    }
}