angular
		.module('Controllers')
		.controller(
				'CommunicationController',
				[
						'$scope',
						'$controller',
						'$filter',
						'$compile',
						'ApplicationService',
						'$state',
						'$timeout',
						'NotificationService',
						'GlobalMessageService',
						'Navigation',
						'PagerService',
						'$window',
						'$q',
						function($scope, $controller, $filter, $compile,
								appService, $state, $timeout,
								notificationService, globalMessageService, Navigation, PagerService,
								$window, $q) {

							angular.extend(this, $controller('ApplicationController', {$scope : $scope}));
							
							$scope.initCommunication = function() {
								$scope.getLabels("", function() {
									$scope.getUserType("", function() {
										if ($scope.homeCobrand == true) {
											$scope
													.getProdFilters(
															"",
															function() {
																$scope.prodCobrandList = $scope
																		.mapArr($scope.prodCustomersInfo.cobrandInfo);
															});
																
																$scope.filter.cobrandSelected ={
																	name: "Yodlee Tier2",
																	cobrandId: "10000004",
																	display: "Yodlee Tier2(10000004)"
																};
										}
										$scope.searchDefaultCommuications();
										$scope.getSiteAlertCnt();
										if($scope.isPrimary == true && $scope.homeCobrand == true){
											highlight("notification3");
										} else if ($scope.homeCobrand == false){
											highlight("notification1");
										} else if ($scope.isPrimary == false && $scope.homeCobrand == true){
											highlight("notification2");
										}
									});
									
								});
							};

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
							$scope.getCobMatches = function(searchText) {
								var deferred = $q.defer();
								$timeout(function() {
								   var states = $scope.prodCobrandList.filter(function(state) {
									   var cobId =state.cobrandId.toString();
									   var cobName= state.name;
										return (cobName.toUpperCase().indexOf(searchText.toUpperCase()) !== -1 
										|| cobId.indexOf(searchText.toString()) !== -1);
								});
								deferred.resolve(states);
								}, 1000);

								return deferred.promise;
						   };

							
							$scope.initCommunicationView= function(){

								$('.commScroll').scroll(function () {
		        					if ($(this).scrollTop() > 10) {
		            			$('#scrollTop').fadeIn();
		        					} else {
		            			$('#scrollTop').fadeOut();
		        					}
		    					});
								 
								$timeout(function() {
									var sFooter = document.getElementById('include-footer');
									if ($state.current.name == 'communicationDashboard.communication') {
			    					
									  sFooter.style.position='absolute';
									  sFooter.style.bottom='0';
									}
								  function updateScroll () {

								    var measure = $('#communicationView'),
								        footerHeight = $('#include-footer').offset().top,
								        divOffsetTop = measure.offset().top,
								        delta =  Math.abs(footerHeight - divOffsetTop)- 70;					       
								    $('.commScroll').css('height', delta+'px');
								}
								updateScroll();
								$(window).scroll(updateScroll);
								$(window).resize(function() {
									updateScroll();
								});
								 }, 100);
							}
							
							$scope.sideLists = [ {
								name : "Communications",
								id : 0,
								isActive : true,
								url:"communication",
								closedTagLabel : "",
								label: "Incidents & Maintenances"
							}, {
								name : "Incidents",
								id : 1,
								isActive : false,
								url:"incident",
								closedTagLabel : "closed"
							}, {
								name : "Maintenances",
								id : 2,
								isActive : false,
								url:"maintenance",
								closedTagLabel : "completed"
							}, {
								name : "Site Alerts",
								id : 3,
								isActive : false,
								url:"sitealert",
								closedTagLabel : "closed"
							}/*, {
								name : "Announcements",
								id : 4,
								isActive : false,
								url:"announcement",
								closedTagLabel : ""
							} */];

							$scope.environments = [ {
								id : "1",
								name : "All Environments"
							}, {
								id : "2",
								name : "Production"
							}, {
								id : "3",
								name : "Stage"
							} ];

							
							$scope.backToTop = function () {
								$(".commScroll").animate({
	            				scrollTop: 0
	        					}, 600);
	        					return false;
	      					};

							$scope.count_incr = true;
							$scope.formSearch = {};
							$scope.formSearch.searchBox = null;
							$scope.isNewIncident = false;
							$scope.isNewMaintainence = false;
							$scope.activeIncidents = 0;
							$scope.activeMaintenances = 0;
							$scope.closedCount = 0;
							$scope.resolvedCount = 0;
							$scope.showNewIndicatorInc = false;
							$scope.showNewIndicatorMain = false;
							$scope.upComingNotifications = [];
							$scope.showUpcomingMaintenance = false;
							$scope.searchInput = false; // Flag to indicate search is based on  input field

							$scope.searchDefaultCommuications = function() {
								$scope.offset = 1;
								$scope.fromDate = $scope.getOffsetDate($scope.offset);
								$scope.toDate = null;
								$scope.searchCommunications(null, false);
								$scope.loadMoreCall = false;
							}
						    
						    $scope.showNoDataLabel = function() {
								if ($scope.filteredCommunications != undefined
										&& $scope.filteredCommunications.length == 0) {
									if (!$scope.showUpcomingMaintenance)
										return true;
									if ($scope.filteredUpCommingNotifications.length == 0
											&& $scope.showUpcomingMaintenance == true)
										return true;
								}
								return false;
							}
							$scope.getOffsetDate = function(offSet) {
								if (offSet == undefined)
									return;
								var today = new Date();
								var initDate = new Date();
								initDate.setDate(today.getDate()
										- (90 * offSet + 1));
								var str = initDate.toISOString();
								var datePart = str.substring(0, str
										.indexOf("T"));
								var utcString = datePart + " "
										+ initDate.getUTCHours() + ":"
										+ initDate.getUTCMinutes() + ":"
										+ initDate.getUTCSeconds() + " UTC";
								return utcString;
							}

							$scope.loadMoreCommunications = function() {
								if ($scope.isBusy == true || $scope.offset > 3
										|| $scope.searchInput == true)
									return;
								$scope.offset++;
								$scope.toDate = $scope.fromDate;
								$scope.fromDate = $scope
										.getOffsetDate($scope.offset);
								$scope.loadMoreCall = true;
								$scope.searchCommunications(
												null,
												true,
												function() {
													$timeout(
															function() {
																if ($scope.isAllCollapsed == true)
																	$(
																			".dateCollapse")
																			.removeClass(
																					"in");
															}, 100);

												});

							}

							$scope.getAttachmentIcon = function(attachment) {
								if (attachment.extension.contains("xls"))
									return "xlsIcon";
								else if (attachment.extension.contains("doc"))
									return "wordImage";
								else if (attachment.extension.contains("pdf"))
									return "pdfImage";
								else if (attachment.extension.contains("msg"))
									return "mailImage";
								else if (attachment.extension.contains("txt"))
									return "txtImage";
								else if (attachment.extension.contains("ppt"))
									return "pptImage";
							}
							$scope.checkIfSearchCleared = function(formSearch) {

								if (formSearch.searchBox == "") {
									$scope.searchInput = false;
									$scope.searchDefaultCommuications();
								}
							}
							$scope.changeCobSearch =function (item)
							{

								if(item==null)
								    return;
								//Resetting the counts
								$scope.formSearch.searchBox="";
								$scope.searchInput = false;
								$scope.count_incr = true;
								$scope.showNewIndicatorInc = false;
								$scope.showNewIndicatorMain =false;
								$scope.closedCount=0;
								$scope.resolvedCount =0;
								$scope.activeIncidents=0;
								$scope.activeMaintenances=0;
								//Calling search again for different cobrand
								$scope.searchDefaultCommuications();
							}
							
							$scope.checkIfEnterKeyPressed = function($event,
									formSearch) {
								var keyCode = $event.which || $event.keyCode;
								if (keyCode === 13) {
									if($scope.filter.notificationType == null){
										var communicationLabel = 'communicationSearch';
									} else if($scope.filter.notificationType == 'INCIDENT') {
										var communicationLabel = 'incidentSearch';
									
									} else if ($scope.filter.notificationType == 'MAINTENANCE') {
										var communicationLabel = 'maintenanceSearch';
									}
									ga('send', 'event', 'input',
										communicationLabel, formSearch.searchBox, 26);
									$scope.resetCollapse();
									$scope.searchInput = true;
									this.searchCommunications(formSearch,
													false);
								}
							};
							
							$scope.showCloseToggle = function(val){
								if($scope.filter.notificationType == null){
										var communicationLabel = 'communicationShowClosed';
									} else if($scope.filter.notificationType == 'INCIDENT') {
										var communicationLabel = 'incidentShowClosed';
									
									} else if ($scope.filter.notificationType == 'MAINTENANCE') {
										var communicationLabel = 'maintenancShowClosed';
									}
								ga('send', 'event', 'toggle', communicationLabel,
										val, 4);
							};
							$scope.filterEnv = function(val){
								if($scope.filter.notificationType == null){
										var communicationLabel = 'communicationEnviroment';
									} else if($scope.filter.notificationType == 'INCIDENT') {
										var communicationLabel = 'incidentEnviroment';
									
									} else if ($scope.filter.notificationType == 'MAINTENANCE') {
										var communicationLabel = 'maintenancEnviroment';
									}
								ga('send', 'event', 'select', communicationLabel,
										val, 1);
							};
							
							$scope.isAllCollapsed = false;
							$scope.collapseAll = function() {
								if ($scope.isAllCollapsed == true) {
									$(".dateCollapse").collapse("show");
									$(".monthsGroupCollapse").collapse("show");
									$(".more-less-date").removeClass(
											"glyphicon-plus");
									$(".more-less-date").addClass(
											"glyphicon-minus");

									$(".more-less-month").removeClass(
											"glyphicon-plus");
									$(".more-less-month").addClass(
											"glyphicon-minus");

								} else {
									$(".dateCollapse").collapse("hide");
									$(".more-less-date").removeClass(
											"glyphicon-minus");
									$(".more-less-date").addClass(
											"glyphicon-plus");
								}
								$scope.isAllCollapsed = !$scope.isAllCollapsed;
							}
							$scope.handlePanelClick = function(event,isClicked) {
								if($scope.filter.notificationType == null){
									var communicationLabel = 'communicationTitle';
								} else if($scope.filter.notificationType == 'INCIDENT') {
									var communicationLabel = 'incidentTitle';
								
								} else if ($scope.filter.notificationType == 'MAINTENANCE') {
									var communicationLabel = 'maintenanceTitle';
								}
								if(isClicked){
									ga('send','pageview','/'+communicationLabel+'Expand');
								} else {
									ga('send','pageview','/'+communicationLabel+'Collapse');
								}
								
								var e = event.currentTarget;
								var n = angular.element(e).find(".more-less")[0];
								var originalClass = n.className;
								if (originalClass.indexOf("glyphicon-minus") > 0) {

									var replacedClass = originalClass
											.replace("glyphicon-minus",
													"glyphicon-plus");
									n.className = replacedClass;
								} else if (originalClass
										.indexOf("glyphicon-plus") > 0) {
									var replacedClass = originalClass
											.replace("glyphicon-plus",
													"glyphicon-minus");
									n.className = replacedClass;
								}
							}

							$scope.resetCollapse = function() {
								$scope.isAllCollapsed = false;
							}
							
							$scope.getSiteAlertCnt = function(){
								$scope.isSiteAlertCount = 0;
								$scope.isActiveSiteAlert = 0;
								$scope.showNewIndicatorSite = false;

								$scope.siteAlertFilter = {
									customerId : $scope.customerId,
									cobrandId : $scope.selectedCobrand,
									statuses : "4,5,6,7",
								};
								var request = angular.copy($scope.siteAlertFilter);

								globalMessageService.searchGlobalMessages(request, function(data, status, headers,
											config) {
									try {
										if (data == null || data == "" || data == "{}") {
											$scope.siteAlertErrorCode = 404;
											$scope.siteAlertErrorMsg = $scope.staticLabels.NoDatafound;
											return false;
										}

										var response = JSON.parse(data);
										var notificationData = response.notification;
										
										for (var j = 0; j < notificationData.length; j++) {
											if(notificationData[j].issueStartDate){						
												var issueStartDate = notificationData[j].issueStartDate;
											}
											var last24HrDate = new Date(); 
											last24HrDate.setHours(last24HrDate.getHours() - 24)
											var date = notificationData[j].lastUpdated.replace(/T/g,' ').replace(/Z/g,' ') + 'UTC';
											var convertedDate = $filter('localDateConverter')(date).replace(/IST/g,'').replace(/-/g,'/');
											
											if(notificationData[j].status == 'Resolved' && new Date(convertedDate) > new Date(last24HrDate)){
												$scope.isSiteAlertCount ++;
											}
											
											if (notificationData[j].status == 'In-Progress' ) {
												$scope.isActiveSiteAlert ++;
											}
											
											if(notificationData[j].status == 'In-Progress' && new Date(convertedDate) > new Date(last24HrDate)){
												$scope.showNewIndicatorSite = true;
											}
										}
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

							$scope.searchCommunications = function(formSearch,
									loadMore, callback) {
							   $scope.searchErrorMessage=null;
								$scope.isBusy = true;
								
								var val = formSearch != null
										&& formSearch.searchBox != null;

								if ($scope.filter.notificationType == null)
									var notiType = "Maintenance,Incident";
								else
									var notiType = $scope.filter.notificationType;
								var commEnv = $scope.filter.environment;
								if (commEnv == "All Environments")
									commEnv = null;
								
								var notificatnId=null;
								if(formSearch != null && /\d/.test(formSearch.searchBox)){
									notificatnId=formSearch.searchBox
								}
								if($scope.homeCobrand)
									searchCob =$scope.filter.cobrandSelected.cobrandId;
								else
									searchCob =$scope.customerId;

								var notificationSchCriteria = {
									customerId : $scope.customerId,
									cobrandId : searchCob,
									notificationType : notiType,
									environment : commEnv,
									description : formSearch != null ? formSearch.searchBox
											: null,
									title : formSearch != null ? formSearch.searchBox
											: null,
									notificationId : notificatnId != null ? notificatnId
													: null,
									fromDate : formSearch == null ? $scope.fromDate
											: null,
									toDate : formSearch == null ? $scope.toDate
											: null
								}
								var notificationSearchCriteria = angular
										.copy(notificationSchCriteria);
									if (loadMore != true)
									{
												$scope.communications = [];
												$scope.upComingNotifications=[];
									}
												
								if ($scope.searchInput == true) {
									$scope.communications = [];
									$scope.upComingNotifications = [];
									$scope.filteredUpCommingNotifications = []
								}
								notificationService
										.searchNotification(
												angular.copy(notificationSearchCriteria),
												function(data, status, headers,
														config) {
													$scope.isBusy = false;
													
													try {
														if (data == null
																|| data == ""
																|| data == "{}") {
															$scope.notificationLoading = false;
															$scope.searchErrorMessage = $scope.staticLabels.NoDatafound;
															if(val==true)
																 $scope.searchErrorMessage =$scope.staticLabels.no_comm_label_criteria;
															else 
															     $scope.searchErrorMessage=$scope.staticLabels.no_comm_label;	 

															return;
														} else if (data
																.indexOf($scope.staticLabels.error_code) != -1) {
															$scope.notificationLoading = false;
															var errResponse = JSON
																	.parse(data);
															if (errResponse.errorCode == $scope.staticLabels.invalid_session_error_code) {
																$scope.searchErrorMessage = $scope.staticLabels.invalid_session;
																return;
															}
															$scope.searchErrorMessage = $scope.staticLabels.ORSErrorMsg;
															return;
														}
														;

														$scope.notificationRec = JSON
																.parse(data).notification;
														$scope.notificationData = [];
														$scope.communicationRecords = [];

														if (loadMore != true)
														{
																$scope.communications = [];
																$scope.upComingNotifications=[];
														}
														
															
														angular
																.forEach(
																		$scope.notificationRec,
																		function(
																				value,
																				key) {
																			var ids = value.notificationId
																					.match(/\d+|[a-z]+/ig);
																			angular
																					.forEach(
																							ids,
																							function(
																									val,
																									key) {
																								var id = val;
																								$scope.id = parseInt(id);
																							});
																			var rec = {
																				id : $scope.id,
																				notificationId : value.notificationId,
																				created : value.created,
																				referenceTicket : value.referenceTicket,
																				startTime : value.startTime,
																				notificationType : value.notificationType,
																				endTime : value.endTime,
																				status : value.status,
																				publishTime : value.publishTime,
																				incident : value.incident,
																				impact : value.impact,
																				description : value.description,
																				serviceProductAffected : value.serviceProductAffected,
																				title : value.title,
																				environment : value.environment,
																				updates : value.updates,
																				serviceDisruption : value.serviceDisruption,
																				attachments : value.attachments
																			};
																			var convertedVal = $filter(
																					'localDateConverter')
																					(
																							rec.startTime);
																			convertedVal = convertedVal
																					.substring(
																							0,
																							convertedVal
																									.lastIndexOf(" "));
																			rec.startTimeModified = convertedVal
																					.substring(
																							0,
																							convertedVal
																									.lastIndexOf(" "));
																			if (rec.status == $scope.staticLabels.upcoming_upper_label)
																				$scope.upComingNotifications
																						.push(rec);
																			
																			else if(rec.status =="FOR YOUR INFORMATION")
																			{
																				if($scope.isLastNDays(rec.startTime,7))
																					$scope.communicationRecords.push(rec);

																			}
																			else
																				$scope.communicationRecords
																						.push(rec);
																			if ($scope.searchInput == false
																					&& $scope.count_incr == true) {
																				if ($scope
																						.isLastNDays(rec.created,1)
																						&& rec.notificationType == 'INCIDENT'&&rec.status != $scope.staticLabels.resolved_upper_label
																						&&rec.status != $scope.staticLabels.invalid_upper_label) {
																					$scope.showNewIndicatorInc = true;
																				}
																				if ($scope
																						.isLastNDays(rec.created,1)
																						&& rec.notificationType == 'MAINTENANCE' &&rec.status!=$scope.staticLabels.closed_upper_label && rec.status != $scope.staticLabels.cancel_upper_label) {
																					$scope.showNewIndicatorMain = true;
																				}
																				if (rec.notificationType == 'INCIDENT'
																						&& (rec.status == $scope.staticLabels.detected_upper_label
																								|| rec.status == $scope.staticLabels.investigating_upper_label || rec.status == $scope.staticLabels.restored_upper_label))
																					$scope.activeIncidents++;
																				else if (rec.notificationType == 'MAINTENANCE'
																						&& (rec.status == $scope.staticLabels.inProgress_upper_label || rec.status == $scope.staticLabels.extended_upper_label|| rec.status == 'FOR YOUR INFORMATION'))
																					$scope.activeMaintenances++;

																				if ((rec.status == $scope.staticLabels.closed_upper_label || rec.status == $scope.staticLabels.cancel_upper_label)
																						&& rec.updates != null
																						&& $scope.isLastNDays(rec.updates[0].createdTime,1))
																						{
																								$scope.closedCount++;
																						}																					

																				else if ((rec.status == $scope.staticLabels.resolved_upper_label
																						|| rec.status == $scope.staticLabels.invalid_upper_label))
																						{
																							
																							if(rec.updates!= null && $scope.isLastNDays(rec.updates[0].createdTime,1))
																									$scope.resolvedCount++;
																						}
																			}

																			if (rec.serviceDisruption != null) {
																				var estimatedDuration = rec.serviceDisruption.estimatedDuration;
																				var actualDuration = rec.serviceDisruption.actualDuration;
																				if (actualDuration != null||rec.status=='CLOSED'||rec.status=='RESOLVED')
																					rec.serviceDisruption.downtime = actualDuration;
																				else if (estimatedDuration != null)
																					rec.serviceDisruption.downtime = estimatedDuration;
																				if(rec.serviceDisruption.downtime!=null)
																				{
																					var convertedMinutes = $filter(
																						'ISOtoMinutesConverter')
																						(
																								rec.serviceDisruption.downtime);
																					var convertedDuration = $filter(
																						'durationFormatter')
																						(
																								convertedMinutes);
																					if (convertedMinutes > 0)
																						rec.serviceDisruption.downtime = convertedDuration;
																					else
																						rec.serviceDisruption.downtime = null;
																				}	
																			}
																		});
														$scope.count_incr = false;

														var newArr = $scope.communicationRecords;
														var oldArr = $scope.communications;
														var mergedArr = oldArr
																.concat(newArr);
														$scope.communications = mergedArr;
														$scope.communications
																.sort(function(
																		a, b) {
																	return new Date(
																			b.startTime)
																			- new Date(
																					a.startTime)
																});
														if (typeof callback === "function") {
															callback();
														}

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
							$scope.filter = {};
							$scope.filter.environment="All Environments";
							$scope.initFilters = function() {
								$scope.filter.notificationType = null;
								$scope.filter.showClosedCommunications = false;
								$scope.filter.environment = "All Environments";
							}
							$scope.initFilters();

							$scope.isLastNDays = function(date,day) {
								var convertedVal = $filter('localDateConverter')
										(date);
								convertedVal = convertedVal.substring(0,
										convertedVal.lastIndexOf(" "));
								var one_day = 24 * 60 * 60 * 1000*day;
								var a = (new Date).getTime();
								var b = new Date(convertedVal).getTime();
								var c = a - b;

								if (((new Date).getTime() - new Date(
										convertedVal).getTime()) < one_day)
									return true;
								else
									return false;

							}

						
							$scope.filterCommunicationType = function(item) {
                                var isNotificationClicked = false;
                                var filterNotiType = null;
                                
                            	if($scope.filter.notificationType==null&&item.name==$scope.sideLists[0].name||
    									$scope.filter.notificationType=='INCIDENT'&&item.name==$scope.sideLists[1].name||
    									$scope.filter.notificationType=='MAINTENANCE'&&item.name==$scope.sideLists[2].name)
    									   return;

                                if(item.name==$scope.staticLabels.communications_label || item.name ==$scope.staticLabels.incidents_label )
                                    $scope.showUpcomingMaintenance = false;
                                else
                                    $scope.showUpcomingMaintenance = true;
                                if (item.name == $scope.sideLists[0].name) {

                                    filterNotiType = null;
                                    isNotificationClicked = true;
                                } else if (item.name == $scope.sideLists[1].name) {
                                    filterNotiType = 'INCIDENT';
                                    isNotificationClicked = true;
                                } else if (item.name == $scope.sideLists[2].name) {
                                    filterNotiType = 'MAINTENANCE';
                                    isNotificationClicked = true;
                                } else
                                    filterNotiType = "others";
                                if (isNotificationClicked) {

                                    $scope.initFilters();
                                    $scope.filter.notificationType = filterNotiType;
                                    $scope.formSearch.searchBox = "";
                                    $scope
                                            .checkIfSearchCleared($scope.formSearch);
                                    $scope.resetCollapse();

                                }

                            }

							$scope.getDuration = function(endDate, startDate) {
								var convertedVal = $filter('localDateConverter')
										(startDate);
								convertedVal = convertedVal.substring(0,
										convertedVal.lastIndexOf(" "));

								var convertedEndDate = $filter(
										'localDateConverter')(endDate);
								convertedEndDate = convertedEndDate.substring(
										0, convertedEndDate.lastIndexOf(" "));

								var a = new Date(convertedVal).getTime();
								var b = new Date(convertedEndDate).getTime();

								if (b > a) {
									var str = "";
									var c = b - a;
									var totalMinutes = Math.floor(c
											/ (1000 * 60));
									var str = $filter("durationFormatter")(
											totalMinutes);
									return str;
								} else
									return null;
							};
							$scope.getMonthsGroup = function() {
								val = $scope.filteredCommunications;
								var indexedMonths = []
								if (val == undefined)
									return;

								for (i = 0; i < val.length; i++) {
									var flag = true;
									var startDateVal = val[i].startTimeModified;
									var sTDate = new Date(startDateVal);
									var year = sTDate.getFullYear();
									var month = sTDate.getMonth();

									var month_year = {
										month : month,
										year : year
									};
									for (j = 0; j < indexedMonths.length; j++) {
										var currentYear = indexedMonths[j].year;
										var currentMonth = indexedMonths[j].month;
										if (currentYear == year
												&& currentMonth == month) {
											flag = false;
											break;
										}
									}
									if (flag == true)
										indexedMonths.push(month_year);
								}
								return indexedMonths;

							};

							$scope.filteredCommunications = [];
							$scope.filteredUpCommingNotifications = [];
							$scope.monthsGroup = $scope.getMonthsGroup();
							$scope.filterCommuncationProperties = function(data) {
								var matches = true;
								if ($scope.filter.notificationType != null
										&& data.notificationType != $scope.filter.notificationType)
									matches = false;

								if ($scope.filter.showClosedCommunications == false
										&& (data.status == $scope.staticLabels.closed_upper_label
												|| data.status == $scope.staticLabels.resolved_upper_label
												|| data.status == $scope.staticLabels.invalid_upper_label || data.status == $scope.staticLabels.cancel_upper_label))
									matches = false;

								if (($scope.filter.environment == "Production" && data.environment != "Production")
										|| ($scope.filter.environment == "Stage" && data.environment != "Stage"))
									matches = false;

								return matches;
							};

							$scope
									.$watch(
											"communications | filter:filterCommuncationProperties",
											function(newVal) {
												$scope.filteredCommunications = newVal;
												//Adding loadMoreCall condition to avoid duplicate calls when loadMoreComm function is called
												if ($scope.filteredCommunications.length == 0
														&& $scope.loadMoreCall != true) {
													$scope
															.loadMoreCommunications();

												}
											 	if($scope.showNoDataLabel())
													   $scope.searchErrorMessage="No notifications available";
												

												$scope.monthsGroup = $scope
														.getMonthsGroup();
											}, true);

							$scope
									.$watch(
											"upComingNotifications | filter:filterCommuncationProperties",
											function(newVal) {
												$scope.filteredUpCommingNotifications = newVal;

											}, true);

							$scope.notificationsToFilter = function() {
								indexedNotifications = [];
								indexedMonths = [];
								return $scope.filteredCommunications;
							}

							$scope.dateGroups = function(notification) {
								var lastUpdatedVal = notification.startTimeModified;
								var notificationIsNew = indexedNotifications
										.indexOf(lastUpdatedVal) == -1;
								if (notificationIsNew) {
									indexedNotifications.push(lastUpdatedVal);
								}
								return notificationIsNew;
							}
							$scope.filterMonths = function(notification, value) {
								var lastUpdatedVal = notification.startTimeModified;
								var date = new Date(lastUpdatedVal);
								var res = (date.getFullYear() == val.year && date
										.getMonth() == val.month);
								return res;

							}

							function dataURItoBlob(dataURI) {

								var byteString;
								if (dataURI.split(',')[0].indexOf('base64') >= 0)
									byteString = atob(dataURI.split(',')[1]);
								else
									byteString = unescape(dataURI.split(',')[1]);

								var mimeString = dataURI.split(',')[0]
										.split(':')[1].split(';')[0];

								var ia = new Uint8Array(byteString.length);
								for (var i = 0; i < byteString.length; i++) {
									ia[i] = byteString.charCodeAt(i);
								}
								return new Blob([ ia ], {
									type : mimeString
								});
							}
							$scope.downloadFile = function(file) {

								var req = {
									customerId : $scope.customerId,
									attachmentId : file.attachmentId,
								};
								var data = angular.copy(req);
								var fileName = file.name + '.' + file.extension;
								var a = document.createElement("a");
								document.body.appendChild(a);
								notificationService
										.downloadAttachment(
												data,
												function(data, status, headers,
														config) {
													try {
														var response = JSON
																.parse(data);
														;
														var base64Data = response.attachment.content;
														var base64File = 'data:'
																+ response.attachment.extension
																+ ';base64,'
																+ base64Data;
														var dataURL = base64File;
														var blob = dataURItoBlob(dataURL);

														var file = new Blob(
																[ blob ],
																{
																	type : response.attachment.extension
																});
														var fileURL = window.URL
																.createObjectURL(file);
														a.href = fileURL;
														a.download = fileName;
														a.click();
														if ($scope.checked) {
															$timeout(
																	function() {
																		$scope.checked = true;
																	}, 10);
														}

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
							};

						}//End main function
				]);