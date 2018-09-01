var pg = require("pg")
const connection = require('.././database/config');
var client = new pg.Client(connection);
client.connect();
module.exports = {
   
    getShowAlumno : function(req, res, next){

        client.query(`select * from alumno`,(err,results) => {
            if(err) throw err;
                console.log(err)
                console.log(results)
            client.query(`select * from departamento`,(err,results2) => {
                if(err) throw err;
                    console.log(err)
                client.query(`select * from grado`,(err,results3) => {
                    if(err) throw err;
                        console.log(err)
                    client.query(`select * from genero`,(err,results4) => {
                        if(err) throw err;
                            console.log(err)
                    

                        return res.render('alumno/showAlumno', {
                            isAuthenticated : req.isAuthenticated(),
                            user : req.user,
                            items: results.rows,
                            items2: results2.rows,
                            items3: results3.rows,
                            items4: results4.rows,
                            alumno: req.flash('alumno'),
                            Edit:req.flash('Edit'),
                            Delete:req.flash('Delete')
                            
                        });

                    });
                });
            });
        });
    },
    postShowAlumno : function(req,res,next){
        var opc = req.body.opc;
        var nombre= req.body.nombre;
        var ap1= req.body.ApellidoPaterno;
        var ap2= req.body.ApellidoMaterno;
        var matricula = req.body.Matricula;
        var departamento = req.body.departamento;
        var grado = req.body.grado;
        var genero = req.body.genero;
        var id = req.body.editar
        console.log(`-------DATOS------\n${opc}\n${nombre}
        \n${ap1}\n${ap2}\n${matricula}\n${departamento}\n${grado}
        \n${genero}`)

        if(opc ==="1"){
            console.log("entro a 1");
            client.query(`INSERT INTO public.alumno(
                id, nombre, apellido_1, apellido_2, matricula, departamento_id, grado_id, genero_id)
                VALUES (nextval (\'hibernate_sequence\'),'${nombre}', '${ap1}', '${ap2}', ${matricula},
                 ${departamento}, ${grado}, ${genero});`,(err,results) => {
                if(err) throw err;
                    console.log(err)
                console.log(results);
            });
            req.flash('alumno', 'Se ha registrado correctamente Alumno');
            return res.redirect('/alumno/showAlumno');
        }
        if(opc==="2"){
            client.query(``,(err,results) => {
                if(err) throw err;
                    console.log(err)
                console.log(results);
            });
            req.flash('Edit', 'Se ha editado correctamente Alumno');
            return res.redirect('/alumno/showAlumno');
        }
        if(opc==="3"){
            client.query(``,(err,results) => {
                if(err) throw err;
                    console.log(err)
                console.log(results);
            });
            req.flash('Delete', 'Se ha eliminado correctamente ');
            return res.redirect('/alumno/showAlumno');
        }
    }
}