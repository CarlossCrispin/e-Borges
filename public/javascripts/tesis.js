var app = angular.module('tesisApp', []);
app.controller('tesisController', function ($scope, $http) {
    var pathname = window.location.pathname;
    // console.log(pathname)
    //paginación 
    $scope.currentPage = 0;
    $scope.pageSize = 10;
    $scope.pages = [];
    $scope.sortName = 'idtesis';
    $scope.sortReverse = false;
    $scope.buscar = "";

    //entidad
    $scope.datos = [];
    $scope.alumnos = [];
    $scope.generos = [];
    $scope.grados = [];
    $scope.departamentos= [];
    $scope.unidad= [];
    $scope.personas= [];
    $scope.new = {};
    $scope.new.codirector ='';
    $scope.new.codirector2 ='';
    $scope.new.codirector3='';
    $scope.new.codirector4 ='';
   
    $scope.clicked = {};
    $scope.clicked.idcodirector1 ='';
    $scope.clicked.idcodirector2 ='';
    $scope.clicked.idcodirector3='';
    $scope.clicked.idcodirector4 ='';
    $scope.alertMassege = "";
    // $scope.new.esexterno=0;
    $scope.clicked.esexterno=0;
    $scope.new.mes = (new Date()).getMonth()+1
   
    $scope.new.anio = (new Date()).getFullYear()

    // $scope.clicked.mes = (new Date()).getMonth()+1
   
    // $scope.clicked.año = (new Date()).getFullYear()
    // $scope.limpiar = function{
    //     $scope.form.$setPristie();
    //     $scope.form.$setuntouched();

    // }
    $scope.paginas = [10, 20, 50, 100];
    $scope.sizePag = function () {
        $scope.pageSize = $scope.pageSize;

    };

    $scope.get = function () {
        $http.get(`${pathname}/data`)
            .success((data) => {
                $scope.datos = data[0].tesis;
                $scope.alumnos = data[0].alumno;
                $scope.grados = data[0].grado;
                $scope.departamentos = data[0].departamento;
                $scope.unidad = data[0].unidad;
                $scope.personas= data[0].persona;

                // $scope.datos = data[0].personas;
                // $scope.generos = data[0].generos;
                // $scope.departamentos = data[0].departamentos;
                // $scope.grados = data[0].grados;
                
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
    };
    $scope.save = function () {
        $scope.new = {
            alumno: $scope.new.alumno.idalumno ||'',
            titulo: $scope.new.titulo ||'',
            resumen: $scope.new.resumen ||'',
            grado: $scope.new.grado||'',
            departamneto: $scope.new.departamento.iddepartamento||'',
            unidad: $scope.new.unidad||'',
            mes: $scope.new.mes||'',
            anio: $scope.new.anio||'',
            director:$scope.new.director.idpersona === undefined || '' ?  ''  : $scope.new.director.idpersona,
            codirector:$scope.new.codirector.idpersona === undefined ||'' ?  ''  : $scope.new.codirector.idpersona,
            codirector2:$scope.new.codirector2.idpersona === undefined ||'' ?  ''  : $scope.new.codirector2.idpersona,
            codirector3:$scope.new.codirector3.idpersona === undefined ||'' ?  ''  : $scope.new.codirector3.idpersona,
            codirector4:$scope.new.codirector4.idpersona === undefined ||'' ?  ''  : $scope.new.codirector4.idpersona,
          
        };
        console.log(JSON.stringify( $scope.new))
        $http.post(`${pathname}/insert`, $scope.new)
            .success((data) => {
                
                $scope.todoData= data;
              
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
        console.log($scope.clicked);
        $http.post(`${pathname}/update`,  $scope.clicked)
            .success((data) => {
                
                $scope.clickedItem = data;
                // console.log(data);
                $scope.clicked = {};
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
        // $scope.clicked.idalumno= Item.idalumno
        // $scope.clicked.alumno= Item.alumno
        // console.log($scope.clicked.alumno) 

    };


})
app.filter('startFromGrid', function () {
    return function (input, start) {
        if (!input || !input.length) { return; }
        start = +start;
        return input.slice(start);
    }
});
