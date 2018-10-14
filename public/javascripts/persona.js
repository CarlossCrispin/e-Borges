var app = angular.module('personaApp', []);
app.controller('personaController', function ($scope, $http) {
    //paginacion de la tabla
    $scope.currentPage = 0;
    $scope.pageSize = 50;
    $scope.pages = [];
    $scope.sortName = 'idpersona';
    $scope.sortReverse = false;
    //Persona
    $scope.personas=[];
    $scope.newPersona = {};
    $scope.clickedPersona = {};
    $scope.alertMassege = "";
    $scope.newPersona.esexterno=0;
    $scope.getPersona = function () {

        $http.get("/datos/persona")
            .success((data) => {

                $scope.personas = data;
                // console.log(JSON.stringify(data))
                // console.log($scope.personas.length)
            })
            .error((error) => {
                console.log('Error: ' + error);
            })
            .then($scope.configPages = function () {
                $scope.pages.length = 0;
                // console.log("--->"+$scope.personas.length)
                var ini = $scope.currentPage - 4;
                var fin = $scope.currentPage + 5;
                if (ini < 1) {
                    ini = 1;
                    if (Math.ceil($scope.personas.length / $scope.pageSize) > 10)
                        // fin = 10;
                        fin = Math.ceil( $scope.personas.length/ $scope.pageSize) ;
                    else
                        fin = Math.ceil($scope.personas.length / $scope.pageSize);
                } else {
                    if (ini >= Math.ceil($scope.personas.length / $scope.pageSize) - 10) {
                        ini = Math.ceil($scope.personas.length / $scope.pageSize) - 10;
                        fin = Math.ceil($scope.personas.length / $scope.pageSize);
                    }
                }
                if (ini < 1) ini = 1;
                for (var i = ini; i <= fin; i++) {
                    $scope.pages.push({
                        no: i
                    });
                }

                // if ($scope.currentPage >= $scope.pages.length)
                //     $scope.currentPage = $scope.pages.length - 1;
            });
            $scope.setPage = function (index) {
                $scope.currentPage = index - 1;
            };
    };
    $scope.getGenero = function () {
        $http.get("/datos/genero")
            .success((data) => {

                $scope.genero = data;
                // console.log(JSON.stringify(data))
            })
            .error((error) => {
                console.log('Error: ' + error);
            })
    }
    $scope.getGrado = function () {
        $http.get("/datos/grado")
            .success((data) => {

                $scope.grado = data;
                // console.log(JSON.stringify(data))
            })
            .error((error) => {
                console.log('Error: ' + error);
            })
    }
    $scope.getDepto = function () {
        $http.get("/datos/depto")
            .success((data) => {

                $scope.depto = data;
                // console.log(JSON.stringify(data))
            })
            .error((error) => {
                console.log('Error: ' + error);
            })
    }
    
    $scope.savePersona = function () {
     
        $scope.newPersona={
            nombre: $scope.newPersona.nombre ||'',
            nombre2: $scope.newPersona.nombre2 ||'',
            nombre3: $scope.newPersona.nombre3 ||'',
            apellido: $scope.newPersona.apellido ||'',
            apellido2: $scope.newPersona.apellido2 ||'',
            apellido3: $scope.newPersona.apellido3 ||'',
            grado: $scope.newPersona.grado.idgrado,
            genero: $scope.newPersona.genero.idgenero,
            departamento: $scope.newPersona.departamento.iddepartamento,
            esexterno: $scope.newPersona.esexterno,
            institucion: $scope.newPersona.institucion ||'',
            puesto: $scope.newPersona.puesto ||''

        }
        // console.log("-->")
        // console.log(JSON.stringify($scope.newPersona));
       
        $http.post('/insertPersona', $scope.newPersona)
            .success((data) => {
                
                $scope.newPersona = data;
                // console.log(data);
                $scope.newPersona = {};
                $scope.alertMassege = "Nuevo Item Agregado!!";
                $scope.getPersona();
            })
            .error((error) => {
                console.log('Error: ' + error);
                $scope.alertMassege = "ERROR!!";
            });
        $scope.alertMassege = "";    
        
    };
    $scope.updatePersona = function (){
        
        $scope.clickedPersona={
            idpersona:$scope.clickedPersona.idpersona,
            nombre: $scope.clickedPersona.nombre ||'',
            nombre2: $scope.clickedPersona.nombre2 ||'',
            nombre3: $scope.clickedPersona.nombre3 ||'',
            apellido: $scope.clickedPersona.apellido ||'',
            apellido2: $scope.clickedPersona.apellido2 ||'',
            apellido3: $scope.clickedPersona.apellido3 ||'',
            grado: $scope.clickedPersona.idgrado,
            genero: $scope.clickedPersona.idgenero,
            departamento: $scope.clickedPersona.iddepartamento,
            esexterno: $scope.clickedPersona.esexterno || 0,
            institucion: $scope.clickedPersona.institucion ||'',
            puesto: $scope.clickedPersona.puesto ||''

        }
        // console.log("--->")
        // console.log(JSON.stringify($scope.clickedPersona));
        // $scope.clickedPersona= {};
        $http.post('/updatePersona', $scope.clickedPersona)
            .success((data) => {
                
                $scope.clickedPersona = data;
                // console.log(data);
                $scope.clickedPersona = {};
                $scope.alertMassege = "Item Actualizado!!";
                $scope.getPersona();
            })
            .error((error) => {
                console.log('Error: ' + error);
                $scope.alertMassege = "ERROR!!";
            });
        $scope.alertMassege = "";
    };


    $scope.deletePersona = function () {


        $scope.clickedPersona={
            idpersona:$scope.clickedPersona.idpersona
        }

        // console.log( $scope.clickedPersona)
        
        $http.post('/deletePersona' , $scope.clickedPersona)
            .success((data) => {
                $scope.todoData = data;
                // console.log(data);
               
                $scope.clickedPersona = {};
                $scope.alertMassege = "Item Borrado !!";
                $scope.getPersona();
            })
            .error((data) => {
                console.log('Error: ' + data);
                $scope.alertMassege = "Error!!";
            });
            $scope.alertMassege = "";
    };
    $scope.selectPersona = function (usuario) {
        console.log(usuario);
        $scope.clickedPersona = usuario;

    };
   
    $scope.paginas = [50, 100, 150, 500, 1000, 10000];
    $scope.informa = function () {
        $scope.pageSize = $scope.pageSize;

    }

})

app.filter('startFromGrid', function () {
    return function (input, start) {
        if (!input || !input.length) { return; }
        start = +start;
        return input.slice(start);
    }
});
