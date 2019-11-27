angular
		.module('Controllers')
		.controller(
				'SiteMetadataController',
				[
						'$scope',
						'$controller',
						'$rootScope',
						'SiteMetadataService',
						'ApplicationService',
						'$timeout',
						'$stateParams',
						'localStorageShare',
						'localStorageCobrandShare',
						'localStorageLabelShare',
						'localStorageSiteSearchInputShare',
						'localStoragePageActive',
						'PagerService',
						'$element',
						'siteDetailData',
						'sharedCobrand',
						'siteSpecificGlobalData',
						'Navigation',
						function($scope, $controller, $rootScope,
								siteMetadataService, appService, $timeout,
								$stateParams, localStorageShare,
								localStorageCobrandShare,
								localStorageLabelShare,
								localStorageSiteSearchInputShare,
								localStoragePageActive, PagerService, $element,
								siteDetailData, sharedCobrand,
								siteSpecificGlobalData, Navigation) {

							angular.extend(this, $controller(
									'ApplicationController', {
										$scope : $scope
									}));

							$scope.initSiteMetadataSearch = function() {
								$scope.loading = true;
								$scope
										.getLabels(
												"",
												function() {
													$scope
															.getUserType(
																	"",
																	function() {
																		$scope
																				.setSiteMetadataProperty();
																		if ($scope.homeCobrand == true) {
																			$scope
																					.cobrands(
																							"",
																							function() {

																								if ($scope.cobrandList != null) {
																									angular
																											.forEach(
																													$scope.cobrandList,
																													function(
																															obj,
																															index) {
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
																				angular
																						.forEach(
																								$scope.subbrandList,
																								function(
																										obj,
																										index) {
																									if (obj.id == $scope.selectedCobrand) {
																										$scope.indexValSub = index;
																									}
																								});
																				$scope.cob = {
																					selectedCobrand : $scope.subbrandList[$scope.indexValSub]
																				};
																			}
																		}
																		$scope.loading = false;
																	});
													highlight("siteMetadata");
													var sFooter = document.getElementById('include-footer');
													sFooter.style.position = 'relative';
												});
							}

							$scope.checkIfEnterKeyWasPressed = function($event) {
								var keyCode = $event.which || $event.keyCode;
								if (keyCode === 13) {
									this.fetchSiteMetadata();
								}
							};

							$scope.filteredSiteResults = null;
							$scope.loadingSiteResults = false;
							$scope.inputValueErrorMsg = null;
							$scope.siteResultsErrorMsg = null;
							$scope.siteResultsErrorCode = null;

							var data;

							$scope.sort = function(keyname) {
								$scope.sortKey = keyname; //set the sortKey to the param passed
								$scope.reverse = !$scope.reverse; //if true make it false and vice versa
							}

							document.onkeydown = function($event) {
								var keyCode = $event.which || $event.keyCode;
								var sliderTop = document
										.getElementsByTagName('pageslide')[0].style.top;

								if (keyCode === 27 && sliderTop == '0px') {
									$scope.toggle();
								}
							};

							$scope.sidebar = Navigation;
							$scope.checked = false;
							$scope.showMain = function() {
								$('#container2').removeClass('ng-hide');
								;
							};

							$scope.selclicked = function() {
								var bodyRect = document.body
										.getBoundingClientRect();
								console.log(bodyRect);
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
								console.log(bodyRect);
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
							angular.element('.md-select-menu-container')
									.addClass("sitemeta-brand-select");
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

							$scope.toggle = function() {
								$scope.checked = !$scope.checked;
								$scope.showQuickSearch = true;
								$scope.showSiteMetadata = !$scope.showSiteMetadata;
							}

							$scope.refreshStatSite = function(valSite) {
								$scope.cobrandVal = valSite;
								$scope.selectedCobrand = valSite.id;
								$scope.iavCobrand = valSite.iav;

								ga('send', 'event', 'select',
										'siteInfoCobSelect',
										$scope.selectedCobrand, 14);
							}

							$scope.getSiteDetailById = function(siteId, event) {
								
								$rootScope.loaderForSearchWidget = true;
								$rootScope.initializeSearchSiteWiget = true;
								$scope.searchWidgetErrorMsg = null;
								siteDetailData.setData(null);
								Navigation.getSiteDetailById();
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
								ga('send', 'event', 'href',
										'siteInfoViewDetail', siteId, 17);
								var searchWidgetType = $(event.target).attr(
										"data-id");
								$scope.requestedSiteId = siteId;
								$scope.siteSearchFilters = {
									cobrandId : $scope.selectedCobrand,
									customerId : $scope.customerId,
									providerId : siteId
								};

								var data = angular
										.copy($scope.siteSearchFilters);
								var pageActive = $element.find(
										'ul.pagination li.active a').text();
								localStorage.setItem('pageActive', pageActive);
								localStoragePageActive.setData(pageActive);
								var siteData = [];
								siteDetailData.setData(siteData);
								$scope.siteDetailData = null;
								siteMetadataService
										.getSiteDetail(
												data,
												function(data, status, headers,
														config) {

													try {
														$scope.siteDetailData = data;
														var siteData = [];
														var siteRes = {
															site_detail : $scope.siteDetailData,
															cobrandIdentifier : $scope.selectedCobrand,
															providerIds : $scope.requestedSiteId,
															cobrandName : cobrandName,
															cobVal : $scope.cobrandVal,
															searchWidgetType : searchWidgetType
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
														$scope.siteDetailErrorMsg = $scope.staticLabels.siteDetailErrorMsg;

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
																		})
													}

												});

							}

							$scope.fetchSiteMetadata = function() {
								$('ul.pagination li').removeClass('active');
								if ($scope.selectedCobrand == null
										&& $scope.selectedCobrand
												.indexOf(cobrandIdentifier) != -1) {
									alert('Please Select Cobrand');
									exit;
								}
								if ($scope.selectedCobrand == cobrandIdentifier) {
									var selectedCobrand = $scope.selectedCobrand;
									var cobrandIAVStat = $scope.cobrandIAV;
								} else {
									var selectedCobrand = $scope.selectedCobrand;
									var cobrandIAVStat = $scope.iavCobrand;
								}
								$scope.selectedCobrand = selectedCobrand;
								$scope.cobrandIAVStat = cobrandIAVStat;

								if ($scope.cobrandIAVStat == true) {
									$scope.newItemType = $scope.staticLabels.iav;
								} else if ($scope.cobrandIAVStat == false) {
									$scope.newItemType = $scope.staticLabels.refresh_label;
								}

								$scope.siteResults = null;
								$scope.siteSearchResults = null;
								$scope.siteResultsErrorMsg = null;
								$scope.loadingSiteResults = true;
								$scope.filteredSiteResults = null;
								$scope.inputValueErrorMsg = null;
								$scope.siteResultsErrorCode = null;

								this.validateInput();

								if ($scope.inputValueErrorMsg != null) {
									return;
								}

								var providerIdValue = "";
								var providerNameValue = "";
								var agentNameValue = "";
								var siteURLValue = "";

								if ($scope.selectedOptionForSearch == $scope.staticLabels.display_name_label) {
									if (isNaN($scope.siteSearchInputCriteria)) {
										providerNameValue = $scope.siteSearchInputCriteria;
									} else {
										providerIdValue = $scope.siteSearchInputCriteria;
									}
								} else if ($scope.selectedOptionForSearch == $scope.staticLabels.site_url_label) {
									siteURLValue = $scope.siteSearchInputCriteria;
								} else if ($scope.selectedOptionForSearch == $scope.staticLabels.agent_name_label) {
									agentNameValue = $scope.siteSearchInputCriteria;
								} else {
									if (isNaN($scope.siteSearchInputCriteria)) {
										providerNameValue = $scope.siteSearchInputCriteria;
									} else {
										providerIdValue = $scope.siteSearchInputCriteria;
									}
								}
								ga('send', 'event', 'input',
										'siteInfoSiteInput',
										$scope.siteSearchInputCriteria, 16);

								$scope.siteSearchFilters = {
									cobrandId : $scope.selectedCobrand,
									customerId : $scope.customerId,
									providerId : providerIdValue,
									providerName : providerNameValue,
									agentName : agentNameValue,
									url : siteURLValue
								};

								var data = angular
										.copy($scope.siteSearchFilters);

								siteMetadataService
										.siteMetadataSearch(
												data,
												function(data, status, headers,
														config) {

													try {

														var siteSrchResults = [];
														var siteId;
														var status;
														var statusImg;
														var showLoginMinIcon = true;
														var showBaseMinIcon = true;
														var siteName;
														var loginURL;
														var minloginURL;
														var siteURL;
														var minsiteURL;
														var statusTip;
														var country;
														var contentServices = "";
														var containerList = "";
														var showContainerListIcon = true;
														var aggregationType;
														var isAutoRefreshEnabled;

														if (data == null
																|| data == ""
																|| data == "{}") {
															$scope.siteResultsErrorCode = 404;
															$scope.siteResultsErrorMsg = $scope.staticLabels.NoResultsfound;
															$scope.isCollapsedSiteSearch = true;
															return;
														} else if (data
																.indexOf($scope.staticLabels.error_code) != -1) {
															var errResponse = JSON
																	.parse(data);
															if (errResponse.errorCode == $scope.staticLabels.invalid_session_error_code) {
																$scope.siteResultsErrorMsg = $scope.staticLabels.invalid_session;
																$scope.isCollapsedSiteSearch = true;
																return;
															}
															$scope.siteResultsErrorCode = errResponse.errorCode;
															$scope.siteResultsErrorMsg = $scope.staticLabels.err_tech_diff;
															$scope.isCollapsedSiteSearch = true;
															return;
														}

														var response = JSON
																.parse(data);
														$scope.siteSearchResults = response;

														var providerVal = response.provider;

														for (var i = 0; i < providerVal.length; i++) {
															containerList = "";
															siteId = providerVal[i].id;

															if (siteId == undefined) {
																siteId = "";
															}

															status = providerVal[i].status;
															statusImg = "images/"
																	+ status
																	+ ".svg";

															var disablement_status;

															if (status == "Unsupported") {
																statusTip = $scope.staticLabels.unsupported_ui;
															} else if (status == "Supported") {
																statusTip = $scope.staticLabels.supported_ui;
															} else if (status == "Unavailable") {
																var additionalInformation = providerVal[i].additionalInformation;
																if (additionalInformation) {
																	angular
																			.forEach(
																					additionalInformation,
																					function(
																							val,
																							key) {
																						var disableReason = val.disabledReason;
																						if (disableReason == "SITE_IS_MERGED_OR_ACQURIED") {
																							disablement_status = $scope.staticLabels.disablement_merged;
																						} else if (disableReason == "SITE_NO_LONGER_SUPPORTED_BY_YODLEE") {
																							disablement_status = $scope.staticLabels.disablement_noLongerSupported;
																						} else if (disableReason == "SITE_IS_TEMPORARY_DISABLED") {
																							disablement_status = $scope.staticLabels.disablement_temporary;
																						} else if (disableReason == "SITE_DOES_NOT_WANT_TO_BE_SCRAPPED") {
																							disablement_status = $scope.staticLabels.disablement_aggregators;
																						} else if (disableReason == "SITE_CAN_NOT_BE_SCRAPPED") {
																							disablement_status = $scope.staticLabels.disablement_techChallenge;
																						}
																					});
																	if (disablement_status) {
																		statusTip = $scope.staticLabels.unavailable_ui
																				+ ' - '
																				+ disablement_status;
																	} else {
																		statusTip = $scope.staticLabels.unavailable_ui;
																	}
																} else {
																	statusTip = $scope.staticLabels.unavailable_ui;
																}
															} else if (status == "UnsupportedBeta") {
																statusTip = $scope.staticLabels.unsupportedBeta_ui;
															} else if (status == "Beta") {
																statusTip = $scope.staticLabels.beta_ui;
															} else if (status == "Invisible") {
																statusTip = $scope.staticLabels.invisible_ui;
															}

															siteName = providerVal[i].name;

															if (siteName == undefined) {
																siteName = "";
															}

															loginURL = providerVal[i].loginUrl;

															if (loginURL == undefined) {
																loginURL = "";
															}

															if (loginURL
																	.indexOf("http") > -1) {
																if (loginURL.length < 40) {
																	minloginURL = loginURL;
																	showLoginMinIcon = false;
																} else if ($scope
																		.getPosition(
																				loginURL,
																				"/",
																				3) == -1) {
																	minloginURL = loginURL;
																} else {
																	minloginURL = loginURL
																			.substring(
																					0,
																					$scope
																							.getPosition(
																									loginURL,
																									"/",
																									3));
																}
															} else {
																if (loginURL.length < 40) {
																	minloginURL = loginURL;
																	showLoginMinIcon = false;
																} else {
																	minloginURL = loginURL
																			.substring(
																					0,
																					$scope
																							.getPosition(
																									loginURL,
																									"/",
																									1));
																}
															}

															siteURL = providerVal[i].baseUrl;

															if (siteURL == undefined) {
																siteURL = "";
															}

															if (siteURL
																	.indexOf("http") > -1) {
																if (siteURL.length < 40) {
																	minsiteURL = siteURL;
																	showBaseMinIcon = false;
																} else if ($scope
																		.getPosition(
																				siteURL,
																				"/",
																				3) == -1) {
																	minsiteURL = siteURL;
																} else {
																	minsiteURL = siteURL
																			.substring(
																					0,
																					$scope
																							.getPosition(
																									siteURL,
																									"/",
																									3));
																}
															} else {
																if (siteURL.length < 40) {
																	minsiteURL = siteURL;
																	showBaseMinIcon = false;
																} else {
																	minsiteURL = siteURL
																			.substring(
																					0,
																					$scope
																							.getPosition(
																									siteURL,
																									"/",
																									1));
																}
															}

															country = providerVal[i].country;

															if (country == undefined) {
																country = "";
															}

															aggregationType = providerVal[i].aggregationType;

															if (aggregationType == undefined) {
																aggregationType = "";
															}

															isAutoRefreshEnabled = providerVal[i].isAutoRefreshEnabled;

															if (isAutoRefreshEnabled == undefined) {
																isAutoRefreshEnabled = "";
															}

															var containerNode = providerVal[i].containerNames;
															if (containerNode != undefined) {

																if (containerNode.length < 4) {
																	showContainerListIcon = false;
																} else {
																	showContainerListIcon = true;
																}
																for (var k = 0; k < containerNode.length; k++) {
																	if (k == 0) {
																		containerList = containerNode[k];
																		contentServices = containerNode[k];
																	} else {
																		containerList = containerList
																				+ " \n"
																				+ containerNode[k];
																		if (k < 3
																				&& contentServices.length < 23) {
																			contentServices = contentServices
																					+ ","
																					+ containerNode[k];
																		}
																	}
																}
																containerList = containerList
																		+ " ";
															} else {
																contentServices = "";
															}

															siteSrchResults[i] = {
																siteId : siteId,
																status : status,
																statusImg : statusImg,
																statusTip : statusTip,
																showLoginMinIcon : showLoginMinIcon,
																showBaseMinIcon : showBaseMinIcon,
																showContainerListIcon : showContainerListIcon,
																siteName : siteName,
																loginURL : loginURL,
																minloginURL : minloginURL,
																siteURL : siteURL,
																minsiteURL : minsiteURL,
																country : country,
																contentServices : contentServices,
																containerList : containerList,
																aggregationType : aggregationType,
																isAutoRefreshEnabled : isAutoRefreshEnabled
															};
														}

														$scope.siteResults = siteSrchResults;

														if ($scope.siteResults.length > 200) {
															$scope.siteResultsErrorMsg = $scope.staticLabels.err_results_overflow;
															$scope.loadingSiteResults = false;
															$scope.isCollapsedSiteSearch = true;
															return;
														}

														$scope.pager = {};
														$scope.setPage = setPage;

														initController();

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
																			$scope.siteResults.length,
																			page);

															// get current page
															// of items
															$scope.filteredSiteResults = $scope.siteResults
																	.slice(
																			$scope.pager.startIndex,
																			$scope.pager.endIndex + 1);
															$scope.loadingSiteResults = false;
															$scope.isCollapsedSiteSearch = true;
														}
														localStorage
																.setItem(
																		'searchSiteResults',
																		JSON
																				.stringify($scope.siteResults));
														localStorageShare
																.setData(JSON
																		.parse(localStorage
																				.getItem('searchSiteResults')));

													} catch (e) {
														$scope.siteResultsErrorMsg = $scope.staticLabels.JSErrorMsg;
														$scope.isCollapsedSiteSearch = true;
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

								// For Cobrand
								localStorage.setItem('cobrandFilter', JSON
										.stringify($scope.selectedCobrand));
								localStorageCobrandShare.setData(JSON
										.parse(localStorage
												.getItem('cobrandFilter')));

								// For Search Criteria
								localStorage
										.setItem(
												'labelFilter',
												JSON
														.stringify($scope.selectedOptionForSearch));
								localStorageLabelShare.setData(JSON
										.parse(localStorage
												.getItem('labelFilter')));

								// For Input Search Criteria
								localStorage
										.setItem(
												'siteSearchInputCriteriaFilter',
												JSON
														.stringify($scope.siteSearchInputCriteria));
								localStorageSiteSearchInputShare
										.setData(JSON
												.parse(localStorage
														.getItem('siteSearchInputCriteriaFilter')));
							}

							$scope.selectedOptionForSearch = "Site/Provider Name or ID";

							$scope.setSiteMetadataProperty = function() {
								$scope.selectedLabel = $scope.selectedOptionForSearch;

								if (sharedCobrand.getData() > 0) {
									$scope.selectedCobrand = sharedCobrand
											.getData();
								}
								if ($scope.selectedCobrand == null
										|| $scope.selectedCobrand == undefined) {
									$scope.selectedCobrand = cobrandIdentifier;
								}

								var dropDownForSiteSearchTier2 = [ {
									name : "Site/Provider Name or ID",
									value : "Site/Provider Name or ID",
								}, {
									name : "URL",
									value : "URL",
								}, {
									name : "Agent Name",
									value : "Agent Name",
								} ];

								var dropDownForSiteSearchTier1 = [ {
									name : "Site/Provider Name or ID",
									value : "Site/Provider Name or ID",
								}, {
									name : "URL",
									value : "URL",
								} ];

								if ($scope.homeCobrand == true) {
									$scope.dropDownForSiteSearch = dropDownForSiteSearchTier2;
								} else {
									$scope.dropDownForSiteSearch = dropDownForSiteSearchTier1;
								}

							}

							$scope.validateInput = function() {
								if ($scope.siteSearchInputCriteria == null
										|| $scope.siteSearchInputCriteria == ""
										|| $scope.siteSearchInputCriteria == undefined) {
									$scope.inputValueErrorMsg = $scope.staticLabels.err_criteria_fill_label;
								} else if (($scope.selectedLabel != $scope.staticLabels.display_name_label)
										&& !(isNaN($scope.siteSearchInputCriteria))) {
									$scope.inputValueErrorMsg = $scope.staticLabels.err_criteria_valid_label;
								} else if ((isNaN($scope.siteSearchInputCriteria))
										&& $scope.siteSearchInputCriteria.length < 3) {
									$scope.inputValueErrorMsg = $scope.staticLabels.err_criteria_valid_label;
								} else if ((($scope.selectedLabel == $scope.staticLabels.display_name_label) || ($scope.selectedLabel == $scope.staticLabels.agent_name_label))
										&& $scope.siteSearchInputCriteria.length > 50) {
									$scope.inputValueErrorMsg = $scope.staticLabels.err_criteria_valid_label;
								} else if ((($scope.selectedLabel == $scope.staticLabels.display_name_label))
										&& ($scope.siteSearchInputCriteria
												.indexOf("http") > -1
												|| $scope.siteSearchInputCriteria
														.indexOf(".") > -1 || $scope.siteSearchInputCriteria
												.indexOf("/") > -1)) {
									$scope.inputValueErrorMsg = $scope.staticLabels.err_criteria_valid_label;
								} else if (($scope.selectedLabel.indexOf("URL") != -1)
										&& ($scope.siteSearchInputCriteria.length > 200)) {
									$scope.inputValueErrorMsg = $scope.staticLabels.err_criteria_valid_label;
								}
							}

							$scope.changeLabel = function() {
								$scope.selectedLabel = $scope.selectedOptionForSearch;
								$scope.siteSearchInputCriteria = "";
								$scope.inputValueErrorMsg = "";
								$scope.siteResultsErrorMsg = "";
							}
							$scope.localStorageFromSiteDetail = $stateParams.responseDetails;

							angular
									.forEach(
											$scope.localStorageFromSiteDetail,
											function(value, key) {
												$scope.siteResults = $scope.localStorageFromSiteDetail.data;

												if ($scope.siteResults.length > 200) {
													$scope.siteResultsErrorMsg = $scope.staticLabels.err_results_overflow;
													$scope.loadingSiteResults = false;
													$scope.isCollapsedSiteSearch = true;
													return;
												}

												$scope.pager = {};
												$scope.setPage = setPage;

												initController();

												function initController() {
													var page = $scope.localStorageFromSiteDetail.pageActive;
													var activeIndex = Number(page) + 2;
													$timeout(
															function() {
																var elem = document
																		.querySelector('ul.pagination li:nth-child('
																				+ activeIndex
																				+ ')').classList;
																elem
																		.add('active');
															}, 2000);
													// initialize to page 1
													setPage(page);
												}

												function setPage(page) {

													if (page < 1
															|| page > $scope.pager.totalPages) {
														return;
													}
													// get pager object from service
													$scope.pager = PagerService
															.GetPager(
																	$scope.siteResults.length,
																	page);

													// get current page of items
													$scope.filteredSiteResults = $scope.siteResults
															.slice(
																	$scope.pager.startIndex,
																	$scope.pager.endIndex + 1);
													$scope.loadingSiteResults = false;
													$scope.isCollapsedSiteSearch = true;
												}
												$scope.selectedCobrand = $scope.localStorageFromSiteDetail.cobrandFilter;
												$scope.selectedOptionForSearch = $scope.localStorageFromSiteDetail.labelFilter;
												$scope.siteSearchInputCriteria = $scope.localStorageFromSiteDetail.inputSearchFilter;
											});
							$('ul.pagination li').removeClass('active');
							$(document).on(
									'click',
									"ul.pagination li",
									function() {

										$('ul.pagination li').removeClass(
												'active');

									});
						} ]);
