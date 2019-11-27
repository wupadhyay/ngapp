angular
		.module('Services')
		.factory(
				'CommonService',
				[
						"ApplicationService",
						"userTypes",
						function(appService, userTypes) {
							var service = {};

							service.isYodlee = function(element) {
								userTypes.getUser().then(
								function(response) {
									try {
										var result = response.data
										var res = JSON
												.parse(result);
										if (res.cobrandInfo != undefined) {
											if (res.cobrandInfo.isYodlee == undefined) {
												element
														.css(
																"display",
																"none");
											} else if (!res.cobrandInfo.isYodlee) {
												element
														.css(
																"display",
																"none");
											}
										}else {
											element.css("display", "none");
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
														});
									}
								});
							};

							service.isCobrand = function(element) {
								userTypes
										.getUser()
										.then(
												function(response) {
													try {
														var result = response.data
														var res = JSON
																.parse(result);

														if (res.cobrandInfo.isYodlee == undefined) {
															element.css(
																	"display",
																	"none");
														} else if (res.cobrandInfo.isYodlee) {
															element.css(
																	"display",
																	"none");
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
																		});
													}
												});

							};
							
							service.isPrimary = function(element) {
								userTypes.getUser().then(function(response) {
									try {
										var result = response.data
										var res = JSON.parse(result);
										if (res.cobrandInfo != undefined) {
											if(res.cobrandInfo.emailTriggerEnabled == undefined) {
												element.css("display","none");
											} else if (!res.cobrandInfo.emailTriggerEnabled) {
												element.css("display","none");
											}
										}else {
											element.css("display", "none");
										}
									} catch (e) {
										var exception = {
											exceptionStackTrace : e.stack.toString()
										};
										var data = angular.copy(exception);
										appService.loggerService(data,
											function(data,status,headers,config) {
											});
									}
								});

							};

							service.isnotPrimary = function(element) {
								userTypes.getUser().then(function(response) {
									try {
										var result = response.data
										var res = JSON.parse(result);

										if(res.cobrandInfo.emailTriggerEnabled == undefined) {
											element.css("display","none");
										} else if (res.cobrandInfo.emailTriggerEnabled) {
											element.css("display","none");
										}
									} catch (e) {
										var exception = {
											exceptionStackTrace : e.stack.toString()
										};
										var data = angular.copy(exception);
										appService.loggerService(data,
											function(data,status,headers,config) {
											});
									}
								});

							};

							return service;
						} ]);

angular.module("Services").filter('removeUnderscores', function() {
	return function(text) {
		var str = text.replace(/_/g, ' ');
		return str
	};
});
angular.module("Services").factory('sharedCobrand', function() {
	var service = {};
	return {
		setData : function(data) {
			service = data;
		},
		getData : function() {
			return service;
		}
	}
});
angular.module('Services').filter('titleCase',
		 function() {
	  	  return function(input) {
	      input = input || '';
	      return input.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
	    };
	  });

angular.module("Services").filter(
		'dateConverter',
		function() {
			return function(text) {
				var date = new Date(text);
				var dateTimezone = date.toString().split('(')[1];
				if (dateTimezone != undefined) {
					dateTimezone = dateTimezone.split(')')[0];
				} else {
					dateTimezone = "UTC";
				}

				var timezone = "";
				for (i = 0; i < dateTimezone.length; i++) {
					if (dateTimezone.charAt(i) === dateTimezone.charAt(i)
							.toUpperCase()) {
						timezone = timezone + dateTimezone.charAt(i).trim();
					}
				}

				var month = (date.getMonth() + 1).toString();
				if (month.length == 1) {
					month = "0" + month;
				}

				var calcDate = (date.getDate()).toString();
				if (calcDate.length == 1) {
					calcDate = "0" + calcDate;
				}

				var hours = (date.getHours()).toString();
				if (hours.length == 1) {
					hours = "0" + hours;
				}

				var min = (date.getMinutes()).toString();
				if (min.length == 1) {
					min = "0" + min;
				}

				var sec = (date.getSeconds()).toString();
				if (sec.length == 1) {
					sec = "0" + sec;
				}

				var finalDate = date.getFullYear() + "-" + month + "-"
						+ calcDate + " " + hours + ":" + min + ":" + sec + " "
						+ timezone;
				return finalDate;
			};
		});

angular.module("Services").filter(
		'localDateConverter',
			function() {
				return function(text) {
					var replacedText = text.replace(/-/g, '/');
					var date = new Date(replacedText);
				
					var dateTimezone = date.toString().split('(')[1];
					if (dateTimezone != undefined) {
						dateTimezone = dateTimezone.split(')')[0];
					} else {
						dateTimezone = "UTC";
					}
	
					var timezone = "";
					for (i = 0; i < dateTimezone.length; i++) {
						if (dateTimezone.charAt(i) === dateTimezone.charAt(i)
								.toUpperCase()) {
							timezone = timezone + dateTimezone.charAt(i).trim();
						}
					}
	
					var month = (date.getMonth() + 1).toString();
					if (month.length == 1) {
						month = "0" + month;
					}
	
					var calcDate = (date.getDate()).toString();
					if (calcDate.length == 1) {
						calcDate = "0" + calcDate;
					}
	
					var hours = (date.getHours()).toString();
					if (hours.length == 1) {
						hours = "0" + hours;
					}
	
					var min = (date.getMinutes()).toString();
					if (min.length == 1) {
						min = "0" + min;
					}
	
					var sec = (date.getSeconds()).toString();
					if (sec.length == 1) {
						sec = "0" + sec;
					}
	
					var finalDate = date.getFullYear() + "-" + month + "-"
							+ calcDate + " " + hours + ":" + min + ":" + sec + " "
							+ timezone;
					return finalDate;
				};
			});		


