angular
		.module('Directives')
		.directive(
				'tooltip',
				[
						'$document',
						'$compile',
						function($document, $compile) {
							return {
								restrict : 'A',
								scope : true,
								transclude : false,
								link : function(scope, element, attrs) {

									var tip = $compile(
											'<div ng-class="tipClass" class="tooltip-body"><div>{{ text }}</div></div>')
											(scope), tipClassName = 'tooltip1', tipActiveClassName = 'tooltip-show';

									scope.tipClass = [ tipClassName ];
									scope.text = attrs.tooltip;
									scope.tipClass.push('tooltip-down');
									$document.find('body').append(tip);

									element
											.bind(
													'mouseover',
													function(e) {
														tip
																.addClass(tipActiveClassName);
														var pos = e.target
																.getBoundingClientRect(), offset = tip
																.offset(), tipHeight = tip
																.outerHeight(), tipWidth = tip
																.outerWidth(), elWidth = pos.width
																|| pos.right
																- pos.left, elHeight = pos.height
																|| pos.bottom
																- pos.top, tipOffset = 10;

														offset.top = pos.top
																+ elHeight
																+ tipOffset
																+ document.body.scrollTop
																+ document.documentElement.scrollTop;
														offset.left = pos.left
																+ document.body.scrollLeft
																+ document.documentElement.scrollLeft;

														tip.offset(offset);
													});

									element.bind('mouseout', function() {
										tip.removeClass(tipActiveClassName);
									});

									tip.bind('mouseover', function() {
										tip.addClass(tipActiveClassName);
									});

									tip.bind('mouseout', function() {
										tip.removeClass(tipActiveClassName);
									});

								}
							}
						} ]);
