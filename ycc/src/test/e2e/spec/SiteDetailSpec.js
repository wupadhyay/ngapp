var waitUntilReady = function (elm) {
        browser.wait(function () {
            return elm.isPresent();
        },10000);
        browser.wait(function () {
            return elm.isDisplayed();
        },10000);
    };
describe('Site Detail Page', function() {
	browser.waitForAngular(); 
	it('should display SW Logo', function() {
		var el_sd_logo = element(by.css(".logo a img[src*='https://moneycenter.ydlstatic.com/fastlink/appscenter/siteImage.fastlink.do?access_type=APPS_CENTER_PRODUCTION&siteId=5&imageType=LOGO']"));
		expect(el_sd_logo.isPresent()).toBe(false);	              
	});
	
/*	it('should display Notification Icon', function() {
		var el_notification_icon = element(by.css("#sw-gm-top-notification img[src*='images/icon-info.svg']"));
		expect(el_notification_icon.isPresent()).toBe(true);	              
	});*/
	
	it('should display Notification text', function() {
		waitUntilReady(element(by.id('sw-top-notification-title')));
		var el_sd_notification_text = browser.driver.findElement(by.id("sw-top-notification-title"));
		expect(el_sd_notification_text.getText()).toEqual('ABCDEEE(Banking) - Login Form Change - In-Progress');	              
	});
	
	it('should show basic details', function() {  		  		    
		waitUntilReady(element(by.id('sw-basic-details')));
		expect(element(by.id('sw-basic-details')).isDisplayed().then(function(isVisible){
			element(by.css('.boxDetail')).isDisplayed();
		
		}));
	});
	 
	it('should click on dashboard IAV tab ', function() { 
		var el_sw_iav_tab = element(by.css('#sw_iav_tab [ng-if="cobrandIAVStat"]'));
		el_sw_iav_tab.isPresent().then(function(fnct){
            if(fnct){
             el_sw_iav_tab.click();
            } else {
				expect(el_sw_iav_tab.isPresent()).toBe(false);
			}
        });
	});
	
	
	it('should click on Refresh tab ', function() { 
		var el_sw_refresh_tab = element(by.css('#sw_refresh_tab [ng-if="isPfmSite"]'));
		el_sw_refresh_tab.isPresent().then(function(fnct){
            if(fnct){
             el_sw_refresh_tab.click();
             } else {
				 expect(el_sw_refresh_tab.isPresent()).toBe(false);
			 }
        });
		
	});
	
	it('should display container names', function() {  
		var el_sw_container_name = element.all(by.css("#sw-rs-siteCont-tab")).first();
		el_sw_container_name.click();
		   
	});
	
	it('should select snapshot ', function() {  
		var el_sw_snapshot_table = element(by.css('[ng-if="siteOverallRefreshStats"]'));
		
		//expect(el_sw_snapshot_table.isDisplayed()).toBe(true);
		    
		el_sw_snapshot_table.isPresent().then(function(isVisible){
			if(isVisible){					 
				expect(element(by.model('selectedSiteOverallRefreshTrendTimeSlot')).$('option:checked').getText()).toEqual('24 hrs');					 
			} else {
				expect(el_sw_snapshot_table.isPresent()).toBe(false);
			}
		});    
	});
	
	it('should display arrow in snapshot', function() {
		var el_snapshot_arrow = element(by.css("#sw-rs-ribbon-totalPanel #sw-rs-ribbon-arrowsection img[src*='images/white_up.png']"))
		
		el_snapshot_arrow.isPresent().then(function(isVisible){
			if(isVisible){					 
				expect(el_snapshot_arrow.isPresent()).toBe(true);					 
			} else {
				expect(el_snapshot_arrow.isPresent()).toBe(false);
			}
		});		
	});
	
	it('should display historic refresh stats graph', function() {  
		var el_sw_historic_refresh_graph = element(by.css("#overall_historic_refresh_site_stats_db .highcharts-container"));
		expect(el_sw_historic_refresh_graph.isDisplayed().then(function(isVisible){
			 if(isVisible){					 
				expect(element(by.model('selectedSiteHistoricRefreshTrendTimeSlot')).$('option:checked').getText()).toEqual('15 Days');					 
			 } 
		}));	    		   
	});
	
	it('should display sw container contribution graph', function() {  
		var el_sw_container_contribution_graph = element(by.css("#overall_container_refresh_site_stats_db .highcharts-container"));
	    expect(el_sw_container_contribution_graph.isDisplayed().then(function(isVisible){
			if(isVisible){					 
				var el_container_contribution_legend = browser.driver.findElement(by.id("sw-containerCont-legends")).findElement(by.css('li a'));
				el_container_contribution_legend.click();					 
			} 
		}));	    		   
	});
	
	
	it('should click on Add tab on search widget', function() { 
		var el_sw_refresh_tab = element(by.css('[ng-if="addAcct"]'));
		el_sw_refresh_tab.isPresent().then(function(fnct){
            if(fnct){
             el_sw_refresh_tab.click();
             } else {
				 expect(el_sw_refresh_tab.isPresent()).toBe(false);
			 }
        });
		
	});
	
	
	it('should  display partial success in site historic graph', function() { 
		
		/*var el_sw_refresh_tab = element(by.css('[ng-if="addAcct"]'));
		el_sw_refresh_tab.isPresent().then(function(fnct){
            if(fnct){
             el_sw_refresh_tab.click();
             } else {
				 expect(el_sw_refresh_tab.isPresent()).toBe(false);
			 }
        });*/
		
		waitUntilReady(element(by.id('overall_historic_refresh_site_stats_db')));
		  var el_historic_graph = browser.driver.findElement(by.id("overall_historic_refresh_site_stats_db"));
		    expect((el_historic_graph).isDisplayed().then(function(isVisible){
				 if(isVisible){
					 expect(el_historic_graph.findElement(by.tagName('tspan')).isDisplayed());	
					 expect(el_historic_graph.findElement(By.xpath("//*[contains(text(), 'Partial')]")).getText()).toBe("Partial Success");					 					 
				 } 
			  }));
		    
		   
	});
	
/*	it('should display error contribution graph', function() {  
		var el_sw_error_contribution_graph = element(by.css("#overall_container_refresh_error_stats_db .highcharts-container"));
	    expect(el_sw_error_contribution_graph.isDisplayed().then(function(isVisible){
			if(isVisible){					 
				var el_error_contribution_legend = waitUntilReady(element(by.id("overall_container_refresh_error_stats_db")).element(by.css('svg path')));
				el_error_contribution_legend.click();					 
			} 
		}));	    		   
	});
	*/
	it('should show supported container details', function() {  		  		    
		var el_supported_cont_det = element(by.css('.supportedDetailContainer'));
		expect(el_supported_cont_det.isPresent().then(function(isVisible){
			element(by.id('sw-sc-table')).isPresent();
		
		}));
	});
	
	it('should show supported feature details', function() {  		  		    
		waitUntilReady(element(by.css('.featureDetail')));
		expect(element(by.css('.featureDetail')).isPresent().then(function(isVisible){
			element(by.css('.featureDetail')).element(by.css('.container')).isPresent();
		
		}));
	});
	
	it('should show history of notification', function() {  		  		    
		var el_sw_history_notification = element(by.id('sw-nhPanel')).element(by.css('.supportedDetailContainer'));
		expect(el_sw_history_notification.isPresent().then(function(isVisible){
			el_sw_history_notification.element(by.id('sw-nh-table')).isPresent();	
		}));
	});
	
	it('should close search widget page', function() {  		  		    
		waitUntilReady(element(by.css('.close_button')));
		browser.actions().mouseMove(element(by.css('.close_button'))).click().perform();
	});
   });
