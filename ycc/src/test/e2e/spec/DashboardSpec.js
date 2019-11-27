//describe('Login Page', function() {
//	httpBackend = require('http-backend-proxy');
	//fooPage = new page();
	//mockData = require('file.json');
//});

	var selectDropdownbyNum = function ( element, optionNum ) {
		if (optionNum){
			var options = element.findElements(by.tagName('option'))   
			.then(function(options){
				options[optionNum].click();
			});
		}
	}
	var waitUntilReady = function (elm) {
		browser.wait(function () {
			return elm.isPresent();
		},10000);
		browser.wait(function () {
			return elm.isDisplayed();
		},10000);
	};

describe('Dashboard Page', function() {
	var URL_local = 'http://localhost:8080/ngycc/';
	var URL_qa = 'https://192.168.112.164:9543/ycc/spa.yodlee.do?';
	var URL_prod ='https://customercare.yodlee.com/ycc/login.yodlee.do?' ;
	var URL = URL_local;
	browser.driver.get(URL_local);
	it('should render landing page', function() {
		var currentUrl = browser.getCurrentUrl();
		expect(currentUrl).toMatch('/cd/dashboard');
	});
	
	browser.driver.manage().window().maximize();
	if(URL == URL_prod){
	  it('should sign in', function() {  
	    var el_Email = browser.driver.findElement(by.xpath(".//*[@id='loginName']"));
	    var el_Pass = browser.driver.findElement(by.xpath(".//*[@id='password']"));
	    var el_Button = browser.driver.findElement(by.xpath("html/body/div[2]/form/div/span/input"));
	  	
	   el_Email.sendKeys('sjain5@yodlee');
	   el_Pass.sendKeys('Sandy@1086');
	    
	    //el_Email.sendKeys('devycc@yodlee');
	   // el_Pass.sendKeys('dev@1234');
	    
	    el_Button.click();
	  });
	

	  it('should close Message Popup', function() {  
	    var el_modal_floater = browser.driver.findElement(by.xpath("//*[@id='modal_floater']/a"));   
	
	    el_modal_floater.click();
	  });
	  
	  it('should open service insight page', function() {  
	    var el_service_insight = browser.driver.findElement(by.xpath("//*[@id='maintabs']/li[4]/a")); 
	
	    el_service_insight.click();
	  });
	}
	
	////////
	
	it('should click on dashboard Add tab ', function() { 
		var el_refresh_tab = element(by.css('[ng-if="isSlmrCob"]'));
		el_refresh_tab.isPresent().then(function(fnct){
            if(fnct){
             el_refresh_tab.click();
             } else {
				 expect(el_refresh_tab.isPresent()).toBe(false);
			 }
        });
		
	});
	
	it('should display partial success in snapshot', function() {
		
		var el_snapshot_arrow = element(by.css("#ribbon-pSuccesslabel"));
		  expect(el_snapshot_arrow.isPresent()).toBe(true);
			
	              
	  });
	
	
	it('should display partial success in top volume graph', function() { 
		
		   var el_top_volume_graph = browser.driver.findElement(by.id("top_volumes_refresh_stats_db"));
		    expect((el_top_volume_graph).isDisplayed().then(function(isVisible){
				 if(isVisible){
					 expect(el_top_volume_graph.findElement(by.tagName('tspan')).isDisplayed());	
					 expect(el_top_volume_graph.findElement(By.xpath("//*[contains(text(), 'Partial Success')]")).getText()).toBe("Partial Success");	
				 } 
			  }));
		    
		   
	});
	
	it('should display partial success in top failure graph', function() { 
		
		   var el_top_failure_graph = browser.driver.findElement(by.id("top_failures_refresh_stats_db"));
		    expect((el_top_failure_graph).isDisplayed().then(function(isVisible){
				 if(isVisible){
					 expect(el_top_failure_graph.findElement(by.tagName('tspan')).isDisplayed());	
					 expect(el_top_failure_graph.findElement(By.xpath("//*[contains(text(), 'Partial Success')]")).getText()).toBe("Partial Success");					 					 
				 } 
			  }));
		    
		   
	});
	
	
	it('should display top failure performance graph', function() { 
		
		   var el_top_failure_latency_graph = browser.driver.findElement(by.id("top_failures_latency_stats_db"));
		    expect((el_top_failure_latency_graph).isDisplayed().then(function(isVisible){
				 if(isVisible){
					 expect(el_top_failure_latency_graph.findElement(by.tagName('tspan')).isDisplayed());	
					 expect(el_top_failure_latency_graph.findElement(By.xpath("//*[contains(text(), 'Partial Success')]")).getText()).toBe("Partial Success");					 					 
				 } 
			  }));
		    
		   
	});
	
	it('should display top volume performance graph', function() { 
		
		   var el_top_volume_latency_graph = browser.driver.findElement(by.id("top_volumes_latency_stats_db"));
		    expect((el_top_volume_latency_graph).isDisplayed().then(function(isVisible){
				 if(isVisible){
					 expect(el_top_volume_latency_graph.findElement(by.tagName('tspan')).isDisplayed());	
					 expect(el_top_volume_latency_graph.findElement(By.xpath("//*[contains(text(), 'Partial Success')]")).getText()).toBe("Partial Success");					 					 
				 } 
			  }));
		    
		   
	});
	
	it('should display Network checkbox in top volume graph', function() { 
		
		   var el_top_volume_graph = browser.driver.findElement(by.id("top_volumes_refresh_stats_db"));
		    expect((el_top_volume_graph).isDisplayed().then(function(isVisible){
				 if(isVisible){
					 expect(el_top_volume_graph.findElement(By.xpath("//input[@type='checkbox']")).isDisplayed());					 					 
				 } 
			  }));
		    
		   
	});
	
	it('network checkbox should be checked in top volume graph', function() { 
		
		   var el_top_volume_graph = browser.driver.findElement(by.id("top_volumes_refresh_stats_db"));
		    expect((el_top_volume_graph).isDisplayed().then(function(isVisible){
				 if(isVisible){
					 expect(el_top_volume_graph.findElement(By.xpath("//input[@type='checkbox']")).isSelected());					 					 
				 } 
			  }));
		    
		   
	});
	
	
	it('should not display network bar in top volume graph', function() { 
		
		 var el_top_volume_graph = browser.driver.findElement(by.id("top_volumes_refresh_stats_db"));
		    expect((el_top_volume_graph).isDisplayed().then(function(isVisible){
				 if(isVisible){
					 if(el_top_volume_graph.findElement(By.xpath("//input[@type='checkbox']")).isSelected()){
						 el_top_volume_graph.findElement(By.xpath("//input[@type='checkbox']")).click();
					 }
				 } 
			  }));
		    expect(el_top_volume_graph.findElement(By.xpath("//input[@type='checkbox']")).isSelected()).toBe(false);
		   
	});
	
	
	it('should  display partial success in historic graph', function() { 
		
		  var el_historic_graph = browser.driver.findElement(by.id("overall_historic_refresh_stats_db"));
		    expect((el_historic_graph).isDisplayed().then(function(isVisible){
				 if(isVisible){
					 expect(el_historic_graph.findElement(by.tagName('tspan')).isDisplayed());	
					 expect(el_historic_graph.findElement(By.xpath("//*[contains(text(), 'Partial Success')]")).getText()).toBe("Partial Success");					 					 
				 } 
			  }));
		    
		   
	});
	
	/////
	
	
	it('should select  dashboard Cobrand dropdown', function() {  
	    var el_cobrand_dropdown = browser.driver.findElement(by.id("dashboard-cobrand-dropdown")); 
	
	    el_cobrand_dropdown.click();
	    
	    var el_cobrand_dropdown_input = browser.driver.findElement(by.id("input_2"));
	    el_cobrand_dropdown_input.sendKeys("restserver_BAC").then(function() {
	        expect(el_cobrand_dropdown_input.getAttribute('value')).toBe('restserver_BAC');
	        var el_cobrand_dropdown_result = browser.driver.findElement(by.xpath('//*[@id="select_option_10"]'));
	        el_cobrand_dropdown_result.click();
	    });
	  });
	
	it('should click on dashboard Refresh tab ', function() { 
		var el_refresh_tab = element(by.css('[ng-if="isPfm"]'));
		el_refresh_tab.isPresent().then(function(fnct){
            if(fnct){
             el_refresh_tab.click();
             } else {
				 expect(el_refresh_tab.isPresent()).toBe(false);
			 }
        });
		
	}); 
	it('should click on dashboard IAV tab ', function() { 
		var el_iav_tab = element(by.css('[ng-if="cobrandIAVStat"]'));
		el_iav_tab.isPresent().then(function(fnct){
            if(fnct){
             el_iav_tab.click();
            } else {
				expect(el_iav_tab.isPresent()).toBe(false);
			}
        });
	});
	
	it('should select snapshot ', function() {  
		var el_snapshot_table = browser.driver.findElement(by.css(".ribbon-contents"));
		    expect((el_snapshot_table).isDisplayed().then(function(isVisible){
				 if(isVisible){					 
					expect(element(by.model('selectedOverallRefreshSnapShotTimeSlot')).$('option:checked').getText()).toEqual('24 hrs');					 
				 } 
			  }));
		    
		   
	});  
	
	it('should display arrow in snapshot', function() {
	
		var el_snapshot_arrow = element(by.css("#ribbon-totalPanel #ribbon-arrowsection img[src*='images/white_up.png']"));
		  expect(el_snapshot_arrow.isPresent()).toBe(false);
			
	              
	  });
	  
	it('should display top volume graph', function() { 
			
		   var el_top_volume_graph = browser.driver.findElement(by.id("top_volumes_refresh_stats_db"));
		    expect((el_top_volume_graph).isDisplayed().then(function(isVisible){
				 if(isVisible){
					 expect(el_top_volume_graph.findElement(by.tagName('svg')).isDisplayed());					 					 
				 } 
			  }));
		    
		   
	});
	
	/*it('should click top volume graph axis', function() { 
	
		var el_top_volume_graph_axis = element.all(by.css("#top_volumes_refresh_stats_db .highcharts-xaxis-labels > span")).get(7);
		el_top_volume_graph_axis.click();
		var el_sw_page = element(by.tagName('pageslide'));
		el_sw_page.isDisplayed().then(function(isVisible){
			if(isVisible){
				el_error_msg = element(by.id('sw-errorPanel')).getText();
				el_error_msg.toEqual("No data found for this specific report").then(function(result){
					if(result){
						it('should close search widget page', function() {  		  		    
							waitUntilReady(element(by.css('.close_button')));
							browser.actions().mouseMove(element(by.css('.close_button'))).click().perform();
						});
					}
				});
			}
		});
	});*/
	
	it('should show top volume graph tooltip', function() { 
		var el_top_volume_graph = browser.driver.findElement(by.id("top_volumes_refresh_stats_db")).findElement(by.css(".highcharts-container"));
		    expect((el_top_volume_graph).isDisplayed().then(function(isVisible){
				if(isVisible){
					browser.actions().mouseMove($('.highcharts-tooltip')).perform();
				} 
		}));
	});
	it('should display high failure graph', function() {  
		   var el_top_failure_graph = browser.driver.findElement(by.id("top_failures_refresh_stats_db"));
		    expect((el_top_failure_graph).isDisplayed().then(function(isVisible){
				 if(isVisible){
					 expect(el_top_failure_graph.findElement(by.tagName('svg')).isDisplayed());
					 //.then(function(isVisible){
						// waitUntilReady(element(by.id("top-failure-axis"))).click();
					 //}));
					 
				 } 
			  }));
		    
		   
	});
	
	/*it('should click top failure graph axis', function() { 
	
		var el_top_failure_graph_axis = element.all(by.css("#top_failures_refresh_stats_db .highcharts-xaxis-labels > span")).first();
		el_top_failure_graph_axis.click();
	});*/
	
	it('should show top failure graph tooltip', function() { 
		var el_top_failure_graph = browser.driver.findElement(by.id("top_failures_refresh_stats_db")).findElement(by.css(".highcharts-container"));
		    expect((el_top_failure_graph).isDisplayed().then(function(isVisible){
				if(isVisible){
					browser.actions().mouseMove($('.highcharts-tooltip')).perform();
				} 
		}));
	});
	it('should display refresh trend graph', function() {  
		   var el_historic_refresh_graph = browser.driver.findElement(by.id("overall_historic_refresh_stats_db")).findElement(by.css(".highcharts-container"));
		    expect((el_historic_refresh_graph).isDisplayed().then(function(isVisible){
				 if(isVisible){					 
					expect(element(by.model('selectedHistoricRefreshTrendTimeSlot')).$('option:checked').getText()).toEqual('15 Days');					 
				 } 
			  }));
		    
		   
	});
	
	it('should display historic latency graph', function() {  
		   var el_historic_latency_graph = browser.driver.findElement(by.id("overall_historic_latency_stats_db")).findElement(by.css(".highcharts-container"));
		    expect((el_historic_latency_graph).isDisplayed().then(function(isVisible){
				 if(isVisible){
					 expect(element(by.model('selectedHistoricLatencyTrendTimeSlot')).$('option:checked').getText()).toEqual('15 Days');
					
					 
				 } 
			  }));
		    
		   
	});
	  
	it('should display historic latency break up graph', function() {  
		   var el_historic_latency_brkup_graph = browser.driver.findElement(by.id("overall_historic_latency_breakdown_refresh_stats_db")).findElement(by.css(".highcharts-container"));
		    expect((el_historic_latency_brkup_graph).isDisplayed().then(function(isVisible){
				 if(isVisible){
					 expect(element(by.model('selectedHistoricLatencyBreakDownTimeSlot')).$('option:checked').getText()).toEqual('24 Hours');
					 
				 } 
			  }));
		    
		   
	});
	
	
	
	it('should display dashboard PFM tab', function() { 
	var el_feature_tab = element(by.css('[ng-if="isPfm"]'));
		  expect(el_feature_tab.isPresent()).toBe(true);
		
	});
	
	
	it('should select  dashboard Cobrand dropdown for IAV', function() {  
	 browser.driver.navigate().refresh();
	 waitUntilReady(element(by.id("dashboard-cobrand-dropdown")));
	    var el_cobrand_dropdown = browser.driver.findElement(by.id("dashboard-cobrand-dropdown")); 
	   
	
	    el_cobrand_dropdown.click();
	    waitUntilReady(element(by.id("input_2")));
	    
	    var el_cobrand_dropdown_input = browser.driver.findElement(by.id("input_2"));
	    el_cobrand_dropdown_input.clear();
	    el_cobrand_dropdown_input.sendKeys("NanPIA").then(function() {
	        expect(el_cobrand_dropdown_input.getAttribute('value')).toBe('NanPIA');
	        var el_cobrand_dropdown_result = browser.driver.findElement(by.xpath('//*[@id="select_option_18"]'));
	        el_cobrand_dropdown_result.click();
	    });
	  });
	  
	  it('should display dashboard IAV tab', function() { 
	var el_feature_tab = element(by.css('[ng-if="cobrandIAVStat"]'));
		  expect(el_feature_tab.isPresent()).toBe(true);
		
	});
	  
	  it('should select  dashboard Cobrand dropdown for PFM + IAV', function() { 
	   browser.driver.navigate().refresh();
	   waitUntilReady(element(by.id("dashboard-cobrand-dropdown")));
	 
	    var el_cobrand_dropdown = browser.driver.findElement(by.id("dashboard-cobrand-dropdown")); 
	
	    el_cobrand_dropdown.click();
	   
	    waitUntilReady(element(by.id("input_2")));
		 
	    var el_cobrand_dropdown_input = browser.driver.findElement(by.id("input_2"));
	     el_cobrand_dropdown_input.clear();
	    el_cobrand_dropdown_input.sendKeys("38610006836").then(function() {
	        expect(el_cobrand_dropdown_input.getAttribute('value')).toBe('38610006836');
	        var el_cobrand_dropdown_result = browser.driver.findElement(by.xpath('//*[@id="select_option_21"]'));
	        el_cobrand_dropdown_result.click();
	    });
	  });
	  
	  it('should display dashboard PFM + IAV tab', function() { 
		 // waitUntilReady(element(by.css('[ng-if="cobrandIAVStat"]')));
	var el_feature_tab = element(by.css('[ng-if="isPfm"]'));
		  expect(el_feature_tab.isPresent()).toBe(true);
		el_feature_tab = element(by.css('[ng-if="cobrandIAVStat"]'));
		 expect(el_feature_tab.isPresent()).toBe(true);
	});
	  
	  it('should select  dashboard Cobrand dropdown for PFM + Add', function() {  
	   browser.driver.navigate().refresh();
	 waitUntilReady(element(by.id("dashboard-cobrand-dropdown")));
	
	    var el_cobrand_dropdown = browser.driver.findElement(by.id("dashboard-cobrand-dropdown")); 
	
	    el_cobrand_dropdown.click();
	    
	    var el_cobrand_dropdown_input = browser.driver.findElement(by.id("input_2"));
	     el_cobrand_dropdown_input.clear();
	    el_cobrand_dropdown_input.sendKeys("3510006836").then(function() {
	        expect(el_cobrand_dropdown_input.getAttribute('value')).toBe('3510006836');
	        var el_cobrand_dropdown_result = browser.driver.findElement(by.xpath('//*[@id="select_option_19"]'));
	        el_cobrand_dropdown_result.click();
	    });
	  });
	  
	  it('should display dashboard PFM tab for PFM + Add', function() { 
	var el_feature_tab = element(by.css('[ng-if="isPfm"]'));
		  expect(el_feature_tab.isPresent()).toBe(true);
		  el_feature_tab = element(by.css('[ng-if="isSlmrCob"]'));
		  expect(el_feature_tab.isPresent()).toBe(true);
		
	});
	  
	  it('should select  dashboard Cobrand dropdown for PFM + IAV + Add', function() { 
	   browser.driver.navigate().refresh();
	 waitUntilReady(element(by.id("dashboard-cobrand-dropdown")));
	  });
	
	
	 it('should display dashboard PFM tab for PFM + IAV + Add', function() { 
	var el_feature_tab = element(by.css('[ng-if="isPfm"]'));
		  expect(el_feature_tab.isPresent()).toBe(true);
		  el_feature_tab = element(by.css('[ng-if="isSlmrCob"]'));
		  expect(el_feature_tab.isPresent()).toBe(true);
		   el_feature_tab = element(by.css('[ng-if="cobrandIAVStat"]'));
		  expect(el_feature_tab.isPresent()).toBe(true);
		
	});
	  
	  it('should select  dashboard Cobrand dropdown for IAV + Add', function() { 
	   browser.driver.navigate().refresh();
	 waitUntilReady(element(by.id("dashboard-cobrand-dropdown")));
	 
	    var el_cobrand_dropdown = browser.driver.findElement(by.id("dashboard-cobrand-dropdown")); 
	
	    el_cobrand_dropdown.click();
	    
	    var el_cobrand_dropdown_input = browser.driver.findElement(by.id("input_2"));
	     el_cobrand_dropdown_input.clear();
	    el_cobrand_dropdown_input.sendKeys("19310006836").then(function() {
	        expect(el_cobrand_dropdown_input.getAttribute('value')).toBe('19310006836');
	        var el_cobrand_dropdown_result = browser.driver.findElement(by.xpath('//*[@id="select_option_20"]'));
	        el_cobrand_dropdown_result.click();
	    });
	  });
	  
	   it('should display dashboard PFM tab  for IAV + Add', function() { 
		var el_feature_tab = element(by.css('[ng-if="cobrandIAVStat"]'));
		  expect(el_feature_tab.isPresent()).toBe(true);
		  el_feature_tab = element(by.css('[ng-if="isSlmrCob"]'));
		  expect(el_feature_tab.isPresent()).toBe(true);
		
	});
	  
	  it('should select  dashboard Cobrand dropdown', function() {  
	   browser.driver.navigate().refresh();
	 waitUntilReady(element(by.id("dashboard-cobrand-dropdown")));
	
	    var el_cobrand_dropdown = browser.driver.findElement(by.id("dashboard-cobrand-dropdown")); 
	
	    el_cobrand_dropdown.click();
	    
	    var el_cobrand_dropdown_input = browser.driver.findElement(by.id("input_2"));
	     el_cobrand_dropdown_input.clear();
	    el_cobrand_dropdown_input.sendKeys("restserver_BAC").then(function() {
	        expect(el_cobrand_dropdown_input.getAttribute('value')).toBe('restserver_BAC');
	        var el_cobrand_dropdown_result = browser.driver.findElement(by.xpath('//*[@id="select_option_10"]'));
	        el_cobrand_dropdown_result.click();
	    });
	  });
	  
	it('should select and enter value in search widget box', function() {  
		  
		    
	    var el_search_widget_input = browser.driver.findElement(by.xpath("//*[@id='search']"));
	    el_search_widget_input.click();
	    el_search_widget_input.sendKeys("5").then(function() {
	        expect(el_search_widget_input.getAttribute('value')).toBe('5');
	        waitUntilReady(element(by.id('sw-search-result')));
            element(by.id('sw-search-result')).click();
	    });
	  });
	  
	  afterEach(function() { 
		  browser.manage().logs().get('browser').then(function(browserLog) {
			  console.log('log: ' + require('util').inspect(browserLog));
		  });
	  });
	  
});
	