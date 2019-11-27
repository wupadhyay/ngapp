angular
		.module('Controllers')
		.controller(
				'ApplicationController',
				[
						'$scope',
						'ApplicationService',
						'userTypes',
						'cobrands',
						'userInfo',
						'prodflowFilter',
						'stageflowFilter',
						function($scope, applicationService, userTypes,
								cobrands, userInfo, prodflowFilter,
								stageflowFilter) {

							$scope.getPosition = function(str, pat, n) {
								var L = str.length, i = -1;
								while (n-- && i++ < L) {
									i = str.indexOf(pat, i);
									if (i < 0)
										break;
								}
								return i;
							};

							$scope.initializeData = function() {
								this.getLabels("", function() {
									$scope.getUserType("", function() {
										$scope.getUserInfo();
									});
								});
							};

							var self = this;
							$scope.getUserType = function(value, callback) {
								userTypes
										.getUser()
										.then(
												function(response) {
													try {
														self.data = response.data;

														var result = response.data;
														if (typeof result == 'object') {
															result = JSON
																	.stringify(result);
														}

														var res = JSON
																.parse(result);

														if (result == null
																|| result == ""
																|| result == "{}") {
															$scope.labelPropertyErrorMsg = $scope.staticLabels.FileErrorMsg;
															return false;
														} else if (res.status == 500) {
															$scope.labelPropertyErrorMsg = $scope.staticLabels.serverDown;
															return false;
														}
														if (res.errorMessage != undefined) {
															$scope.labelPropertyErrorMsg = res.errorMessage;
															return false;
														}

														var info = res.cobrandInfo;

														if (info.isYodlee == true) {
															$scope.homeCobrand = info.isYodlee;
															$scope.cobrandName = info.name;
															$scope.customerId = cobrandIdentifier;
															$scope.cobrandIAV = info.iavEnabled;
															$scope.isChannel = info.isChannel;
															$scope.isPrimary = info.emailTriggerEnabled;
															if (info.balanceRefreshEnabled == false
																	&& info.iavCacheRefreshEnabled == false
																	&& info.iavEnabled == true) {
																$scope.isPfm = false;
															} else {
																$scope.isPfm = true;
															}

															$scope.isSlmrCob = info.slmrEnabled;
															$scope.selectedCobrand = cobrandIdentifier;

															$scope.cobrands("",
																	function() {
																	});

															$scope
																	.getProdFilters(
																			"",
																			function() {
																			});

															$scope
																	.getStageFilters(
																			"",
																			function() {
																			});

														} else {
															$scope.cobrandName = info.name;
															$scope.selectedCobrand = cobrandIdentifier;
															$scope.customerId = cobrandIdentifier;
															$scope.homeCobrand = info.isYodlee;
															$scope.isChannel = info.isChannel;
															$scope.cobrandIAV = info.iavEnabled;
															$scope.isSlmrCob = info.slmrEnabled;
															$scope.isPrimary = info.emailTriggerEnabled;
															
															var subbrands = [];

															if (info.balanceRefreshEnabled == false
																	&& info.iavCacheRefreshEnabled == false
																	&& info.iavEnabled == true) {
																$scope.isPfm = false;
															} else {
																$scope.isPfm = true;
															}

															if (info.subbrands != undefined) {
																for (var i = -2; i < info.subbrands.length; i++) {
																	if (i == -2) {
																		var subbrand = {
																			name : $scope.cobrandName,
																			id : $scope.selectedCobrand,
																			iav : $scope.cobrandIAV,
																			slmr : $scope.isSlmrCob,
																			pfm : $scope.isPfm
																		};
																	} else if (i == -1) {
																		$scope.cobrandName = "Consolidated";
																		var subbrand = {
																			name : "Consolidated",
																			id : $scope.selectedCobrand,
																			iav : $scope.cobrandIAV,
																			slmr : $scope.isSlmrCob,
																			pfm : $scope.isPfm
																		};
																	} else {
																		if (info.subbrands[i].balanceRefreshEnabled == false
																				&& info.subbrands[i].iavCacheRefreshEnabled == false
																				&& info.subbrands[i].iavEnabled == true) {
																			var isPfmSub = false;
																		} else {
																			var isPfmSub = true;
																		}
																		var subbrand = {
																			name : info.subbrands[i].name,
																			id : info.subbrands[i].cobrandId,
																			iav : info.subbrands[i].iavEnabled,
																			slmr : info.subbrands[i].slmrEnabled,
																			pfm : isPfmSub
																		};
																	}
																	subbrands
																			.push(subbrand);
																}
															}

															$scope.subbrandList = subbrands;
															$scope.loadedCobrand = true;
														}
														callback();

													} catch (e) {
														$scope.labelPropertyErrorMsg = $scope.staticLabels.FileErrorMsg;
														var exception = {
															exceptionStackTrace : e.stack
																	.toString()
														};
														var data = angular
																.copy(exception);
														applicationService
																.loggerService(
																		data,
																		function(
																				data,
																				status,
																				headers,
																				config) {
																		});
														callback();
													}
												});
							};

							$scope.cobrands = function(value, callback) {
								$scope.CLErrorMsg = null;
								cobrands
										.getCobrand()
										.then(
												function(res) {
													try {
														self.data = res.data;
														var result = res.data;

														if (result == null
																|| result == ""
																|| result == "{}") {
															$scope.CLErrorCode = 404;
															$scope.CLErrorMsg = $scope.staticLabels.NoDatafound;
															return false;
														} else if (result.status == 500) {
															$scope.labelPropertyErrorMsg = $scope.staticLabels.serverDown;
															return false;
														}
														if (result.errorMessage != undefined) {
															$scope.labelPropertyErrorMsg = result.errorMessage;
															return false;
														}

														if (typeof result == 'object') {
															result = JSON
																	.stringify(result);
														}
														var response = JSON
																.parse(result);

														var cobrands = [];

														for (var i = 0; i < response.cobrandInfo.length; i++) {
															if (response.cobrandInfo[i].balanceRefreshEnabled == false
																	&& response.cobrandInfo[i].iavCacheRefreshEnabled == false
																	&& response.cobrandInfo[i].iavEnabled == true) {
																$scope.isPfmCob = false;
															} else {
																$scope.isPfmCob = true;
															}
															var subbrands = [];
															$scope.subbrandList = subbrands;
															if (response.cobrandInfo[i].subbrands != undefined) {
																for (var j = -2; j < response.cobrandInfo[i].subbrands.length; j++) {
																	if (j == -2) {
																		var subbrand = {
																			name : "Consolidated",
																			id : response.cobrandInfo[i].cobrandId,
																			iav : response.cobrandInfo[i].iavEnabled,
																			channel : response.cobrandInfo[i].name
																					+ ' ['
																					+ response.cobrandInfo[i].cobrandId
																					+ ']',
																			slmr : response.cobrandInfo[i].slmrEnabled,
																			pfm : $scope.isPfmCob
																		};
																	} else if (j == -1) {
																		var subbrand = {
																			name : response.cobrandInfo[i].name,
																			id : response.cobrandInfo[i].cobrandId,
																			iav : response.cobrandInfo[i].iavEnabled,
																			channel : response.cobrandInfo[i].name
																					+ ' ['
																					+ response.cobrandInfo[i].cobrandId
																					+ ']',
																			slmr : response.cobrandInfo[i].slmrEnabled,
																			pfm : $scope.isPfmCob
																		};
																	} else {
																		if (response.cobrandInfo[i].subbrands[j].balanceRefreshEnabled == false
																				&& response.cobrandInfo[i].subbrands[j].iavCacheRefreshEnabled == false
																				&& response.cobrandInfo[i].subbrands[j].iavEnabled == true) {
																			var isPfmSub = false;
																		} else {
																			var isPfmSub = true;
																		}
																		var subbrand = {
																			name : response.cobrandInfo[i].subbrands[j].name,
																			id : response.cobrandInfo[i].subbrands[j].cobrandId,
																			iav : response.cobrandInfo[i].subbrands[j].iavEnabled,
																			channel : response.cobrandInfo[i].name
																					+ ' ['
																					+ response.cobrandInfo[i].cobrandId
																					+ ']',
																			slmr : response.cobrandInfo[i].subbrands[j].slmrEnabled,
																			pfm : isPfmSub
																		};
																	}
																	cobrands
																			.push(subbrand);
																}
															} else {
																var cobrand = {
																	name : response.cobrandInfo[i].name,
																	id : response.cobrandInfo[i].cobrandId,
																	iav : response.cobrandInfo[i].iavEnabled,
																	slmr : response.cobrandInfo[i].slmrEnabled,
																	pfm : $scope.isPfmCob
																};
																cobrands
																		.push(cobrand);
															}
														}
														$scope.cobrandList = cobrands;
														$scope.loadedCobrand = true;
														callback();
													} catch (e) {
														$scope.labelPropertyErrorMsg = $scope.staticLabels.FileErrorMsg;
														var exception = {
															exceptionStackTrace : e.stack
																	.toString()
														};
														var data = angular
																.copy(exception);
														applicationService
																.loggerService(
																		data,
																		function(
																				data,
																				status,
																				headers,
																				config) {
																		})
														callback();
													}
												});
							};

							$scope.getUserInfo = function() {
								userInfo
										.getUserInfo()
										.then(
												function(res) {
													try {
														self.data = res.data;
														var result = res.data
														if (result == null
																|| result == ""
																|| result == "{}") {
															$scope.labelPropertyErrorMsg = $scope.staticLabels.FileErrorMsg;
															return false;
														} else if (result.status == 500) {
															$scope.labelPropertyErrorMsg = $scope.staticLabels.serverDown;
															return false;
														}
														if (res.errorMessage != undefined) {
															$scope.labelPropertyErrorMsg = res.errorMessage;
															return false;
														}
														var response = JSON
																.parse(result);
														$scope.memberId = response.userInfo.memId;
													} catch (e) {
														$scope.labelPropertyErrorMsg = $scope.staticLabels.FileErrorMsg;
														var exception = {
															exceptionStackTrace : e.stack
																	.toString()
														};
														var data = angular
																.copy(exception);
														applicationService
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

							$scope.labelPropertyErrorMsg = null;

							$scope.getLabels = function(value, callback) {

								var data;
								applicationService
										.getLabels(
												data,
												function(data, status, headers,
														config) {
													try {
														$scope.staticLabels = data;
														callback();
													} catch (e) {
														$scope.labelPropertyErrorMsg = $scope.staticLabels.FileErrorMsg;
														var exception = {
															exceptionStackTrace : e.stack
																	.toString()
														};
														var data = angular
																.copy(exception);
														applicationService
																.loggerService(
																		data,
																		function(
																				data,
																				status,
																				headers,
																				config) {
																		})
													}
												})
							};

							// USER FILTERS

							$scope.getProdFilters = function(value, callback) {
								$scope.CLErrorMsg = null;
								prodflowFilter
										.getProdFilters()
										.then(
												function(res) {
													try {
														self.data = res.data;
														var result = res.data;

														if (result == null
																|| result == ""
																|| result == "{}") {
															$scope.CLErrorCode = 404;
															$scope.CLErrorMsg = $scope.staticLabels.NoDatafound;
															return false;
														} else if (result.status == 500) {
															$scope.labelPropertyErrorMsg = $scope.staticLabels.serverDown;
															return false;
														}
														if (res.errorMessage != undefined) {
															$scope.labelPropertyErrorMsg = res.errorMessage;
															return false;
														}

														if (typeof result == 'object') {
															result = JSON
																	.stringify(result);
														}

														var response = JSON
																.parse(result);

														$scope.prodCustomersInfo = response;

														callback();

													} catch (e) {
														$scope.labelPropertyErrorMsg = $scope.staticLabels.FileErrorMsg;
														var exception = {
															exceptionStackTrace : e.stack
																	.toString()
														};
														var data = angular
																.copy(exception);
														applicationService
																.loggerService(
																		data,
																		function(
																				data,
																				status,
																				headers,
																				config) {
																		})
														// callback();
													}
												});
							};

							$scope.getStageFilters = function(value, callback) {
								$scope.CLErrorMsg = null;
								stageflowFilter
										.getStageFilters()
										.then(
												function(res) {
													try {
														self.data = res.data;
														var result = res.data;

														if (result == null
																|| result == ""
																|| result == "{}") {
															$scope.CLErrorCode = 404;
															$scope.CLErrorMsg = $scope.staticLabels.NoDatafound;
															return false;
														} else if (result.status == 500) {
															$scope.labelPropertyErrorMsg = $scope.staticLabels.serverDown;
															return false;
														}
														if (res.errorMessage != undefined) {
															$scope.labelPropertyErrorMsg = res.errorMessage;
															return false;
														}

														if (typeof result == 'object') {
															result = JSON
																	.stringify(result);
														}

														var response = JSON
																.parse(result);

														$scope.stageCustomerInfo = response;
														callback();

													} catch (e) {
														$scope.labelPropertyErrorMsg = $scope.staticLabels.FileErrorMsg;
														var exception = {
															exceptionStackTrace : e.stack
																	.toString()
														};
														var data = angular
																.copy(exception);
														applicationService
																.loggerService(
																		data,
																		function(
																				data,
																				status,
																				headers,
																				config) {
																		})
														// callback();
													}
												});
							};

						} ]);