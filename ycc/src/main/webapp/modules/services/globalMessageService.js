
angular.module('Services').factory(
		'GlobalMessageService',
		[
				'$http',
				function($http) {
					var service = {};

					service.searchGlobalMessages = function(request, callback) {
						$http.post('ycc/gm/searchGlobalMessage', request)
								.success(
										function(response, status, headers,
												config) {
											callback(response, status, headers,
													config);
										}).error(
										function(response, status, headers,
												config) {
											callback(response, status, headers,
													config);
										});
					};
					return service;
				} ]).factory('siteSpecificGlobalData', function() {
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