angular.module('Services').filter('dateToUTC',
		  function() {
			 return function(input) {
				
			
				var d = new Date(input);
				d.setHours(d.getHours()-5);
				d.setMinutes(d.getMinutes()-30);
				d= d.toString();
				
				var arr = d.split(" ");
				
				//using this to getMonth from string value
				 d = Date.parse(arr[1] + "1, 2012");
				if(!isNaN(d)){
				     res= new Date(d).getMonth() + 1;
				}
				var result = arr[3]+"-"+ res+"-"+ arr[2]+ " "+ arr[4]+ " UTC"; 
				return result;

		 };
});	  


angular.module("Services").filter(
		'dateConverterNotification',
		function() {
			return function(text) {
				var replacedText = text.replace(/-/g, '/');
				var date = new Date(replacedText);

				var offset = 5.5;

				var utcDate = date.getTime()
						+ (date.getTimezoneOffset() * 60000);

				var dateInIST = new Date(utcDate + (3600000 * offset));

				var timezone = "IST";

				var month = (dateInIST.getMonth() + 1).toString();
				if (month.length == 1) {
					month = "0" + month;
				}

				var calcDate = (dateInIST.getDate()).toString();
				if (calcDate.length == 1) {
					calcDate = "0" + calcDate;
				}

				var hours = (dateInIST.getHours()).toString();
				if (hours.length == 1) {
					hours = "0" + hours;
				}

				var min = (dateInIST.getMinutes()).toString();
				if (min.length == 1) {
					min = "0" + min;
				}

				var sec = (dateInIST.getSeconds()).toString();
				if (sec.length == 1) {
					sec = "0" + sec;
				}

				var finalDate = dateInIST.getFullYear() + "-" + month + "-"
						+ calcDate + " " + hours + ":" + min + ":" + sec + " "
						+ timezone;
				return finalDate;
			};
		});

angular.module("Services").filter (
	'MonthsFilter',
	function(){
		return function(inputArr,monthCriteria)
		{
				var data=[];
				angular.forEach(inputArr, function(item){             
				var date=new Date(item.startTimeModified);
				var res= (date.getFullYear()==monthCriteria.year&&date.getMonth()==monthCriteria.month);
				if(res==true)
				data.push(item)	
			
		   });
		 return data;
	}
});

angular.module("Services").filter (
		'datetimeformatter',
		function(){
			return function(date,onlyTime) {
				 timeZoneString=date.substring(date.lastIndexOf(" ")+1);
				 datePart= date.substring(0, date.lastIndexOf(" "));
				 date = new Date(datePart);
				 hours = date.getHours();
				 minutes = date.getMinutes();
				 seconds =date.getSeconds();
				 seconds = seconds < 10 ? '0'+seconds : seconds;
				 month=date.getMonth()+1;
				 month =month<10? "0"+month:month;
				 year= date.getFullYear();
				 day =date.getDate();
				 day =day<10? "0"+day:day;
	  			 ampm = hours >= 12 ? 'PM' : 'AM';
	 			 hours = hours % 12;
	 			 hours = hours ? hours : 12; // the hour '0' should be '12'
				 minutes = minutes < 10 ? '0'+minutes : minutes;
				 strTime = hours + ':' + minutes;
				 if(onlyTime)
					return  strTime + " "+ ampm+ " "+ timeZoneString;
				  else 
				  {
					strTime = strTime +" "+ampm;
					dateTime= month+"/"+day+"/"+year+ " "+strTime;
					return dateTime;	  
				  }
			 };
});


angular.module("Services").filter (
		'durationFormatter',
		function(){
			return function(totalMinutes) {
				var hrs= Math.floor(totalMinutes/60);
				var minutes=totalMinutes%60;
				var str="";
				if(hrs>0)
				{
						str= str+ hrs;
						if(hrs>1)
							str= str+" Hours";
						else 
							str= str+" Hour"
				}	
				if(minutes>0)
				{
					str= str+ " " +minutes;
					if(minutes>1)
						str= str+" Minutes";
					else 
						str= str+" Minute";
				}
				return str;
			 };
});	

angular.module("Services").filter(
	'monthDisplay',
	function() {
		return function(text) {
		   var monthMap =['January','February','March','April','May','June','July','August','September','October','November','December'];
			var month=text.month;
			var year=text.year;
			return monthMap[month]+" " + year; 
		};
	});

