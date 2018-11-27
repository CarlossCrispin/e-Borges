
var app = angular.module('usuarioApp', []);
app.controller('usuarioController', function ($scope, $http) {
    var pathname = window.location.pathname;
    // console.log(pathname)
    //paginación 
    $scope.currentPage = 0;
    $scope.pageSize = 10;
    $scope.pages = [];
    $scope.sortName = 'idusuario';
    $scope.sortReverse = false;
    $scope.buscar = "";

    //entidad
    $scope.datos = [];
    $scope.new = {};
    $scope.clicked = {};
    $scope.alertMassege = "";
    $scope.roles = ['Administrador', 'Control Escolar', 'Secretaria'];

    $scope.paginas = [10, 20, 50, 100];
    $scope.sizePag = function () {
        $scope.pageSize = $scope.pageSize;

    };
    $scope.reset = function ()
    {   
        $scope.myFormReg.$setPristine();
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
            nombre :$scope.new.nombre || '',
            nombre2 :$scope.new.nombre2 || '',
            nombre3 :$scope.new.nombre3 || '',
            apellido :$scope.new.apellido || '',
            apellido2 :$scope.new.apellido2 || '',
            apellido3 :$scope.new.apellido3 || '' ,
            password :$scope.new.password ,
            email :$scope.new.email || '' ,
            rol :$scope.new.rol
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
            id:$scope.clicked.idusuario,
            nombre :$scope.clicked.nombre || '',
            nombre2 :$scope.clicked.nombre2 || '',
            nombre3 :$scope.clicked.nombre3 || '',
            apellido :$scope.clicked.apellido || '',
            apellido2 :$scope.clicked.apellido2 || '',
            apellido3 :$scope.clicked.apellido3 || '' ,
            contrasena :$scope.clicked.contrasena ,
            email :$scope.clicked.email || '' ,
            rol :$scope.clicked.rol

        };
        // console.log($scope.clicked);
        $http.post(`${pathname}/update`,  $scope.clicked)
            .success((data) => {
                
                $scope.newItem = data;
                // console.log(data);
                // $scope.new = {};
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
            id:$scope.clicked.idusuario
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
   
