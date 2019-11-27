
angular.module("Services").factory('localStorageShare', function() {
	var service = {};
	return {
		setData : function(data) {
			service = data;
		},
		getData : function() {
			return service;
		}
	};
}).factory('localStorageCobrandShare', function() {
	var service = {};
	return {
		setData : function(data) {
			service = data;
		},
		getData : function() {
			return service;
		}
	}
}).factory('localStorageLabelShare', function() {
	var service = {};
	return {
		setData : function(data) {
			service = data;
		},
		getData : function() {
			return service;
		}
	}
}).factory('localStorageSiteSearchInputShare', function() {
	var service = {};
	return {
		setData : function(data) {
			service = data;
		},
		getData : function() {
			return service;
		}
	}
}).factory('localStoragePageActive', function() {
	var service = {};
	return {
		setData : function(data) {
			service = data;
		},
		getData : function() {
			return service;
		}
	}
});
