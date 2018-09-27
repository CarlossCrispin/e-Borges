var app = angular.module('personaApp', []);
app.controller('personaController', function ($scope, $http) {
    //paginacion de la tabla
    $scope.currentPage = 0;
    $scope.pageSize = 50;
    $scope.pages = [];
    $scope.sortName = 'idpersona';
    $scope.sortReverse = false;
    //Persona
    // $scope.personas={};
    $scope.newPersona = {};
    $scope.clickedPersona = {};
    $scope.alertMassege = "";
    $scope.getPersona = function () {

        $http.get("/datos/persona")
            .success((data) => {
                
                $scope.personas = data;
                // console.log(JSON.stringify(data))
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
                    if (Math.ceil($scope.personas.length / $scope.pageSize) > 10)
                        // fin = 10;
                        fin = $scope.personas.length/50+1;
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

                if ($scope.currentPage >= $scope.pages.length)
                    $scope.currentPage = $scope.pages.length - 1;
            });

    }
    
    $scope.selectUser = function (usuario) {
        console.log(usuario);
        $scope.clickedUser = usuario;

    };


    $scope.paginas = [50, 100, 150, 500, 1000,10000];
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