angular.module("Services").filter(
	'dateAsString',
	function() {
		return function(text) {
			var d = new Date(text);
			var n = d.toDateString();
			n=n.substring(4);
			n=n.substring(0,6)+","+n.substring(6);
			return n;
			
		};
	});

angular.module('Services').directive('search',
		[ '$document', function($document) {
			return function($scope, element) {
				$scope.searchResult = false;
				$scope.no_match = false;
				element.bind("keyup", function(event) {
					var val = element.val();
					if (val.length == 0 && $scope.query == "" || val == "") {
						$scope.searchResult = false;
						$scope.$apply();
					} else {
						var typeVal = isNaN(val);

						if (val.length > 2 && typeVal == true) {
							$scope.searchResult = true;
							$scope.search();

						} else if (typeVal == false) {
							$scope.searchResult = true;
							$scope.search();
						}
					}
				});
				element.bind('click', function(event) {
					event.stopPropagation();
				});
				$document.bind('click', function() {
					$scope.query = "";
					$scope.searchResult = false;
					$scope.$apply();
				});
			};
		} ]);

angular
		.module('Services')
		.directive(
				'pageslide',
				[
						'$document',
						'$timeout',
						function($document, $timeout) {
							var defaults = {};

							return {
								restrict : 'EA',
								transclude : false,
								scope : {
									psOpen : '=?',
									psAutoClose : '@',
									psSide : '@',
									psSpeed : '@',
									psClass : '@',
									psSize : '@',
									psZindex : '@',
									psPush : '@',
									psContainer : '@',
									psKeyListener : '@',
									psBodyClass : '@',
									psClickOutside : '@',
									onopen : '&?',
									onclose : '&?'
								},
								link : function(scope, el, attrs) {

									var param = {};

									param.side = scope.psSide || 'right';
									param.speed = scope.psSpeed || '2';
									param.size = scope.psSize || 'auto';
									param.zindex = scope.psZindex || 1000;
									param.className = scope.psClass
											|| 'ng-pageslide';
									param.push = scope.psPush === 'true';
									param.container = scope.psContainer || false;
									param.keyListener = scope.psKeyListener === 'true';
									param.bodyClass = scope.psBodyClass || false;
									param.clickOutside = scope.psClickOutside !== 'false';
									param.autoClose = scope.psAutoClose || false;

									param.push = param.push && !param.container;

									el.addClass(param.className);

									/* DOM manipulation */

									var content, slider, body, isOpen = false;

									if (param.container) {
										body = document
												.getElementById(param.container);
									} else {
										body = document.body;
									}

									function onBodyClick(e) {
										var target = e.touches && e.touches[0]
												|| e.target;
										if (isOpen && body.contains(target)
												&& !slider.contains(target)) {
											isOpen = false;
											scope.psOpen = false;
											scope.$apply();
										}

										if (scope.psOpen) {
											isOpen = true;
										}
									}

									function setBodyClass(value) {
										if (param.bodyClass) {
											var bodyClass = param.className
													+ '-body';
											var bodyClassRe = new RegExp(
													bodyClass + '-closed|'
															+ bodyClass
															+ '-open');
											body.className = body.className
													.replace(bodyClassRe, '');
											var newBodyClassName = bodyClass
													+ '-' + value;
											if (body.className[body.className.length - 1] !== ' ') {
												body.className += ' '
														+ newBodyClassName;
											} else {
												body.className += newBodyClassName;
											}
										}
									}

									setBodyClass('closed');

									slider = el[0];

									if (slider.tagName.toLowerCase() !== 'div'
											&& slider.tagName.toLowerCase() !== 'pageslide') {
										throw new Error(
												'Pageslide can only be applied to <div> or <pageslide> elements');
									}

									if (slider.children.length === 0) {
										throw new Error(
												'You need to have content inside the <pageslide>');
									}

									content = angular.element(slider.children);

									body.appendChild(slider);

									slider.style.zIndex = param.zindex;
									slider.style.position = 'fixed';
									slider.style.transitionDuration = param.speed
											+ 's';
									slider.style.webkitTransitionDuration = param.speed
											+ 's';
									slider.style.height = param.size;
									slider.style.transitionProperty = 'top, bottom, left, right';

									if (param.push) {
										body.style.position = 'absolute';
										body.style.transitionDuration = param.speed
												+ 's';
										body.style.webkitTransitionDuration = param.speed
												+ 's';
										body.style.transitionProperty = 'top, bottom, left, right';
									}

									if (param.container) {
										slider.style.position = 'absolute';
										body.style.position = 'relative';
										body.style.overflow = 'hidden';
									}

									function onTransitionEnd() {
										if (scope.psOpen) {
											if (typeof scope.onopen === 'function') {
												scope.onopen()();
											}
										} else {
											if (typeof scope.onclose === 'function') {
												scope.onclose()();
											}
										}
									}

									slider.addEventListener('transitionend',
											onTransitionEnd);

									initSlider();

									function initSlider() {
										switch (param.side) {
										case 'right':
											slider.style.width = param.size;
											slider.style.height = '100%';
											slider.style.top = '0px';
											slider.style.bottom = '0px';
											slider.style.right = '0px';
											break;
										case 'left':
											slider.style.width = param.size;
											slider.style.height = '100%';
											slider.style.top = '0px';
											slider.style.bottom = '0px';
											slider.style.left = '0px';
											break;
										case 'top':
											slider.style.height = param.size;
											slider.style.width = '100%';
											slider.style.left = '0px';
											slider.style.top = '0px';
											slider.style.right = '0px';
											break;
										case 'bottom':
											slider.style.height = param.size;
											slider.style.width = '100%';
											slider.style.bottom = '0px';
											slider.style.left = '0px';
											slider.style.right = '0px';
											break;
										}
									}

									function psClose(slider, param) {
										switch (param.side) {
										case 'right':
											slider.style.right = "-"
													+ param.size;
											if (param.push) {
												body.style.right = '0px';
												body.style.left = '0px';
											}
											break;
										case 'left':
											slider.style.left = "-"
													+ param.size;
											if (param.push) {
												body.style.left = '0px';
												body.style.right = '0px';
											}
											break;
										case 'top':
											slider.style.top = "-" + param.size;
											if (param.push) {
												body.style.top = '0px';
												body.style.bottom = '0px';
											}
											break;
										case 'bottom':
											slider.style.top = "1700px";// +
																		// param.size;
											if (param.push) {
												body.style.bottom = '0px';
												body.style.top = '0px';
											}
											break;
										}

										if (param.keyListener) {
											$document.off('keydown',
													handleKeyDown);
										}

										if (param.clickOutside) {
											$document.off('touchend click',
													onBodyClick);
										}
										isOpen = false;
										setBodyClass('closed');
										scope.psOpen = false;
									}

									function psOpen(slider, param) {
										switch (param.side) {
										case 'right':
											slider.style.right = "0px";
											if (param.push) {
												body.style.right = param.size;
												body.style.left = '-'
														+ param.size;
											}
											break;
										case 'left':
											slider.style.left = "0px";
											if (param.push) {
												body.style.left = param.size;
												body.style.right = '-'
														+ param.size;
											}
											break;
										case 'top':
											slider.style.top = "0px";
											if (param.push) {
												body.style.top = param.size;
												body.style.bottom = '-'
														+ param.size;
											}
											break;
										case 'bottom':
											slider.style.top = "0px";
											if (param.push) {
												body.style.bottom = param.size;
												body.style.top = '-'
														+ param.size;
											}
											break;
										}

										scope.psOpen = true;

										if (param.keyListener) {
											$document.on('keydown',
													handleKeyDown);
										}

										if (param.clickOutside) {
											$document.on('touchend click',
													onBodyClick);
										}
										setBodyClass('open');
									}

									function handleKeyDown(e) {
										var ESC_KEY = 27;
										var key = e.keyCode || e.which;

										if (key === ESC_KEY) {
											psClose(slider, param);

											// FIXME check with tests
											// http://stackoverflow.com/questions/12729122/angularjs-prevent-error-digest-already-in-progress-when-calling-scope-apply

											$timeout(function() {
												scope.$apply();
											});
										}
									}

									// Watchers

									scope.$watch('psOpen', function(value) {
										if (!!value) {
											psOpen(slider, param);
										} else {
											psClose(slider, param);
										}
									});

									scope.$watch('psSize', function(newValue,
											oldValue) {
										if (oldValue !== newValue) {
											param.size = newValue;
											initSlider();
										}
									});

									// Events

									scope.$on('$destroy', function() {
										if (slider.parentNode === body) {
											if (param.clickOutside) {
												$document.off('touchend click',
														onBodyClick);
											}
											body.removeChild(slider);
										}

										slider.removeEventListener(
												'transitionend',
												onTransitionEnd);
									});

									if (param.autoClose) {
										scope.$on('$locationChangeStart',
												function() {
													psClose(slider, param);
												});
										scope.$on('$stateChangeStart',
												function() {
													psClose(slider, param);
												});
									}

								}
							};
						} ]);

