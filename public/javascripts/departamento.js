
var app = angular.module('departamentoApp', []);
app.controller('departamentoController', function ($scope, $http) {

    //paginacion de la tabla
    $scope.currentPage = 0;
    $scope.pageSize = 10;
    $scope.pages = [];
    $scope.sortName = 'iddepartamento';
    $scope.sortReverse = false;
    $scope.buscar="";
    //Departamento
    $scope.departamentos = [];
    $scope.especialidad = [];
    $scope.departamento = [];
    $scope.newDepartamento = {};
    $scope.clickedDepartamento = {};
    $scope.alertMassege = "";
    
    $scope.paginas = [10,20,50,100];
    $scope.sizePag= function () {
        $scope.pageSize = $scope.pageSize;

    };
    $scope.getDepartamento = function () {
        $http.get("/dataDepartamento")
            .success((data) => {
                $scope.departamentos = data[0].departamentos;
                $scope.especialidad = data[0].especialidad;
                // console.log(JSON.stringify(data))
        
            })
            .error((error) => {
                console.log('Error: ' + error);
            })
            .then($scope.configPages = function () {
                $scope.pages = [];
                $scope.pages.length = 0;
                $scope.currentPage=0;
                // console.log($scope.departamentos.length)
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
                        fin = Math.ceil($scope.departamentos.length / $scope.pageSize);
                        $scope.buscar2="";
                        // console.log(fin)
                    }
             
                } else {
                    if (ini >= Math.ceil($scope.departamentos.length / $scope.pageSize) - 10) {
                        ini = Math.ceil($scope.departamentos.length / $scope.pageSize) - 10;
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

    $scope.saveDepartamento = function () {
        $scope.newDepartamento = {
            departamento :$scope.newDepartamento.departamento || '',
            especialidad :$scope.newDepartamento.especialidad.idespecialidad
        };
       
        
        console.log( $scope.newDepartamento)
        $http.post('/insertDepartamento', $scope.newDepartamento)
            .success((data) => {
                
                $scope.newDepartamento= data;
                $scope.newDepartamento= {};
                $scope.alertMassege = "Nuevo Item Agregado!!";
                $scope.getDepartamento();
            })
            .error((error) => {
                console.log('Error: ' + error);
                $scope.alertMassege = "ERROR!!";
            });
        $scope.alertMassege = "";    


    };

    $scope.updateDepartamento = function () {
        
        $scope.clickedDepartamento={
            id:$scope.clickedDepartamento.iddepartamento,
            departamento: $scope.clickedDepartamento.departamento || '',
            idespecialidad: $scope.clickedDepartamento.idespecialidad ,
            especialidad: $scope.clickedDepartamento.especialidad 

        };
        // console.log($scope.clickedDepartamento);
        $http.post('/updateDepartamento',  $scope.clickedDepartamento)
            .success((data) => {
                
                $scope.newItem = data;
                // console.log(data);
                $scope.clickedDepartamento = {};
                $scope.alertMassege = "Item Actualizado!!";
                $scope.getDepartamento();
            })
            .error((error) => {
                console.log('Error: ' + error);
                $scope.alertMassege = "ERROR!!";
            });
        $scope.alertMassege = "";   

    };

    $scope.delete = function () {
        

        $scope.clickedDepartamento={
            id:$scope.clickedDepartamento.iddepartamento
        };
       

        console.log($scope.clickedItem)
        
        $http.post('/deleteDepartamento' , $scope.clickedDepartamento)
            .success((data) => {
                $scope.todoData = data;
                // console.log(data);
               
                $scope.clickedAlumno = {};
                $scope.alertMassege = "Item Borrado !!";
                $scope.getDepartamento();
            })
            .error((data) => {
                console.log('Error: ' + data);
                $scope.alertMassege = "Error!!";
            });
            $scope.alertMassege = "";
    };

    $scope.selectDepartamento = function (Item) {
        // console.log(Item);
        $scope.clickedDepartamento = Item;

    };


});
app.filter('startFromGrid', function () {
    return function (input, start) {
        if (!input || !input.length) { return; }
        start = +start;
        return input.slice(start);
    }
});