angular
		.module('Controllers')
		.controller(
				'DashboardController',
				[
						'$scope',
						'$controller',
						'$filter',
						'$rootScope',
						'$interval',
						'$compile',
						'DashboardService',
						'ApplicationService',
						'GlobalMessageService',
						'sharedCobrand',
						'SiteMetadataService',
						'siteSpecificGlobalData',
						'Navigation',
						'$timeout',
						'siteDetailData',
						function($scope, $controller, $filter, $rootScope,
								$interval, $compile, dashboardService,
								appService, globalMessageService,
								sharedCobrand, siteMetadataService,
								siteSpecificGlobalData, Navigation, $timeout,
								siteDetailData) {

							angular.extend(this, $controller(
									'ApplicationController', {
										$scope : $scope
									}));

							$scope.initDashboard = function() {
								$scope.getLabels("",function() {
									$scope.getUserType("",function() {
										if ($scope.homeCobrand == true) {
											$scope.cobrands("",function() {
												if ($scope.cobrandList != null) {
													angular.forEach($scope.cobrandList,function(obj,index) {
														if (obj.id == $scope.selectedCobrand) {
															$scope.indexValCob = index;
														}
													});
													$scope.cob = {
														selectedCobrand : $scope.cobrandList[$scope.indexValCob]
													};
												}
											});
										} else {
											if ($scope.subbrandList != null) {
												angular.forEach(
													$scope.subbrandList, function(obj,index) {
														if (obj.id == $scope.selectedCobrand) {
															$scope.indexValSub = index;
														}
													});
												$scope.cob = {
													selectedCobrand : $scope.subbrandList[$scope.indexValSub]
												};
											}
										}
										$scope.refreshStats();
									});
									highlight("dashboard");
									var sFooter = document.getElementById('include-footer');
									sFooter.style.position = 'relative';
								});
							};

							$scope.show = false;
							$scope.displayLoading = false;
							$scope.displayTopLoading = false;
							$scope.displayTopLatencyLoading = false;
							$scope.showLoadingForErrorCode = false;
							$scope.showErrorCode = false;

							$scope.dropDownForOverallRefreshStats = [ {
								name : "24 Hours",
								value : "PT24H",
								display : "24 hrs"
							}, {
								name : "12 Hours",
								value : "PT12H",
								display : "12 hrs"
							}, {
								name : "4 Hours",
								value : "PT4H",
								display : "4 hrs"
							} ];

							$scope.dropDownForHistoricStats = [ {
								name : "7 Days",
								value : "P7D"
							}, {
								name : "15 Days",
								value : "P15D"
							}, {
								name : "30 Days",
								value : "P30D"
							} ];

							if (sharedCobrand.getData() > 0) {
								$scope.selectedCobrand = sharedCobrand
										.getData();
							}

							$scope.selclicked = function() {
								var bodyRect = document.body
										.getBoundingClientRect();
								var myElement = document
										.getElementsByClassName('sel');
								var containerTop = myElement[0]
										.getBoundingClientRect().top
										- bodyRect.top + 'px';
								var containerLeft = myElement[0]
										.getBoundingClientRect().left
										- bodyRect.left + 2 + 'px';
								var myContainer = document
										.getElementsByClassName('mySelect');
								$timeout(function() {
									angular.element(myContainer).css({
										'top' : containerTop
									});
									angular.element(myContainer).css({
										'left' : containerLeft
									});
								}, 50);

							};

							$scope.selclickedSub = function() {
								var bodyRect = document.body
										.getBoundingClientRect();
								var myElement = document
										.getElementsByClassName('selSub');
								var containerTop = myElement[0]
										.getBoundingClientRect().top
										- bodyRect.top + 'px';
								var containerLeft = myElement[0]
										.getBoundingClientRect().left
										- bodyRect.left + 2 + 'px';

								var myContainer = document
										.getElementsByClassName('mySelectSub');

								$timeout(function() {
									angular.element(myContainer).css({
										'top' : containerTop
									});
									angular.element(myContainer).css({
										'left' : containerLeft
									});
								}, 50);

							};

							var elem = angular.element(
									'.md-select-menu-container').find(
									'md-content');
							elem.addClass("scrollbar");
							elem.attr('id', "ex3");
							$scope.searchTerm;
							$scope.clearSearchTerm = function() {
								$scope.searchTerm = '';
							};

							$scope.onSelected = function(selectedItem) {
								$timeout(function() {
									$(':focus').blur();
								}, 50);
							};

							$scope.pfmButton = function(newItemType) {
								$scope.displayLoading = true;
								var cobrandPfmType = newItemType;
								$scope.cobrandType = cobrandPfmType;
								$scope.refreshStats($scope.cob.selectedCobrand);
								ga('send', 'event', 'tab', 'dashTabs',
										$scope.cobrandType, 4);
							}

							$scope.refreshStats = function(val, clickType) {

								$scope.showErrorCode = false;
								if (val == undefined
										|| (val.id == cobrandIdentifier && ($scope.selectedCobrand == undefined || $scope.selectedCobrand == cobrandIdentifier))) {
									var selectedCobrand = ""
											+ $scope.selectedCobrand;
									var cobrandIAVStat = $scope.cobrandIAV;
									var pfm = $scope.isPfm;
									var addAcct = $scope.isSlmrCob;
									if ($scope.subbrandList != undefined
											&& $scope.subbrandList.length > 0
											&& $scope.cobrandName
													.indexOf("Consolidated") != -1) {
										$scope.getConsolidatedChannel = true;
									} else {
										$scope.getConsolidatedChannel = false;
									}
								} else {
									$scope.cobrandVal = val;
									var selectedCobrand = "" + val.id;
									var cobrandIAVStat = val.iav;
									var pfm = val.pfm;
									var addAcct = val.slmr;
									if (val.name.indexOf("Consolidated") != -1) {
										$scope.getConsolidatedChannel = true;
									} else {
										$scope.getConsolidatedChannel = false;
									}
								}

								$scope.selectedCobrand = selectedCobrand;
								$scope.cobrandIAVStat = cobrandIAVStat;
								$scope.isPfm = pfm;
								$scope.isSlmrCob = addAcct;
								ga('send', 'event', 'select', 'dashCobSelect',
										$scope.selectedCobrand, 1);

								if ($scope.isSlmrCob == true
										&& $scope.cobrandIAVStat == false
										&& $scope.isPfm == false) {
									$scope.newItemType = "Add";
								} else if ($scope.cobrandIAVStat == true
										&& $scope.isPfm == false) {
									$scope.newItemType = $scope.staticLabels.iav;
								} else if ($scope.cobrandIAVStat == false
										&& $scope.isPfm == true) {
									$scope.newItemType = $scope.staticLabels.refresh_label;
								} else if ($scope.isPfm == true) {
									$scope.newItemType = $scope.staticLabels.refresh_label;
								} else if ($scope.cobrandIAVStat == true) {
									$scope.newItemType = $scope.staticLabels.iav;
								}

								if (clickType == undefined) {
									if ($scope.cobrandType == 'REFRESH') {
										$scope.newItemType = $scope.staticLabels.refresh_label;
									} else if ($scope.cobrandType == 'IAV') {
										$scope.newItemType = $scope.staticLabels.iav;
									} else if ($scope.cobrandType == 'Add') {
										$scope.newItemType = "Add";
									}
								}

								$scope.cobrandPfmType = $scope.newItemType;

								$scope.show = false;
								$scope.displayLoading = true;
								$scope.topVolumeStats = null;
								$scope.topFailureSites = null;
								$scope.selectedOverallRefreshTrendTimeSlot = "PT24H";
								$scope.selectedOverallRefreshSnapShotTimeSlot = "PT24H";
								$scope.selectedHistoricRefreshTrendTimeSlot = "P15D";
								$scope.selectedHistoricLatencyTrendTimeSlot = "P15D";
								$scope.selectedHistoricLatencyBreakDownTimeSlot = "PT24H";
								sharedCobrand.setData($scope.selectedCobrand);

								this.getOverallCommonStatistics();
								this.topVolumeSiteStats();
								this.topFailureSitesStats();
							};

							$scope.getOverallCommonStatistics = function() {
								if ($scope.cobrandIAVStat == true) {
									var cobrandIAVStat = $scope.staticLabels.iav;
								} else if ($scope.cobrandIAVStat == false) {
									var cobrandIAVStat = $scope.staticLabels.refresh_label;
								}
								if ($scope.cobrandPfmType == 'IAV') {
									var cobrandIAVStat = $scope.staticLabels.iav;
								} else if ($scope.cobrandPfmType == 'REFRESH') {
									var cobrandIAVStat = $scope.staticLabels.refresh_label;
								} else if ($scope.cobrandPfmType == 'Add') {
									var cobrandIAVStat = 'Add';
								}

								var include_list = $scope.staticLabels.historic_label;

								if ($scope.homeCobrand == true) {
									include_list = $scope.staticLabels.historic_label
											+ ","
											+ $scope.staticLabels.latency_break;
								}

								var consolidatedBy = "";
								if ($scope.getConsolidatedChannel == true) {
									consolidatedBy = "channel";
								}

								$scope.allRefreshLatencyBreakDownStatsFilter = {
									reportType : cobrandIAVStat,
									customerId : $scope.customerId,
									groupBy : $scope.staticLabels.cobrand_label_up,
									cobrandId : $scope.selectedCobrand,
									timeSlot : $scope.selectedHistoricRefreshTrendTimeSlot,
									numRecords : "",
									top : "",
									consolidatedBy : consolidatedBy,
									include : include_list
								};

								$scope.ORSErrorMsg = null;
								$scope.overallRefreshLatencyStats = null;
								$scope.displayLoading = true;
								$scope.HRSErrorMsg = null;
								$scope.historyRefreshStats = null;
								$scope.HLErrorMsg = null;
								$scope.historyLatencyStats = null;
								$scope.HLBErrorMsg = null;
								$scope.historyRefreshLatencyBreakDownStats = null;
								$scope.historicRefreshStatslastUpdated = null;
								$scope.historicLatencyStatslastupdated = null;
								$scope.overall_compared_total = "";
								$scope.overall_compared_total_arrow = "";
								$scope.overall_compared_success = "";
								$scope.overall_compared_success_style = "#77716f;";
								$scope.overall_compared_success_arrow = "";
								$scope.overall_compared_pSuccess = "";
								$scope.overall_compared_pSuccess_style = "#77716f;";
								$scope.overall_compared_pSuccess_arrow = "";
								$scope.overall_compared_technical = "";
								$scope.overall_compared_technical_style = "#77716f;";
								$scope.overall_compared_technical_arrow = "";
								$scope.overall_compared_site = "";
								$scope.overall_compared_site_style = "#77716f;";
								$scope.overall_compared_site_arrow = "";
								$scope.overall_compared_uar = "";
								$scope.overall_compared_uar_style = "#77716f;";
								$scope.overall_compared_uar_arrow = "";
								$scope.overall_compared_latency = "";
								$scope.overall_compared_latency_style = "#77716f;";
								$scope.overall_compared_latency_arrow = "";

								var data = angular
										.copy($scope.allRefreshLatencyBreakDownStatsFilter);
								dashboardService
										.refreshLatencyStats(
												data,
												function(data, status, headers,
														config) {

													$scope
															.dataRenderForOverAllRefreshStats(
																	data,
																	cobrandIAVStat);
													$scope
															.dataRenderedHistoricStatsGraph(
																	data,
																	cobrandIAVStat);
													if ($scope.homeCobrand == true) {
														$scope
																.dataRenderedHistoricLatencyStatsGraph(data);
														$scope
																.dataRenderedLatencyBreakupGraph(data);
													}
												})

							}

							$scope.overallRefreshStatistics = function() {
								$scope.showErrorCode = false;
								if ($scope.cobrandIAVStat == true) {
									var cobrandIAVStat = $scope.staticLabels.iav;
								} else if ($scope.cobrandIAVStat == false) {
									var cobrandIAVStat = $scope.staticLabels.refresh_label;
								}

								if ($scope.cobrandPfmType == 'IAV') {
									var cobrandIAVStat = $scope.staticLabels.iav;
								} else if ($scope.cobrandPfmType == 'REFRESH') {
									var cobrandIAVStat = $scope.staticLabels.refresh_label;
								} else if ($scope.cobrandPfmType == 'Add') {
									var cobrandIAVStat = 'Add';
								}
								ga(
										'send',
										'event',
										'select',
										'dashSnapshot',
										$scope.selectedOverallRefreshSnapShotTimeSlot,
										3);
								$scope.ORSErrorMsg = null;
								$scope.overallRefreshLatencyStats = null;
								$scope.displayLoading = true;
								$scope.overall_compared_total = null;
								$scope.overall_compared_total_arrow = "";
								$scope.overall_compared_success = null;
								$scope.overall_compared_success_style = "#77716f;";
								$scope.overall_compared_success_arrow = "";
								$scope.overall_compared_pSuccess = null;
								$scope.overall_compared_pSuccess_style = "#77716f;";
								$scope.overall_compared_pSuccess_arrow = "";
								$scope.overall_compared_technical = null;
								$scope.overall_compared_technical_style = "#77716f;";
								$scope.overall_compared_technical_arrow = "";
								$scope.overall_compared_site = null;
								$scope.overall_compared_site_style = "#77716f;";
								$scope.overall_compared_site_arrow = "";
								$scope.overall_compared_uar = null;
								$scope.overall_compared_uar_style = "#77716f;";
								$scope.overall_compared_uar_arrow = "";
								$scope.overall_compared_latency = null;
								$scope.overall_compared_latency_style = "#77716f;";
								$scope.overall_compared_latency_arrow = "";
								var include_list = "";
								var consolidatedBy = "";
								if ($scope.getConsolidatedChannel == true) {
									consolidatedBy = "channel";
								}

								$scope.refreshLatencyStatsFilter = {
									reportType : cobrandIAVStat,
									customerId : $scope.customerId,
									groupBy : $scope.staticLabels.cobrand_label_up,
									cobrandId : $scope.selectedCobrand,
									timeSlot : $scope.selectedOverallRefreshSnapShotTimeSlot,
									numRecords : "",
									top : "",
									consolidatedBy : consolidatedBy,
									include : include_list
								};

								var data = angular
										.copy($scope.refreshLatencyStatsFilter);

								dashboardService
										.refreshLatencyStats(
												data,
												function(data, status, headers,
														config) {

													$scope
															.dataRenderForOverAllRefreshStats(
																	data,
																	cobrandIAVStat);
													$scope.topVolumeSiteStats();
													$scope
															.topFailureSitesStats();

												})

							};

							$scope.dataForErrorCodeDash = function() {

								if ($scope.showErrorCode == false) {
									$scope.showErrorCode = true;
								} else {
									$scope.showErrorCode = false;
									$scope.showLoadingForErrorCode = false;
									return;
								}

								$scope.errorCodeErrorMsg = null;
								$scope.techErrSort = null;
								$scope.uarErrSort = null;
								$scope.siteErrSort = null;
								$scope.showLoadingForErrorCode = true;

								if ($scope.cobrandIAVStat == true) {
									var cobrandIAVStat = $scope.staticLabels.iav;
								} else if ($scope.cobrandIAVStat == false) {
									var cobrandIAVStat = $scope.staticLabels.refresh_label;
								}

								if ($scope.cobrandPfmType == 'IAV') {
									var cobrandIAVStat = $scope.staticLabels.iav;
								} else if ($scope.cobrandPfmType == 'REFRESH') {
									var cobrandIAVStat = $scope.staticLabels.refresh_label;
								} else if ($scope.cobrandPfmType == 'Add') {
									var cobrandIAVStat = 'Add';
								}

								var consolidatedBy = "";
								if ($scope.getConsolidatedChannel == true) {
									consolidatedBy = "channel";
								}
								$scope.techErr = null;
								$scope.siteErr = null;
								$scope.uarErr = null;

								$scope.errCodeStatsFilter = {
									reportType : cobrandIAVStat,
									customerId : $scope.customerId,
									groupBy : $scope.staticLabels.cobrand_label_up,
									cobrandId : $scope.selectedCobrand,
									timeSlot : $scope.selectedOverallRefreshSnapShotTimeSlot,
									numRecords : "",
									top : "",
									consolidatedBy : consolidatedBy,
									include : $scope.staticLabels.errorcode
								};

								var data = angular
										.copy($scope.errCodeStatsFilter);

								dashboardService
										.refreshLatencyStats(
												data,
												function(data, status, headers,
														config) {
													try {
														var response = JSON
																.parse(data);
														$scope.showLoadingForErrorCode = false;
														if (data == null
																|| data == ""
																|| data == "{}") {
															$scope.displayLoading = false;
															$scope.ORSErrorCode = 404;
															$scope.errorCodeErrorMsg = $scope.staticLabels.NoDatafound;
															return;
														} else if (data
																.indexOf($scope.staticLabels.error_code) != -1) {
															$scope.displayLoading = false;
															var errResponse = JSON
																	.parse(data);
															if (errResponse.errorCode == $scope.staticLabels.invalid_session_error_code) {
																$scope.errorCodeErrorMsg = $scope.staticLabels.invalid_session;
																return;
															}
															$scope.ORSErrorCode = errResponse.errorCode;
															$scope.errorCodeErrorMsg = $scope.staticLabels.ORSErrorMsg;
															return;
														} else if (response.refreshStats.info[0].summary == undefined
																|| response.refreshStats.info[0].summary == ""
																|| response.refreshStats.info[0].summary == "{}"
																|| response.refreshStats.info[0].summary == null) {
															$scope.displayLoading = false;
															$scope.ORSErrorCode = 404;
															$scope.errorCodeErrorMsg = $scope.staticLabels.NoDatafound;
															return;
														}

														$scope.overallRefreshLatencyStats = response;
														var infoVal = response.refreshStats.info;

														for (var i = 0; i < infoVal.length; i++) {
															var failureVolume = infoVal[i].summary.totalVolume;
															var failureNode = infoVal[i].summary.failure;
															var breakup_tech = null;
															var breakup_site = null;
															var breakup_uar = null;

															for (var j = 0; j < failureNode.length; j++) {

																var failureType = failureNode[j].type;
																var breakups = failureNode[j].breakups;
																if (failureType == $scope.staticLabels.tech_err_label) {
																	var breakup_tech = failureNode[j].breakups;
																} else if (failureType == $scope.staticLabels.site_label) {
																	var breakup_site = failureNode[j].breakups;
																} else if (failureType == $scope.staticLabels.uar_label) {
																	var breakup_uar = failureNode[j].breakups;
																}
																if ((breakup_tech == undefined
																		&& breakup_site == undefined && breakup_uar == undefined)
																		|| (breakup_tech == null
																				&& breakup_site == null && breakup_uar == null)
																		|| (breakup_tech == ""
																				&& breakup_site == "" && breakup_uar == "")
																		|| (breakup_tech == "[]"
																				&& breakup_site == "[]" && breakup_uar == "[]")) {
																	$scope.errorCodeErrorMsg = $scope.staticLabels.NoDatafound;
																	return;
																}

																if (failureType == $scope.staticLabels.tech_err_label) {
																	$scope.overall_technical_num = Number(failureNode[j].volume);
																	var failure_techBrkup = failureNode[j].breakups;
																	$scope.techErrSort = [];
																	$scope.total_techRate = 0;
																	for (var t = 0; t < failure_techBrkup.length; t++) {
																		$scope.failure_techBrkup_code = failure_techBrkup[t].code;
																		$scope.failure_techBrkup_rate = ((failure_techBrkup[t].volume / failureVolume) * 100)
																				.toFixed(2);

																		var techErrData = {
																			techErrCodeSort : $scope.failure_techBrkup_code,
																			techErrRateSort : $scope.failure_techBrkup_rate,
																		};

																		$scope.techErrSort
																				.push(techErrData);

																	}
																	$scope.techErrSort
																			.sort(function(
																					a,
																					b) {
																				return (b.techErrRateSort)
																						- (a.techErrRateSort);
																			});

																	$scope.techErr = [];
																	for (var tr = 0; tr < $scope.techErrSort.length; tr++) {
																		if (tr <= 4) {

																			var tdata = {
																				techErrCode : $scope.techErrSort[tr].techErrCodeSort,
																				techErrRate : $scope.techErrSort[tr].techErrRateSort,
																			};
																			$scope.techErr
																					.push(tdata);
																		} else if (tr > 4) {
																			var techR = parseFloat($scope.techErrSort[tr].techErrRateSort);
																			$scope.total_techRate = $scope.total_techRate
																					+ techR;
																		}
																	}
																} else if (failureType == $scope.staticLabels.site_label) {
																	$scope.overall_site_num = Number(failureNode[j].volume);
																	var failure_siteBrkup = failureNode[j].breakups;
																	$scope.siteErrSort = [];
																	$scope.total_siteRate = 0;
																	for (var s = 0; s < failure_siteBrkup.length; s++) {
																		$scope.failure_siteBrkup_code = failure_siteBrkup[s].code;
																		$scope.failure_siteBrkup_rate = ((failure_siteBrkup[s].volume / failureVolume) * 100)
																				.toFixed(2);

																		var siteErrData = {
																			siteErrCodeSort : $scope.failure_siteBrkup_code,
																			siteErrRateSort : $scope.failure_siteBrkup_rate,
																		};
																		$scope.siteErrSort
																				.push(siteErrData);

																	}

																	$scope.siteErrSort
																			.sort(function(
																					a,
																					b) {
																				return (b.siteErrRateSort)
																						- (a.siteErrRateSort);
																			});
																	$scope.siteErr = [];
																	for (var sr = 0; sr < $scope.siteErrSort.length; sr++) {

																		if (sr <= 4) {
																			var sdata = {
																				siteErrCode : $scope.siteErrSort[sr].siteErrCodeSort,
																				siteErrRate : $scope.siteErrSort[sr].siteErrRateSort,
																			};
																			$scope.siteErr
																					.push(sdata);

																		} else if (sr > 4) {
																			var site = parseFloat($scope.siteErrSort[sr].siteErrRateSort);
																			$scope.total_siteRate = $scope.total_siteRate
																					+ site;
																		}
																	}
																} else if (failureType == $scope.staticLabels.uar_label) {
																	$scope.overall_uar_num = Number(failureNode[j].volume);
																	var failure_uarBrkup = failureNode[j].breakups;
																	$scope.uarErrSort = [];
																	$scope.total_uarRate = 0;

																	for (var u = 0; u < failure_uarBrkup.length; u++) {
																		$scope.failure_uarBrkup_code = failure_uarBrkup[u].code;
																		$scope.failure_uarBrkup_rate = ((failure_uarBrkup[u].volume / failureVolume) * 100)
																				.toFixed(2);

																		var uarErrData = {
																			uarErrCodeSort : $scope.failure_uarBrkup_code,
																			uarErrRateSort : $scope.failure_uarBrkup_rate,
																		};
																		$scope.uarErrSort
																				.push(uarErrData);

																	}

																	$scope.uarErrSort
																			.sort(function(
																					a,
																					b) {
																				return (b.uarErrRateSort)
																						- (a.uarErrRateSort);
																			});
																	$scope.uarErr = [];
																	for (var ur = 0; ur < $scope.uarErrSort.length; ur++) {

																		if (ur <= 4) {
																			var udata = {
																				uarErrCode : $scope.uarErrSort[ur].uarErrCodeSort,
																				uarErrRate : $scope.uarErrSort[ur].uarErrRateSort,
																			};
																			$scope.uarErr
																					.push(udata);
																		} else if (ur > 4) {
																			var uar = parseFloat($scope.uarErrSort[ur].uarErrRateSort);
																			$scope.total_uarRate = $scope.total_uarRate
																					+ uar;
																		}

																	}
																}
															}
														}
													} catch (e) {
														$scope.showLoadingForErrorCode = false;
														$scope.overallRefreshLatencyStats = null;
														$scope.displayLoading = false;
														$scope.errorCodeErrorMsg = $scope.staticLabels.ORSJSErrorMsg;
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

							$scope.dataRenderForOverAllRefreshStats = function(
									data, cobrandIAVStat) {

								$scope.ORSErrorMsg = null;
								$scope.overallRefreshLatencyStats = null;

								try {
									if (typeof data == 'string') {
										var response = JSON.parse(data);
									} else {
										var response = JSON.parse(JSON
												.stringify(data));
										data = JSON.stringify(data);
									}

									if (data == null || data == ""
											|| data == "{}") {
										$scope.displayLoading = false;
										$scope.ORSErrorCode = 404;
										$scope.ORSErrorMsg = $scope.staticLabels.NoDatafound;
										return;
									} else if (data
											.indexOf($scope.staticLabels.error_code) != -1) {
										$scope.displayLoading = false;
										var errResponse = JSON.parse(data);
										if (errResponse.errorCode == $scope.staticLabels.invalid_session_error_code) {
											$scope.ORSErrorMsg = $scope.staticLabels.invalid_session;
											return;
										}
										$scope.ORSErrorCode = errResponse.errorCode;
										$scope.ORSErrorMsg = $scope.staticLabels.ORSErrorMsg;
										return;
									} else if (response.refreshStats.info[0].summary == undefined
											|| response.refreshStats.info[0].summary == ""
											|| response.refreshStats.info[0].summary == "{}"
											|| response.refreshStats.info[0].summary == null) {
										$scope.displayLoading = false;
										$scope.ORSErrorCode = 404;
										$scope.ORSErrorMsg = $scope.staticLabels.NoDatafound;
										return;
									}

									$scope.overallRefreshLatencyStats = response;
									var infoVal = response.refreshStats.info;

									for (var i = 0; i < infoVal.length; i++) {
										$scope.overall_total = (Number(infoVal[i].summary.totalVolume));
										$scope.overall_success_num = Number(infoVal[i].summary.success.volume);
										if (cobrandIAVStat == 'Add') {
											$scope.overall_pSuccess_num = Number(infoVal[i].summary.partialSuccess.volume);
										}
										var failureNode = infoVal[i].summary.failure;

										for (var j = 0; j < failureNode.length; j++) {

											var failureType = failureNode[j].type;
											if (failureType == $scope.staticLabels.tech_err_label) {
												$scope.overall_technical_num = Number(failureNode[j].volume);
											} else if (failureType == $scope.staticLabels.site_label) {
												$scope.overall_site_num = Number(failureNode[j].volume);
											} else if (failureType == $scope.staticLabels.uar_label) {
												$scope.overall_uar_num = Number(failureNode[j].volume);
											}
										}
										if ((infoVal[i].summary.latency) != undefined) {
											$scope.overall_latency = Number(infoVal[i].summary.latency.avg);
										}
									}

									if ($scope.homeCobrand == true
											&& cobrandIAVStat == 'Add') {
										$scope.ribbonWidth = "11%";
									} else if ($scope.homeCobrand == false
											&& cobrandIAVStat == 'Add') {
										$scope.ribbonWidth = "13%";
									} else {
										$scope.ribbonWidth = "19%";
									}

									$scope.overall_success = (($scope.overall_success_num / $scope.overall_total) * 100)
											.toFixed(2);
									if (cobrandIAVStat == 'Add') {
										$scope.overall_pSuccess = (($scope.overall_pSuccess_num / $scope.overall_total) * 100)
												.toFixed(2);
									}
									$scope.overall_technical = (($scope.overall_technical_num / $scope.overall_total) * 100)
											.toFixed(2);
									$scope.overall_site = (($scope.overall_site_num / $scope.overall_total) * 100)
											.toFixed(2);
									$scope.overall_uar = (($scope.overall_uar_num / $scope.overall_total) * 100)
											.toFixed(2);

									$scope.show = true;
									$scope.displayLoading = false;
								} catch (e) {
									$scope.overallRefreshLatencyStats = null;
									$scope.displayLoading = false;
									$scope.ORSErrorMsg = $scope.staticLabels.ORSJSErrorMsg;
									var exception = {
										exceptionStackTrace : e.stack
												.toString()
									};
									var data = angular.copy(exception);
									appService.loggerService(data, function(
											data, status, headers, config) {
									})
								}

							};

							$scope.topFailureSitesStats = function() {

								$scope.TopFailureErrorMsg = null;
								$scope.topFailureSites = null;
								$scope.displayTopFailureLoading = true;
								$scope.displayTopFailureLatencyLoading = true;
								if ($scope.cobrandIAVStat == true) {
									var cobrandIAVStat = $scope.staticLabels.iav;
								} else if ($scope.cobrandIAVStat == false) {
									var cobrandIAVStat = $scope.staticLabels.refresh_label;
								}
								if ($scope.cobrandPfmType == 'IAV') {
									var cobrandIAVStat = $scope.staticLabels.iav;
								} else if ($scope.cobrandPfmType == 'REFRESH') {
									var cobrandIAVStat = $scope.staticLabels.refresh_label;
								} else if ($scope.cobrandPfmType == 'Add') {
									var cobrandIAVStat = 'Add';
								}

								var include_list = "";
								var consolidatedBy = "";
								if ($scope.getConsolidatedChannel == true) {
									consolidatedBy = "channel";
								}

								$scope.topFailureSitesFilter = {
									reportType : cobrandIAVStat,
									customerId : $scope.customerId,
									groupBy : $scope.staticLabels.provider_label,
									cobrandId : $scope.selectedCobrand,
									timeSlot : $scope.selectedOverallRefreshSnapShotTimeSlot,
									numRecords : "15",
									top : $scope.staticLabels.top_failure,
									consolidatedBy : consolidatedBy,
									include : include_list
								};

								var data = angular
										.copy($scope.topFailureSitesFilter);

								var topFailureSitesSuccessRefreshData = Array();
								var topFailureSitespSuccessRefreshData = Array();
								var topFailureSitesAgentFailureRefreshData = Array();
								var topFailureSitesSiteFailureRefreshData = Array();
								var topFailureSitesUARFailureRefreshData = Array();
								var topFailureSitesLatencyData = Array();
								var siteIds = Array();
								var overall_total = Array();
								var fieldName = Array();
								$scope.topFailureslastupdated = null;

								dashboardService
										.refreshLatencyStats(
												data,
												function(data, status, headers,
														config) {
													$scope.TopFailureErrorMsg = null;
													$scope.topFailureSites = null;

													try {
														var response = JSON
																.parse(data);

														if (data == null
																|| data == ""
																|| data == "{}") {
															$scope.TopFailureErrorCode = 404;
															$scope.TopFailureErrorMsg = $scope.staticLabels.NoDatafound;
															$scope.displayTopFailureLoading = false;
															$scope.displayTopFailureLatencyLoading = false;
															return;
														} else if (data
																.indexOf($scope.staticLabels.error_code) != -1) {
															var errResponse = JSON
																	.parse(data);
															if (errResponse.errorCode == $scope.staticLabels.invalid_session_error_code) {
																$scope.TopFailureErrorMsg = $scope.staticLabels.invalid_session;
																$scope.displayTopFailureLoading = false;
																$scope.displayTopFailureLatencyLoading = false;
																return;
															}
															$scope.TopFailureErrorCode = errResponse.errorCode;
															$scope.TopFailureErrorMsg = $scope.staticLabels.TopFailureErrorMsg;
															$scope.displayTopFailureLoading = false;
															$scope.displayTopFailureLatencyLoading = false;
															return;
														}

														$scope.topFailureSites = response;
														var infoVal = response.refreshStats.info;
														if (infoVal.length > 0
																&& infoVal[0].lastModified != undefined) {
															$scope.topFailureslastupdated = infoVal[0].lastModified;
														}
														for (var i = 0; i < infoVal.length; i++) {
															siteIds[i] = infoVal[i].id;
															fieldName[i] = infoVal[i].name
																	+ " - "
																	+ infoVal[i].id;
															overall_total[i] = Number(infoVal[i].summary.totalVolume);
															topFailureSitesSuccessRefreshData[i] = Number(((infoVal[i].summary.success.volume / (overall_total[i])) * 100)
																	.toFixed(2));
															if (cobrandIAVStat == 'Add') {
																topFailureSitespSuccessRefreshData[i] = Number(((infoVal[i].summary.partialSuccess.volume / (overall_total[i])) * 100)
																		.toFixed(2));
															}
															var failureNode = infoVal[i].summary.failure;

															for (var j = 0; j < failureNode.length; j++) {

																var failureType = failureNode[j].type;
																if (failureType == $scope.staticLabels.tech_err_label) {
																	topFailureSitesAgentFailureRefreshData[i] = Number(((failureNode[j].volume / (overall_total[i])) * 100)
																			.toFixed(2));
																} else if (failureType == $scope.staticLabels.site_label) {
																	topFailureSitesSiteFailureRefreshData[i] = Number(((failureNode[j].volume / (overall_total[i])) * 100)
																			.toFixed(2));
																} else if (failureType == $scope.staticLabels.uar_label) {
																	topFailureSitesUARFailureRefreshData[i] = Number(((failureNode[j].volume / (overall_total[i])) * 100)
																			.toFixed(2));
																}
															}

															if ((infoVal[i].summary.latency) != undefined) {
																topFailureSitesLatencyData[i] = Number(infoVal[i].summary.latency.avg);
															}
														}

														$scope
																.callFailureSiteDetails(
																		siteIds,
																		function() {

																			var topFailureNWSitesSuccessRefreshData = Array();
																			var topFailureNWSitespSuccessRefreshData = Array();
																			var topFailureNWSitesAgentFailureRefreshData = Array();
																			var topFailureNWSitesSiteFailureRefreshData = Array();
																			var topFailureNWSitesUARFailureRefreshData = Array();
																			var topFailureNWSitesLatencyData = Array();
																			var overall_failure_nw_total = Array();

																			for (var i = 0; i < siteIds.length; i++) {
																				for (var j = 0; j < $scope.nwFailuresiteIds.length; j++) {
																					if (siteIds[i] == $scope.nwFailuresiteIds[j]) {
																						topFailureNWSitesSuccessRefreshData[i] = $scope.topFailureNWSitesSuccessRefreshData[j];
																						if (cobrandIAVStat == 'Add') {
																							topFailureNWSitespSuccessRefreshData[i] = $scope.topFailureNWSitespSuccessRefreshData[j];
																						}
																						topFailureNWSitesAgentFailureRefreshData[i] = $scope.topFailureNWSitesAgentFailureRefreshData[j];
																						topFailureNWSitesSiteFailureRefreshData[i] = $scope.topFailureNWSitesSiteFailureRefreshData[j];
																						topFailureNWSitesUARFailureRefreshData[i] = $scope.topFailureNWSitesUARFailureRefreshData[j];
																						topFailureNWSitesLatencyData[i] = $scope.topFailureNWSitesLatencyData[j];
																						overall_failure_nw_total[i] = $scope.overall_failure_nw_total[j];
																						break;
																					} else if (siteIds.length != $scope.nwFailuresiteIds.length
																							&& j == ($scope.nwFailuresiteIds.length - 1)) {
																						topFailureNWSitesSuccessRefreshData[i] = "0";
																						if (cobrandIAVStat == 'Add') {
																							topFailureNWSitespSuccessRefreshData[i] = "0";
																						}
																						topFailureNWSitesAgentFailureRefreshData[i] = "0";
																						topFailureNWSitesSiteFailureRefreshData[i] = "0";
																						topFailureNWSitesUARFailureRefreshData[i] = "0";
																						topFailureNWSitesLatencyData[i] = "0";
																						overall_failure_nw_total[i] = "0";
																					}
																				}
																			}

																			var axis = [];
																			var definedseries = [];
																			var definedLatencyseries = [];

																			if (cobrandIAVStat == 'Add') {
																				var seriesFailure = [
																						{
																							name : $scope.staticLabels.technical_failure_Label,
																							yAxis : 0,
																							color : '#c91d1d',
																							pointWidth : 14,
																							fontFamily : 'proxima_nova_rgregular',
																							pointPadding : 0,
																							data : topFailureSitesAgentFailureRefreshData,
																							index : 0,
																							legendIndex : 2,
																							stack : 2,
																							legendID : 1
																						},
																						{
																							name : $scope.staticLabels.site_failure_Label,
																							yAxis : 0,
																							color : '#ffa000',
																							pointWidth : 14,
																							fontFamily : 'proxima_nova_rgregular',
																							pointPadding : 0,
																							data : topFailureSitesSiteFailureRefreshData,
																							index : 1,
																							legendIndex : 3,
																							stack : 2,
																							legendID : 1
																						},
																						{
																							name : $scope.staticLabels.uar_failure_Label,
																							yAxis : 0,
																							color : '#c5ea3a',
																							pointWidth : 14,
																							fontFamily : 'proxima_nova_rgregular',
																							pointPadding : 0,
																							data : topFailureSitesUARFailureRefreshData,
																							index : 2,
																							legendIndex : 4,
																							stack : 2,
																							legendID : 1
																						},
																						{
																							name : "Partial Success",
																							yAxis : 0,
																							color : '#25f081',
																							pointWidth : 14,
																							fontFamily : 'proxima_nova_rgregular',
																							pointPadding : 0,
																							data : topFailureSitespSuccessRefreshData,
																							index : 3,
																							legendIndex : 1,
																							stack : 2,
																							legendID : 1
																						},
																						{
																							name : $scope.staticLabels.successful_Label,
																							yAxis : 0,
																							color : '#01b050',
																							pointPadding : 0,
																							fontFamily : 'proxima_nova_rgregular',
																							pointWidth : 14,
																							data : topFailureSitesSuccessRefreshData,
																							index : 4,
																							legendIndex : 0,
																							stack : 2,
																							legendID : 1
																						},
																						{
																							name : $scope.staticLabels.refresh_volume,
																							type : 'spline',
																							yAxis : 1,
																							pointPadding : 0,
																							color : '#144173',
																							dashStyle : 'Dash',
																							marker : {
																								enabled : true,
																								symbol : 'circle',
																								fillColor : '#FFFFFF',
																								lineWidth : 1,
																								lineColor : '#144173'
																							},
																							fontFamily : 'proxima_nova_rgregular',
																							data : overall_total,
																							index : 5,
																							legendIndex : 5,
																							stack : 2,
																							legendID : 1
																						},
																						{
																							name : $scope.staticLabels.technical_failure_Label,
																							yAxis : 0,
																							color : '#ef9a9a',
																							pointWidth : 7,
																							fontFamily : 'proxima_nova_rgregular',
																							pointPadding : 0,
																							data : topFailureNWSitesAgentFailureRefreshData,
																							index : 0,
																							legendIndex : 3,
																							stack : 1,
																							legendID : 0
																						},
																						{
																							name : $scope.staticLabels.site_failure_Label,
																							yAxis : 0,
																							color : '#ffd54f',
																							pointWidth : 7,
																							fontFamily : 'proxima_nova_rgregular',
																							pointPadding : 0,
																							data : topFailureNWSitesSiteFailureRefreshData,
																							index : 1,
																							legendIndex : 4,
																							stack : 1,
																							legendID : 0
																						},
																						{
																							name : $scope.staticLabels.uar_failure_Label,
																							yAxis : 0,
																							color : '#e6ee9c',
																							pointWidth : 7,
																							fontFamily : 'proxima_nova_rgregular',
																							pointPadding : 0,
																							data : topFailureNWSitesUARFailureRefreshData,
																							index : 2,
																							legendIndex : 5,
																							stack : 1,
																							legendID : 0
																						},
																						{
																							name : "Partial Success",
																							yAxis : 0,
																							color : '#86F7B9',
																							pointWidth : 7,
																							fontFamily : 'proxima_nova_rgregular',
																							pointPadding : 0,
																							data : topFailureNWSitespSuccessRefreshData,
																							index : 3,
																							legendIndex : 2,
																							stack : 1,
																							legendID : 0
																						},
																						{
																							name : $scope.staticLabels.successful_Label,
																							yAxis : 0,
																							color : '#a5d6a7',
																							fontFamily : 'proxima_nova_rgregular',
																							pointWidth : 7,
																							pointPadding : 0,
																							data : topFailureNWSitesSuccessRefreshData,
																							index : 4,
																							legendIndex : 1,
																							stack : 1,
																							legendID : 0
																						},
																						{
																							name : $scope.staticLabels.refresh_volume,
																							type : 'spline',
																							yAxis : 1,
																							pointPadding : 0,
																							color : '#9e9e9e',
																							dashStyle : 'Dash',
																							marker : {
																								enabled : true,
																								symbol : 'circle',
																								fillColor : '#FFFFFF',
																								lineWidth : 1,
																								lineColor : '#144173'
																							},
																							fontFamily : 'proxima_nova_rgregular',
																							data : overall_failure_nw_total,
																							index : 5,
																							legendIndex : 6,
																							stack : 1,
																							legendID : 0
																						},
																						{
																							name : "Network Stats",
																							fontFamily : 'proxima_nova_rgregular',
																							legendIndex : 0,
																							legendID : 0,
																							showCheckbox : true,
																							selected : true,
																							events : {
																								legendItemClick : function() {
																									return false;
																								}
																							}
																						} ];
																			} else {
																				var seriesFailure = [
																						{
																							name : $scope.staticLabels.technical_failure_Label,
																							yAxis : 0,
																							color : '#c91d1d',
																							pointWidth : 14,
																							fontFamily : 'proxima_nova_rgregular',
																							pointPadding : 0,
																							data : topFailureSitesAgentFailureRefreshData,
																							index : 0,
																							legendIndex : 1,
																							stack : 2,
																							legendID : 1
																						},
																						{
																							name : $scope.staticLabels.site_failure_Label,
																							yAxis : 0,
																							color : '#ffa000',
																							pointWidth : 14,
																							fontFamily : 'proxima_nova_rgregular',
																							pointPadding : 0,
																							data : topFailureSitesSiteFailureRefreshData,
																							index : 1,
																							legendIndex : 2,
																							stack : 2,
																							legendID : 1
																						},
																						{
																							name : $scope.staticLabels.uar_failure_Label,
																							yAxis : 0,
																							color : '#c5ea3a',
																							pointWidth : 14,
																							fontFamily : 'proxima_nova_rgregular',
																							pointPadding : 0,
																							data : topFailureSitesUARFailureRefreshData,
																							index : 2,
																							legendIndex : 3,
																							stack : 2,
																							legendID : 1
																						},
																						{
																							name : $scope.staticLabels.successful_Label,
																							yAxis : 0,
																							color : '#01b050',
																							fontFamily : 'proxima_nova_rgregular',
																							pointWidth : 14,
																							pointPadding : 0,
																							data : topFailureSitesSuccessRefreshData,
																							index : 3,
																							legendIndex : 0,
																							stack : 2,
																							legendID : 1
																						},
																						{
																							name : $scope.staticLabels.refresh_volume,
																							type : 'spline',
																							yAxis : 1,
																							color : '#144173',
																							dashStyle : 'Dash',
																							marker : {
																								enabled : true,
																								symbol : 'circle',
																								fillColor : '#FFFFFF',
																								lineWidth : 1,
																								lineColor : '#144173'
																							},
																							fontFamily : 'proxima_nova_rgregular',
																							data : overall_total,
																							index : 4,
																							legendIndex : 4,
																							stack : 2,
																							legendID : 1
																						},
																						{
																							name : $scope.staticLabels.technical_failure_Label,
																							yAxis : 0,
																							color : '#ef9a9a',
																							pointWidth : 7,
																							fontFamily : 'proxima_nova_rgregular',
																							pointPadding : 0,
																							data : topFailureNWSitesAgentFailureRefreshData,
																							index : 0,
																							legendIndex : 2,
																							stack : 1,
																							legendID : 0
																						},
																						{
																							name : $scope.staticLabels.site_failure_Label,
																							yAxis : 0,
																							color : '#ffd54f',
																							pointWidth : 7,
																							fontFamily : 'proxima_nova_rgregular',
																							pointPadding : 0,
																							data : topFailureNWSitesSiteFailureRefreshData,
																							index : 1,
																							legendIndex : 3,
																							stack : 1,
																							legendID : 0
																						},
																						{
																							name : $scope.staticLabels.uar_failure_Label,
																							yAxis : 0,
																							color : '#e6ee9c',
																							pointWidth : 7,
																							fontFamily : 'proxima_nova_rgregular',
																							pointPadding : 0,
																							data : topFailureNWSitesUARFailureRefreshData,
																							index : 2,
																							legendIndex : 4,
																							stack : 1,
																							legendID : 0
																						},
																						{
																							name : $scope.staticLabels.successful_Label,
																							yAxis : 0,
																							color : '#a5d6a7',
																							pointPadding : 0,
																							fontFamily : 'proxima_nova_rgregular',
																							pointWidth : 7,
																							data : topFailureNWSitesSuccessRefreshData,
																							index : 3,
																							legendIndex : 1,
																							stack : 1,
																							legendID : 0
																						},
																						{
																							name : $scope.staticLabels.refresh_volume,
																							type : 'spline',
																							yAxis : 1,
																							color : '#9e9e9e',
																							dashStyle : 'Dash',
																							marker : {
																								enabled : true,
																								symbol : 'circle',
																								fillColor : '#FFFFFF',
																								lineWidth : 1,
																								lineColor : '#144173'
																							},
																							fontFamily : 'proxima_nova_rgregular',
																							data : overall_failure_nw_total,
																							index : 4,
																							legendIndex : 5,
																							stack : 1,
																							legendID : 0
																						},
																						{
																							name : "Network Stats",
																							fontFamily : 'proxima_nova_rgregular',
																							legendIndex : 0,
																							legendID : 0,
																							showCheckbox : true,
																							selected : true,
																							events : {
																								legendItemClick : function() {
																									return false;
																								}
																							}
																						} ];
																			}

																			axis = [
																					{ // Primary yAxis
																						gridLineWidth : 0,
																						tickWidth : 1,
																						lineWidth : 1,
																						title : {
																							text : ''
																						},
																						labels : {
																							format : '{value}%',
																							fontFamily : 'proxima_nova_rgregular',
																							style : {
																								color : '#363b4e'
																							},
																							formatter : function() {
																								if (this.isLast) {
																									return '';
																								}
																								return this.value
																										+ "%";
																							}
																						},
																						stackLabels : {
																							useHTML : true,
																							qTotals : $scope.notificationIcons_failure,
																							enabled : true,
																							style : {
																								fontWeight : 'bold'
																							},
																							formatter : function() {
																								if (this.stack == 1) {
																									return '';
																								}
																								return this.options.qTotals[this.x];
																							}
																						},
																						showEmpty : false
																					},
																					{
																						// Secondary yAxis
																						gridLineWidth : 0,
																						tickWidth : 1,
																						lineWidth : 1,
																						min : 0,
																						title : {
																							text : $scope.staticLabels.refresh_volume,
																							style : {
																								fontFamily : 'proxima_nova_rgregular',
																								color : '#144173'
																							}
																						},
																						labels : {
																							fontFamily : 'proxima_nova_rgregular',
																							style : {
																								color : '#144173'
																							}
																						},
																						opposite : true,
																						showEmpty : false

																					} ];
																			definedseries = seriesFailure;
																			var seriesLatencyFailures = [
																					{
																						name : $scope.staticLabels.latency_Label,
																						yAxis : 0,
																						color : 'rgba(41, 133, 219, 0.5)',
																						pointWidth : 24,
																						fontFamily : 'proxima_nova_rgregular',
																						pointPadding : 0,
																						data : topFailureSitesLatencyData,
																						index : 0,
																						legendIndex : 0,
																						stack : 2,
																						legendID : 1
																					},
																					{
																						name : $scope.staticLabels.latency_Label,
																						stacking : false,
																						yAxis : 0,
																						color : '#e1f5fe',
																						pointWidth : 12,
																						fontFamily : 'proxima_nova_rgregular',
																						pointPadding : 0,
																						data : topFailureNWSitesLatencyData,
																						index : 1,
																						legendIndex : 1,
																						stack : 1,
																						legendID : 0
																					},
																					{
																						name : "Network Stats",
																						fontFamily : 'proxima_nova_rgregular',
																						legendIndex : 0,
																						legendID : 0,
																						showCheckbox : true,
																						selected : true,
																						events : {
																							legendItemClick : function() {
																								return false;
																							}
																						}
																					} ];

																			var latencyaxis = [ { // Primary yAxis
																				gridLineWidth : 0,
																				tickWidth : 1,
																				lineWidth : 1,
																				title : {
																					text : $scope.staticLabels.latency_Label,
																					style : {
																						fontFamily : 'proxima_nova_rgregular',
																						color : '#4c9ce3'
																					}
																				},
																				labels : {
																					format : '{value} Sec',
																					fontFamily : 'proxima_nova_rgregular',
																					style : {
																						color : '#4c9ce3'
																					}
																				},
																				formatter : function() {
																					if (this.isLast) {
																						return '';
																					}
																					return this.value;
																				},
																				stackLabels : {
																					useHTML : true,
																					qTotals : $scope.notificationIcons_failure,
																					enabled : true,
																					style : {
																						fontWeight : 'bold'
																					},
																					formatter : function() {
																						return this.options.qTotals[this.x];
																					}
																				},
																				showEmpty : false
																			} ];
																			definedLatencyseries = seriesLatencyFailures;
																			$(function() {
																				(function(
																						H) {
																					H
																							.wrap(
																									H.Legend.prototype,
																									'positionCheckboxes',
																									function(
																											p,
																											scrollOffset) {
																										var alignAttr = this.group.alignAttr, translateY, clipHeight = this.clipHeight
																												|| this.legendHeight;

																										if (alignAttr) {
																											translateY = alignAttr.translateY;
																											H
																													.each(
																															this.allItems,
																															function(
																																	item) {
																																var checkbox = item.checkbox, bBox = item.legendItem
																																		.getBBox(true), top;

																																if (checkbox) {
																																	top = (translateY
																																			+ checkbox.y
																																			+ (scrollOffset || 0) + 3);
																																	H
																																			.css(
																																					checkbox,
																																					{
																																						left : (alignAttr.translateX
																																								+ item.checkboxOffset
																																								+ checkbox.x
																																								- 60 - bBox.width)
																																								+ 'px',
																																						top : top
																																								- 3
																																								+ 'px',
																																						display : top > translateY - 1
																																								&& top < translateY
																																										+ clipHeight
																																										- 1 ? ''
																																								: 'none',
																																						width : 16 + 'px',
																																						height : 16 + 'px'
																																					});
																																}
																															});
																										}
																									});
																				})
																						(Highcharts);
																			});

																			(function(
																					H) {
																				var merge = H.merge;

																				H
																						.wrap(
																								H.Legend.prototype,
																								'getAllItems',
																								function() {
																									var allItems = [], chart = this.chart, options = this.options, legendID = options.legendID;

																									H
																											.each(
																													chart.series,
																													function(
																															series) {
																														if (series) {
																															var seriesOptions = series.options;

																															// use points or series for the legend item depending on legendType
																															if (!isNaN(legendID)
																																	&& (seriesOptions.legendID === legendID)) {
																																allItems = allItems
																																		.concat(series.legendItems
																																				|| (seriesOptions.legendType === 'point' ? series.data
																																						: series));
																															}
																														}
																													});

																									return allItems;
																								});

																				H
																						.wrap(
																								H.Chart.prototype,
																								'render',
																								function(
																										p) {
																									var chart = this, chartOptions = chart.options;

																									chart.leftLegend = new H.Legend(
																											chart,
																											merge(
																													chartOptions.legend,
																													chartOptions.legendLeft,
																													{
																														legendID : 0
																													}));

																									chart.rightLegend = new H.Legend(
																											chart,
																											merge(
																													chartOptions.legend,
																													chartOptions.legendRight,
																													{
																														legendID : 1
																													}));

																									p
																											.call(this);
																								});

																				H
																						.wrap(
																								H.Chart.prototype,
																								'redraw',
																								function(
																										p,
																										r,
																										a) {
																									var chart = this;

																									p
																											.call(
																													chart,
																													r,
																													a);

																									chart.leftLegend
																											.render();
																									chart.rightLegend
																											.render();
																								});

																				H
																						.wrap(
																								H.Legend.prototype,
																								'positionItem',
																								function(
																										p,
																										item) {
																									p
																											.call(
																													this,
																													item);
																								});
																			})
																					(Highcharts);

																			function hideLabel() {
																				var series = this.series;
																				$(
																						series)
																						.each(
																								function(
																										i,
																										serie) {
																									if (serie.legendSymbol
																											&& serie.userOptions.name == "Network Stats")
																										serie.legendSymbol
																												.destroy();
																								});
																			}

																			var topFailureRefreshChart = new Highcharts.Chart(
																					{
																						chart : {
																							renderTo : 'top_failures_refresh_stats_db',
																							zoomType : 'xy',
																							type : 'column',
																							height : 310,
																							marginBottom : 90,
																							spacingBottom : 30,
																							events : {
																								load : hideLabel
																							}
																						},
																						title : {
																							text : ''
																						},
																						xAxis : {
																							categories : fieldName,
																							labels : {
																								useHTML : true,
																								rotation : 0,
																								formatter : function() {
																									var f = this.value
																											.substring(
																													0,
																													this.value
																															.lastIndexOf("-"))
																											.trim();
																									var id = this.value
																											.substring(
																													this.value
																															.lastIndexOf("-") + 1)
																											.trim();

																									var s = '<a class="a-color cursor-pointer" id="top-failure-axis" title="'
																											+ f
																											+ '" ng-click="goToSiteDetailsFromGraph('
																											+ id
																											+ ',topFailure);">'
																									if (f.length < 9) {
																										s += f;
																									} else if (f.length < 14) {
																										s += f
																												.substring(
																														0,
																														9)
																												+ '<br/>'
																												+ f
																														.substring(
																																9,
																																f.length);
																									} else {
																										s += f
																												.substring(
																														0,
																														9)
																												+ '<br/>'
																												+ f
																														.substring(
																																9,
																																14);
																									}

																									if (f.length > 14) {
																										s += '...';
																									}
																									s += '</a>';

																									for (var i = 0; i < $scope.siteStatus_failure.length; i++) {
																										if (f == $scope.siteFullName_failure[i]
																												&& $scope.siteStatus_failure[i]
																														.toLowerCase()
																														.indexOf(
																																"beta") != -1) {
																											s += '<span style="color:#e72977;">(<b>&beta;</b>)</span>'
																										}
																									}
																									return s;
																								}
																							}
																						},
																						yAxis : axis,
																						tooltip : {
																							borderRadius : 0,
																							borderColor : '#D2EDFF',
																							shared : true,
																							useHTML : true,
																							formatter : function() {
																								var sitefromStats = null;
																								var siteNotificationMap = $scope.siteNotificationMap_failure;
																								var siteBetaMapName = null;
																								for (var i = 0; i < fieldName.length; i++) {
																									if (this.x == fieldName[i]) {
																										if ($scope.siteStatus_failure[i] != undefined
																												&& $scope.siteStatus_failure[i]
																														.toLowerCase()
																														.indexOf(
																																"beta") != -1) {
																											siteBetaMapName = '<span class="tooltip-top-name"> '
																													+ this.x
																													+ ' <span style="color:#e72977;">(Beta)</span></span>';
																										} else {
																											siteBetaMapName = '<span class="tooltip-top-name"> '
																													+ this.x
																													+ '</span>';
																										}

																										var s = '<div class="container-fluid-custom" style="margin:0;background-color:#FAFAFA;">'
																												+ $scope.siteFavicons_failure[i]
																												+ siteBetaMapName
																												+ '<br/><br/>'
																												+ $scope.siteAutoRefreshStatus_failure[i];
																										sitefromStats = $scope.notificationIcons_failure[i];
																										for (var j = 0; j < siteNotificationMap.length; j++) {
																											var mapEntry = siteNotificationMap[j];
																											if (mapEntry.siteName == fieldName[i]) {
																												var siteNotifications = mapEntry.siteNotifications;
																												for (var k = 0; k < siteNotifications.length; k++) {
																													s += '<img style="margin:0px 7px" height="16px" width="16px" src='
																															+ siteNotifications[k].categoryImg
																															+ '/><span class="tooltip-notification-label"> '
																															+ siteNotifications[k].notificationTitle
																															+ '<div class="tooltip-notification-date" >Tentative End Date : '
																															+ $filter(
																																	'dateConverter')
																																	(
																																			siteNotifications[k].notificationEndDate)
																															+ '</div>'
																															+ '</span><br/>';

																												}
																											}
																										}
																									}
																								}

																								s += '<table><tr style="background-color:#FAFAFA;">';
																								var failureTooltip = '';
																								var successTooltip = '';
																								var pSuccessTooltip = '';
																								var volumeTooltip = '';
																								var nwfailureTooltip = '';
																								var nwsuccessTooltip = '';
																								var nwvolumeTooltip = '';
																								var nwpSuccessTooltip = '';
																								$
																										.each(
																												this.points,
																												function() {
																													if (this.series.name != $scope.staticLabels.success_Label
																															&& this.series.userOptions.legendID == 1
																															&& this.series.name != "Partial Success"
																															&& this.series.name != $scope.staticLabels.refresh_volume
																															&& this.series.name != $scope.staticLabels.refresh_time) {
																														failureTooltip += '<td class="tooltip-top-labels"><div class="tooltip-top-box" style="background-color:'
																																+ this.series.color
																																+ ';float:left;"></div>&nbsp;<span style="color:#f1453d;">'
																																+ this.series.name
																																+ '&nbsp;&nbsp;&nbsp;<br/>&nbsp;&nbsp;&nbsp;&nbsp;'
																																+ this.y
																																+ '%</span></td><td>&nbsp;&nbsp;</td>';
																													} else if (this.series.name != $scope.staticLabels.refresh_volume
																															&& this.series.userOptions.legendID == 1
																															&& this.series.name == $scope.staticLabels.success_Label
																															&& this.series.name != $scope.staticLabels.refresh_time) {
																														successTooltip += '<td class="tooltip-top-labels"><div class="tooltip-top-box" style="background-color:'
																																+ this.series.color
																																+ ';float:left;"></div>&nbsp;<span style="color:#01b050;">'
																																+ this.series.name
																																+ '&nbsp;&nbsp;&nbsp;<br/>&nbsp;&nbsp;&nbsp;&nbsp;'
																																+ this.y
																																+ '%</span></td><td>&nbsp;&nbsp;</td>';
																													} else if (this.series.name != $scope.staticLabels.refresh_volume
																															&& this.series.userOptions.legendID == 1
																															&& this.series.name == "Partial Success"
																															&& this.series.name != $scope.staticLabels.refresh_time) {
																														pSuccessTooltip += '<td class="tooltip-top-labels"><div class="tooltip-top-box" style="background-color:'
																																+ this.series.color
																																+ ';float:left;"></div>&nbsp;<span style="color:#25f081;">'
																																+ this.series.name
																																+ '&nbsp;&nbsp;&nbsp;<br/>&nbsp;&nbsp;&nbsp;&nbsp;'
																																+ this.y
																																+ '%</span></td><td>&nbsp;&nbsp;</td>';
																													} else if (this.series.name == $scope.staticLabels.refresh_volume
																															&& this.series.userOptions.legendID == 1) {
																														volumeTooltip += '</tr><tr style="background-color:#FAFAFA;"><td><br/></td></tr><tr style="background-color:#FAFAFA;"><td class="tooltip-top-labels" style="color:'
																																+ this.series.color
																																+ '">'
																																+ this.series.name
																																+ '&nbsp;&nbsp;&nbsp;'
																																+ this.y
																																		.toLocaleString()
																																+ '</td>';
																													} else if (this.series.name != $scope.staticLabels.success_Label
																															&& this.series.userOptions.legendID == 0
																															&& this.series.name != "Partial Success"
																															&& this.series.name != $scope.staticLabels.refresh_volume
																															&& this.series.name != $scope.staticLabels.refresh_time) {
																														nwfailureTooltip += '<td class="tooltip-top-labels"><div class="tooltip-top-box" style="background-color:'
																																+ this.series.color
																																+ ';float:left;"></div>&nbsp;<span style="color:#f1453d;">'
																																+ this.series.name
																																+ '&nbsp;&nbsp;&nbsp;<br/>&nbsp;&nbsp;&nbsp;&nbsp;'
																																+ this.y
																																+ '%</span></td><td>&nbsp;&nbsp;</td>';
																													} else if (this.series.name != $scope.staticLabels.refresh_volume
																															&& this.series.userOptions.legendID == 0
																															&& this.series.name == $scope.staticLabels.success_Label
																															&& this.series.name != $scope.staticLabels.refresh_time) {
																														nwsuccessTooltip += '</tr><tr style="background-color:#FAFAFA;"><td><br/></td></tr><tr style="background-color:#FAFAFA;"><td class="tooltip-top-labels"><div class="tooltip-top-box" style="background-color:'
																																+ this.series.color
																																+ ';float:left;"></div>&nbsp;<span style="color:#01b050;">'
																																+ this.series.name
																																+ '&nbsp;&nbsp;&nbsp;<br/>&nbsp;&nbsp;&nbsp;&nbsp;'
																																+ this.y
																																+ '%</span></td><td>&nbsp;&nbsp;</td>';
																													} else if (this.series.name != $scope.staticLabels.refresh_volume
																															&& this.series.userOptions.legendID == 0
																															&& this.series.name == "Partial Success"
																															&& this.series.name != $scope.staticLabels.refresh_time) {
																														nwpSuccessTooltip += '<td class="tooltip-top-labels"><div class="tooltip-top-box" style="background-color:'
																																+ this.series.color
																																+ ';float:left;"></div>&nbsp;<span style="color:#25f081;">'
																																+ this.series.name
																																+ '&nbsp;&nbsp;&nbsp;<br/>&nbsp;&nbsp;&nbsp;&nbsp;'
																																+ this.y
																																+ '%</span></td><td>&nbsp;&nbsp;</td>';
																													} else if (this.series.name == $scope.staticLabels.refresh_volume) {
																														nwvolumeTooltip += '</tr><tr style="background-color:#FAFAFA;"><td><br/></td></tr><tr style="background-color:#FAFAFA;"><td class="tooltip-top-labels" style="color:'
																																+ this.series.color
																																+ '">'
																																+ this.series.name
																																+ '&nbsp;&nbsp;&nbsp;'
																																+ this.y
																																		.toLocaleString()
																																+ '</td>';
																													}
																												});

																								s += successTooltip
																										+ pSuccessTooltip
																										+ failureTooltip
																										+ volumeTooltip
																										+ '</tr>'
																										+ nwsuccessTooltip
																										+ nwpSuccessTooltip
																										+ nwfailureTooltip
																										+ nwvolumeTooltip
																										+ '</tr><tr style="background-color:#FAFAFA;"><td><br/></td></tr></table></div>';
																								return s;
																							},
																						},
																						plotOptions : {
																							column : {
																								stacking : 'normal'
																							},
																							series : {
																								pointPadding : 0,
																								borderWidth : 0,
																								shadow : false,
																								events : {
																									checkboxClick : function(
																											e) {
																										var series = this.chart.series;
																										if (e.checked) {
																											for (i = 0; i < series.length; i++) {
																												series[i]
																														.show();
																											}
																										} else {
																											for (i = 0; i < series.length; i++) {
																												if (series[i].userOptions.legendID == this.userOptions.legendID) {
																													series[i]
																															.hide();
																												}
																											}
																										}
																									},
																								}
																							}

																						},
																						legend : {
																							align : 'right',
																							verticalAlign : 'bottom',
																							x : -10,
																							y : 10,
																							floating : false,
																							fontFamily : 'proxima_nova_rgregular',
																							itemHoverStyle : {
																								color : '#FF0000'
																							}
																						},
																						legendLeft : {
																							align : 'right',
																							x : -10,
																							y : 30,
																							floating : false,
																							fontFamily : 'proxima_nova_rgregular',
																							itemHoverStyle : {
																								color : '#FF0000'
																							}
																						},
																						legendRight : {
																							align : 'right',
																							x : -10,
																							y : 10,
																							floating : false,
																							fontFamily : 'proxima_nova_rgregular',
																							itemHoverStyle : {
																								color : '#FF0000'
																							}
																						},

																						series : definedseries,
																						credits : {
																							enabled : false
																						}
																					},
																					function() {
																						var element = $(".highcharts-xaxis-labels span a#top-failure-axis");
																						$compile(
																								element)
																								(
																										$scope);

																					});
																			$scope.displayTopFailureLoading = false;

																			var topFailuresLatencyChart = new Highcharts.Chart(
																					{
																						chart : {
																							renderTo : 'top_failures_latency_stats_db',
																							zoomType : 'xy',
																							type : 'column',
																							height : 310,
																							marginBottom : 90,
																							spacingBottom : 30,
																							events : {
																								load : hideLabel
																							}
																						},
																						title : {
																							text : ''
																						},
																						xAxis : {
																							categories : fieldName,
																							labels : {
																								useHTML : true,
																								rotation : 0,
																								formatter : function() {
																									var f = this.value
																											.substring(
																													0,
																													this.value
																															.lastIndexOf("-"))
																											.trim();
																									var id = this.value
																											.substring(
																													this.value
																															.lastIndexOf("-") + 1)
																											.trim();

																									var s = '<a class="a-color cursor-pointer" id="top-failure-latency-axis" title="'
																											+ f
																											+ '" ng-click="goToSiteDetailsFromGraph('
																											+ id
																											+ ',topFailure);">'
																									if (f.length < 9) {
																										s += f;
																									} else if (f.length < 14) {
																										s += f
																												.substring(
																														0,
																														9)
																												+ '<br/>'
																												+ f
																														.substring(
																																9,
																																f.length);
																									} else {
																										s += f
																												.substring(
																														0,
																														9)
																												+ '<br/>'
																												+ f
																														.substring(
																																9,
																																14);
																									}

																									if (f.length > 14) {
																										s += '...';
																									}
																									s += '</a>';
																									for (var i = 0; i < $scope.siteStatus.length; i++) {
																										if (f == $scope.siteFullName[i]
																												&& $scope.siteStatus[i]
																														.toLowerCase()
																														.indexOf(
																																"beta") != -1) {
																											s += '<span style="color:#e72977;">(<b>&beta;</b>)</span>'
																										}
																									}

																									return s;
																								}
																							}
																						},
																						yAxis : latencyaxis,
																						tooltip : {
																							borderColor : '#D2EDFF',
																							borderRadius : 0,
																							shared : true,
																							useHTML : true,
																							formatter : function() {
																								var sitefromStats = null;
																								var siteNotificationMap = $scope.siteNotificationMap;
																								for (var i = 0; i < fieldName.length; i++) {
																									sitefromStats = $scope.notificationIcons[i];
																									if (this.x == fieldName[i]) {
																										if ($scope.siteStatus[i] != undefined
																												&& $scope.siteStatus[i]
																														.toLowerCase()
																														.indexOf(
																																"beta") != -1) {
																											siteBetaMapName = '<span class="tooltip-top-name"> '
																													+ this.x
																													+ ' <span style="color:#e72977;">(Beta)</span></span>';
																										} else {
																											siteBetaMapName = '<span class="tooltip-top-name"> '
																													+ this.x
																													+ '</span>';
																										}

																										var s = '<div class="container-fluid-custom" style="margin:0;background-color:#FAFAFA;">'
																												+ $scope.siteFavicons[i]
																												+ siteBetaMapName
																												+ '<br/><br/>'
																												+ $scope.siteAutoRefreshStatus[i];
																										for (var j = 0; j < siteNotificationMap.length; j++) {
																											var mapEntry = siteNotificationMap[j];
																											if (mapEntry.siteName == fieldName[i]) {
																												var siteNotifications = mapEntry.siteNotifications;
																												for (var k = 0; k < siteNotifications.length; k++) {
																													if (sitefromStats != null) {
																														s += '<img style="margin:0px 7px" height="16px" width="16px" src='
																																+ siteNotifications[k].categoryImg
																																+ '/><span class="tooltip-notification-label"> '
																																+ siteNotifications[k].notificationTitle
																																+ '<div class="tooltip-notification-date" >Tentative End Date : '
																																+ $filter(
																																		'dateConverter')
																																		(
																																				siteNotifications[k].notificationEndDate)
																																+ '</div>'
																																+ '</span><br/>';
																													}
																												}
																											}
																										}

																									}
																								}

																								s += '<table><tr style="background-color:#FAFAFA;">';
																								var latencyTooltip = '';
																								var nwlatencyTooltip = '';
																								$
																										.each(
																												this.points,
																												function() {
																													if (this.series.name == $scope.staticLabels.refresh_time
																															&& this.series.userOptions.legendID == 0) {
																														nwlatencyTooltip += '</tr><tr style="background-color:#FAFAFA;"><td><br/></td></tr><tr style="background-color:#FAFAFA;"><td class="tooltip-top-labels"><div class="tooltip-top-box" style="background-color:'
																																+ this.series.color
																																+ ';float:left;"></div>&nbsp;<span style="color:#1e1d1c;">'
																																+ this.series.name
																																+ '&nbsp;&nbsp;&nbsp;<br/>&nbsp;&nbsp;&nbsp;&nbsp;'
																																+ this.y
																																+ ' Sec</span></td>';
																													} else if (this.series.name == $scope.staticLabels.refresh_time
																															&& this.series.userOptions.legendID == 1) {
																														latencyTooltip += '<td class="tooltip-top-labels"><div class="tooltip-top-box" style="background-color:'
																																+ this.series.color
																																+ ';float:left;"></div>&nbsp;<span style="color:#1e1d1c;">'
																																+ this.series.name
																																+ '&nbsp;&nbsp;&nbsp;<br/>&nbsp;&nbsp;&nbsp;&nbsp;'
																																+ this.y
																																+ ' Sec</span></td>';
																													}
																												});

																								s += latencyTooltip
																										+ nwlatencyTooltip
																										+ '</tr><tr style="background-color:#FAFAFA;"><td><br/></td></tr></table></div>';
																								return s;

																							},
																						},
																						plotOptions : {
																							column : {
																								stacking : 'normal'
																							},
																							series : {
																								pointPadding : 0,
																								borderWidth : 0,
																								shadow : false,
																								events : {
																									checkboxClick : function(
																											e) {
																										var series = this.chart.series;
																										if (e.checked) {
																											for (i = 0; i < series.length; i++) {
																												series[i]
																														.show();
																											}
																										} else {
																											for (i = 0; i < series.length; i++) {
																												if (series[i].userOptions.legendID == this.userOptions.legendID) {
																													series[i]
																															.hide();
																												}
																											}
																										}
																									},
																								}
																							}
																						},
																						legend : {
																							verticalAlign : 'bottom',
																							x : -10,
																							y : 10,
																							floating : false,
																							fontFamily : 'proxima_nova_rgregular',
																							itemHoverStyle : {
																								color : '#FF0000'
																							}
																						},
																						legendLeft : {
																							align : 'right',
																							x : -10,
																							y : 30,
																							floating : false,
																							fontFamily : 'proxima_nova_rgregular',
																							itemHoverStyle : {
																								color : '#FF0000'
																							}
																						},
																						legendRight : {
																							align : 'right',
																							x : -10,
																							y : 10,
																							floating : false,
																							fontFamily : 'proxima_nova_rgregular',
																							itemHoverStyle : {
																								color : '#FF0000'
																							}
																						},
																						series : definedLatencyseries,

																						credits : {
																							enabled : false
																						}

																					},
																					function() {
																						var element = $(".highcharts-xaxis-labels span a#top-failure-latency-axis");
																						$compile(
																								element)
																								(
																										$scope);

																					});

																			var resizeTimerFailure;
																			var tFail = 0;

																			//Event to handle resizing
																			$(
																					window)
																					.resize(
																							function() {
																								clearTimeout(resizeTimerFailure);
																								if (tFail == 0) {
																									tFail = 1;
																									resizeTimerFailure = setTimeout(
																											ResizedFailure,
																											100);
																								}
																							});

																			//Actual Resizing Event
																			function ResizedFailure() {
																				$timeout(
																						function() {
																							var element = $(".highcharts-xaxis-labels span a#top-failure-latency-axis");
																							var elementLatency = $(".highcharts-xaxis-labels span a#top-failure-axis");
																							$compile(
																									element)
																									(
																											$scope);
																							$compile(
																									elementLatency)
																									(
																											$scope);
																							tFail = 0;
																						},
																						500);

																			}
																			;
																			$scope.displayTopFailureLatencyLoading = false;

																		});

														$scope.show = true;
														$scope.displayLoading = false;
													} catch (e) {
														$scope.topFailureSites = null;
														$scope.displayTopFailureLoading = false;
														$scope.displayTopFailureLatencyLoading = false;
														$scope.TopFailureErrorMsg = $scope.staticLabels.TopFailureJSErrorMsg;
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

												})

							};

							$scope.goToSiteDetailsFromGraph = function(eve,
									reportType) {

								$scope.toggle();
								$scope.pageTypeGraph = 'dashboard';
								$scope.getSiteDetailById(eve, 'click');
								ga('send', 'event', 'href', reportType, eve, 25);

							};

							$scope.topVolumeSiteStats = function() {

								$scope.TopVolumeErrorMsg = null;
								$scope.topVolumeStats = null;
								$scope.displayTopLoading = true;
								$scope.displayTopLatencyLoading = true;

								if ($scope.cobrandIAVStat == true) {
									var cobrandIAVStat = $scope.staticLabels.iav;
								} else if ($scope.cobrandIAVStat == false) {
									var cobrandIAVStat = $scope.staticLabels.refresh_label;
								}
								if ($scope.cobrandPfmType == 'IAV') {
									var cobrandIAVStat = $scope.staticLabels.iav;
								} else if ($scope.cobrandPfmType == 'REFRESH') {
									var cobrandIAVStat = $scope.staticLabels.refresh_label;
								} else if ($scope.cobrandPfmType == 'Add') {
									var cobrandIAVStat = 'Add';
								}

								var include_list = "";
								var consolidatedBy = "";
								if ($scope.getConsolidatedChannel == true) {
									consolidatedBy = "channel";
								}

								$scope.topVolumeStatsFilter = {
									reportType : cobrandIAVStat,
									customerId : $scope.customerId,
									groupBy : $scope.staticLabels.provider_label,
									cobrandId : $scope.selectedCobrand,
									timeSlot : $scope.selectedOverallRefreshSnapShotTimeSlot,
									numRecords : "15",
									top : $scope.staticLabels.top_volume,
									consolidatedBy : consolidatedBy,
									include : include_list
								};

								var data = angular
										.copy($scope.topVolumeStatsFilter);
								var topVolumeSitesSuccessRefreshData = Array();
								var topVolumeSitespSuccessRefreshData = Array();
								var topVolumeSitesAgentFailureRefreshData = Array();
								var topVolumeSitesSiteFailureRefreshData = Array();
								var topVolumeSitesUARFailureRefreshData = Array();
								var topVolumeSitesLatencyData = Array();
								var siteIds = Array();
								var overall_total = Array();
								var fieldName = Array();
								$scope.topVolumeslastupdated = null;
								//Get Top Volume Stats
								dashboardService
										.refreshLatencyStats(
												data,
												function(data, status, headers,
														config) {

													$scope.TopVolumeErrorMsg = null;
													$scope.topVolumeStats = null;

													try {
														var response = JSON
																.parse(data);

														if (data == null
																|| data == ""
																|| data == "{}") {
															$scope.TopVolumeErrorCode = 404;
															$scope.TopVolumeErrorMsg = $scope.staticLabels.NoDatafound;
															$scope.displayTopLoading = false;
															$scope.displayTopLatencyLoading = false;
															return;
														} else if (data
																.indexOf($scope.staticLabels.error_code) != -1) {
															var errResponse = JSON
																	.parse(data);
															if (errResponse.errorCode == $scope.staticLabels.invalid_session_error_code) {
																$scope.TopVolumeErrorMsg = $scope.staticLabels.invalid_session;
																$scope.displayTopLoading = false;
																$scope.displayTopLatencyLoading = false;
																return;
															}
															$scope.TopVolumeErrorCode = errResponse.errorCode;
															$scope.TopVolumeErrorMsg = $scope.staticLabels.TopVolumeErrorMsg;
															$scope.displayTopLoading = false;
															$scope.displayTopLatencyLoading = false;
															return;
														}

														$scope.topVolumeStats = response;
														var infoVal = response.refreshStats.info;
														if (infoVal.length > 0
																&& infoVal[0].lastModified != undefined) {
															$scope.topVolumeslastupdated = infoVal[0].lastModified;
														}
														for (var i = 0; i < infoVal.length; i++) {
															siteIds[i] = infoVal[i].id;
															fieldName[i] = infoVal[i].name
																	+ " - "
																	+ infoVal[i].id;
															overall_total[i] = Number(infoVal[i].summary.totalVolume);
															topVolumeSitesSuccessRefreshData[i] = Number(((infoVal[i].summary.success.volume / (overall_total[i])) * 100)
																	.toFixed(2));
															if (cobrandIAVStat == 'Add') {
																topVolumeSitespSuccessRefreshData[i] = Number(((infoVal[i].summary.partialSuccess.volume / (overall_total[i])) * 100)
																		.toFixed(2));
															}

															var failureNode = infoVal[i].summary.failure;

															for (var j = 0; j < failureNode.length; j++) {

																var failureType = failureNode[j].type;
																if (failureType == $scope.staticLabels.tech_err_label) {
																	topVolumeSitesAgentFailureRefreshData[i] = Number((((failureNode[j].volume) / (overall_total[i])) * 100)
																			.toFixed(2));
																} else if (failureType == $scope.staticLabels.site_label) {
																	topVolumeSitesSiteFailureRefreshData[i] = Number((((failureNode[j].volume) / (overall_total[i])) * 100)
																			.toFixed(2));
																} else if (failureType == $scope.staticLabels.uar_label) {
																	topVolumeSitesUARFailureRefreshData[i] = Number((((failureNode[j].volume) / (overall_total[i])) * 100)
																			.toFixed(2));
																}

															}

															if ((infoVal[i].summary.latency) != undefined) {
																topVolumeSitesLatencyData[i] = Number(infoVal[i].summary.latency.avg);
															}

														}

														$scope
																.callVolumeSiteDetails(
																		siteIds,
																		function() {

																			var topVolumeNWSitesSuccessRefreshData = Array();
																			var topVolumeNWSitespSuccessRefreshData = Array();
																			var topVolumeNWSitesAgentFailureRefreshData = Array();
																			var topVolumeNWSitesSiteFailureRefreshData = Array();
																			var topVolumeNWSitesUARFailureRefreshData = Array();
																			var topVolumeNWSitesLatencyData = Array();
																			var overall_nw_total = Array();

																			for (var i = 0; i < siteIds.length; i++) {
																				for (var j = 0; j < $scope.nwsiteIds.length; j++) {
																					if (siteIds[i] == $scope.nwsiteIds[j]) {
																						topVolumeNWSitesSuccessRefreshData[i] = $scope.topVolumeNWSitesSuccessRefreshData[j];
																						if (cobrandIAVStat == 'Add') {
																							topVolumeNWSitespSuccessRefreshData[i] = $scope.topVolumeNWSitespSuccessRefreshData[j];
																						}
																						topVolumeNWSitesAgentFailureRefreshData[i] = $scope.topVolumeNWSitesAgentFailureRefreshData[j];
																						topVolumeNWSitesSiteFailureRefreshData[i] = $scope.topVolumeNWSitesSiteFailureRefreshData[j];
																						topVolumeNWSitesUARFailureRefreshData[i] = $scope.topVolumeNWSitesUARFailureRefreshData[j];
																						topVolumeNWSitesLatencyData[i] = $scope.topVolumeNWSitesLatencyData[j];
																						overall_nw_total[i] = $scope.overall_nw_total[j];
																						break;
																					} else if (siteIds.length != $scope.nwsiteIds.length
																							&& j == ($scope.nwsiteIds.length - 1)) {
																						topVolumeNWSitesSuccessRefreshData[i] = "0";
																						if (cobrandIAVStat == 'Add') {
																							topVolumeNWSitespSuccessRefreshData[i] = "0";
																						}
																						topVolumeNWSitesAgentFailureRefreshData[i] = "0";
																						topVolumeNWSitesSiteFailureRefreshData[i] = "0";
																						topVolumeNWSitesUARFailureRefreshData[i] = "0";
																						topVolumeNWSitesLatencyData[i] = "0";
																						overall_nw_total[i] = "0";
																						break;
																					}
																				}
																			}

																			var axis = [];
																			var definedseries = [];
																			var definedLatencyseries = [];

																			if (cobrandIAVStat == 'Add') {
																				var seriesVolume = [
																						{
																							name : $scope.staticLabels.technical_failure_Label,
																							yAxis : 0,
																							color : '#c91d1d',
																							pointWidth : 14,
																							fontFamily : 'proxima_nova_rgregular',
																							pointPadding : 0,
																							data : topVolumeSitesAgentFailureRefreshData,
																							index : 0,
																							legendIndex : 2,
																							stack : 2,
																							legendID : 1
																						},
																						{
																							name : $scope.staticLabels.site_failure_Label,
																							yAxis : 0,
																							color : '#ffa000',
																							pointWidth : 14,
																							fontFamily : 'proxima_nova_rgregular',
																							pointPadding : 0,
																							data : topVolumeSitesSiteFailureRefreshData,
																							index : 1,
																							legendIndex : 3,
																							stack : 2,
																							legendID : 1
																						},
																						{
																							name : $scope.staticLabels.uar_failure_Label,
																							yAxis : 0,
																							color : '#c5ea3a',
																							pointWidth : 14,
																							fontFamily : 'proxima_nova_rgregular',
																							pointPadding : 0,
																							data : topVolumeSitesUARFailureRefreshData,
																							index : 2,
																							legendIndex : 4,
																							stack : 2,
																							legendID : 1
																						},
																						{
																							name : "Partial Success",
																							yAxis : 0,
																							color : '#25f081',
																							pointWidth : 14,
																							fontFamily : 'proxima_nova_rgregular',
																							pointPadding : 0,
																							data : topVolumeSitespSuccessRefreshData,
																							index : 3,
																							legendIndex : 1,
																							stack : 2,
																							legendID : 1
																						},
																						{
																							name : $scope.staticLabels.successful_Label,
																							yAxis : 0,
																							color : '#01b050',
																							pointPadding : 0,
																							fontFamily : 'proxima_nova_rgregular',
																							pointWidth : 14,
																							data : topVolumeSitesSuccessRefreshData,
																							index : 4,
																							legendIndex : 0,
																							stack : 2,
																							legendID : 1
																						},
																						{
																							name : $scope.staticLabels.refresh_volume,
																							type : 'spline',
																							yAxis : 1,
																							color : '#144173',
																							pointPadding : 0,
																							dashStyle : 'Dash',
																							marker : {
																								enabled : true,
																								symbol : 'circle',
																								fillColor : '#FFFFFF',
																								lineWidth : 1,
																								lineColor : '#144173'
																							},
																							fontFamily : 'proxima_nova_rgregular',
																							data : overall_total,
																							index : 5,
																							legendIndex : 5,
																							stack : 2,
																							legendID : 1
																						},
																						{
																							name : $scope.staticLabels.technical_failure_Label,
																							yAxis : 0,
																							color : '#ef9a9a',
																							pointWidth : 7,
																							fontFamily : 'proxima_nova_rgregular',
																							pointPadding : 0,
																							data : topVolumeNWSitesAgentFailureRefreshData,
																							index : 0,
																							legendIndex : 3,
																							stack : 1,
																							legendID : 0
																						},
																						{
																							name : $scope.staticLabels.site_failure_Label,
																							yAxis : 0,
																							color : '#ffd54f',
																							pointWidth : 7,
																							fontFamily : 'proxima_nova_rgregular',
																							pointPadding : 0,
																							data : topVolumeNWSitesSiteFailureRefreshData,
																							index : 1,
																							legendIndex : 4,
																							stack : 1,
																							legendID : 0
																						},
																						{
																							name : $scope.staticLabels.uar_failure_Label,
																							yAxis : 0,
																							color : '#e6ee9c',
																							pointWidth : 7,
																							fontFamily : 'proxima_nova_rgregular',
																							pointPadding : 0,
																							data : topVolumeNWSitesUARFailureRefreshData,
																							index : 2,
																							legendIndex : 5,
																							stack : 1,
																							legendID : 0
																						},
																						{
																							name : "Partial Success",
																							yAxis : 0,
																							color : '#86F7B9',
																							pointWidth : 7,
																							fontFamily : 'proxima_nova_rgregular',
																							pointPadding : 0,
																							data : topVolumeNWSitespSuccessRefreshData,
																							index : 3,
																							legendIndex : 2,
																							stack : 1,
																							legendID : 0
																						},
																						{
																							name : $scope.staticLabels.successful_Label,
																							yAxis : 0,
																							color : '#a5d6a7',
																							fontFamily : 'proxima_nova_rgregular',
																							pointWidth : 7,
																							pointPadding : 0,
																							data : topVolumeNWSitesSuccessRefreshData,
																							index : 4,
																							legendIndex : 1,
																							stack : 1,
																							legendID : 0
																						},
																						{
																							name : $scope.staticLabels.refresh_volume,
																							type : 'spline',
																							yAxis : 1,
																							pointPadding : 0,
																							color : '#9e9e9e',
																							dashStyle : 'Dash',
																							marker : {
																								enabled : true,
																								symbol : 'circle',
																								fillColor : '#FFFFFF',
																								lineWidth : 1,
																								lineColor : '#144173'
																							},
																							fontFamily : 'proxima_nova_rgregular',
																							data : overall_nw_total,
																							index : 5,
																							legendIndex : 6,
																							stack : 1,
																							legendID : 0
																						},
																						{
																							name : "Network Stats",
																							fontFamily : 'proxima_nova_rgregular',
																							legendIndex : 0,
																							legendID : 0,
																							showCheckbox : true,
																							selected : true,
																							events : {
																								legendItemClick : function() {
																									return false;
																								}
																							}
																						} ];
																			} else {
																				var seriesVolume = [
																						{
																							name : $scope.staticLabels.technical_failure_Label,
																							yAxis : 0,
																							color : '#c91d1d',
																							pointWidth : 14,
																							fontFamily : 'proxima_nova_rgregular',
																							pointPadding : 0,
																							data : topVolumeSitesAgentFailureRefreshData,
																							index : 0,
																							legendIndex : 1,
																							stack : 2,
																							legendID : 1
																						},
																						{
																							name : $scope.staticLabels.site_failure_Label,
																							yAxis : 0,
																							color : '#ffa000',
																							pointWidth : 14,
																							fontFamily : 'proxima_nova_rgregular',
																							pointPadding : 0,
																							data : topVolumeSitesSiteFailureRefreshData,
																							index : 1,
																							legendIndex : 2,
																							stack : 2,
																							legendID : 1
																						},
																						{
																							name : $scope.staticLabels.uar_failure_Label,
																							yAxis : 0,
																							color : '#c5ea3a',
																							pointWidth : 14,
																							fontFamily : 'proxima_nova_rgregular',
																							pointPadding : 0,
																							data : topVolumeSitesUARFailureRefreshData,
																							index : 2,
																							legendIndex : 3,
																							stack : 2,
																							legendID : 1
																						},
																						{
																							name : $scope.staticLabels.successful_Label,
																							yAxis : 0,
																							color : '#01b050',
																							fontFamily : 'proxima_nova_rgregular',
																							pointWidth : 14,
																							pointPadding : 0,
																							data : topVolumeSitesSuccessRefreshData,
																							index : 3,
																							legendIndex : 0,
																							stack : 2,
																							legendID : 1
																						},
																						{
																							name : $scope.staticLabels.refresh_volume,
																							type : 'spline',
																							yAxis : 1,
																							pointPadding : 0,
																							color : '#144173',
																							dashStyle : 'Dash',
																							marker : {
																								enabled : true,
																								symbol : 'circle',
																								fillColor : '#FFFFFF',
																								lineWidth : 1,
																								lineColor : '#144173'
																							},
																							fontFamily : 'proxima_nova_rgregular',
																							data : overall_total,
																							index : 4,
																							legendIndex : 4,
																							stack : 2,
																							legendID : 1
																						},
																						{
																							name : $scope.staticLabels.technical_failure_Label,
																							yAxis : 0,
																							color : '#ef9a9a',
																							pointWidth : 7,
																							fontFamily : 'proxima_nova_rgregular',
																							pointPadding : 0,
																							data : topVolumeNWSitesAgentFailureRefreshData,
																							index : 0,
																							legendIndex : 2,
																							stack : 1,
																							legendID : 0
																						},
																						{
																							name : $scope.staticLabels.site_failure_Label,
																							yAxis : 0,
																							color : '#ffd54f',
																							pointWidth : 7,
																							fontFamily : 'proxima_nova_rgregular',
																							pointPadding : 0,
																							data : topVolumeNWSitesSiteFailureRefreshData,
																							index : 1,
																							legendIndex : 3,
																							stack : 1,
																							legendID : 0
																						},
																						{
																							name : $scope.staticLabels.uar_failure_Label,
																							yAxis : 0,
																							color : '#e6ee9c',
																							pointWidth : 7,
																							fontFamily : 'proxima_nova_rgregular',
																							pointPadding : 0,
																							data : topVolumeNWSitesUARFailureRefreshData,
																							index : 2,
																							legendIndex : 4,
																							stack : 1,
																							legendID : 0
																						},
																						{
																							name : $scope.staticLabels.successful_Label,
																							yAxis : 0,
																							color : '#a5d6a7',
																							pointPadding : 0,
																							fontFamily : 'proxima_nova_rgregular',
																							pointWidth : 7,
																							data : topVolumeNWSitesSuccessRefreshData,
																							index : 3,
																							legendIndex : 1,
																							stack : 1,
																							legendID : 0
																						},
																						{
																							name : $scope.staticLabels.refresh_volume,
																							type : 'spline',
																							yAxis : 1,
																							pointPadding : 0,
																							color : '#9e9e9e',
																							dashStyle : 'Dash',
																							marker : {
																								enabled : true,
																								symbol : 'circle',
																								fillColor : '#FFFFFF',
																								lineWidth : 1,
																								lineColor : '#144173'
																							},
																							fontFamily : 'proxima_nova_rgregular',
																							data : overall_nw_total,
																							index : 4,
																							legendIndex : 5,
																							stack : 1,
																							legendID : 0
																						},
																						{
																							name : "Network Stats",
																							fontFamily : 'proxima_nova_rgregular',
																							legendIndex : 0,
																							legendID : 0,
																							showCheckbox : true,
																							selected : true,
																							events : {
																								legendItemClick : function() {
																									return false;
																								}
																							}
																						} ]
																			}
																			axis = [
																					{ // Primary yAxis
																						gridLineWidth : 0,
																						tickWidth : 1,
																						lineWidth : 1,
																						title : {
																							text : ''
																						},
																						labels : {
																							fontFamily : 'proxima_nova_rgregular',
																							style : {
																								color : '#363b4e'
																							},
																							formatter : function() {
																								if (this.isLast) {
																									return '';
																								}
																								return this.value
																										+ "%";
																							}
																						},
																						stackLabels : {
																							useHTML : true,
																							qTotals : $scope.notificationIcons,
																							enabled : true,
																							style : {
																								fontWeight : 'bold'
																							},
																							formatter : function() {
																								if (this.stack == 1) {
																									return '';
																								}
																								return this.options.qTotals[this.x];
																							}
																						},
																						showEmpty : false
																					},
																					{
																						// Secondary yAxis
																						gridLineWidth : 0,
																						tickWidth : 1,
																						lineWidth : 1,
																						min : 0,
																						title : {
																							text : $scope.staticLabels.refresh_volume,
																							style : {
																								fontFamily : 'proxima_nova_rgregular',
																								color : '#144173'
																							}
																						},
																						labels : {
																							fontFamily : 'proxima_nova_rgregular',
																							style : {
																								color : '#144173'
																							}
																						},
																						opposite : true,
																						showEmpty : false
																					} ];
																			definedseries = seriesVolume;
																			var seriesLatencyVolume = [
																					{
																						name : $scope.staticLabels.latency_Label,
																						yAxis : 0,
																						color : 'rgba(41, 133, 219, 0.5)',
																						pointWidth : 24,
																						fontFamily : 'proxima_nova_rgregular',
																						pointPadding : 0,
																						data : topVolumeSitesLatencyData,
																						index : 0,
																						legendIndex : 0,
																						stack : 2,
																						legendID : 1
																					},
																					{
																						name : $scope.staticLabels.latency_Label,
																						stacking : false,
																						yAxis : 0,
																						color : '#e1f5fe',
																						pointWidth : 12,
																						fontFamily : 'proxima_nova_rgregular',
																						pointPadding : 0,
																						data : topVolumeNWSitesLatencyData,
																						index : 1,
																						legendIndex : 1,
																						stack : 1,
																						legendID : 0
																					},
																					{
																						name : "Network Stats",
																						fontFamily : 'proxima_nova_rgregular',
																						legendIndex : 0,
																						legendID : 0,
																						showCheckbox : true,
																						selected : true,
																						events : {
																							legendItemClick : function() {
																								return false;
																							}
																						}
																					} ];

																			var latencyaxis = [ { // Primary yAxis
																				gridLineWidth : 0,
																				tickWidth : 1,
																				lineWidth : 1,
																				title : {
																					text : $scope.staticLabels.latency_Label,
																					style : {
																						fontFamily : 'proxima_nova_rgregular',
																						color : '#4c9ce3'
																					}
																				},
																				labels : {
																					format : '{value} Sec',
																					fontFamily : 'proxima_nova_rgregular',
																					style : {
																						color : '#4c9ce3'
																					}
																				},
																				formatter : function() {
																					if (this.isLast) {
																						return '';
																					}
																					return this.value;
																				},
																				stackLabels : {
																					useHTML : true,
																					qTotals : $scope.notificationIcons,
																					enabled : true,
																					style : {
																						fontWeight : 'bold'
																					},
																					formatter : function() {
																						return this.options.qTotals[this.x];
																					}
																				},
																				showEmpty : false
																			} ];
																			definedLatencyseries = seriesLatencyVolume;
																			$(function() {
																				(function(
																						H) {
																					H
																							.wrap(
																									H.Legend.prototype,
																									'positionCheckboxes',
																									function(
																											p,
																											scrollOffset) {
																										var alignAttr = this.group.alignAttr, translateY, clipHeight = this.clipHeight
																												|| this.legendHeight;

																										if (alignAttr) {
																											translateY = alignAttr.translateY;
																											H
																													.each(
																															this.allItems,
																															function(
																																	item) {
																																var checkbox = item.checkbox, bBox = item.legendItem
																																		.getBBox(true), top;

																																if (checkbox) {
																																	top = (translateY
																																			+ checkbox.y
																																			+ (scrollOffset || 0) + 3);
																																	H
																																			.css(
																																					checkbox,
																																					{
																																						left : (alignAttr.translateX
																																								+ item.checkboxOffset
																																								+ checkbox.x
																																								- 60 - bBox.width)
																																								+ 'px',
																																						top : top
																																								- 3
																																								+ 'px',
																																						display : top > translateY - 1
																																								&& top < translateY
																																										+ clipHeight
																																										- 1 ? ''
																																								: 'none',
																																						width : 16 + 'px',
																																						height : 16 + 'px'
																																					});
																																}
																															});
																										}
																									});
																				})
																						(Highcharts);
																			});

																			(function(
																					H) {
																				var merge = H.merge;

																				H
																						.wrap(
																								H.Legend.prototype,
																								'getAllItems',
																								function() {
																									var allItems = [], chart = this.chart, options = this.options, legendID = options.legendID;

																									H
																											.each(
																													chart.series,
																													function(
																															series) {
																														if (series) {
																															var seriesOptions = series.options;

																															// use points or series for the legend item depending on legendType
																															if (!isNaN(legendID)
																																	&& (seriesOptions.legendID === legendID)) {
																																allItems = allItems
																																		.concat(series.legendItems
																																				|| (seriesOptions.legendType === 'point' ? series.data
																																						: series));
																															}
																														}
																													});

																									return allItems;
																								});

																				H
																						.wrap(
																								H.Chart.prototype,
																								'render',
																								function(
																										p) {
																									var chart = this, chartOptions = chart.options;

																									chart.leftLegend = new H.Legend(
																											chart,
																											merge(
																													chartOptions.legend,
																													chartOptions.legendLeft,
																													{
																														legendID : 0
																													}));

																									chart.rightLegend = new H.Legend(
																											chart,
																											merge(
																													chartOptions.legend,
																													chartOptions.legendRight,
																													{
																														legendID : 1
																													}));

																									p
																											.call(this);
																								});

																				H
																						.wrap(
																								H.Chart.prototype,
																								'redraw',
																								function(
																										p,
																										r,
																										a) {
																									var chart = this;

																									p
																											.call(
																													chart,
																													r,
																													a);

																									chart.leftLegend
																											.render();
																									chart.rightLegend
																											.render();
																								});

																				H
																						.wrap(
																								H.Legend.prototype,
																								'positionItem',
																								function(
																										p,
																										item) {
																									p
																											.call(
																													this,
																													item);
																								});
																			})
																					(Highcharts);

																			function hideLabel() {
																				var series = this.series;
																				$(
																						series)
																						.each(
																								function(
																										i,
																										serie) {
																									if (serie.legendSymbol
																											&& serie.userOptions.name == "Network Stats") {
																										serie.legendSymbol
																												.destroy();
																									}
																								});

																			}

																			var topVolumesRefreshChart = new Highcharts.Chart(
																					{
																						chart : {
																							renderTo : 'top_volumes_refresh_stats_db',
																							zoomType : 'xy',
																							type : 'column',
																							height : 310,
																							marginBottom : 90,
																							spacingBottom : 30,
																							events : {
																								load : hideLabel
																							}
																						},
																						title : {
																							text : ''
																						},
																						xAxis : {
																							categories : fieldName,
																							labels : {
																								useHTML : true,
																								rotation : 0,
																								formatter : function() {
																									var f = this.value
																											.substring(
																													0,
																													this.value
																															.lastIndexOf("-"))
																											.trim();
																									var id = this.value
																											.substring(
																													this.value
																															.lastIndexOf("-") + 1)
																											.trim();
																									var s = '<a class="a-color cursor-pointer" id="top-volume-axis" title="'
																											+ f
																											+ '" ng-click="goToSiteDetailsFromGraph('
																											+ id
																											+ ',topVolume);">'
																									if (f.length < 9) {
																										s += f;
																									} else if (f.length < 14) {
																										s += f
																												.substring(
																														0,
																														9)
																												+ '<br/>'
																												+ f
																														.substring(
																																9,
																																f.length);
																									} else {
																										s += f
																												.substring(
																														0,
																														9)
																												+ '<br/>'
																												+ f
																														.substring(
																																9,
																																14);
																									}

																									if (f.length > 14) {
																										s += '...';
																									}
																									s += '</a>';
																									for (var i = 0; i < $scope.siteStatus.length; i++) {
																										if (f == $scope.siteFullName[i]
																												&& $scope.siteStatus[i]
																														.toLowerCase()
																														.indexOf(
																																"beta") != -1) {
																											s += '<span style="color:#e72977;">(<b>&beta;</b>)</span>'
																										}
																									}

																									return s;
																								}
																							}
																						},
																						yAxis : axis,
																						tooltip : {
																							borderColor : '#D2EDFF',
																							borderRadius : 0,
																							shared : true,
																							useHTML : true,
																							formatter : function() {
																								var sitefromStats = null;
																								var siteNotificationMap = $scope.siteNotificationMap;
																								for (var i = 0; i < fieldName.length; i++) {
																									sitefromStats = $scope.notificationIcons[i];
																									if (this.x == fieldName[i]) {
																										if ($scope.siteStatus[i] != undefined
																												&& $scope.siteStatus[i]
																														.toLowerCase()
																														.indexOf(
																																"beta") != -1) {
																											siteBetaMapName = '<span class="tooltip-top-name"> '
																													+ this.x
																													+ ' <span style="color:#e72977;">(Beta)</span></span>';
																										} else {
																											siteBetaMapName = '<span class="tooltip-top-name"> '
																													+ this.x
																													+ '</span>';
																										}

																										var s = '<div class="container-fluid-custom" style="margin:0;background-color:#FAFAFA;">'
																												+ $scope.siteFavicons[i]
																												+ siteBetaMapName
																												+ '<br/><br/>'
																												+ $scope.siteAutoRefreshStatus[i];
																										for (var j = 0; j < siteNotificationMap.length; j++) {
																											var mapEntry = siteNotificationMap[j];
																											if (mapEntry.siteName == fieldName[i]) {
																												var siteNotifications = mapEntry.siteNotifications;
																												for (var k = 0; k < siteNotifications.length; k++) {
																													if (sitefromStats != null) {
																														s += '<img style="margin:0px 7px" height="16px" width="16px" src='
																																+ siteNotifications[k].categoryImg
																																+ '/><span class="tooltip-notification-label"> '
																																+ siteNotifications[k].notificationTitle
																																+ '<div class="tooltip-notification-date" >Tentative End Date : '
																																+ $filter(
																																		'dateConverter')
																																		(
																																				siteNotifications[k].notificationEndDate)
																																+ '</div>'
																																+ '</span><br/>';
																													}
																												}
																											}
																										}

																									}
																								}

																								s += '<table><tr style="background-color:#FAFAFA;">';
																								var failureTooltip = '';
																								var successTooltip = '';
																								var volumeTooltip = '';
																								var pSuccessTooltip = '';
																								var nwfailureTooltip = '';
																								var nwsuccessTooltip = '';
																								var nwvolumeTooltip = '';
																								var nwpSuccessTooltip = '';
																								$
																										.each(
																												this.points,
																												function() {
																													if (this.series.name != $scope.staticLabels.success_Label
																															&& this.series.userOptions.legendID == 1
																															&& this.series.name != "Partial Success"
																															&& this.series.name != $scope.staticLabels.refresh_volume
																															&& this.series.name != $scope.staticLabels.refresh_time) {
																														failureTooltip += '<td class="tooltip-top-labels"><div class="tooltip-top-box" style="background-color:'
																																+ this.series.color
																																+ ';float:left;"></div>&nbsp;<span style="color:#f1453d;">'
																																+ this.series.name
																																+ '&nbsp;&nbsp;&nbsp;<br/>&nbsp;&nbsp;&nbsp;&nbsp;'
																																+ this.y
																																+ '%</span></td><td>&nbsp;&nbsp;</td>';
																													} else if (this.series.name != $scope.staticLabels.refresh_volume
																															&& this.series.userOptions.legendID == 1
																															&& this.series.name == $scope.staticLabels.success_Label
																															&& this.series.name != $scope.staticLabels.refresh_time) {
																														successTooltip += '<td class="tooltip-top-labels"><div class="tooltip-top-box" style="background-color:'
																																+ this.series.color
																																+ ';float:left;"></div>&nbsp;<span style="color:#01b050;">'
																																+ this.series.name
																																+ '&nbsp;&nbsp;&nbsp;<br/>&nbsp;&nbsp;&nbsp;&nbsp;'
																																+ this.y
																																+ '%</span></td><td>&nbsp;&nbsp;</td>';
																													} else if (this.series.name != $scope.staticLabels.refresh_volume
																															&& this.series.userOptions.legendID == 1
																															&& this.series.name == "Partial Success"
																															&& this.series.name != $scope.staticLabels.refresh_time) {
																														pSuccessTooltip += '<td class="tooltip-top-labels"><div class="tooltip-top-box" style="background-color:'
																																+ this.series.color
																																+ ';float:left;"></div>&nbsp;<span style="color:#25f081;">'
																																+ this.series.name
																																+ '&nbsp;&nbsp;&nbsp;<br/>&nbsp;&nbsp;&nbsp;&nbsp;'
																																+ this.y
																																+ '%</span></td><td>&nbsp;&nbsp;</td>';
																													} else if (this.series.name == $scope.staticLabels.refresh_volume
																															&& this.series.userOptions.legendID == 1) {
																														volumeTooltip += '</tr><tr style="background-color:#FAFAFA;"><td><br/></td></tr><tr style="background-color:#FAFAFA;"><td class="tooltip-top-labels" style="color:'
																																+ this.series.color
																																+ '">'
																																+ this.series.name
																																+ '&nbsp;&nbsp;&nbsp;'
																																+ this.y
																																		.toLocaleString()
																																+ '</td>';
																													} else if (this.series.name != $scope.staticLabels.success_Label
																															&& this.series.userOptions.legendID == 0
																															&& this.series.name != "Partial Success"
																															&& this.series.name != $scope.staticLabels.refresh_volume
																															&& this.series.name != $scope.staticLabels.refresh_time) {
																														nwfailureTooltip += '<td class="tooltip-top-labels"><div class="tooltip-top-box" style="background-color:'
																																+ this.series.color
																																+ ';float:left;"></div>&nbsp;<span style="color:#f1453d;">'
																																+ this.series.name
																																+ '&nbsp;&nbsp;&nbsp;<br/>&nbsp;&nbsp;&nbsp;&nbsp;'
																																+ this.y
																																+ '%</span></td><td>&nbsp;&nbsp;</td>';
																													} else if (this.series.name != $scope.staticLabels.refresh_volume
																															&& this.series.userOptions.legendID == 0
																															&& this.series.name == $scope.staticLabels.success_Label
																															&& this.series.name != $scope.staticLabels.refresh_time) {
																														nwsuccessTooltip += '</tr><tr style="background-color:#FAFAFA;"><td><br/></td></tr><tr style="background-color:#FAFAFA;"><td class="tooltip-top-labels"><div class="tooltip-top-box" style="background-color:'
																																+ this.series.color
																																+ ';float:left;"></div>&nbsp;<span style="color:#01b050;">'
																																+ this.series.name
																																+ '&nbsp;&nbsp;&nbsp;<br/>&nbsp;&nbsp;&nbsp;&nbsp;'
																																+ this.y
																																+ '%</span></td><td>&nbsp;&nbsp;</td>';
																													} else if (this.series.name != $scope.staticLabels.refresh_volume
																															&& this.series.userOptions.legendID == 0
																															&& this.series.name == "Partial Success"
																															&& this.series.name != $scope.staticLabels.refresh_time) {
																														nwpSuccessTooltip += '<td class="tooltip-top-labels"><div class="tooltip-top-box" style="background-color:'
																																+ this.series.color
																																+ ';float:left;"></div>&nbsp;<span style="color:#25f081;">'
																																+ this.series.name
																																+ '&nbsp;&nbsp;&nbsp;<br/>&nbsp;&nbsp;&nbsp;&nbsp;'
																																+ this.y
																																+ '%</span></td><td>&nbsp;&nbsp;</td>';
																													} else if (this.series.name == $scope.staticLabels.refresh_volume) {
																														nwvolumeTooltip += '</tr><tr style="background-color:#FAFAFA;"><td><br/></td></tr><tr style="background-color:#FAFAFA;"><td class="tooltip-top-labels" style="color:'
																																+ this.series.color
																																+ '">'
																																+ this.series.name
																																+ '&nbsp;&nbsp;&nbsp;'
																																+ this.y
																																		.toLocaleString()
																																+ '</td>';
																													}
																												});

																								s += successTooltip
																										+ pSuccessTooltip
																										+ failureTooltip
																										+ volumeTooltip
																										+ '</tr>'
																										+ nwsuccessTooltip
																										+ nwpSuccessTooltip
																										+ nwfailureTooltip
																										+ nwvolumeTooltip
																										+ '</tr><tr style="background-color:#FAFAFA;"><td><br/></td></tr></table></div>';
																								return s;

																							},
																						},
																						plotOptions : {
																							column : {
																								stacking : 'normal'
																							},
																							series : {
																								pointPadding : 0,
																								borderWidth : 0,
																								shadow : false,
																								events : {
																									checkboxClick : function(
																											e) {
																										var series = this.chart.series;
																										if (e.checked) {
																											for (i = 0; i < series.length; i++) {
																												series[i]
																														.show();
																											}
																										} else {
																											for (i = 0; i < series.length; i++) {
																												if (series[i].userOptions.legendID == this.userOptions.legendID) {
																													series[i]
																															.hide();
																												}
																											}
																										}
																									},
																								}
																							}
																						},
																						legend : {
																							align : 'right',
																							verticalAlign : 'bottom',
																							x : -10,
																							y : 10,
																							floating : false,
																							fontFamily : 'proxima_nova_rgregular',
																							itemHoverStyle : {
																								color : '#FF0000'
																							}
																						},
																						legendLeft : {
																							align : 'right',
																							x : -10,
																							y : 30,
																							floating : false,
																							fontFamily : 'proxima_nova_rgregular',
																							itemHoverStyle : {
																								color : '#FF0000'
																							}
																						},
																						legendRight : {
																							align : 'right',
																							x : -10,
																							y : 10,
																							floating : false,
																							fontFamily : 'proxima_nova_rgregular',
																							itemHoverStyle : {
																								color : '#FF0000'
																							}
																						},
																						series : definedseries,
																						credits : {
																							enabled : false
																						}
																					},
																					function() {
																						var element = $(".highcharts-xaxis-labels span a#top-volume-axis");
																						$compile(
																								element)
																								(
																										$scope);

																					});

																			$scope.displayTopLoading = false;

																			var topVolumesLatencyChart = new Highcharts.Chart(
																					{
																						chart : {
																							renderTo : 'top_volumes_latency_stats_db',
																							zoomType : 'xy',
																							type : 'column',
																							height : 310,
																							marginBottom : 90,
																							spacingBottom : 30,
																							events : {
																								load : hideLabel
																							}
																						},
																						title : {
																							text : ''
																						},
																						xAxis : {
																							categories : fieldName,
																							labels : {
																								useHTML : true,
																								rotation : 0,
																								formatter : function() {
																									var f = this.value
																											.substring(
																													0,
																													this.value
																															.lastIndexOf("-"))
																											.trim();
																									var id = this.value
																											.substring(
																													this.value
																															.lastIndexOf("-") + 1)
																											.trim();
																									var s = '<a class="a-color cursor-pointer" id="top-volume-latency-axis" title="'
																											+ f
																											+ '" ng-click="goToSiteDetailsFromGraph('
																											+ id
																											+ ',topVolume);">'
																									if (f.length < 9) {
																										s += f;
																									} else if (f.length < 14) {
																										s += f
																												.substring(
																														0,
																														9)
																												+ '<br/>'
																												+ f
																														.substring(
																																9,
																																f.length);
																									} else {
																										s += f
																												.substring(
																														0,
																														9)
																												+ '<br/>'
																												+ f
																														.substring(
																																9,
																																14);
																									}

																									if (f.length > 14) {
																										s += '...';
																									}
																									s += '</a>';
																									for (var i = 0; i < $scope.siteStatus.length; i++) {
																										if (f == $scope.siteFullName[i]
																												&& $scope.siteStatus[i]
																														.toLowerCase()
																														.indexOf(
																																"beta") != -1) {
																											s += '<span style="color:#e72977;">(<b>&beta;</b>)</span>'
																										}
																									}
																									return s;
																								}
																							}
																						},
																						yAxis : latencyaxis,
																						tooltip : {
																							borderColor : '#D2EDFF',
																							borderRadius : 0,
																							shared : true,
																							useHTML : true,
																							formatter : function() {
																								var sitefromStats = null;
																								var siteNotificationMap = $scope.siteNotificationMap;
																								for (var i = 0; i < fieldName.length; i++) {
																									sitefromStats = $scope.notificationIcons[i];
																									if (this.x == fieldName[i]) {
																										if ($scope.siteStatus[i] != undefined
																												&& $scope.siteStatus[i]
																														.toLowerCase()
																														.indexOf(
																																"beta") != -1) {
																											siteBetaMapName = '<span class="tooltip-top-name"> '
																													+ this.x
																													+ ' <span style="color:#e72977;">(Beta)</span></span>';
																										} else {
																											siteBetaMapName = '<span class="tooltip-top-name"> '
																													+ this.x
																													+ '</span>';
																										}

																										var s = '<div class="container-fluid-custom" style="margin:0;background-color:#FAFAFA;">'
																												+ $scope.siteFavicons[i]
																												+ siteBetaMapName
																												+ '<br/><br/>'
																												+ $scope.siteAutoRefreshStatus[i];
																										for (var j = 0; j < siteNotificationMap.length; j++) {
																											var mapEntry = siteNotificationMap[j];
																											if (mapEntry.siteName == fieldName[i]) {
																												var siteNotifications = mapEntry.siteNotifications;
																												for (var k = 0; k < siteNotifications.length; k++) {
																													if (sitefromStats != null) {
																														s += '<img style="margin:0px 7px" height="16px" width="16px" src='
																																+ siteNotifications[k].categoryImg
																																+ '/><span class="tooltip-notification-label"> '
																																+ siteNotifications[k].notificationTitle
																																+ '<div class="tooltip-notification-date" >Tentative End Date : '
																																+ $filter(
																																		'dateConverter')
																																		(
																																				siteNotifications[k].notificationEndDate)
																																+ '</div>'
																																+ '</span><br/>';
																													}
																												}
																											}
																										}

																									}
																								}

																								s += '<table><tr style="background-color:#FAFAFA;">';
																								var latencyTooltip = '';
																								var nwlatencyTooltip = '';
																								$
																										.each(
																												this.points,
																												function() {
																													if (this.series.name == $scope.staticLabels.refresh_time
																															&& this.series.userOptions.legendID == 0) {
																														nwlatencyTooltip += '</tr><tr style="background-color:#FAFAFA;"><td><br/></td></tr><tr style="background-color:#FAFAFA;"><td class="tooltip-top-labels"><div class="tooltip-top-box" style="background-color:'
																																+ this.series.color
																																+ ';float:left;"></div>&nbsp;<span style="color:#1e1d1c;">'
																																+ this.series.name
																																+ '&nbsp;&nbsp;&nbsp;<br/>&nbsp;&nbsp;&nbsp;&nbsp;'
																																+ this.y
																																+ ' Sec</span></td>';
																													} else if (this.series.name == $scope.staticLabels.refresh_time
																															&& this.series.userOptions.legendID == 1) {
																														latencyTooltip += '<td class="tooltip-top-labels"><div class="tooltip-top-box" style="background-color:'
																																+ this.series.color
																																+ ';float:left;"></div>&nbsp;<span style="color:#1e1d1c;">'
																																+ this.series.name
																																+ '&nbsp;&nbsp;&nbsp;<br/>&nbsp;&nbsp;&nbsp;&nbsp;'
																																+ this.y
																																+ ' Sec</span></td>';
																													}
																												});

																								s += latencyTooltip
																										+ nwlatencyTooltip
																										+ '</tr><tr style="background-color:#FAFAFA;"><td><br/></td></tr></table></div>';
																								return s;

																							},
																						},
																						plotOptions : {
																							column : {
																								stacking : 'normal'
																							},
																							series : {
																								pointPadding : 0,
																								borderWidth : 0,
																								shadow : false,
																								events : {
																									checkboxClick : function(
																											e) {
																										var series = this.chart.series;
																										if (e.checked) {
																											for (i = 0; i < series.length; i++) {
																												series[i]
																														.show();
																											}
																										} else {
																											for (i = 0; i < series.length; i++) {
																												if (series[i].userOptions.legendID == this.userOptions.legendID) {
																													series[i]
																															.hide();
																												}
																											}
																										}
																									},
																								}
																							}
																						},
																						legend : {
																							verticalAlign : 'bottom',
																							x : -10,
																							y : 10,
																							floating : false,
																							fontFamily : 'proxima_nova_rgregular',
																							itemHoverStyle : {
																								color : '#FF0000'
																							}
																						},
																						legendLeft : {
																							align : 'right',
																							x : -10,
																							y : 30,
																							floating : false,
																							fontFamily : 'proxima_nova_rgregular',
																							itemHoverStyle : {
																								color : '#FF0000'
																							}
																						},
																						legendRight : {
																							align : 'right',
																							x : -10,
																							y : 10,
																							floating : false,
																							fontFamily : 'proxima_nova_rgregular',
																							itemHoverStyle : {
																								color : '#FF0000'
																							}
																						},
																						series : definedLatencyseries,

																						credits : {
																							enabled : false
																						}

																					},
																					function() {
																						var element = $(".highcharts-xaxis-labels span a#top-volume-latency-axis");
																						$compile(
																								element)
																								(
																										$scope);

																					});
																			var resizeTimer;
																			var t = 0;

																			//Event to handle resizing
																			$(
																					window)
																					.resize(
																							function() {
																								clearTimeout(resizeTimer);
																								if (t == 0) {
																									t = 1;
																									resizeTimer = setTimeout(
																											Resized,
																											100);
																								}
																							});

																			//Actual Resizing Event
																			function Resized() {
																				$timeout(
																						function() {
																							var element = $(".highcharts-xaxis-labels span a#top-volume-latency-axis");
																							var elementLatency = $(".highcharts-xaxis-labels span a#top-volume-axis");
																							$compile(
																									element)
																									(
																											$scope);
																							$compile(
																									elementLatency)
																									(
																											$scope);
																							t = 0;
																						},
																						500);

																			}
																			;

																			$scope.displayTopLatencyLoading = false;
																		});

														$scope.show = true;
														$scope.displayLoading = false;
													} catch (e) {
														$scope.topVolumeStats = null;
														$scope.displayTopLoading = false;
														$scope.displayTopLatencyLoading = false;
														$scope.TopVolumeErrorMsg = $scope.staticLabels.TopVolumeJSErrorMsg;
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
												})
							};

							$scope.callVolumeSiteDetails = function(siteIds,
									callback) {

								var volumeSitesAlerts;
								var volumeFavicons;
								var volumeNetworkStatistics;
								$scope.getSiteSpecificNotifications(siteIds,
										function() {
											volumeSitesAlerts = true;
										});
								$scope.getSiteSpecificFavicons(siteIds,
										function() {
											volumeFavicons = true;
										});

								$scope.getSiteNetworkStatistics(siteIds,
										function() {
											volumeNetworkStatistics = true;
										});

								var stop = $interval(function() {
									if (volumeSitesAlerts && volumeFavicons
											&& volumeNetworkStatistics) {
										callback();
										if (angular.isDefined(stop)) {
											$interval.cancel(stop);
											stop = undefined;
										}
									}
								}, 100);

							};

							$scope.getSiteNetworkStatistics = function(siteIds,
									callback) {
								$scope.topNetworkVolumeStats = null;

								if ($scope.cobrandIAVStat == true) {
									var cobrandIAVStat = $scope.staticLabels.iav;
								} else if ($scope.cobrandIAVStat == false) {
									var cobrandIAVStat = $scope.staticLabels.refresh_label;
								}
								if ($scope.cobrandPfmType == 'IAV') {
									var cobrandIAVStat = $scope.staticLabels.iav;
								} else if ($scope.cobrandPfmType == 'REFRESH') {
									var cobrandIAVStat = $scope.staticLabels.refresh_label;
								} else if ($scope.cobrandPfmType == 'Add') {
									var cobrandIAVStat = 'Add';
								}

								var include_list = "";
								var consolidatedBy = "";

								$scope.topVolumeStatsFilter = {
									reportType : cobrandIAVStat,
									customerId : $scope.customerId,
									groupBy : $scope.staticLabels.provider_label,
									cobrandId : "All",
									timeSlot : $scope.selectedOverallRefreshSnapShotTimeSlot,
									providerIds : siteIds.join(),
									numRecords : "15",
									top : $scope.staticLabels.top_volume,
									consolidatedBy : consolidatedBy,
									include : include_list
								};

								var data = angular
										.copy($scope.topVolumeStatsFilter);
								var topVolumeSitesSuccessRefreshData = Array();
								var topVolumeSitespSuccessRefreshData = Array();
								var topVolumeSitesAgentFailureRefreshData = Array();
								var topVolumeSitesSiteFailureRefreshData = Array();
								var topVolumeSitesUARFailureRefreshData = Array();
								var topVolumeSitesLatencyData = Array();
								var siteIds = Array();
								var overall_total = Array();
								var fieldName = Array();
								dashboardService
										.refreshLatencyStats(
												data,
												function(data, status, headers,
														config) {

													$scope.topNetworkVolumeStats = null;

													try {
														var response = JSON
																.parse(data);

														if (data == null
																|| data == ""
																|| data == "{}") {
															callback();
															return;
														} else if (data
																.indexOf($scope.staticLabels.error_code) != -1) {
															callback();
															return;
														}

														$scope.topNetworkVolumeStats = response;
														var infoVal = response.refreshStats.info;
														for (var i = 0; i < infoVal.length; i++) {
															siteIds[i] = infoVal[i].id;
															fieldName[i] = infoVal[i].name
																	+ " - "
																	+ infoVal[i].id;
															overall_total[i] = Number(infoVal[i].summary.totalVolume);
															topVolumeSitesSuccessRefreshData[i] = Number(((infoVal[i].summary.success.volume / (overall_total[i])) * 100)
																	.toFixed(2));
															if (cobrandIAVStat == 'Add') {
																topVolumeSitespSuccessRefreshData[i] = Number(((infoVal[i].summary.partialSuccess.volume / (overall_total[i])) * 100)
																		.toFixed(2));
															}

															var failureNode = infoVal[i].summary.failure;

															for (var j = 0; j < failureNode.length; j++) {

																var failureType = failureNode[j].type;
																if (failureType == $scope.staticLabels.tech_err_label) {
																	topVolumeSitesAgentFailureRefreshData[i] = Number((((failureNode[j].volume) / (overall_total[i])) * 100)
																			.toFixed(2));
																} else if (failureType == $scope.staticLabels.site_label) {
																	topVolumeSitesSiteFailureRefreshData[i] = Number((((failureNode[j].volume) / (overall_total[i])) * 100)
																			.toFixed(2));
																} else if (failureType == $scope.staticLabels.uar_label) {
																	topVolumeSitesUARFailureRefreshData[i] = Number((((failureNode[j].volume) / (overall_total[i])) * 100)
																			.toFixed(2));
																}

															}

															if ((infoVal[i].summary.latency) != undefined) {
																topVolumeSitesLatencyData[i] = Number(infoVal[i].summary.latency.avg);
															}

														}
														$scope.nwsiteIds = siteIds;
														$scope.nwfieldName = fieldName;
														$scope.overall_nw_total = overall_total;
														$scope.topVolumeNWSitesSuccessRefreshData = topVolumeSitesSuccessRefreshData;
														$scope.topVolumeNWSitespSuccessRefreshData = topVolumeSitespSuccessRefreshData;
														$scope.topVolumeNWSitesAgentFailureRefreshData = topVolumeSitesAgentFailureRefreshData;
														$scope.topVolumeNWSitesSiteFailureRefreshData = topVolumeSitesSiteFailureRefreshData;
														$scope.topVolumeNWSitesUARFailureRefreshData = topVolumeSitesUARFailureRefreshData;
														$scope.topVolumeNWSitesLatencyData = topVolumeSitesLatencyData;

														callback();
													} catch (e) {
														$scope.topNetworkVolumeStats = null;
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
														callback();
													}
												});
							};

							$scope.getSiteSpecificNotifications = function(
									siteIds, callback) {

								$scope.siteglobalMessageError = null;

								//Map of Site ID and Array of Site Notificaions
								$scope.siteNotificationMap = [];
								var siteNotificationMapIndex = 0;

								$scope.notificationIcons = [];

								$scope.activeSiteSpecificGlobalMessageFilter = {
									customerId : $scope.customerId,
									cobrandId : $scope.selectedCobrand,
									providerIds : siteIds.join(),
									statuses : "4,5,6"
								}

								var request = angular
										.copy($scope.activeSiteSpecificGlobalMessageFilter);

								globalMessageService
										.searchGlobalMessages(
												request,
												function(data, status, headers,
														config) {
													try {

														if (data == null
																|| data == ""
																|| data == "{}") {
															$scope.GblMsgErrorMsg = $scope.staticLabels.GblMsgErrorMsg;
															for (var j = 0; j < siteIds.length; j++) {
																$scope.notificationIcons[j] = '';
															}
															callback();
															return false;
														}

														var response = JSON
																.parse(data);
														var infoVal = response.notification;

														for (var j = 0; j < siteIds.length; j++) {

															var siteNotifications = [];
															var siteNoticationCount = 0;
															var notificationIcon = Array();
															var hasNotifications = false;

															for (var i = 0; i < infoVal.length; i++) {
																for (var k = 0; k < infoVal[i].impactedProvider.length; k++) {
																	if (infoVal[i].impactedProvider[k].id == siteIds[j]) {

																		var notficationStatus = null;
																		var notificationTitle = null;
																		var notificationEndDate = null;
																		var categoryImg = null;
																		var category = null;
																		var siteName = null;
																		var siteId = null;
																		hasNotifications = true;

																		notficationStatus = infoVal[i].status;
																		notificationTitle = infoVal[i].title
																				.replace(
																						/\\/g,
																						'');
																		notificationEndDate = infoVal[i].expectedResolutionTime;
																		category = infoVal[i].category;

																		if (category.length != 0) {
																			if (category
																					.trim() == 'Informational') {
																				categoryImg = "images/icon-info.svg";
																			} else if (category
																					.trim() == 'OnGoing') {
																				categoryImg = "images/icon-error.svg";
																			}
																		}
																		siteName = infoVal[i].impactedProvider[k].name;
																		siteId = infoVal[i].impactedProvider[k].id;

																		siteNotifications[siteNoticationCount++] = {
																			"notficationStatus" : notficationStatus,
																			"notificationTitle" : notificationTitle,
																			"notificationEndDate" : notificationEndDate,
																			"categoryImg" : categoryImg
																		}
																	}
																}
															}

															if (siteNotifications.length != 0) {
																$scope.siteNotificationMap[siteNotificationMapIndex++] = {
																	"siteName" : siteName
																			+ " - "
																			+ siteId,
																	"siteId" : siteId,
																	"siteNotifications" : siteNotifications
																}

															}

															if (hasNotifications) {
																notificationIcon = '<img style="margin:0px -7px" src="images/notification.svg"/>';
															} else {
																notificationIcon = '';
															}

															$scope.notificationIcons[j] = notificationIcon;

														}
														callback();
													} catch (e) {
														$scope.GblMsgErrorMsg = $scope.staticLabels.GblMsgErrorMsg;

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
																		});
														for (var j = 0; j < siteIds.length; j++) {
															$scope.notificationIcons[j] = '';
														}
														callback();
													}
												});
							};

							$scope.getSiteSpecificFavicons = function(siteIds,
									callback) {

								$scope.siteFaviconError = null;

								$scope.siteFavicons = [];

								$scope.siteFullName = [];

								$scope.siteStatus = [];

								$scope.siteAutoRefreshStatus = [];

								$scope.activeSiteSpecificFaviconFilter = {
									customerId : $scope.customerId,
									cobrandId : $scope.selectedCobrand,
									providerIds : siteIds.join(),
									fieldName : "favicon,logo,status,isAutoRefreshEnabled"
								}

								var request = angular
										.copy($scope.activeSiteSpecificFaviconFilter);

								dashboardService
										.searchFavicon(
												request,
												function(data, status, headers,
														config) {
													try {

														if (data == null
																|| data == ""
																|| data == "{}") {
															for (var j = 0; j < siteIds.length; j++) {
																$scope.siteFavicons[j] = "";
																$scope.siteStatus[j] = "";
																$scope.siteFullName[j] = "";
																$scope.siteAutoRefreshStatus[j] = "";
															}
															callback();
															return false;
														}

														var response = JSON
																.parse(data);
														var infoVal = response.provider;

														for (var j = 0; j < siteIds.length; j++) {

															for (var i = 0; i < infoVal.length; i++) {
																if (infoVal[i].id == siteIds[j]) {
																	if (infoVal[i].favicon != undefined) {
																		$scope.siteFavicons[j] = '<img src="'
																				+ infoVal[i].favicon
																				+ '" />';
																	} else {
																		$scope.siteFavicons[j] = "";
																	}
																	$scope.siteFullName[j] = infoVal[i].name;
																	$scope.siteStatus[j] = infoVal[i].status;
																	if (infoVal[i].isAutoRefreshEnabled == true) {
																		$scope.siteAutoRefreshStatus[j] = "";
																	} else if (infoVal[i].isAutoRefreshEnabled == false) {
																		$scope.siteAutoRefreshStatus[j] = '<span class="tooltip-top-name"> '
																				+ $scope.staticLabels.auto_refresh
																				+ ' : '
																				+ $scope.staticLabels.disabled_status
																				+ '</span><br/><br/>';
																	}
																	break;
																} else if (siteIds.length != infoVal.length
																		&& i == (infoVal.length - 1)) {
																	$scope.siteFavicons[j] = "";
																	$scope.siteStatus[j] = "";
																	$scope.siteFullName[j] = "";
																	$scope.siteAutoRefreshStatus[j] = "";
																	break;
																}
															}
														}
														callback();
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
																		});
														for (var j = 0; j < siteIds.length; j++) {
															$scope.siteFavicons[j] = "";
															$scope.siteStatus[j] = "";
															$scope.siteFullName[j] = "";
															$scope.siteAutoRefreshStatus[j] = "";
														}
														callback();
													}
												});
							};

							$scope.callFailureSiteDetails = function(siteIds,
									callback) {

								var failureSitesAlerts;
								var failureFavicons;
								var failureNetworkStatistics;
								$scope.getFailureSiteSpecificNotifications(
										siteIds, function() {
											failureSitesAlerts = true;
										});

								$scope.getFailureSiteSpecificFavicons(siteIds,
										function() {
											failureFavicons = true;
										});

								$scope.getSiteFailureNetworkStatistics(siteIds,
										function() {
											failureNetworkStatistics = true;
										});

								var stop = $interval(function() {
									if (failureSitesAlerts && failureFavicons
											&& failureNetworkStatistics) {
										callback();
										if (angular.isDefined(stop)) {
											$interval.cancel(stop);
											stop = undefined;
										}
									}
								}, 100);

							};

							$scope.getSiteFailureNetworkStatistics = function(
									siteIds, callback) {
								$scope.topFailureNetworkVolumeStats = null;

								if ($scope.cobrandIAVStat == true) {
									var cobrandIAVStat = $scope.staticLabels.iav;
								} else if ($scope.cobrandIAVStat == false) {
									var cobrandIAVStat = $scope.staticLabels.refresh_label;
								}
								if ($scope.cobrandPfmType == 'IAV') {
									var cobrandIAVStat = $scope.staticLabels.iav;
								} else if ($scope.cobrandPfmType == 'REFRESH') {
									var cobrandIAVStat = $scope.staticLabels.refresh_label;
								} else if ($scope.cobrandPfmType == 'Add') {
									var cobrandIAVStat = 'Add';
								}

								var include_list = "";
								var consolidatedBy = "";

								$scope.topVolumeStatsFilter = {
									reportType : cobrandIAVStat,
									customerId : $scope.customerId,
									groupBy : $scope.staticLabels.provider_label,
									cobrandId : "All",
									timeSlot : $scope.selectedOverallRefreshSnapShotTimeSlot,
									providerIds : siteIds.join(),
									numRecords : "15",
									top : $scope.staticLabels.top_failure,
									consolidatedBy : consolidatedBy,
									include : include_list
								};

								var data = angular
										.copy($scope.topVolumeStatsFilter);
								var topFailureSitesSuccessRefreshData = Array();
								var topFailureSitespSuccessRefreshData = Array();
								var topFailureSitesAgentFailureRefreshData = Array();
								var topFailureSitesSiteFailureRefreshData = Array();
								var topFailureSitesUARFailureRefreshData = Array();
								var topFailureSitesLatencyData = Array();
								var siteIds = Array();
								var overall_total = Array();
								var fieldName = Array();
								dashboardService
										.refreshLatencyStats(
												data,
												function(data, status, headers,
														config) {

													$scope.topFailureNetworkVolumeStats = null;

													try {
														var response = JSON
																.parse(data);

														if (data == null
																|| data == ""
																|| data == "{}") {
															callback();
															return;
														} else if (data
																.indexOf($scope.staticLabels.error_code) != -1) {
															callback();
															return;
														}

														$scope.topFailureNetworkVolumeStats = response;
														var infoVal = response.refreshStats.info;
														for (var i = 0; i < infoVal.length; i++) {
															siteIds[i] = infoVal[i].id;
															fieldName[i] = infoVal[i].name
																	+ " - "
																	+ infoVal[i].id;
															overall_total[i] = Number(infoVal[i].summary.totalVolume);
															topFailureSitesSuccessRefreshData[i] = Number(((infoVal[i].summary.success.volume / (overall_total[i])) * 100)
																	.toFixed(2));
															if (cobrandIAVStat == 'Add') {
																topFailureSitespSuccessRefreshData[i] = Number(((infoVal[i].summary.partialSuccess.volume / (overall_total[i])) * 100)
																		.toFixed(2));
															}

															var failureNode = infoVal[i].summary.failure;

															for (var j = 0; j < failureNode.length; j++) {

																var failureType = failureNode[j].type;
																if (failureType == $scope.staticLabels.tech_err_label) {
																	topFailureSitesAgentFailureRefreshData[i] = Number((((failureNode[j].volume) / (overall_total[i])) * 100)
																			.toFixed(2));
																} else if (failureType == $scope.staticLabels.site_label) {
																	topFailureSitesSiteFailureRefreshData[i] = Number((((failureNode[j].volume) / (overall_total[i])) * 100)
																			.toFixed(2));
																} else if (failureType == $scope.staticLabels.uar_label) {
																	topFailureSitesUARFailureRefreshData[i] = Number((((failureNode[j].volume) / (overall_total[i])) * 100)
																			.toFixed(2));
																}

															}

															if ((infoVal[i].summary.latency) != undefined) {
																topFailureSitesLatencyData[i] = Number(infoVal[i].summary.latency.avg);
															}

														}
														$scope.nwFailuresiteIds = siteIds;
														$scope.nwFailurefieldName = fieldName;
														$scope.overall_failure_nw_total = overall_total;
														$scope.topFailureNWSitesSuccessRefreshData = topFailureSitesSuccessRefreshData;
														$scope.topFailureNWSitespSuccessRefreshData = topFailureSitespSuccessRefreshData;
														$scope.topFailureNWSitesAgentFailureRefreshData = topFailureSitesAgentFailureRefreshData;
														$scope.topFailureNWSitesSiteFailureRefreshData = topFailureSitesSiteFailureRefreshData;
														$scope.topFailureNWSitesUARFailureRefreshData = topFailureSitesUARFailureRefreshData;
														$scope.topFailureNWSitesLatencyData = topFailureSitesLatencyData;

														callback();
													} catch (e) {
														$scope.topFailureNetworkVolumeStats = null;
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
														callback();
													}
												});
							};

							$scope.getFailureSiteSpecificNotifications = function(
									siteIds, callback) {

								$scope.siteglobalMessageError_failure = null;

								//Map of Site ID and Array of Site Notificaions
								$scope.siteNotificationMap_failure = [];
								var siteNotificationMapIndex = 0;

								$scope.notificationIcons_failure = [];

								$scope.activeSiteSpecificGlobalMessageFilter_failure = {
									customerId : $scope.customerId,
									cobrandId : $scope.selectedCobrand,
									providerIds : siteIds.join(),
									statuses : "4,5,6"
								}

								var request = angular
										.copy($scope.activeSiteSpecificGlobalMessageFilter_failure);

								globalMessageService
										.searchGlobalMessages(
												request,
												function(data, status, headers,
														config) {
													try {

														if (data == null
																|| data == ""
																|| data == "{}") {
															$scope.GblMsgErrorMsg = $scope.staticLabels.GblMsgErrorMsg;
															for (var j = 0; j < siteIds.length; j++) {
																$scope.notificationIcons_failure[j] = '';
															}
															callback();
															return false;
														}

														var response = JSON
																.parse(data);
														var infoVal = response.notification;

														for (var j = 0; j < siteIds.length; j++) {

															var siteNotifications = [];
															var siteNoticationCount = 0;
															var notificationIcon = Array();
															var hasNotifications = false;

															for (var i = 0; i < infoVal.length; i++) {
																for (var k = 0; k < infoVal[i].impactedProvider.length; k++) {
																	if (infoVal[i].impactedProvider[k].id == siteIds[j]) {

																		var notficationStatus = null;
																		var notificationTitle = null;
																		var notificationEndDate = null;
																		var categoryImg = null;
																		var category = null;
																		var siteName = null;
																		var siteId = null;
																		hasNotifications = true;

																		notficationStatus = infoVal[i].status;
																		notificationTitle = infoVal[i].title
																				.replace(
																						/\\/g,
																						'');
																		notificationEndDate = infoVal[i].expectedResolutionTime;
																		category = infoVal[i].category;

																		if (category.length != 0) {
																			if (category
																					.trim() == 'Informational') {
																				categoryImg = "images/icon-info.svg";
																			} else if (category
																					.trim() == 'OnGoing') {
																				categoryImg = "images/icon-error.svg";
																			}
																		}
																		siteName = infoVal[i].impactedProvider[k].name;
																		siteId = infoVal[i].impactedProvider[k].id;

																		siteNotifications[siteNoticationCount++] = {
																			"notficationStatus" : notficationStatus,
																			"notificationTitle" : notificationTitle,
																			"notificationEndDate" : notificationEndDate,
																			"categoryImg" : categoryImg
																		}
																	}
																}
															}

															if (siteNotifications.length != 0) {
																$scope.siteNotificationMap_failure[siteNotificationMapIndex++] = {
																	"siteName" : siteName
																			+ " - "
																			+ siteId,
																	"siteId" : siteId,
																	"siteNotifications" : siteNotifications
																}

															}

															if (hasNotifications) {
																notificationIcon = '<img style="margin:0px -7px" src="images/notification.svg"/>';
															} else {
																notificationIcon = '';
															}

															$scope.notificationIcons_failure[j] = notificationIcon;

														}
														callback();
													} catch (e) {
														$scope.GblMsgErrorMsg = $scope.staticLabels.GblMsgErrorMsg;

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
																		});
														for (var j = 0; j < siteIds.length; j++) {
															$scope.notificationIcons_failure[j] = '';
														}
														callback();
													}
												});
							};

							$scope.getFailureSiteSpecificFavicons = function(
									siteIds, callback) {

								$scope.siteFaviconError_failure = null;

								$scope.siteFavicons_failure = [];

								$scope.siteFullName_failure = [];

								$scope.siteStatus_failure = [];

								$scope.siteAutoRefreshStatus_failure = [];

								$scope.activeSiteSpecificFaviconFilter_failure = {
									customerId : $scope.customerId,
									cobrandId : $scope.selectedCobrand,
									providerIds : siteIds.join(),
									fieldName : "favicon,logo,status,isAutoRefreshEnabled"
								}

								var request = angular
										.copy($scope.activeSiteSpecificFaviconFilter_failure);

								dashboardService
										.searchFavicon(
												request,
												function(data, status, headers,
														config) {
													try {

														if (data == null
																|| data == ""
																|| data == "{}") {
															for (var j = 0; j < siteIds.length; j++) {
																$scope.siteFavicons_failure[j] = "";
																$scope.siteStatus_failure[j] = "";
																$scope.siteFullName_failure[j] = "";
																$scope.siteAutoRefreshStatus_failure[j] = "";
															}
															callback();
															return false;
														}

														var response = JSON
																.parse(data);
														var infoVal = response.provider;

														for (var j = 0; j < siteIds.length; j++) {

															for (var i = 0; i < infoVal.length; i++) {
																if (infoVal[i].id == siteIds[j]) {
																	if (infoVal[i].favicon != undefined) {
																		$scope.siteFavicons_failure[j] = '<img src="'
																				+ infoVal[i].favicon
																				+ '" />';
																	} else {
																		$scope.siteFavicons_failure[j] = "";
																	}
																	$scope.siteFullName_failure[j] = infoVal[i].name;
																	$scope.siteStatus_failure[j] = infoVal[i].status;
																	if (infoVal[i].isAutoRefreshEnabled == true) {
																		$scope.siteAutoRefreshStatus_failure[j] = "";
																	} else if (infoVal[i].isAutoRefreshEnabled == false) {
																		$scope.siteAutoRefreshStatus_failure[j] = '<span class="tooltip-top-name"> '
																				+ $scope.staticLabels.auto_refresh
																				+ ' : '
																				+ $scope.staticLabels.disabled_status
																				+ '</span><br/><br/>';
																	}
																	break;
																} else if (siteIds.length != infoVal.length
																		&& i == (infoVal.length - 1)) {
																	$scope.siteFavicons_failure[j] = "";
																	$scope.siteStatus_failure[j] = "";
																	$scope.siteFullName_failure[j] = "";
																	$scope.siteAutoRefreshStatus_failure[j] = "";
																	break;
																}
															}
														}
														callback();
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
																		});
														for (var j = 0; j < siteIds.length; j++) {
															$scope.siteFavicons_failure[j] = "";
															$scope.siteStatus_failure[j] = "";
															$scope.siteFullName_failure[j] = "";
															$scope.siteAutoRefreshStatus_failure[j] = "";
														}
														callback();
													}
												});
							};

							$scope.historicRefreshStatistics = function() {

								$scope.HRSErrorMsg = null;
								$scope.historyRefreshStats = null;

								if ($scope.cobrandIAVStat == true) {
									var cobrandIAVStat = $scope.staticLabels.iav;
								} else if ($scope.cobrandIAVStat == false) {
									var cobrandIAVStat = $scope.staticLabels.refresh_label;
								}
								if ($scope.cobrandPfmType == 'IAV') {
									var cobrandIAVStat = $scope.staticLabels.iav;
								} else if ($scope.cobrandPfmType == 'REFRESH') {
									var cobrandIAVStat = $scope.staticLabels.refresh_label;
								} else if ($scope.cobrandPfmType == 'Add') {
									var cobrandIAVStat = 'Add';
								}
								ga(
										'send',
										'event',
										'select',
										'dashRefreshTrend',
										$scope.selectedHistoricRefreshTrendTimeSlot,
										5);

								var include_list = "";
								include_list = $scope.staticLabels.historic_label;
								var consolidatedBy = "";
								if ($scope.getConsolidatedChannel == true) {
									consolidatedBy = "channel";
								}
								$scope.historyRefreshLatencyBreakDownStatsFilter = {
									reportType : cobrandIAVStat,
									customerId : $scope.customerId,
									groupBy : $scope.staticLabels.cobrand_label_up,
									cobrandId : $scope.selectedCobrand,
									timeSlot : $scope.selectedHistoricRefreshTrendTimeSlot,
									numRecords : "",
									top : "",
									consolidatedBy : consolidatedBy,
									include : include_list
								};

								var data = angular
										.copy($scope.historyRefreshLatencyBreakDownStatsFilter);
								$scope.historicRefreshStatslastUpdated = null;
								//Get History Refresh Latency Break Down
								dashboardService
										.refreshLatencyStats(
												data,
												function(data, status, headers,
														config) {
													$scope
															.dataRenderedHistoricStatsGraph(
																	data,
																	cobrandIAVStat);
												})
							};

							$scope.dataRenderedHistoricStatsGraph = function(
									data, cobrandIAVStat) {

								var history_overall_timeaxis = [];
								var history_overall_totalaxis = [];
								var history_overall_success = "";
								var history_overall_successaxis = [];
								var history_overall_pSuccessaxis = [];
								var history_overall_agentaxis = [];
								var history_overall_siteaxis = [];
								var history_overall_uaraxis = [];
								var history_overall_uar = "";
								var history_overall_success_wo_uaraxis = [];

								$scope.HRSErrorMsg = null;
								$scope.historyRefreshStats = null;

								try {
									if (typeof data == 'string') {
										var response = JSON.parse(data);

									} else {
										var response = JSON.parse(JSON
												.stringify(data));
										data = JSON.stringify(data);
									}

									if (data == null || data == ""
											|| data == "{}") {
										$scope.HRSErrorCode = 404;
										$scope.HRSErrorMsg = $scope.staticLabels.NoDatafound;
										return;
									} else if (data
											.indexOf($scope.staticLabels.error_code) != -1) {
										var errResponse = JSON.parse(data);
										if (errResponse.errorCode == $scope.staticLabels.invalid_session_error_code) {
											$scope.HRSErrorMsg = $scope.staticLabels.invalid_session;
											return;
										}
										$scope.HRSErrorCode = errResponse.errorCode;
										$scope.HRSErrorMsg = $scope.staticLabels.HRSErrorMsg;
										return;
									} else if (response.refreshStats.info[0].details == undefined
											|| response.refreshStats.info[0].details == ""
											|| response.refreshStats.info[0].details == "{}"
											|| response.refreshStats.info[0].details == null) {
										$scope.HRSErrorCode = 404;
										$scope.HRSErrorMsg = $scope.staticLabels.NoDatafound;
										return;
									}

									$scope.historyRefreshStats = response;
									var info = response.refreshStats.info;

									if (info.length > 0) {
										$scope.historicRefreshStatslastUpdated = info[0].lastModified;
									}

									for (var k = 0; k < info.length; k++) {

										var infoVal = info[k].details;
										infoVal = infoVal.reverse();

										for (var i = 0; i < infoVal.length; i++) {
											history_overall_timeaxis[i] = (infoVal[i].date)
													.substring((infoVal[i].date)
															.indexOf("/") + 1)
													+ " PT";
											history_overall_totalaxis[i] = Number(infoVal[i].summary.totalVolume);
											history_overall_success = Number(infoVal[i].summary.success.volume);
											history_overall_successaxis[i] = Number(((Number(infoVal[i].summary.success.volume) / history_overall_totalaxis[i]) * 100)
													.toFixed(2));
											if (cobrandIAVStat == 'Add') {
												history_overall_pSuccessaxis[i] = Number(((Number(infoVal[i].summary.partialSuccess.volume) / history_overall_totalaxis[i]) * 100)
														.toFixed(2));
											}

											var failureNode = infoVal[i].summary.failure;

											for (var j = 0; j < failureNode.length; j++) {

												var failureType = failureNode[j].type;
												if (failureType == $scope.staticLabels.tech_err_label) {
													history_overall_agentaxis[i] = Number(((Number(failureNode[j].volume) / history_overall_totalaxis[i]) * 100)
															.toFixed(2));
												} else if (failureType == $scope.staticLabels.site_label) {
													history_overall_siteaxis[i] = Number(((Number(failureNode[j].volume) / history_overall_totalaxis[i]) * 100)
															.toFixed(2));
												} else if (failureType == $scope.staticLabels.uar_label) {
													history_overall_uar = Number(failureNode[j].volume);
													history_overall_uaraxis[i] = Number(((Number(failureNode[j].volume) / history_overall_totalaxis[i]) * 100)
															.toFixed(2));
												}
											}
											if (Number(history_overall_totalaxis[i]
													- history_overall_uar) != 0) {
												history_overall_success_wo_uaraxis[i] = Number(((history_overall_success / (history_overall_totalaxis[i] - history_overall_uar)) * 100)
														.toFixed(2));
											} else {
												history_overall_success_wo_uaraxis[i] = 0;
											}
										}
									}

									var xStep = 1;
									if ($scope.selectedHistoricRefreshTrendTimeSlot == "P30D") {
										xStep = 3;
									}

									if (cobrandIAVStat == 'Add') {

										var historicSeries = [
												{
													type : 'area',
													yAxis : 1,
													name : $scope.staticLabels.refresh_volume,
													color : '#e7feff',
													border : 'solid 1.3px #ffffff',
													fontFamily : 'proxima_nova_rgregular',
													data : history_overall_totalaxis,
													legendID : 0,
													lineColor : '#74afca',
													marker : {
														fillColor : '#74afca'
													}
												},
												{
													name : $scope.staticLabels.successful_Label,
													yAxis : 0,
													type : 'line',
													color : '#46b280',
													fontFamily : 'proxima_nova_rgregular',
													data : history_overall_successaxis,
													legendID : 0
												},
												{
													name : "Partial Success",
													yAxis : 0,
													type : 'line',
													color : '#25f081',
													fontFamily : 'proxima_nova_rgregular',
													data : history_overall_pSuccessaxis,
													legendID : 0
												},
												{
													name : $scope.staticLabels.success_uar_Label,
													yAxis : 0,
													type : 'line',
													color : '#3f51b5',
													fontFamily : 'proxima_nova_rgregular',
													data : history_overall_success_wo_uaraxis,
													legendID : 0
												},
												{
													name : $scope.staticLabels.technical_failure_Label,
													yAxis : 0,
													type : 'line',
													color : '#de5b49',
													fontFamily : 'proxima_nova_rgregular',
													data : history_overall_agentaxis,
													legendID : 0
												},
												{
													name : $scope.staticLabels.site_failure_Label,
													yAxis : 0,
													type : 'line',
													color : '#ffa000',
													fontFamily : 'proxima_nova_rgregular',
													data : history_overall_siteaxis,
													legendID : 0
												} ];

									} else {
										var historicSeries = [
												{
													type : 'area',
													yAxis : 1,
													name : $scope.staticLabels.refresh_volume,
													color : '#e7feff',
													border : 'solid 1.3px #ffffff',
													fontFamily : 'proxima_nova_rgregular',
													data : history_overall_totalaxis,
													legendID : 0,
													lineColor : '#74afca',
													marker : {
														fillColor : '#74afca'
													}
												},
												{
													name : $scope.staticLabels.successful_Label,
													yAxis : 0,
													type : 'line',
													color : '#46b280',
													fontFamily : 'proxima_nova_rgregular',
													data : history_overall_successaxis,
													legendID : 0
												},
												{
													name : $scope.staticLabels.success_uar_Label,
													yAxis : 0,
													type : 'line',
													color : '#3f51b5',
													fontFamily : 'proxima_nova_rgregular',
													data : history_overall_success_wo_uaraxis,
													legendID : 0
												},
												{
													name : $scope.staticLabels.technical_failure_Label,
													yAxis : 0,
													type : 'line',
													color : '#de5b49',
													fontFamily : 'proxima_nova_rgregular',
													data : history_overall_agentaxis,
													legendID : 0
												},
												{
													name : $scope.staticLabels.site_failure_Label,
													yAxis : 0,
													type : 'line',
													color : '#ffa000',
													fontFamily : 'proxima_nova_rgregular',
													data : history_overall_siteaxis,
													legendID : 0
												} ];
									}
									function adjustGraphOhr(chart) {

										try {
											if (typeof (chart === 'undefined' || chart === null)
													&& this instanceof jQuery) { // if no obj chart and the context is set

												this
														.find(
																'.chart-container:visible')
														.each(
																function() { // for only visible charts container in the curent context
																	$container = $(this); // context container
																	$container
																			.find(
																					'div[id^="chart-"]')
																			.each(
																					function() { // for only chart
																						$chart = $(
																								this)
																								.highcharts(); // cast from JQuery to highcharts obj
																						$chart
																								.setSize(
																										$container
																												.width(),
																										$chart.chartHeight,
																										doAnimation = true); // adjust chart size with animation transition
																					});
																});
											} else {
												chart
														.setSize(
																$(
																		'.chart-container:visible')
																		.width(),
																chart.chartHeight,
																doAnimation = true); // if chart is set, adjust
											}
										} catch (err) {
											// do nothing
										}
									}

									var overallHistoricRefreshSnapshotchart = new Highcharts.Chart(
											{
												chart : {
													renderTo : 'overall_historic_refresh_stats_db',
													zoomType : 'xy',
													height : 310,
													marginBottom : 75,
													series : {
														connectNulls : true
													},
													events : {
														load : function(event) {
															adjustGraphOhr(this);
														}
													}
												},

												rangeSelector : {
													selected : 1
												},

												xAxis : {
													categories : history_overall_timeaxis,
													labels : {
														rotation : 0,
														step : xStep,
														style : {
															fontSize : '11px',
															fontFamily : 'proxima_nova_rgregular'
														}
													}
												},
												yAxis : [
														{ // Primary yAxis
															gridLineWidth : 0,
															tickWidth : 1,
															lineWidth : 1,
															tickInterval : 10,
															min : 0,
															title : {
																text : ""
															},
															labels : {
																format : '{value}%',
																fontFamily : 'proxima_nova_rgregular',
																style : {
																	color : '#363b4e'
																}
															},
															showEmpty : false
														},
														{
															// Secondary yAxis
															gridLineWidth : 0,
															tickWidth : 1,
															lineWidth : 1,
															title : {
																text : $scope.staticLabels.refresh_volume,
																style : {
																	fontFamily : 'proxima_nova_rgregular',
																	color : '#74afca'
																}
															},
															labels : {
																fontFamily : 'proxima_nova_rgregular',
																style : {
																	color : '#74afca'
																}
															},
															opposite : true,
															showEmpty : false
														} ],
												legend : {
													align : 'right',
													verticalAlign : 'bottom',
													floating : false,
													fontFamily : 'proxima_nova_rgregular',
													itemHoverStyle : {
														color : '#FF0000'
													}
												},
												plotOptions : {
													series : {
														marker : {
															enabled : true,
															symbol : 'circle'
														}
													}
												},
												series : historicSeries,

												title : {
													text : ''
												},

												loading : false,
												credits : {
													enabled : false
												}
											},
											function(chart) {
												var series = chart.series;
												$
														.each(
																series,
																function(i, ser) {
																	if (ser.name == "Refresh Volume") {

																		$(
																				ser.legendSymbol.element)
																				.attr(
																						'stroke-width',
																						'1');
																		$(
																				ser.legendSymbol.element)
																				.attr(
																						'stroke',
																						'#74afca');

																	}
																});
											});
									$scope.show = true;
									$scope.displayLoading = false;
								} catch (e) {
									$scope.historyRefreshStats = null;
									$scope.HRSErrorMsg = $scope.staticLabels.HRSJSErrorMsg;
									var exception = {
										exceptionStackTrace : e.stack
												.toString()
									};
									var data = angular.copy(exception);
									appService.loggerService(data, function(
											data, status, headers, config) {
									})
								}

							}

							$scope.historicLatencyStatistics = function() {

								$scope.HLErrorMsg = null;
								$scope.historyLatencyStats = null;

								if ($scope.cobrandIAVStat == true) {
									var cobrandIAVStat = $scope.staticLabels.iav;
								} else if ($scope.cobrandIAVStat == false) {
									var cobrandIAVStat = $scope.staticLabels.refresh_label;
								}
								if ($scope.cobrandPfmType == 'IAV') {
									var cobrandIAVStat = $scope.staticLabels.iav;
								} else if ($scope.cobrandPfmType == 'REFRESH') {
									var cobrandIAVStat = $scope.staticLabels.refresh_label;
								} else if ($scope.cobrandPfmType == 'Add') {
									var cobrandIAVStat = 'Add';
								}

								ga(
										'send',
										'event',
										'select',
										'dashRefreshTrend',
										$scope.selectedOverallRefreshSnapShotTimeSlot,
										3);

								var include_list = "";

								include_list = $scope.staticLabels.historic_label;
								var consolidatedBy = "";
								if ($scope.getConsolidatedChannel == true) {
									consolidatedBy = "channel";
								}
								$scope.historyRefreshLatencyBreakDownStatsFilter = {
									reportType : cobrandIAVStat,
									customerId : $scope.customerId,
									groupBy : $scope.staticLabels.cobrand_label_up,
									cobrandId : $scope.selectedCobrand,
									timeSlot : $scope.selectedHistoricLatencyTrendTimeSlot,
									numRecords : "",
									top : "",
									consolidatedBy : consolidatedBy,
									include : include_list
								};

								var data = angular
										.copy($scope.historyRefreshLatencyBreakDownStatsFilter);

								$scope.historicLatencyStatslastupdated = null;

								dashboardService
										.refreshLatencyStats(
												data,
												function(data, status, headers,
														config) {
													$scope
															.dataRenderedHistoricLatencyStatsGraph(data);
												})
							};

							$scope.dataRenderedHistoricLatencyStatsGraph = function(
									data) {
								var history_overall_timeaxis = [];
								var history_overall_latencyaxis = [];

								$scope.HLErrorMsg = null;
								$scope.historyLatencyStats = null;

								try {
									var response = JSON.parse(data);

									if (data == null || data == ""
											|| data == "{}") {
										$scope.HLErrorCode = 404;
										$scope.HLErrorMsg = $scope.staticLabels.NoDatafound;
										return;
									} else if (data
											.indexOf($scope.staticLabels.error_code) != -1) {
										var errResponse = JSON.parse(data);
										if (errResponse.errorCode == $scope.staticLabels.invalid_session_error_code) {
											$scope.HLErrorMsg = $scope.staticLabels.invalid_session;
											return;
										}
										$scope.HLErrorCode = errResponse.errorCode;
										$scope.HLErrorMsg = $scope.staticLabels.HLErrorMsg;
										return;
									} else if (response.refreshStats.info[0].details == undefined
											|| response.refreshStats.info[0].details == ""
											|| response.refreshStats.info[0].details == "{}"
											|| response.refreshStats.info[0].details == null) {
										$scope.HLErrorCode = 404;
										$scope.HLErrorMsg = $scope.staticLabels.NoDatafound;
										return;
									}

									$scope.historyLatencyStats = response;
									var info = response.refreshStats.info;

									if (info.length > 0) {
										$scope.historicLatencyStatslastupdated = info[0].lastModified;
									}

									for (var k = 0; k < info.length; k++) {
										var infoVal = info[k].details;
										infoVal = infoVal.reverse();

										for (var i = 0; i < infoVal.length; i++) {
											history_overall_timeaxis[i] = (infoVal[i].date)
													.substring((infoVal[i].date)
															.indexOf("/") + 1)
													+ " PT";
											history_overall_latencyaxis[i] = Number(infoVal[i].summary.latency.avg);
										}
									}

									var xStep = 1;
									if ($scope.selectedHistoricLatencyTrendTimeSlot == "P30D") {
										xStep = 6;
									} else if ($scope.selectedHistoricLatencyTrendTimeSlot == "P15D") {
										xStep = 4;
									}

									function adjustGraphhl(chart) {

										try {
											if (typeof (chart === 'undefined' || chart === null)
													&& this instanceof jQuery) { // if no obj chart and the context is set

												this
														.find(
																'.chart-container:visible')
														.each(
																function() { // for only visible charts container in the curent context
																	$container = $(this); // context container
																	$container
																			.find(
																					'div[id^="chart-"]')
																			.each(
																					function() { // for only chart
																						$chart = $(
																								this)
																								.highcharts(); // cast from JQuery to highcharts obj
																						$chart
																								.setSize(
																										$container
																												.width(),
																										$chart.chartHeight,
																										doAnimation = true); // adjust chart size with animation transition
																					});
																});
											} else {
												chart
														.setSize(
																$(
																		'.chart-container:visible')
																		.width(),
																chart.chartHeight,
																doAnimation = true); // if chart is set, adjust
											}
										} catch (err) {
											// do nothing
										}
									}

									var overallHistoricLatencySnapshotChart = new Highcharts.Chart(
											{
												chart : {
													renderTo : 'overall_historic_latency_stats_db',
													zoomType : 'xy',
													marginBottom : 75,
													height : 310,
													events : {
														load : function(event) {
															adjustGraphhl(this);
														}
													}
												},
												legend : {
													align : 'right',
													verticalAlign : 'bottom',
													fontFamily : 'proxima_nova_rgregular',
													floating : false,
													itemHoverStyle : {
														color : '#FF0000'
													}
												},
												xAxis : {
													categories : history_overall_timeaxis,
													labels : {
														rotation : 0,
														step : xStep,
														style : {
															fontSize : '11px',
															fontFamily : 'proxima_nova_rgregular'
														}
													}
												},
												yAxis : {
													min : 0,
													tickInterval : 10,
													gridLineWidth : 0,
													tickWidth : 1,
													lineWidth : 1,
													title : {
														fontFamily : 'proxima_nova_rgregular',
														text : $scope.staticLabels.seconds_Label
													}
												},
												series : [ {
													marker : {
														enabled : true
													},
													legendID : 1,
													showInLegend : true,
													type : 'line',
													name : $scope.staticLabels.refresh_latency_Label,
													color : '#f9a825',
													fontFamily : 'proxima_nova_rgregular',
													data : history_overall_latencyaxis
												}

												],

												title : {
													text : ''
												},

												loading : false,
												credits : {
													enabled : false
												}

											});
									$scope.show = true;
									$scope.displayLoading = false;
								} catch (e) {
									$scope.historyLatencyStats = null;
									$scope.HLErrorMsg = $scope.staticLabels.HLJSErrorMsg;
									var exception = {
										exceptionStackTrace : e.stack
												.toString()
									};
									var data = angular.copy(exception);
									appService.loggerService(data, function(
											data, status, headers, config) {
									})
								}

							}

							$scope.historicLatencyBreakDownStatistics = function() {

								$scope.HLBErrorMsg = null;
								$scope.historyRefreshLatencyBreakDownStats = null;

								if ($scope.cobrandIAVStat == true) {
									var cobrandIAVStat = $scope.staticLabels.iav;
								} else if ($scope.cobrandIAVStat == false) {
									var cobrandIAVStat = $scope.staticLabels.refresh_label;
								}
								if ($scope.cobrandPfmType == 'IAV') {
									var cobrandIAVStat = $scope.staticLabels.iav;
								} else if ($scope.cobrandPfmType == 'REFRESH') {
									var cobrandIAVStat = $scope.staticLabels.refresh_label;
								} else if ($scope.cobrandPfmType == 'Add') {
									var cobrandIAVStat = 'Add';
								}

								ga(
										'send',
										'event',
										'select',
										'dashRefreshTimeBreakUp',
										$scope.selectedOverallRefreshSnapShotTimeSlot,
										3);

								var include_list = "";

								include_list = $scope.staticLabels.latency_break;
								var consolidatedBy = "";
								if ($scope.getConsolidatedChannel == true) {
									consolidatedBy = "channel";
								}
								$scope.historyRefreshLatencyBreakDownStatsFilter = {
									reportType : cobrandIAVStat,
									customerId : $scope.customerId,
									groupBy : $scope.staticLabels.cobrand_label_up,
									cobrandId : $scope.selectedCobrand,
									timeSlot : $scope.selectedHistoricLatencyBreakDownTimeSlot,
									numRecords : "",
									top : "",
									consolidatedBy : consolidatedBy,
									include : include_list
								};

								var data = angular
										.copy($scope.historyRefreshLatencyBreakDownStatsFilter);
								var history_0_20_sec = 0;
								var history_20_40_sec = 0;
								var history_40_60_sec = 0;
								var history_60_80_sec = 0;
								var history_80_100_sec = 0;
								var history_100_plus_sec = 0;
								var history_min_latency = 0;
								var history_max_latency = 0;
								var history_avg_latency = 0;
								$scope.historicLatencyBreakDownlastupdated = null;
								//Get History Refresh Latency Break Down
								dashboardService
										.refreshLatencyStats(
												data,
												function(data, status, headers,
														config) {
													$scope
															.dataRenderedLatencyBreakupGraph(data);
												})
							};

							$scope.dataRenderedLatencyBreakupGraph = function(
									data) {

								$scope.HLBErrorMsg = null;
								$scope.historyRefreshLatencyBreakDownStats = null;

								try {
									var response = JSON.parse(data);

									if (data == null || data == ""
											|| data == "{}") {
										$scope.HLBErrorCode = 404;
										$scope.HLBErrorMsg = $scope.staticLabels.NoDatafound;
										return;
									} else if (data
											.indexOf($scope.staticLabels.error_code) != -1) {
										var errResponse = JSON.parse(data);
										if (errResponse.errorCode == $scope.staticLabels.invalid_session_error_code) {
											$scope.HLBErrorMsg = $scope.staticLabels.invalid_session;
											return;
										}
										$scope.HLBErrorCode = errResponse.errorCode;
										$scope.HLBErrorMsg = $scope.staticLabels.HLBErrorMsg;
										return;
									} else if (response.refreshStats.info[0].summary == undefined
											|| response.refreshStats.info[0].summary == ""
											|| response.refreshStats.info[0].summary == "{}"
											|| response.refreshStats.info[0].summary == null) {
										$scope.HLBErrorCode = 404;
										$scope.HLBErrorMsg = $scope.staticLabels.NoDatafound;
										return;
									}

									$scope.historyRefreshLatencyBreakDownStats = response;

									$scope.historyRefreshStats = response;
									var info = response.refreshStats.info;

									if (info.length > 0) {
										$scope.historicLatencyBreakDownlastupdated = info[0].lastModified;
									}

									for (var k = 0; k < info.length; k++) {

										history_min_latency = Number(info[k].summary.latency.min);
										history_max_latency = Number(info[k].summary.latency.max);
										history_avg_latency = Number(info[k].summary.latency.avg);

										var latencyBreakupNode = info[k].summary.latency.breakups;

										for (var j = 0; j < latencyBreakupNode.length; j++) {

											var range = latencyBreakupNode[j].range;
											if (range == $scope.staticLabels.seconds_0_20) {
												history_0_20_sec = Number(latencyBreakupNode[j].volume);
											} else if (range == $scope.staticLabels.seconds_20_40) {
												history_20_40_sec = Number(latencyBreakupNode[j].volume);
											} else if (range == $scope.staticLabels.seconds_40_60) {
												history_40_60_sec = Number(latencyBreakupNode[j].volume);
											} else if (range == $scope.staticLabels.seconds_60_80) {
												history_60_80_sec = Number(latencyBreakupNode[j].volume);
											} else if (range == $scope.staticLabels.seconds_80_100) {
												history_80_100_sec = Number(latencyBreakupNode[j].volume);
											} else if (range == $scope.staticLabels.seconds_100) {
												history_100_plus_sec = Number(latencyBreakupNode[j].volume);
											}
										}
									}

									$scope.historic_min_latency = history_min_latency
											.toFixed(0);
									$scope.historic_max_latency = history_max_latency
											.toFixed(0);
									$scope.historic_avg_latency = history_avg_latency
											.toFixed(0);

									var total_latency_refreshes = history_0_20_sec
											+ history_20_40_sec
											+ history_40_60_sec
											+ history_60_80_sec
											+ history_80_100_sec
											+ history_100_plus_sec;

									history_0_20_sec = ((history_0_20_sec / total_latency_refreshes) * 100)
											.toFixed(0);
									history_20_40_sec = ((history_20_40_sec / total_latency_refreshes) * 100)
											.toFixed(0);
									history_40_60_sec = ((history_40_60_sec / total_latency_refreshes) * 100)
											.toFixed(0);
									history_60_80_sec = ((history_60_80_sec / total_latency_refreshes) * 100)
											.toFixed(0);
									history_80_100_sec = ((history_80_100_sec / total_latency_refreshes) * 100)
											.toFixed(0);
									history_100_plus_sec = ((history_100_plus_sec / total_latency_refreshes) * 100)
											.toFixed(0);

									function adjustGraph(chart) {

										try {
											if (typeof (chart === 'undefined' || chart === null)
													&& this instanceof jQuery) { // if no obj chart and the context is set

												this
														.find(
																'.chart-container:visible')
														.each(
																function() { // for only visible charts container in the curent context
																	$container = $(this); // context container
																	$container
																			.find(
																					'div[id^="chart-"]')
																			.each(
																					function() { // for only chart
																						$chart = $(
																								this)
																								.highcharts(); // cast from JQuery to highcharts obj
																						$chart
																								.setSize(
																										$container
																												.width(),
																										$chart.chartHeight,
																										doAnimation = true); // adjust chart size with animation transition
																					});
																});
											} else {
												chart
														.setSize(
																$(
																		'.chart-container:visible')
																		.width(),
																chart.chartHeight,
																doAnimation = true); // if chart is set, adjust
											}
										} catch (err) {
											// do nothing
										}
									}

									var overallHistoricLatencyBreakdownRefreshSnapshotchart = new Highcharts.Chart(
											{
												chart : {
													renderTo : 'overall_historic_latency_breakdown_refresh_stats_db',
													zoomType : 'xy',
													plotBackgroundColor : null,
													plotBorderWidth : 0,
													plotShadow : false,
													marginRight : 120,
													spacingLeft : 20,
													height : 310,
													events : {
														load : function(event) {
															adjustGraph(this);
														}
													}
												},

												title : {
													text : '<div class="Latency-21-S">'
															+ $scope.staticLabels.average_latency_Label
															+ ' '
															+ $scope.historic_avg_latency
															+ ' Seconds</div>'
															+ '<div class="Latency-21-S">'
															+ $scope.staticLabels.min_latency_Label
															+ ' '
															+ $scope.historic_min_latency
															+ ' Seconds</div>'
															+ '<div class="Latency-21-S">'
															+ $scope.staticLabels.max_latency_Label
															+ ' '
															+ $scope.historic_max_latency
															+ ' Seconds</div>',
													useHTML : true,
													align : 'center',
													fontFamily : 'proxima_nova_rgregular',
													verticalAlign : 'middle',
													y : 40,
													x : -50
												},
												tooltip : {
													pointFormat : '{series.name}: <b>{point.percentage:.0f}%</b>',
													fontFamily : 'proxima_nova_rgregular'
												},
												legend : {
													layout : 'vertical',
													align : 'right',
													verticalAlign : 'middle',
													fontFamily : 'proxima_nova_rgregular',
													itemMarginBottom : 15,
													symbolWidth : 4.2,
													symbolHeight : 33.6,
													floating : false,
													itemHoverStyle : {
														color : '#FF0000'
													}
												},
												plotOptions : {
													pie : {
														size : 350,
														dataLabels : {
															enabled : true,
															format : '{point.percentage:.0f}%',
															distance : -30,
															inside : true,
															style : {
																fontWeight : 'bold',
																fontFamily : 'proxima_nova_rgregular',
																fontSize : 13,
																fontStyle : 'normal',
																fontStretch : 'normal',
																letterSpacing : 0.3,
																color : '#ffffff'
															}
														},
														startAngle : -90,
														endAngle : 90,
														center : [ '50%', '90%' ],
														showInLegend : true
													},
													series : {
														point : {
															events : {
																legendItemClick : function() {
																	return false; //Overriding default behaviour
																}
															}
														}
													}
												},
												series : [ {
													type : 'pie',
													name : $scope.staticLabels.latency_share_Label,
													innerSize : '63%',
													colorByPoint : true,
													data : [
															{
																name : $scope.staticLabels.latency_0_20,
																y : Number(history_0_20_sec),
																fontFamily : 'proxima_nova_rgregular',
																color : '#7cb342'
															},
															{
																name : $scope.staticLabels.latency_20_40,
																y : Number(history_20_40_sec),
																fontFamily : 'proxima_nova_rgregular',
																color : '#fbc02d'
															},
															{
																name : $scope.staticLabels.latency_40_60,
																y : Number(history_40_60_sec),
																fontFamily : 'proxima_nova_rgregular',
																color : '#ff8f00'
															},
															{
																name : $scope.staticLabels.latency_60_80,
																y : Number(history_60_80_sec),
																fontFamily : 'proxima_nova_rgregular',
																color : '#f9744a'
															},
															{
																name : $scope.staticLabels.latency_80_100,
																y : Number(history_80_100_sec),
																fontFamily : 'proxima_nova_rgregular',
																color : '#d84315'
															},
															{
																name : $scope.staticLabels.latency_100,
																y : Number(history_100_plus_sec),
																fontFamily : 'proxima_nova_rgregular',
																color : '#b50000'
															} ],
													legendID : 1
												} ],
												loading : false,
												credits : {
													enabled : false
												}

											});
									$scope.show = true;
									$scope.displayLoading = false;
								} catch (e) {
									$scope.historyRefreshLatencyBreakDownStats = null;
									$scope.historyRefreshStats = null;
									$scope.HLBErrorMsg = $scope.staticLabels.HLBJSErrorMsg;
									var t = e.stack.toString() + "-"
											+ $scope.historyRefreshStats;
									var exception = {
										exceptionStackTrace : t
									};
									var data = angular.copy(exception);
									appService.loggerService(data, function(
											data, status, headers, config) {
									})
								}

							}

							// Quick Search
							$scope.sidebar = Navigation;

							$('input#search').keydown(function(event) {
								if (event.which === 13) {
									event.preventDefault();
									return false;
								}
							});

							$scope.search = function() {
								$scope.loading = true;
								$scope.siteNames = [];
								var providerNameValue = "";
								var providerIdValue = "";

								var searchQuery = isNaN($scope.query);

								if (searchQuery == true) {
									providerNameValue = $scope.query;
								} else {
									providerIdValue = $scope.query;
								}
								$scope.searchFilter = {
									customerId : $scope.customerId,
									cobrandId : $scope.selectedCobrand,
									providerIds : providerIdValue,
									name : providerNameValue,
									fieldName : "favicon,status,loginUrl,baseUrl,name"
								}

								$scope.no_match = false;

								var request = angular.copy($scope.searchFilter);

								dashboardService
										.searchFavicon(
												request,
												function(data, status, headers,
														config) {
													try {

														$scope.loading = false;
														var response = JSON
																.parse(data);
														$scope.siteSearchResults = response;

														var providerVal = response.provider;
														$scope.no_match = false;
														if (providerVal == null
																|| providerVal == ""
																|| providerVal == undefined) {
															$scope.NoMatch = "No Match Found";
															$scope.no_match = true;
															return false;
														}

														for (var i = 0; i < providerVal.length; i++) {
															var siteName = providerVal[i].name;
															var id = providerVal[i].id;
															var favicon = providerVal[i].favicon;
															var status = providerVal[i].status;
															var loginUrl = providerVal[i].loginUrl;
															var baseUrl = providerVal[i].baseUrl;
															var record = {
																id : id,
																siteName : siteName,
																favicon : favicon,
																status : status,
																loginUrl : loginUrl,
																baseUrl : baseUrl
															};
															$scope.siteNames
																	.push(record);
														}

														var config = {};
														$scope.scrollbar = function(
																direction,
																autoResize,
																show) {
															config.direction = direction;
															config.autoResize = autoResize;
															config.scrollbar = {
																show : !!show
															};
															return config;
														}

													} catch (e) {
														$scope.siteDetailErrorMsg = $scope.staticLabels.siteDetailErrorMsg;
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
																		});
													}
												});
							}
							$scope.initSiteWidget = function() {
							}
							$scope.checked = false;
							document.onkeydown = function($event) {
								var keyCode = $event.which || $event.keyCode;
								var sliderTop = document
										.getElementsByTagName('pageslide')[0].style.top;

								if (keyCode === 27 && sliderTop == '0px') {
									$scope.toggle();
								}
							};

							$scope.showMain = function() {
								$('#container1').removeClass('ng-hide');
								;
							}

							$scope.toggle = function() {
								$scope.checked = !$scope.checked;
								$scope.showQuickSearch = true;
								$scope.showDashboard = !$scope.showDashboard;
								var browserZoomLevel = Math
										.round(window.devicePixelRatio * 100);

								if ($scope.checked == false
										&& browserZoomLevel != 100) {
									$scope.topVolumeSiteStats();
									$scope.topFailureSitesStats();
									$scope.getOverallCommonStatistics();

								}
							}

							$scope.mockRouteChange = function() {
								$scope.$broadcast('$locationChangeStart');
							}

							$scope.getSiteDetailById = function(siteId, event) {
								$rootScope.loaderForSearchWidget = true;
								$rootScope.initializeSearchSiteWiget = true;
								$scope.searchWidgetErrorMsg = null;
								siteDetailData.setData(null);
								Navigation.getSiteDetailById();

								ga('send', 'event', 'input',
										'dashSearchResult', siteId, 2);
								$scope.pageType = $(event.target).attr(
										"data-id");

								$scope.siteOverallRefreshTrendTimeSlot = "PT24H";
								$scope.siteHistoricRefreshTrendTimeSlot = "P15D";

								if ($scope.homeCobrand == true) {
									var cobrandName = $('#cobrandId').find(
											'option:selected').text();
									cobrandName = cobrandName.substring(0,
											cobrandName.indexOf('[')).trim();
								} else if ($scope.homeCobrand == false) {
									if ($scope.subbrandList.length > 0) {
										var cobrandName = $('#subbrandId')
												.find('option:selected').text();
										cobrandName = cobrandName.substring(0,
												cobrandName.indexOf('['))
												.trim();
									} else {
										var cobrandName = $scope.cobrandName;
									}
								}
								$scope.cobrand_name = cobrandName;

								var containerName;
								var timeSlot;
								$scope.requestedSiteId = siteId;
								$scope.siteSearchFilters = {
									cobrandId : $scope.selectedCobrand,
									customerId : $scope.customerId,
									providerId : $scope.requestedSiteId
								};

								var siteData = [];
								siteDetailData.setData(siteData);
								$scope.siteDetailData = null;
								var data = angular
										.copy($scope.siteSearchFilters);

								siteMetadataService
										.getSiteDetail(
												data,
												function(data, status, headers,
														config) {

													try {
														$scope.getDataSiteResults = JSON
																.parse(data);
														$scope.loader = false;
														$scope.siteDetailData = [];

														$scope.getResult = $scope.getDataSiteResults;
														var siteData = [];
														var siteRes = {
															site_detail : data,
															cobrandIdentifier : $scope.selectedCobrand,
															providerIds : $scope.requestedSiteId,
															cobrandName : cobrandName,
															cobVal : $scope.cobrandVal
														};
														siteData.push(siteRes);
														siteDetailData
																.setData(siteData);

														var siteSpecificGlobalMessage = [];
														var args = {
															siteId : siteId,
															cobrandId : $scope.selectedCobrand,
															customerId : $scope.customerId
														};
														siteSpecificGlobalMessage
																.push(args);

														siteSpecificGlobalData
																.setData(siteSpecificGlobalMessage);
														$rootScope.initializeSearchSiteWiget = false;
														Navigation
																.getSiteDetailById();

													} catch (e) {
														$scope.searchWidgetErrorMsg = $scope.staticLabels.siteDetailErrorMsg;
														$rootScope.loaderForSearchWidget = false;
														$rootScope.initializeSearchSiteWiget = false;
														siteDetailData
																.setData(null);
														Navigation
																.getSiteDetailById();

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
																		});
													}

												});

							};

						} ]);
