/*
    var cobrandIdentifier = '10000004';
describe('The dashboard controller tests hhhhhh', function() {
	
    var $scope, factory,applicationServiceMock, $q_var,httpBackend,dashboardController,obj
    beforeEach(module('YodleeCustomerCare'));
    beforeEach(module('Controllers'));
    beforeEach(module('Services'));
     
   //include previous module containing mocked service which will override actual service, because it's declared later
     beforeEach(module('Path')); 
     beforeEach(inject(function($controller, $rootScope,$http,$q,ApplicationService,$httpBackend,$injector) {
      
       
       $scope = $rootScope.$new();
       $q_var=$q;
        applicationServiceMock= ApplicationService;
        httpBackend = $injector.get('$httpBackend');
       dashboardController= $controller('DashboardController', {
         '$scope': $scope
       
       });
     }));

    it('should initilize dahboard....',function()
     {
      $scope.staticLabels={};
      $scope.staticLabels.historicLabel="hh";
      
         
         function highlight(node)
         {
             console.log("called fake implementation");
         };
           httpBackend.expect('GET','resources/appLabels.properties').respond(200,
           {
            "dashboard_Label":"Dashboard",
             "cobrand_Label":"Cobrand",
             "download_Label":"Download",
              "print_Label":"Print",
              "more_Label":"More",
             "system_up_time":"System Up Time"
           }
        );
       // highlight("abbb");
       

         httpBackend.expect('POST', 'ycc/base/userType').respond(200,
        {
                        "cobrandInfo" : {
                            "cobrandId": 10000004,
                            "cobrandStatusId": 1,
                            "name": "Yodlee",
                            "created": 0,
                            "lastUpdated": 0,
                            "isCacherunDisabled": false,
                            "isChannel": false,
                            "isYodlee": false,
                            "iavEnabled": true,
                            "slmrEnabled": true,
                            "balanceRefreshEnabled": false,
                            "iavCacheRefreshEnabled": false
                        }
                    }

                );
               
       
                console.log(dashboardController);
                console.log("sss"+$scope);
              
                 $scope.initDashboard();

                  spyOn($scope,
                'refreshStats').and.callFake(
                  function()
                  {
                    console.log("called fake refresh stats");
                  }
                );
              
                httpBackend.flush();
               
               
                //console.log("here... initDashboard");
                //$scope.$digest();
                expect(	$scope.refreshStats).toHaveBeenCalled();
           

           
     });
    
      
   });
   */