angular.module('Services').factory('Navigation',
		[ '$rootScope', function($rootScope) {
			return {
				location : '',

				getSiteDetailById : function(msg) {
					this.location = 'views/siteMetadata/searchWidget.html';
					this.broadcastEvent('callBySiteId');
				},
				getNotificationView : function(msg) {
					this.url = 'views/notification/notificationView.html';
				},

				broadcastEvent : function(event, args) {
					$rootScope.$broadcast(event, args);

				}
			}
		} ]);

angular.module("Services").filter(
		'uniqueContainers',
		function() {

			return function(items, filterOn) {

				if (filterOn === false) {
					return items;
				}

				if ((filterOn || angular.isUndefined(filterOn))
						&& angular.isArray(items)) {
					var hashCheck = {}, newItems = [];

					var extractValueToCompare = function(item) {
						if (angular.isObject(item)
								&& angular.isString(filterOn)) {
							return item[filterOn];
						} else {
							return item;
						}
					};

					angular.forEach(items, function(item) {
						var valueToCheck, isDuplicate = false;

						for (var i = 0; i < newItems.length; i++) {
							if (angular.equals(
									extractValueToCompare(newItems[i]),
									extractValueToCompare(item))) {
								isDuplicate = true;
								break;
							}
						}
						if (!isDuplicate) {
							newItems.push(item);
						}

					});
					items = newItems;
				}
				return items;
			};
		});

