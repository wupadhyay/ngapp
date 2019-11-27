
angular.module('Services')
		.factory(
				'UserContactInfoService',
				[
						'$http',
						function($http) {
							var service = {};

							service.saveUserContactInfo = function(
									notificationData, callback) {
								$http.post('ycc/user/contactinfo/create',
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

							service.searchUserContactInfo = function(
									notificationData, callback) {
								$http.post('ycc/user/contactinfo/search',
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

							service.editUserContactInfo = function(
									notificationData, callback) {
								$http.post('ycc/user/contactinfo/edit',
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

							service.uploadFile = function(uploadFileData,
									callback) {
								$http.post('ycc/user/contactinfo/upload',
										uploadFileData)
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
							
							service.uploadCobMapping = function(uploadFileData,
									callback) {
								$http.post('ycc/user/contactinfo/uploadCobrand',
										uploadFileData)
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
							
							service.getFileHistory = function(uploadFileData,
									callback) {
								$http.post('ycc/user/contactinfo/fileHistory',
										uploadFileData)
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
							service.role = function(roleData, callback) {
								$http.post('ycc/user/contactinfo/role',
										roleData)
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
