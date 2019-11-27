/**
 *
 * Copyright (c) 2016 Yodlee Inc. All Rights Reserved.
 *
 * This software is the confidential and proprietary information of Yodlee, Inc.
 * Use is subject to license terms.
 *
 */

package com.yodlee.ycc.test.web.controllers;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.testng.Assert;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.Test;

import com.yodlee.ycc.app.search.GlobalMessageSearchFilter;
import com.yodlee.ycc.app.service.GlobalMessageService;
import com.yodlee.ycc.app.web.controllers.GlobalMessageController;
import com.yodlee.ycc.test.web.MainServiceTest;

public class GlobalMessageControllerTest extends MainServiceTest{

	private static final String devAppIdHeader = "94AAC319-CF5E-4733-AA42-CA88C79C656D";
	
	@SuppressWarnings("unused")
	private static Logger logger = LoggerFactory.getLogger(GlobalMessageControllerTest.class);

	@Autowired
	private GlobalMessageController globalController;
	
	@Autowired
	private GlobalMessageService globalService;

	private GlobalMessageSearchFilter filter;


	@BeforeClass
	public void setRequestParameters() {
		filter=new GlobalMessageSearchFilter();
		
	}
	
	@Test
	public void searchCobrandActiveGlobalMessageTest(){
		filter.setCobrandId("10001372");
		filter.setStatuses("4,5,6,7");
		filter.setProviderIds("");
		String response = globalController.searchGlobalMessage("3099:fdskj", devAppIdHeader, filter);
		Assert.assertNotNull(response);
		Assert.assertTrue(!response.isEmpty(), "searchCobrandActiveGlobalMessage is empty");
		Assert.assertTrue(!response.contains("errorCode"), "searchCobrandActiveGlobalMessage is throwing some error - "+response);
		Assert.assertTrue(response.contains("SITEIS_PERMANENTLY_DISABLED"), "searchCobrandActiveGlobalMessage JSON is changed - "+response);
		Assert.assertTrue(response.contains("\"Informational\""), "searchCobrandActiveGlobalMessage JSON is changed - "+response);
		Assert.assertTrue(response.contains("\"SITE_NOTIFICATION\""), "searchCobrandActiveGlobalMessage JSON is changed - "+response);
	}
	
