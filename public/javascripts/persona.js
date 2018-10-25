var app = angular.module('personaApp', []);
app.controller('personaController', function ($scope, $http) {
    var pathname = window.location.pathname;
    // console.log(pathname)
    //paginación 
    $scope.currentPage = 0;
    $scope.pageSize = 10;
    $scope.pages = [];
    $scope.sortName = 'idpersona';
    $scope.sortReverse = false;
    $scope.buscar = "";

    //entidad
    $scope.datos = [];
    $scope.generos = [];
    $scope.departamentos= [];
    $scope.grado= [];
    $scope.new = {};
    $scope.clicked = {};
    $scope.alertMassege = "";
    $scope.new.esexterno=0;
    $scope.clicked.esexterno=0;

    $scope.paginas = [10, 20, 50, 100];
    $scope.sizePag = function () {
        $scope.pageSize = $scope.pageSize;

    };

    $scope.get = function () {
        $http.get(`${pathname}/data`)
            .success((data) => {
                $scope.datos = data[0].personas;
                $scope.generos = data[0].generos;
                $scope.departamentos = data[0].departamentos;
                $scope.grados = data[0].grados;
                
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
    };
    $scope.save = function () {
        $scope.new = {
            nombre: $scope.new.nombre ||'',
            nombre2: $scope.new.nombre2 ||'',
            nombre3: $scope.new.nombre3 ||'',
            apellido: $scope.new.apellido ||'',
            apellido2: $scope.new.apellido2 ||'',
            apellido3: $scope.new.apellido3 ||'',
            grado: $scope.new.grado.idgrado,
            genero: $scope.new.genero.idgenero,
            departamento: $scope.new.departamento.iddepartamento,
            esexterno: $scope.new.esexterno,
            institucion: $scope.new.institucion ||'',
            puesto: $scope.new.puesto ||''
        };
        // console.log( $scope.new)
        $http.post(`${pathname}/insert`, $scope.new)
            .success((data) => {
                
                $scope.new= data;
                $scope.new= {};
                $scope.alertMassege = "Nuevo Item Agregado!!";
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
            id:$scope.clicked.idpersona,
            nombre: $scope.clicked.nombre ||'',
            nombre2: $scope.clicked.nombre2 ||'',
            nombre3: $scope.clicked.nombre3 ||'',
            apellido: $scope.clicked.apellido ||'',
            apellido2: $scope.clicked.apellido2 ||'',
            apellido3: $scope.clicked.apellido3 ||'',
            grado: $scope.clicked.idgrado,
            genero: $scope.clicked.idgenero,
            departamento: $scope.clicked.iddepartamento,
            esexterno: $scope.clicked.esexterno || 0,
            institucion: $scope.clicked.institucion ||'',
            puesto: $scope.clicked.puesto ||''

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
            id:$scope.clicked.idpersona
        };

        // console.log($scope.clicked)
        
        $http.post(`${pathname}/delete` , $scope.clicked)
            .success((data) => {
                $scope.todoData = data;
                $scope.clicked = {};
                $scope.alertMassege = "Item Borrado !!";
                $scope.get();
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

// var app = angular.module('personaApp', []);
// app.controller('personaController', function ($scope, $http) {
//     //paginacion de la tabla
//     $scope.currentPage = 0;
//     $scope.pageSize = 50;
//     $scope.pages = [];
//     $scope.sortName = 'idpersona';
//     $scope.sortReverse = false;
//     //Persona
//     $scope.personas=[];
//     $scope.newPersona = {};
//     $scope.clickedPersona = {};
//     $scope.alertMassege = "";
//     $scope.new.esexterno=0;
//     $scope.getPersona = function () {

//         $http.get("/datos/persona")
//             .success((data) => {

//                 $scope.personas = data;
//                 // console.log(JSON.stringify(data))
//                 // console.log($scope.personas.length)
//             })
//             .error((error) => {
//                 console.log('Error: ' + error);
//             })
//             .then($scope.configPages = function () {
//                 $scope.pages.length = 0;
//                 // console.log("--->"+$scope.personas.length)
//                 var ini = $scope.currentPage - 4;
//                 var fin = $scope.currentPage + 5;
//                 if (ini < 1) {
//                     ini = 1;
//                     if (Math.ceil($scope.personas.length / $scope.pageSize) > 10)
//                         // fin = 10;
//                         fin = Math.ceil( $scope.personas.length/ $scope.pageSize) ;
//                     else
//                         fin = Math.ceil($scope.personas.length / $scope.pageSize);
//                 } else {
//                     if (ini >= Math.ceil($scope.personas.length / $scope.pageSize) - 10) {
//                         ini = Math.ceil($scope.personas.length / $scope.pageSize) - 10;
//                         fin = Math.ceil($scope.personas.length / $scope.pageSize);
//                     }
//                 }
//                 if (ini < 1) ini = 1;
//                 for (var i = ini; i <= fin; i++) {
//                     $scope.pages.push({
//                         no: i
//                     });
//                 }

//                 // if ($scope.currentPage >= $scope.pages.length)
//                 //     $scope.currentPage = $scope.pages.length - 1;
//             });
//             $scope.setPage = function (index) {
//                 $scope.currentPage = index - 1;
//             };
//     };
//     $scope.getGenero = function () {
//         $http.get("/datos/genero")
//             .success((data) => {

//                 $scope.genero = data;
//                 // console.log(JSON.stringify(data))
//             })
//             .error((error) => {
//                 console.log('Error: ' + error);
//             })
//     }
//     $scope.getGrado = function () {
//         $http.get("/datos/grado")
//             .success((data) => {

//                 $scope.grado = data;
//                 // console.log(JSON.stringify(data))
//             })
//             .error((error) => {
//                 console.log('Error: ' + error);
//             })
//     }
//     $scope.getDepto = function () {
//         $http.get("/datos/depto")
//             .success((data) => {

//                 $scope.depto = data;
//                 // console.log(JSON.stringify(data))
//             })
//             .error((error) => {
//                 console.log('Error: ' + error);
//             })
//     }
    
//     $scope.savePersona = function () {
     
//         $scope.newPersona={
//             nombre: $scope.newPersona.nombre ||'',
//             nombre2: $scope.newPersona.nombre2 ||'',
//             nombre3: $scope.newPersona.nombre3 ||'',
//             apellido: $scope.newPersona.apellido ||'',
//             apellido2: $scope.newPersona.apellido2 ||'',
//             apellido3: $scope.newPersona.apellido3 ||'',
//             grado: $scope.newPersona.grado.idgrado,
//             genero: $scope.newPersona.genero.idgenero,
//             departamento: $scope.newPersona.departamento.iddepartamento,
//             esexterno: $scope.newPersona.esexterno,
//             institucion: $scope.newPersona.institucion ||'',
//             puesto: $scope.newPersona.puesto ||''

//         }
//         // console.log("-->")
//         // console.log(JSON.stringify($scope.newPersona));
       
//         $http.post('/insertPersona', $scope.newPersona)
//             .success((data) => {
                
//                 $scope.newPersona = data;
//                 // console.log(data);
//                 $scope.newPersona = {};
//                 $scope.alertMassege = "Nuevo Item Agregado!!";
//                 $scope.getPersona();
//             })
//             .error((error) => {
//                 console.log('Error: ' + error);
//                 $scope.alertMassege = "ERROR!!";
//             });
//         $scope.alertMassege = "";    
        
//     };
//     $scope.updatePersona = function (){
        
//         $scope.clickedPersona={
//             idpersona:$scope.clickedPersona.idpersona,
//             nombre: $scope.clickedPersona.nombre ||'',
//             nombre2: $scope.clickedPersona.nombre2 ||'',
//             nombre3: $scope.clickedPersona.nombre3 ||'',
//             apellido: $scope.clickedPersona.apellido ||'',
//             apellido2: $scope.clickedPersona.apellido2 ||'',
//             apellido3: $scope.clickedPersona.apellido3 ||'',
//             grado: $scope.clickedPersona.idgrado,
//             genero: $scope.clickedPersona.idgenero,
//             departamento: $scope.clickedPersona.iddepartamento,
//             esexterno: $scope.clickedPersona.esexterno || 0,
//             institucion: $scope.clickedPersona.institucion ||'',
//             puesto: $scope.clickedPersona.puesto ||''

//         }
//         // console.log("--->")
//         // console.log(JSON.stringify($scope.clickedPersona));
//         // $scope.clickedPersona= {};
//         $http.post('/updatePersona', $scope.clickedPersona)
//             .success((data) => {
                
//                 $scope.clickedPersona = data;
//                 // console.log(data);
//                 $scope.clickedPersona = {};
//                 $scope.alertMassege = "Item Actualizado!!";
//                 $scope.getPersona();
//             })
//             .error((error) => {
//                 console.log('Error: ' + error);
//                 $scope.alertMassege = "ERROR!!";
//             });
//         $scope.alertMassege = "";
//     };


//     $scope.deletePersona = function () {


//         $scope.clickedPersona={
//             idpersona:$scope.clickedPersona.idpersona
//         }

//         // console.log( $scope.clickedPersona)
        
//         $http.post('/deletePersona' , $scope.clickedPersona)
//             .success((data) => {
//                 $scope.todoData = data;
//                 // console.log(data);
               
//                 $scope.clickedPersona = {};
//                 $scope.alertMassege = "Item Borrado !!";
//                 $scope.getPersona();
//             })
//             .error((data) => {
//                 console.log('Error: ' + data);
//                 $scope.alertMassege = "Error!!";
//             });
//             $scope.alertMassege = "";
//     };
//     $scope.selectPersona = function (usuario) {
//         console.log(usuario);
//         $scope.clickedPersona = usuario;

//     };
   
//     $scope.paginas = [50, 100, 150, 500, 1000, 10000];
//     $scope.informa = function () {
//         $scope.pageSize = $scope.pageSize;

//     }

// })

// app.filter('startFromGrid', function () {
//     return function (input, start) {
//         if (!input || !input.length) { return; }
//         start = +start;
//         return input.slice(start);
//     }
// });
