$('.alert').hide();
 var name1="";
var myApp= angular.module("myModule",[]);
myApp.controller("myController", function($scope){

    var employees = [
        { 'name': 'Nunaram', 'dob': new Date("Oct 15, 2001"), 'email': 'nuna@gmail.com', 'gender': 'Male', 'position': 'Web Developer', 'salary': 50000, 'photo': 'http://musiklemon.com/admin/upload/bigthumb/559bdc0572c78.jpg', 'quote': 'I like the term "misunderstood". But I am a bit of a bad boy.' },
        { 'name': 'Peter', 'dob': new Date("Nov 16, 2001"), 'email': 'peter@gmail.com', 'gender': 'Male', 'position': 'Marketing Manager', 'salary': 50050, 'photo': 'https://img2.lsistatic.com/img/artists/p5rlm/thumb_76894624.jpg', 'quote': 'Gucci Gang, Gucci Gang, Gucci Gang, spend 10 racks on a new chain.' },
        { 'name': 'Nistha', 'dob': new Date("Dec 17, 2001"), 'email': 'Nistha@gmail.com', 'gender': 'Female', 'position': 'HR Manager', 'salary': 50600, 'photo': 'https://yt3.ggpht.com/-MMpZ-Xa8YOo/AAAAAAAAAAI/AAAAAAAAAAA/JQFGBXpmgeA/s100-mo-c-c0xffffffff-rj-k-no/photo.jpg', 'quote': 'I never dreamed about success. I worked for it always. ' },
        { 'name': 'Tamanna', 'dob': new Date("Dec 18, 2005"), 'email': 'tamanna@gmail.com', 'gender': 'Female', 'position': 'Web & Graphic Designer', 'salary': 50800, 'photo': 'http://www.filmofilia.com/wp-content/uploads/2010/04/Selena-Gomez-100x100.jpg', 'quote': 'Happiness and confidence are the prettiest things you can wear.' }
      ];
    
      $scope.employees = employees;
      $scope.sortCol = "name";
    
    
      $scope.addEmployee = function () {
        $scope.employees.push({ 'name': $scope.name, 'dob': new Date($scope.dob), 'email': $scope.email, 'gender': $scope.gender, 'salary': $scope.salary, 'photo': $scope.photo, 'quote': $scope.quote });
    
        $('#addModal').modal('hide');
        $('#noti-box').prepend('<div class="alert alert-success alert-dismissible fade show" role="alert"><strong>' + $scope.name + ' added successfully!</strong><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span>  </button></div>');
    
        $scope.name = '';
        $scope.dob = '';
        $scope.email = '';
        $scope.gender = '';
        $scope.salary = '';
        $scope.photo = '';
        $scope.quote = '';
      }
      $scope.getIndex = function (name) {
        var index = -1;
        var comArr = eval($scope.employees);
        for (var i = 0; i < comArr.length; i++) {
          if (comArr[i].name === name) {
            index = i;
            break;
          }
        }
        if (index === -1) {
          alert("Something gone wrong");
        }
        return index;
      }
      $scope.viewDetails = function (name) {
        var index = $scope.getIndex(name);
        $scope.name3 = $scope.employees[index].name;
        $scope.dob3 = new Date($scope.employees[index].dob);
        $scope.email3 = $scope.employees[index].email;
        $scope.gender3 = $scope.employees[index].gender;
        $scope.position3 = $scope.employees[index].position;
        $scope.salary3 = $scope.employees[index].salary;
        $scope.photo3 = $scope.employees[index].photo;
        $scope.quote3 = $scope.employees[index].quote;
      }
      $scope.fetchDetails = function (name) {
        var index = $scope.getIndex(name);
        $scope.name2 = $scope.employees[index].name;
        $scope.dob2 = new Date($scope.employees[index].dob);
        $scope.email2 = $scope.employees[index].email;
        $scope.gender2 = $scope.employees[index].gender;
        $scope.position2 = $scope.employees[index].position;
        $scope.salary2 = $scope.employees[index].salary;
        $scope.photo2 = $scope.employees[index].photo;
        $scope.quote2 = $scope.employees[index].quote;
        name1 = $scope.employees[index].name;
      }
    
      $scope.updateEmployee = function () {
    
        var index = $scope.getIndex(name1);
        $scope.employees[index].name = $scope.name2;
        $scope.employees[index].dob = new Date($scope.dob2);
        $scope.employees[index].email = $scope.email2;
        $scope.employees[index].gender = $scope.gender2;
        $scope.employees[index].position = $scope.position2;
        $scope.employees[index].salary = $scope.salary2;
        $scope.employees[index].photo = $scope.photo2;
        $scope.employees[index].quote = $scope.quote2;
        $('#editModal').modal('hide');
        $('#noti-box').prepend('<div class="alert alert-success alert-dismissible fade show" role="alert"><strong>' + $scope.name2 + ' updated successfully!</strong><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span>  </button></div>');
      }
      $scope.delEmployee = function (name) {
        if (confirm("Are you sure you want to delete " + name + "?")) {
          var index = $scope.getIndex(name);
          $scope.employees.splice(index, 1);
          $('#noti-box').prepend('<div class="alert alert-success alert-dismissible fade show" role="alert"><strong>' + name + ' deleted successfully!</strong><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span>  </button></div>');
        }
      }
    })