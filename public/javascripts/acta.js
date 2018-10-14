var app = angular.module('actaApp', []);
app.controller('actaController', function ($scope, $http) {
     // Paginación
    $scope.currentPage = 0;
    $scope.pageSize = 10;
    $scope.pages = [];
    $scope.sortName = 'idacta';
    $scope.sortReverse = false;
    $scope.buscar="";
    //Acta
    $scope.actas =[];
    $scope.actas =[];
    $scope.unidad =[];
    $scope.newActa = {};
    $scope.clickedActa = {};
    $scope.alertMassege = "";
    
    $scope.newActa.folio = "";
    // var dictionary = "abcdefghijklmnopqertuvwxyz123456789";
    var dictionary = "ABCDEF123456789";
    $scope.setFolio= function () {
        $scope.newActa.folio = "";
        
        // Creando un FOLIO de 6 caracteres
        // tomados al azar DE LA VARIABLE DICTIONARY
        for(var i = 0; i < 6; i++){
            $scope.newActa.folio  += dictionary.charAt(
                Math.floor(Math.random() * dictionary.length));
        }

        // console.log($scope.newActa.folio)
    }

    $scope.anio = (new Date()).getFullYear()+1
    $scope.mes = (new Date()).getMonth()
    $scope.newActa.fecha = new Date()
  
    // $scope.day='2018-01-01'; 
    // console.log($scope.anio)
    // console.log($scope.day)
   
   
   
    $scope.getActa = function () {

    $http.get("/datosActa")
        .success((data) => {
            $scope.actas = data[0].actas;
            $scope.tesis = data[0].tesis;
            $scope.unidad = data[0].unidad;
            // console.log(JSON.stringify(data))
            // console.log("---------------")
            // console.log(JSON.stringify(data[0].actas))
            // console.log()
            // console.log($scope.actas.length)
        })
        .error((error) => {
            console.log('Error: ' + error);
        })
        .then($scope.configPages = function () {
            $scope.pages = [];
            $scope.pages.length = 0;
            $scope.currentPage=0;
            console.log($scope.actas.length)
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
                    fin = Math.ceil($scope.actas.length / $scope.pageSize);
                    $scope.buscar2="";
                    // console.log(fin)
                }
                // if (Math.ceil($scope.actas.length / $scope.pageSize) > 10){
                //     console.log($scope.actas.length)
                    
                    
                // }   
                // else
                //     fin = Math.ceil($scope.actas.length / $scope.pageSize);
            } else {
                if (ini >= Math.ceil($scope.actas.length / $scope.pageSize) - 10) {
                    ini = Math.ceil($scope.actas.length / $scope.pageSize) - 10;
                    fin = Math.ceil($scope.actas.length / $scope.pageSize);
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
    $scope.saveActa = function () {
     
        $scope.newActa={
            idtesis: $scope.newActa.tesis.idtesis,
            folio: $scope.newActa.folio ,
            unidad: $scope.newActa.unidad.idunidad ,
            fecha: $scope.newActa.fecha||'',
            libro: $scope.newActa.libro ||''

        }
        console.log("-->")
        console.log(JSON.stringify($scope.newActa));
       
        // $http.post('/insertPersona', $scope.newActa)
        //     .success((data) => {
                
        //         $scope.newActa = data;
        //         // console.log(data);
        //         $scope.newActa = {};
        //         $scope.alertMassege = "Nuevo Item Agregado!!";
        //         $scope.getPersona();
        //     })
        //     .error((error) => {
        //         console.log('Error: ' + error);
        //         $scope.alertMassege = "ERROR!!";
        //     });
        // $scope.alertMassege = "";    
        
    };
    $scope.paginas = [10, 20, 50, 100];
    $scope.informa = function () {
        $scope.pageSize = $scope.pageSize;
        // if($scope.pageSize =="Todo")
        //     $scope.pageSize =   $scope.actas.length;
        // else
        //     $scope.pageSize = $scope.pageSize;

    }
    $scope.selectActa = function (acta) {
        // console.log(acta);
        $scope.clickedActa = acta;

    };
   
});

app.filter('startFromGrid', function () {
    return function (input, start) {
        if (!input || !input.length) { return; }
        start = +start;
        return input.slice(start);
    }
});
