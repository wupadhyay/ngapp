"use strict";

angular.module('YodleeCustomerCare', [ "ngAnimate", "ui.bootstrap",
		"ui.router", "Path", "Controllers", "Services", "Constants",
		"Directives", 'ngStorage', 'mb-scrollbar', "ngMaterial", "ngAria",
		"angular.filter", "angularjs-dropdown-multiselect", "ngSanitize",
		"ui.select", "naif.base64", "ui.tinymce", "ngJsonExportExcel",
		"checklist-model", "infinite-scroll","lazy-scroll" ]);

angular.module("YodleeCustomerCare").config(
		[
				'$mdAriaProvider',
				'$compileProvider',
				function($mdAriaProvider, $compileProvider) {
					$mdAriaProvider.disableWarnings();
					$compileProvider
							.aHrefSanitizationWhitelist(/.*(collapse|https?|ftp|mailto|chrome-extension|http?).*/);
				} ]);