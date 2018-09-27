
var app = angular.module('sortApp', []);
app.controller('sortController', function ($scope, $http) {
    $scope.currentPage = 0;
    $scope.pageSize = 5;
    $scope.pages = [];

    $scope.newUser = {};
    $scope.clickedUser = {};
    $scope.alertMassege = "";
 
    // $scope.sortName = 'id';
    // $scope.sortReverse = false;
    var pathname = window.location.pathname;
    console.log(pathname)
    $scope.recupera = function () {
        $http.get("/datos")
            .success((data) => {
                $scope.usuarios = data;
                console.log(JSON.stringify(data))
            })
            .error((error) => {
                console.log('Error: ' + error);
            })
            .then($scope.configPages = function () {
                $scope.pages.length = 0;
             
                var ini = $scope.currentPage - 4;
                var fin = $scope.currentPage + 5;
                if (ini < 1) {
                    ini = 1;
                    if (Math.ceil($scope.usuarios.length / $scope.pageSize) > 10)
                        fin = 10;
                    else
                        fin = Math.ceil($scope.usuarios.length / $scope.pageSize);
                } else {
                    if (ini >= Math.ceil($scope.usuarios.length / $scope.pageSize) - 10) {
                        ini = Math.ceil($scope.usuarios.length / $scope.pageSize) - 10;
                        fin = Math.ceil($scope.usuarios.length / $scope.pageSize);
                    }
                }
                if (ini < 1) ini = 1;
                for (var i = ini; i <= fin; i++) {
                    $scope.pages.push({
                        no: i
                    });
                }

                if ($scope.currentPage >= $scope.pages.length)
                    $scope.currentPage = $scope.pages.length - 1;
            });
    }

    $scope.saveUser = function () {
        console.log($scope.newUser)

        $http.post('/insert', $scope.newUser)
            .success((data) => {
                
                $scope.newUser = data;
                console.log(data);
                $scope.newUser = {};
                $scope.alertMassege = "Nuevo Item Agregado!!";
                $scope.recupera();
            })
            .error((error) => {
                console.log('Error: ' + error);
                $scope.alertMassege = "ERROR!!";
            });

        
    };
    $scope.updateUser = function (){
        $scope.newUser={
            idgenero : $scope.clickedUser.idgenero,
            genero : $scope.clickedUser.genero
        }
        console.log($scope.newUser)
        $http.post('/update', $scope.newUser)
            .success((data) => {
                
                $scope.newUser = data;
                console.log(data);
                $scope.newUser = {};
                $scope.alertMassege = "Item Actualizado!!";
                $scope.recupera();
            })
            .error((error) => {
                console.log('Error: ' + error);
                $scope.alertMassege = "ERROR!!";
            });
       
    };
    
    $scope.deleteUser = function () {


        $scope.newUser={
            eliminar:$scope.clickedUser.idgenero
        }

        console.log($scope.newUser)
        
        $http.post('/delete' , $scope.newUser)
            .success((data) => {
                $scope.todoData = data;
                console.log(data);
               
                $scope.newUser = {};
                $scope.alertMassege = "Item Borrado !!";
                $scope.recupera();
            })
            .error((data) => {
                console.log('Error: ' + data);
                $scope.alertMassege = "Error!!";
            });
    };

    $scope.selectUser = function (usuario) {
        console.log(usuario);
        $scope.clickedUser = usuario;

    };


    $scope.paginas = [5, 10, 15, 20, 50,];
    $scope.informa = function () {
        $scope.pageSize = $scope.pageSize;

    }

    $scope.setPage = function (index) {
        $scope.currentPage = index - 1;
    };

})
    .filter('startFromGrid', function () {
        return function (input, start) {
            start = +start;
            return input.slice(start);
        }
    });

