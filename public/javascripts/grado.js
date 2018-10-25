
var app = angular.module('gradoApp', []);
app.controller('gradoController', function ($scope, $http) {
    var pathname = window.location.pathname;
    // console.log(pathname)
    //paginación 
    $scope.currentPage = 0;
    $scope.pageSize = 10;
    $scope.pages = [];
    $scope.sortName = 'idgrado';
    $scope.sortReverse = false;
    $scope.buscar = "";

    //entidad
    $scope.datos = [];
    $scope.new = {};
    $scope.clicked = {};
    $scope.alertMassege = "";

    $scope.paginas = [10, 20, 50, 100];
    $scope.sizePag = function () {
        $scope.pageSize = $scope.pageSize;

    };

    $scope.get = function () {
        $http.get(`${pathname}/data`)
            .success((data) => {
                $scope.datos = data;

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
            grado :$scope.new.grado  || '',
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
            id:$scope.clicked.idgrado,
            grado :$scope.clicked.grado  || '',

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
            id:$scope.clicked.idgrado
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
   
