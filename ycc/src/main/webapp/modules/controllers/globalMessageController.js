
angular
		.module('Controllers')
		.controller(
				'GlobalMessageController',
				[
						'$scope',
						'$controller',
						'GlobalMessageService',
						'ApplicationService',
						'siteSpecificGlobalData',
						function($scope, $controller, globalMessageService,
								appService, siteSpecificGlobalData) {

							angular.extend(this, $controller(
									'ApplicationController', {
										$scope : $scope
									}));

							$scope.initNotification = function() {
								$scope.getLabels("", function() {
									$scope.getUserType("", function() {
										$scope.globalMessage();
										var sFooter = document.getElementById('include-footer');
										sFooter.style.position = 'relative';
									});
								});
							};

							$scope.showAll = false;
							$scope.setshowAll = function() {
								$scope.showAll = true;
							};

							$scope.globalMessage = function() {
								$scope.getActiveGlobalMessage();
								$scope.showAll = false;
							};

							$scope.getActiveGlobalMessage = function() {

								$scope.globalMessageError = null;

								$scope.activeGlobalMessageFilter = {
									customerId : $scope.customerId,
									cobrandId : $scope.selectedCobrand,
									statuses : "4,5,6,7"
								}

								var request = angular
										.copy($scope.activeGlobalMessageFilter);
								var response = null;

								globalMessageService
										.searchGlobalMessages(
												request,
												function(data, status, headers,
														config) {
													try {

														if (data == null
																|| data == ""
																|| data == "{}") {
															$scope.GblMsgErrorCode = 404;
															$scope.GblMsgErrorMsg = $scope.staticLabels.NoDatafound;
															return false;
														}

														response = JSON
																.parse(data);

														var notifications = [];
														var notificationVal = response.notification;
														var currDate = new Date();
														var x = 0;

														for (var i = 0; i < notificationVal.length; i++) {
															var messageTitle;
															var category;
															var categoryImg;
															var endDate;
															var lastUpdated;
															var status;

															messageTitle = notificationVal[i].title;
															messageTitle = messageTitle
																	.replace(
																			/\\/g,
																			'');
															category = notificationVal[i].category;
															endDate = notificationVal[i].expectedResolutionTime;
															endDate = endDate
																	.replace(
																			'T',
																			' ')
																	.replace(
																			'Z',
																			' ');
															status = notificationVal[i].status;
															lastUpdated = notificationVal[i].lastUpdated;
															lastUpdated = lastUpdated
																	.replace(
																			'T',
																			' ')
																	.replace(
																			'Z',
																			' ');

															if (category.length != 0) {
																if (category
																		.trim() == 'Informational') {
																	categoryImg = "images/icon-info.svg";
																} else if (category
																		.trim() == 'OnGoing') {
																	categoryImg = "images/icon-error.svg";
																}
															}

															// Need to show
															// Resolved messages
															// for 24 hours in
															// the UI
															if (status == 'Resolved') {

																lastUpdated = lastUpdated
																		.split("-");
																var year = lastUpdated[0];
																var month = lastUpdated[1];
																var date = lastUpdated[2];
																date = date
																		.split(" ")[0];
																var valueStr = month
																		+ "-"
																		+ date
																		+ "-"
																		+ year;
																var valueDate = new Date(
																		valueStr);
																var valueDatePlusOne = new Date(
																		valueStr);
																valueDatePlusOne
																		.setDate(valueDatePlusOne
																				.getDate() + 1);

																if (currDate >= valueDate
																		&& currDate <= valueDatePlusOne) {
																	notifications[x++] = {
																		"title" : messageTitle,
																		"endDate" : endDate,
																		"categoryImg" : categoryImg
																	};
																}
															} else {
																notifications[x++] = {
																	"title" : messageTitle,
																	"endDate" : endDate,
																	"categoryImg" : categoryImg
																};
															}

														}
														$scope.notifications = notifications;
														$scope.showAll = false;
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
																		})
													}
												});
							};

							$scope.onLoadGetGlobalData = function() {
								$scope.siteSpecificGlobalMessage = siteSpecificGlobalData
										.getData();

								$scope.siteglobalMessageError = null;
								$scope.activeNotifications = null;
								$scope.historicNotifications = null;
								for (var i = 0; i < $scope.siteSpecificGlobalMessage.length; i++) {
									$scope.siteSpecificGlobalMessageFilter = {
										customerId : $scope.siteSpecificGlobalMessage[i].customerId,
										cobrandId : $scope.siteSpecificGlobalMessage[i].cobrandId,
										providerIds : $scope.siteSpecificGlobalMessage[i].siteId
									}
								}

								var request = angular
										.copy($scope.siteSpecificGlobalMessageFilter);
								var response;

								globalMessageService
										.searchGlobalMessages(
												request,
												function(data, status, headers,
														config) {
													try {
														if (data == null
																|| data == ""
																|| data == "{}") {
															$scope.siteGblMsgErrorCode = 404;
															$scope.siteGblMsgErrorMsg = $scope.staticLabels.NoDatafound;
															return false;
														}

														response = JSON
																.parse(data);

														var activeNotifications = [];
														var historicNotifications = [];
														var notificationVal = response.notification;
														var x = 0;
														var y = 0;

														for (var i = 0; i < notificationVal.length; i++) {
															var messageTitle;
															var category;
															var categoryImg;
															var issueTypes = [];
															var impactedContainers = [];
															var startDate;
															var endDate;
															var updates = [];

															messageTitle = notificationVal[i].title;
															messageTitle = messageTitle
																	.replace(
																			/\\/g,
																			'');
															category = notificationVal[i].category;
															startDate = notificationVal[i].issueStartDate;
															startDate = startDate
																	.replace(
																			'T',
																			' ')
																	.replace(
																			'Z',
																			' ');
															endDate = notificationVal[i].expectedResolutionTime;
															endDate = endDate
																	.replace(
																			'T',
																			' ')
																	.replace(
																			'Z',
																			' ');

															if (category.length != 0) {
																if (category
																		.trim() == 'Informational') {
																	categoryImg = "images/icon-info.svg";
																} else if (category
																		.trim() == 'OnGoing') {
																	categoryImg = "images/icon-error.svg";
																}
															}

															// Fetching impacted
															// containers
															if (notificationVal[i].impactedProvider != undefined) {
																for (var j = 0; j < notificationVal[i].impactedProvider.length; j++) {
																	for (var k = 0; k < notificationVal[i].impactedProvider[j].containers.length; k++) {
																		impactedContainers[k] = notificationVal[i].impactedProvider[j].containers[k];
																	}
																}
															}

															// Fetching issue
															// types
															if (notificationVal[i].issueType != undefined) {
																for (var j = 0; j < notificationVal[i].issueType.length; j++) {
																	issueTypes[j] = notificationVal[i].issueType[j];
																}
															}

															// Fetching updates
															if (notificationVal[i].updates != null) {
																for (var j = 0; j < notificationVal[i].updates.length; j++) {
																	updates[j] = notificationVal[i].updates[j].message;
																	if (updates[j] != undefined) {
																		updates[j] = updates[j]
																				.replace(
																						/\\/g,
																						'');
																	}
																}
															}

															if (notificationVal[i].status == 'In-Progress'
																	|| notificationVal[i].status == 'Upcoming'
																	|| notificationVal[i].status == 'Partially Fixed') {
																activeNotifications[x++] = {
																	"title" : messageTitle,
																	"endDate" : endDate,
																	"categoryImg" : categoryImg
																}
															} else {
																historicNotifications[y++] = {
																	"issueTypes" : issueTypes
																			.join(),
																	"title" : messageTitle,
																	"impactedContainers" : impactedContainers
																			.join(),
																	"startDate" : startDate,
																	"endDate" : endDate,
																	"updates" : updates
																}
															}
														}

														$scope.activeNotifications = activeNotifications;
														$scope.historicNotifications = historicNotifications;

													} catch (e) {
														$scope.siteGblMsgErrorMsg = $scope.staticLabels.GblMsgErrorMsg;
														$scope.siteGblMsgHistoryErrorMsg = $scope.staticLabels.GblMsgHistErrorMsg;
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

								var config = {};
								$scope.scrollbar = function(direction,
										autoResize, show) {
									config.direction = direction;
									config.autoResize = autoResize;
									config.scrollbar = {
										show : !!show
									};
									return config;
								}
							};
							$scope.onLoadGetGlobalData();

						} ]);