var directiveModule = angular.module('angularjs-dropdown-multiselect', []);

directiveModule
		.directive(
				'ngDropdownMultiselect',
				[
						'$filter',
						'$document',
						'$compile',
						'$parse',

						function($filter, $document, $compile, $parse) {

							return {
								restrict : 'AE',
								scope : {
									selectedModel : '=',
									options : '=',
									extraSettings : '=',
									events : '=',
									searchFilter : '=?',
									translationTexts : '=',
									groupby : '@'
								},
								template : function(element, attrs) {
									var checkboxes = attrs.checkboxes ? true
											: false;
									var groups = attrs.groupby ? true : false;

									var template = '<div class="multiselect-parent btn-group dropdown-multiselect">';
									template += '<button type="button" class="dropdown-toggle" ng-class="settings.buttonClasses" ng-click="toggleDropdown()">{{getButtonText()}}&nbsp;<span class="caret"></span></button>';
									template += '<ul class="dropdown-menu dropdown-menu-form" ng-style="{display: open ? \'block\' : \'none\', height : settings.scrollable ? settings.scrollableHeight : \'auto\' }" style="overflow: scroll" >';
									template += '<li ng-hide="!settings.showCheckAll || settings.selectionLimit > 0"><a data-ng-click="selectAll()"><i class="fa fa-check" aria-hidden="true"></i>{{texts.checkAll}}</a>';
									template += '<li ng-show="settings.showUncheckAll"><a data-ng-click="deselectAll();"><i class="fa fa-times" aria-hidden="true"></i> {{texts.uncheckAll}}</a></li>';
									template += '<li ng-hide="(!settings.showCheckAll || settings.selectionLimit > 0) && !settings.showUncheckAll" class="divider"></li>';
									template += '<li ng-show="settings.enableSearch"><div class="dropdown-header"><input type="text" class="form-control" style="width: 100%;" ng-model="searchFilter" placeholder="{{texts.searchPlaceholder}}" /></li>';
									template += '<li ng-show="settings.enableSearch" class="divider"></li>';

									if (groups) {
										template += '<li ng-repeat-start="option in orderedItems | filter: searchFilter" ng-show="getPropertyForObject(option, settings.groupby) !== getPropertyForObject(orderedItems[$index - 1], settings.groupby)" role="presentation" class="dropdown-header">{{ getGroupTitle(getPropertyForObject(option, settings.groupby)) }}</li>';
										template += '<li ng-repeat-end role="presentation">';
									} else {
										template += '<li role="presentation" ng-repeat="option in options | filter: searchFilter">';
									}

									template += '<a role="menuitem" tabindex="-1" ng-click="setSelectedItem(getPropertyForObject(option,settings.idProp))">';

									if (checkboxes) {
										template += '<div class="checkbox"><label><input class="checkboxInput" type="checkbox" ng-click="checkboxClick($event, getPropertyForObject(option,settings.idProp))" ng-checked="isChecked(getPropertyForObject(option,settings.idProp))" /> {{getPropertyForObject(option, settings.displayProp)}}</label></div></a>';
									} else {
										template += '<span data-ng-class="{\'glyphicon glyphicon-ok\': isChecked(getPropertyForObject(option,settings.idProp))}"></span> {{getPropertyForObject(option, settings.displayProp)}}</a>';
									}

									template += '</li>';

									template += '<li class="divider" ng-show="settings.selectionLimit > 1"></li>';
									template += '<li role="presentation" ng-show="settings.selectionLimit > 1"><a role="menuitem">{{selectedModel.length}} {{texts.selectionOf}} {{settings.selectionLimit}} {{texts.selectionCount}}</a></li>';

									template += '</ul>';
									template += '</div>';

									element.html(template);
								},
								link : function($scope, $element, $attrs) {
									var $dropdownTrigger = $element.children()[0];

									$scope.toggleDropdown = function() {
										$scope.open = !$scope.open;
									};

									$scope.checkboxClick = function($event, id) {
										$scope.setSelectedItem(id);
										$event.stopImmediatePropagation();
									};

									$scope.externalEvents = {
										onItemSelect : angular.noop,
										onItemDeselect : angular.noop,
										onSelectAll : angular.noop,
										onDeselectAll : angular.noop,
										onInitDone : angular.noop,
										onMaxSelectionReached : angular.noop
									};

									$scope.settings = {
										dynamicTitle : true,
										scrollable : false,
										scrollableHeight : '300px',
										closeOnBlur : true,
										displayProp : 'name',
										idProp : 'cobrandId',
										externalIdProp : 'id',
										enableSearch : false,
										selectionLimit : 0,
										showCheckAll : true,
										showUncheckAll : true,
										closeOnSelect : false,
										buttonClasses : 'btn btn-default',
										closeOnDeselect : false,
										groupby : $attrs.groupby || undefined,
										groupByTextProvider : null,
										smartButtonMaxItems : 0,
										smartButtonTextConverter : angular.noop
									};

									$scope.texts = {
										checkAll : 'Check All',
										uncheckAll : 'Uncheck All',
										selectionCount : 'checked',
										selectionOf : '/',
										searchPlaceholder : 'Search...',
										buttonDefaultText : 'Select',
										dynamicButtonTextSuffix : 'checked'
									};

									$scope.searchFilter = $scope.searchFilter
											|| '';

									if (angular
											.isDefined($scope.settings.groupby)) {
										$scope
												.$watch(
														'options',
														function(newValue) {
															if (angular
																	.isDefined(newValue)) {
																$scope.orderedItems = $filter(
																		'orderBy')
																		(
																				newValue,
																				$scope.settings.groupby);
															}
														});
									}

									angular.extend($scope.settings,
											$scope.extraSettings || []);
									angular.extend($scope.externalEvents,
											$scope.events || []);
									angular.extend($scope.texts,
											$scope.translationTexts);

									$scope.singleSelection = $scope.settings.selectionLimit === 1;

									function getFindObj(id) {
										var findObj = {};

										if ($scope.settings.externalIdProp === '') {
											findObj[$scope.settings.idProp] = id;
										} else {
											findObj[$scope.settings.externalIdProp] = id;
										}

										return findObj;
									}

									function clearObject(object) {
										for ( var prop in object) {
											delete object[prop];
										}
									}

									if ($scope.singleSelection) {
										if (angular
												.isArray($scope.selectedModel)
												&& $scope.selectedModel.length === 0) {
											clearObject($scope.selectedModel);
										}
									}

									if ($scope.settings.closeOnBlur) {
										$document
												.on(
														'click',
														function(e) {
															var target = e.target.parentElement;
															var parentFound = false;

															while (angular
																	.isDefined(target)
																	&& target !== null
																	&& !parentFound) {
																if (_
																		.contains(
																				target.className
																						.split(' '),
																				'multiselect-parent')
																		&& !parentFound) {
																	if (target === $dropdownTrigger) {
																		parentFound = true;
																	}
																}
																target = target.parentElement;
															}

															if (!parentFound) {
																$scope
																		.$apply(function() {
																			$scope.open = false;
																		});
															}
														});
									}

									$scope.getGroupTitle = function(groupValue) {
										if ($scope.settings.groupByTextProvider !== null) {
											return $scope.settings
													.groupByTextProvider(groupValue);
										}

										return groupValue;
									};

									$scope.getButtonText = function() {
										if ($scope.settings.dynamicTitle
												&& ($scope.selectedModel.length > 0 || (angular
														.isObject($scope.selectedModel) && _
														.keys($scope.selectedModel).length > 0))) {
											if ($scope.settings.smartButtonMaxItems > 0) {
												var itemsText = [];

												angular
														.forEach(
																$scope.options,
																function(
																		optionItem) {
																	if ($scope
																			.isChecked($scope
																					.getPropertyForObject(
																							optionItem,
																							$scope.settings.idProp))) {
																		var displayText = $scope
																				.getPropertyForObject(
																						optionItem,
																						$scope.settings.displayProp);
																		var converterResponse = $scope.settings
																				.smartButtonTextConverter(
																						displayText,
																						optionItem);

																		itemsText
																				.push(converterResponse ? converterResponse
																						: displayText);
																	}
																});

												if ($scope.selectedModel.length > $scope.settings.smartButtonMaxItems) {
													itemsText = itemsText
															.slice(
																	0,
																	$scope.settings.smartButtonMaxItems);
													itemsText.push('...');
												}

												return itemsText.join(', ');
											} else {
												var totalSelected;

												if ($scope.singleSelection) {
													totalSelected = ($scope.selectedModel !== null && angular
															.isDefined($scope.selectedModel[$scope.settings.idProp])) ? 1
															: 0;
												} else {
													totalSelected = angular
															.isDefined($scope.selectedModel) ? $scope.selectedModel.length
															: 0;
												}

												if (totalSelected === 0) {
													return $scope.texts.buttonDefaultText;
												} else {
													return totalSelected
															+ ' '
															+ $scope.texts.dynamicButtonTextSuffix;
												}
											}
										} else {
											return $scope.texts.buttonDefaultText;
										}
									};

									$scope.getPropertyForObject = function(
											object, property) {
										if (angular.isDefined(object)
												&& object
														.hasOwnProperty(property)) {
											return object[property];
										}

										return '';
									};

									$scope.selectAll = function() {
										$scope.deselectAll(false);
										$scope.externalEvents.onSelectAll();

										angular
												.forEach(
														$scope.options,
														function(value) {
															$scope
																	.setSelectedItem(
																			value[$scope.settings.idProp],
																			true);
														});
									};

									$scope.deselectAll = function(sendEvent) {
										sendEvent = sendEvent || true;

										if (sendEvent) {
											$scope.externalEvents
													.onDeselectAll();
										}

										if ($scope.singleSelection) {
											clearObject($scope.selectedModel);
										} else {
											$scope.selectedModel
													.splice(
															0,
															$scope.selectedModel.length);
										}
									};

									$scope.setSelectedItem = function(id,
											dontRemove) {
										var findObj = getFindObj(id);
										var finalObj = null;

										if ($scope.settings.externalIdProp === '') {
											finalObj = _.find($scope.options,
													findObj);
										} else {
											finalObj = findObj;
										}

										if ($scope.singleSelection) {
											clearObject($scope.selectedModel);
											angular.extend(
													$scope.selectedModel,
													finalObj);
											$scope.externalEvents
													.onItemSelect(finalObj);
											if ($scope.settings.closeOnSelect)
												$scope.open = false;

											return;
										}

										dontRemove = dontRemove || false;

										var exists = _.findIndex(
												$scope.selectedModel, findObj) !== -1;

										if (!dontRemove && exists) {
											$scope.selectedModel
													.splice(
															_
																	.findIndex(
																			$scope.selectedModel,
																			findObj),
															1);
											$scope.externalEvents
													.onItemDeselect(findObj);
										} else if (!exists
												&& ($scope.settings.selectionLimit === 0 || $scope.selectedModel.length < $scope.settings.selectionLimit)) {
											$scope.selectedModel.push(finalObj);
											$scope.externalEvents
													.onItemSelect(finalObj);
										}
										if ($scope.settings.closeOnSelect)
											$scope.open = false;
									};

									$scope.isChecked = function(id) {
										if ($scope.singleSelection) {
											return $scope.selectedModel !== null
													&& angular
															.isDefined($scope.selectedModel[$scope.settings.idProp])
													&& $scope.selectedModel[$scope.settings.idProp] === getFindObj(id)[$scope.settings.idProp];
										}

										return _.findIndex(
												$scope.selectedModel,
												getFindObj(id)) !== -1;
									};

									$scope.externalEvents.onInitDone();
								}
							};
						} ]);

