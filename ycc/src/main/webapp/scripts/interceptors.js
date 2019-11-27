
angular.module('YodleeCustomerCare').factory('sessionInjector', [ function() {
	if(rsession){
	var sessionInjector = {
		request : function(config) {
			config.headers['rsession'] = rsession;
			config.headers['appId'] = appId;
			return config;
		}
	};
	} else if(jwtTokenId){
		var sessionInjector = {
				request : function(config) {
					config.headers['bearer'] = jwtTokenId;
					config.headers['authType'] = 'jwt';
					return config;
				}
			};
		
	}
	return sessionInjector;
} ]);



angular.module('YodleeCustomerCare').config(
		[ '$httpProvider', function($httpProvider) {
			$httpProvider.interceptors.push('sessionInjector');
		} ]);