	@Test
	public void searchSiteSpecificGlobalMessageTest(){
		filter.setCobrandId("10001372");
		filter.setStatuses("");
		filter.setProviderIds("5");
		String response = globalController.searchGlobalMessage("3099:fdskj", devAppIdHeader, filter);
		Assert.assertNotNull(response);
		Assert.assertTrue(!response.isEmpty(), "searchCobrandActiveGlobalMessage is empty");
		Assert.assertTrue(!response.contains("errorCode"), "searchCobrandActiveGlobalMessage is throwing some error - "+response);
		Assert.assertTrue(response.contains("LOGIN_FORM_CHANGE"), "searchCobrandActiveGlobalMessage JSON is changed - "+response);
		Assert.assertTrue(response.contains("\"id\":5"), "searchCobrandActiveGlobalMessage JSON is changed - "+response);
		Assert.assertTrue(response.contains("\"SITE_NOTIFICATION\""), "searchCobrandActiveGlobalMessage JSON is changed - "+response);
		Assert.assertEquals(response, "{\"notification\":[{\"impactedProvider\":[{\"name\":\"Wells Fargo\",\"containers\":[\"bank\",\"bank\"],\"id\":5}],\"impact\":\"Impact notificed\",\"description\":\" As part of our proactive monitoring, we have observed/Informed that ABCDEEE has changed the login form metadata..We will keep you updated with the Progress. Site Display Name : ABCDEEE Site Id : 5 Impacted Container : Banking Impact : Impact notificed \",\"classification\":\"SITE_NOTIFICATION\",\"title\":\"ABCDEEE(Banking) - Login Form Change - In-Progress\",\"issueType\":[\"LOGIN_FORM_CHANGE\"],\"lastUpdated\":\"2018-02-08T00:00:00Z\",\"impactedCobrand\":[{\"name\":\"Yodlee\",\"id\":10000004},{\"name\":\"Yodlee\",\"id\":10001372},{\"name\":\"All Product Channel\",\"id\":10006836}],\"issueStartDate\":\"2018-02-07T00:00:00Z\",\"id\":10008252,\"category\":\"Informational\",\"expectedResolutionTime\":\"2018-02-11T00:00:00Z\",\"status\":\"In-Progress\"},{\"impactedProvider\":[{\"name\":\"Wells Fargo\",\"containers\":[\"credits\",\"bank\",\"loans\",\"mortgage\",\"bill_payment\",\"bank\"],\"id\":5}],\"impact\":\"Impacy notice\",\"description\":\" As part of our proactive monitoring, we have observed/Informed that ABCDEEE has changed the login form metadata..We will keep you updated with the Progress. Site Display Name : ABCDEEE Site Id : 5 Impacted Container : Loans, Payment Services, Banking, Mortgages, Credit Cards Impact : Impacy notice \",\"classification\":\"SITE_NOTIFICATION\",\"title\":\"ABCDEEE - Login Form Change - In-Progress\",\"issueType\":[\"LOGIN_FORM_CHANGE\"],\"lastUpdated\":\"2018-02-08T00:00:00Z\",\"impactedCobrand\":[{\"name\":\"Yodlee\",\"id\":10000004},{\"name\":\"Yodlee\",\"id\":10001372},{\"name\":\"All Product Channel\",\"id\":10006836}],\"issueStartDate\":\"2018-02-07T00:00:00Z\",\"id\":10008251,\"category\":\"Informational\",\"expectedResolutionTime\":\"2018-02-11T00:00:00Z\",\"status\":\"Resolved\"},{\"impactedProvider\":[{\"name\":\"Wells Fargo\",\"containers\":[\"bank\",\"bill_payment\",\"bank\",\"mortgage\",\"credits\",\"loans\"],\"id\":5}],\"impact\":\"Impact notificed 990\",\"description\":\" As part of our proactive monitoring, we have observed/Informed that ABCDEEE has changed the login form metadata..We will keep you updated with the Progress. Site Display Name : ABCDEEE Site Id : 5 Impacted Container : Loans, Credit Cards, Mortgages, Banking, Payment Services Impact : Impact notificed 990 \",\"classification\":\"SITE_NOTIFICATION\",\"title\":\"ABCDEEE - Login Form Change - In-Progress\",\"issueType\":[\"LOGIN_FORM_CHANGE\"],\"lastUpdated\":\"2018-02-08T00:00:00Z\",\"impactedCobrand\":[{\"name\":\"Yodlee\",\"id\":10000004},{\"name\":\"Yodlee\",\"id\":10001372},{\"name\":\"All Product Channel\",\"id\":10006836}],\"issueStartDate\":\"2018-02-06T00:00:00Z\",\"id\":10008250,\"category\":\"Informational\",\"expectedResolutionTime\":\"2018-02-10T00:00:00Z\",\"status\":\"Resolved\"},{\"impactedProvider\":[{\"name\":\"Wells Fargo\",\"containers\":[\"bank\",\"bank\",\"mortgage\",\"bill_payment\"],\"id\":5}],\"impact\":\"Imapacted checking in mail\",\"description\":\" As part of our proactive monitoring, we have observed/Informed that ABCDEEE has changed the login form metadata..We will keep you updated with the Progress. Site Display Name : ABCDEEE Site Id : 5 Impacted Container : Banking, Banking, Payment Services, Mortgages Impact : Imapacted checking in mail \",\"classification\":\"SITE_NOTIFICATION\",\"title\":\"ABCDEEE - Login Form Change - In-Progress\",\"updates\":[{\"updatedBy\":{\"loginName\":\"rrevathi\",\"id\":1111772302},\"lastupdated\":\"2018-02-06T14:35:49Z\",\"message\":\"safa\"}],\"issueType\":[\"LOGIN_FORM_CHANGE\"],\"lastUpdated\":\"2018-02-06T00:00:00Z\",\"impactedCobrand\":[{\"name\":\"Yodlee\",\"id\":10000004},{\"name\":\"Yodlee\",\"id\":10001372},{\"name\":\"All Product Channel\",\"id\":10006836}],\"issueStartDate\":\"2018-01-15T00:00:00Z\",\"id\":10008150,\"category\":\"Informational\",\"expectedResolutionTime\":\"2018-01-14T00:00:00Z\",\"status\":\"Resolved\"},{\"impactedProvider\":[{\"name\":\"Wells Fargo\",\"containers\":[\"credits\",\"mortgage\",\"loans\"],\"id\":5}],\"impact\":\"Big\",\"description\":\"As part of our proactive monitoring, we have observed/Informed that Wells Fargo are failing because of multiple issues..We will keep you updated with the Progress. Issues : Site Temporarily Unavailable, User Action Required Site Display Name : Wells Fargo Start Time : 06/28/2017 Site Id : 5 Tentative ETA : 06/30/2017 Impacted Container : Banking, Payment Services, Credit Cards, Loans, Mortgages \",\"classification\":\"SITE_NOTIFICATION\",\"title\":\"Wells Fargo - Multiple Issues - In-Progress\",\"updates\":[{\"updatedBy\":{\"last\":\"param\",\"loginName\":\"jagadish\",\"id\":1111611151,\"email\":\"jparameswaran@yodlee.com\",\"first\":\"jagadish\"},\"lastupdated\":\"2017-06-30T18:38:40Z\",\"message\":\"another update\"},{\"updatedBy\":{\"last\":\"param\",\"loginName\":\"jagadish\",\"id\":1111611151,\"email\":\"jparameswaran@yodlee.com\",\"first\":\"jagadish\"},\"lastupdated\":\"2017-06-27T14:53:40Z\",\"message\":\"asdfsf\"},{\"updatedBy\":{\"last\":\"param\",\"loginName\":\"jagadish\",\"id\":1111611151,\"email\":\"jparameswaran@yodlee.com\",\"first\":\"jagadish\"},\"lastupdated\":\"2017-06-27T14:52:27Z\",\"message\":\"test update 1\"}],\"issueType\":[\"SITE_TEMPORARILY_UNAVAILABLE,USER_ACTION_REQUIRED\"],\"lastUpdated\":\"2017-06-30T00:00:00Z\",\"impactedCobrand\":[{\"name\":\"Yodlee\",\"id\":10000004},{\"name\":\"Yodlee\",\"id\":10001372},{\"name\":\"All Product Channel\",\"id\":10006836}],\"issueStartDate\":\"2017-06-28T00:00:00Z\",\"id\":10004650,\"category\":\"Informational\",\"expectedResolutionTime\":\"2017-06-28T00:00:00Z\",\"status\":\"Resolved\"},{\"impactedProvider\":[{\"name\":\"Wells Fargo\",\"containers\":[\"credits\"],\"id\":5}],\"impact\":\"Users cannot login\",\"description\":\" As part of our proactive monitoring, we have observed/Informed that Wells Fargo requires users to take action for enabling us to continue the refreshes. We will keep you updated with the Progress. Site Display Name : Wells Fargo Start Time : 06/18/2017 Site Id : 5 Tentative ETA : 06/26/2017 Impacted Container : Credit Cards \",\"classification\":\"SITE_NOTIFICATION\",\"title\":\"Wells Fargo(Credit Cards) - User Action Required - Resolved\",\"updates\":[{\"updatedBy\":{\"last\":\"param\",\"loginName\":\"jagadish\",\"id\":1111611151,\"email\":\"jparameswaran@yodlee.com\",\"first\":\"jagadish\"},\"lastupdated\":\"2017-06-22T17:58:38Z\",\"message\":\"asd\"}],\"issueType\":[\"USER_ACTION_REQUIRED\"],\"lastUpdated\":\"2017-06-22T00:00:00Z\",\"impactedCobrand\":[{\"name\":\"Yodlee\",\"id\":10000004},{\"name\":\"Yodlee\",\"id\":10001372}],\"issueStartDate\":\"2017-06-19T00:00:00Z\",\"id\":10004600,\"category\":\"Informational\",\"expectedResolutionTime\":\"2017-06-26T00:00:00Z\",\"status\":\"Resolved\"}]}");
	}	
	