angular.module('Directives', []).directive('number', function() {
	return {
		require : 'ngModel',
		restrict : 'A',
		link : function(scope, element, attrs, ctrl) {
			ctrl.$parsers.push(function(input) {
				if (input == undefined)
					return ''
				var inputNumber = input.toString().replace(/[^0-9]/g, '');
				if (inputNumber != input) {
					ctrl.$setViewValue(inputNumber);
					ctrl.$render();
				}
				return inputNumber;
			});
		}
	};
});

angular.module("Services").filter('ISOtoMinutesConverter', function() {
	return function(text) {

		var duration = moment.duration(text).asMinutes();
		return duration;

	};
});
angular.module('Services').directive('datetimez', function() {
	return {
		require : '?ngModel',
		restrict : 'A',
		link : function(scope, element, attrs, ngModel) {
			if (!ngModel)
				return;

			ngModel.$render = function() {
				element.val(ngModel.$viewValue || '');
			};

			function read() {
				var value = element.val();
				ngModel.$setViewValue(value);
				// console.log(scope.dueDate);
			}

			var options = scope.$eval(attrs.datetimez) || {};
			if (element.next().is('.input-group-addon')) {
				var parentElm = $(element).parent();
				parentElm.datetimepicker(options);

				parentElm.on('dp.change', function() {
					scope.$apply(read);
				});
			} else {
				element.datetimepicker(options);

				element.on('dp.change', function() {
					scope.$apply(read);
				});
			}

			read();
		}
	};
});

