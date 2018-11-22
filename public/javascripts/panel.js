// var contentBoxApp = angular.module('contentBoxApp', []);
// var gridCtrl = contentBoxApp.controller('GridCtrl', function ($scope) {
//     var regex;
//     $scope.escapeRegExp = function (string) {
//         return string.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
//     };
//     $scope.gridItems = [
//         {
//             img: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/6234/QrXgXMhCSouyhU7idq7g_IMG_8402.jpg',
//             headerText: 'Fireworks on the 4th',
//             blurbText: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil voluptatibus aliquam asperiores, cum distinctio aliquid recusandae velit beatae. Reprehenderit in eum, expedita, alias explicabo iure amet. Assumenda consequuntur vitae fugit.'
//         },
//         {
//             img: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/6234/dandelion.jpg',
//             headerText: 'Dandelion',
//             blurbText: 'cliff Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae assumenda facilis qui minus, consequuntur reiciendis atque fugiat ullam id, placeat nam quas, voluptates ipsum velit voluptatum culpa numquam saepe quos!'
//         },
//         {
//             img: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/6234/C3EWdWzT8imxs0fKeKoC_blackforrest.jpg',
//             headerText: 'Cabin in the Woods',
//             blurbText: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veniam vero cum vitae laboriosam nemo quaerat, sapiente harum reiciendis voluptas itaque incidunt molestias, fugiat asperiores dolores officiis architecto nihil assumenda. Fugiat!'
//         },
//         {
//             img: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/6234/unsplash_522b9cc0386f1_1.jpg',
//             headerText: 'Lazy Sunday',
//             blurbText: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit, ex minima, fugiat itaque error voluptates inventore sunt sequi possimus tempore odit debitis sint. Repudiandae quia esse totam eum blanditiis sunt?'
//         },
//         {
//             img: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/6234/MIbCzcvxQdahamZSNQ26_12082014-IMG_3526.jpg',
//             headerText: 'Yogi',
//             blurbText: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque nisi magnam cum nam iusto fugiat suscipit tempora nostrum autem, quasi, nemo illo sunt vitae id consectetur. Culpa reprehenderit esse sapiente?'
//         },
//         {
//             img: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/6234/cA4aKEIPQrerBnp1yGHv_IMG_9534-3-2.jpg',
//             headerText: 'Antique Typewriter',
//             blurbText: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi, blanditiis autem, ex quidem hic unde dolorum deleniti tenetur repellat nesciunt delectus pariatur voluptate corrupti inventore iure, itaque, fuga natus doloribus.'
//         },
//         {
//             img: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/6234/unsplashed2-photo-1428604467652-115d9d71a7f1.jpeg',
//             headerText: 'The Sun is Setting',
//             blurbText: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Itaque et amet aspernatur ullam, accusamus cum. Minima obcaecati voluptate velit cupiditate error ut, suscipit saepe beatae eaque veniam. Maiores, reiciendis quo.'
//         },
//         {
//             img: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/6234/unsplashed2-photo-1422640805998-18a4dd89bec2.jpeg',
//             headerText: 'Staring at the Stars',
//             blurbText: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit ducimus recusandae deleniti nobis unde dolor minus ut corporis saepe tempora architecto, possimus! Obcaecati odit nam vero ipsum odio vel iste.'
//         },
//         {
//             img: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/6234/unsplashed2-photo-IPEivX6xSBaiYOukY88V_DSC06462_tonemapped.jpg',
//             headerText: 'On the Road Again',
//             blurbText: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Unde, laboriosam impedit expedita alias quod repellendus reiciendis, officiis ullam iste delectus perferendis odio officia, commodi nihil voluptas aliquam. Enim, minus, unde!'
//         },
//         {
//             img: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/6234/unsplashed2-photo-1428591501234-1ffcb0d6871f.jpeg',
//             headerText: 'Just Me, Myself, and I',
//             blurbText: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Mollitia quidem alias libero vel sunt quod non, aspernatur rerum nisi porro corrupti minus unde hic nemo labore veniam! Ipsa, nam, quas!'
//         },
//         {
//             img: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/6234/unsplashed2-photo-1427348693976-99e4aca06bb9.jpeg',
//             headerText: 'Early Morning Hike',
//             blurbText: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quam, sequi, cumque temporibus, mollitia obcaecati earum provident labore adipisci repellendus fugiat repellat quas doloribus incidunt ipsum. Tempore delectus quas illum ex!'
//         },
//         {
//             img: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/6234/unsplashed2-photo-1414912925664-0c502cc25dde.jpeg',
//             headerText: 'Getting Away for the Weekend',
//             blurbText: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Temporibus voluptate nam provident, nulla recusandae maxime fugit praesentium blanditiis sunt, veniam quasi, mollitia possimus consequuntur nemo qui repellat adipisci accusamus ullam.'
//         },
//         {
//             img: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/6234/unsplashed2-photo-1428342319217-5fdaf6d7898e.jpeg',
//             headerText: 'The Bridge',
//             blurbText: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit ducimus recusandae deleniti nobis unde dolor minus ut corporis saepe tempora architecto, possimus! Obcaecati odit nam vero ipsum odio vel iste.'
//         },
//         {
//             img: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/6234/unsplashed2-photo-1423483641154-5411ec9c0ddf.jpeg',
//             headerText: 'Visit to the Vineyard',
//             blurbText: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit ducimus recusandae deleniti nobis unde dolor minus ut corporis saepe tempora architecto, possimus! Obcaecati odit nam vero ipsum odio vel iste.'
//         }
//     ];
//     $scope.search = '';
//     $scope.$watch('search', function (value) {
//         regex = new RegExp('\\b' + $scope.escapeRegExp(value), 'i');
//     });
//     $scope.filterBySearch = function (gridItem) {
//         if (!$scope.search) return true;
//         return regex.test(gridItem.headerText + " " + gridItem.blurbText);
//     };
//     $scope.toggleBlurb = function ($event) {
//         console.log($event);
//     };
// });


