
angular.module("Path", []).constant("context", {});

angular.module("Directives", []);

angular.module('mock.users', []).factory('UserService', function() {
	var userService = {};

	userService.get = function() {
		return {
			id : 8888,
			name : "test user"
		}
	};

	// example stub method that returns a promise, e.g. if original method returned $http.get(...)
	userService.fetch = function() {
		var mockUser = {
			id : 8888,
			name : "test user"
		};
		return $q.when(mockUser);
	};

	// other stubbed methods

	return userService;
});
