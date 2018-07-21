var pg = require("pg")
const connection = require('.././database/config');
var client = new pg.Client(connection);
client.connect();
module.exports = {
   
    getShowAlumno : function(req, res, next){

        client.query(`select * from alumno`,(err,results) => {
            if(err) throw err;
				console.log(err)
            return res.render('alumno/showAlumno', {
				isAuthenticated : req.isAuthenticated(),
				user : req.user,
                items: results.rows
				
			});

        });
    }
}