!function(){"use strict"}(),angular.module("usersList",["angularUtils.directives.dirPagination"]),angular.module("usersList").controller("userCtrl",function($scope,$http){$http.get("../../data/users.json").then(function(response){$scope.users=response.data})}),angular.module("usersList").filter("usersFilter",function(){return function(users,search){if(angular.isDefined(search)){var i,results=[],searchVal=search.toLowerCase();for(i=0;i<users.length;i++){var userName=users[i].name.toLowerCase(),userContact=users[i].contact.toLowerCase();(userName.indexOf(searchVal)>=0||userContact.indexOf(searchVal)>=0)&&results.push(users[i])}return results}return users}});