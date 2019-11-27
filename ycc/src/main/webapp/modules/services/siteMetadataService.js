
angular.module('Services')
		.factory(
				'SiteMetadataService',
				[
						'$http',
						function($http) {
							var service = {};

							service.siteMetadataSearch = function(
									requestDetails, callback) {
								$http
										.post('ycc/sm/siteresults',
												requestDetails).success(
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
							service.getSiteDetail = function(requestDetails,
									callback) {
								$http.post('ycc/sm/siteViewDetails',
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
							return service;
						} ]).factory('siteDetailData', function() {
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
