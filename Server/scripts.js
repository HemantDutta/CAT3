const app = angular.module('myApp', ["ngRoute"]);

app.controller('viewCtrl', ($scope, $http)=>{
   $http.get('http://localhost:3005/')
   .then((res)=>{
      $scope.data = res.data;
   })
})

app.controller('addCtrl', ($scope)=>{
   $scope.add = function() {
      const newEntry = `{"id":"${$scope.id}", "name":"${$scope.name}", "desg":"${$scope.desg}", "dept":"${$scope.dept}", "sal":"${$scope.sal}", "loc":"${$scope.loc}"}`;

      fetch('http://localhost:3005/add', {
         method: "POST",
         body: newEntry,
         headers: {'Content-Type': 'application/json; charset=UTF-8'}
      })
      .then(res => console.log(res))
      .catch(err => console.log(err));
   }
})

app.controller('delCtrl', ($scope, $http)=>{
   $http.get('http://localhost:3005/')
   .then((res)=>{
      $scope.datas = res.data;
   })

   $scope.delete = function() {
      const body = `{"id":${$scope.id['emp_id']}}`;

      fetch('http://localhost:3005/delete', {
         method: "POST",
         body: body,
         headers: {'Content-Type': 'application/json; charset=UTF-8'}
      })
      .then(res => console.log(res))
      .catch(err => console.log(err));
   }
})

app.controller('updCtrl', ($scope, $http)=>{
   $http.get('http://localhost:3005/')
   .then((res)=>{
      $scope.datas = res.data;
   })

   $scope.getID = function() {
      const selID = $scope.id;
      console.log(selID);
      $scope.name = selID['emp_name'];
      $scope.desg = selID['emp_desg'];
      $scope.dept = selID['emp_dept'];
      $scope.sal = selID['emp_salary'];
      $scope.loc = selID['emp_loc'];
   }

   $scope.update = function() {
      const newData = `{"id":"${$scope.id['emp_id']}", "name":"${$scope.name}", "desg":"${$scope.desg}", "dept":"${$scope.dept}", "sal":"${$scope.sal}", "loc":"${$scope.loc}"}`
      fetch('http://localhost:3005/update', {
         method: "POST",
         body: newData,
         headers: {'Content-Type': 'application/json; charset=UTF-8'}
      })
      .then(res => console.log(res))
      .catch(err => console.log(err));
   }

})


app.config(($routeProvider)=>{
   $routeProvider
   .when("/add", {
    templateUrl: "add.html"
   }) 
   .when("/", {
      templateUrl: "view.html"
   })
   .when("/update", {
      templateUrl: "update.html"
   })
   .when('/delete', {
      templateUrl: "delete.html"
   })
});