	@Test
	public void searchSitesGlobalMessageTest(){
		filter.setCobrandId("10001372");
		filter.setStatuses("4,5,6");
		filter.setProviderIds("4132,3446,3458,1028,16932,10073,12178,7335,15512,12559,3584,7086,17155,492,2852");
		String response = globalController.searchGlobalMessage("3099:fdskj", devAppIdHeader, filter);
		Assert.assertNotNull(response);
		Assert.assertTrue(!response.isEmpty(), "searchCobrandActiveGlobalMessage is empty");
		Assert.assertTrue(!response.contains("errorCode"), "searchCobrandActiveGlobalMessage is throwing some error - "+response);
		Assert.assertTrue(response.contains("SITE_TEMPORARILY_UNAVAILABLE,USER_ACTION_REQUIRED"), "searchCobrandActiveGlobalMessage JSON is changed - "+response);
		Assert.assertTrue(response.contains("\"Informational\""), "searchCobrandActiveGlobalMessage JSON is changed - "+response);
		Assert.assertTrue(response.contains("\"SITE_NOTIFICATION\""), "searchCobrandActiveGlobalMessage JSON is changed - "+response);
		Assert.assertEquals(response, "{\"notification\":[{\"impactedProvider\":[{\"name\":\"CitiMortgage\",\"containers\":[\"mortgage\"],\"id\":3584}],\"impact\":\"Big\",\"description\":\" As part of our proactive monitoring, we have observed/Informed that CitiMortgage are failing because of multiple issues..We will keep you updated with the Progress. Issues : Site Temporarily Unavailable, User Action Required Site Display Name : CitiMortgage Start Time : 06/28/2017 Site Id : 3584 Tentative ETA : 06/29/2017 Impacted Container : Mortgages \",\"classification\":\"SITE_NOTIFICATION\",\"title\":\"CitiMortgage(Mortgages) - Multiple Issues - In-Progress\",\"issueType\":[\"SITE_TEMPORARILY_UNAVAILABLE,USER_ACTION_REQUIRED\"],\"lastUpdated\":\"2017-06-28T00:00:00Z\",\"impactedCobrand\":[{\"name\":\"Yodlee\",\"id\":10000004},{\"name\":\"Yodlee\",\"id\":10001372}],\"issueStartDate\":\"2017-06-28T00:00:00Z\",\"id\":10004653,\"category\":\"Informational\",\"expectedResolutionTime\":\"2017-06-29T00:00:00Z\",\"status\":\"In-Progress\"}]}");
	}	

	
	@Test
	public void searchAllStatusGlobalMessageTest(){
		filter.setCobrandId("10001372");
		filter.setStatuses(null);
		filter.setProviderIds(null);
		String response = globalController.searchGlobalMessage("3099:fdskj", devAppIdHeader, filter);
		Assert.assertNotNull(response);
		Assert.assertTrue(!response.isEmpty(), "searchCobrandActiveGlobalMessage is empty");
		Assert.assertTrue(!response.contains("errorCode"), "searchCobrandActiveGlobalMessage is throwing some error - "+response);
		Assert.assertTrue(response.contains("SITEIS_PERMANENTLY_DISABLED"), "searchCobrandActiveGlobalMessage JSON is changed - "+response);
		Assert.assertTrue(response.contains("\"Informational\""), "searchCobrandActiveGlobalMessage JSON is changed - "+response);
		Assert.assertTrue(response.contains("\"SITE_NOTIFICATION\""), "searchCobrandActiveGlobalMessage JSON is changed - "+response);
	}	

	
	
