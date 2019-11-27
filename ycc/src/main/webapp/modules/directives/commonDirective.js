angular.module('Directives').directive('isyodlee',
		[ 'CommonService', function(CommonService) {
			var directive = {};
			directive.restrict = 'A';

			directive.link = function($scope, element, attrs) {
				CommonService.isYodlee(element);
			}
			return directive;
		} ]);

angular.module('Directives').directive('iscobrand',
		[ 'CommonService', function(CommonService) {
			var directive = {};
			directive.restrict = 'A';

			directive.link = function($scope, element, attrs) {
				CommonService.isCobrand(element);
			}
			return directive;
		} ]);
angular.module('Directives').directive('isprimary',
		[ 'CommonService', function(CommonService) {
			var directive = {};
			directive.restrict = 'A';

			directive.link = function($scope, element, attrs) {
				CommonService.isPrimary(element);
			}
			return directive;
		} ]);
angular.module('Directives').directive('isnotprimary',
		[ 'CommonService', function(CommonService) {
			var directive = {};
			directive.restrict = 'A';

			directive.link = function($scope, element, attrs) {
				CommonService.isnotPrimary(element);
			}
			return directive;
		} ]);
