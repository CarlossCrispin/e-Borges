var app = angular.module('alumnoApp', []);
app.controller('alumnoController', function ($scope, $http) {
    //paginacion de la tabla
    $scope.currentPage = 0;
    $scope.pageSize = 10;
    $scope.pages = [];
    $scope.sortName = 'idalumno';
    $scope.sortReverse = false;
    $scope.buscar="";
    //Alumno
    $scope.alumnos = [];
    $scope.genero = [];
    $scope.departamento = [];
    $scope.newalumno = {};
    $scope.clickedalumno = {};
    $scope.alertMassege = "";
    
    $scope.paginas = [10,50,75,100,150,200,500];
    $scope.informa = function () {
        $scope.pageSize = $scope.pageSize;

    }

    $scope.getAlumno = function () {
        $http.get("/datosAlumno")
            .success((data) => {
                $scope.alumnos = data[0].alumnos;
                $scope.genero = data[0].genero;
                $scope.departamento = data[0].departamento;
                // console.log(JSON.stringify(data))
                // console.log("---------------")
                // console.log(JSON.stringify(data[0].alumno))
                // console.log()
                // console.log($scope.alumno.length)
            })
            .error((error) => {
                console.log('Error: ' + error);
            })
            .then($scope.configPages = function () {
                $scope.pages = [];
                $scope.pages.length = 0;
                $scope.currentPage=0;
                // console.log($scope.alumnos.length)
                var ini = $scope.currentPage - 4;
                var fin = $scope.currentPage + 5;
                if (ini < 1) {
                    ini = 1;
                    if($scope.buscar!=""){
                        
                        $scope.buscar2=$scope.buscar;
                        fin = Math.ceil($scope.filtered.length / $scope.pageSize);
                        // console.log("--->"+fin)
                        
                    }
                    else{
                        fin = Math.ceil($scope.alumnos.length / $scope.pageSize);
                        $scope.buscar2="";
                        // console.log(fin)
                    }
             
                } else {
                    if (ini >= Math.ceil($scope.alumnos.length / $scope.pageSize) - 10) {
                        ini = Math.ceil($scope.alumnos.length / $scope.pageSize) - 10;
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
    $scope.saveAlumno = function () {
        $scope.newAlumno={
            nombre: $scope.newAlumno.nombre ||'',
            nombre2: $scope.newAlumno.nombre2 ||'',
            nombre3: $scope.newAlumno.nombre3 ||'',
            apellido: $scope.newAlumno.apellido ||'',
            apellido2: $scope.newAlumno.apellido2 ||'',
            apellido3: $scope.newAlumno.apellido3 ||'',
            matricula: $scope.newAlumno.matricula,
            genero: $scope.newAlumno.genero.idgenero,
            departamento: $scope.newAlumno.departamento.iddepartamento,
           

        }
        // console.log("-->")
        // console.log(JSON.stringify($scope.newAlumno));
        $http.post('/insertAlumno', $scope.newAlumno)
            .success((data) => {
                
                $scope.newAlumno = data;
                // console.log(data);
                $scope.newAlumno = {};
                $scope.alertMassege = "Nuevo Item Agregado!!";
                $scope.getAlumno();
            })
            .error((error) => {
                console.log('Error: ' + error);
                $scope.alertMassege = "ERROR!!";
            });
        $scope.alertMassege = "";    
    };
    $scope.updateAlumno = function () {
        $scope.clickedAlumno={
            id:$scope.clickedAlumno.idalumno,
            nombre: $scope.clickedAlumno.nombre ||'',
            nombre2: $scope.clickedAlumno.nombre2 ||'',
            nombre3: $scope.clickedAlumno.nombre3 ||'',
            apellido: $scope.clickedAlumno.apellido ||'',
            apellido2: $scope.clickedAlumno.apellido2 ||'',
            apellido3: $scope.clickedAlumno.apellido3 ||'',
            matricula: $scope.clickedAlumno.matricula,
            genero: $scope.clickedAlumno.idgenero,
            departamento: $scope.clickedAlumno.iddepartamento 

        }
        $http.post('/updateAlumno',  $scope.clickedAlumno)
            .success((data) => {
                
                $scope.newAlumno = data;
                // console.log(data);
                $scope.newAlumno = {};
                $scope.alertMassege = "Item Actualizado!!";
                $scope.getAlumno();
            })
            .error((error) => {
                console.log('Error: ' + error);
                $scope.alertMassege = "ERROR!!";
            });
        $scope.alertMassege = "";   

    };
    $scope.deleteAlumno = function () {


        $scope.clickedAlumno={
            idalumno:$scope.clickedAlumno.idalumno
        }

        // console.log( $scope.clickedAlumno)
        
        $http.post('/deleteAlumno' , $scope.clickedAlumno)
            .success((data) => {
                $scope.todoData = data;
                // console.log(data);
               
                $scope.clickedAlumno = {};
                $scope.alertMassege = "Item Borrado !!";
                $scope.getAlumno();
            })
            .error((data) => {
                console.log('Error: ' + data);
                $scope.alertMassege = "Error!!";
            });
            $scope.alertMassege = "";
    };
    $scope.selectAlumno = function (Alumno) {
        // console.log(Alumno);
        $scope.clickedAlumno = Alumno;

    };
});
app.filter('startFromGrid', function () {
    return function (buscar, start) {
        if (!buscar || !buscar.length) { return; }
        start = +start;
        return buscar.slice(start);
    }
});
