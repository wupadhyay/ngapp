"use strict";

angular
		.module("YodleeCustomerCare")
		.config(
				[
						"$stateProvider",
						"$urlRouterProvider",
						"$httpProvider",
						"context",
						function($stateProvider, $urlRouterProvider,
								$httpProvider, context) {
							var cp = context.path + "/views/";

							$httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
							
							if (callerIdentification == 'bellicon') {
								$urlRouterProvider
										.otherwise("/cd/communication");
							}else if (aclList
									.indexOf("SERVICE_INSIGHT_VIEW_DASHBOARD") != -1) {
								$urlRouterProvider.otherwise(function(
										$injector, $location) {
									return "/cd/dashboard";
								});
							} else if (aclList
									.indexOf("SERVICE_INSIGHT_VIEW_SITEMETADATA") != -1) {
								$urlRouterProvider
										.otherwise("/cd/siteMetadata");
							} else {
								$urlRouterProvider.otherwise("/cd/dashboard");

							}
						
							$urlRouterProvider.when("/cd/communication",
									"/cd/communication/communication");
							
							$stateProvider
									.state(
											"dashboard",
											{
												url : "/cd/dashboard",
												views : {
													main : {
														templateUrl : cp
																+ "cobrandDashboard/dashboard.html",
														controller : "DashboardController"
													}
												},
												params : {
													responseDetails : {}
												}
											});

							$stateProvider
									.state(
											"siteMetadata",
											{
												url : "/cd/siteMetadata",
												views : {
													main : {
														templateUrl : cp
																+ "siteMetadata/siteMetadataSearch.html",
														controller : "SiteMetadataController"
													}
												},
												params : {
													responseDetails : {}

												}
											});

							$stateProvider
									.state(
											"getSiteDetail",
											{
												url : "/cd/getSiteDetail",
												views : {
													main : {
														templateUrl : cp
																+ "siteMetadata/siteDetail.html",
														controller : "SiteDetailController"
													}
												}
											});
							$stateProvider
									.state(
											"communicationDashboard",
											{
												url : "/cd/communication",
												views : {
													main : {
														templateUrl : cp
																+ "notification/communicationDashboard.html",
														controller : "CommunicationController"
													}
												}
											})
									.state(
											"communicationDashboard.communication",
											{
												url : "/communication",

												templateUrl : cp
														+ "notification/communication.html"

											})
									.state(
											"communicationDashboard.incident",
											{
												url : "/incident",
												// cache:false,
												templateUrl : cp
														+ "notification/communication.html"

											})
									.state(
											"communicationDashboard.maintenance",
											{
												url : "/maintenance",
												templateUrl : cp
														+ "notification/communication.html"

											})
									.state(
											"communicationDashboard.announcement",
											{
												url : "/announcement",
												templateUrl : cp
														+ "notification/announcement.html"

											})
									.state(
											"communicationDashboard.sitealert",
											{
												url : "/siteAlert",
												templateUrl : cp
														+ "notification/sitealert.html",
												controller : "SitealertController"

											});

							$stateProvider
									.state(
											"notification",
											{
												url : "/cd/notification",
												views : {
													main : {
														templateUrl : cp
																+ "notification/notificationManagement.html",
														controller : "NotificationController"
													}
												},
												params : {
													responseDetails : {}

												}
											})
									.state(
											"notification.create",
											{
												url : "/create",
												templateUrl : cp
														+ "notification/notificationCreate.html"

											})
									.state(
											"notification.create.detail",
											{
												url : "/detail",
												templateUrl : cp
														+ "notification/notificationDetail.html"

											})
									.state(
											"notification.create.customer",
											{
												url : "/customer",
												templateUrl : cp
														+ "notification/notificationCustomer.html"

											})
									.state(
											"notification.create.summary",
											{
												url : "/summary",
												templateUrl : cp
														+ "notification/notificationSummary.html"
											})
									.state(
											"notification.view",
											{
												url : "/view",
												templateUrl : cp
														+ "notification/notificationView.html"

											});

							$stateProvider
									.state(
											"userContactManagemnt",
											{
												url : "/cd/contactMngt",
												views : {
													main : {
														templateUrl : cp
																+ "userContactInfo/userContactInfo.html",
														controller : "UserContactInfoController"
													}
												},
												params : {
													responseDetails : {}
												}
											});

						} ]).run(
				[ '$rootScope', '$state', function($rootScope, $state) {
					$rootScope.$state = $state;
				} ]);