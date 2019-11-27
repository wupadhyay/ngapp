
angular.module('Services')
		.factory(
				'NotificationService',
				[
						'$http',
						function($http) {
							var service = {};

							service.saveNotification = function(
									notificationData, callback) {
								$http.post('ycc/notification/create',
										notificationData)
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

							service.searchNotificationForAllData = function(
									notificationData, callback) {
								$http.post('ycc/notification/searchForAllData',
										notificationData)
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
							
							service.searchNotification = function(
									notificationData, callback) {
								$http.post('ycc/notification/search',
										notificationData)
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

							service.editNotification = function(
									notificationData, callback) {
								$http.post('ycc/notification/edit',
										notificationData)
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

							service.downloadAttachment = function(
									notificationData, callback) {
								$http.post('ycc/notification/download',
										notificationData)
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