angular.module('ui.tinymce', []).value('uiTinymceConfig', {}).directive(
		'uiTinymce', [ 'uiTinymceConfig', function(uiTinymceConfig) {
			uiTinymceConfig = uiTinymceConfig || {};
			var generatedIds = 0;
			return {
				require : 'ngModel',
				restrict : 'A',
				link : function(scope, elm, attrs, ngModel) {
					var expression, options, tinyInstance;
					// generate an ID if not present
					if (!attrs.id) {
						attrs.$set('id', 'uiTinymce' + generatedIds++);
					}
					options = {
						// Update model when calling setContent (such as from
						// the source editor popup)
						setup : function(ed) {
							ed.on('init', function(args) {
								ngModel.$render();
							});
							// Update model on button click
							ed.on('ExecCommand', function(e) {
								ed.save();
								ngModel.$setViewValue(elm.val());
								if (!scope.$$phase) {
									scope.$apply();
								}
							});
							// Update model on keypress
							ed.on('KeyUp', function(e) {
								console.log(ed.isDirty());
								ed.save();
								ngModel.$setViewValue(elm.val());
								if (!scope.$$phase) {
									scope.$apply();
								}
							});
						},
						mode : 'exact',
						elements : attrs.id
					};
					if (attrs.uiTinymce) {
						expression = scope.$eval(attrs.uiTinymce);
					} else {
						expression = {};
					}
					angular.extend(options, uiTinymceConfig, expression);
					setTimeout(function() {
						tinymce.init(options);
					});

					ngModel.$render = function() {
						if (!tinyInstance) {
							tinyInstance = tinymce.get(attrs.id);
						}
						if (tinyInstance) {
							tinyInstance.setContent(ngModel.$viewValue || '');
						}
					};
				}
			};
		} ]);

