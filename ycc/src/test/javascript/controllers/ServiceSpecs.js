 var cobrandIdentifier='10000004';
describe(" api service test", function () {
  var userInfo, httpBackend;

  beforeEach(module("YodleeCustomerCare"));
  beforeEach(module("Services"));

  beforeEach(inject(function (_userInfo_, $httpBackend) {
    userInfo = _userInfo_;
    httpBackend = $httpBackend;
  }));
  
  it('should send the msg and return the response.', function (){
  
    
	  var returnData=[{"cobrandId":"10000004"}];
      var response={};
	  var result;
	  var data = {"cobrandId":"10000004"};
	  httpBackend.expectPOST('ycc/base/userInfo', data).respond(returnData);
	  console.log("my data"+JSON.stringify(returnData));
	  var returnedPromise=  userInfo.getUserInfo();
		
		returnedPromise.then(function(response) {
        result = response;
		console.log("result is:"+JSON.stringify(result));
    });
      
        httpBackend.flush();
      
	  
	  
	 
	  expect(returnData.cobrandId).toBe(result.data.cobrandId);
  });

  
});