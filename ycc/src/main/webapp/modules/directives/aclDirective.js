
angular.module('Directives').directive('acl',
		[ 'AclService', function(AclService) {
			var directive = {};

			directive.restrict = 'A';

			directive.link = function($scope, element, attr) {
				if (!AclService.isAclEnabled(attr.acl)) {
					element.css("display", "none");
				}
			}
			return directive;
		} ]);