angular
		.module('checklist-model', [])
		.directive(
				'checklistModel',
				[
						'$parse',
						'$compile',
						function($parse, $compile) {
							// contains
							function contains(arr, item, comparator) {
								if (angular.isArray(arr)) {
									for (var i = arr.length; i--;) {
										if (comparator(arr[i], item)) {
											return true;
										}
									}
								}
								return false;
							}

							// add
							function add(arr, item, comparator) {
								arr = angular.isArray(arr) ? arr : [];
								if (!contains(arr, item, comparator)) {
									arr.push(item);
								}
								return arr;
							}

							// remove
							function remove(arr, item, comparator) {
								if (angular.isArray(arr)) {
									for (var i = arr.length; i--;) {
										if (comparator(arr[i], item)) {
											arr.splice(i, 1);
											break;
										}
									}
								}
								return arr;
							}

							// http://stackoverflow.com/a/19228302/1458162
							function postLinkFn(scope, elem, attrs) {
								// exclude recursion, but still keep the model
								var checklistModel = attrs.checklistModel;
								attrs.$set("checklistModel", null);
								// compile with `ng-model` pointing to `checked`
								$compile(elem)(scope);
								attrs.$set("checklistModel", checklistModel);

								// getter for original model
								var checklistModelGetter = $parse(checklistModel);
								var checklistChange = $parse(attrs.checklistChange);
								var checklistBeforeChange = $parse(attrs.checklistBeforeChange);
								var ngModelGetter = $parse(attrs.ngModel);

								var comparator = function(a, b) {
									if (!isNaN(a) && !isNaN(b)) {
										return String(a) === String(b);
									} else {
										return angular.equals(a, b);
									}
								};

								if (attrs.hasOwnProperty('checklistComparator')) {
									if (attrs.checklistComparator[0] == '.') {
										var comparatorExpression = attrs.checklistComparator
												.substring(1);
										comparator = function(a, b) {
											return a[comparatorExpression] === b[comparatorExpression];
										};

									} else {
										comparator = $parse(
												attrs.checklistComparator)(
												scope.$parent);
									}
								}

								// watch UI checked change
								var unbindModel = scope
										.$watch(
												attrs.ngModel,
												function(newValue, oldValue) {
													if (newValue === oldValue) {
														return;
													}

													if (checklistBeforeChange
															&& (checklistBeforeChange(scope) === false)) {
														ngModelGetter
																.assign(
																		scope,
																		contains(
																				checklistModelGetter(scope.$parent),
																				getChecklistValue(),
																				comparator));
														return;
													}

													setValueInChecklistModel(
															getChecklistValue(),
															newValue);

													if (checklistChange) {
														checklistChange(scope);
													}
												});

								// watches for value change of checklistValue
								var unbindCheckListValue = scope
										.$watch(
												getChecklistValue,
												function(newValue, oldValue) {
													if (newValue != oldValue
															&& angular
																	.isDefined(oldValue)
															&& scope[attrs.ngModel] === true) {
														var current = checklistModelGetter(scope.$parent);
														checklistModelGetter
																.assign(
																		scope.$parent,
																		remove(
																				current,
																				oldValue,
																				comparator));
														checklistModelGetter
																.assign(
																		scope.$parent,
																		add(
																				current,
																				newValue,
																				comparator));
													}
												}, true);

								var unbindDestroy = scope.$on('$destroy',
										destroy);

								function destroy() {
									unbindModel();
									unbindCheckListValue();
									unbindDestroy();
								}

								function getChecklistValue() {
									return attrs.checklistValue ? $parse(
											attrs.checklistValue)
											(scope.$parent) : attrs.value;
								}

								function setValueInChecklistModel(value,
										checked) {
									var current = checklistModelGetter(scope.$parent);
									if (angular
											.isFunction(checklistModelGetter.assign)) {
										if (checked === true) {
											checklistModelGetter.assign(
													scope.$parent, add(current,
															value, comparator));
										} else {
											checklistModelGetter.assign(
													scope.$parent, remove(
															current, value,
															comparator));
										}
									}

								}

								// declare one function to be used for both
								// $watch functions
								function setChecked(newArr, oldArr) {
									if (checklistBeforeChange
											&& (checklistBeforeChange(scope) === false)) {
										setValueInChecklistModel(
												getChecklistValue(),
												ngModelGetter(scope));
										return;
									}
									ngModelGetter.assign(scope, contains(
											newArr, getChecklistValue(),
											comparator));
								}

								// watch original model change
								// use the faster $watchCollection method if
								// it's available
								if (angular
										.isFunction(scope.$parent.$watchCollection)) {
									scope.$parent.$watchCollection(
											checklistModel, setChecked);
								} else {
									scope.$parent.$watch(checklistModel,
											setChecked, true);
								}
							}

							return {
								restrict : 'A',
								priority : 1000,
								terminal : true,
								scope : true,
								compile : function(tElement, tAttrs) {

									if (!tAttrs.checklistValue && !tAttrs.value) {
										throw 'You should provide `value` or `checklist-value`.';
									}

									// by default ngModel is 'checked', so we set it if not specified
									if (!tAttrs.ngModel) {
										// local scope var storing individual checkbox model
										tAttrs.$set("ngModel", "checked");
									}

									return postLinkFn;
								}
							};
						} ]);