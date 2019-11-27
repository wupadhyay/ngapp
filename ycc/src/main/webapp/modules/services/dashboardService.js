
angular.module('Services')
		.factory(
				'DashboardService',
				[
						'$http',
						function($http) {
							var service = {};

							service.refreshLatencyStats = function(
									requestDetails, callback) {
								$http.post('ycc/cd/cobRefreshStats',
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

							service.searchFavicon = function(requestDetails,
									callback) {
								$http.post('ycc/sm/getSiteFavicon',
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
						} ]);
