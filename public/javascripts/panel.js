

var app = angular.module('panelApp', []);
app.controller('panelController', function ($scope, $http) {
   
        var pathname = window.location.pathname;
        // console.log(pathname)
        // console.log(`${pathname}/data`)
        //paginación 
        $scope.currentPage = 0;
        $scope.pageSize = 10;
        $scope.pages = [];
        $scope.sortName = 'idtesis';
        $scope.sortReverse = false;
        $scope.buscar = "";
    
        //entidad
        $scope.datos = [];
        $scope.generos = [];
        $scope.departamentos= [];
        $scope.grado= [];
        $scope.genero= [];
        $scope.new = {};
        $scope.return= {};
        $scope.new2 = {};
        $scope.new.codirector ='';
        $scope.new.codirector2 ='';
        $scope.new.codirector3='';
        $scope.new.codirector4 ='';
        // $scope.new.esexterno =0;
        $scope.clicked3={}
       
        $scope.clicked = {};
        $scope.alertMassege = "";
        $scope.alertMassege2 = "";
        
        // $scope.clicked.esexterno=0;
        
        $scope.new.mes = (new Date()).getMonth()+1
   
        $scope.new.anio = (new Date()).getFullYear()
    
        $scope.fecha=new Date();


        $scope.paginas = [10, 20, 50, 100];
        $scope.sizePag = function () {
            $scope.pageSize = $scope.pageSize;
    
        };
    
        $scope.get = function () {
            $scope.datos.length =99999;
            $http.get(`${pathname}/data`)
                .success((data) => {
                    // $scope.datos = data
                $scope.datos = data[0].tesis;
                $scope.alumnos = data[0].alumno;
                $scope.grados = data[0].grado;
                $scope.departamentos = data[0].departamento;
                $scope.unidad = data[0].unidad;
                // $scope.personas= data[0].persona;
                $scope.generos= data[0].genero;
                $scope.user= data[0].user
                    
                    // console.log(data);
    
                })
                .error((error) => {
                    console.log('Error: ' + error);
                })
                .then($scope.configPages = function () {
                    $scope.pages = [];
                    $scope.pages.length = 0;
                    $scope.currentPage = 0;
                    var ini = $scope.currentPage - 4;
                    var fin = $scope.currentPage + 5;
                    if (ini < 1) {
                        ini = 1;
                        if ($scope.buscar != "") {
    
                            $scope.buscar2 = $scope.buscar;
                            fin = Math.ceil($scope.filtered.length / $scope.pageSize);
                            // console.log("--->"+fin)
                            
                        }
                        else {
                            fin = Math.ceil($scope.datos.length / $scope.pageSize);
                            $scope.buscar2 = "";
                            // console.log(fin)
                        }
    
                    } else {
                        if (ini >= Math.ceil($scope.datos.length / $scope.pageSize) - 10) {
                            ini = Math.ceil($scope.datos.length / $scope.pageSize) - 10;
                            fin = Math.ceil($scope.alumno.length / $scope.pageSize);
                        }
                    }
                    if (ini < 1) ini = 1;
                    for (var i = ini; i <= fin; i++) {
                        $scope.pages.push({
                            no: i
                        });
                    }
    
                });
            $scope.setPage = function (index) {
                $scope.currentPage = index - 1;
            };
            $scope.new= {};
            $scope.new.codirector ='';
            $scope.new.codirector2 ='';
            $scope.new.codirector3='';
            $scope.new.codirector4 ='';
            $scope.new.mes = (new Date()).getMonth()+1
            $scope.new.anio = (new Date()).getFullYear()
            $scope.new.esexterno;
        };
        $scope.persona = function () {
            // $http.get(`${pathname}/persona`)
            console.log()
            $http.get(`${pathname}/persona`)
                .success((data) => {
                    $scope.personas= data;
                    
                    // console.log(data);
    
                })
                .error((error) => {
                    console.log('Error: ' + error);
                })
        };
      
        $scope.save = function () {
            $scope.new = {
                alumno: $scope.user.id,
                titulo: $scope.new.titulo ||'',
                resumen: $scope.new.resumen ||'',
                grado: $scope.new.grado||'',
                departamneto: $scope.new.departamento.iddepartamento||'',
                unidad: $scope.new.unidad||'',
                mes: $scope.new.mes||'',
                anio: $scope.new.anio||'',
                // director:$scope.new.director.idpersona,
                // codirector:$scope.new.codirector.idpersona,
                // codirector2:$scope.new.codirector2.idpersona,
                // codirector3:$scope.new.codirector3.idpersona,
                // codirector4:$scope.new.codirector4.idpersona,
                director:$scope.new.director.idpersona === undefined || '' ?  null  : $scope.new.director.idpersona,
                codirector:$scope.new.codirector.idpersona === undefined ||'' ?  null : $scope.new.codirector.idpersona,
                codirector2:$scope.new.codirector2.idpersona === undefined ||'' ?  null : $scope.new.codirector2.idpersona,
                codirector3:$scope.new.codirector3.idpersona === undefined ||'' ?  null  : $scope.new.codirector3.idpersona,
                codirector4:$scope.new.codirector4.idpersona === undefined ||'' ?  null  : $scope.new.codirector4.idpersona,
              
            };
            // console.log( $scope.new)
            // $scope.new= {};
            $http.post(`${pathname}/insert`, $scope.new)
                .success((data) => {
                    
                    $scope.new= data;
                    $scope.new= {};
                    $scope.alertMassege = "Nuevo Item Agregado!!";
                    $scope.get();
                    $scope.new.mes = (new Date()).getMonth()+1
   
                    $scope.new.anio = (new Date()).getFullYear()
                })
                .error((error) => {
                    console.log('Error: ' + error);
                    $scope.alertMassege = "ERROR!!";
                });
            $scope.alertMassege = "";    
        };
        $scope.add = function () {
            //  $scope.new = {
            //     alumno: $scope.user.id,
            //     titulo: $scope.new.titulo ||'',
            //     resumen: $scope.new.resumen ||'',
            //     grado: $scope.new.grado||'',
            //     departamneto: $scope.new.departamento.iddepartamento||'',
            //     unidad: $scope.new.unidad||'',
            //     mes: $scope.new.mes||'',
            //     anio: $scope.new.anio||'',
            //     // director:$scope.new.director.idpersona,
            //     // codirector:$scope.new.codirector.idpersona,
            //     // codirector2:$scope.new.codirector2.idpersona,
            //     // codirector3:$scope.new.codirector3.idpersona,
            //     // codirector4:$scope.new.codirector4.idpersona,
            //     director:$scope.new.director.idpersona === undefined || '' ?  null  : $scope.new.director.idpersona,
            //     codirector:$scope.new.codirector.idpersona === undefined ||'' ?  null : $scope.new.codirector.idpersona,
            //     codirector2:$scope.new.codirector2.idpersona === undefined ||'' ?  null : $scope.new.codirector2.idpersona,
            //     codirector3:$scope.new.codirector3.idpersona === undefined ||'' ?  null  : $scope.new.codirector3.idpersona,
            //     codirector4:$scope.new.codirector4.idpersona === undefined ||'' ?  null  : $scope.new.codirector4.idpersona,
              
            // };
            $scope.new2 = {
                nombre: $scope.new2.nombre ||'',
                nombre2: $scope.new2.nombre2 ||'',
                nombre3: $scope.new2.nombre3 ||'',
                apellido: $scope.new2.apellido ||'',
                apellido2: $scope.new2.apellido2 ||'',
                apellido3: $scope.new2.apellido3 ||'',
                grado: $scope.new2.grado.idgrado,
                genero: $scope.new2.genero.idgenero,
                departamento: $scope.new2.departamento.iddepartamento,
                esexterno: $scope.new.esexterno,
                institucion: $scope.new2.institucion ||'',
                puesto: $scope.new2.puesto ||''
            };
            console.log($scope.new2);
            // $scope.new.codirector="sientroooooooo"
            // $scope.new2={}
            $scope.personas.length =0;
            $http.post(`${pathname}/add`, $scope.new2)
                .success((data) => {
                    console.log(JSON.stringify(data[0]));
                    
                    // $scope.personas= data[0].persona;
                    $scope.return= data;
                    // $scope.new.director;
                    $scope.new.codirector.idpersona=data[0].idpersona;
                    $scope.new.codirector=data[0];
                    $scope.clicked3.idpersona =data[0].idpersona;
                  
                    $scope.new2= {};
                    $scope.alertMassege2 = "Codirector Externo Agregado!!";
                    $scope.persona();
                   
                })
                .error((error) => {
                    console.log('Error: ' + error);
                    $scope.alertMassege2 = "ERROR!!";
                });
            $scope.alertMassege2 = "";


        }
           $scope.aceptar= function () {
            
            
            $scope.clicked={
                id:$scope.clicked.idtesis,
               
            };
    
            console.log($scope.clicked)
            
           
            
            $http.post(`${pathname}/aceptar`,  $scope.clicked)
                .success((data) => {
                    
                    $scope.newItem = data;
                    // console.log(data);
                    $scope.new = {};
                    $scope.alertMassege = "Acepto ser Director de Tesis";
                    $scope.get();
                })
                .error((error) => {
                    console.log('Error: ' + error);
                    $scope.alertMassege = "ERROR!!";
                });
            $scope.alertMassege = "";   
    
        };
        $scope.update= function () {
            
            $scope.clicked={
                id: $scope.clicked.idtesis,
                alumno: $scope.clicked.idalumno ||'',
                titulo: $scope.clicked.titulo ||'',
                resumen: $scope.clicked.resumen ||'',
                grado: $scope.clicked.idgrado||'',
                departamneto: $scope.clicked.iddepartamento||'',
                unidad: $scope.clicked.idunidad||'',
                mes: $scope.clicked.mes||'',
                anio: $scope.clicked.anio||'',
                director:$scope.clicked.iddirector === undefined || '' ?  null : $scope.clicked.iddirector,
                codirector:$scope.clicked.idcodirector1 === undefined ||'' ?  null  : $scope.clicked.idcodirector1,
                codirector2:$scope.clicked.idcodirector2 === undefined ||'' ?  null  : $scope.clicked.idcodirector2,
                codirector3:$scope.clicked.idcodirector3 === undefined ||'' ?  null  : $scope.clicked.idcodirector3,
                codirector4:$scope.clicked.idcodirector4 === undefined ||'' ?  null : $scope.clicked.idcodirector4
    
            };
            // console.log($scope.clicked);
            $http.post(`${pathname}/update`,  $scope.clicked)
                .success((data) => {
                    
                    $scope.newItem = data;
                    // console.log(data);
                    $scope.new = {};
                    $scope.alertMassege = "Item Actualizado!!";
                    $scope.get();
                })
                .error((error) => {
                    console.log('Error: ' + error);
                    $scope.alertMassege = "ERROR!!";
                });
            $scope.alertMassege = "";   
    
        };
        $scope.delete = function () {

            $scope.clicked={
                id:$scope.clicked.idtesis,
                idp:$scope.clicked.idtesispersona
            };
    
            // console.log($scope.clicked)
            
            $http.post(`${pathname}/delete` , $scope.clicked)
                .success((data) => {
                    $scope.todoData = data;
                    console.log( $scope.todoData)
                    $scope.clicked = {};
                    $scope.get();
                    $scope.alertMassege = "Item Borrado !!";
                })
                .error((data) => {
                    console.log('Error: ' + data);
                    $scope.alertMassege = "Error!!";
                });
                $scope.alertMassege = "";
        };
        $scope.select = function (Item) {
            // console.log(Item);
            $scope.clicked = Item;
    
        };
    
    
    })
    
    app.filter('startFromGrid', function () {
        return function (input, start) {
            if (!input || !input.length) { return; }
            start = +start;
            return input.slice(start);
        }
    });
    