
angular.module('Services').factory('AclService', [ function() {
	var service = {};

	service.isAclEnabled = function(aclName) {
		return (aclList.indexOf(aclName) != -1) ? true : false;
	};

	return service
} ]);
