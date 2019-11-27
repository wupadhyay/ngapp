
 describe('The application controller111', function() {
	var cobrandIdentifier='10000004';	
    var $scope, factory, userTypes, queryCallback,$q_var,httpBackend;
    var applicationServiceMock;
    beforeEach(module('YodleeCustomerCare'));
    beforeEach(module('Controllers'));
    beforeEach(module('Services'));
     
   //include previous module containing mocked service which will override actual service, because it's declared later
     beforeEach(module('Path')); 
     
       //console.log("service is"+applicationService);
     beforeEach(inject(function($controller, $rootScope,$http,$q,_userTypes_, $injector, ApplicationService,$httpBackend) {
      
    
       $scope = $rootScope.$new();
       $q_var=$q;
       httpBackend = $injector.get('$httpBackend');
       applicationServiceMock= ApplicationService;
       console.log("Application Service"+ApplicationService);
       
       $controller('ApplicationController', {
         '$scope': $scope,
         '$q': $q
        
        
       });
     
     }));
   
     it('should get user type correctly', function() {
           httpBackend.expect('POST', 'ycc/base/userType').respond(200,
           {  
                "cobrandInfo":{  
                      "cobrandId":10000004,
                       "cobrandStatusId":1,
                        "name":"Yodlee",
                        "created":0,
                        "lastUpdated":0,
                        "isCacherunDisabled":false,
                        "isChannel":false,
                         "isYodlee":false,
                        "iavEnabled":true,
                        "slmrEnabled":true,
                         "balanceRefreshEnabled":false,
                      "iavCacheRefreshEnabled":false
   }
}

           );

         
             $scope.cobrandId="10000004";
             $scope.getUserType("",function(){
                 console.log("called back....againnnnnnn");
                     
           });
           $scope.$digest();
           httpBackend.flush();
           expect($scope.isSlmrCob).toBe(true);
           console.log("here... slmr"+$scope.isSlmrCob);	
           
				 }); 
});
