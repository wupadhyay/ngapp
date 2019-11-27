angular
		.module('Controllers')
		.controller(
				'NotificationController',
				[
						'$scope',
						'$controller',
						'$filter',
						'$compile',
						'ApplicationService',
						'$state',
						'$timeout',
						'NotificationService',
						'Navigation',
						'PagerService',
						'$window',
						'$q', '$uibModal',
						function($scope, $controller, $filter, $compile,
								appService, $state, $timeout,
								notificationService, Navigation, PagerService,
								$window, $q,$uibModal) {

							angular.extend(this, $controller(
									'ApplicationController', {
										$scope : $scope
									}));

							$scope.initNotification = function() {
								$scope.getLabels("", function() {
									$scope.getUserType("", function() {
										if ($scope.homeCobrand == true) {
											$scope.getProdFilters("", function() {
												$scope.prodCobrandList = $scope.mapArr($scope.prodCustomersInfo.cobrandInfo);
											});
											$scope.getStageFilters("", function() {
												$scope.stagecobrandList = $scope.mapArr($scope.stageCustomerInfo.cobrandInfo);
											});
										}
										if ($state.current.name == 'notification') {
											$scope.searchNotifications();
										}
										if($scope.isPrimary == true && $scope.homeCobrand == true){
											highlight("notification3");
										} else if ($scope.homeCobrand == false){
											highlight("notification1");
										} else if ($scope.isPrimary == false && $scope.homeCobrand == true){
											highlight("notification2");
										}
										var sFooter = document.getElementById('include-footer');
										sFooter.style.position = 'relative';
									});
									
								});
							};
							
							$scope.showConfirm = function(val) {
								if (val == 'notification.create.customer'){
									var modalInstance =  $uibModal.open({
									  template: '<div class="modal-body"><h4>Please select atleast one cobrand</h4></div><div  class="modal-footer"> <button class="btn btn-primary" ng-click="cancel()">OK</button></div>',
									  controller: 'ModalInstanceCtrl',
									});
								} else {
								var modalInstance =  $uibModal.open({
								  template: '<div class="modal-body"><h4>Data will not be saved</h4></div><div  class="modal-footer"> <button class="btn btn-default" ng-click="ok()">OK</button> <button class="btn btn-primary" ng-click="cancel()">Cancel</button></div>',
								  controller: 'ModalInstanceCtrl',
								});

								
								modalInstance.result.then(function(response){
									$state.go('notification',
									{}, {
										reload : true
									});
								});
								}
							  };$scope.popUpOnIsInternal= true;
							  $scope.publishToCust=false;
							  var notificationId=null;

								$scope.showCustomerAlert =function(isInternal,isPublish,notId,publishTime)
								{
									$scope.popUpOnIsInternal= false;
									notificationId=notId;
									
										
									 	if(isInternal==true)
										{
									 		if(publishTime==undefined && !isPublish){
									 			$scope.popUpOnIsInternal=true;
											}else{
											$(".confirmModal").css(
												"display", "block");
											}

										}
										else if(isInternal==false){
											$scope.popUpOnIsInternal=true;
										}
										if(isPublish==true){
											$scope.publishToCust=true;
										}
								}
								$scope.handleYesCnf =function(){	
									$(".confirmModal").css(	"display", "none");
									$scope.popUpOnIsInternal= true

									$scope.editNotificationFormDetail(notificationId,$scope.publishToCust);

								}

								$scope.handleNoCnf =function()
								{	$(".confirmModal").css(
										"display", "none");
									$scope.popUpOnIsInternal=false;
									
								}

								$scope.notificationSubTypeSelEdit = function(val) {

								if (val == "Advisory") {
									$scope.editNotificationDetails.status = "FOR YOUR INFORMATION";
									$scope.editNotificationDetails.statusId = 4;
								} else {
									$scope.editNotificationDetails.status = $scope.viewNotificationDetails.status;
									$scope.editNotificationDetails.statusId = $scope.viewNotificationDetails.statuId;
								}
								var titleId;
								if (val == "Scheduled change activity") {
									titleId = 1;
								} else if (val == "Emergency Change activity") {
									titleId = 2;
								} else if (val == "Advisory") {
									titleId = 3;
								}
								angular
										.forEach(
												$scope.notificationSubTypes,
												function(value, key) {
													if (titleId == value.id) {
														$scope.editNotificationDetails.title = value.title;
														return false;
													}
												});
							}
							// Function to merge cobrand and subbrand list for
							// drop down
							$scope.mapArr = function(inputList) {
								var master_list = [];
								if (inputList != undefined) {
									for (i = 0; i < inputList.length; i++) {
										var a = {
											name : inputList[i].name,
											cobrandId : inputList[i].cobrandId,
											display : inputList[i].name + '('
													+ inputList[i].cobrandId
													+ ')'
										}
										master_list.push(a);
										if (inputList[i].subBrands != undefined)
											for (j = 0; j < inputList[i].subBrands.length; j++) {
												var a = {
													name : inputList[i].subBrands[j].name,
													cobrandId : inputList[i].subBrands[j].cobrandId,
													display : inputList[i].subBrands[j].name
															+ '('
															+ inputList[i].subBrands[j].cobrandId
															+ ')'
												}
												master_list.push(a);
											}

									}
								}

								return master_list;
							};

							$scope.changeEnvironment = function(field, formData) {
								formData.selectedCob = undefined;
								if (field == 'Production') {
									$scope.itemsList = $scope.prodCobrandList;

								} else if (field == 'Stage') {
									$scope.itemsList = $scope.stagecobrandList;
								} else {
									formData.environment = undefined;
									formData.selectedEnv = undefined;
								}

							};

							$scope.environmentsDropDown = [ {
								id : "1",
								name : "Production"
							}, {
								id : "2",
								name : "Stage"
							} ];

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

							$scope.showBgPopover = false;
							$scope.showDbPopover = false;
							$scope.showCobPopover = false;
							$scope.displayRCASummary = false;
							$scope.showProductPopover = false;
							$scope.showDCPopover = false;
							$scope.showUpdatesPopover = false;

							$scope.showUpdatesPopover = function(data) {
								data.showUpdatesPopover = !data.showUpdatesPopover;
							}

							$scope.notificationTypes = [ {
								id : "1",
								name : "Maintenance"
							}, {
								id : "2",
								name : "Incident"
							} ];
							
							$scope.notificationSubTypes = [ {
								id : "1",
								name : "Scheduled change activity",
								title : "Envestnet | Yodlee Maintenance Notification"
							},
							{
								id : "2",
								name : "Emergency Change activity",
								title : "Envestnet | Yodlee Emergency Maintenance Notification"
							},
							{
								id : "3",
								name : "Advisory",
								title : " Envestnet | Yodlee Advisory Maintenance Notification"
							}];

							$scope.notificationStatusList = [ {
								id : "1",
								name : "Upcoming",
								value : "UPCOMING"
							}, {
								id : "2",
								name : "In-Progress",
								value : "IN-PROGRESS"
							}, {
								id : "3",
								name : "Closed",
								value : "CLOSED"
							}, {
								id : "4",
								name : "For Your Information",
								value : "FOR YOUR INFORMATION"
							}, {
								id : "5",
								name : "Extended",
								value : "EXTENDED"
							}, {
								id : "6",
								name : "Cancel",
								value : "CANCEL"
							} ];

							$scope.downTimeTypes = [ {
								id : "1",
								name : "Complete"
							}, {
								id : "2",
								name : "Intermittent"
							} ];

							$scope.incidentStatus = [ {
								id : "1",
								name : "Detected",
								value : "DETECTED"
							}, {
								id : "2",
								name : "Investigating",
								value : "INVESTIGATING"
							}, {
								id : "3",
								name : "Restored",
								value : "RESTORED"
							}, {
								id : "4",
								name : "Resolved",
								value : "RESOLVED"
							}, {
								id : "5",
								name : "Invalid",
								value : "INVALID"
							} ];

							$scope.nextUpdateOptions = [ {
								id : "1",
								name : "2 hours"
							}, {
								id : "2",
								name : "4 hours"
							},
							{
								id : "3",
								name : "6 hours"
							},
							{
								id : "4",
								name : "8 hours"
							},
							{
								id : "5",
								name : "Custom"
							}];
							
							$scope.updateTxt = false;
                            $scope.selectUpdate = function(val){
                                if(val.name == 'Custom'){
                                    $scope.updateTxt = true;
                                } else {
                                    $scope.updateTxt = false;
                                }
                            }
							
							$scope.incidentSubStatus = [ {
								id : "1",
								name : "Customer Reported"
							}, {
								id : "2",
								name : "Yodlee Reported"
							} ];

							$scope.criticalityOptions = [{
								id : "1",
								name : "High"
							},{
								id : "2",
								name : "Medium "
							},{
								id : "3",
								name : "Low "
							}];

							$scope.priorityOptions = [{
								id : "1",
								name : "P1"
							},{
								id : "2",
								name : "P2 "
							},{
								id : "3",
								name : "P3 "
							}];
							
							$scope.impactDropdown = [{
								id:"1",
                                parent: "Add / Refresh Issues",
                                child: "Intermittent Latency while Adding MFA Accounts"
                            },{
                            	id:"2",
                                parent: "Add / Refresh Issues",
                                child: "Intermittent Timeouts while Adding Accounts"
                            },{
                            	id:"3",
                                parent: "Add / Refresh Issues",
                                child: "All Add Account Failures"
                            },{
                            	id:"4",
                                parent: "Add / Refresh Issues",
                                child: "Fast Link Latency"
                            },{
                            	id:"5",
                                parent: "Add / Refresh Issues",
                                child: "Latency Loading Transaction"
                            },{
                            	id:"6",
                                parent: "Connectivity / Timeouts",
                                child: "Intermittent Connectivity Issue"
                            },{
                            	id:"7",
                                parent: "Connectivity / Timeouts",
                                child: "All Service are Down"
                            },{
                            	id:"8",
                                parent: "Hosted App / Alerts",
                                child: "Failure to send Alerts"
                            },{
                            	id:"9",
                                parent: "Hosted App / Alerts",
                                child: "Page Unresponsive"
                            },{
                            	id:"10",
                                child: "Others"                               
                            }];
 
                            $scope.impactTxt = false;
                            $scope.selectImpact = function(val){
                                if(val.child == 'Others'){
                                    $scope.impactTxt = true;
                                } else {
                                    $scope.impactTxt = false;
                                }
                            }
 
                            function getObjectByFilter(child){
                              var x;
                              return $scope.impactDropdown.find(function(x){ return x.child === child});
                            }
                            
							$scope.datePickerOptions = {
								format : 'YYYY-MM-DD HH:mm',
								sideBySide : true,
								useCurrent : false,
								minDate : 0,
								icons : {
									up : 'fa fa-chevron-circle-up',
									down : 'fa fa-chevron-circle-down',
								},
							};

							$scope.convertToISODuration = function(duration,
									type) {
								var iso_val = null;
								if(duration==0)
								 return "PT0S";
								var units = {
									"Y" : 24 * 60 * 365 * 60,
									"Month" : 24 * 60 * 30 * 60,
									"W" : 24 * 60 * 7 * 60,
									"D" : 24 * 60 * 60,
									"H" : 60 * 60,
									"M" : 60,
									"S" : 1
								}
								if (duration > 0 && type != undefined) {
									var value = '';
									var added = false;
									if (type == 'Hours') {
										value = duration * 3600; // seconds
									} else if (type == 'Minutes') {
										value = duration * 60;
									}
									if (value != '') {
										iso_val = "P";
										for ( var unit in units) {
											var p = Math.floor(value
													/ units[unit]);
											if (p > 0) {

												if (unit == 'Month') {
													iso_val += p + 'M';
												} else if (unit == 'H') {
													iso_val += 'T' + p + 'H';
													added = true;
												}

												else if (unit == 'M') {
													if (added == false) {
														iso_val += 'T' + p
																+ 'M';
														added = true;
													} else {
														iso_val += p + 'M';
													}
												} else
													iso_val += p + unit;
											}

											value %= units[unit]
										}
									}
								}
								return iso_val;
							}
							$scope.tinymceOptions = {
								forced_root_block : "",
								content_style: ".mce-content-body {font-size:14px !important;font-family:Arial,sans-serif !important; color:#555 !important}; .mce-content-body a{color: #555 !important; text-decoration:none}",
								plugins : "paste",
								paste_auto_cleanup_on_paste : true,
								paste_remove_styles : true,
								paste_remove_styles_if_webkit: true,
								paste_strip_class_attributes: true,
								paste_as_text: true
							};

							$scope.checkDateErr = function(startDate, endDate,
									etaDate) {
								$scope.errMsgEndDate = '';
								if (!(startDate == "" || startDate == undefined)
										&& !(endDate == "" || endDate == undefined)) {
									if (new Date(startDate) > new Date(endDate)
											|| startDate == endDate) {
										$scope.errMsgEndDate = 'End Date should be greater than start date';
										$scope.formData.endTime = '';
										return false;
									}
									if (new Date(etaDate) < new Date(startDate)) {
										$scope.errMsgEtaDate = 'ETA should be greater than Start Date';
										$scope.formData.etaTime = '';
										return false;
									}
								
									
								}
							};
							


							$scope.prioritySel = function(priority) {
								if (priority == "P1"
										&& $scope.editNotificationDetails.status == $scope.staticLabels.resolved_upper_label) {
									$scope.displayRCASummary = true;
								} else {
									$scope.displayRCASummary = false;
								}
								
							};
							
							$scope.checkEtaErr = function(startDate, endDate,
									etaDate) {
								$scope.errMsgEtaDate = '';
								if (new Date(startDate) == undefined) {
									$scope.errMsgEtaDate = 'Please Select Start Date';
									$scope.formData.etaTime = '';
									return false;
								}
								if (new Date(etaDate) < new Date(startDate)) {
									$scope.errMsgEtaDate = 'ETA should be greater than Start Date';
									$scope.formData.etaTime = '';
									return false;
								}
								if (new Date(endDate) != undefined
										&& new Date(etaDate) > new Date(endDate)) {
									$scope.errMsgEtaDate = 'ETA should be less than End Date';
									$scope.formData.etaTime = '';
									return false;
								}
							};

							$scope.resetSearchForm = function() {

								$scope.formSearch.selectedEnv = undefined;
								$scope.formSearch.selectedCob = undefined;
								$scope.formSearch.searchText = undefined;
								$scope.formSearch.notificationSubType = undefined;
								$scope.formSearch.status = undefined;
								$scope.formSearch.serviceNowTicket = undefined;
								$scope.formSearch.startTime = undefined;
								$scope.formSearch.priority = undefined;
								$scope.formSearch.dependencies = undefined;
								$scope.formSearch.endTime = undefined;
							}

							$scope.notificationTypeSel = function(val,
									notificationform) {
								$scope.notiType = true;
								if (val) {
									$scope.notificationType = val.notificationType;
									$scope.formData.uploadAttachment = undefined;

									$scope.formData = {};
									$scope.errMsgEndDate = '';
									notificationform.$setPristine();
									notificationform.$setUntouched();
								}
								$scope.formData.notificationType = $scope.notificationType;
								if ($scope.formData.notificationType.name == "Maintenance"
										&& $scope.formData.status == undefined) {
									$scope.formData.status = $scope.notificationStatusList[0];
								} else if ($scope.formData.notificationType.name == "Incident"
										&& $scope.formData.status == undefined) {
									$scope.formData.status = $scope.incidentStatus[0];
									$scope.formData.downtimeSel = false;
								}

								if (val.notificationType.name == 'Incident') {
									$scope.formData.title = "Envestnet | Yodlee Notification";
								}
							}

							$scope.notificationSubTypeSel = function(val) {
								var titleId = val.id;
								angular.forEach(
									$scope.notificationSubTypes,
									function(value, key) {
										if (titleId == value.id) {
											$scope.formData.title = value.title;
											return false;
										}
									});
							}

							$scope.statusSel = function(val) {
								var titleId = val.id;
								angular.forEach($scope.incidentStatus,
								function(value, key) {
									if (titleId == value.id) {
										$scope.formData.title = value.title;
										return false;
									}
								});
							}

							 $scope.calculateActualDowntime = function(formData,
									 status, editflag) {
								 if (editflag == true) {
									 if (status == $scope.staticLabels.closed_upper_label
											 || status == $scope.staticLabels.resolved_upper_label) {
												formData.serviceDisruption.actualDuration = formData.serviceDisruption.estimatedDuration;
												formData.serviceDisruption.intervalTypeActual = formData.serviceDisruption.intervalTypeEstimated;
										
									 } else {
										 formData.serviceDisruption.actualDuration = null;
										 formData.serviceDisruption.intervalTypeActual = null;
									 }
								 } else {
									 if (status == $scope.staticLabels.closed_upper_label
											 || status == $scope.staticLabels.resolved_upper_label) {
										 formData.actualDuration = formData.estimatedDuration;
										 formData.intervalTypeActual = formData.intervalTypeEstimated;
									 } else {
										 formData.actualDuration = null;
										 formData.intervalTypeActual = null;
									 }
								 }
 
							 }
							$scope.downtimeBox = false;
							$scope.downtimeChecked = function(checked) {
								$scope.formData.downTimeType = null;
								$scope.formData.estimatedDuration = null;
								$scope.formData.actualDuration = null;
								$scope.downtimeReq = checked;
								if (checked) {
									$scope.downtimeBox = true;
									$scope.formData.intervalTypeEstimated = 'Minutes';
								} else {
									$scope.downtimeBox = false;
									$scope.formData.intervalTypeEstimated = null;
								}
							}

							$scope.limitDependency = function($event, value,
									max) {

								$scope.count = 0;
								$scope.errorExcededMaximumDependencies = false;
								$scope.count = value.split(',').length;
								if ($scope.count > max) {
									$scope.errorExcededMaximumDependencies = true;
									var pos = value.lastIndexOf(",");
									$scope.formData.dependency = value.substr(
											0, pos)
											+ value.substr(pos + 1);
									$event.preventDefault();

								} else {
									$scope.errorExcededMaximumDependencies = false;
								}

							}
							$scope.validateServiceDisruption = function($event,
									formData) {
								$scope.errorOnMaximumEstimatedTime = false;
								$scope.errorOnMaximumActualTime = false;
								$scope.errorOnInvalidEstimatedTime = false;
								$scope.errorOnInvalidActualTime = false;
								var max_hours = parseInt($scope.staticLabels.maximum_downtime_hours);
								var max_minutes = parseInt($scope.staticLabels.maximum_downtime_minutes);
								if (formData.estimatedDuration > max_hours
										&& formData.intervalTypeEstimated == 'Hours') {
									$scope.validate = false;
									$scope.errorOnMaximumEstimatedTime = true;
								}
								if (formData.estimatedDuration > max_minutes
										&& formData.intervalTypeEstimated == 'Minutes') {
									$scope.validate = false;
									$scope.errorOnMaximumEstimatedTime = true;
								}

								if (formData.actualDuration > max_hours
										&& formData.intervalTypeActual == 'Hours') {
									$scope.validate = false;
									$scope.errorOnMaximumActualTime = true;

								}

								if (formData.actualDuration > max_minutes
										&& formData.intervalTypeActual == 'Minutes') {
									$scope.validate = false;
									$scope.errorOnMaximumActualTime = true;

								}

								if (formData.downtimeSel) {
									if (!formData.estimatedDuration > 0) {
										$scope.validate = false;
										$scope.errorOnInvalidEstimatedTime = true;

									}

									if (!formData.actualDuration > 0
											&& (formData.status.name == $scope.staticLabels.closed_upper_label || formData.status.name == $scope.staticLabels.resolved_upper_label))

									{
										$scope.validate = false;
										$scope.errorOnInvalidActualTime = true;

									}
								}

								if ($scope.validate == false && $event != "") {
									$event.preventDefault();
								}

							}

							// Upload Attachment
							
							function arr_diff (a1, a2) {

							    var a = [], diff = [];
							    
							    for (var i = 0; i < a1.length; i++) {
							        a[a1[i].filename] = true;
							    }

							    for (var i = 0; i < a2.length; i++) {
							        if (a[a2[i].filename]) {
							            delete a[a2[i].filename];
							        } else {
							            a[a2[i].filename] = true;
							        }
							    }

							    for (var k in a) {
							        diff.push(k);
							    }

							    return diff;
							}
							
							$scope.fileAttached = [];
														
							$scope.createAttachment = function() {
								$scope.filesize = 0;
								$scope.fileRemoved = [];
								$scope.fileName = [];
								$scope.fileAttach = [];
								if($scope.fileAttached.length > 1){
									angular.forEach($scope.fileAttached, function(value,key){
										$scope.fileName.push(value);
										$scope.filesize = $scope.filesize + value.filesize;
									});
								}							
								$scope.fileAttach = $scope.formData.uploadAttachment;
								$scope.attachsize = 0;
								$scope.formData.uploadAttachment = null;
								var filename = $("#fileAttachment").val().toLowerCase();
								var regex = new RegExp("(.*?)\.(docx|doc|pdf|msg|ppt|xls|xlsx|pptx|txt)$");
								if ((regex.test(filename))) {
									
									angular.forEach($scope.fileAttach, function(val,key){
										
										$scope.fileName.push(val);
										$scope.attachsize = val.filesize;
										$scope.filesize = $scope.filesize + $scope.attachsize;
										var fileExist = $scope.fileAttached.some(function(el){ return el.filename === val.filename});
										
										if($scope.filesize < 10500000 && !fileExist){
											
											$scope.fileAttached.push(val);
										}
									});
									$scope.formData.uploadAttachment = angular.copy($scope.fileAttached);
									$scope.uploadAttach = $scope.formData.uploadAttachment;
								} else {									
									$scope.formData.uploadAttachment = $scope.uploadAttach;
								}

								$scope.fileRemoved = arr_diff($scope.fileName, $scope.formData.uploadAttachment);
								
								if (/^\s*$/.test(filename)) {
									$(".file-upload").removeClass('active');
								} else {
									$(".file-upload").addClass('active');
								}
							};

							$scope.uploadButtonText = "Add";
							$scope.uploadErr = false;
							$scope.upload = {};
							$scope.rca={};
							$scope.uploadDoc = function(fileObj, isRCA) {

								if ($scope.tempAttachment == undefined) {
									$scope.tempAttachment = [];
								}
								if ($scope.uploadAttachment == undefined) {
									$scope.uploadAttachment = [];
								}
								$scope.uploadErr = false;
								if (fileObj == undefined) {
									$scope.uploadErr = true;
									return;
								}
								$scope.searchAttachmentId = null;
								angular
										.forEach(
												$scope.viewNotificationDetails.attachments,
												function(val, key) {
													if (val.attachmentId) {
														$scope.searchAttachmentId = val.attachmentId;
													}
												});

								$scope.uploadButtonText = "Adding";
								if (isRCA) {
									var rca = 'RCA';
								} else {
									var rca = 'No';
								}
								var base64 = fileObj.base64;
								var filename = fileObj.filename.split('.')[0];
								var filetype = fileObj.filename.split('.')[1];

								var rec = {
									name : filename,
									extension : filetype,
									content : base64,
									type : rca,
								};

								$timeout(
										function() {

											if ($scope.viewNotificationDetails.attachments != undefined
													&& $scope.searchAttachmentId != undefined) {
												$scope.uploadAttachment
														.push(rec);
												$scope.viewNotificationDetails.attachments
														.push(rec);
											} else if (fileObj.attachmentId == undefined) {
												$scope.tempAttachment.push(rec);
												$scope.viewNotificationDetails.attachments = $scope.tempAttachment;
											}

											$scope.uploadButtonText = "Add";
											$scope.upload.attachment = undefined;
											if(isRCA){
												document.getElementById("addRcaAttachment").value="";
												$scope.rca.attachments=undefined;
											}
										}, 2000);

							};

							$scope.removeAttachment = function(index) {
								if ($scope.tempAttachment.length > 0) {
									$scope.tempAttachment.splice(index, 1);
								}
								if ($scope.uploadAttachment.length > 0) {
									var indx = index
											- ($scope.viewNotificationDetails.attachments.length - $scope.uploadAttachment.length);
									$scope.uploadAttachment.splice(indx, 1);
									$scope.viewNotificationDetails.attachments
											.splice(index, 1);
								}
							}

							$scope.uploadDiv = false;
							$scope.addAttachment = function() {
								$scope.uploadDiv = !$scope.uploadDiv;
							}

							// Customer Page
							$scope.tab = 1;

							$scope.setTab = function(tabId,event) {
								if (angular.element(event.target).parent()
										.hasClass('active')) {
									return;
								}
								$scope.tab = tabId;
								$scope.formData.environment = 'Production';
								$scope.errCob = false;
								if (tabId == 1) {
									$scope.filtered = $scope.tabData;
									$scope.formData.filteredChannel=[];
									$scope.envChecked($scope.formData.environment);
								}
								if (tabId == 2) {
									$scope.tabData = $scope.filtered;
									$scope.filtered = [];
									$scope.formData.filtered=[];
								}
								
							};

							$scope.isSet = function(tabId) {
								return $scope.tab === tabId;
							};

							$scope.productTypes = [ {
								id : 1,
								name : 'PFM'
							}, {
								id : 2,
								name : 'IAV'
							}, {
								id : 3,
								name : 'SDG'
							}, {
								id : 4,
								name : 'Balance'
							} ];

							$scope.productTypeSel = [];

							$scope.productInfoChecked = function(id, name,
									isChecked, index) {
								if (isChecked) {
									var prodInfo = {
										id : id,
										name : name,
									};
									$scope.productTypeSel.push(prodInfo);
								} else {
									$scope.productTypeSel.splice(index, 1);
								}

							}

							$scope.showPropList = false;

							$scope.isCatChk = false;

							$scope.catChked = function(cat, isChecked, $index) {

								$scope.custInformation = false;
								if (isChecked) {
									$scope.isCatChk = true;
									this.showPropList = true;
									this.isCatChk = false;
								} else {
									this.showPropList = false;
									$scope.isCatChk = false;
									$scope.filter.dataCenter = null;
									$scope.filter.productType = null;
									$scope.filter.backendGroup = null;
									$scope.filter.dataBase = null;
									$scope.catDataSel.dataCenter = null;
									$scope.catDataSel.productType = null;
									$scope.formData.filtered = [];
								}

							};

							$scope.catTitle = {};
							$scope.isCat = {};
							$scope.$watch(function() {
								return $scope.catTitle;
							}, function(newVal, oldVal) {
								var newValIndex = 0;
								for ( var key in newVal) {
									if (newVal[key] === true)
										newValIndex = parseInt(key);
								}
								for (i = 0; i < $scope.categories.length; i++) {
									if (i === newValIndex) {
										$scope.isCat[i] = false;

									} else {
										if (newVal[newValIndex.toString()]) {
											$scope.isCat[i] = true;
											$scope.disableCSV = true;
										} else {
											$scope.isCat[i] = false;
											$scope.disableCSV = false;
										}

									}
								}
							}, true);

							$scope.custInformation = false;

							$scope.envChecked = function(env, isChecked) {
								$scope.envChkd = true;
								$scope.summaryState = false;
								$scope.cobModel = [];
								$scope.cobSubModel = [];
								$scope.environment = env;
								$scope.errCob = false;
								$scope.formData.filtered = [];
								$scope.formData.filteredChannel = [];
								$scope.csvCob = [];
								if ($scope.csvCob.length > 0 && $scope.tab == 2) {
									$scope.csvCobVal = true;
								} else if ($scope.tab == 2) {
									$scope.csvCobVal = false;
								} else if ($scope.tab == 1) {
									$scope.csvCobVal = true;
								}
								$timeout(
										function() {
											var elCobdown = angular
													.element("#notificationCobrand .dropdown-header input[type='text']");
											elCobdown
													.attr('ng-keypress',
															'enterKeyWasPressed($event)');
											$compile(elCobdown)($scope);
										}, 150);

								if (env == 'Production') {
									$scope.dataCustId = $scope.prodCustomersInfo.cobrandInfo;
								} else if (env == 'Stage') {
									$scope.dataCustId = $scope.stageCustomerInfo.cobrandInfo;
								}

								$scope.dataCust = [];
								angular
										.forEach(
												$scope.dataCustId,
												function(val, key) {

													if (val.channel == 0) {
														var type = "COBRAND";
														var rec = {
															cobrandId : val.cobrandId,
															name : val.name,
															dataBase : val.dataBase,
															environment : val.environment,
															dataCenter : val.dataCenter,
															channel : val.channel,
															backendGroup : val.backendGroup,
															subBrands : val.subBrands,
															type : type,
														};

														$scope.dataCust.push(rec);
													} else if (val.channel != 0) {
														var type = "CHANNEL";
														var rec = {
															cobrandId : val.cobrandId,
															name : val.name,
															dataBase : val.dataBase,
															environment : val.environment,
															dataCenter : val.dataCenter,
															channel : val.channel,
															backendGroup : val.backendGroup,
															subBrands : val.subBrands,
															type : type,

														};
														$scope.dataCust.push(rec);
													}

													if (val.channel != 0 && val.subBrands != undefined) {
														
														if(val.backendGroup){
															var backendGroup = val.backendGroup;
														}
														
														angular.forEach(val.subBrands,
																function(value,key) {
															var type = "SUBRAND";
															var rec = {
																cobrandId : value.cobrandId,
																name : value.name,
																dataBase : value.dataBase,
																environment : value.environment,
																dataCenter : value.dataCenter,
																channel : value.channel,
																backendGroup : backendGroup,
																subBrands : value.subBrands,
																type : type,

															};
															$scope.dataCust.push(rec);

																		});
													}

												});
								$scope.data = $scope.dataCust;

								$scope.filter = {};
								$scope.categories = [ 'dataCenter',
										'backendGroup', 'dataBase' ];

								$scope.addProps = function(obj, array) {
									if (typeof array === 'undefined') {
										return false;
									}
									return array.reduce(function(prev, item) {
										if (typeof item[obj] === 'undefined') {
											return prev;
										}
										return prev + parseFloat(item[obj]);
									}, 0);
								}

								$scope.getItems = function(obj, array) {
									return (array || []).map(function(w) {
										return w[obj];
									}).filter(function(w, idx, arr) {
										if (typeof w === 'undefined') {
											return false;
										}
										return arr.indexOf(w) === idx;
									});
								};

								// matching with AND operator
								$scope.filterByPropertiesMatchingAND = function(
										data) {
									var matchesAND = true;
									for ( var obj in $scope.filter) {
										if ($scope.filter.hasOwnProperty(obj)) {
											if (noSubFilter($scope.filter[obj]))
												continue;
											if (!$scope.filter[obj][data[obj]]) {
												matchesAND = false;
												break;
											}
										}
									}
									return matchesAND;
								};

								// matching with OR operator
								$scope.filterByPropertiesMatchingOR = function(
										data) {
									var matchesOR = true;
									for ( var obj in $scope.filter) {
										if ($scope.filter.hasOwnProperty(obj)) {
											if (noSubFilter($scope.filter[obj]))
												continue;
											if (!$scope.filter[obj][data[obj]]) {
												matchesOR = false;
											} else {
												matchesOR = true;
												break;
											}
										}
									}
									return matchesOR;
								};

								function noSubFilter(obj) {
									for ( var key in obj) {
										if (obj[key])
											return false;
									}
									return true;
								}

								$scope
										.$watch(
												"data | filter:filterByPropertiesMatchingAND",
												function(newVal) {
													$scope.filtered = newVal;
												}, true);

							}

							$scope.cobModel = [];
							$scope.cobSubModel = [];
							$scope.cobUpdateModel = [];

							$scope.cobsettings = {
								scrollableHeight : '200px',
								scrollable : true,
								enableSearch : true,
								displayProp : 'label',
								idProp : 'cobrandId',
								externalIdProp : '',
								keyboardControls : true,
								closeOnSelect : false,
								clearSearchOnClose : true,
							};
							$scope.cobsubsettings = {
								scrollableHeight : '200px',
								scrollable : true,
								enableSearch : true,
								displayProp : 'subLabel',
								idProp : 'subbrandId',
								externalIdProp : '',
								keyboardControls : true,
								closeOnSelect : false,
								clearSearchOnClose : true,
							};

							$window.onclick = function(event) {
								if (event.target
										.closest("#notificationCobrand"))
									return;
								if (event.target
										.closest("#notificationSubrand"))
									return;
								$scope.searchFilter = "";
							}

							$scope.cobSel = [];
							$scope.cobSubSel = [];
							$scope.subrandGrpData = [];
							$scope.subLoader = false;
							$scope.someVal = false;

							$scope.cobEvents = {
								onItemSelect : function(item) {
									$scope.subLoader = false;
									$scope.subrandGrpData = [];
									$scope.cobSubSel = [];
									$scope.cobSubModel = [];

									angular
											.forEach(
													$scope.cobModel,
													function(value, key) {
														if (value.subBrands) {
															var subbrand = value.subBrands;
															angular
																	.forEach(
																			subbrand,
																			function(
																					val,
																					key) {
																				var subbrandName = val.name;
																				var subbrandId = val.cobrandId;
																				var subLabel = val.name
																						+ ' - '
																						+ val.cobrandId;
																				$scope.cobSubSel
																						.push({
																							cobrandName : value.name,
																							cobrandId : value.cobrandId,
																							subbrandName : subbrandName,
																							subbrandId : subbrandId,
																							subLabel : subLabel
																						});
																			});
														}
													});
									$scope.someVal = true;
									$timeout(
											function() {
												$scope.someVal = false;
												$scope.subrandGrpData = $scope.cobSubSel;
												$scope.cobSubModel = $scope.subrandGrpData;
											}, 100);
									$timeout(function() {
										$scope.subLoader = true;
									}, 2000);
								},
								onSelectAll : function(item) {
									$timeout(function() {
										$scope.subLoader = true;
									}, 2000);
								},
								onDeselectAll : function(item) {
									$scope.subLoader = false;
									$scope.cobSubModel = [];
									$scope.subrandGrpData = [];
									$scope.cobSubSel = [];
									var cobrandFilter = JSON
											.stringify($scope.filtered);
									$scope.filtered = JSON.parse(cobrandFilter);
									$scope.someVal = true;
									$timeout(function() {

										$scope.someVal = false;
									}, 100);
									$timeout(function() {
										$scope.subLoader = false;
									}, 2000);
								},
								onItemDeselect : function(item) {
									$scope.subLoader = false;
									$scope.subrandGrpData = [];
									$scope.cobSubSel = [];
									$scope.cobSubModel = [];
									angular
											.forEach(
													item,
													function(val, key) {

														for (var i = 0; i < $scope.cobModel.length; i += 1) {
															if ($scope.cobModel[i]["cobrandId"] === val) {
																$scope.cobModel
																		.splice(
																				i,
																				1);
															}
														}
													});

									angular
											.forEach(
													$scope.cobModel,
													function(value, key) {
														if (value.subBrands) {
															var subbrand = value.subBrands;
															angular
																	.forEach(
																			subbrand,
																			function(
																					val,
																					key) {
																				var subbrandName = val.name;
																				var subbrandId = val.cobrandId;
																				var subLabel = val.name
																						+ ' - '
																						+ val.cobrandId;
																				$scope.cobSubSel
																						.push({
																							cobrandName : value.name,
																							cobrandId : value.cobrandId,
																							subbrandName : subbrandName,
																							subbrandId : subbrandId,
																							subLabel : subLabel
																						});
																			});
														}

													});

									$scope.someVal = true;
									$timeout(
											function() {
												$scope.someVal = false;
												$scope.subrandGrpData = $scope.cobSubSel;
												$scope.cobSubModel = $scope.subrandGrpData;
											}, 100);
									$timeout(function() {
										$scope.subLoader = false;
									}, 2000);

								}
							};

							$scope.subrandChked = [];

							$scope.subEvents = {
								onItemSelect : function(item) {
									$scope.cobSubSel = [];
									angular
											.forEach(
													$scope.cobModel,
													function(value, key) {
														if (value.subBrands) {
															var subbrand = value.subBrands;
															angular
																	.forEach(
																			subbrand,
																			function(
																					val,
																					key) {
																				var subbrandName = val.name;
																				var subbrandId = val.cobrandId;
																				var subLabel = val.name
																						+ ' - '
																						+ val.cobrandId;
																				$scope.cobSubSel
																						.push({
																							cobrandName : value.name,
																							cobrandId : value.cobrandId,
																							subbrandName : subbrandName,
																							subbrandId : subbrandId,
																							subLabel : subLabel
																						});
																			});
														}

													});
									$scope.subrandGrpData = $scope.cobSubSel;

								},
								onDeselectAll : function(item) {

									$scope.cobSubSel = [];
									angular
											.forEach(
													$scope.cobModel,
													function(value, key) {
														if (value.subBrands) {
															var subbrand = value.subBrands;
															angular
																	.forEach(
																			subbrand,
																			function(
																					val,
																					key) {
																				var subbrandName = val.name;
																				var subbrandId = val.cobrandId;
																				var subLabel = val.name
																						+ ' - '
																						+ val.cobrandId;
																				$scope.cobSubSel
																						.push({
																							cobrandName : value.name,
																							cobrandId : value.cobrandId,
																							subbrandName : subbrandName,
																							subbrandId : subbrandId,
																							subLabel : subLabel
																						});
																			});
														}

													});
									$scope.subrandGrpData = $scope.cobSubSel;

								},
								onItemDeselect : function(item) {

									$scope.cobSubSel = [];
									angular
											.forEach(
													$scope.cobModel,
													function(value, key) {
														if (value.subBrands) {
															var subbrand = value.subBrands;
															angular
																	.forEach(
																			subbrand,
																			function(
																					val,
																					key) {
																				var subbrandName = val.name;
																				var subbrandId = val.cobrandId;
																				var subLabel = val.name
																						+ ' - '
																						+ val.cobrandId;
																				$scope.cobSubSel
																						.push({
																							cobrandName : value.name,
																							cobrandId : value.cobrandId,
																							subbrandName : subbrandName,
																							subbrandId : subbrandId,
																							subLabel : subLabel
																						});
																			});
														}

													});
									$scope.subrandGrpData = $scope.cobSubSel;

									angular
											.forEach(
													item,
													function(val, key) {

														for (var i = 0; i < $scope.cobSubModel.length; i += 1) {
															if ($scope.cobSubModel[i]["subbrandId"] === val) {
																$scope.cobSubModel
																		.splice(
																				i,
																				1);
															}
														}
													});

								},

							};

							$scope.subrandDropdown = function() {
								$timeout(
										function() {
											var elSubCobdown = angular
													.element("#notificationSubrand .dropdown-menu .dropdown-header input[type='text']");
											elSubCobdown
													.attr('ng-keypress',
															'enterKeyWasPressed($event)');
											$compile(elSubCobdown)($scope);
										}, 100);
							}
							$scope.catDataSel = {};
							$scope.isChecked = '';
							$scope.disableCSV = false;
							$scope.disableChk = false;

							$scope.catDataChecked = function(cat, val,
									isChecked, $index) {
								$scope.errCob = false;
								if (isChecked && $scope.cobModel.length > 0) {
									$scope.cobModel = [];
									$scope.subrandGrpData = [];
									$scope.cobrandData = [];
									$scope.cobModel = [];
									$scope.cobSubModel = [];
									$scope.cobSubSel = [];
									$scope.catDataSel.dataCenter = null;
									$scope.catDataSel.productType = null;
									$scope.catDataSel.backendGroup = null;
									$scope.catDataSel.dataBase = null;
								}
								$scope.catDataSel[cat] = $scope.catDataSel[cat]
										|| [];
								$scope.catDataSel[cat][$index] = (isChecked) ? val
										: false;
								if (isChecked) {
									$scope.disableCSV = true;
									/*$(".itemDropdown .catItem input").prop(
											"disabled", true);
									angular.element(event.target).removeAttr(
											"disabled");
									angular.element(event.target).parent()
											.parent().siblings(
													'.chkBox.catItem').find(
													'input').removeAttr(
													"disabled");*/
								} else {
									$scope.cobModel = [];
									$scope.cobSubModel = [];
									if($scope.formData.filtered.length > 0){
										for (var i = $scope.formData.filtered.length - 1; i >= 0; --i) {

										    if ($scope.formData.filtered[i][cat] == val) {
										        $scope.formData.filtered.splice(i,1);
										    }
										}
									}
									if($scope.formData.filteredChannel.length > 0){
										for (var i = $scope.formData.filteredChannel.length - 1; i >= 0; --i) {

										    if ($scope.formData.filteredChannel[i][cat] == val) {
										        $scope.formData.filteredChannel.splice(i,1);
										    }
										}
									}
									if (!angular.element(event.target).parent()
											.parent().siblings(
													'.chkBox.catItem').find(
													'input').is(':checked')) {
										$scope.disableCSV = false;
										$(".itemDropdown .catItem input")
												.removeAttr("disabled");
										$scope.filter.dataCenter = null;
										$scope.filter.productType = null;
										$scope.filter.backendGroup = null;
										$scope.filter.dataBase = null;
										$scope.catDataSel.dataCenter = null;
										$scope.catDataSel.productType = null;
										$scope.catDataSel.backendGroup = null;
										$scope.catDataSel.dataBase = null;
									}
								}
							}

							$scope.enterKeyWasPressed = function($event) {
								var keyCode = $event.which || $event.keyCode;
								if (keyCode === 13) {
									$event.preventDefault();
								}
							}

							$scope.saveCustomerInfoData = function() {
								$scope.fileRemoved=[];
								$timeout(
									function() {
									$scope.showSpinner = false;

									$scope.summaryState = true;

									if ($scope.filter.dataCenter != undefined
											|| $scope.filter.dataBase != undefined
											|| $scope.filter.productType != undefined
											|| $scope.filter.backendGroup != undefined) {
										$scope.disableCSV = true;
									}
								}, 50);

							}

							$scope.editCobrandInfo = [];

							$scope.cobUpdateEvents = {
								onItemSelect : function(item) {
									angular
											.forEach(
													$scope.cobUpdateModel,
													function(val, key) {
														var cob = {
															cobrandId : val.cobrandId,
															name : val.name,
															label : val.name
																	+ ' - '
																	+ val.cobrandId,
														};
														var alreadyAvailable = false;
														for (var i = 0; i < $scope.editCobrandInfo.length; i += 1) {
															if ($scope.editCobrandInfo[i]["cobrandId"] === cob.cobrandId) {
																alreadyAvailable = true;
															}
														}
														if (!alreadyAvailable) {
															$scope.editCobrandInfo
																	.push(cob);
														}

													})
								},
								onItemDeselect : function(item) {
									angular
											.forEach(
													item,
													function(val, key) {
														if ($scope.editCobrandInfo.length < 2) {
															$scope.editCobrandInfo = [];
														}
														for (var i = 0; i < $scope.editCobrandInfo.length; i += 1) {
															if ($scope.editCobrandInfo[i]["cobrandId"] === val) {
																$scope.editCobrandInfo
																		.splice(
																				i,
																				1);
															}
														}

													})
								}
							};

							$scope.orderProperty = "-created";
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

							$scope.cancel = function(index) {
								$scope.formData.uploadAttachment.splice(index, 1);
								$scope.fileName.splice(index, 1);
								$scope.fileAttached = $scope.formData.uploadAttachment;
								$scope.attachment.splice(index, 1);
							}
							
							$scope.csvCobData = function($event, value) {
								$scope.filtered = [];
								$scope.csvCobVal = 0;
								$scope.abc = false;
								angular.element('#cobInvalid').removeClass(
										'validationerror');
								var values = value.replace(
										/[&\/\\#+()$~%.'":*?<>{}]/g, '');
								$scope.csvCobVal = values.split(',').length;
								if ($scope.csvCobVal > 0) {
									$scope.disableChk = true;
								}
								if (value == "") {
									$scope.disableChk = false;
									$scope.errCob = false;
								}
							}

							var uniqueId = function(origArr) {
								var newArr = [], origLen = origArr.length, found, x, y;

								for (x = 0; x < origLen; x++) {
									found = undefined;
									for (y = 0; y < newArr.length; y++) {
										if (origArr[x] === newArr[y]) {
											found = true;
											break;
										}
									}
									if (!found) {
										newArr.push(origArr[x]);
									}
								}
								return newArr;
							}

							$scope.formData = {};
							$scope.showSpinner = false;

							$scope.loadRequiredFieldsOnPrev = function() {
								if ($scope.formData != undefined) {
									var stTime = $scope.formData.startTime + "";
									var edTime = $scope.formData.endTime + "";
									$timeout(function() {
										$scope.formData.startTime = stTime;
										if (edTime != "undefined") {
											$scope.formData.endTime = edTime;
										} else {
											$scope.formData.endTime = null;
										}
									}, 100);
								}
							}

							$scope.numberToDisplay = 50;
							$scope.loadMore = function() {
								if ($scope.numberToDisplay + 5 < $scope.filtered.length) {
									$scope.numberToDisplay += 5;
								} else {
									$scope.numberToDisplay = $scope.filtered.length;
								}
							};

							$scope.formData = {
								filtered : []
							};
							$scope.enableChkboxes=true;
							$scope.checkAll = function() {
								$scope.formData.filtered = angular
										.copy($scope.filtered);
								$scope.enableChkboxes=false;
								if($scope.formData.filteredChannel !=undefined){
									$scope.formData.filteredChannel = [];
								}
							};
							$scope.uncheckAll = function() {
								$scope.formData.filtered = [];
								$scope.enableChkboxes=true;
								if($scope.formData.filteredChannel !=undefined){
									$scope.formData.filteredChannel = [];
								}
							};
							
							function findIndexOf(o) {
								var arr = $scope.formData.filtered;
							    for (var i = 0; i < arr.length; i++) {
							        if (arr[i].cobrandId == o.cobrandId) {
							            return i;
							        }
							    }
							    
							    return -1;
							}
							
							$scope.formData.filteredChannel=[];
							$scope.checkForChannel = function(data, index) {
								var originalIndex = $scope.dataCust.indexOf(($filter('filter')($scope.dataCust,{'cobrandId' : data.cobrandId}, true))[0]);
								if (data.type == 'CHANNEL'
										&& $scope.dataCust[originalIndex].subBrands != undefined) {
									for (var i = 0; i < $scope.dataCust[originalIndex].subBrands.length; i++) {
										$scope.filteredSubbrand = $filter(
												'filter')
												(
														$scope.dataCust,
														{
															'cobrandId' : $scope.dataCust[originalIndex].subBrands[i].cobrandId
														}, true);
										if ($scope.formData.filtered != undefined) {
											var dataAtIndex = findIndexOf($scope.filteredSubbrand[0]);
												//$scope.formData.filtered.indexOf($scope.filteredSubbrand[0]);
											if (dataAtIndex != -1) {
												$scope.formData.filtered
														.splice(dataAtIndex, 1);
											} else {
												$scope.formData.filtered
														.push($scope.filteredSubbrand[0]);
											}
										} else {
											$scope.formData.filtered
													.push($scope.filteredSubbrand[0]);
										}

									}
								}
								if($scope.formData.filteredChannel != undefined){
									var indexs=$scope.formData.filteredChannel.indexOf(data);
									if(indexs != -1){
										$scope.formData.filteredChannel.splice(indexs,1);
									}
	     						 }
							};
							
							$scope.checkForSingleChannel = function(data, index){
								var originalIndex = $scope.dataCust.indexOf(($filter('filter')($scope.dataCust,
														{'cobrandId' : data.cobrandId	}, true))[0]);
								if($scope.formData.filtered != undefined){
									var indexs=$scope.formData.filtered.indexOf(data);
									if(indexs != -1){
										$scope.formData.filtered.splice(indexs,1);
									}
	     						 }

								if (data.type == 'CHANNEL'	&& $scope.dataCust[originalIndex].subBrands != undefined) {
									for (var i = 0; i < $scope.dataCust[originalIndex].subBrands.length; i++) {
										$scope.filteredSubbrand = $filter('filter')($scope.dataCust,
											{'cobrandId' : $scope.dataCust[originalIndex].subBrands[i].cobrandId }, true);
										if ($scope.formData.filtered != undefined) {
											var dataAtIndex = $scope.formData.filtered
													.indexOf($scope.filteredSubbrand[0]);
											if (dataAtIndex != -1) {
												$scope.formData.filtered
														.splice(dataAtIndex, 1);
											}
										} 
									}
								}							
							};

							$scope.errCobReq = false;
							$scope.getCSVInput = function(formData) {
								$scope.errCobReq = false;
								$scope.filtered = [];
								$scope.csvCob = [];
								function getById(arr, id) {
									for (var d = 0, len = arr.length; d < len; d += 1) {
										if (arr[d].cobrandId == id) {
											return arr[d];
										}
									}
								}
								$scope.cobInputData = [];
								$scope.subInputData = [];
								$scope.cobIdInvalid = [];
								$scope.errCobInput = false;

								if (formData.csvCobInput != undefined) {
									var csvCobIds = formData.csvCobInput
											.replace(
													/[&\/\\#+()$~%.'":*?<>{}]/g,
													'');
									$scope.csvCobId = csvCobIds.split(',');
									if ($scope.csvCobId.length > 1000) {
										$scope.errCobInput = true;
										return;
									}
									angular.forEach($scope.data, function(val,
											key) {
										var data = {
											name : val.name,
											cobrandId : val.cobrandId,
											type : val.type
										};
										$scope.cobInputData.push(data);

									});
									$scope.cobInput = $scope.cobInputData;
									angular
											.forEach(
													uniqueId($scope.csvCobId),
													function(val, key) {
														$scope.cobById = getById(
																$scope.cobInput,
																val);
														if ($scope.cobById != undefined) {
															$scope.csvCob
																	.push($scope.cobById);
														}
														if ($scope.cobById == undefined) {
															$scope.cobIdInvalid
																	.push(val);
														}

													});
								}
								$scope.errCob = true;
								$scope.filtered = $scope.csvCob;
								$scope.csvCobVal = true;
							}

							$scope.focusInvalid = function(yourForm,formData) {
								if(formData!=undefined)
								{
									if(yourForm.$submitted&&formData.impact==null||formData.impact==undefined)
										$("#impactEle").focus();
									
								}
								if (!yourForm.$valid) {
									angular.element(
											"[name='" + yourForm.$name + "']")
											.find('.ng-invalid:visible:first')
											.focus();
									return false;
								}
							};

							$scope.saveNotificationDetail = function(formData,
									notificationform) {
								var description = formData.description;

								if (description) {
									$scope.descNotification = false;
								} else {
									$scope.descNotification = true;
									return;
								}
								if(formData.impact.child == 'Others'){
                                    var impactTxt = formData.impactText;
                                } else {
                                    var impactTxt = formData.impact.child;
                                }
                                
								if ($state.current.name == 'notification.create.detail'
										&& $scope.formData.filtered == undefined) {
									$scope.formData.environment = 'Production';
									$scope.envChecked($scope.formData.environment);
								}
								$scope.cobrandChked = [];

								if ($state.current.name == 'notification.create.customer'
										&& ($scope.formData.filtered.length > 0 ||$scope.formData.filteredChannel.length > 0)) {
									if($scope.formData.filteredChannel != undefined){
										$scope.cobDataSelected = $scope.formData.filtered.concat($scope.formData.filteredChannel);
									}else {
										$scope.cobDataSelected = $scope.formData.filtered;
									}
									$scope.cobrandChked = $scope.cobDataSelected;

								} else if ($state.current.name == 'notification.create.customer'
										&& $scope.formData.filtered == undefined
										&& $scope.tab == 2
										&& $scope.csvCob.length == 0) {
									$scope.errCobReq = true;
									return;

								} else if ($state.current.name == 'notification.create.customer'
										&& ($scope.formData.filtered == undefined || $scope.formData.filtered.length == 0)
										&& ($scope.tab == 1 || $scope.tab == 2)) {
									$scope.showConfirm($state.current.name);
									return;
								}
								if(formData.notificationType.name=='Incident'  && formData.nextUpdate != undefined ){
									if(formData.nextUpdate.name == 'Custom'){
	                                    var updateTxt = formData.nextUpdateText;
	                                } else {
	                                    var updateTxt = formData.nextUpdate.name;
	                                }
								}
								if ($scope.filter != undefined) {
									$scope.dataCenter = [];
									$scope.productType = [];
									$scope.backendGroup = [];
									$scope.dataBase = [];
									if ($scope.filter.dataCenter != undefined) {
										var dc = $scope.filter.dataCenter;
										angular.forEach(dc, function(val, key) {
											if (val == true) {
												$scope.dataCenter.push(key);
											}
										});
									}
									if ($scope.filter.productType != undefined) {
										var pt = $scope.filter.productType;
										angular.forEach(pt, function(val, key) {
											if (val == true) {
												$scope.productType.push(key);
											}
										});
									}
									if ($scope.filter.backendGroup != undefined) {
										var bg = $scope.filter.backendGroup;
										angular.forEach(bg, function(val, key) {
											if (val == true) {
												$scope.backendGroup.push(key);
											}
										});
									}
									if ($scope.filter.dataBase != undefined) {
										var db = $scope.filter.dataBase;
										angular.forEach(db, function(val, key) {
											if (val == true) {
												$scope.dataBase.push(key);
											}
										});
									}
								}

								var isYodlee=false;

								angular.forEach($scope.cobrandChked, function(val, key) {
									if(val.cobrandId == 10000004){
										isYodlee=true;
									}
								});	
								if(!isYodlee){
									var yodleeCobrand = {
										cobrandId : 10000004,
										name : "Yodlee",
									};
									$scope.cobrandChked.push(yodleeCobrand);
							}

								
								$scope.cobrandChk = [];
								for (var i = 0; i < $scope.cobrandChked.length
										&& i < 7; i++) {
									var cobData = $scope.cobrandChked[i];
									$scope.cobrandChk.push(cobData);
								}

								$scope.validateCreateForm = function(formData,
										callback) {

									var notificationType = formData.notificationType.name;
									var intervalType = formData.intervalType;
									var duration = formData.duration;
									var startDate = formData.startTime;
									var dependency = formData.dependency;
									var endDate = formData.endTime;
									var status = formData.status.name;
									$scope.errorOnMaximumEstimatedTime = false;
									$scope.errorOnMaximumActualTime = false;
									$scope.errorOnInvalidActualTime = false;
									$scope.errorOnInvalidDependencies = false;

									try {
										$scope.validate = true;
										if (notificationType == 'Maintenance') {
											var notificationSubType = formData.notificationSubType.name;
											if (notificationSubType == 'Advisory'
													&& status != 'For Your Information') {
												$scope.validate = false;
												$scope.errorOnNotificationStatus = true;
											} else {
												$scope.errorOnNotificationStatus = false;
											}
											if (notificationSubType == 'Advisory'
													&& startDate == '') {
												$scope.validate = false;
												$scope.errorStartDateEmpty = true;
											} else {
												$scope.errorStartDateEmpty = false;
											}
											if (notificationSubType == 'Advisory'
													&& endDate == '') {
												$scope.validate = false;
												$scope.errorEndDateEmpty = true;
											} else {
												$scope.errorEndDateEmpty = false;
											}
										}

										if (dependency != ''
												&& dependency != undefined) {
											var fields = dependency.split(',');
											if (fields.length > 3) {
												$scope.errorExcededMaximumDependencies = true;
												$scope.validate = false;
											} else {
												$scope.errorExcededMaximumDependencies = false;
												var patternForIndividualItems = new RegExp(
														'^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$');

												for (var k = 0; k < fields.length; k++) {
													if (fields[k] != ""
															&& !patternForIndividualItems
																	.test(fields[k])) {
														$scope.errorOnInvalidDependencies = true;
														$scope.validate = false;
													} else if (fields[k] == "") {
														$scope.errorOnInvalidDependencies = true;
														$scope.validate = false;
													}
												}
											}

										}

										$scope.validateServiceDisruption("",
												formData);
										var d = new Date();
										var monthVal = d.getMonth();
										var yearVal = d.getYear();
										var dateVal = d.getDate();

										callback();
									} catch (e) {
										$scope.validate = false;
										callback();

									}
								}

								if (notificationform.$valid) {
									$scope.validateCreateForm(formData,
											function() {
											});
								}

								if (notificationform.$valid && $scope.validate) {

									$state.go('notification.create.customer',
											{}, {
												location : false
											});
									$scope.saveData = [ formData ];
									$scope.notificationDetail = [];
									$scope.customerDetail = [];
									$scope.environmentSel = $scope.environment;

									$scope.custInfo = false;
									$scope.envSelectedError = false;

									if ($state.current.name == 'notification.create.customer'
											&& ($scope.envChkd == undefined || $scope.envChkd == false)) {
										$scope.envSelectedError = true;

									} else if ($state.current.name == 'notification.create.customer'
											&& ($scope.envChkd == true
													|| $scope.catDataSel.dataCenter.length > 0
													|| $scope.catDataSel.productType.length > 0
													|| $scope.catDataSel.dataBase.length > 0 || $scope.catDataSel.backendGroup.length > 0)) {
										$scope.envSelectedError = false;
										$state.go(
												'notification.create.summary',
												{}, {
													location : false
												});
										$scope.showSpinner = true;
									}
									
									$scope.attachment = [];
									angular.forEach($scope.saveData,
										function(value, key) {
											if (value.uploadAttachment) {
												angular.forEach(value.uploadAttachment, function(val, key) {
													var base64 = val.base64;
													var filename = val.filename.substring(0, val.filename.lastIndexOf('.'));
													var filetype = val.filename.substring(val.filename.lastIndexOf('.') + 1);

													var rec = {
															name : filename,
															extension : filetype,
															content : base64,
															type : 'No',
														};
													$scope.attachment.push(rec);
												});
											}
														var convertedActual = $scope
																.convertToISODuration(
																		formData.actualDuration,
																		value.intervalTypeEstimated);
														var convertedEstimated = $scope
																.convertToISODuration(
																		formData.estimatedDuration,
																		value.intervalTypeEstimated);

														var serviceDisruption = {
															type : value.downTimeType,
															estimatedDuration : convertedEstimated,
															actualDuration : convertedActual

														};

														var records = {

															notificationType : value.notificationType,
															notificationSubType : value.notificationSubType,
															title : value.title,
															serviceProductAffected : value.serviceProductAffected,
															status : value.status,
															subStatus : value.subStatus,
															startTime : value.startTime,
															endTime : value.endTime,
															nextUpdatePeriod : updateTxt,
															serviceNowTicket : value.serviceNowTicket,
															bugId : value.bugId,
															impact : impactTxt,
															downtimeSel : value.downtimeSel,
															actualDuration : value.actualDuration,
															estimatedDuration : value.estimatedDuration,
															downTimeType : value.downTimeType,
															estimatedDurationIntervalType : value.intervalTypeEstimated,
															actualDurationIntervalType : value.intervalTypeActual,
															serviceDisruption : $scope.downtimeBox == true ? serviceDisruption
																	: null,
															priority : value.priority,
															description : value.description,
															dependency : value.dependency,
															environment : $scope.environmentSel,
															dataCenter : $scope.dataCenter,
															productType : $scope.productType,
															backendGroup : $scope.backendGroup,
															dataBase : $scope.dataBase,
															cobrandCount : $scope.cobrandChked.length,
															cobrandInfo : $scope.cobrandChk,
															attachment : $scope.attachment,
														};
														$scope.notificationDetail
																.push(records);
													});

								}

							}

							$scope.createNotificationFunc = function(formData,	publish) {
								$scope.createAPIcalled = false;
								$scope.errorOnNotificationCreate = null;
								$scope.cobrandInfo = [];
								var startTime;
								var endTime;
								var etaTime;

								angular.forEach( $scope.notificationDetail, function(value, key) {

									if (value.dataCenter.length > 0) {
										var customerSelectionCriteria = {
											type : 'dataCenter',
											value : value.dataCenter,
										};

										$scope.customerSelectionCriteria = customerSelectionCriteria;

									} else if (value.dataBase.length > 0) {
										var customerSelectionCriteria = {
											type : 'dataBase',
											value : value.dataBase,
										};

										$scope.customerSelectionCriteria = customerSelectionCriteria;
									} else if (value.backendGroup.length > 0) {
										var customerSelectionCriteria = {
											type : 'backendGroup',
											value : value.backendGroup,
										};

										$scope.customerSelectionCriteria = customerSelectionCriteria;

									} else if (value.productType.length > 0) {
										var customerSelectionCriteria = {
											type : 'productType',
											value : value.productType,
										};

										$scope.customerSelectionCriteria = customerSelectionCriteria;
									}
									if (value.dependency != undefined
											|| value.dependency == "") {
										$scope.dependencies = value.dependency
												.split(',');
									}
									var referenceTicket = {
										serviceNowTicket : value.serviceNowTicket,
										bugId : value.bugId,
										dependencies : $scope.dependencies,
									};
									if (value.serviceDisruption != undefined) {
										var serviceDisruption = {
											type : value.serviceDisruption.type.name,
											estimatedDuration : value.serviceDisruption.estimatedDuration,
											actualDuration : value.serviceDisruption.actualDuration,

										};
									}

									angular.forEach($scope.cobrandChked, function(val, key) {
										var cob = {
											cobrandId : val.cobrandId,
											name : val.name,
										};

										$scope.cobrandInfo.push(cob);
									});
									if (publish == "publish") {
										$scope.publish = true;
									} else {
										$scope.publish = false;
									}
									if ($scope.attachment) {
										$scope.attachmentData = angular.copy($scope.attachment);
									} else {
										$scope.attachmentData = null;
									}

									
									if (value.startTime != undefined && value.startTime != "") {
										startTime = $filter('dateToUTC')(value.startTime);
										
									}
									if (value.endTime != "" && value.endTime != undefined) {
										endTime = $filter('dateToUTC')(value.endTime);
									}
									if (value.etaTime != "" && value.etaTime != undefined) {
										etaTime = $filter('dateToUTC')(value.etaTime);
									}

									if (value.notificationType.name == 'Maintenance') {
										var maintenance = {
											notificationSubtype : value.notificationSubType.name,
											notificationSubtypeId : value.notificationSubType.id,

										};
										var data = {
											notificationType : "MAINTENANCE",
											status : value.status.name,
											statusId : value.status.id,
											startTime : startTime,
											endTime : endTime,
											serviceProductAffected : value.serviceProductAffected,
											title : value.title,
											description : value.description,
											serviceDisruption : $scope.downtimeBox == true ? serviceDisruption
													: null,
											referenceTicket : referenceTicket,
											impact : value.impact,
											lastUpdated : $scope.startTime,
											environment : value.environment,
											customerSelectionCriteria : $scope.customerSelectionCriteria,
											cobrandInfo : $scope.cobrandInfo,
											maintenance : maintenance,
											isPublish : $scope.publish,
											attachments : $scope.attachmentData,
										};
										$scope.createNotification = '{"notification":' + JSON.stringify(data)+ '}';
									} else if (value.notificationType.name == 'Incident') {
										if (value.subStatus != undefined) {
											if (value.subStatus.id == 1) {
												$scope.customerReported = true;
											} else {
												$scope.customerReported = false;
											}
										}
										var incident = {
											priority : value.priority.name,
											isCustomerReported : $scope.customerReported,
											nextUpdatePeriod : value.nextUpdatePeriod,
										};
										var data = {
											notificationType : "INCIDENT",
											status : value.status.name,
											statusId : value.status.id,
											serviceProductAffected : value.serviceProductAffected,
											title : value.title,
											startTime : startTime,
											endTime : endTime,
											description : value.description,
											referenceTicket : referenceTicket,
											serviceDisruption : $scope.downtimeBox == true ? serviceDisruption
													: null,
											impact : value.impact,
											lastUpdated : $scope.startTime,
											environment : value.environment,
											customerSelectionCriteria : $scope.customerSelectionCriteria,
											cobrandInfo : $scope.cobrandInfo,
											incident : incident,
											isPublish : $scope.publish,
											attachments : $scope.attachmentData,
										};
										$scope.createNotification = '{"notification":' + JSON.stringify(data) + '}';
									}

								});

								var customerId = {
									customerId : $scope.customerId,
									notificationCreateObj : $scope.createNotification
								}

								var createNotification = angular.copy(customerId);
								$scope.createAPIcalled = true;
								notificationService.saveNotification(createNotification,function(createNotification,
														status, headers, config) {
									$scope.createAPIcalled = false;
									try {
										var response = JSON
												.parse(createNotification);
										if (createNotification == null
												|| createNotification == ""
												|| createNotification == "{}") {
											$scope.errorOnNotificationCreate = $scope.staticLabels.NoDatafound;
											return;
										} else if (createNotification
												.indexOf($scope.staticLabels.error_code) != -1) {
											var errResponse = JSON
													.parse(createNotification);

											if (errResponse.errorCode == $scope.staticLabels.invalid_session_error_code) {
												$scope.errorOnNotificationCreate = $scope.staticLabels.invalid_session;
												return;
											} else if (errResponse != null) {
												$scope.errorOnNotificationCreate = errResponse.errorMessage;
												return;
											} else {
												$scope.errorOnNotificationCreate = $scope.staticLabels.ORSErrorMsg;
												return;
											}

										}
										var id = response.notification.id;
										if($scope.publish==false)
											$scope.msg = $scope.staticLabels.notification_id_label
												+ ': '
												+ id
												+ ' '
												+ $scope.staticLabels.notification_saved_msg;
										else
											$scope.msg = $scope.staticLabels.notification_id_label+ ': '+ id+ ' '+ 
														 $scope.staticLabels.notification_published_msg;
										
										$state.go('notification',{
											success : $scope.msg
										},{location : true}).then(function(d) {
											$scope.searchNotifications();
										});

									} catch (e) {
										$scope.errorOnNotificationCreate = $scope.staticLabels.CLErrorMsg;
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

							$scope.changeValueonToggle = function(event) {
								var w = event.target.getAttribute('ng-model');
								if (w != null) {
									$scope.$eval(w) = !($scope.$eval(w));
								}

							}

							$scope.createRCAonToggle = function(val) {
								$scope.displayRCASummary = val;
							}

							$scope.addUpdateBlock = function(event,elem) {
								if(event==null)
									var targetElment= elem; 
								else
									var targetElment =event.target;	
								 
								 targetElment.classList.toggle("active");
								 var content =targetElment.nextElementSibling;
								 if (content.style.display === "block") {
									content.style.display = "none";
								} else {
									content.style.display = "block";
									}
							}

							$scope.showMain = function() {
								$('#container3').removeClass('ng-hide');
								;
							};
							$scope.mockRouteChange = function() {
								$scope.$broadcast('$locationChangeStart');
							}

							$scope.checked = false;
							$scope.toggle = function() {
								$scope.checked = !$scope.checked;
								$scope.showQuickSearch = true;
								$scope.showNotification = !$scope.showNotification;
								$scope.uploadAttachment = [];
								$scope.tempAttachment = [];
							}

							$scope.notiView = Navigation;

							$scope.advSearchBox = false;
							$scope.advSearch = function() {
								$scope.msg = null;
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

							$scope.editableMode = false;

							$scope.initializeEditFields = function() {
								if ($scope.viewNotificationDetails.serviceDisruption != null) {
									$scope.editNotificationDetails.serviceDisruption.required = true;
									if($scope.viewNotificationDetails.serviceDisruption!=undefined
										&&$scope.viewNotificationDetails.serviceDisruption.estimatedDuration!=undefined)
									{
										var convertedVal = $filter(
											'ISOtoMinutesConverter')
											(
													$scope.viewNotificationDetails.serviceDisruption.estimatedDuration);
										$scope.editNotificationDetails.serviceDisruption.estimatedDuration = convertedVal;
									}
									
									$scope.editNotificationDetails.serviceDisruption.estimatedDurationIntervalType = 'Minutes';

									if($scope.viewNotificationDetails.serviceDisruption!=undefined
										&&$scope.viewNotificationDetails.serviceDisruption.actualDuration!=undefined)
									{
										convertedVal = $filter(
											'ISOtoMinutesConverter')
											(
													$scope.viewNotificationDetails.serviceDisruption.actualDuration);
											$scope.editNotificationDetails.serviceDisruption.actualDuration = convertedVal;
									}	
									$scope.editNotificationDetails.serviceDisruption.actualDurationIntervalType = 'Minutes';
								}
							}

							 function getFilterForUpdate(child){
	                            	var x;
	                            	return $scope.nextUpdateOptions.find(function(x){ return x.name === child});
	                        }
							
							

							$scope.editFlagCheck = function(id) {
								var nextUpdate=false;
								$scope.popUpOnStatusChange = false;
								$scope.popUpMaintainence =false;
								$scope.displayRCASummary = false;
								$scope.cobUpdateModel = [];
								$scope.editNotificationDetails = null;
								$scope.notificationEditErrorMsg = null;
								$scope.partialUpdateDropdown = [];
								$scope.editCobrandInfo = [];
								$scope.etaFirstTime = false;
								var t = JSON.stringify($scope.viewNotificationDetails);
								var v = JSON.parse(t);
								$scope.editNotificationDetails = v;
								if($scope.editNotificationDetails.incident != undefined && $scope.editNotificationDetails.incident.nextUpdatePeriod != undefined) {
                                    $scope.updateTxt = $scope.editNotificationDetails.incident.nextUpdatePeriod;
                                    $scope.editNotificationDetails.incident.nextUpdatePeriod = getFilterForUpdate($scope.editNotificationDetails.incident.nextUpdatePeriod);
                                    nextUpdate=getFilterForUpdate($scope.editNotificationDetails.incident.nextUpdatePeriod);
								}
                                if($scope.editNotificationDetails.incident != undefined && $scope.editNotificationDetails.incident.nextUpdatePeriod == undefined && nextUpdate==undefined){
                                    $scope.editNotificationDetails.incident.nextUpdatePeriod = {name:"Custom"};
                                    $scope.editNotificationDetails.updateTxt = $scope.updateTxt;
                                }
								
								if ($scope.editNotificationDetails.updates != undefined) {
									$scope.updatesLength = $scope.editNotificationDetails.updates.length;
								} else {
									$scope.editNotificationDetails.updates = [];
									$scope.updatesLength = 0;
								}
								if($scope.editNotificationDetails.impact != undefined) {
                                    $scope.impactTxt = $scope.editNotificationDetails.impact;
                                    $scope.editNotificationDetails.impact = getObjectByFilter($scope.editNotificationDetails.impact);
                                }
                                if($scope.editNotificationDetails.impact == undefined){
                                    $scope.editNotificationDetails.impact = {child:'Others'};
                                    $scope.editNotificationDetails.impactTxt = $scope.impactTxt;
                                }
								$scope.editableMode = true;
								$timeout(
									function() {
										if ($scope.viewNotificationDetails.startTime != undefined) {
											$scope.viewNotificationDetails.startTime = $filter(
													'dateConverterNotification')
													(
															$scope.viewNotificationDetails.startTime);
											$scope.editNotificationDetails.startTime = $scope.viewNotificationDetails.startTime;
										}
										if ($scope.viewNotificationDetails.endTime != undefined) {
											$scope.viewNotificationDetails.endTime = $filter(
													'dateConverterNotification')
													(
															$scope.viewNotificationDetails.endTime);
											$scope.editNotificationDetails.endTime = $scope.viewNotificationDetails.endTime;
										}
										
									}, 100);

								angular.forEach($scope.editNotificationDetails.cobrandInfo,
									function(val, key) {
										if (val.isResolved == undefined) {
											var cob = {
												cobrandId : val.cobrandId,
												name : val.name,
												label : val.name
														+ ' - '
														+ val.cobrandId,
											};
											$scope.partialUpdateDropdown
													.push(cob);
										}
									});

								$scope.initializeEditFields();
							}

							$scope.partialUpdateDropdown = [];

							$scope.viewNotification = function(notificationId,
									editFlag) {
								$scope.msg = null;
								Navigation.getNotificationView();
								$scope.editFlag = editFlag;
								$scope.editableMode = editFlag;
								$scope.notificationViewErrorMsg = "";
								$scope.notificationLoading = true;
								var notificationSchCriteria = {
									customerId : $scope.customerId,
									notificationId : notificationId
								}

								var notificationSearchCriteria = angular.copy(notificationSchCriteria);
								notificationService.searchNotificationForAllData(angular.copy(notificationSearchCriteria),
									function(data, status, headers,
											config) {
									try {
										Navigation.getNotificationView();
										var response = JSON.parse(data);
										if (data == null
												|| data == ""
												|| data == "{}") {
											$scope.notificationLoading = false;
											$scope.notificationViewErrorMsg = $scope.staticLabels.NoDatafound;
											return;
										} else if (data.indexOf($scope.staticLabels.error_code) != -1) {
											$scope.notificationLoading = false;
											var errResponse = JSON
													.parse(data);
											if (errResponse.errorCode == $scope.staticLabels.invalid_session_error_code) {
												$scope.notificationViewErrorMsg = $scope.staticLabels.invalid_session;
												return;
											}
											$scope.notificationViewErrorMsg = $scope.staticLabels.ORSErrorMsg;
											return;
										};

									$scope.viewNotificationDetails = response.notification[0];

										if ($scope.viewNotificationDetails.updates != undefined) {
											angular.forEach($scope.viewNotificationDetails.updates,
											function(
													val) {
												if (val.attachments != undefined) {
													angular
															.forEach(
																	val.attachments,
																	function(
																			val) {
																		if ($scope.viewNotificationDetails.attachments == undefined) {
																			$scope.viewNotificationDetails.attachments = [];
																		}
																		$scope.viewNotificationDetails.attachments
																				.push(val);
																	})
												}
											})
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

							$scope.checkForNull = function(msg) {
								if (msg == "" || msg == undefined) {
									$scope.editNotificationDetails.updates.splice($scope.updatesLength, 1);
								}
							};

							$scope.EditingNotification = function(
									notificationId, editFlag) {
								var nextUpdate=false;
								$scope.editableMode = false;
								$scope.popUpOnStatusChange = false;
								$scope.popUpMaintainence =false;
								$scope.displayRCASummary = false;
								$scope.uploadDiv = false;
								$scope.msg = null;
								$scope.notificationEditErrorMsg = null;
								$("#editNotification").find(".filled")
										.removeClass('filled');
								$('#notification_update_description')
										.removeClass('filled');
								$scope.cobUpdateModel = [];
								$scope.editNotificationDetails = null;
								$scope.viewNotificationDetails = null;
								$scope.partialUpdateDropdown = [];
								$scope.editCobrandInfo = [];
								$scope.etaFirstTime = false;
								Navigation.getNotificationView();
								$scope.editFlag = editFlag;
								$scope.notificationViewErrorMsg = "";
								$scope.notificationLoading = true;
								angular.element("#editAddFile").find(
										"input[type='file']").val(null);
								angular.element("#editRcaAddFile").find(
										"input[type='file']").val(null);
								$scope.errorOnNotificationendTime = false;
								$scope.errorOnNotificationTitle = false;
								$scope.errorOnEmptyServiceProductAffected = false;
								$scope.errorOnEmptyUpdate = false;
								$scope.errorOnNotificationDescription = false;
								$scope.errorOnNotificationUpdateDescription = false;
								
								$scope.errorOnNotificationImpact = false;
								$scope.errorOnNotificationEmptyDowntime = false;
								$scope.errorOnNotificationDependencies = false;
								$scope.errorOnExtendedStatusSelection = false;
								$scope.errorOnNotificationSNReferenceTicket = false;
								$scope.errorOnNotificationDepencyReferenceTicket = false;
								$scope.errorOnNotificationPastendTime = false;
								
								$scope.errorOnNotificationPartialClosure = false;
								$scope.errorOnNotificationSingleDependencyReferenceTicket = false;
								$scope.errorOnNotificationSNTicket = false;
								$scope.errorOnNotificationDependencyEnd = false;

								var notificationSchCriteria = {
									customerId : $scope.customerId,
									notificationId : notificationId
								};

								var notificationSearchCriteria = angular
										.copy(notificationSchCriteria);

								notificationService
										.searchNotificationForAllData(
												angular
														.copy(notificationSearchCriteria),
												function(data, status, headers,
														config) {
													try {
														$scope.editNotificationDetails = null;
														$scope.viewNotificationDetails = null;
														var response = JSON
																.parse(data);
														if (data == null
																|| data == ""
																|| data == "{}") {
															$scope.notificationLoading = false;
															$scope.notificationViewErrorMsg = $scope.staticLabels.NoDatafound;
															return;
														} else if (data
																.indexOf($scope.staticLabels.error_code) != -1) {
															$scope.notificationLoading = false;
															var errResponse = JSON
																	.parse(data);
															if (errResponse.errorCode == $scope.staticLabels.invalid_session_error_code) {
																$scope.notificationViewErrorMsg = $scope.staticLabels.invalid_session;
																return;
															}
															$scope.notificationViewErrorMsg = $scope.staticLabels.ORSErrorMsg;
															return;
														}
														;

														$scope.editNotificationDetails = response.notification[0];
														if ($scope.editNotificationDetails.updates != undefined) {
															angular.forEach(
																$scope.editNotificationDetails.updates,function(val) {
																if (val.attachments != undefined) {
																	angular.forEach(val.attachments,
																		function(val) {
																			if ($scope.editNotificationDetails.attachments == undefined) {
																				$scope.editNotificationDetails.attachments = [];
																			}
																			$scope.editNotificationDetails.attachments.push(val);
																		})
																}
															})
														}
														var t = JSON.stringify(response);
														var v = JSON.parse(t);
														
														if($scope.editNotificationDetails.incident != undefined && $scope.editNotificationDetails.incident.nextUpdatePeriod != undefined) {
						                                    $scope.updateTxt = $scope.editNotificationDetails.incident.nextUpdatePeriod;
						                                    $scope.editNotificationDetails.incident.nextUpdatePeriod = getFilterForUpdate($scope.editNotificationDetails.incident.nextUpdatePeriod);
						                                    nextUpdate=getFilterForUpdate($scope.editNotificationDetails.incident.nextUpdatePeriod);
														}
						                                if($scope.editNotificationDetails.incident != undefined && $scope.editNotificationDetails.incident.nextUpdatePeriod == undefined && nextUpdate==undefined){
						                                    $scope.editNotificationDetails.incident.nextUpdatePeriod = {name:"Custom"};
						                                    $scope.editNotificationDetails.updateTxt = $scope.updateTxt;
						                                }
														
														$scope.viewNotificationDetails = v.notification[0];
														if ($scope.editNotificationDetails.updates != undefined) {
															$scope.updatesLength = $scope.editNotificationDetails.updates.length;
															
														} else {
															$scope.editNotificationDetails.updates = [];
															$scope.updatesLength = 0;
														}
														
														if($scope.editNotificationDetails.impact != undefined) {
			                                                $scope.impactTxt = $scope.editNotificationDetails.impact;
			                                                $scope.editNotificationDetails.impact = getObjectByFilter($scope.editNotificationDetails.impact);
			                                            }
			                                            if($scope.editNotificationDetails.impact == undefined){
			                                                $scope.editNotificationDetails.impact = {child:'Others'};
			                                                $scope.editNotificationDetails.impactTxt = $scope.impactTxt;
			                                            }
														$scope.editableMode = editFlag;
														$timeout(
																function() {
																	if ($scope.viewNotificationDetails.startTime != undefined) {
																		$scope.viewNotificationDetails.startTime = $filter(
																				'dateConverterNotification')
																				(
																						$scope.viewNotificationDetails.startTime);
																		$scope.editNotificationDetails.startTime = $scope.viewNotificationDetails.startTime;
																	}
																	if ($scope.viewNotificationDetails.endTime != undefined) {
																		$scope.viewNotificationDetails.endTime = $filter(
																				'dateConverterNotification')
																				(
																						$scope.viewNotificationDetails.endTime);
																		$scope.editNotificationDetails.endTime = $scope.viewNotificationDetails.endTime;
																	}
																	if ($scope.viewNotificationDetails.incident != undefined
																			&& $scope.viewNotificationDetails.incident.eta != undefined) {
																		$scope.viewNotificationDetails.incident.eta = $filter(
																				'dateConverterNotification')
																				(
																						$scope.viewNotificationDetails.incident.eta);
																		$scope.editNotificationDetails.incident.eta = $scope.viewNotificationDetails.incident.eta;
																	}
																}, 100);

														$scope.initializeEditFields();
														$scope.partialUpdateDropdown = [];

														angular
																.forEach(
																		$scope.editNotificationDetails.cobrandInfo,
																		function(
																				val,
																				key) {
																			if (val.isResolved == undefined) {
																				var cob = {
																					cobrandId : val.cobrandId,
																					name : val.name,
																					label : val.name
																							+ ' - '
																							+ val.cobrandId,
																				};
																				$scope.partialUpdateDropdown
																						.push(cob);
																			}
																		});

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

							document.onkeypress = function($event) {
								var keyCode = $event.which || $event.keyCode;
								if (keyCode == 13 && $scope.advSearchBox) {
									$scope.searchNotifications("",
											$scope.formSearch);
								} else if (keyCode == 13) {
									$event.preventDefault();
									$scope.searchNotifications("Id",
											$scope.formSearch);
								}
							}

							$scope.formSearch = {};
							$scope.resetNotificationSearch = function(
									formSearch) {
								$scope.formSearch = {};
							};

							$scope.searchNotifications = function(type,
									formSearch) {
								$scope.notifications = [];
								$scope.notificationSubTypeId = null;
								$scope.notificationStatusId = null;
								$scope.ticketNum = null;
								$scope.priority = null;
								$scope.startTime = null;
								$scope.endTime = null;
								$scope.uploadAttachment = [];
								$scope.tempAttachment = [];
								$scope.notificationId = null;
								$scope.dependencies=null;

								$scope.notificationType = "Maintenance,Incident";
								if (formSearch != undefined && type == 'Id') {
									$scope.msg = null;
									$scope.notificationId = formSearch.notificationIdQuery;
									$scope.notificationSubTypeId = null;
									$scope.notificationStatusId = null;
									$scope.ticketNum = null;
									$scope.priority = null;
									$scope.startTime = null;
									$scope.endTime = null;
									$scope.env = null;
									$scope.cob = null;
									$scope.dependencies=null;
									$scope.formSearch = {};
								} else if (formSearch != undefined) {
									$scope.msg = null;
									if (formSearch.notificationType != undefined)
										$scope.notificationType = formSearch.notificationType.name;
									if (formSearch.notificationSubType != undefined) {
										$scope.notificationSubTypeId = formSearch.notificationSubType.id;
									}
									if (formSearch.status != undefined) {
										$scope.notificationStatusId = formSearch.status.id;
									}
									
									if(formSearch.dependencies != undefined){
										$scope.dependencies=formSearch.dependencies;
									}


									if (formSearch.serviceNowTicket != undefined) {
										$scope.ticketNum = formSearch.serviceNowTicket;
									}
									if (formSearch.priority != undefined) {
										$scope.priority = formSearch.priority.name;
									}
									if (formSearch.selectedEnv != undefined) {
										$scope.env = formSearch.selectedEnv;
									}
									if (formSearch.selectedCob != undefined) {
										$scope.cob = formSearch.selectedCob.cobrandId
												.toString();
									}
									if (formSearch.startTime != undefined
											&& formSearch.startTime != '') {
										$scope.startTime = $filter('dateToUTC')(formSearch.startTime);		
									}
									if (formSearch.endTime != undefined
											&& formSearch.endTime != '') {
										$scope.endTime = $filter('dateToUTC')(formSearch.endTime);	
									}
									$scope.advSearchBox = false;
								}
								$scope.searchNotification();

							}

							$scope.searchNotification = function(isExport,
									callback) {
								$scope.notificationSearchErrorMsg = "";
								var notificationSchCriteria = {
									customerId : $scope.customerId,
									notificationId : $scope.notificationId,
									notificationType : $scope.notificationType,
									notificationSubType : $scope.notificationSubTypeId,
									notificationStatus : $scope.notificationStatusId,
									ticketNum : $scope.ticketNum,
									bugNum : $scope.bugNum,
									priority : $scope.priority,
									startTime : $scope.startTime,
									endTime : $scope.endTime,
									cobrandId : $scope.cob,
									environment : $scope.env,
									dependencies: $scope.dependencies,
									isExportRequest : isExport == true ? "true"
											: "false"
								};

								var notificationSearchCriteria = angular
										.copy(notificationSchCriteria);

								notificationService
										.searchNotificationForAllData(
												angular
														.copy(notificationSearchCriteria),
												function(data, status, headers,
														config) {
													try {
														if (data == null
																|| data == ""
																|| data == "{}") {
															$scope.notificationLoading = false;
															$scope.notificationSearchErrorMsg = $scope.staticLabels.NoDatafound;
															return;
														} else if (data
																.indexOf($scope.staticLabels.error_code) != -1) {
															$scope.notificationLoading = false;
															var errResponse = JSON
																	.parse(data);
															if (errResponse.errorCode == $scope.staticLabels.invalid_session_error_code) {
																$scope.notificationSearchErrorMsg = $scope.staticLabels.invalid_session;
																return;
															}
															$scope.notificationSearchErrorMsg = $scope.staticLabels.ORSErrorMsg;
															return;
														}
														;
														$scope.notificationRec = JSON
																.parse(data).notification;
														$scope.notificationData = [];
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
																			if (isExport == true) {
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
																					lastupdated : value.lastupdated,
																					title : value.title,
																					cobrandInfo : value.cobrandInfo,
																					description : value.description,
																					serviceProductAffected : value.serviceProductAffected
																				};
																				rec.startTime =  $filter('dateConverterNotification')(rec.startTime);
																				if(rec.endTime!=null)
																					rec.endTime= $filter('dateConverterNotification')(rec.endTime);
																				rec.lastupdated	= $filter('dateConverterNotification')(rec.lastupdated);
																				rec.created= $filter('dateConverterNotification')(rec.created);
																				if(rec.publishTime!=null&&rec.publishTime!=undefined)
																					rec.publishTime= $filter('dateConverterNotification')(rec.publishTime);
																			} else {
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
																					lastupdated : value.lastupdated
																				};
																				rec.startTime =  $filter('dateConverterNotification')(rec.startTime);
																				if(rec.endTime!=null)
																					rec.endTime= $filter('dateConverterNotification')(rec.endTime);
																				rec.lastupdated	= $filter('dateConverterNotification')(rec.lastupdated);
																				rec.created= $filter('dateConverterNotification')(rec.created);
																			}
																			$scope.notificationData
																					.push(rec);
																		});

														

														if(isExport != true)
														{
															$scope.pager = {};
															$scope.setPage = setPage;
															initController();
																
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
																			$scope.notificationData.length,
																			page);

															// get current page
															// of items
															$scope.notifications = $scope.notificationData
																	.slice(
																			$scope.pager.startIndex,
																			$scope.pager.endIndex + 1);
															$scope.loadingSiteResults = false;
															$scope.isCollapsedSiteSearch = true;
														}
														if (typeof callback === 'function'
																&& callback()) {
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

							$scope.fetchExportData = function() {
								$scope
										.searchNotification(
												true,
												function() {
													$scope.excelResults = $scope.notificationData;
													angular
															.forEach(
																	$scope.excelResults,
																	function(
																			val,
																			key) {
																		if (val.incident != null) {
																			if (val.incident.isCustomerReported != null) {
																				val.incident.isCustomerReported = val.incident.isCustomerReported
																						.toString();
																			}
																		}
																		val.cobs = "";
																		if (val.description != null) {
																			var richTextVersion = val.description;
																			var semiRichText = richTextVersion
																					.replace(
																							/<br(\/)?>/ig,
																							'\r\n');
																			var plainTextVersion = $(
																					"<div></div>")
																					.html(
																							semiRichText)
																					.text();
																			plainTextVersion = plainTextVersion
																					.replace(
																							/^(\r\n|\n)*|(\r\n|\n)*$/ig,
																							"")
																					.replace(
																							/\r\n|\n/ig,
																							" ");
																			plainTextVersion = plainTextVersion
																					.replace(
																							/,/g,
																							'');
																			val.description = plainTextVersion;
																		}
																		
																		if(val.referenceTicket!=undefined&&val.referenceTicket.dependencies!=undefined)
																		{
																				var i = 0;
																				val.dependencyValues="";
																		angular
																				.forEach(
																						val.referenceTicket.dependencies,
																						function(
																								val1,
																								key1) {

																							i += 1;

																							if(i!=val.referenceTicket.dependencies.length)
																								val.dependencyValues= val.dependencyValues+ val1+"|";
																							else
																								val.dependencyValues= val.dependencyValues+ val1;
																						});
																		}
																		else
																			val.dependencyValues= null;

																		if (val.serviceProductAffected != undefined)
																			val.serviceProductAffected = val.serviceProductAffected
																					.replace(
																							/,/g,
																							'|');
																		if (val.title != undefined)
																			val.title = val.title
																					.replace(
																							/,/g,
																							' ');
																		
																		var i = 0;
																		angular
																				.forEach(
																						val.cobrandInfo,
																						function(
																								val1,
																								key1) {
																							i += 1;
																							val.cobs = val.cobs
																									+ val1.cobrandId+ '['+val1.name+']';
																							if (i != val.cobrandInfo.length) {
																								val.cobs = val.cobs
																										+ "|";
																							}
																						});
																	});

													$timeout(
															function() {
																if ($scope.excelResults.length != 0)
																	angular
																			.element(
																					"#ExportButton")
																			.click();
															}, 500)

												});
							}

							$scope.checkChangeOfFields = function(event, h) {
								var w = event.target.getAttribute('ng-model');
								if (w.indexOf("status") != -1) {
									$timeout(
											function() {
												if ($scope.viewNotificationDetails.startTime != undefined) {
													$scope.editNotificationDetails.startTime = $scope.viewNotificationDetails.startTime;
												}
												if ($scope.viewNotificationDetails.endTime != undefined) {
													$scope.editNotificationDetails.endTime = $scope.viewNotificationDetails.endTime;
												}
												if ($scope.viewNotificationDetails.incident != undefined
														&& $scope.viewNotificationDetails.incident.eta != undefined) {
													$scope.editNotificationDetails.incident.eta = $scope.viewNotificationDetails.incident.eta;
												}
											}, 100);
								}
								w = w.replace('editNotificationDetails',
										'viewNotificationDetails');
								var u = '#' + event.target.id;
								if ($scope.$eval(w) != h) {
									$(u).addClass('filled');
								} else {
									$(u).removeClass('filled');
								}

							};
							
							$scope.checkChangeOfFieldsForOptions = function(event, h) {
								var w = event.target.getAttribute('ng-model');
								w = w.replace('editNotificationDetails',
										'viewNotificationDetails');
								var u = '#' + event.target.id;
								if ($scope.$eval(w) != h.name) {
									$(u).addClass('filled');
								} else {
									$(u).removeClass('filled');
								}

							};
							
							$scope.checkChangeOfFieldsForParentChildOptions = function(event, h) {
								var w = event.target.getAttribute('ng-model');
								w = w.replace('editNotificationDetails',
										'viewNotificationDetails');
								var u = '#' + event.target.id;
								if ($scope.$eval(w) != h.child) {
									$(u).addClass('filled');
								} else {
									$(u).removeClass('filled');
								}

							};

							$scope.checkChangeOfstartDateFields = function(
									event, h) {
								var w = "viewNotificationDetails.startTime";
								var u = '#notification_startTime_input';
								if (h == "") {
									$(u).removeClass('filled');
									return;
								}
								if ($scope.$eval(w) != h) {
									$(u).addClass('filled');
								} else {
									$(u).removeClass('filled');
								}
							};

							$scope.checkChangeOfendDateFields = function(event,
									h) {
								var w = "viewNotificationDetails.endTime";
								var u = '#notification_endTime_input';
								if (h == "") {
									$(u).removeClass('filled');
									return;
								}
								if ($scope.$eval(w) != h) {
									$(u).addClass('filled');
								} else {
									$(u).removeClass('filled');
								}
							};

							$scope.etaFirstTime = false;

							$scope.checkChangeOfetaFields = function(event, h) {

								var w = "viewNotificationDetails.incident.eta";
								var u = '#notification_eta_input';
								if ($scope.etaFirstTime) {

									if ($scope.$eval(w) != h) {
										$(u).addClass('filled');
									} else {
										$(u).removeClass('filled');
									}
								}
								$scope.etaFirstTime = true;

							};

							function getDifference(o1, o2) {
								var diff = {};
								var tmp = null;
								if (JSON.stringify(o1) === JSON.stringify(o2))
									return;

								for ( var k in o1) {
									if (Array.isArray(o1[k])
											&& Array.isArray(o2[k])) {
										tmp = o1[k].reduce(
												function(p, c, i) {
													var _t = getDifference(c,
															o2[k][i]);
													if (_t)
														p.push(_t);
													return p;
												}, []);
										if (Object.keys(tmp).length > 0)
											diff[k] = tmp;
									} else if (typeof (o1[k]) === "object"
											&& typeof (o2[k]) === "object") {
										tmp = getDifference(o1[k], o2[k]);
										if (tmp && Object.keys(tmp) > 0)
											diff[k] = tmp;
									} else if (o1[k] !== o2[k]) {
										diff[k] = o2[k]
									}
								}
								return diff;
							}

							function isEmpty(o) {
								for ( var p in o) {
									if (o.hasOwnProperty(p)) {
										return false;
									}
								}
								return true;
							}

							var compareObj = function(obj1, obj2) {
								var ret = {}, rett;
								for ( var i in obj2) {
									rett = {};
									if (typeof obj2[i] === 'object') {
										rett = compareObj(obj1[i], obj2[i]);
										if (!isEmpty(rett)) {
											ret[i] = rett
										}
									} else {
										if (!obj1 || !obj1.hasOwnProperty(i)
												|| obj2[i] !== obj1[i]) {
											ret[i] = obj2[i];
										}
									}
								}
								return ret;
							};

							function filter(obj1, obj2) {
								var result = {};
								for (key in obj1) {
									if (obj2[key] != obj1[key])
										result[key] = obj2[key];
									if (typeof obj2[key] == 'array'
											&& typeof obj1[key] == 'array')
										result[key] = arguments.callee(
												obj1[key], obj2[key]);
									if (typeof obj2[key] == 'object'
											&& typeof obj1[key] == 'object')
										result[key] = arguments.callee(
												obj1[key], obj2[key]);
								}
								return result;
							}
							$scope.popUpMaintainence = false;
							$scope.displayInternalAlert =function(status)
							{
								if (status == $scope.staticLabels.closed_upper_label) 
									$scope.popUpMaintainence = true;
								 else 
									$scope.popUpMaintainence = false;
							}

							$scope.popUpOnStatusChange = false;
							
							$scope.checkChangedStatus = function(status) {
								
								if($scope.editNotificationDetails.incident.priority == "P1" && status==$scope.staticLabels.resolved_upper_label){
									$scope.displayRCASummary=true;
									
								}else{
									$scope.displayRCASummary=false;
									
								}
								
								if (status == $scope.staticLabels.resolved_upper_label) {
									$scope.popUpOnStatusChange = true;
								} else {
									$scope.popUpOnStatusChange = false;
								}
							}

							$scope.isDisabled = function(status) {
								if ($scope.viewNotificationDetails.status == $scope.staticLabels.restored_upper_label
										&& (status == "Detected" || status == "Investigating")) {
									return true;
								}
								if($scope.viewNotificationDetails.status == $scope.staticLabels.inProgress_upper_label 
										&& (status == "Cancel")){
										return true;
									}
							}

							$scope.showSpin = false;
							$scope.showSpinPublish = false;
							$scope.editNotificationFormDetail = function(id, publishFlag, draftFlag) {

								if (publishFlag) {
									$scope.showSpinPublish = true;
								} else {
									$scope.showSpin = true;
								}
								
								if(draftFlag){
									$scope.editNotificationDetails = $scope.viewNotificationDetails;
								}

								$scope.popUpOnStatusChange = false;
								if ($scope.uploadAttachment.length == 0
										&& $scope.tempAttachment.length == 0) {
									$scope.editNotificationDetails.attachments = [];
								}
								if ($scope.uploadAttachment.length > 0) {
									$scope.editNotificationDetails.attachments = angular
											.copy($scope.uploadAttachment);
								}
								if ($scope.tempAttachment.length > 0) {
									$scope.editNotificationDetails.attachments = angular
											.copy($scope.tempAttachment);
								}
								$scope.editNotificationDetails.attachments = angular
										.copy($scope.editNotificationDetails.attachments);

								$scope.editBeforeModification = JSON
										.stringify($scope.editNotificationDetails);
								
								if($scope.editNotificationDetails.serviceDisruption!=null&&($scope.editNotificationDetails.serviceDisruption.required==false
										||$scope.editNotificationDetails.serviceDisruption.required==undefined))
										delete $scope.editNotificationDetails.serviceDisruption;
								
								
								if($scope.editNotificationDetails.serviceDisruption!=null&&$scope.viewNotificationDetails.serviceDisruption==null)
									$scope.viewNotificationDetails.serviceDisruption= {}; 

								if ($scope.viewNotificationDetails.updates != undefined
										&& $scope.editNotificationDetails.updates != undefined
										&& !draftFlag && jQuery
												.isEmptyObject(compareObj(
														$scope.viewNotificationDetails,
														$scope.editNotificationDetails))) {
									return;
									
								} else {
									if ($scope.editNotificationDetails.status != $scope.viewNotificationDetails.status) {
										$scope.checkStatus = $scope.editNotificationDetails.status;
										var statusList;
										if ($scope.editNotificationDetails.notificationType == 'MAINTENANCE') {
											statusList = $scope.notificationStatusList;
										} else if ($scope.editNotificationDetails.notificationType == 'INCIDENT') {
											statusList = $scope.incidentStatus;
										}

										var result = $filter('filter')(
												statusList, {
													name : $scope.checkStatus
												})[0];
										$scope.editNotificationDetails.statusId = result.id;
									}

									delete $scope.editNotificationDetails["customerSelectionCriteria"];
									delete $scope.editNotificationDetails["cobrandInfo"];
									if ($scope.editNotificationDetails.updates != undefined) {
										if ($scope.viewNotificationDetails.updates != undefined
												&& $scope.editNotificationDetails.updates.length == $scope.viewNotificationDetails.updates.length) {
											for (var i = 0; $scope.editNotificationDetails.updates.length > 0; i++) {
												$scope.editNotificationDetails.updates
														.splice(0, 1);
											}
										}

										for (var i = 0; $scope.editNotificationDetails.updates.length > 1; i++) {
											$scope.editNotificationDetails.updates
													.splice(0, 1);
										}
									}

									$scope.updatesForAdd = $scope.editNotificationDetails.updates;
									$scope.attachmentsForAdd = $scope.editNotificationDetails.attachments;
									delete $scope.editNotificationDetails["updates"];
									delete $scope.editNotificationDetails["attachments"];

									if ($scope.editNotificationDetails.serviceDisruption != undefined) {
										$scope.isServiceDisruptionRequired = $scope.editNotificationDetails.serviceDisruption.required;
										$scope.estimatedDurationIntervalType = $scope.editNotificationDetails.serviceDisruption.estimatedDurationIntervalType;
										$scope.actualDurationIntervalType = $scope.editNotificationDetails.serviceDisruption.actualDurationIntervalType;

										$scope.estimatedDuration = $scope.editNotificationDetails.serviceDisruption.estimatedDuration;
										$scope.actualDuration = $scope.editNotificationDetails.serviceDisruption.actualDuration;
										$scope.editNotificationDetails.serviceDisruption.estimatedDuration = $scope
												.convertToISODuration(
														$scope.editNotificationDetails.serviceDisruption.estimatedDuration,
														$scope.editNotificationDetails.serviceDisruption.estimatedDurationIntervalType);
										
										$scope.editNotificationDetails.serviceDisruption.actualDuration = $scope
												.convertToISODuration(
														$scope.editNotificationDetails.serviceDisruption.actualDuration,
														$scope.editNotificationDetails.serviceDisruption.actualDurationIntervalType);
										
										//  if($scope.editNotificationDetails.serviceDisruption.actualDuration==null)
										// 	 $scope.editNotificationDetails.serviceDisruption.actualDuration=0;

										//  if($scope.editNotificationDetails.serviceDisruption.estimatedDuration==null)
										// 		 $scope.editNotificationDetails.serviceDisruption.estimatedDuration=0;


										if ($scope.isServiceDisruptionRequired == false
												&& $scope.viewNotificationDetails.serviceDisruption != null
												&& $scope.viewNotificationDetails.serviceDisruption != "") {
											$scope.editNotificationDetails.serviceDisruption.estimatedDuration = "";
											$scope.editNotificationDetails.serviceDisruption.actualDuration = "";
											$scope.editNotificationDetails.serviceDisruption.type = "";
										}
										delete $scope.editNotificationDetails.serviceDisruption.required;
										delete $scope.editNotificationDetails.serviceDisruption.estimatedDurationIntervalType;
										delete $scope.editNotificationDetails.serviceDisruption.actualDurationIntervalType;

										if ($scope.viewNotificationDetails.serviceDisruption == null) {
											$scope.viewNotificationDetails.serviceDisruption = "";
										}
									}
									
									if($scope.editNotificationDetails.impact != undefined && $scope.editNotificationDetails.impact.child != 'Others'){
										$scope.editNotificationDetails.impact = $scope.editNotificationDetails.impact.child;
									} 
									if($scope.editNotificationDetails.impact != undefined && $scope.editNotificationDetails.impact.child == 'Others'){
										$scope.editNotificationDetails.impact = $scope.editNotificationDetails.impactTxt;										
									}
									delete $scope.editNotificationDetails.impactTxt;
									if($scope.editNotificationDetails.incident!=undefined && $scope.editNotificationDetails.incident.nextUpdatePeriod  != undefined && $scope.editNotificationDetails.incident.nextUpdatePeriod != "Custom"){
										$scope.editNotificationDetails.incident.nextUpdatePeriod=$scope.editNotificationDetails.incident.nextUpdatePeriod.name;
									}	
									if($scope.editNotificationDetails.incident!=undefined && $scope.editNotificationDetails.incident.nextUpdatePeriod  != undefined && $scope.editNotificationDetails.incident.nextUpdatePeriod == "Custom"){
										$scope.editNotificationDetails.incident.nextUpdatePeriod=$scope.editNotificationDetails.updateTxt;
									}
								delete $scope.editNotificationDetails.updateTxt;

									
									$scope.rcaAttachment = false;
									$scope.errRCA = false;
									$scope.errResRCA = false;

									if ($scope.displayRCASummary) {
										angular
												.forEach(
														$scope.attachmentsForAdd,
														function(value, key) {
															if (value.type == 'RCA') {
																$scope.rcaAttachment = true;
															}
														});
										if (($scope.attachmentsForAdd.length == 0 && !$scope.rcaAttachment)
												&& $scope.editNotificationDetails.incident.rca == undefined) {
											$scope.errRCA = true;
										}
									}
								}
								var formData;
								try {
									formData = compareObj(
											$scope.viewNotificationDetails,
											$scope.editNotificationDetails);
									if ($scope.editNotificationDetails.referenceTicket != undefined
											&& $scope.editNotificationDetails.referenceTicket.dependencies != undefined
											&& typeof $scope.editNotificationDetails.referenceTicket.dependencies != 'object') {
										var verifyData = $scope.editNotificationDetails.referenceTicket.dependencies
												.split(",");
										delete $scope.editNotificationDetails.referenceTicket["dependencies"];
										$scope.editNotificationDetails.referenceTicket.dependencies = verifyData;
										delete formData.referenceTicket["dependencies"];
										formData.referenceTicket.dependencies = verifyData;

									}
									
									// if(formData.serviceDisruption!=null&&formData.serviceDisruption.estimatedDuration==0)
									// 	formData.serviceDisruption.estimatedDuration=null;
									
									// if(formData.serviceDisruption!=null&&formData.serviceDisruption.actualDuration==0)
									// 	formData.serviceDisruption.actualDuration=null;	

									if ($scope.isServiceDisruptionRequired != true) {
										delete formData.serviceDisruption;
									}

									if ($scope.editNotificationDetails.referenceTicket != undefined
											&& $scope.editNotificationDetails.referenceTicket.bugId !== undefined
											&& $scope.editNotificationDetails.referenceTicket.bugId === null) {
										if (formData == undefined) {
											formData = {};
										}
										if (formData.referenceTicket == undefined) {
											formData.referenceTicket = {};
										}
										formData.referenceTicket.bugId = 0;
									}
									
									


									if ($scope.updatesForAdd != undefined
											&& $scope.updatesForAdd.length > 0) {
										formData.updates = $scope.updatesForAdd;
										if ($scope.editCobrandInfo != undefined
												&& $scope.editCobrandInfo.length > 0) {
											formData.updates[0].cobrandInfo = $scope.editCobrandInfo;
										}
									}

									if ($scope.attachmentsForAdd != undefined
											&& $scope.attachmentsForAdd.length > 0) {
										for (var i = 0; i < $scope.attachmentsForAdd.length; i++) {
											if (formData.attachments == undefined) {
												formData.attachments = []
											}

											if ($scope.attachmentsForAdd[i].type == 'RCA') {
												formData.attachments
														.push($scope.attachmentsForAdd[i]);
											} else {
												if(formData.updates !=undefined){
												if (formData.updates[0].attachments == undefined) {
													formData.updates[0].attachments = [];
												}
												
												formData.updates[0].attachments
														.push($scope.attachmentsForAdd[i]);
											}
											}
										}

									}
									if (formData.statusId == undefined) {
										formData.statusId = $scope.viewNotificationDetails.statusId;
									}

									if ($scope.viewNotificationDetails.status == $scope.staticLabels.restored_upper_label
											&& formData.status == $scope.staticLabels.resolved_upper_label
											&& $scope.displayRCASummary) {
										if ($scope.attachmentsForAdd.length == 0
												&& !$scope.rcaAttachment) {
											if($scope.errRCA){
											$scope.errResRCA = true;
											}
										}
									}

									formData.notificationId = id;
									formData.notificationType = $scope.viewNotificationDetails.notificationType;

									if (publishFlag != undefined && publishFlag) {
										formData.isPublish = true;
									}

									if (formData.updates != undefined) {
										for (var i = 0; i < formData.updates.length; i++) {
											delete formData.updates[i]["$$hashKey"];
											if (formData.updates[i].cobrandInfo != undefined) {
												for (var j = 0; j < formData.updates[i].cobrandInfo.length; j++) {
													delete formData.updates[i].cobrandInfo[j]["label"];
												}
											}
										}
									}

									if (formData.startTime != undefined&& formData.startTime!="") {
										formData.startTime = $filter('dateToUTC')(formData.startTime);		
									}
									if (formData.endTime != undefined && formData.endTime !="") {
										formData.endTime = $filter('dateToUTC')(formData.endTime);
									}
									if (formData.incident != undefined
											&& formData.incident.eta != undefined
											&& formData.incident.eta != "") {
										formData.incident.eta = $filter('dateToUTC')(formData.incident.eta);
									}
									$scope.validateEditForm(formData,publishFlag,
										function() {
										if (draftFlag){
											$scope.validate = true;
										}
										if ($scope.validate) {
											$scope.editNotification("", formData);
										} else {
											$scope.editNotificationDetails = JSON.parse($scope.editBeforeModification);
										}
									});

								} catch (e) {
									var exception = {
										exceptionStackTrace : e.stack
												.toString()
									};
									var data = angular.copy(exception);
									appService.loggerService(data, function(
											data, status, headers, config) {
									})
								}
								$scope.showSpinPublish = false;
								$scope.showSpin = false;
							}
							
							$scope.errorOnNotificationstartTime = false;
							$scope.errorOnNotificationendTime = false;
							$scope.errorOnNotificationTitle = false;
							$scope.errorOnNotificationDescription = false;
							$scope.errorOnNotificationUpdateDescription = false;
							$scope.errorOnNotificationImpact = false;
							$scope.errorOnNotificationEmptyDowntime = false;
							$scope.errorOnNotificationDependencies = false;
							$scope.errorOnExtendedStatusSelection = false;
							$scope.errorOnNotificationSNReferenceTicket = false;
							$scope.errorOnNotificationDepencyReferenceTicket = false;
							$scope.errorOnNotificationPastendTime = false;
							
							$scope.errorOnNotificationPartialClosure = false;
							$scope.errorOnNotificationSingleDependencyReferenceTicket = false;
							$scope.errorOnMaximumEstimatedTime = false;
							$scope.errorOnMaximumActualTime = false;
							$scope.errorOnNotificationInternalNote = false;
							$scope.errorOnNotificationSNTicket = false;
							$scope.errorOnNotificationDependencyEnd = false;
							$scope.errorOnEmptyServiceProductAffected = false;
							$scope.errorOnEmptyUpdate = false;

							$scope.validateEditForm = function(formData,publishFlag,callback) {
								$scope.errorOnNotificationstartTime = false;
								$scope.errorOnNotificationendTime = false;
								$scope.errorOnNotificationTitle = false;
								$scope.errorOnNotificationDescription = false;
								$scope.errorOnNotificationUpdateDescription = false;
								
								$scope.errorOnNotificationImpact = false;
								$scope.errorOnNotificationEmptyDowntime = false;
								$scope.errorOnMaximumEstimatedTime = false;
								$scope.errorOnInvalidEstimatedDisruptionTime = false;
								$scope.errorOnInvalidActualDisruptionTime=false;
								$scope.errorOnMaximumActualTime = false;
								$scope.errorOnNotificationDependencies = false;
								$scope.errorOnExtendedStatusSelection = false;
								$scope.errorOnNotificationSNReferenceTicket = false;
								$scope.errorOnNotificationDepencyReferenceTicket = false;
								$scope.errorOnNotificationPastendTime = false;
								
								$scope.errorOnNotificationPartialClosure = false;
								$scope.errorOnNotificationSingleDependencyReferenceTicket = false;
								$scope.errorOnNotificationInternalNote = false;
								$scope.errorOnNotificationSNTicket = false;
								$scope.errorOnNotificationDependencyEnd = false;
								$scope.errorOnEmptyServiceProductAffected = false;
								$scope.errorOnEmptyUpdate = false;
								try {
									$scope.validate = true;
									if ($scope.editNotificationDetails.notificationType == 'MAINTENANCE'
											&& $scope.editNotificationDetails.maintenance.notificationSubtype != 'Advisory'
											&& ($scope.editNotificationDetails.startTime == undefined || $scope.editNotificationDetails.startTime == '')) {
										$("#notification_startTime_input").focus();
										$scope.errorOnNotificationstartTime = true;
										$scope.validate = false;
									}

									if (formData.updates == undefined
											|| formData.updates == '') {	
										var updateEle = document.getElementById('add_update_button');
										$scope.addUpdateBlock(null,updateEle);	
										$("#notification_update_description").focus();
										$scope.errorOnEmptyUpdate = true;
										$scope.validate = false;
									}
									
									if($scope.errRCA){
										$scope.validate = false;
										$("#notification_rca_summary").focus();
									}
									
									if($scope.errResRCA){
										$scope.validate = false;
									}

									if ($scope.editNotificationDetails.notificationType == 'MAINTENANCE'
											&& $scope.editNotificationDetails.maintenance.notificationSubtype != 'Advisory'
											&& $scope.editNotificationDetails.notificationType != 'INCIDENT'
											&& ($scope.editNotificationDetails.endTime == undefined || $scope.editNotificationDetails.endTime == '')) {
										$("#notification_endTime_input").focus();
										$scope.errorOnNotificationendTime = true;
										$scope.validate = false;
									}
									if ($scope.editNotificationDetails.endTime != undefined
											&& $scope.editNotificationDetails.endTime != '') {
										if(!$scope.editNotificationDetails.endTime.contains("IST")){
											var endDate=$scope.editNotificationDetails.endTime;
										}else{
										var endDate = $scope.editNotificationDetails.endTime
												.substring(
														0,
														$scope.editNotificationDetails.endTime
																.lastIndexOf(" "));
										}
										var t = $scope.editNotificationDetails.startTime
												.substring(
														0,
														$scope.editNotificationDetails.startTime
																.lastIndexOf(" "));
										if (new Date(t) >= new Date(endDate)) {
											$("#notification_endTime_input").focus();
											$scope.errorOnNotificationPastendTime = true;
											$scope.validate = false;
										}
									
									}
									if ($scope.editNotificationDetails.title == undefined
											|| $scope.editNotificationDetails.title == '') {
										
										$("#notification_title").focus();
										$scope.errorOnNotificationTitle = true;
										$scope.validate = false;
									}
									if ($scope.editNotificationDetails.serviceProductAffected == undefined
											|| $scope.editNotificationDetails.serviceProductAffected == '') {
										$("#notification_servicesProductAffected").focus();
										$scope.errorOnEmptyServiceProductAffected = true;
										$scope.validate = false;
									}

									if ($scope.editNotificationDetails.description == undefined
											|| $scope.editNotificationDetails.description == '') {
										$("#edit_notification_description").focus();
										$scope.errorOnNotificationDescription = true;
										$scope.validate = false;
									}

									if ($scope.editNotificationDetails.referenceTicket == undefined
											|| ($scope.editNotificationDetails.referenceTicket != undefined && ($scope.editNotificationDetails.referenceTicket.serviceNowTicket == undefined || $scope.editNotificationDetails.referenceTicket.serviceNowTicket == ""))) {
												$("#notification_edit_serviceTicket").focus();
												$scope.errorOnNotificationSNTicket = true;
												$scope.validate = false;
									}

									
									
									if ($scope.editNotificationDetails.notificationType == 'MAINTENANCE'
											&& ($scope.editNotificationDetails.impact == undefined || $scope.editNotificationDetails.impact == '')) {
										$("#notification_impact").focus();
										$scope.errorOnNotificationImpact = true;
										$scope.validate = false;
									}

									if (formData.updates != undefined
											&& formData.updates != '') {
										if ((formData.updates[0].isResolved != undefined || formData.updates[0].isResolved != '')
												&& formData.updates[0].isResolved == true
												&& formData.updates[0].cobrandInfo == undefined) {
											$("#cobrand_edit_dropdown").focus();
											$scope.errorOnNotificationPartialClosure = true;
											$scope.validate = false;
										}
										if (formData.updates[0].message == undefined
												|| formData.updates[0].message == '') {
											var updateEle = document.getElementById('add_update_button');
											$scope.addUpdateBlock(null,updateEle);
											$("#notification_update_description").focus();
											$scope.errorOnNotificationUpdateDescription = true;
											$scope.validate = false;
										}

									}

									if ($scope.editNotificationDetails.notificationType == 'INCIDENT'
											&& $scope.displayRCASummary == false
											&& formData.updates == undefined
											&& ($scope.editNotificationDetails.status == $scope.staticLabels.resolved_upper_label || $scope.editNotificationDetails.status == $scope.staticLabels.restored_upper_label)) {
										angular.element("#updates").find(
												".content").css('display',
												'block');
										$("#notification_update_description").focus();
										$scope.errorOnNotificationInternalNote = true;
										$scope.validate = false;
									}

									if ($scope.editNotificationDetails.referenceTicket != undefined
											&& ($scope.editNotificationDetails.referenceTicket.serviceNowTicket != undefined && $scope.editNotificationDetails.referenceTicket.serviceNowTicket != "")) {
										var pattern = new RegExp(
												'^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$');
										var testResult = pattern
												.test($scope.editNotificationDetails.referenceTicket.serviceNowTicket);
										if (!testResult) {
											$("#notification_edit_serviceTicket").focus();
											$scope.errorOnNotificationSNReferenceTicket = true;
											$scope.validate = false;
										}
									}

									if ($scope.editNotificationDetails.referenceTicket.dependencies != undefined
											&& $scope.editNotificationDetails.referenceTicket.dependencies != '') {
										var dependencyVerification = JSON
												.stringify($scope.editNotificationDetails.referenceTicket.dependencies);
										var verifyData = dependencyVerification
												.split(",");
										if (verifyData.length > 3) {
											$("#notification_dependency").focus();
											$scope.errorOnNotificationDependencies = true;
											$scope.validate = false;
										} else {
											var pattern = new RegExp(
													'^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9,]+)$');
											var patternForIndividualItems = new RegExp(
													'^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$');
											var testResult = pattern
													.test($scope.editNotificationDetails.referenceTicket.dependencies);
											if (!testResult) {
												if (verifyData.length == 1) {
													$("#notification_dependency").focus();
													$scope.errorOnNotificationSingleDependencyReferenceTicket = true;
													$scope.validate = false;
												} else {
													$("#notification_dependency").focus();
													$scope.errorOnNotificationDepencyReferenceTicket = true;
													$scope.validate = false;
												}
											}

											var array = JSON
													.parse(dependencyVerification);

											for (var k = 0; k < array.length; k++) {
												if (array[k] != ""
														&& !patternForIndividualItems
																.test(array[k])) {
													$("#notification_dependency").focus();
													$scope.errorOnNotificationDepencyReferenceTicket = true;
													$scope.validate = false;
												} else if (array[k] == "") {
													$("#notification_dependency").focus();
													$scope.errorOnNotificationDependencyEnd = true;
													$scope.validate = false;
												}
											}
										}
									}

									if (formData.serviceDisruption != null
											&& $scope.isServiceDisruptionRequired) {
										var max_hours = parseInt($scope.staticLabels.maximum_downtime_hours);
										var max_minutes = parseInt($scope.staticLabels.maximum_downtime_minutes);

										$scope.editNotificationDetails.serviceDisruption.required = $scope.isServiceDisruptionRequired;
										if ($scope.estimatedDuration!=0&&!$scope.estimatedDuration > 0
												|| $scope.estimatedDurationIntervalType == null) {
											$scope.validate = false;
											
											$scope.errorOnInvalidEstimatedDisruptionTime = true;

										} else if ($scope.estimatedDuration > max_minutes
												&& $scope.estimatedDurationIntervalType == 'Minutes') {
											$scope.validate = false;
											
											$scope.errorOnMaximumEstimatedTime = true;
										} else if ($scope.estimatedDuration > max_hours
												&& $scope.estimatedDurationIntervalType == 'Hours') {
											$scope.validate = false;
											$scope.errorOnMaximumEstimatedTime = true;
										}

										else if ($scope.actualDuration > max_minutes
												&& $scope.actualDurationIntervalType == 'Minutes') {
											$scope.validate = false;
											$scope.errorOnMaximumActualTime = true;
											$('#notification_downtime_actual').focus();
											
										} else if ($scope.actualDuration > max_hours
												&& $scope.actualDurationIntervalType == 'Hours') {
											$scope.validate = false;
											$scope.errorOnMaximumActualTime = true;
											$('#notification_downtime_actual').focus();
										}
									}
									if (formData.serviceDisruption != null
											&& $scope.isServiceDisruptionRequired == true
											&& (formData.status == $scope.staticLabels.closed_upper_label || formData.status == $scope.staticLabels.resolved_upper_label)) {

										if ($scope.actualDuration==""||($scope.actualDuration!=0&&!$scope.actualDuration > 0)
												|| $scope.actualDurationIntervalType == null) {
											$scope.validate = false;
											$scope.errorOnInvalidActualDisruptionTime = true;
											$('#notification_downtime_actual').focus();

										}
									}
									if(!$scope.validate)
									{
										if(publishFlag)
										{
										$scope.showSpinPublish = false;
										}
										else{
										$scope.showSpin = false;
									}
								}
									callback();
								
								} catch (e) {
									$scope.validate = false;
									if(!$scope.validate)
									{
										if(publishFlag)
										{
										$scope.showSpinPublish = false;
										}
										else{
										$scope.showSpin = false;
									}
								}
									callback();

								}
							}
							$scope.notificationEditErrorMsg = null;

							$scope.editNotification = function(id, formData) {

								var notificationEditCriteria = {
									customerId : $scope.customerId,
									notificationCreateObj : '{"notification":'
											+ JSON.stringify(formData) + '}',
									notificationId : formData.notificationId
								};
								$scope.notificationEditErrorMsg = null;
								$scope.msg = null;

								notificationService.editNotification(angular.copy(notificationEditCriteria),
									function(data, status, headers, config) {
										try {
											$scope.notificationSearchErrorMsg = null;
											$scope.msg = null;
											$scope.notificationEditErrorMsg = null;
											if (data == null
													|| data == ""
													|| data == "{}") {
												$scope.notificationLoading = false;
												$scope.notificationSearchErrorMsg = $scope.staticLabels.no_comm_label;
												return;
											} else if (data
													.indexOf($scope.staticLabels.error_code) != -1) {
												$scope.notificationLoading = false;
												var errResponse = JSON
														.parse(data);
												if (errResponse.errorCode == $scope.staticLabels.invalid_session_error_code) {
													$scope.notificationSearchErrorMsg = $scope.staticLabels.invalid_session;
													return;
												}
												$scope.notificationEditErrorMsg = "Notification ID  has been failed due to "
														+ errResponse.errorMessage
														+ " !!!";
												$scope.editNotificationDetails = JSON
														.parse($scope.editBeforeModification);
												return;
											};
											

											var response = JSON.parse(data);
											
											if(formData.updates != undefined && formData.updates[formData.updates.length-1].isInternal==false)
												$scope.msg = "Notification ID "
													+ response.notification.id + " "
													+ $scope.staticLabels.notification_updated_msg;
											else if(formData.isPublish)
												$scope.msg = "Notification ID "
												+ response.notification.id + " "
												+ $scope.staticLabels.notification_published_msg;
											else
												$scope.msg = "Notification ID "
												+ response.notification.id +" "+ 
												$scope.staticLabels.notification_saved_msg;

											if (formData.isPublish) {
												$scope.showSpinPublish = false;
											} else {
												$scope.showSpin = false;
											}

											$scope.toggle();
											$state.go('notification',{location : 'true'})
												.then(function(d) {
													$scope.searchNotification();
												});
										} catch (e) {
											$scope.notificationEditErrorMsg = "Notification ID "
													+ response.notification.id
													+ " has been failed !!!";

											$scope
													.initializeEditFields();
											$scope.editNotificationDetails = JSON
													.parse($scope.editBeforeModification);
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