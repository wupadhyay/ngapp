
angular
.module(
		"Controllers")
		.controller(
				'SiteDetailController', [
				                         '$scope',
				                         '$controller','$rootScope','DashboardService','ApplicationService', '$element','siteDetailData',
				                         function($scope, $controller, $rootScope,dashboardService, appService,$element,siteDetailData) {

				                        	 $scope.$on('callBySiteId', function(eventName, args) {
				                        		 $scope.onLoadGetData();
				                        		 if($rootScope.initializeSearchSiteWiget!=true){
				                        			 $scope.initSiteDetail();
				                        		 }
				                        		 $scope.cobrandPfm = null;
				                        	 });
				                        	 $rootScope.loaderForSearchWidget=true;
				                        	 $scope.searchWidgetErrorMsg=null;
				                        	 angular.extend(this, $controller('ApplicationController', {$scope: $scope}));
				                        	 document.body.scrollTop = document.documentElement.scrollTop = 0;
				                        	 $scope.onLoadGetData = function(){

				                        		 try{
				                        			 $rootScope.loaderForSearchWidget=true;
				                        			 $scope.searchWidgetErrorMsg=null;
				                        			 $scope.siteDetailData = [];
				                        			 $scope.getDataSiteResults =siteDetailData.getData();

				                        			 for(var k=0; k<$scope.getDataSiteResults.length; k++){
				                        				 $scope.getResult = $scope.getDataSiteResults[k].site_detail;
				                        				 $scope.requestedSiteId = $scope.getDataSiteResults[k].providerIds;
				                        				 $scope.cobrandName = $scope.getDataSiteResults[k].cobrandName;
				                        				 $scope.valCob = $scope.getDataSiteResults[k].cobVal;
				                        				 $scope.siteCobrandSelected = $scope.getDataSiteResults[k].cobrandIdentifier;
				                        				 $scope.searchWidgetType = $scope.getDataSiteResults[k].searchWidgetType;

				                        				 var responseObject = JSON.parse($scope.getResult);
				                        				 if(responseObject.provider == null || responseObject.provider=="null" || responseObject.provider == ""){
				                        					 $scope.siteDetailData = $scope.staticLabels.NoDatafound;
				                        				 }else{
				                        					 angular.forEach(responseObject.provider, function(value,key){
				                        						 $scope.siteDetailData = responseObject.provider;
				                        					 });
				                        					 for(var i=0; i<$scope.siteDetailData.length; i++){
				                        						 $scope.supportedContainer = [];

				                        						 $scope.disabledReason = [];

				                        						 var containerAttributes = $scope.siteDetailData[i].containerAttributes;
				                        						 var additionalDataSet = $scope.siteDetailData[i].additionalDataSet;
				                        						 var additionalInformation = $scope.siteDetailData[i].additionalInformation;

				                        						 $scope.lengthOfContAttributes = Object.keys(containerAttributes).length;
				                        						 $scope.lengthOfAddDataSet = Object.keys(additionalDataSet).length;

				                        						 angular.forEach(additionalInformation, function(val,key){
				                        							 var disableReason = val.disabledReason;
				                        							 if(disableReason){
				                        								 if(disableReason == "SITE_IS_MERGED_OR_ACQURIED"){
				                        									 var disablement_status = $scope.staticLabels.disablement_merged;
				                        								 } else if (disableReason == "SITE_NO_LONGER_SUPPORTED_BY_YODLEE"){
				                        									 var disablement_status = $scope.staticLabels.disablement_noLongerSupported;
				                        								 } else if (disableReason == "SITE_IS_TEMPORARY_DISABLED"){
				                        									 var disablement_status = $scope.staticLabels.disablement_temporary;
				                        								 } else if (disableReason == "SITE_DOES_NOT_WANT_TO_BE_SCRAPPED"){
				                        									 var disablement_status = $scope.staticLabels.disablement_aggregators;
				                        								 } else if (disableReason == "SITE_CAN_NOT_BE_SCRAPPED"){
				                        									 var disablement_status = $scope.staticLabels.disablement_techChallenge;
				                        								 }

				                        								 var reason ={
				                        										 disablementReason : disablement_status,
				                        								 }

				                        								 $scope.disabledReason.push(reason);
				                        							 }
				                        						 });
				                        						 angular.forEach(containerAttributes, function(value,key){

				                        							 var records = {
				                        									 container: key,
				                        									 id:value.id,
				                        									 name:value.name,
				                        									 status:value.status,
				                        									 agentName:value.agentName,
				                        									 noOfTrans:value.numberOfTransactionDays,
				                        									 lastModified:value.lastModified,
				                        							 };
				                        							 $scope.supportedContainer.push(records);

				                        						 });
				                        						 
				                        						$scope.supportedFeature = [];
                        										$scope.containerList = [];

                        										angular.forEach(additionalDataSet, function(value,featureKey){
                        											angular.forEach($scope.supportedContainer, function(val,attributeKey){
                        												if (featureKey == val.container){
                        										 			var container = featureKey;
                        										 			var childVal = value;
                        										 			var noOfTransaction = val.noOfTrans;
                        										 			var rec = {
                        													 	feature: container,
                        													 	noOfTransaction : noOfTransaction,
                        													 	val:childVal				                        								 
                        													};
                        													$scope.containerList.push(rec);	                        										 			
                        											 	} 	                        											 	       						 	
                        											 });	                        											
                        										});
				                        						 
                        										$scope.additionalDataSet = [];		                        						 
			                        							angular.forEach(additionalDataSet, function(value,featureKey){
			                        								var recs = {
			                        									container : featureKey,
			                        									value : value
			                        								}
			                        								$scope.additionalDataSet.push(recs);
			                        							});		                        						 

			                        							function comparer(otherArray){
			                        							  return function(current){
			                        							    return otherArray.filter(function(other){
			                        							      return other.container == current.container 
			                        							    }).length == 0;
			                        							  }
			                        							}

			                        							var onlyInContainer = $scope.supportedContainer.filter(comparer($scope.additionalDataSet));
			                        							var onlyInFeature = $scope.additionalDataSet.filter(comparer($scope.supportedContainer));

					                        					$scope.resCont = onlyInContainer.concat(onlyInFeature);
	
					                        					$scope.resultCont = [];
					                        					angular.forEach($scope.resCont, function(value,key){
					                        						var res = {
					                        							feature : value.container,
					                        							noOfTransaction: value.noOfTrans
					                        						};
					                        						$scope.resultCont.push(res);
					                        					});
			                        						                        						
                        										
                        						
                        										$scope.supportedFeature = $scope.containerList.concat($scope.resultCont);
				                        					 }
				                        				 };

				                        				 $rootScope.loaderForSearchWidget = false;

				                        				 var config = {};
				                        				 $scope.scrollbar = function(direction, autoResize, show) {
				                        					 config.direction = direction;
				                        					 config.autoResize = autoResize;
				                        					 config.scrollbar = {
				                        							 show: !!show
				                        					 };
				                        					 return config;
				                        				 }
				                        			 }
				                        		 }catch(e) {
				                        			 if($rootScope.initializeSearchSiteWiget!=true){
				                        				 $rootScope.loaderForSearchWidget = false;
				                        				 $scope.searchWidgetErrorMsg = $scope.staticLabels.NoDatafound;
				                        			 }
				                        			 var exception = {
				                        					 exceptionStackTrace:e.stack.toString()
				                        			 };
				                        			 var data = angular.copy(exception);
				                        			 appService
				                        			 .loggerService(
				                        					 data,
				                        					 function(data, status, headers,
				                        							 config) {
				                        					 })
				                        		 }


				                        	 };

				                        	 $scope.onLoadGetData();

				                        	 $scope.initSiteDetail=function(){
				                        		 $scope.getLabels("",function(){
				                        			 $scope.getUserType("",function(){
				                        				 $scope.getSiteConsolidatedStats();
				                        				 var sFooter = document.getElementById('include-footer');
				     									sFooter.style.position = 'relative';
				                        			 });
				                        		 });
				                        	 };

				                        	 $scope.dropDownForOverallRefreshStats = [{
				                        		 name: "24 Hours",
				                        		 value: "PT24H",
				                        		 display: "24 hrs"
				                        	 }, {
				                        		 name: "12 Hours",
				                        		 value: "PT12H",
				                        		 display: "12 hrs"
				                        	 }, {
				                        		 name: "4 Hours",
				                        		 value: "PT4H",
				                        		 display: "4 hrs"
				                        	 }];

				                        	 $scope.containerErrorContributionLinks = [{
				                        		 name: "Overall",
				                        		 value: "Overall",
				                        	 }, {
				                        		 name: "Success",
				                        		 value: "Success",
				                        	 }, {
				                        		 name: "Technical Failures",
				                        		 value: "Technical Failures",
				                        	 }, {
				                        		 name: "Site Failures",
				                        		 value: "Site Failures",
				                        	 }, {
				                        		 name: "UAR Failures",
				                        		 value: "UAR Failures",
				                        	 }];

				                        	 $scope.addAcctContainerErrorContributionLinks = [{
				                        		 name: "Overall",
				                        		 value: "Overall",
				                        	 }, {
				                        		 name: "Success",
				                        		 value: "Success",
				                        	 }, {
				                        		 name: "Partial Success",
				                        		 value: "Partial Success",
				                        	 }, {
				                        		 name: "Technical Failures",
				                        		 value: "Technical Failures",
				                        	 }, {
				                        		 name: "Site Failures",
				                        		 value: "Site Failures",
				                        	 }, {
				                        		 name: "UAR Failures",
				                        		 value: "UAR Failures",
				                        	 }];

				                        	 $scope.dropDownForHistoricStats = [{
				                        		 name: "7 Days",
				                        		 value: "P7D"
				                        	 }, {
				                        		 name: "15 Days",
				                        		 value: "P15D"
				                        	 }, {
				                        		 name: "30 Days",
				                        		 value: "P30D"
				                        	 }];

				                        	 $scope.selected = 0;

				                        	 $scope.select= function(index) {
				                        		 $scope.selected = index;
				                        	 };

				                        	 $scope.getOverAllRefreshSiteStats = function(containerName,timeSlot){
				                        		 $scope.loading = true;
				                        		 if(timeSlot == undefined || timeSlot == ""){
				                        			 $scope.duration = 'PT24H';
				                        		 } else {
				                        			 $scope.duration = timeSlot;
				                        		 }
				                        		 $scope.siteOARSErrorMsg=null;
				                        		 $scope.siteOverAllRefreshStats = null;

				                        		 if($scope.cobrandIAVStat == true){
				                        			 var cobrandIAVStat = $scope.staticLabels.iav;
				                        		 } else if ($scope.cobrandIAVStat == false){
				                        			 var cobrandIAVStat = $scope.staticLabels.refresh_label;
				                        		 }
				                        		 if($scope.cobrandPfmType == 'IAV'){
				                        			 var cobrandIAVStat = $scope.staticLabels.iav;
				                        		 }else if ($scope.cobrandPfmType == 'REFRESH'){
				                        			 var cobrandIAVStat = $scope.staticLabels.refresh_label;
				                        		 }else if ($scope.cobrandPfmType == 'Add'){
				                        			 var cobrandIAVStat = "Add";
				                        		 }
				                        		 $scope.overall_compared_total="";
				                        		 $scope.overall_compared_total_arrow = "";
				                        		 $scope.overall_compared_success="";
				                        		 $scope.overall_compared_success_style = "#77716f;";
				                        		 $scope.overall_compared_success_arrow = "";
				                        		 $scope.overall_compared_pSuccess="";
				                        		 $scope.overall_compared_pSuccess_style = "#77716f;";
				                        		 $scope.overall_compared_pSuccess_arrow = "";
				                        		 $scope.overall_compared_technical="";
				                        		 $scope.overall_compared_technical_style = "#77716f;";
				                        		 $scope.overall_compared_technical_arrow = "";
				                        		 $scope.overall_compared_site="";
				                        		 $scope.overall_compared_site_style = "#77716f;";
				                        		 $scope.overall_compared_site_arrow = "";
				                        		 $scope.overall_compared_uar="";
				                        		 $scope.overall_compared_uar_style = "#77716f;";
				                        		 $scope.overall_compared_uar_arrow = "";
				                        		 $scope.overall_compared_latency ="";
				                        		 $scope.overall_compared_latency_style = "#77716f;";
				                        		 $scope.overall_compared_latency_arrow = "";

				                        		 var include_list="";

				                        		 include_list=$scope.staticLabels.container_label;
				                        		 var consolidatedBy="";
				                        		 if($scope.getConsolidatedChannel==true){
				                        			 
				                        			 consolidatedBy="channel";
				                        		 }
				                        		 $scope.defaultReq = {
				                        				 reportType: cobrandIAVStat,
				                        				 groupBy: $scope.staticLabels.provider_label,
				                        				 cobrandId: $scope.siteCobrandSelected,
				                        				 customerId:$scope.customerId,
				                        				 timeSlot: $scope.duration,
				                        				 numRecords: "",
				                        				 top: "",
				                        				 providerIds:$scope.requestedSiteId,
				                        				 consolidatedBy:consolidatedBy,
				                        				 include: include_list
				                        		 }
				                        		 var data = angular.copy($scope.defaultReq);

				                        		 dashboardService.refreshLatencyStats(data, function(data, status, headers,
				                        				 config) {
				                        			 $scope.renderDataOverallRefreshStats(data,containerName,timeSlot,cobrandIAVStat);
				                        		 });
				                        	 };

				                        	 $scope.renderDataOverallRefreshStats=function(data,containerName,timeSlot,cobrandIAVStat){


				                        		 try{
				                        			 $scope.siteOverallRefreshStats = JSON.parse(data);
				                        			 $scope.loading = false;

				                        			 if(data == null || data == "" || data == "{}"){
				                        				 $scope.siteOARSErrorCode=404;
				                        				 $scope.siteOARSErrorMsg=$scope.staticLabels.NoDatafound;
				                        				 return;
				                        			 }else if(data.indexOf($scope.staticLabels.error_code)!=-1){
				                        				 var errResponse = JSON.parse(data);
				                        				 if(errResponse.errorCode==$scope.staticLabels.invalid_session_error_code){
				                        					 $scope.siteOARSErrorMsg=$scope.staticLabels.invalid_session;
				                        					 return;
				                        				 }
				                        				 $scope.siteOARSErrorCode=errResponse.errorCode;
				                        				 $scope.siteOARSErrorMsg=$scope.staticLabels.OARSErrorMsg;
				                        				 return;
				                        			 }else if(JSON.parse(data).refreshStats.info[0].summary==undefined||JSON.parse(data).refreshStats.info[0].summary==""||JSON.parse(data).refreshStats.info[0].summary=="{}"||JSON.parse(data).refreshStats.info[0].summary==null){
				                        				 $scope.siteOARSErrorCode=404;
				                        				 $scope.siteOARSErrorMsg=$scope.staticLabels.NoDatafound;
				                        				 return;
				                        			 }

				                        			 var infoVal = JSON.parse(data).refreshStats.info;

				                        			 for(var i = 0; i < infoVal.length; i++) {
				                        				 $scope.containerLabel = infoVal[i].summary.containerStats;
				                        				 if(containerName == undefined || containerName == ""){
				                        					 $scope.overall_total = (Number(infoVal[i].summary.totalVolume));
				                        				 } else {
				                        					 for(var sc = 0; sc < infoVal[i].summary.containerStats.length; sc++){
				                        						 var supportedCont =  infoVal[i].summary.containerStats[sc].container;
				                        						 if(containerName == supportedCont){
				                        							 $scope.overall_total = (Number(infoVal[i].summary.containerStats[sc].totalVolume));
				                        							 break;
				                        						 }
				                        					 }
				                        					 var object = infoVal[i].summary.containerStats;

				                        					 var index = -1;

				                        					 object.some(function(obj, i) {
				                        						 return obj.container === containerName ? index = i : false;
				                        					 });
				                        					 if(index == -1){
				                        						 $scope.siteOARSErrorMsg=$scope.staticLabels.NoDatafound;
				                        						 return;
				                        					 }

				                        				 }

				                        				 if(containerName == undefined || containerName == ""){
				                        					 $scope.overall_success_num = Number(infoVal[i].summary.success.volume);
				                        					 if(cobrandIAVStat=='Add'){
				                        						 $scope.overall_pSuccess_num=Number(infoVal[i].summary.partialSuccess.volume);
				                        					 }
				                        					 var failureNode = infoVal[i].summary.failure;
				                        					 var latency = infoVal[i].summary.latency;
				                        				 }else {
				                        					 for(var sc = 0; sc < infoVal[i].summary.containerStats.length; sc++){
				                        						 var supportedCont =  infoVal[i].summary.containerStats[sc].container;
				                        						 if(containerName == supportedCont){
				                        							 $scope.overall_success_num = Number(infoVal[i].summary.containerStats[sc].success.volume);
				                        							 if(cobrandIAVStat=='Add'){
				                        								 $scope.overall_pSuccess_num=Number(infoVal[i].summary.containerStats[sc].partialSuccess.volume);
				                        							 }
				                        							 var overall_success_for_compare = Number(infoVal[i].summary.containerStats[sc].success.volume);
				                        							 var failureNode = infoVal[i].summary.containerStats[sc].failure;
				                        							 var latency = infoVal[i].summary.containerStats[sc].latency;
				                        							 break;
				                        						 }

				                        					 }
				                        				 }
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
				                        				 if((latency)!=undefined){
				                        					 $scope.overall_latency = Number(latency.avg).toFixed(2);
				                        				 }
				                        			 }

				                        			 $scope.overall_success = (($scope.overall_success_num / $scope.overall_total) * 100).toFixed(2);
				                        			 if(cobrandIAVStat=='Add'){
				                        				 $scope.overall_pSuccess = (($scope.overall_pSuccess_num / $scope.overall_total) * 100).toFixed(2);
				                        			 }
				                        			 $scope.overall_technical = (($scope.overall_technical_num / $scope.overall_total) * 100).toFixed(2);
				                        			 $scope.overall_site = (($scope.overall_site_num / $scope.overall_total) * 100).toFixed(2);
				                        			 $scope.overall_uar = (($scope.overall_uar_num / $scope.overall_total) * 100).toFixed(2);

				                        			 $scope.loading = false;

				                        		 }catch(e){
				                        			 $scope.siteOARSErrorMsg=$scope.staticLabels.OARSJSErrorMsg;

				                        			 var exception = {
				                        					 exceptionStackTrace:e.stack.toString()
				                        			 };
				                        			 var data = angular.copy(exception);
				                        			 appService
				                        			 .loggerService(
				                        					 data,
				                        					 function(data, status, headers,
				                        							 config) {
				                        					 })
				                        		 }

				                        	 }

				                        	 $scope.getContainerContributionStats = function(containerName){
				                        		 console.log("getContainerContributionStats---");
				                        		 $scope.siteCRSErrorMsg=null;
				                        		 $scope.siteContainerContributionRefreshStats = null;
				                        		 $scope.siteContainerRefreshStatslastUpdated = null;

				                        		 if($scope.cobrandIAVStat == true){
				                        			 var cobrandIAVStat = $scope.staticLabels.iav;
				                        		 } else if ($scope.cobrandIAVStat == false){
				                        			 var cobrandIAVStat = $scope.staticLabels.refresh_label;
				                        		 }
				                        		 if($scope.cobrandPfmType == 'IAV'){
				                        			 var cobrandIAVStat = $scope.staticLabels.iav;
				                        		 }else if ($scope.cobrandPfmType == 'REFRESH'){
				                        			 var cobrandIAVStat = $scope.staticLabels.refresh_label;
				                        		 }else if ($scope.cobrandPfmType == 'Add'){
				                        			 var cobrandIAVStat = "Add";
				                        		 }
				                        		 	
				                        		 var consolidatedBy="";
				                        		 console.log("getContainerContributionStats consolidated value---"+$scope.getConsolidatedChannel);
				                        		 if($scope.getConsolidatedChannel==true){
				                        			 consolidatedBy="channel";
				                        		 }

				                        		 var include_list="";

				                        		 include_list=$scope.staticLabels.container_label;
				                        		 $scope.siteContainerContributionStatsFilter = {
				                        				 reportType: cobrandIAVStat,
				                        				 customerId:$scope.customerId,
				                        				 groupBy: $scope.staticLabels.provider_label,
				                        				 cobrandId: $scope.siteCobrandSelected,
				                        				 timeSlot: $scope.selectedSiteOverallRefreshTrendTimeSlot,
				                        				 numRecords: "",
				                        				 top: "",
				                        				 include: include_list,
				                        				 consolidatedBy:consolidatedBy,
				                        				 providerIds:$scope.requestedSiteId
				                        		 };

				                        		 if(containerName != undefined){
				                        			 return;
				                        		 }

				                        		 var data = angular.copy($scope.siteContainerContributionStatsFilter);

				                        		 dashboardService
				                        		 .refreshLatencyStats(
				                        				 data,
				                        				 function(data, status, headers,
				                        						 config) {
				                        					 $scope.siteCRSErrorMsg=null;
				                        					 $scope.siteContainerContributionRefreshStats = null;

				                        					 try{
				                        						 var response = JSON.parse(data);

				                        						 if(data == null || data == "" || data == "{}"){
				                        							 $scope.siteCRSErrorCode=404;
				                        							 $scope.siteCRSErrorMsg=$scope.staticLabels.NoDatafound;
				                        							 return;
				                        						 }else if(data.indexOf($scope.staticLabels.error_code)!=-1){
				                        							 var errResponse = JSON.parse(data);
				                        							 if(errResponse.errorCode==$scope.staticLabels.invalid_session_error_code){
				                        								 $scope.siteCRSErrorMsg=$scope.staticLabels.invalid_session;
				                        								 return;
				                        							 }
				                        							 $scope.siteCRSErrorCode=errResponse.errorCode;
				                        							 $scope.siteCRSErrorMsg=$scope.staticLabels.HRSErrorMsg;
				                        							 return;
				                        						 }
				                        						 $scope.siteContainerContributionRefreshStats = response;
				                        						 $scope.conainerContributioncobrandIAVStat = cobrandIAVStat;
				                        						 $scope.renderDataforContainerContribution();
				                        					 }catch(e){
				                        						 $scope.siteContainerContributionRefreshStats = null;
				                        						 $scope.siteCRSErrorMsg=$scope.staticLabels.HRSJSErrorMsg;
				                        						 var exception = {
				                        								 exceptionStackTrace:e.stack.toString()
				                        						 };
				                        						 var data = angular.copy(exception);
				                        						 appService
				                        						 .loggerService(
				                        								 data,
				                        								 function(data, status, headers,
				                        										 config) {
				                        								 })
				                        					 }
				                        				 });
				                        	 };

				                        	 $scope.renderDataforContainerContribution=function(args){

				                        		 if(args!=undefined){
				                        			 $scope.selectedErrorContribution=args;
				                        		 }

				                        		 try{
				                        			 var overall_total;
				                        			 var overall_success;
				                        			 var overall_pSuccess;
				                        			 var overall_technical_failures;
				                        			 var overall_site_failures;
				                        			 var overall_uar_failures;
				                        			 var containers=[];
				                        			 var container_total=[];
				                        			 var container_success=[];
				                        			 var container_pSuccess=[];
				                        			 var container_tech_errors=[];
				                        			 var container_site_errors=[];
				                        			 var container_uar_errors=[];
				                        			 var container_total_per=[];
				                        			 var container_success_per=[];
				                        			 var container_pSuccess_per=[];
				                        			 var container_tech_errors_per=[];
				                        			 var container_site_errors_per=[];
				                        			 var container_uar_errors_per=[];

				                        			 if($scope.siteContainerContributionRefreshStats=="" || $scope.siteContainerContributionRefreshStats==undefined || $scope.siteContainerContributionRefreshStats.refreshStats==undefined){
				                        				 $scope.siteCRSErrorCode=404;
				                        				 $scope.siteCRSErrorMsg=$scope.staticLabels.NoDatafound;
				                        				 return;
				                        			 }else if($scope.siteContainerContributionRefreshStats.refreshStats.info[0].summary==undefined||$scope.siteContainerContributionRefreshStats.refreshStats.info[0].summary==""||$scope.siteContainerContributionRefreshStats.refreshStats.info[0].summary=="{}"||$scope.siteContainerContributionRefreshStats.refreshStats.info[0].summary==null){
				                        				 $scope.siteCRSErrorCode=404;
				                        				 $scope.siteCRSErrorMsg=$scope.staticLabels.NoDatafound;
				                        				 return;
				                        			 }
				                        			 var info = $scope.siteContainerContributionRefreshStats.refreshStats.info;

				                        			 if(info.length>0){
				                        				 $scope.siteContainerRefreshStatslastUpdated=info[0].lastModified;
				                        			 }

				                        			 for (var k = 0; k < info.length; k++) {
				                        				 var infoVal = info[k].summary;
				                        				 overall_total= Number(infoVal.totalVolume);
				                        				 overall_success=Number(infoVal.success.volume);
				                        				 if($scope.conainerContributioncobrandIAVStat=='Add'){
				                        					 overall_pSuccess=Number(infoVal.partialSuccess.volume);
				                        				 }
				                        				 var failureNode = infoVal.failure;

				                        				 for (var j = 0; j < failureNode.length; j++) {
				                        					 var failureType = failureNode[j].type;
				                        					 if (failureType == $scope.staticLabels.tech_err_label) {
				                        						 overall_technical_failures  = Number(failureNode[j].volume);
				                        					 } else if (failureType == $scope.staticLabels.site_label) {
				                        						 overall_site_failures = Number(failureNode[j].volume);
				                        					 } else if (failureType == $scope.staticLabels.uar_label) {
				                        						 overall_uar_failures=Number(failureNode[j].volume);
				                        					 }
				                        				 }

				                        				 var infoVal_container=info[k].summary.containerStats;
				                        				 for (var l = 0; l < infoVal_container.length; l++) {
				                        					 containers[l]=infoVal_container[l].container;
				                        					 container_total[l]=Number(infoVal_container[l].totalVolume);
				                        					 container_total_per[l]=((Number(infoVal_container[l].totalVolume)/overall_total)* 100).toFixed(2);
				                        					 container_success[l]=Number(infoVal_container[l].success.volume);
				                        					 if(overall_success==0){
				                        						 container_success_per[l]=Number("0").toFixed(2);
				                        					 }else{
				                        						 container_success_per[l]=((Number(infoVal_container[l].success.volume)/overall_success)* 100).toFixed(2);
				                        					 }

				                        					 if($scope.conainerContributioncobrandIAVStat=='Add'){
				                        						 container_pSuccess[l]=Number(infoVal_container[l].partialSuccess.volume);
				                        						 if(overall_pSuccess==0){
				                        							 container_pSuccess_per[l]=Number("0").toFixed(2);
				                        						 }else{
				                        							 container_pSuccess_per[l]=((Number(infoVal_container[l].partialSuccess.volume)/overall_pSuccess)* 100).toFixed(2);
				                        						 }
				                        					 }

				                        					 var containerfailureNode = infoVal_container[l].failure;

				                        					 for (var m= 0; m < containerfailureNode.length; m++) {
				                        						 var failureType = failureNode[m].type;
				                        						 if (failureType == $scope.staticLabels.tech_err_label) {
				                        							 container_tech_errors[l]=Number(containerfailureNode[m].volume);
				                        							 if(overall_technical_failures==0){
				                        								 container_tech_errors_per[l]=Number("0").toFixed(2);
				                        							 }else{
				                        								 container_tech_errors_per[l]=((Number(containerfailureNode[m].volume)/overall_technical_failures)* 100).toFixed(2);
				                        							 }
				                        						 } else if (failureType == $scope.staticLabels.site_label) {
				                        							 container_site_errors[l]=Number(containerfailureNode[m].volume);
				                        							 if(overall_site_failures==0){
				                        								 container_site_errors_per[l]=Number("0").toFixed(2);
				                        							 }else{
				                        								 container_site_errors_per[l]=((Number(containerfailureNode[m].volume)/overall_site_failures)* 100).toFixed(2);
				                        							 }
				                        						 } else if (failureType == $scope.staticLabels.uar_label) {
				                        							 container_uar_errors[l]=Number(containerfailureNode[m].volume);
				                        							 if(overall_uar_failures==0){
				                        								 container_uar_errors_per[l]=Number("0").toFixed(2);
				                        							 }else{
				                        								 container_uar_errors_per[l]=((Number(containerfailureNode[m].volume)/overall_uar_failures)* 100).toFixed(2);
				                        							 }
				                        						 }
				                        					 }
				                        				 }
				                        			 }

				                        			 var data=[];
				                        			 var total;
				                        			 var total_num=[];
				                        			 for(var s=0;s<containers.length;s++){
				                        				 if($scope.selectedErrorContribution=="Overall"){
				                        					 total=overall_total;
				                        					 total_num[s]=[containers[s],Number(container_total[s])];
				                        					 data[s]=[containers[s],Number(container_total_per[s])];
				                        				 }else if($scope.selectedErrorContribution=="Success"){
				                        					 total=overall_success;
				                        					 total_num[s]=[containers[s],Number(container_success[s])];
				                        					 data[s]=[containers[s],Number(container_success_per[s])];
				                        				 }else if($scope.selectedErrorContribution=="Partial Success"){
				                        					 total=overall_pSuccess;
				                        					 total_num[s]=[containers[s],Number(container_pSuccess[s])];
				                        					 data[s]=[containers[s],Number(container_pSuccess_per[s])];
				                        				 }else if($scope.selectedErrorContribution=="Technical Failures"){
				                        					 total=overall_technical_failures;
				                        					 total_num[s]=[containers[s],Number(container_tech_errors[s])];
				                        					 data[s]=[containers[s],Number(container_tech_errors_per[s])];
				                        				 }else if($scope.selectedErrorContribution=="Site Failures"){
				                        					 total=overall_site_failures;
				                        					 total_num[s]=[containers[s],Number(container_site_errors[s])];
				                        					 data[s]=[containers[s],Number(container_site_errors_per[s])];
				                        				 }else if($scope.selectedErrorContribution=="UAR Failures"){
				                        					 total=overall_uar_failures;
				                        					 total_num[s]=[containers[s],Number(container_uar_errors[s])];
				                        					 data[s]=[containers[s],Number(container_uar_errors_per[s])];
				                        				 }
				                        			 }

				                        			 $scope.renderChartForContainerContribution(data,total,total_num);
				                        		 }catch(e){
				                        			 $scope.siteCRSErrorMsg=$scope.staticLabels.HRSJSErrorMsg;
				                        			 var exception = {
				                        					 exceptionStackTrace:e.stack.toString()
				                        			 };
				                        			 var data = angular.copy(exception);
				                        			 appService
				                        			 .loggerService(
				                        					 data,
				                        					 function(data, status, headers,
				                        							 config) {
				                        					 })
				                        		 }

				                        	 };

				                        	 $scope.renderChartForContainerContribution=function(dataForChart,total,total_num){

				                        		 $scope.index="";

				                        		 var overallContainerContributionChart = new Highcharts.Chart({
				                        			 chart: {
				                        			 renderTo: 'overall_container_refresh_site_stats_db',
				                        			 height:310,
				                        			 type: 'pie',
				                        			 plotBackgroundColor: null,
				                        			 plotBorderWidth: 0,
				                        			 plotShadow: false,				                        			 
				                        			 marginRight:250
				                        		 },
				                        		 title: {
				                        			 text: '<div class="container-contribution-total">TOTAL</div>' +
				                        			 '<div class="container-contribution-total-value">' +total+ '</div>',
				                        			 useHTML: true,
				                        			 align: 'center',
				                        			 verticalAlign: 'middle',
				                        			 y: 0,
				                        			 x: -120
				                        		 },
				                        		 tooltip: {
				                        			 pointFormat: '<b>{point.percentage:.2f}%</b>',
				                        			 fontFamily: 'proxima_nova_rgregular',
				                        			 borderRadius:0,
				                        			 borderColor:'#D2EDFF',
				                        		 },
				                        		 legend: {
				                        			 layout: 'vertical',
				                        			 align: 'right',
				                        			 useHTML:'true',
				                        			 verticalAlign: 'middle',
				                        			 fontFamily: 'proxima_nova_rgregular',
				                        			 itemMarginBottom: 14,
				                        			 symbolWidth: 3,
				                        			 symbolHeight: 28,
				                        			 floating: false,
				                        			 itemHoverStyle: {
				                        			 color: '#FF0000'
				                        		 },
				                        		 labelFormatter: function () {

				                        			 var percent;
				                        			 var total_number;

				                        			 for(var i=0;i<dataForChart.length;i++){
				                        				 if( this.name==dataForChart[i][0]){
				                        					 percent=dataForChart[i][1];
				                        					 break;
				                        				 } else if (this.name==dataForChart[i].name){
				                        					 percent=dataForChart[i].y;
				                        					 break;
				                        				 }
				                        			 }


				                        			 for(var k=0;k<total_num.length;k++){
				                        				 if( this.name==total_num[k][0]){
				                        					 total_number=total_num[k][1];
				                        					 break;
				                        				 }
				                        			 }
				                        			 return '<div style="width: 200px;""><span class="legend_percent">'+(Number(percent)).toFixed(2)+'%'+ '</span><span class="legend_container text-capitalize">'+this.name.replace(/_/g,' ') + '</span><span class="legend_volume">'+total_number+'</span></div>';
				                        		 }
				                        		 },
				                        		 plotOptions: {
				                        			 pie: {
				                        			 size: 180,
				                        			 innerSize: '70%',
				                        			 dataLabels: {
				                        			 enabled: false
				                        		 },
				                        		 showInLegend: true
				                        		 },
				                        		 series: {
				                        			 point: {
				                        			 events: {
				                        			 legendItemClick: function () {
				                        			 return false; // Overriding
																	// default
																	// behaviour
				                        		 }
				                        		 }
				                        		 }
				                        		 }
				                        		 },
				                        		 series: [{
				                        			 colorByPoint: true,
				                        			 data:dataForChart, legendID:0}],
				                        			 loading: false,
				                        			 credits: {
				                        			 enabled: false
				                        		 }
				                        		 });

				                        	 };

				                        	 $scope.getErrorContributionStats = function(containerName){

				                        		 $scope.siteECRSErrorMsg=null;
				                        		 $scope.siteErrorContributionRefreshStats = null;
				                        		 $scope.siteErrorRefreshStatslastUpdated = null;

				                        		 if($scope.cobrandIAVStat == true){
				                        			 var cobrandIAVStat = $scope.staticLabels.iav;
				                        		 } else if ($scope.cobrandIAVStat == false){
				                        			 var cobrandIAVStat = $scope.staticLabels.refresh_label;
				                        		 }
				                        		 if($scope.cobrandPfmType == 'IAV'){
				                        			 var cobrandIAVStat = $scope.staticLabels.iav;
				                        		 }else if ($scope.cobrandPfmType == 'REFRESH'){
				                        			 var cobrandIAVStat = $scope.staticLabels.refresh_label;
				                        		 }else if ($scope.cobrandPfmType == 'Add'){
				                        			 var cobrandIAVStat = "Add";
				                        		 }

				                        		 var include_list="";

				                        		 include_list=$scope.staticLabels.errorcode;
				                        		 var consolidatedBy="";
				                        		 if($scope.getConsolidatedChannel==true){
				                        			 consolidatedBy="channel";
				                        		 }

				                        		 $scope.siteErrorContributionStatsFilter = {
				                        				 reportType: cobrandIAVStat,
				                        				 customerId:$scope.customerId,
				                        				 groupBy: $scope.staticLabels.provider_label,
				                        				 cobrandId: $scope.siteCobrandSelected,
				                        				 timeSlot: $scope.selectedSiteOverallRefreshTrendTimeSlot,
				                        				 numRecords: "",
				                        				 top: "",
				                        				 include: include_list,
				                        				 consolidatedBy:consolidatedBy,
				                        				 providerIds:$scope.requestedSiteId
				                        		 };

				                        		 if(containerName != undefined){
				                        			 return;
				                        		 }

				                        		 var data = angular.copy($scope.siteErrorContributionStatsFilter);

				                        		 dashboardService
				                        		 .refreshLatencyStats(
				                        				 data,
				                        				 function(data, status, headers,
				                        						 config) {
				                        					 $scope.siteECRSErrorMsg=null;
				                        					 $scope.siteErrorContributionRefreshStats = null;

				                        					 try{

				                        						 var response = JSON.parse(data);

				                        						 if(data == null || data == "" || data == "{}"){
				                        							 $scope.siteECRSErrorCode=404;
				                        							 $scope.siteECRSErrorMsg=$scope.staticLabels.NoDatafound;
				                        							 return;
				                        						 }else if(data.indexOf($scope.staticLabels.error_code)!=-1){
				                        							 var errResponse = JSON.parse(data);
				                        							 if(errResponse.errorCode==$scope.staticLabels.invalid_session_error_code){
				                        								 $scope.siteECRSErrorMsg=$scope.staticLabels.invalid_session;
				                        								 return;
				                        							 }
				                        							 $scope.siteECRSErrorCode=errResponse.errorCode;
				                        							 $scope.siteECRSErrorMsg=$scope.staticLabels.HRSErrorMsg;
				                        							 return;
				                        						 }
				                        						 $scope.siteErrorContributionRefreshStats = response;
				                        						 $scope.renderDataforErrorContribution(data);

				                        					 }catch(e){
				                        						 $scope.siteErrorContributionRefreshStats = null;
				                        						 $scope.siteECRSErrorMsg=$scope.staticLabels.HRSJSErrorMsg;
				                        						 var exception = {
				                        								 exceptionStackTrace:e.stack.toString()
				                        						 };
				                        						 var data = angular.copy(exception);
				                        						 appService
				                        						 .loggerService(
				                        								 data,
				                        								 function(data, status, headers,
				                        										 config) {
				                        								 })
				                        					 }
				                        				 });
				                        	 }

				                        	 $scope.renderDataforErrorContribution=function(args){

				                        		 try{
				                        			 var overall_failure_total = 0;
				                        			 var overall_technical_failures;
				                        			 var overall_site_failures;
				                        			 var overall_uar_failures;
				                        			 var failures=[];

				                        			 var tech_failure_per = [];
				                        			 var site_failure_per = [];
				                        			 var uar_failure_per = [];
				                        			 var failure_tech_brkup=[];
				                        			 var failure_site_brkup=[];
				                        			 var failure_uar_brkup=[];
				                        			 var container_failure_total=[];
				                        			 var container_tech_errors=[];
				                        			 var container_site_errors=[];
				                        			 var container_uar_errors=[];
				                        			 var failure_tech_brkup_per=[];
				                        			 var failure_site_brkup_per=[];
				                        			 var failure_site_brkup_per=[];
				                        			 var failure_site_brkup_per=[];


				                        			 var info = $scope.siteErrorContributionRefreshStats.refreshStats.info;

				                        			 if(info.length>0){
				                        				 $scope.siteErrorRefreshStatslastUpdated=info[0].lastModified;
				                        			 }

				                        			 var techbreakup=false;
		                        					 var sitebreakup=false;
		                        					 var uarbreakup=false;
		                        					 var totalVol;
		                        					 
				                        			 for (var k = 0; k < info.length; k++) {
				                        				 var infoVal = info[k].summary;


				                        				 totalVol=infoVal.totalVolume;
				                        				 var failureNode = infoVal.failure;


				                        				 for (var j = 0; j < failureNode.length; j++) {

				                        					 var overall_failure = Number(failureNode[j].volume);
				                        					 overall_failure_total = overall_failure_total + overall_failure;

				                        					 var failureType = failureNode[j].type;
				                        					 failures[j] = failureType;
				                        					 
				                        					 if (failureType == $scope.staticLabels.tech_err_label) {
				                        						 overall_technical_failures  = Number(failureNode[j].volume);
				                        						 if(failureNode[j].breakups==undefined){
				                        							 techbreakup=true;
				                        							 continue;
				                        						 }
				                        						 var failure_brkup_tech = failureNode[j].breakups;
				                        						 var failure_desc;
				                        						 var failure_code;
				                        						 var failure_brkup_per;
				                        						 for(var m=0; m < failure_brkup_tech.length; m++){
				                        							 failure_desc = failure_brkup_tech[m].description;
				                        							 failure_code = failure_brkup_tech[m].code;
				                        							 var tech_brkup_vol = Number(failure_brkup_tech[m].volume);
				                        							 var failure_brkup_per = ((tech_brkup_vol/totalVol)* 100).toFixed(2);
				                        							 failure_tech_brkup[m] = [failure_desc,failure_code,failure_brkup_per];

				                        						 }

				                        					 } else if (failureType == $scope.staticLabels.site_label) {
				                        						 overall_site_failures = Number(failureNode[j].volume);
				                        						 if(failureNode[j].breakups==undefined){
				                        							 sitebreakup=true;
				                        							 continue;
				                        						 }
				                        						 var failure_brkup_site = failureNode[j].breakups;

				                        						 for(var n=0; n < failure_brkup_site.length; n++){
				                        							 failure_desc = failure_brkup_site[n].description;
				                        							 failure_code = failure_brkup_site[n].code;
				                        							 var site_brkup_vol = Number(failure_brkup_site[n].volume);
				                        							 failure_brkup_per = ((site_brkup_vol/totalVol)* 100).toFixed(2);
				                        							 failure_site_brkup[n] = [failure_desc,failure_code,failure_brkup_per];

				                        						 }

				                        					 } else if (failureType == $scope.staticLabels.uar_label) {
				                        						 overall_uar_failures=Number(failureNode[j].volume);
				                        						 if(failureNode[j].breakups==undefined){
				                        							 uarbreakup=true;
				                        							 continue;
				                        						 }
				                        						 var failure_brkup_uar = failureNode[j].breakups;

				                        						 for(var p=0; p < failure_brkup_uar.length; p++){
				                        							 failure_desc = failure_brkup_uar[p].description;
				                        							 failure_code = failure_brkup_uar[p].code;
				                        							 var uar_brkup_vol = Number(failure_brkup_uar[p].volume);
				                        							 failure_brkup_per = ((uar_brkup_vol/totalVol)* 100).toFixed(2);
				                        							 failure_uar_brkup[p] = [failure_desc,failure_code,failure_brkup_per];

				                        						 }

				                        					 }


				                        				 }

				                        			 }

				                        			 if(techbreakup && sitebreakup && uarbreakup){
				                        				 $scope.siteECRSErrorMsg=$scope.staticLabels.NoDatafound;
				                        				 return;
				                        			 }
				                        			 
				                        			 var data=[];
				                        			 var data_brkup = [];
				                        			 var total;
				                        			 var total_num=[];
				                        			 total = overall_failure_total;
				                        			 if(total == null || total == "" || total == 0){
				                        				 $scope.siteECRSErrorMsg=$scope.staticLabels.NoDatafound;
				                        				 return;
				                        			 }

				                        			 for(var s=0;s<failures.length;s++){
				                        				 if(failures[s] == 'TECHNICAL'){
				                        					 var failure_tech_type = $scope.staticLabels.tech_failure;
				                        					 total_num[s]=[failures[s],Number(overall_technical_failures)];
				                        					 tech_failure_per = ((overall_technical_failures/totalVol)* 100).toFixed(2);
				                        					 data[s]=[failure_tech_type,Number(tech_failure_per)];
				                        					 data_brkup[s]=[failure_tech_type,failure_tech_brkup];
				                        				 } else if (failures[s] == 'SITE') {
				                        					 var failure_site_type = $scope.staticLabels.site_failure;
				                        					 total_num[s]=[failures[s],Number(overall_site_failures)];
				                        					 site_failure_per = ((Number(overall_site_failures)/totalVol)* 100).toFixed(2);
				                        					 data[s]=[failure_site_type,Number(site_failure_per)];
				                        					 data_brkup[s]=[failure_site_type,failure_site_brkup];
				                        				 }else if (failures[s] == 'USERACTIONREQUIRED') {
				                        					 var failure_uar_type = $scope.staticLabels.uar_failure;
				                        					 total_num[s]=[failures[s],Number(overall_uar_failures)];
				                        					 uar_failure_per = ((Number(overall_uar_failures)/totalVol)* 100).toFixed(2);
				                        					 data[s]=[failure_uar_type,Number(uar_failure_per)];
				                        					 data_brkup[s]=[failure_uar_type,failure_uar_brkup];
				                        				 }
				                        			 }


				                        			 $scope.renderChartForErrorContribution(data,total,total_num,data_brkup);
				                        		 }catch(e){
				                        			 $scope.siteECRSErrorMsg=$scope.staticLabels.HRSJSErrorMsg;
				                        			 var exception = {
				                        					 exceptionStackTrace:e.stack.toString()
				                        			 };
				                        			 var data = angular.copy(exception);
				                        			 appService
				                        			 .loggerService(
				                        					 data,
				                        					 function(data, status, headers,
				                        							 config) {
				                        					 })
				                        		 }

				                        	 };

				                        	 function moveToPoint(clickPoint){
				                        		 var points = clickPoint.series.points;
				                        		 var startAngle = 0;
				                        		 for (var i = 0; i < points.length; i++){
				                        			 var p = points[i];
				                        			 if (p == clickPoint)
				                        			 {
				                        				 break;
				                        			 }
				                        			 startAngle += (p.percentage/100.0 * 360.0);
				                        		 }
				                        		 clickPoint.series.update({
				                        			 startAngle: -startAngle + 90 - ((clickPoint.percentage/100.0 * 360.0)/2)
				                        		 });
				                        	 }

				                        	 $scope.renderChartForErrorContribution=function(dataForChart,total,total_num,data_brkup){

				                        		 var chartData = new Array();
				                        		 var fpercent=0;
				                        		 for(var l=0; l< dataForChart.length; l++){
				                        			 var val = dataForChart[l];
				                        			 var error = val[0];
				                        			 var percent = val[1];
				                        			 if(error=='TECHNICAL'){
				                        				 fpercent=val[1];
				                        			 }
				                        			 chartData.push([error,percent,l]);
				                        		 }

				                        		 var startAngle =0;
				                        		 $scope.index="";

				                        		 var overallContainerContributionChart = new Highcharts.Chart({
				                        			 chart: {
				                        			 renderTo: 'overall_container_refresh_error_stats_db',
				                        			 height:280,
				                        			 type: 'pie',
				                        			 plotBackgroundColor: null,
				                        			 plotBorderWidth: 0,
				                        			 plotShadow: false,
				                        			 events: {
				                        			 load: function () {
				                        			 // add report div
				                        			 var ch = this,
				                        					 x = 20,
				                        					 y = 57;

				                        			 ch.flashText = ch.renderer.text('<div id="flash" style="width:100%"><div id="report"></div></div>', x +220, y -41, true).attr({
				                        				 zIndex: 101,
				                        				 width: 55 + '%'
				                        			 }).add();


				                        			 var errorType = 'Technical Failure';
				                        			 var x = $scope.staticLabels.tech_failure;

				                        			 $('#report').html(


				                        					 function(){

				                        						 var content='';
				                        						 content+= '<div class="chart-title">'+ x + '</div>' ;
				                        						 content+= '<div id="arrow-left"> <ul class="chart-data">';
				                        						 for (var i=0; i<=data_brkup.length; i++  ){
				                        							 var brkup = data_brkup[i];
				                        							 if(errorType==data_brkup[i][0]){
				                        								 var dataBrkup = data_brkup[i][1];
				                        								 if(dataBrkup == 0 || dataBrkup == "" || dataBrkup == undefined) {
				                        									 $scope.typeECRSErrorMsg=$scope.staticLabels.NoDatafound;
				                        									 content=content+'<li><span>'+$scope.typeECRSErrorMsg+'</span></li>';
				                        								 }
				                        								 dataBrkup.sort(function(a, b) {
				                        									 return parseFloat(b[2]) - parseFloat(a[2]);
				                        								 });
				                        								 var more_percent = 0;
				                        								 for (var j = 0; j < dataBrkup.length; j++) {

				                        									 if(j <= 4){
				                        										 var data = dataBrkup[j];

				                        										 var brkup_desc = data[0];
				                        										 var code = data[1];
				                        										 var percent = data[2];
				                        										 content=content+'<li><span class="percent">'+percent+'% </span><span class="code">'+code+' : </span><span class="desc">'+brkup_desc+'</span></li>';
				                        									 }else if(j > 4){
				                        										 var data = dataBrkup[j];
				                        										 var percents = parseFloat(data[2]);
				                        										 more_percent = more_percent + percents;
				                        									 }
				                        								 }
				                        								 if(dataBrkup.length > 5){
				                        									 content+= '<li><span class="percent">'+more_percent.toFixed(2)+'% </span><span class="code"> Other</span></li>'
				                        								 }


				                        								 break;
				                        							 }

				                        						 }
				                        						 content+= '</ul> </div>';
				                        						 return content;
				                        					 }

				                        					 );
				                        		 }
				                        		 }
				                        		 },
				                        		 colors: ['#DE5b49', '#ffa000', '#c5ea3a'],
				                        		 title: {
				                        			 text: '<div class="container-contribution-total">Total Errors</div>' +
				                        			 '<div class="container-contribution-total-value">' +total+ '</div>',
				                        			 useHTML: true,
				                        			 align: 'center',
				                        			 verticalAlign: 'middle',
				                        			 y: -5,
				                        			 x: -178
				                        		 },
				                        		 tooltip: {
				                        			 pointFormat: '',
				                        			 fontFamily: 'proxima_nova_rgregular',
				                        			 borderRadius:0,
				                        			 borderColor:'#D2EDFF',
				                        		 },
				                        		 legend: {
				                        			 layout: 'horizontal',
				                        			 align: 'right',
				                        			 useHTML:'true',
				                        			 verticalAlign: 'bottom',
				                        			 fontFamily: 'proxima_nova_rgregular',
				                        			 itemMarginBottom: -25,
				                        			 width:'365',
				                        			 floating: true,
				                        			 itemHoverStyle: {
				                        			 color: '#FF0000'
				                        		 },
				                        		 },
				                        		 plotOptions: {
				                        			 pie: {
				                        			 startAngle: -startAngle + 90 - ((fpercent/100.0 * 360.0)/2),
				                        			 size: 200,
				                        			 cursor: 'pointer',
				                        			 stickyTracking: false,
				                        			 innerSize: '55%',
				                        			 center: ['18%', '45%'],
				                        			 showInLegend: true,
				                        			 slicedOffset: 5,
				                        			 shadow: 0,
				                        			 allowPointSelect: true,
				                        			 dataLabels: {
				                        			 enabled: true,
				                        			 distance: -26,
				                        			 format: '{y} %',
				                        			 style: {
				                        			 fontWeight: 'bold',
				                        			 color: 'white',
				                        			 textShadow:'none',
				                        			 fontSize: '10px'
				                        		 }
				                        		 },
				                        		 showInLegend: true,

				                        		 center: ['18%', '45%']
				                        		 },
				                        		 series: {
				                        			 point: {
				                        			 events: {
				                        			 click: function(e) {

				                        			 var errorType = this.name;
				                        			 var x;
				                        			 if(this.name == 'Technical Failure'){
				                        				 x = $scope.staticLabels.tech_failure;
				                        			 } else if(this.name == 'Site Failure'){
				                        				 x = $scope.staticLabels.site_failure;
				                        			 }else if(this.name == 'UAR Failure'){
				                        				 x = $scope.staticLabels.uar_failure;
				                        			 }

				                        			 $('#report').html(

				                        					 function(){

				                        						 var content='';
				                        						 content+= '<div class="chart-title">'+ x + '</div>' ;
				                        						 content+= '<div id="arrow-left"> <ul class="chart-data">';
				                        						 for (var i=0; i<=data_brkup.length; i++  ){
				                        							 var brkup = data_brkup[i];
				                        							 if(errorType==data_brkup[i][0]){
				                        								 var dataBrkup = data_brkup[i][1];
				                        								 if(dataBrkup == 0 || dataBrkup == "" || dataBrkup == undefined) {
				                        									 $scope.typeECRSErrorMsg=$scope.staticLabels.NoDatafound;
				                        									 content=content+'<li><span>'+$scope.typeECRSErrorMsg+'</span></li>';
				                        								 }
				                        								 dataBrkup.sort(function(a, b) {
				                        									 return parseFloat(b[2]) - parseFloat(a[2]);
				                        								 });
				                        								 var more_percent = 0;
				                        								 for (var j = 0; j < dataBrkup.length; j++) {

				                        									 if(j <= 4){
				                        										 var data = dataBrkup[j];

				                        										 var brkup_desc = data[0];
				                        										 var code = data[1];
				                        										 var percent = data[2];
				                        										 content=content+'<li><span class="percent">'+percent+'% </span><span class="code">'+code+' : </span><span class="desc">'+brkup_desc+'</span></li>';
				                        									 }else if(j > 4){
				                        										 var data = dataBrkup[j];
				                        										 var percents = parseFloat(data[2]);
				                        										 more_percent = more_percent + percents;
				                        									 }
				                        								 }
				                        								 if(dataBrkup.length > 5){
				                        									 content+= '<li><span class="percent">'+more_percent.toFixed(2)+'% </span><span class="code"> Other</span></li>'
				                        								 }


				                        								 break;
				                        							 }

				                        						 }
				                        						 content+= '</ul> </div>';
				                        						 return content;
				                        					 }

				                        					 );

				                        			 moveToPoint(this);
				                        		 }



				                        		 }
				                        		 }
				                        		 }
				                        		 },
				                        		 series: [{
				                        			 colorByPoint: true,
				                        			 data:dataForChart,
				                        			 legendID:0,
				                        			 keys: ['name','y','sum']
				                        		 }],
				                        		 loading: false,
				                        		 credits: {
				                        			 enabled: false
				                        		 }
				                        		 });

				                        	 }

				                        	 $scope.pfmButtonSite = function(newItemType){
				                        		 $scope.cobrandPfm = newItemType;
				                        		 $scope.getSiteConsolidatedStats();
				                        		 setTimeout(function(){
				                        			 var containerSite = $element.find('.cont-site.active');
				                        			 containerSite.removeClass('active');
				                        		 },100);
				                        		 if($scope.searchWidgetType =='siteDetail'){
				                        			 ga('send','event','tabs','sdTabs', $scope.cobrandPfm ,20);
				                        			 ga('send','pageview','/sd'+$scope.cobrandPfm);
				                        		 } else {
				                        			 ga('send','event','tabs','swTabs', $scope.cobrandPfm ,8);
				                        			 ga('send','pageview','/sw'+$scope.cobrandPfm);
				                        		 }
				                        	 }

				                        	 $scope.refreshSiteStats = function (containerName,timeSlot) {
				                        		 if($scope.valCob == undefined || $scope.valCob.id == cobrandIdentifier) {
				                        			 $scope.selectedCobrand = ""+$scope.selectedCobrand;
				                        			 $scope.cobrandIAVStat = $scope.cobrandIAV;
				                        			 $scope.isPfmSite = $scope.isPfm;
				                        			 $scope.addAcct= $scope.isSlmrCob;
				                        			 console.log("refreshSiteStats--"+$scope.subbrandList+" Index "+$scope.cobrandName.indexOf("Consolidated"));
				                        			 if($scope.subbrandList!=undefined && $scope.subbrandList.length>0  && $scope.cobrandName.indexOf("Consolidated")!=-1){
				                        				 $scope.getConsolidatedChannel=true;
				                        			 }else{
				                        				 $scope.getConsolidatedChannel=false;
				                        			 }
				                        		 } else {
				                        			 $scope.selectedCobrand = ""+$scope.valCob.id;
				                        			 $scope.cobrandIAVStat = $scope.valCob.iav;
				                        			 $scope.isPfmSite = $scope.valCob.pfm;
				                        			 $scope.addAcct= $scope.valCob.slmr;
				                        			 if($scope.valCob.name.indexOf("Consolidated")!=-1){
				                        				 $scope.getConsolidatedChannel=true;
				                        			 }else{
				                        				 $scope.getConsolidatedChannel=false;
				                        			 }
				                        		 }

				                        		 if($scope.addAcct == true && $scope.cobrandIAVStat == false && $scope.isPfmSite == false){
				                        			 $scope.pfmType="Add";
				                        		 }else if($scope.cobrandIAVStat == true && $scope.isPfmSite == false){
				                        			 $scope.pfmType =$scope.staticLabels.iav;
				                        		 }else if($scope.cobrandIAVStat == false && $scope.isPfmSite == true){
				                        			 $scope.pfmType =$scope.staticLabels.refresh_label;
				                        		 }else if($scope.isPfmSite == true){
				                        			 $scope.pfmType =$scope.staticLabels.refresh_label;
				                        		 }else if($scope.cobrandIAVStat == true){
				                        			 $scope.pfmType =$scope.staticLabels.iav;
				                        		 }

				                        		 if ($scope.cobrandPfm == 'REFRESH'){
				                        			 $scope.pfmType = $scope.staticLabels.refresh_label;
				                        		 }else if($scope.cobrandPfm == 'IAV'){
				                        			 $scope.pfmType = $scope.staticLabels.iav;
				                        		 }else if($scope.cobrandPfm == 'Add'){
				                        			 $scope.pfmType = "Add";
				                        		 }

				                        		 $scope.cobrandPfmType = $scope.pfmType;

				                        		 $scope.getSiteAllCommonStats(containerName,timeSlot);
				                        		 $scope.getErrorContributionStats(containerName);


				                        	 };

				                        	 $scope.getSiteAllCommonStats=function(containerName,timeSlot){


				                        		 if(containerName == undefined){
				                        			 containerName = $scope.containerNameSelected;
				                        		 }

				                        		 $scope.loading = true;
				                        		 $scope.siteOARSErrorMsg=null;
				                        		 $scope.siteOverAllRefreshStats = null;

				                        		 $scope.siteHRSErrorMsg=null;
				                        		 $scope.siteHistoryRefreshStats = null;
				                        		 $scope.siteHistoricRefreshStatslastUpdated = null;

				                        		 $scope.siteCRSErrorMsg=null;
				                        		 $scope.siteContainerContributionRefreshStats = null;
				                        		 $scope.overallRefreshLatencyStatsComparison = null;
				                        		 $scope.overall_compared_total=null;
				                        		 $scope.overall_compared_total_arrow = "";
				                        		 $scope.overall_compared_success=null;
				                        		 $scope.overall_compared_success_style = "#77716f;";
				                        		 $scope.overall_compared_success_arrow = "";
				                        		 $scope.overall_compared_pSuccess=null;
				                        		 $scope.overall_compared_pSuccess_style = "#77716f;";
				                        		 $scope.overall_compared_pSuccess_arrow = "";
				                        		 $scope.overall_compared_technical=null;
				                        		 $scope.overall_compared_technical_style = "#77716f;";
				                        		 $scope.overall_compared_technical_arrow = "";
				                        		 $scope.overall_compared_site=null;
				                        		 $scope.overall_compared_site_style = "#77716f;";
				                        		 $scope.overall_compared_site_arrow = "";
				                        		 $scope.overall_compared_uar=null;
				                        		 $scope.overall_compared_uar_style = "#77716f;";
				                        		 $scope.overall_compared_uar_arrow = "";
				                        		 $scope.overall_compared_latency =null;
				                        		 $scope.overall_compared_latency_style = "#77716f;";
				                        		 $scope.overall_compared_latency_arrow = "";



				                        		 if($scope.cobrandIAVStat == true){
				                        			 var cobrandIAVStat = $scope.staticLabels.iav;
				                        		 } else if ($scope.cobrandIAVStat == false){
				                        			 var cobrandIAVStat = $scope.staticLabels.refresh_label;
				                        		 }
				                        		 if($scope.cobrandPfmType == 'IAV'){
				                        			 var cobrandIAVStat = $scope.staticLabels.iav;
				                        		 }else if ($scope.cobrandPfmType == 'REFRESH'){
				                        			 var cobrandIAVStat = $scope.staticLabels.refresh_label;
				                        		 }else if ($scope.cobrandPfmType == 'Add'){
				                        			 var cobrandIAVStat = "Add";
				                        		 }
				                        		 var include_list=$scope.staticLabels.container_label+","+$scope.staticLabels.historic_label;

				                        		 var consolidatedBy="";
				                        		 if($scope.getConsolidatedChannel==true){
				                        			 consolidatedBy="channel";
				                        		 }

				                        		 $scope.siteAllRefreshLatencyFilter = {
				                        				 reportType: cobrandIAVStat,
				                        				 customerId:$scope.customerId,
				                        				 groupBy: $scope.staticLabels.provider_label,
				                        				 cobrandId: $scope.siteCobrandSelected,
				                        				 timeSlot: $scope.selectedSiteHistoricRefreshTrendTimeSlot,
				                        				 numRecords: "",
				                        				 top: "",
				                        				 consolidatedBy:consolidatedBy,
				                        				 include: include_list,
				                        				 providerIds:$scope.requestedSiteId
				                        		 };


				                        		 var data = angular.copy($scope.siteAllRefreshLatencyFilter);

				                        		 dashboardService
				                        		 .refreshLatencyStats(
				                        				 data,
				                        				 function(data, status, headers,
				                        						 config) {

				                        					 $scope.renderDataOverallRefreshStats(data,containerName,timeSlot,cobrandIAVStat);
				                        					 $scope.renderHistoricSiteDataChart(data,containerName,cobrandIAVStat);
				                        					 if(containerName==null || containerName==undefined){
				                        						 $scope.siteContainerContributionRefreshStats = JSON.parse(data);
				                        						 $scope.conainerContributioncobrandIAVStat = cobrandIAVStat;
				                        						 $scope.renderDataforContainerContribution();
				                        					 }

				                        				 });
				                        	 };

				                        	 $scope.getSiteConsolidatedStats = function(){
				                        		 $scope.consolidatedView=true;
				                        		 
				                        		 var siteOverAll = $element.find('.container-tab-site');
				                        		 siteOverAll.addClass('active');
				                        		 var containerSite = $element.find('.cont-site.active');
				                        		 containerSite.removeClass('active');
				                        		 $scope.selectedSiteOverallRefreshTrendTimeSlot = $scope.dropDownForOverallRefreshStats[0].value;
				                        		 $scope.selectedSiteHistoricRefreshTrendTimeSlot = $scope.dropDownForHistoricStats[1].value;
				                        		 $scope.selectedContainer="SITE";
				                        		 $scope.selectedErrorContribution="Overall";
				                        		 $scope.containerNameSelected=null;
				                        		 $scope.refreshSiteStats();
				                        	 };

				                        	 $scope.getContainerSpecificStats = function($index,event){
				                        		 $scope.consolidatedView=false;
				                        		 $scope.selectedIndex = $index;
				                        		 document.getElementById("sw-hs-dropdown").value=$scope.dropDownForHistoricStats[1].value;
				                        		 var containerName = $(event.target).attr("data-type");
				                        		 var siteActive = $element.find('.container-tab-site.active');
				                        		 siteActive.removeClass('active');
				                        		 $scope.selectedSiteOverallRefreshTrendTimeSlot = $scope.dropDownForOverallRefreshStats[0].value;
				                        		 $scope.selectedSiteHistoricRefreshTrendTimeSlot = $scope.dropDownForHistoricStats[1].value;
				                        		 $scope.containerNameSelected=containerName;
				                        		 $scope.refreshSiteStats(containerName);
				                        		 if($scope.searchWidgetType =='siteDetail'){
				                        			 ga('send','event','tabs','sdContainer', containerName ,18);
				                        			 ga('send','pageview','/sdContainer');
				                        		 } else {
				                        			 ga('send','event','tabs','swContainer', containerName ,6);
				                        			 ga('send','pageview','/swContainer');
				                        		 }
				                        	 };

				                        	 $scope.selectedSiteOverallRefreshTrendTimeSlot = 'PT24H';
				                        	 
				                        	 $scope.getStatsonFilter = function(val){
				                        		 var timeSlot = val;
				                        		 $scope.selectedSiteOverallRefreshTrendTimeSlot = val;
				                        		 var myElements = $element.find('.cont-site.active');
				                        		 var containerName = myElements.attr("data-type");
				                        		 $scope.getOverAllRefreshSiteStats(containerName,timeSlot);
				                        		 $scope.getContainerContributionStats();
				                        		 $scope.getErrorContributionStats();
				                        		 if($scope.searchWidgetType =='siteDetail'){
				                        			 ga('send','event','select','sdSnapshot', $scope.selectedSiteOverallRefreshTrendTimeSlot ,19);
				                        			 ga('send','pageview','/sdSnapshot');
				                        		 } else {
				                        			 ga('send','event','select','swSnapshot', $scope.selectedSiteOverallRefreshTrendTimeSlot ,7);
				                        			 ga('send','pageview','/swSnapshot');
				                        		 }
				                        	 };

				                        	 $scope.getHistoricStatsonFilter = function(val){
				                        		 $scope.selectedSiteHistoricRefreshTrendTimeSlot = val;
				                        		 $scope.getHistoricRefreshSiteStats();
				                        		 if($scope.searchWidgetType =='siteDetail'){
				                        			 ga('send','event','select','sdRefreshTrend', $scope.selectedSiteHistoricRefreshTrendTimeSlot ,21);
				                        			 ga('send','pageview','/sdRefreshTrend');
				                        		 } else {
				                        			 ga('send','event','select','swRefreshTrend', $scope.selectedSiteHistoricRefreshTrendTimeSlot ,9);
				                        			 ga('send','pageview','/swRefreshTrend');
				                        		 }
				                        	 };

				                        	 $scope.selectedSiteOverallRefreshTrendTimeSlot = $scope.dropDownForOverallRefreshStats[0].value;
				                        	 $scope.selectedSiteHistoricRefreshTrendTimeSlot = $scope.dropDownForHistoricStats[1].value;;

				                        	 $scope.selectedContainer="SITE";
				                        	 $scope.selectedErrorContribution="Overall";
				                        	 $scope.consolidatedView=true;

				                        	 $scope.getHistoricRefreshSiteStats = function(containerName) {

				                        		 if(containerName == undefined){
				                        			 containerName = $scope.containerNameSelected;
				                        		 }

				                        		 $scope.siteHRSErrorMsg=null;
				                        		 $scope.siteHistoryRefreshStats = null;
				                        		 $scope.siteHistoricRefreshStatslastUpdated = null;

				                        		 if($scope.cobrandIAVStat == true){
				                        			 var cobrandIAVStat = $scope.staticLabels.iav;
				                        		 } else if ($scope.cobrandIAVStat == false){
				                        			 var cobrandIAVStat = $scope.staticLabels.refresh_label;
				                        		 }
				                        		 if($scope.cobrandPfmType == 'IAV'){
				                        			 var cobrandIAVStat = $scope.staticLabels.iav;
				                        		 }else if ($scope.cobrandPfmType == 'REFRESH'){
				                        			 var cobrandIAVStat = $scope.staticLabels.refresh_label;
				                        		 }else if ($scope.cobrandPfmType == 'Add'){
				                        			 var cobrandIAVStat = "Add";
				                        		 }

				                        		 var include_list="";

				                        		 include_list=$scope.staticLabels.historic_label+","+$scope.staticLabels.container_label;
				                        		 var consolidatedBy="";
				                        		 if($scope.getConsolidatedChannel==true){
				                        			 consolidatedBy="channel";
				                        		 }
				                        		 $scope.siteHistoryRefreshLatencyBreakDownStatsFilter = {
				                        				 reportType: cobrandIAVStat,
				                        				 customerId:$scope.customerId,
				                        				 groupBy: $scope.staticLabels.provider_label,
				                        				 cobrandId: $scope.siteCobrandSelected,
				                        				 timeSlot: $scope.selectedSiteHistoricRefreshTrendTimeSlot,
				                        				 numRecords: "",
				                        				 top: "",
				                        				 include:include_list,
				                        				 consolidatedBy:consolidatedBy,
				                        				 providerIds:$scope.requestedSiteId
				                        		 };


				                        		 var data = angular.copy($scope.siteHistoryRefreshLatencyBreakDownStatsFilter);

				                        		 dashboardService
				                        		 .refreshLatencyStats(
				                        				 data,
				                        				 function(data, status, headers,
				                        						 config) {
				                        					 $scope.renderHistoricSiteDataChart(data,containerName,cobrandIAVStat);
				                        				 });
				                        	 };

				                        	 $scope.renderHistoricSiteDataChart=function(data,containerName,cobrandIAVStat){


				                        		 $scope.siteHRSErrorMsg=null;
				                        		 $scope.siteHistoryRefreshStats = null;

				                        		 try{
				                        			 var response = JSON.parse(data);

				                        			 if(data == null || data == "" || data == "{}"){
				                        				 $scope.siteHRSErrorCode=404;
				                        				 $scope.siteHRSErrorMsg=$scope.staticLabels.NoDatafound;
				                        				 return;
				                        			 }else if(data.indexOf($scope.staticLabels.error_code)!=-1){
				                        				 var errResponse = JSON.parse(data);
				                        				 if(errResponse.errorCode==$scope.staticLabels.invalid_session_error_code){
				                        					 $scope.siteHRSErrorMsg=$scope.staticLabels.invalid_session;
				                        					 return;
				                        				 }
				                        				 $scope.siteHRSErrorCode=errResponse.errorCode;
				                        				 $scope.siteHRSErrorMsg=$scope.staticLabels.HRSErrorMsg;
				                        				 return;
				                        			 }else if(response.refreshStats.info[0].details==undefined||response.refreshStats.info[0].details==""||response.refreshStats.info[0].details=="{}"||response.refreshStats.info[0].details==null){
				                        				 $scope.siteHRSErrorCode=404;
				                        				 $scope.siteHRSErrorMsg=$scope.staticLabels.NoDatafound;
				                        				 return;
				                        			 }


				                        			 $scope.siteHistoryRefreshStats = response;
				                        			 var history_overall_timeaxis = [];
				                        			 var history_overall_totalaxis = [];
				                        			 var history_overall_success = "";
				                        			 var history_overall_successaxis = [];
				                        			 var history_overall_agentaxis=[];
				                        			 var history_overall_siteaxis=[];
				                        			 var history_overall_uaraxis=[];
				                        			 var history_overall_uar="";
				                        			 var history_overall_success_wo_uaraxis = [];
				                        			 var history_overall_pSuccessaxis = [];

				                        			 var info = response.refreshStats.info;

				                        			 if(info.length>0){
				                        				 $scope.siteHistoricRefreshStatslastUpdated=info[0].lastModified;
				                        			 }

				                        			 for (var k = 0; k < info.length; k++) {
				                        				 var infoVal = info[k].details;
				                        				 infoVal=infoVal.reverse();

				                        				 for (var i = 0; i < infoVal.length; i++) {

				                        					 if(containerName != null){
				                        						 history_overall_timeaxis[i] = (infoVal[i].date).substring((infoVal[i].date).indexOf("/") + 1)+" PT";
				                        						 var containerNode=infoVal[i].summary.containerStats;
				                        						 for (var l = 0; l < containerNode.length; l++) {
				                        							 if(containerName.toLowerCase() == containerNode[l].container.toLowerCase()){
				                        								 history_overall_totalaxis[i] = Number(containerNode[l].totalVolume);
				                        								 history_overall_success=Number(containerNode[l].success.volume);
				                        								 history_overall_successaxis[i] = Number(((Number(containerNode[l].success.volume)/ history_overall_totalaxis[i]) * 100).toFixed(2));
				                        								 if(cobrandIAVStat=='Add'){
				                        									 history_overall_pSuccessaxis[i] = Number(((Number(containerNode[i].partialSuccess.volume)/ history_overall_totalaxis[i]) * 100).toFixed(2));
				                        								 }
				                        								 var failureNode = containerNode[l].failure;

				                        								 for (var j = 0; j < failureNode.length; j++) {

				                        									 var failureType = failureNode[j].type;
				                        									 if (failureType == $scope.staticLabels.tech_err_label) {
				                        										 history_overall_agentaxis[i] = Number(((Number(failureNode[j].volume) / history_overall_totalaxis[i]) * 100).toFixed(2));
				                        									 } else if (failureType == $scope.staticLabels.site_label) {
				                        										 history_overall_siteaxis[i] = Number(((Number(failureNode[j].volume) / history_overall_totalaxis[i]) * 100).toFixed(2));
				                        									 } else if (failureType == $scope.staticLabels.uar_label) {
				                        										 history_overall_uar=Number(failureNode[j].volume);
				                        										 history_overall_uaraxis[i] = Number(((Number(failureNode[j].volume) / history_overall_totalaxis[i]) * 100).toFixed(2));
				                        									 }
				                        								 }
				                        								 if(Number(history_overall_totalaxis[i]-history_overall_uar)!=0){
				                        									 history_overall_success_wo_uaraxis[i] = Number(((history_overall_success/(history_overall_totalaxis[i]-history_overall_uar)) * 100).toFixed(2));
				                        								 }else{
				                        									 history_overall_success_wo_uaraxis[i] =0;
				                        								 }
				                        							 }
				                        							 var object = infoVal[i].summary.containerStats;
				                        							 var indexs = -1;

				                        							 object.some(function(obj, i) {
				                        								 return obj.container === containerName ? indexs = i : false;
				                        							 });

				                        							 if(indexs == -1){
				                        								 $scope.siteHRSErrorMsg=$scope.staticLabels.NoDatafound;
				                        								 return;
				                        							 }

				                        						 }
				                        					 }else{
				                        						 history_overall_timeaxis[i] = (infoVal[i].date).substring((infoVal[i].date).indexOf("/") + 1)+" PT";
				                        						 history_overall_totalaxis[i] = Number(infoVal[i].summary.totalVolume);
				                        						 history_overall_success=Number(infoVal[i].summary.success.volume);
				                        						 history_overall_successaxis[i] = Number(((Number(infoVal[i].summary.success.volume)/ history_overall_totalaxis[i]) * 100).toFixed(2));
				                        						 if(cobrandIAVStat=='Add'){
				                        							 history_overall_pSuccessaxis[i] = Number(((Number(infoVal[i].summary.partialSuccess.volume)/ history_overall_totalaxis[i]) * 100).toFixed(2));
				                        						 }
				                        						 var failureNode = infoVal[i].summary.failure;

				                        						 for (var j = 0; j < failureNode.length; j++) {

				                        							 var failureType = failureNode[j].type;
				                        							 if (failureType == $scope.staticLabels.tech_err_label) {
				                        								 history_overall_agentaxis[i] = Number(((Number(failureNode[j].volume) / history_overall_totalaxis[i]) * 100).toFixed(2));
				                        							 } else if (failureType == $scope.staticLabels.site_label) {
				                        								 history_overall_siteaxis[i] = Number(((Number(failureNode[j].volume) / history_overall_totalaxis[i]) * 100).toFixed(2));
				                        							 } else if (failureType == $scope.staticLabels.uar_label) {
				                        								 history_overall_uar=Number(failureNode[j].volume);
				                        								 history_overall_uaraxis[i] = Number(((Number(failureNode[j].volume) / history_overall_totalaxis[i]) * 100).toFixed(2));
				                        							 }
				                        						 }
				                        						 if(Number(history_overall_totalaxis[i]-history_overall_uar)!=0){
				                        							 history_overall_success_wo_uaraxis[i] = Number(((history_overall_success/(history_overall_totalaxis[i]-history_overall_uar)) * 100).toFixed(2));
				                        						 }else{
				                        							 history_overall_success_wo_uaraxis[i] = 0;
				                        						 }
				                        					 }
				                        				 }
				                        			 }

				                        			 var xStep=1;
				                        			 if($scope.selectedSiteHistoricRefreshTrendTimeSlot=="P30D"){
				                        				 xStep=3;
				                        			 }

				                        			 if(cobrandIAVStat=='Add'){

				                        				 var historicSeries=[{
				                        					 type: 'area',
				                        					 yAxis: 1,
				                        					 name: $scope.staticLabels.refresh_volume,
				                        					 color: '#e7feff',
				                        					 border: 'solid 1.3px #ffffff',
				                        					 fontFamily: 'proxima_nova_rgregular',
				                        					 data: history_overall_totalaxis,
				                        					 index:0,
				                        					 legendIndex:0,
				                        					 legendID:1,
				                        					 lineColor:'#74afca',
				                        					 marker: {
				                        					 fillColor: '#74afca'
				                        				 }
				                        				 }, {
				                        					 name: $scope.staticLabels.successful_Label,
				                        					 yAxis: 0,
				                        					 type: 'line',
				                        					 color: '#46b280',
				                        					 fontFamily: 'proxima_nova_rgregular',
				                        					 data: history_overall_successaxis,
				                        					 index:4,
				                        					 legendIndex:1,
				                        					 legendID:1
				                        				 }, {
				                        					 name: "Partial Success",
				                        					 yAxis: 0,
				                        					 type: 'line',
				                        					 color: '#25f081',
				                        					 fontFamily: 'proxima_nova_rgregular',
				                        					 data: history_overall_pSuccessaxis,
				                        					 index:5,
				                        					 legendIndex:2,
				                        					 legendID:1
				                        				 }, {
				                        					 name: $scope.staticLabels.success_uar_Label,
				                        					 yAxis: 0,
				                        					 type: 'line',
				                        					 color: '#3f51b5',
				                        					 fontFamily: 'proxima_nova_rgregular',
				                        					 data: history_overall_success_wo_uaraxis,
				                        					 index:3,
				                        					 legendIndex:5,
				                        					 legendID:1
				                        				 }, {
				                        					 name: $scope.staticLabels.technical_failure_Label,
				                        					 yAxis: 0,
				                        					 type: 'line',
				                        					 color: '#de5b49',
				                        					 fontFamily: 'proxima_nova_rgregular',
				                        					 data: history_overall_agentaxis,
				                        					 index:2,
				                        					 legendIndex:3,
				                        					 legendID:1
				                        				 }, {
				                        					 name: $scope.staticLabels.site_failure_Label,
				                        					 yAxis: 0,
				                        					 type: 'line',
				                        					 color: '#ffa000',
				                        					 fontFamily: 'proxima_nova_rgregular',
				                        					 data: history_overall_siteaxis,
				                        					 index:1,
				                        					 legendIndex:4,
				                        					 legendID:1
				                        				 }]
				                        			 }else{
				                        				 var historicSeries=[{
				                        					 type: 'area',
				                        					 yAxis: 1,
				                        					 name: $scope.staticLabels.refresh_volume,
				                        					 color: '#e7feff',
				                        					 border: 'solid 1.3px #ffffff',
				                        					 fontFamily: 'proxima_nova_rgregular',
				                        					 data: history_overall_totalaxis,
				                        					 index:0,
				                        					 legendIndex:0,
				                        					 legendID:1,
				                        					 lineColor:'#74afca',
				                        					 marker: {
				                        					 fillColor: '#74afca'
				                        				 }
				                        				 }, {
				                        					 name: $scope.staticLabels.successful_Label,
				                        					 yAxis: 0,
				                        					 type: 'line',
				                        					 color: '#46b280',
				                        					 fontFamily: 'proxima_nova_rgregular',
				                        					 data: history_overall_successaxis,
				                        					 index:4,
				                        					 legendIndex:1,
				                        					 legendID:1
				                        				 }, {
				                        					 name: $scope.staticLabels.success_uar_Label,
				                        					 yAxis: 0,
				                        					 type: 'line',
				                        					 color: '#3f51b5',
				                        					 fontFamily: 'proxima_nova_rgregular',
				                        					 data: history_overall_success_wo_uaraxis,
				                        					 index:3,
				                        					 legendIndex:4,
				                        					 legendID:1
				                        				 }, {
				                        					 name: $scope.staticLabels.technical_failure_Label,
				                        					 yAxis: 0,
				                        					 type: 'line',
				                        					 color: '#de5b49',
				                        					 fontFamily: 'proxima_nova_rgregular',
				                        					 data: history_overall_agentaxis,
				                        					 index:2,
				                        					 legendIndex:2,
				                        					 legendID:1
				                        				 }, {
				                        					 name: $scope.staticLabels.site_failure_Label,
				                        					 yAxis: 0,
				                        					 type: 'line',
				                        					 color: '#ffa000',
				                        					 fontFamily: 'proxima_nova_rgregular',
				                        					 data: history_overall_siteaxis,
				                        					 index:1,
				                        					 legendIndex:3,
				                        					 legendID:1
				                        				 }]
				                        			 }
				                        			 
				                        			 function adjustGraphOhrs(chart) {
				                        			        
													        try {
													            if (typeof (chart === 'undefined' || chart === null) && this instanceof jQuery) { // if
																																					// no
																																					// obj
																																					// chart
																																					// and
																																					// the
																																					// context
																																					// is
																																					// set
													               
													                this.find('.chart-container:visible').each(function () { // for
																																// only
																																// visible
																																// charts
																																// container
																																// in
																																// the
																																// curent
																																// context
													                    $container = $(this); // context
																								// container
													                    $container.find('div[id^="chart-"]').each(function () { // for
																																// only
																																// chart
													                        $chart = $(this).highcharts(); // cast
																											// from
																											// JQuery
																											// to
																											// highcharts
																											// obj
													                        $chart.setSize($container.width(), $chart.chartHeight, doAnimation = true); // adjust
																																						// chart
																																						// size
																																						// with
																																						// animation
																																						// transition
													                    });
													                });
													            } else {
													                chart.setSize($('.chart-container:visible').width(), chart.chartHeight, doAnimation = true); // if
																																									// chart
																																									// is
																																									// set,
																																									// adjust
													            }
													        } catch (err) {
													            // do nothing
													        }
													    }
				                        			$(window).resize(function() {
														$('#overall_historic_refresh_site_stats_db').highcharts().redraw();														  
													});

				                        			 var overallHistoricRefreshSnapshotchart = new Highcharts.Chart({
				                        				 chart: {
				                        				 renderTo: 'overall_historic_refresh_site_stats_db',
				                        				 zoomType:'xy',
				                        				 type: 'line',
				                        				 height:310,
				                        				 series: {
				                        				 connectNulls: true
				                        			 },
				                        			 marginBottom:75,
				                        			 events: {
										                    load: function (event) {
										                        adjustGraphOhrs(this);
										                    }
										                }
				                        			 },

				                        			 rangeSelector: {
				                        				 selected: 1
				                        			 },

				                        			 xAxis: {
				                        				 categories: history_overall_timeaxis,
				                        				 labels: {
				                        				 rotation: 0,
				                        				 step: xStep,
				                        				 style: {
				                        				 fontSize: '11px',
				                        				 fontFamily: 'proxima_nova_rgregular'
				                        			 }
				                        			 }
				                        			 },
				                        			 yAxis: [{ // Primary yAxis
				                        				 gridLineWidth: 0,
				                        				 tickWidth: 1,
				                        				 lineWidth:1,
				                        				 tickInterval:10,
				                        				 min:0,
				                        				 title: {
				                        				 text: ""
				                        			 },
				                        			 labels: {
				                        				 format: '{value}%',
				                        				 fontFamily: 'proxima_nova_rgregular',
				                        				 style: {
				                        				 color: '#363b4e'
				                        			 }
				                        			 },
				                        			 showEmpty: false
				                        			 }, {
				                        				 // Secondary yAxis
				                        				 gridLineWidth: 0,
				                        				 tickWidth: 1,
				                        				 lineWidth:1,
				                        				 title: {
				                        				 text: $scope.staticLabels.refresh_volume,
				                        				 style: {
				                        				 fontFamily: 'proxima_nova_rgregular',
				                        				 color: '#74afca'
				                        			 }
				                        			 },
				                        			 labels: {
				                        				 fontFamily: 'proxima_nova_rgregular',
				                        				 style: {
				                        				 color: '#74afca'
				                        			 }
				                        			 },
				                        			 opposite: true,
				                        			 showEmpty: false
				                        			 }],
				                        			 legend: {
				                        				 align: 'right',
				                        				 verticalAlign: 'bottom',
				                        				 floating: false,
				                        				 fontFamily: 'proxima_nova_rgregular',
				                        				 itemHoverStyle: {
				                        				 color: '#FF0000'
				                        			 },

				                        			 },
				                        			 plotOptions: {
				                        				 series: {
				                        				 marker: {
				                        				 enabled: true,
				                        				 symbol: 'circle'
				                        			 }
				                        			 }
				                        			 },
				                        			 series:historicSeries,
				                        			 title: {
				                        				 text: ''
				                        			 },

				                        			 loading: false,
				                        			 credits: {
				                        				 enabled: false
				                        			 }
				                        			 },function(chart) {
				                        				 var series = chart.series;
				                        				 $.each(series, function(i,ser) {
				                        					 if(ser.name=="Refresh Volume"){
				                        						 if($(ser.legendSymbol)){
				                        							 $(ser.legendSymbol.element).attr('stroke-width','1');
				                        							 $(ser.legendSymbol.element).attr('stroke','#74afca');
				                        						 }
				                        					 }
				                        				 });
				                        			 });
				                        		 }catch(e){
				                        			 $scope.siteHistoryRefreshStats = null;
				                        			 $scope.siteHRSErrorMsg=$scope.staticLabels.HRSJSErrorMsg;
				                        			 var exception = {
				                        					 exceptionStackTrace:e.stack.toString()
				                        			 };
				                        			 var data = angular.copy(exception);
				                        			 appService
				                        			 .loggerService(
				                        					 data,
				                        					 function(data, status, headers,
				                        							 config) {
				                        					 })
				                        		 }

				                        	 };


				                         }
				                         ]);
