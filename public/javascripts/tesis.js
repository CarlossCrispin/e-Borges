var app = angular.module('tesisApp', []);
app.controller('tesisController', function ($scope, $http) {
    //paginacion de la tabla
    $scope.currentPage = 0;
    $scope.pageSize = 50;
    $scope.pages = [];
    $scope.sortName = 'idtesis';
    $scope.sortReverse = false;
    $scope.buscar="";
    //Tesis
    $scope.tesis = [];
    $scope.newTesis = {};
    $scope.clickedTesis = {};
    $scope.alertMassege = "";
    
    
    // $scope.newTesis.esexterno = 0;
    $scope.getTesis = function () {
        $http.get("/datosTesis")
            .success((data) => {
                $scope.tesis = data
                // console.log(JSON.stringify(data))
                // console.log("---------------")
                // console.log(JSON.stringify(data[0].tesis))
                // console.log()
                // console.log($scope.Tesis.length)
            })
            .error((error) => {
                console.log('Error: ' + error);
            })
            .then($scope.configPages = function () {
                $scope.pages = [];
                $scope.pages.length = 0;
                $scope.currentPage=0;
                // console.log($scope.tesis.length)
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
                        fin = Math.ceil($scope.tesis.length / $scope.pageSize);
                        $scope.buscar2="";
                        // console.log(fin)
                    }
                    // if (Math.ceil($scope.tesis.length / $scope.pageSize) > 10){
                    //     console.log($scope.tesis.length)
                        
                        
                    // }   
                    // else
                    //     fin = Math.ceil($scope.tesis.length / $scope.pageSize);
                } else {
                    if (ini >= Math.ceil($scope.tesis.length / $scope.pageSize) - 10) {
                        ini = Math.ceil($scope.tesis.length / $scope.pageSize) - 10;
                        fin = Math.ceil($scope.tesis.length / $scope.pageSize);
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
    $scope.deleteTesis = function () {


        $scope.clickedTesis={
            idtesis:$scope.clickedTesis.idtesis
        }

        // console.log( $scope.clickedTesis)
        
        $http.post('/deleteTesis' , $scope.clickedTesis)
            .success((data) => {
                $scope.todoData = data;
                // console.log(data);
               
                $scope.clickedTesis = {};
                $scope.alertMassege = "Item Borrado !!";
                $scope.getTesis();
            })
            .error((data) => {
                console.log('Error: ' + data);
                $scope.alertMassege = "Error!!";
            });
            $scope.alertMassege = "";
    };
    $scope.paginas = [10,50,75,100,150,200,500, 1000];
    $scope.informa = function () {
        $scope.pageSize = $scope.pageSize;

    }
    // $scope.informa2 = function () {
        
    //     var ot= Math.ceil($scope.filtered.length / $scope.pageSize);
       
    //     for (var i = ini; i <= ot; i++) {
    //         $scope.pages.push({
    //             no: i
    //         });
    //     }
    //     // console.log("--->pages"+$scope.pages.length)

    // }

    $scope.selectTesis = function (item) {
        $scope.clickedTesis = item;
        console.log(item);
        console.log(JSON.stringify($scope.clickedTesis));
    };

});

app.filter('startFromGrid', function () {
    return function (buscar, start) {
        if (!buscar || !buscar.length) { return; }
        start = +start;
        return buscar.slice(start);
    }
});
