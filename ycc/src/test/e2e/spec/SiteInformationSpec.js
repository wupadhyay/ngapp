var waitUntilReady = function (elm) {
        browser.wait(function () {
            return elm.isPresent();
        },10000);
        browser.wait(function () {
            return elm.isDisplayed();
        },10000);
    };
describe('SiteInformation Page', function() {
	browser.waitForAngular(); 

	it('should render SiteInformation page', function() {
        element(by.id('siteMetadata')).click();
		var currentUrl = browser.getCurrentUrl();
		expect(currentUrl).toMatch('/cd/siteMetadata');
	});
		
	it('should select Cobrand dropdown ', function() {  
		//element(by.id('sm-cobrand-dropdown'));
        element(by.id('sm-cobrand-dropdown')).click();
	    
	    var el_cobrand_dropdown_SI_input = element(by.css(".mySelect input"));
	    el_cobrand_dropdown_SI_input.sendKeys("restserver_BAC").then(function() {
	        expect(el_cobrand_dropdown_SI_input.getAttribute('value')).toBe('restserver_BAC');
			var el_cobrand_dropdown_result = browser.driver.findElement(by.xpath('//*[@id="select_option_200"]'));
	        el_cobrand_dropdown_result.click();
	    });
	  });
	
	it('should enter site/provider id ', function() {
		var el_site_id_input = element(by.className("siteMetadata-search-input"));
		el_site_id_input.click();
		el_site_id_input.sendKeys("5").then(function() {	        
            element(by.className('search-button')).click();
	    });
	
	});
	
	it('should show search result ', function() {
		var el_site_id_input = element(by.className("siteMetadata-search-input"));
			
	});
	
	
	it('should enter site/provider id ', function() {
		 browser.driver.navigate().refresh();
		 waitUntilReady(element(by.className("siteMetadata-search-input")));
		var el_site_id_input = element(by.className("siteMetadata-search-input"));
		el_site_id_input.click();
		el_site_id_input.sendKeys("5").then(function() {	        
            element(by.className('search-button')).click();
	    });
	
	});
	
	it('should show search result ', function() {
		var el_site_id_input = element(by.className("siteMetadata-search-input"));
			
	});
	
	
	it('should click view detail link ', function() {
		var el_view_detail_link = element(by.css(".siteDetailLink"));
		el_view_detail_link.click();	
	});
	
});