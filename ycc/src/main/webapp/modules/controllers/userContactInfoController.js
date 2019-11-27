angular
		.module('Controllers')
		.controller(
				'UserContactInfoController',
				[
						'$scope',
						'$controller',
						'UserContactInfoService',
						'PagerService',
						'ApplicationService',
						'$window','$q','$timeout',
						function($scope, $controller, userContactInfoService,
								PagerService, appService, $window,$q,$timeout) {
							angular.extend(this, $controller(
									'ApplicationController', {
										$scope : $scope
									}));

							$scope.showMain = function() {
								$('#container4').removeClass('ng-hide');
								;
							};

							// Table Sorting code
							$scope.setOrderProperty = function(propertyName) {

								if ($scope.orderProperty === propertyName) {
									$scope.orderProperty = '-' + propertyName;
									$scope.reverseSort = !$scope.reverseSort;

								} else if ($scope.orderProperty === '-'
										+ propertyName) {
									$scope.orderProperty = propertyName;
									$scope.reverseSort = !$scope.reverseSort;

								} else {
									$scope.orderProperty = propertyName;
									$scope.reverseSort = !$scope.reverseSort;
								}
							};

							// TimeZone mapper
							$scope.getTimeZoneVal = function(passedkey) {
								var mappedName;
								angular.forEach($scope.timezonelist, function(
										val, key) {
									var currentId = val.Id;
									var currentName = val.name;
									if (currentId == passedkey) {
										mappedName = currentName;
									}

								});
								return mappedName;
							}
							$scope.getTimeZoneValues = function(value, callback) {

								var data;
								appService.getTimeZones(data, function(data,
										status, headers, config) {
									try {
										$scope.timezonelist = data.keys;

										callback();
									} catch (e) {

										var exception = {
											exceptionStackTrace : e.stack
													.toString()
										};
										var data = angular.copy(exception);
										appService.loggerService(data,
												function(data, status, headers,
														config) {
												})
									}
								})
							};

							$scope.tagHandler = function(tag) {
								return null;
							}

							$scope.createUserBulk = function(flag) {

								if (flag == true) {
									angular.element("#formDoc").find(
											"input[type='file']").val(null);
								} else {
									$scope.userUploadMsg = null;
									$scope.userUploadErrorMsg = null;
								}
								var filename = $("#fileUser").val();
								if (/^\s*$/.test(filename)) {
									$(".file-upload").removeClass('active');
								} else {
									$(".file-upload").addClass('active');
								}
							};

							$scope.initUserManagement = function() {
								$scope.initUser = false;
								$scope
										.getLabels(
												"",
												function() {
													$scope
															.getUserType(
																	"",
																	function() {
																		if ($scope.homeCobrand == true) {
																			$scope
																					.getProdFilters(
																							"",
																							function() {
																								$scope.prodCobrandList = $scope
																										.mapArr($scope.prodCustomersInfo.cobrandInfo);
																							});

																			$scope
																					.getStageFilters(
																							"",
																							function() {
																								$scope.stagecobrandList = $scope
																										.mapArr($scope.stageCustomerInfo.cobrandInfo);
																							});

																		}

																		$scope
																				.getTimeZoneValues(
																						"",
																						function() {
																							$scope
																									.searchUsers();

																						});
																		$scope
																				.getRoles();
																		$scope
																				.getFileHistory();

																	});
													highlight("contactManagement");
													var sFooter = document.getElementById('include-footer');
													sFooter.style.position = 'relative';

												});
							};

							// Function to merge cobrand and subbrand list for
							// drop down
							$scope.mapArr = function(inputList) {
								var master_list = [];
								if (inputList != undefined) {
									for (i = 0; i < inputList.length; i++) {
										var a = {
											name : inputList[i].name,
											cobrandId : inputList[i].cobrandId,
											 display: inputList[i].name+'('+inputList[i].cobrandId+')'
										}
										master_list.push(a);
										if (inputList[i].subBrands != undefined)
											for (j = 0; j < inputList[i].subBrands.length; j++) {
												var a = {
													name : inputList[i].subBrands[j].name,
													cobrandId : inputList[i].subBrands[j].cobrandId,
													display: inputList[i].subBrands[j].name+'('+inputList[i].subBrands[j].cobrandId+')'
												}
												master_list.push(a);
											}

									}
								}

								return master_list;
							};
							
							$scope.getMatches = function(searchText) {
	          				  	var deferred = $q.defer();
	            					$timeout(function() {
	               									var states = $scope.itemsList.filter(function(state) {
														   var cobId =state.cobrandId.toString();
														   var cobName= state.name;
															return (cobName.toUpperCase().indexOf(searchText.toUpperCase()) !== -1 
															|| cobId.indexOf(searchText.toString()) !== -1);
	                								});
	                								deferred.resolve(states);
	            									}, 1000);

	          						  return deferred.promise;
	       							 };
							$scope.checkIfEnterKeyWasPressed = function($event,
									formSearch) {
								var keyCode = $event.which || $event.keyCode;
								if (keyCode === 13) {
									this.searchUsers(formSearch, true); // passing
																		// parameter-true
																		// for
																		// quick
																		// serach..
								} else
									(keyCode === 27) // Adding this to escape
														// search box on click
								{
									$scope.advSearchBox = false;
								}
							};

							$scope.advSearchBox = false;
							$scope.advSearch = function() {
								$window.onclick = null;
								$scope.advSearchBox = !$scope.advSearchBox;

								if ($scope.advSearchBox) {
									$window.onclick = function(event) {
										if (event.target
												.closest("#advSearchBox"))
											return;
										 if (event.target
													.closest(".md-autocomplete-suggestions-container"))
												return;
										$scope.advSearchBox = false;
										$scope.$apply();
									};
								}

							}

							$scope.isycc = false;
							$scope.IsYccChecked = function() {
								$scope.isycc = !$scope.isycc;
							}
							$scope.reset = function(usercontactform) {

								usercontactform.$setPristine();
								usercontactform.$submitted = false;
								usercontactform.$valid = true;
								$scope.formData = {};
								$scope.formData.rolesModelCreate = [];

							};
							$scope.clearErrorMessages = function() {
								$scope.createUserInfoMessage = null;
								$scope.createUserInfoErrorMessage = null;
							}
							$scope.salutationDropDown = [ {
								id : "1",
								name : "Mr"
							}, {
								id : "2",
								name : "Mrs",
							}, {
								id : "3",
								name : "Ms"
							} ];

							$scope.rolesDropDown = [];
							$scope.getRoles = function() {
								var roleCreiteria = {
									customerId : $scope.customerId
								};

								userContactInfoService.role(angular
										.copy(roleCreiteria), function(data,
										status, headers, config) {
									try {
										if (data == null || data == ""
												|| data == "{}") {
											return;
										}
										var response = JSON.parse(JSON
												.stringify(data));
										$scope.rolesDropDown = JSON
												.parse(response).roles;
									} catch (e) {
										var exception = {
											exceptionStackTrace : e.stack
													.toString()
										};
										var data = angular.copy(exception);
										appService.loggerService(data,
												function(data, status, headers,
														config) {
												})
									}
								});
							}

							$scope.environmentsDropDown = [ {
								id : "1",
								name : "Production"
							}, {
								id : "2",
								name : "Stage"
							} ];

							$scope.userTypeDropDowm = [ {
								id : "1",
								name : "All"
							}, {
								id : "2",
								name : "ycc users"
							}, {
								id : "3",
								name : "non-ycc users"
							} ];

							$scope.changeEnvironment = function(field, formData) {
								formData.cobrandSelected = undefined;
								formData.cobrandSelectedSearch = undefined;
								if (field == 'Production') {
									$scope.itemsList = $scope.prodCobrandList;

								} else if (field == 'Stage') {
									$scope.itemsList = $scope.stagecobrandList;
								} else {
									formData.environment = undefined;
									formData.selectedEnv = undefined;
								}

							};

							$scope.formData = {};
							$scope.rolesModel = [];
							$scope.formSearch = {};
							$scope.formData.rolesModelCreate = [];
							$scope.formSearch.rolesModelSearch = [];
							$scope.editRoles = [];

							$scope.rolessettings = {
								scrollableHeight : '200px',
								scrollable : true,
								enableSearch : true,
								displayProp : 'name',
								idProp : 'roleId',
								externalIdProp : ''

							};

							$scope.newField = {};
							$scope.editing = false;

							$scope.editCheckUserInfo = function(field) {
								$scope.editing = true;
								$scope.userContactInfoEditSucessMsg = null;
								$scope.userContactInfoEditErrorMsg = null;
								$scope.clearErrorMessages();
								$scope.newField = angular.copy(field);
								$scope.editRoles = [];
								var tempRoleModel = [];
								var index = $scope.users.indexOf(field);
								for (var i = 0; i < $scope.users[index].roles.length; i++) {
									var roleName = $scope.users[index].roles[i];
									for (var j = 0; j < $scope.rolesDropDown.length; j++) {
										var obj = $scope.rolesDropDown[j];
										if (obj.name == roleName) {
											var roleObj = {
												roleId : obj.roleId,
												name : roleName
											};
											tempRoleModel.push(roleObj);
											break;
										}
									}
								}
								$scope.rolesModel = tempRoleModel;
							};

							function compare(array1, array2) {
								array1.sort();
								array2.sort();
								for (var i = 0; i < array1.length; i++) {
									if (array1[i] !== array2[i])
										return false;
								}
								return true;
							}
							
							$scope.createCobrandMapping = function(flag){

								if (flag == true) {
									angular.element("#formCobMapping").find(
											"input[type='file']").val(null);
								} else {
									$scope.cobUploadMsg = null;
									$scope.cobUploadErrorMsg = null;
								}
								var filename = $("#fileCobrandMapping").val();
								if (/^\s*$/.test(filename)) {
									$(".file-cobMapping").removeClass('active');
								} else {
									$(".file-cobMapping").addClass('active');
								}
							}
							
							

							// Excel Upload
							$scope.userUpload = {};
							$scope.cobUpload= {};
							$scope.uploadCobMapping = function(fileObj){
								if (fileObj == undefined) {
									$scope.uploadErr = true;
									return;
								}
								var request = {

									name : fileObj.filename,
									content : fileObj.base64,
									fileSize : fileObj.filesize,
									type : fileObj.filetype,
								};
								$scope.upload = '{"attachment":'
										+ JSON.stringify(request) + '}'
								var uploadId = {
									customerId : $scope.customerId,
									userContactInfoObj : $scope.upload
								}
								var data = angular.copy(uploadId);
								userContactInfoService.uploadCobMapping(
												data,
												function(data, status, headers,
														config) {


													try {
														if (data == null
																|| data == ""
																|| data == "{}") {
															$scope.cobUploadErrorMsg = $scope.staticLabels.NoDatafound;
															$scope.cobUpload.uploadMapping = undefined;
															return;
														} else if (data
																.indexOf($scope.staticLabels.error_code) != -1) {
															var errResponse = JSON
																	.parse(data);
															if (errResponse.errorCode == $scope.staticLabels.invalid_session_error_code) {
																$scope.cobUploadErrorMsg = $scope.staticLabels.invalid_session;
																$scope.cobUpload.uploadMapping = undefined;
																return;
															}
															$scope.cobUploadErrorMsg = errResponse.errorMessage;
															$scope.cobUpload.uploadMapping = undefined;
															return;
														}

														fileObj = null;
														$scope.uploadMapping = undefined;
														var response = JSON
																.parse(data);
														$scope.cobUploadMsg = response.attachment.message;
														
														$scope.createCobrandMapping(true);
														$scope.cobUpload.uploadMapping = undefined;
													} catch (e) {
														$scope.cobUpload.uploadMapping = undefined;
														var exception = {
															exceptionStackTrace : e.stack
																	.toString()
														};
														var data = angular
																.copy(exception);
														appService
																.loggerService(
																		data,
																		function(
																				data,
																				status,
																				headers,
																				config) {
																		})
													}
												
												});

							}
							
							$scope.uploadFile = function(fileObj) {
								if (fileObj == undefined) {
									$scope.uploadErr = true;
									return;
								}
								var request = {

									name : fileObj.filename,
									content : fileObj.base64,
									fileSize : fileObj.filesize,
									type : fileObj.filetype,
								};
								$scope.upload = '{"attachment":'
										+ JSON.stringify(request) + '}'
								var uploadId = {
									customerId : $scope.customerId,
									userContactInfoObj : $scope.upload
								}
								var data = angular.copy(uploadId);

								userContactInfoService
										.uploadFile(
												data,
												function(data, status, headers,
														config) {

													try {
														if (data == null
																|| data == ""
																|| data == "{}") {
															$scope.userUploadErrorMsg = $scope.staticLabels.NoDatafound;
															$scope.userUpload.uploadUser = undefined;
															return;
														} else if (data
																.indexOf($scope.staticLabels.error_code) != -1) {
															var errResponse = JSON
																	.parse(data);
															if (errResponse.errorCode == $scope.staticLabels.invalid_session_error_code) {
																$scope.userUploadErrorMsg = $scope.staticLabels.invalid_session;
																$scope.userUpload.uploadUser = undefined;
																return;
															}
															$scope.userUploadErrorMsg = errResponse.errorMessage;
															$scope.userUpload.uploadUser = undefined;
															return;
														}

														fileObj = null;
														$scope.uploadUser = undefined;
														var response = JSON
																.parse(data);
														$scope.userUploadMsg = response.attachment.message;
														$scope.searchUsers();
														$scope.getFileHistory();
														$scope
																.createUserBulk(true);
														$scope.userUpload.uploadUser = undefined;
													} catch (e) {
														$scope.userUpload.uploadUser = undefined;
														var exception = {
															exceptionStackTrace : e.stack
																	.toString()
														};
														var data = angular
																.copy(exception);
														appService
																.loggerService(
																		data,
																		function(
																				data,
																				status,
																				headers,
																				config) {
																		})
													}
												});
							};

							$scope.userContactInfoEditErrorMsg = null;
							$scope.editUserInfo = function(data) {
								$scope.createUserInfoMessage = null;

								angular.forEach($scope.rolesModel, function(
										val, key) {

									$scope.editRoles.push(val.name);
								});
								$scope.previousValue = $scope.newField;
								var index = $scope.users.indexOf(data);
								$scope.newValue = $scope.users[index];
								$scope.edittedUserInfo = {};
								if ($scope.previousValue.email != $scope.newValue.email) {
									$scope.edittedUserInfo.email = $scope.newValue.email;
								}
								if ($scope.previousValue.phone != $scope.newValue.phone) {
									$scope.edittedUserInfo.phone = $scope.newValue.phone;
								}
								if ($scope.previousValue.timezone.name != $scope.newValue.timezone.name) {
									$scope.edittedUserInfo.timezone = $scope.newValue.timezone.Id;
								}
								if ($scope.editRoles.length > 0) {
									if ($scope.previousValue.roles.length != $scope.editRoles.length) {
										$scope.edittedUserInfo.roles = $scope.editRoles;
										$scope.users[index].roles = $scope.editRoles;
									} else if (!compare(
											$scope.previousValue.roles,
											$scope.editRoles)) {
										$scope.edittedUserInfo.roles = $scope.editRoles;
										$scope.users[index].roles = $scope.editRoles;
									}
								}else{
									$scope.edittedUserInfo.roles = $scope.editRoles;
								}

								if ($scope.edittedUserInfo == {}) {
									return;
								}

								$scope
										.validateEditUserContactInfoForm(
												$scope.edittedUserInfo,
												function() {

													if (!$scope.validateEditUserContactInfo) {
														$scope.userContactInfoEditErrorMsg = "User "
																+ $scope.users[index].firstName
																+ " "
																+ $scope.users[index].lastName
																+ " "
																+ "has failed  to update due to "
																+ $scope.editValidationMsg;
														$scope.users[index] = $scope.previousValue;
														return;
													}
													var userContactInfoEditCriteria = {
														customerId : $scope.customerId,
														userContactInfoObj : '{"userContactInfo":'
																+ JSON
																		.stringify($scope.edittedUserInfo)
																+ '}',
														userContactInfoId : $scope.newField._id
													};
													$scope.userContactInfoEditErrorMsg = null;
													$scope.msg = null;
													userContactInfoService
															.editUserContactInfo(
																	angular
																			.copy(userContactInfoEditCriteria),
																	function(
																			data,
																			status,
																			headers,
																			config) {
																		try {
																			$scope.userContactInfoEditErrorMsg = null;
																			$scope
																					.clearErrorMessages();
																			$scope.msg = null;

																			if (data == null
																					|| data == ""
																					|| data == "{}") {
																				$scope.userContactInfoEditErrorMsg = $scope.staticLabels.NoDatafound;
																				return;
																			} else if (data
																					.indexOf($scope.staticLabels.error_code) != -1) {
																				var errResponse = JSON
																						.parse(data);
																				if (errResponse.errorCode == $scope.staticLabels.invalid_session_error_code) {
																					$scope.userContactInfoEditErrorMsg = $scope.staticLabels.invalid_session;
																					return;
																				}
																				$scope.userContactInfoEditErrorMsg = "User "
																						+ $scope.users[index].firstName
																						+ " has failed to update:"
																						+ errResponse.errorMessage;
																				$scope.users[index] = $scope.previousValue;
																				return;
																			}
																			;

																			var response = JSON
																					.parse(data);
																			$scope.userContactInfoEditSucessMsg = "User "
																					+ $scope.users[index].firstName
																					+ " "
																					+ $scope.users[index].lastName
																					+ " has updated successfully";
																		} catch (e) {

																			$scope.userContactInfoEditErrorMsg = "User  "
																					+ $scope.users[index].firstName
																					+ " has failed to update";

																			$scope.users[index] = $scope.previousValue;
																			var exception = {
																				exceptionStackTrace : e.stack
																						.toString()
																			};
																			var data = angular
																					.copy(exception);
																			appService
																					.loggerService(
																							data,
																							function(
																									data,
																									status,
																									headers,
																									config) {
																							})
																		}
																	});
												});
								$scope.editing = false;
							};
							$scope.selectedEnvironment = "";
							$scope.validateEditUserContactInfo = true;

							$scope.validateEditUserContactInfoForm = function(
									form, callback) {
								$scope.validateEditUserContactInfo = true;
								try {

									if (form.email != undefined) {
										var re = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
										if (!re.test(form.email)
												|| form.email == "") {
											$scope.validateEditUserContactInfo = false;
											$scope.editValidationMsg = "invalid Email";
										}
									}

									if (form.phone != undefined) {
										var re = /^[0-9/(/)-]*$/;
										if (!re.test(form.phone)
												|| form.phone.length < 6
												|| form.phone.length > 15) {
											$scope.validateEditUserContactInfo = false;
											$scope.editValidationMsg = "invalid Phone";
										}
									}

									if (form.roles != undefined
											&& form.roles.length < 1) {
										$scope.validateEditUserContactInfo = false;
										$scope.editValidationMsg = "invalid Roles";
									}

									callback();
								} catch (e) {
									$scope.validateEditUserContactInfo = false;
									callback();

								}
							}

							$scope.validationCreateformForUserConfactInfo = function() {
								try {
									$scope.validate = true;
									if ($scope.validate) {
										$scope.saveUserInfo();
									} else {
										return;
									}
								} catch (e) {
									$scope.validate = false;
								}
							}

							$scope.userContactInfo = {};
							$scope.exportButtonText="Export";
							$scope.createUserInfoMessage = null;
							$scope.saveUserInfo = function(formData,
									usercontactform) {
								$scope.createUserInfoErrorMessage = null;
								$scope.createUserInfoMessage = null;
								$scope.userContactInfoEditSucessMsg = null;
								$scope.userContactInfoEditErrorMsg = null;
								var roleList = [];
								if (usercontactform.$valid) {

									$scope.validateCreateUserContactInfo = true;
									try {

										if (formData.environment == undefined) {
											$scope.validateCreateUserContactInfoEnv = false;
											$scope.validateCreateUserContactInfo = false;
										}

										else
											$scope.validateCreateUserContactInfoEnv = true;

										if (formData.cobrandSelected == undefined) {
											$scope.validateCreateUserContactInfoCobrand = false;
											$scope.validateCreateUserContactInfo = false;
										}

										else
											$scope.validateCreateUserContactInfoCobrand = true;

										if (formData.timeZone == undefined) {
											$scope.validateCreateUserContactInfoTimeZone = false;
											$scope.validateCreateUserContactInfo = false;
										}

										else
											$scope.validateCreateUserContactInfoTimeZone = true;

										angular.forEach(
												formData.rolesModelCreate,
												function(val, key) {
													roleList.push(val.name);
												});
										if (formData.rolesModelCreate == []) {
											$scope.validateCreateUserContactInfoRoles = false;
											$scope.validateCreateUserContactInfo = false;

										}

										else
											$scope.validateCreateUserContactInfoRoles = true;

									} catch (e) {

										$scope.validateCreateUserContactInfo = false;
									}
								}

								if (usercontactform.$valid
										&& $scope.validateCreateUserContactInfo) {

									formData.environment = formData.environment
											.trim();

									var data = {

										salutation : formData.salutation,
										firstName : formData.firstName,
										lastName : formData.lastName,
										email : formData.email,
										userName : formData.username,
										phone : formData.phoneNumber,
										CobrandId : formData.cobrandSelected.cobrandId == null ? undefined
												: formData.cobrandSelected.cobrandId,
										timeZone : formData.timeZone.Id,
										environment : formData.environment == "" ? undefined
												: formData.environment,
										memId : formData.memId,
										roles : roleList,
										isYCC : formData.YCCUser != undefined ? formData.YCCUser
												: false

									};
									$scope.userContactInfo = '{"userContactInfo":'
											+ JSON.stringify(data) + '}';

									$scope.editMode = false;
									var userInfo = {
										customerId : $scope.customerId,

										userContactInfoObj : $scope.userContactInfo
									}
									$scope.createUserInfoErrorMessage = null;
									$scope.createUserInfoMessage = null;
									userContactInfoService
											.saveUserContactInfo(
													angular.copy(userInfo),
													function(data, status,
															headers, config) {
														try {
															if (data == null
																	|| data == ""
																	|| data == "{}") {
																$scope.createUserInfoErrorMessage = $scope.staticLabels.NoDatafound;

																return;
															} else if (data
																	.indexOf($scope.staticLabels.error_code) != -1) {
																var errResponse = JSON
																		.parse(data);

																if (errResponse.errorCode == $scope.staticLabels.invalid_session_error_code) {
																	$scope.createUserInfoErrorMessage = $scope.staticLabels.invalid_session;
																	return;
																} else if (errResponse != null) {
																	$scope.createUserInfoErrorMessage = errResponse.errorMessage;
																	return;
																} else {
																	$scope.createUserInfoErrorMessage = $scope.staticLabels.ORSErrorMsg;
																	return;
																}

															}
															;

															var response = JSON
																	.parse(data);
															$scope.createUserInfoMessage = "User "
																	+ response.userContactInfo.email
																	+ " has been created successfully";

															$scope
																	.searchUsers();
															$scope
																	.reset(usercontactform);

														} catch (e) {

															var exception = {
																exceptionStackTrace : e.stack
																		.toString()
															};
															var data = angular
																	.copy(exception);
															appService
																	.loggerService(
																			data,
																			function(
																					data,
																					status,
																					headers,
																					config) {
																			})
														}
													});

								}

							};

							$scope.getFileHistory = function() {
								var fileHistroySearchCriteria = {
									customerId : $scope.customerId
								}

								var data = '{"userContactInfo":'
										+ JSON
												.stringify(fileHistroySearchCriteria)
										+ '}';

								userContactInfoService
										.getFileHistory(
												angular
														.copy(fileHistroySearchCriteria),
												function(data, status, headers,
														config) {
													try {
														if (data == null
																|| data == ""
																|| data == "{}") {
															$scope.searchUserLoading = false;
															return;
														}
														var response = JSON
																.parse(JSON
																		.stringify(data));

														$scope.fileHistoryData = JSON
																.parse(response).filehistory;

														// Added file history
														// code
														angular
																.forEach(
																		$scope.fileHistoryData,
																		function(
																				val,
																				key) {
																			if (val.errors != undefined) {
																				var obj = JSON
																						.parse(JSON
																								.stringify(val.errors));
																				angular
																						.forEach(
																								obj,
																								function(
																										value,
																										key1) {
																									value.errorMesages = value.errorMesages
																											.toString();
																								});
																				val.errorObj = obj;
																			}
																		});
														$scope.pagerFileHistory = {};
														$scope.setPageFileHistory = function(
																page) {

															console
																	.log("Page file history"
																			+ page);
															if (page < 1
																	|| page > $scope.pagerFileHistory.totalPages) {
																return;
															}
															// get pager object
															// from service
															$scope.pagerFileHistory = PagerService
																	.GetPager(
																			$scope.fileHistoryData.length,
																			page,
																			5);

															// get current page
															// of items
															$scope.fileHistoryCurr = $scope.fileHistoryData
																	.slice(
																			$scope.pagerFileHistory.startIndex,
																			$scope.pagerFileHistory.endIndex + 1);

														};

														initController();

														function initController() {
															// initialize to
															// page 1
															$scope
																	.setPageFileHistory(1);
														}

													} catch (e) {
														var exception = {
															exceptionStackTrace : e.stack
																	.toString()
														};
														$scope.labelPropertyErrorMsg = $scope.staticLabels.invalid_session;
														var data = angular
																.copy(exception);
														appService
																.loggerService(
																		data,
																		function(
																				data,
																				status,
																				headers,
																				config) {
																		})
													}
												});

							}

						

							$scope.fetchAllUserData=function(formSearch)
							{
									$scope.excelResults = null;
									$scope.searchUsers(formSearch,false,true,function() {
									 $timeout(
										function() {
											$scope.exportButtonText="Export";
									 		if ($scope.excelResults.length != 0)
												angular
													.element(
															"#ExportButton")
													.click();

									 	}, 50)

									});
									$scope.exportButtonText="Exporting...";

								
							}
							$scope.contactInfoSearchErrorMsg = null;
							$scope.editRoles = "";
							$scope.searchUsers = function(formSearch,
									quickSearch,exportRequest,callback) {
										
								if(exportRequest!=true)
								{
									$scope.searchUserLoading = true;
									$scope.users = null;
								}				
								$scope.advSearchBox = false;
								$scope.editMode = false;
								$scope.userContactInfoSearchErrorMsg = null;
								$scope.userContactInfoEditErrorMsg = null;
								if (formSearch != undefined) {

									$scope.userContactInfoEditSucessMsg = null;
									$scope.clearErrorMessages();
									if (quickSearch == true) {
										var userContactInfoSchCriteria = {
											firstName : formSearch.quickUserSerachQuery,
											customerId : $scope.customerId
										};
									} else {
										var roleList = [];
										angular.forEach(
												formSearch.rolesModelSearch,
												function(val, key) {
													roleList.push(val.name);
												});


										var userContactInfoSchCriteria = {
											customerId : $scope.customerId,
											userName : formSearch.userName,
											firstName : formSearch.firstName,
											lastName : formSearch.lastName,
											email : formSearch.email,
											numRecords: exportRequest==true?-1:null, 
											environment : formSearch.selectedEnv,
											isYcc : formSearch.selectedUserType == 'ycc users' ? true
													: formSearch.selectedUserType == 'non-ycc users' ? false
															: undefined,
											roles : roleList.length > 0 ? roleList
													.toString()
													: undefined,
											cobrandId : formSearch.cobrandSelectedSearch != undefined ? formSearch.cobrandSelectedSearch.cobrandId
													: null
										};
									}
								}

								else {
									var userContactInfoSchCriteria = {
									
										customerId : $scope.customerId,
										numRecords: exportRequest==true?-1:null, 
									}
								}

								$scope.contactInfoSearchErrorMsg = null;

								var data = '{"userContactInfo":'
										+ JSON
												.stringify(userContactInfoSchCriteria)
										+ '}';

								
								userContactInfoService
										.searchUserContactInfo(
												angular
														.copy(userContactInfoSchCriteria),
												function(data, status, headers,
														config) {
													try {

														if (data == null
																|| data == ""
																|| data == "{}") {
															$scope.searchUserLoading = false;
															$scope.contactInfoSearchErrorMsg = $scope.staticLabels.NoDatafound;
															$scope.excelResults =null;	
															return;
														} else if (data
																.indexOf($scope.staticLabels.error_code) != -1) {
															$scope.excelResults =null;	
															$scope.searchUserLoading = false;
															var errResponse = JSON
																	.parse(data);
															if (errResponse.errorCode == $scope.staticLabels.invalid_session_error_code) {
																$scope.contactInfoSearchErrorMsg = $scope.staticLabels.invalid_session;
																
																return;
															}
															$scope.contactInfoSearchErrorMsg = $scope.staticLabels.ORSErrorMsg;
															return;
														}
														;
														var response = JSON
																.parse(JSON
																		.stringify(data));

														$scope.userContactInfoData = JSON
																.parse(response).userContactInfo;
														angular
																.forEach(
																		$scope.userContactInfoData,
																		function(
																				val,
																				key) {
																			var a = val.timezone;
																			var mappedName = $scope
																					.getTimeZoneVal(a);
																			var timezoneformated = {
																				Id : a,
																				name : mappedName,
																			};
																			val.timezone = timezoneformated;
																			
																		});

													

														if(exportRequest!=true)
														{
															$scope.pager = {};
															$scope.setPage = setPage;
													    	initController();													
														}
														else
														{
															$scope.excelResults = $scope.userContactInfoData;
															angular
																	.forEach(
																			$scope.excelResults,
																			function(
																					val,
																					key) {
																			
																				val.timezone = val.timezone.Id;		
																	});
														}
														function initController() {
															// initialize to
															// page 1
															setPage(1);
														}
														
														function setPage(page) { 

															if (page < 1
																	|| page > $scope.pager.totalPages) {

																return;
															}

															// get pager object
															// from service
															$scope.pager = PagerService
																	.GetPager(
																			$scope.userContactInfoData.length,
																			page);

															// get current page
															// of items
															$scope.users = $scope.userContactInfoData
																	.slice(
																			$scope.pager.startIndex,
																			$scope.pager.endIndex + 1);

															$scope.searchUserLoading = false;
															$scope.isCollapsedContactSearch = true;
														}
														$scope.initUser = true;
														if(callback!=undefined)
															callback();
													} catch (e) {
														$scope.initUser = true;
														var exception = {
															exceptionStackTrace : e.stack
																	.toString()
														};
														$scope.labelPropertyErrorMsg = $scope.staticLabels.serverDown;
														var data = angular
																.copy(exception);
														appService
																.loggerService(
																		data,
																		function(
																				data,
																				status,
																				headers,
																				config) {
																		})
													}
												});

							};
							$scope.cancel = function(data) {
								var index = $scope.users.indexOf(data);
								$scope.newField.editMode = false;
								$scope.users[index] = $scope.newField;
								$scope.editing = false;
							}

							$scope.deleteUserInfo = function(data) {
								$scope.clearErrorMessages();
								var index = $scope.users.indexOf(data);
								$scope.deleteUser = $scope.users[index];
								$scope.userContactInfoEditSucessMsg = null;
								var userContactInfoEditCriteria = {
									customerId : $scope.customerId,
									userContactInfoObj : '{"userContactInfo":{"isDeleted":true}}',
									userContactInfoId : $scope.deleteUser._id
								};
								$scope.userContactInfoEditErrorMsg = null;
								$scope.msg = null;
								userContactInfoService
										.editUserContactInfo(
												angular
														.copy(userContactInfoEditCriteria),
												function(data, status, headers,
														config) {
													try {
														$scope.userContactInfoEditErrorMsg = null;
														$scope.msg = null;

														if (data == null
																|| data == ""
																|| data == "{}") {
															$scope.userContactInfoEditErrorMsg = $scope.staticLabels.NoDatafound;
															return;
														} else if (data
																.indexOf($scope.staticLabels.error_code) != -1) {
															var errResponse = JSON
																	.parse(data);
															if (errResponse.errorCode == $scope.staticLabels.invalid_session_error_code) {
																$scope.userContactInfoEditErrorMsg = $scope.staticLabels.invalid_session;
																return;
															}
															$scope.userContactInfoEditErrorMsg = "Username "
																	+ $scope.users[index].userName
																	+ " has  failed to delete";
															$scope.users[index] = $scope.deleteUser;
															return;
														}
														;

														var response = JSON
																.parse(data);
														$scope.userContactInfoEditSucessMsg = "User "
																+ $scope.users[index].firstName
																+ " has been deleted successfully";
														$scope.searchUsers();
													} catch (e) {
														$scope.userContactInfoEditErrorMsg = "User "
																+ $scope.users[index].firstName
																+ " has failed to delete";

														$scope.users[index] = $scope.deleteUser;
														var exception = {
															exceptionStackTrace : e.stack
																	.toString()
														};
														var data = angular
																.copy(exception);
														appService
																.loggerService(
																		data,
																		function(
																				data,
																				status,
																				headers,
																				config) {
																		})
													}
												});
							}

						} ]);