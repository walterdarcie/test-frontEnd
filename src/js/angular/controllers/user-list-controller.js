angular.module("usersList").controller('userCtrl', function($scope, $http) {
    $http.get('../../data/users.json')
    .then(function(response) {
        $scope.users = response.data;
    });
});