	@Test
	public void searchCobrandGlobalMessageFailureTest(){
		filter.setCobrandId("10001372");
		filter.setStatuses("4,5,6");
		filter.setProviderIds("891819");
		String response = globalController.searchGlobalMessage("3099:fdskj", devAppIdHeader, filter);
		Assert.assertNotNull(response);
		Assert.assertTrue(!response.isEmpty(), "searchCobrandActiveGlobalMessage is empty");
		Assert.assertTrue(!response.contains("errorCode"), "searchCobrandActiveGlobalMessage is throwing some error - "+response);
		Assert.assertTrue(!response.contains("\"Informational\""), "searchCobrandActiveGlobalMessage JSON is changed - "+response);
		Assert.assertTrue(!response.contains("\"SITE_NOTIFICATION\""), "searchCobrandActiveGlobalMessage JSON is changed - "+response);
		Assert.assertEquals(response, "{}");
	}
	
	@Test
	public void searchCobrandGlobalMessageHttpFailureTest(){
		filter.setCobrandId("");
		filter.setStatuses("");
		filter.setProviderIds("");
		String response = globalController.searchGlobalMessage("3099:fdskj", devAppIdHeader, filter);
		Assert.assertNotNull(response);
		Assert.assertTrue(!response.isEmpty(), "searchCobrandActiveGlobalMessage is empty");
		Assert.assertTrue(response.contains("errorCode"), "searchCobrandActiveGlobalMessage is throwing some error - "+response);
		filter.setCobrandId(null);
		response = globalController.searchGlobalMessage("3099:fdskj", devAppIdHeader, filter);
		Assert.assertNotNull(response);
		Assert.assertTrue(!response.isEmpty(), "searchCobrandActiveGlobalMessage is empty");
		Assert.assertTrue(response.contains("errorCode"), "searchCobrandActiveGlobalMessage is throwing some error - "+response);
	}
	
	@Test
	public void searchCobrandGlobalMessageForCobrandNullTest(){
		filter.setCobrandId(null);
		filter.setStatuses("");
		filter.setProviderIds("");
		String response = globalController.searchGlobalMessage("3099:fdskj", devAppIdHeader, filter);
		Assert.assertNotNull(response);
		Assert.assertTrue(!response.isEmpty(), "searchCobrandActiveGlobalMessage is empty");
		Assert.assertTrue(response.contains("errorCode"), "searchCobrandActiveGlobalMessage is throwing some error - "+response);
	}
}
