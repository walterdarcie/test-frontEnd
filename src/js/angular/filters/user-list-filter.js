angular.module("usersList").filter('usersFilter', function() {
  return function(users, search) {
    if(angular.isDefined(search)) {
      var results = [];
      var i;
      var searchVal = search.toLowerCase();
      for(i = 0; i < users.length; i++){
        var userName = users[i].name.toLowerCase();
        var userContact = users[i].contact.toLowerCase();
        if(userName.indexOf(searchVal) >=0 || userContact.indexOf(searchVal) >=0){
          results.push(users[i]);
        }
      }
      return results;
    } else {
      return users;
    }
  };
});
