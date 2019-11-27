'use strict';

angular.module('Services')
		.factory(
				'ApplicationService',
				[
						'$http',
						function($http) {
							var service = {};

							service.loggerService = function(requestDetails,
									callback) {
								$http.post('ycc/base/loggerService',
										requestDetails)
										.success(
												function(data, status, headers,
														config) {
													callback(data, status,
															headers, config);
												}).error(
												function(data, status, headers,
														config) {
													callback(data, status,
															headers, config);
												});
							};

							service.getLabels = function(requestDetails,
									callback) {
								$http.get('resources/appLabels.properties')
										.success(
												function(data, status, headers,
														config) {
													callback(data, status,
															headers, config);
												}).error(
												function(data, status, headers,
														config) {
													callback(data, status,
															headers, config);
												});
							};

							service.getTimeZones = function(requestDetails,
									callback) {
								$http.get('resources/timeZone.json')
										.success(
												function(data, status, headers,
														config) {
													callback(data, status,
															headers, config);
												}).error(
												function(data, status, headers,
														config) {
													callback(data, status,
															headers, config);
												});
							};

							return service;
						} ]);


angular.module("Services").factory('userTypes', [ '$http', function($http) {
	var promise;

	return {
		getUser : function() {
			if (!promise) {
				var cobrand = {
					cobrandId : cobrandIdentifier
				};
				var data = angular.copy(cobrand);
				promise = $http.post('ycc/base/userType', data);
			}
			return promise;
		}
	};
} ]);

angular.module("Services").service('cobrands', [ '$http', function($http) {
	var promise;

	return {
		getCobrand : function() {

			if (!promise) {
				var YSLrequestFields = {
					customerId : cobrandIdentifier
				};

				var data = angular.copy(YSLrequestFields);
				promise = $http.post('ycc/base/cobrands', data);
			}

			return promise;
		}
	};
} ]);

angular.module("Services").service('userInfo', [ '$http', function($http) {
	var promise;

	return {
		getUserInfo : function() {

			if (!promise) {

				var cobrand = {
					cobrandId : cobrandIdentifier
				};
				var data = angular.copy(cobrand);
				promise = $http.post('ycc/base/userInfo', data);

			}
			return promise;
		}
	};
} ]);

angular.module("Services").service(
		"prodflowFilter",
		[
				'$http',
				function($http) {
					var promise;
					return {

						getProdFilters : function() {

							if (!promise) {
								var YSLrequestFields = {
									customerId : cobrandIdentifier,
									environment : 'PROD'
								};

								var data = angular.copy(YSLrequestFields);
								promise = $http.post(
										'ycc/notification/cobfilters', data);
							}

							return promise;
						}
					};
				} ]);


angular.module("Services").service(
		"stageflowFilter",
		[
				'$http',
				function($http) {
					var promise;

					return {

						getStageFilters : function() {

							if (!promise) {
								var YSLrequestFields = {
									customerId : cobrandIdentifier,
									environment : 'STAGE'
								};

								var data = angular.copy(YSLrequestFields);
								promise = $http.post(
										'ycc/notification/cobfilters', data);
							}

							return promise;
						}
					};
				} ]);