var app = angular.module('panelApp', []);
app.controller('panelController', function ($scope, $http) {
   
        var pathname = window.location.pathname;
        // console.log(pathname)
        // console.log(`${pathname}/data`)
        //paginación 
        $scope.currentPage = 0;
        $scope.pageSize = 10;
        $scope.pages = [];
        $scope.sortName = 'idtesis';
        $scope.sortReverse = false;
        $scope.buscar = "";
    
        //entidad
        $scope.datos = [];
        $scope.generos = [];
        $scope.departamentos= [];
        $scope.grado= [];
        $scope.genero= [];
        $scope.new = {};
        $scope.return= {};
        $scope.new2 = {};
        $scope.new.codirector ='';
        $scope.new.codirector2 ='';
        $scope.new.codirector3='';
        $scope.new.codirector4 ='';
        // $scope.new.esexterno =0;
        $scope.clicked3={}
       
        $scope.clicked = {};
        $scope.alertMassege = "";
        $scope.alertMassege2 = "";
        
        // $scope.clicked.esexterno=0;
        
        $scope.new.mes = (new Date()).getMonth()+1
   
        $scope.new.anio = (new Date()).getFullYear()
    
        $scope.fecha=new Date();


        $scope.paginas = [10, 20, 50, 100];
        $scope.sizePag = function () {
            $scope.pageSize = $scope.pageSize;
    
        };
    
        $scope.get = function () {
            $scope.datos.length =99;
            $http.get(`${pathname}/data`)
                .success((data) => {
                    // $scope.datos = data
                $scope.datos = data[0].tesis;
                $scope.alumnos = data[0].alumno;
                $scope.grados = data[0].grado;
                $scope.departamentos = data[0].departamento;
                $scope.unidad = data[0].unidad;
                $scope.personas= data[0].persona;
                $scope.generos= data[0].genero;
                $scope.user= data[0].user
                    
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
            $scope.new.esexterno;
        };
        $scope.save = function () {
            $scope.new = {
                alumno: $scope.user.id,
                titulo: $scope.new.titulo ||'',
                resumen: $scope.new.resumen ||'',
                grado: $scope.new.grado||'',
                departamneto: $scope.new.departamento.iddepartamento||'',
                unidad: $scope.new.unidad||'',
                mes: $scope.new.mes||'',
                anio: $scope.new.anio||'',
                // director:$scope.new.director.idpersona,
                // codirector:$scope.new.codirector.idpersona,
                // codirector2:$scope.new.codirector2.idpersona,
                // codirector3:$scope.new.codirector3.idpersona,
                // codirector4:$scope.new.codirector4.idpersona,
                director:$scope.new.director.idpersona === undefined || '' ?  null  : $scope.new.director.idpersona,
                codirector:$scope.new.codirector.idpersona === undefined ||'' ?  null : $scope.new.codirector.idpersona,
                codirector2:$scope.new.codirector2.idpersona === undefined ||'' ?  null : $scope.new.codirector2.idpersona,
                codirector3:$scope.new.codirector3.idpersona === undefined ||'' ?  null  : $scope.new.codirector3.idpersona,
                codirector4:$scope.new.codirector4.idpersona === undefined ||'' ?  null  : $scope.new.codirector4.idpersona,
              
            };
            // console.log( $scope.new)
            // $scope.new= {};
            $http.post(`${pathname}/insert`, $scope.new)
                .success((data) => {
                    
                    $scope.new= data;
                    $scope.new= {};
                    $scope.alertMassege = "Nuevo Item Agregado!!";
                    $scope.get();
                    $scope.new.mes = (new Date()).getMonth()+1
   
                    $scope.new.anio = (new Date()).getFullYear()
                })
                .error((error) => {
                    console.log('Error: ' + error);
                    $scope.alertMassege = "ERROR!!";
                });
            $scope.alertMassege = "";    
        };
        $scope.add = function () {
            $scope.new2 = {
                nombre: $scope.new2.nombre ||'',
                nombre2: $scope.new2.nombre2 ||'',
                nombre3: $scope.new2.nombre3 ||'',
                apellido: $scope.new2.apellido ||'',
                apellido2: $scope.new2.apellido2 ||'',
                apellido3: $scope.new2.apellido3 ||'',
                grado: $scope.new2.grado.idgrado,
                genero: $scope.new2.genero.idgenero,
                departamento: $scope.new2.departamento.iddepartamento,
                esexterno: $scope.new.esexterno,
                institucion: $scope.new2.institucion ||'',
                puesto: $scope.new2.puesto ||''
            };
            console.log($scope.new2);
            // $scope.new.codirector="sientroooooooo"
            // $scope.new2={}
            $http.post(`${pathname}/add`, $scope.new2)
                .success((data) => {
                    console.log(JSON.stringify(data));
                    
                    // $scope.personas= data[0].persona;
                    $scope.return= data;
                    $scope.new.codirector=JSON.stringify(data.idpersona);
                    $scope.clicked =data.idpersona
                    $scope.clicked2 =data.idpersona
                    $scope.clicked3.idpersona =data.idpersona;
                  
                    $scope.new2= {};
                    $scope.alertMassege2 = "Codirector Externo Agregado!!";
                    $scope.get();
                   
                })
                .error((error) => {
                    console.log('Error: ' + error);
                    $scope.alertMassege2 = "ERROR!!";
                });
            $scope.alertMassege2 = "";


        }
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
    
        };
    
    
    })
    
    app.filter('startFromGrid', function () {
        return function (input, start) {
            if (!input || !input.length) { return; }
            start = +start;
            return input.slice(start);
        }
    });
    