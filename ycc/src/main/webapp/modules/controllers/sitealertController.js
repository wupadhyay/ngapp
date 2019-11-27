angular.module('Controllers')
		.controller(
				'SitealertController',
				[
						'$scope',
						'$controller',
						'$filter',
						'$compile',
						'ApplicationService',
						'$state',
						'$timeout',
						'DashboardService',
						'NotificationService',
						'GlobalMessageService',
						'Navigation',
						'PagerService',
						'$window',
						'$q',
						function($scope, $controller, $filter, $compile,
								appService, $state, $timeout,dashboardService,
								notificationService, globalMessageService,Navigation, PagerService,
								$window, $q) {

							angular.extend(this, $controller('ApplicationController', {$scope : $scope}));
							
							$scope.initSiteAlert = function() {
								$scope.getLabels("", function() {
									$scope.getUserType("", function() {
										$scope.getSiteAlertData();
										if($scope.isPrimary == true && $scope.homeCobrand == true){
											highlight("notification3");
										} else if ($scope.homeCobrand == false){
											highlight("notification1");
										} else if ($scope.isPrimary == false && $scope.homeCobrand == true){
											highlight("notification2");
										}
										var sFooter = document.getElementById('include-footer');
										if ($state.current.name == 'communicationDashboard.communication') {
				    					
										  sFooter.style.position='absolute';
										  sFooter.style.bottom='0';
										}
										updateScroll();
									});
									
								});
							};
							
							function updateScroll () {
							    var measure = $('#siteAlert'),
							        footerHeight = $('#include-footer').offset().top,
							        divOffsetTop = measure.offset().top,
							        delta =  Math.abs(footerHeight - divOffsetTop)-70;
							       
							    	$('.commScroll').css('height',delta+'px');
							}
								
							$(window).scroll(updateScroll);
							
							$(window).resize(function() {
								updateScroll();
							});
							
							$scope.filter.showClosedSiteAlert = false;
							$scope.filterTab = 'Ongoing';
							
							$('.commScroll').scroll(function () {
	        					if ($(this).scrollTop() > 100) {
	            			$('#scrollTop').fadeIn();
	        					} else {
	            			$('#scrollTop').fadeOut();
	        					}
	    					});
							$scope.backToTop = function () {
								$(".commScroll").animate({
	            				scrollTop: 0
	        					}, 600);
	        					return false;
	      					};
							
							$scope.getSiteAlertData = function(siteFormSearch){
								$scope.containers = [];						
								$scope.siteAlertRes = [];
								$scope.groupByDateSiteAlert = [];
								$scope.siteAlertData = [];
								$scope.siteAlertLoader = true;
								$scope.siteAlertErrorMsg = null;

								$scope.siteAlertFilter = {
									customerId : $scope.customerId,
									cobrandId : $scope.selectedCobrand,
									statuses : "4,5,6,7",
								};

								var request = angular.copy($scope.siteAlertFilter);
								var siteIds = Array();
								var url = Array();
								
								globalMessageService.searchGlobalMessages(request, function(data, status, headers,
											config) {
										try {											

											
											if (data == null || data == "" || data == "{}") {
												$scope.siteAlertErrorCode = 404;
												$scope.siteAlertLoader = false;
												$scope.siteAlertErrorMsg = $scope.staticLabels.NoDatafound;
												return false;
											}else if (data.indexOf($scope.staticLabels.error_code) != -1) {
												$scope.siteAlertLoader = false;
												var errResponse = JSON.parse(data);
												if (errResponse.errorCode == $scope.staticLabels.invalid_session_error_code) {
													$scope.siteAlertErrorMsg = $scope.staticLabels.invalid_session;
													return;
												}
												$scope.siteAlertErrorMsg = $scope.staticLabels.ORSErrorMsg;
												return;
											}


											var response = JSON.parse(data);
											
											$scope.notificationVal = response.notification;
																					
											var notificationData = $scope.notificationVal;

											for (var i = 0; i < notificationData.length; i++) {
												var desc = notificationData[i].description;
												var title = notificationData[i].title;
												
												var isIssuesStr = desc.indexOf('Issues  :');
												var isIssueStr = desc.indexOf('Issue  :');
												var isSiteDisplayStr = desc.indexOf('Site Display Name  :');												
												
												if(isIssuesStr !== -1){
													var description = desc.split('Issues  :')[0];													
												} else if (isIssueStr !== -1){
													var description = desc.split('Issue  :')[0];													
												} else if (isSiteDisplayStr !== -1){
													var description = desc.split('Site Display Name  :')[0];													
												}
												var errCode = notificationData[i].title.substring(notificationData[i].title.lastIndexOf("(") + 1).replace(')', '');
												
												var isInProgressStatus = title.indexOf('In-Progress');
												var isUpcomingStatus = title.indexOf('Upcoming');
												var isResolvedStatus = title.indexOf('Resolved');
												
												if(isInProgressStatus !== -1){
													var siteTitle = title.split('- In-Progress')[0];
												} else if (isUpcomingStatus !== -1){
													var siteTitle = title.split('- Upcoming')[0];
												} else if (isResolvedStatus !== -1){
													var siteTitle = title.split('- Resolved')[0];
												} else {
													var siteTitle = title;
												}
												
												var errCodeVal = isNaN(errCode);
												if(!errCodeVal){
													errCode = errCode;
												} else {
													errCode = $scope.staticLabels.na;
												}

												if(notificationData[i].lastUpdated){
													var last_updated = notificationData[i].lastUpdated.replace(/T/g,' ').replace(/Z/g,' ') + 'UTC';														
													var convertedLastUpdated = $filter('localDateConverter')(last_updated);

													var lastUpdated = convertedLastUpdated;
													var last_UpdatedDate = new Date(convertedLastUpdated.replace(/IST/g,'').replace(/-/g,'/'));
												} 
												if(notificationData[i].expectedResolutionTime){
													var expected_restTime = notificationData[i].expectedResolutionTime.replace(/T/g,' ').replace(/Z/g,' ') + 'UTC';														
													var convertedExpectedResTime = $filter('localDateConverter')(expected_restTime);

													var eta = new Date(convertedExpectedResTime.replace(/IST/g,'').replace(/-/g,'/'));
												}

												if(notificationData[i].issueStartDate){
													var issue_startDate = notificationData[i].issueStartDate.replace(/T/g,' ').replace(/Z/g,' ') + 'UTC';
													var convertedIssueStartDate = $filter('localDateConverter')(issue_startDate);

													var issueStartDate = new Date(convertedIssueStartDate.replace(/IST/g,'').replace(/-/g,'/'));
												}											
												if(notificationData[i].issueCreatedDate){
													var issueCreatedDate = notificationData[i].issueCreatedDate.replace(/T/g,' ').replace(/Z/g,' ') + 'UTC';														
													var convertedCreatedDate = $filter('localDateConverter')(issueCreatedDate);

													
													var created_date = new Date(convertedCreatedDate.replace(/IST/g,'').replace(/-/g,'/'));
												}
												var impProvider = notificationData[i].impactedProvider;
												if(impProvider != undefined){
														var siteId = null;
														var impContainers = null;
														var siteName = null;

													angular.forEach(impProvider, function(val,key){
														siteId = val.id;
														siteName = val.name;
														siteContainer = val.containers;
														
													});
												}
												var record = {
													id: notificationData[i].id,
													siteId: siteId.toString(),
													siteName:siteName,
													title: siteTitle,
													status:notificationData[i].status,
													lastupdated: lastUpdated,
													last_updated: last_UpdatedDate,
													eta: eta,
													description: description,
													impact:notificationData[i].impact,
													startDate : issueStartDate,
													errorCode: errCode,
													impContainers: siteContainer,
													updates:notificationData[i].updates,
													createdDate:created_date,
												};
												
												$scope.siteAlertData.push(record);
											}
											
											
											angular.forEach($scope.siteAlertData,function(data,key){
												angular.forEach(data.impContainers, function(val,key){
													if ($scope.containers.indexOf(val) === -1) {
														$scope.containers.push(val);
													}						
												});
											});
																						
											for (var t = 0; t < $scope.siteAlertData.length; t++) {
												siteIds[t] = $scope.siteAlertData[t].siteId;
										 	}

										 	$scope.getSiteSpecificFavicons (siteIds, function() {
												
												for (var j = 0; j < $scope.siteAlertData.length; j++) {
													var url = $scope.siteFavicons[j];
													$scope.siteAlertData[j]['favicon']= url;
												}
												$scope.siteAlertLoader = false;
												$scope.siteAlertRes = $scope.siteAlertData;
												$scope.groupBySiteAlert('Ongoing',null);

											});
											
										
										}catch (e) {
											$scope.siteAlertErrorMsg = $scope.staticLabels.GblMsgErrorMsg;
											var exception = {
												exceptionStackTrace : e.stack
														.toString()
											};
											var data = angular.copy(exception);
											appService.loggerService(data,
												function(data,status,headers,config) {
											})
										}
									});
							}
						    
							$scope.groupBySiteAlert = function(value, type){
								var siteAlertData = $scope.siteAlertRes;
								
								$scope.finalSiteAlertData = [];
								$scope.groupSiteAlert = [];
								$scope.groupByDateSiteAlert = [];
								$scope.filterStat = [];
								$scope.filterData = [];

								if(type == 'container'){
									$scope.filterSiteAlertData = [];
									var containerVal = value;
									var containerType = 'container';
									if($scope.filterTab){
										var value = $scope.filterTab;
									} else if($scope.filter.showClosedSiteAlert){
										var value = $scope.filter.showClosedSiteAlert;
										var type = 'toggle';
									}
								}
								if(type == 'searchByProviderVal'){
									$scope.siteAlertRes = $filter('filter')($scope.siteAlertRes, {'siteName': value.trim()});												    		
									if($scope.filterTab){
										var value = $scope.filterTab;
									} else if($scope.filter.showClosedSiteAlert){
										var value = $scope.filter.showClosedSiteAlert;
										var type = 'toggle';
									}
								} else if (type == 'searchByProviderId') {
									$scope.siteAlertRes = $filter('filter')($scope.siteAlertRes, {'siteId': value}, true);												    		
									if($scope.filterTab){
										var value = $scope.filterTab;
									} else if($scope.filter.showClosedSiteAlert){
										var value = $scope.filter.showClosedSiteAlert;
										var type = 'toggle';
									}
								}

								if(containerType == 'container' && containerVal != 0){
									
									$scope.filterStat = $scope.siteAlertRes.filter(function(item){
								        if(item['impContainers'] && item['impContainers'].indexOf(containerVal) != -1){
								         return item;
								        }
								     
									});
									$scope.filterSiteAlertData = $scope.filterStat;
								}

								if($scope.filter.container != 0 && ( type == 'tab' || type == 'toggle' || containerType == 'container')){
									$scope.filterData = $scope.filterSiteAlertData;
								} else {
									$scope.filterData = $scope.siteAlertRes;
								}
								if(value == 'Ongoing'){									
									$scope.finalSiteAlertData = $filter('filter')($scope.filterData, function(value, index, array){
									    if(value.status != 'Upcoming' && value.status != 'Resolved') {
									      return true;
									    }    
									});
									
								} else if (value == 'Upcoming'){
									
									$scope.finalSiteAlertData = $filter('filter')($scope.filterData, {'status':'Upcoming'});
								} else if(value == true && type == 'toggle'){
									
									$scope.finalSiteAlertData = $filter('filter')($scope.filterData, {'status':'Resolved'});
								
								} else if ((value == false && type == 'toggle')||(containerVal == 0 && containerType == 'container')){
									$scope.finalSiteAlertData = $filter('filter')($scope.filterData, function(value, index, array){
									    if(value.status != 'Upcoming' && value.status != 'Resolved') {
									      return true;
									    }    
									});
								}
								
								if($scope.finalSiteAlertData.length > 0){
									angular.forEach($scope.finalSiteAlertData,function(value,key){
				    					value.groupdate = value.lastupdated.substring(0,10);
								 	});
									$scope.finalSiteAlertData = $filter('orderBy')($scope.finalSiteAlertData, ['lastupdated'], ['desc'])
									$scope.groupSiteAlert = $filter('groupBy')($scope.finalSiteAlertData,'groupdate');
									
									
									for (key in $scope.groupSiteAlert){
									     $scope.groupByDateSiteAlert.push({'key' : key , 'value' : $scope.groupSiteAlert[key]});
									  }
									
								} else {
							
									$scope.siteAlertErrorMsg = $scope.staticLabels.NoDatafound;
								}
							}
							
							$scope.searchSiteAlert = function($event, siteFormSearch) {
								ga('send', 'event', 'input',
										'siteAlertSearch', siteFormSearch.siteAlertQuery, 2);
								
								$scope.filterTab = 'Ongoing';
								$scope.filter.showClosedSiteAlert = false;
								$scope.filter.container = '0';
								
								var searchQuery = isNaN(siteFormSearch.siteAlertQuery);
								
								var keyCode = $event.which || $event.keyCode;
								if (keyCode === 13 && siteFormSearch.siteAlertQuery !="") {	
									if(siteFormSearch == undefined){
										$scope.siteAlertLoader = true;
										$scope.getSiteAlertData();
									}
									if(searchQuery == true){
										var len = siteFormSearch.siteAlertQuery.length;
										if(len > 2){
											$scope.groupBySiteAlert(siteFormSearch.siteAlertQuery,'searchByProviderVal');
										} else {											
											return;
										}
									} else if (searchQuery == false && siteFormSearch.siteAlertQuery != ""){
										$scope.groupBySiteAlert(siteFormSearch.siteAlertQuery,'searchByProviderId');
									}
								} 
							};
							$scope.checkIfSearchCleared = function(siteFormSearch) {
								$scope.filter.container = '0';
								if (siteFormSearch.siteAlertQuery == "") {
									$scope.siteAlertLoader = true;
									$scope.getSiteAlertData();
								}
							}
							$scope.filterContainer = function(val){
								ga('send', 'event', 'select', 'siteAlertSelect',
										val, 1);
								if(val == 0){
									$scope.filterTab = 'Ongoing';
								}
								$scope.numberToScroll = 10;
								$scope.groupBySiteAlert(val,'container');
							}

							$scope.filterTab = 'Ongoing';
							
							$scope.filterStatus = function(val){
								ga('send', 'event', 'tab', 'siteAlertTabs',
										val, 4);
								$scope.filter.showClosedSiteAlert = false;
								$scope.filterTab = val;
								$scope.numberToScroll = 10;
								$scope.groupBySiteAlert(val,'tab');
							}
							$scope.isSetFilter = function(tabId) {
								return $scope.filterTab === tabId;
							};
							$scope.filterShowClosed = function(val){
								ga('send', 'event', 'toggle', 'siteAlertToggle',
										val, 4);
								$scope.numberToScroll = 10;
								$scope.groupBySiteAlert(val,'toggle');
								if(val){
									$scope.filterTab = '';
								} else {
									$scope.filterTab = 'Ongoing';

								}
							}
							$scope.handleTitlePanelclick = function(isClicked){
								if(isClicked){
									ga('send','pageview','/siteAlertExpand');
								} else {
									ga('send','pageview','/siteAlertCollapse');
								}
							}
							$scope.numberToScroll = 40;
							$scope.siteAlertLazyLoader = false;
							$scope.loadMoreSiteAlert = function(){
								$scope.siteAlertLazyLoader = true;
								if ($scope.numberToScroll + 5 < $scope.groupByDateSiteAlert.length) {
									$scope.numberToScroll += 5;
									$scope.siteAlertLazyLoader = false;
								} else {
									$scope.numberToScroll = $scope.groupByDateSiteAlert.length;
									$scope.siteAlertLazyLoader = false;
								}
							}

							$scope.getSiteSpecificFavicons = function(siteIds,
									callback) {								

								$scope.siteFavicons = [];
								$scope.siteFullName = [];								

								$scope.activeSiteSpecificFaviconFilter = {
									customerId : $scope.customerId,
									cobrandId : $scope.selectedCobrand,
									providerIds : siteIds.join(),
									fieldName : "favicon,logo,status"
								}

								var request = angular.copy($scope.activeSiteSpecificFaviconFilter);

								dashboardService.searchFavicon(request,
												function(data, status, headers,
														config) {
									try {

										if (data == null
												|| data == ""
												|| data == "{}") {
											for (var j = 0; j < siteIds.length; j++) {
												$scope.siteFavicons[j] = "";
												
												$scope.siteFullName[j] = "";
												
											}
											callback();
											return false;
										}

										var response = JSON.parse(data);
										
										var infoVal = response.provider;

										for (var j = 0; j < siteIds.length; j++) {

											for (var i = 0; i < infoVal.length; i++) {
												if (infoVal[i].id == siteIds[j]) {
													if (infoVal[i].favicon != undefined) {
														$scope.siteFavicons[j] = infoVal[i].favicon;
													} else {
														$scope.siteFavicons[j] = "";
													}
													$scope.siteFullName[j] = infoVal[i].name;
													
													break;
												} else if (siteIds.length != infoVal.length
														&& i == (infoVal.length - 1)) {
													$scope.siteFavicons[j] = "";
													
													$scope.siteFullName[j] = "";
													
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
											$scope.siteFullName[j] = "";
											
										}
										callback();
									}
								});
							};
							
						}]);