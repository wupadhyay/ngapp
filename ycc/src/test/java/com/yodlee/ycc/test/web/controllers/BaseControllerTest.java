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

import com.yodlee.ycc.app.search.RequestParameters;
import com.yodlee.ycc.app.web.controllers.BaseController;
import com.yodlee.ycc.test.web.MainServiceTest;

public class BaseControllerTest extends MainServiceTest{
	
	private static final String devAppIdHeader = "94AAC319-CF5E-4733-AA42-CA88C79C656D";
	
	private static Logger logger = LoggerFactory.getLogger(BaseControllerTest.class);

	@Autowired
	private BaseController baseController;

	private RequestParameters requestParameters;


	@BeforeClass
	public void setRequestParameters() {
		this.requestParameters=new RequestParameters();
		this.requestParameters.setCobrandId("10000004");
		this.requestParameters.setCustomerId("10000004");
	}

	@Test
	public void getCobrandsTest() {
		this.requestParameters.setCobrandId("10000004");
		this.requestParameters.setCustomerId("10000004");
		String cobrands = this.baseController.getCobrands("3099:fdskj",devAppIdHeader,this.requestParameters);
		Assert.assertNotNull(cobrands);
		Assert.assertTrue(!cobrands.isEmpty(), "Cobrands List is empty");
		Assert.assertTrue(!cobrands.contains("errorCode"), "Cobrands List is throwing some error - "+cobrands);
		Assert.assertTrue(cobrands.contains("10000004"), "Cobrands List JSON is changed - "+cobrands);
	}
	
	@Test
	public void getCobrandsFailureTest() {
		this.requestParameters.setCobrandId("10000004");
		this.requestParameters.setCustomerId("");
		String cobrands = this.baseController.getCobrands("","",this.requestParameters);
		Assert.assertNotNull(cobrands);
		Assert.assertTrue(!cobrands.isEmpty(), "Cobrands list is empty");
		Assert.assertTrue(cobrands.contains("errorCode"), "Cobrands List is throwing some error - "+cobrands);
		
	}
	
	@Test
	public void getCobrandLocaleTest() {
		this.requestParameters.setCobrandId("10000004");
		this.requestParameters.setCustomerId("10000004");
		String cobrandLocale = this.baseController.getCobrandLocale("3099:fdskj",devAppIdHeader,this.requestParameters);
		Assert.assertNotNull(cobrandLocale);
		Assert.assertTrue(!cobrandLocale.isEmpty(), "Cobrand Locale is empty");
		Assert.assertTrue(!cobrandLocale.contains("errorCode"), "Cobrand Locale is throwing some error - "+cobrandLocale);
		Assert.assertTrue(cobrandLocale.contains("locale"), "Cobrand Locale JSON is changed - "+cobrandLocale);
	}
	
	@Test
	public void getCobrandLocaleFailureTest() {
		this.requestParameters.setCobrandId("10000004");
		this.requestParameters.setCustomerId("");
		String cobrandLocale = this.baseController.getCobrandLocale("","",this.requestParameters);
		Assert.assertNotNull(cobrandLocale);
		Assert.assertTrue(!cobrandLocale.isEmpty(), "Cobrand Locale is empty");
		Assert.assertTrue(cobrandLocale.contains("errorCode"), "Cobrand Locale is throwing some error - "+cobrandLocale);
	}


	@Test
	public void getLoggerServiceTest() {
		this.requestParameters.setExceptionStackTrace("Testing Logger from testNG");
		this.baseController.getLoggerService("3099:fdskj",devAppIdHeader, this.requestParameters);
	}

	@Test
	public void getUserTypeTest() {
		this.requestParameters.setCobrandId("10000004");
		String userType = this.baseController.getUserType("3099:fdskj",devAppIdHeader,this.requestParameters);
		Assert.assertNotNull(userType);
		Assert.assertTrue(!userType.isEmpty(), "User Type is empty");
		Assert.assertTrue(!userType.contains("errorCode"), "User Type is throwing some error - "+userType);
		Assert.assertTrue(userType.contains("isYodlee"), "User Type JSON is changed - "+userType);
		Assert.assertEquals(userType, "{\"cobrandInfo\":{\"lastUpdated\":0,\"iavEnabled\":true,\"isCacherunDisabled\":false,\"isChannel\":false,\"iavCacheRefreshEnabled\":true,\"cobrandStatusId\":1,\"created\":0,\"balanceRefreshEnabled\":false,\"cobrandId\":10000004,\"name\":\"Yodlee\",\"isYodlee\":true,\"slmrEnabled\":true}}");
	}
	
	@Test
	public void getUserTypeCobrandValueVariationTest() {
		this.requestParameters.setCobrandId("[10000004]");
		String userType = this.baseController.getUserType("3099:fdskj",devAppIdHeader,this.requestParameters);
		Assert.assertNotNull(userType);
		Assert.assertTrue(!userType.isEmpty(), "User Type is empty");
		Assert.assertTrue(!userType.contains("errorCode"), "User Type is throwing some error - "+userType);
		Assert.assertTrue(userType.contains("isYodlee"), "User Type JSON is changed - "+userType);
	}
	
	@Test
	public void getUserTypeCobrandValueEmptyTest() {
		this.requestParameters.setCobrandId("");
		String userType = this.baseController.getUserType("3099:fdskj",devAppIdHeader,this.requestParameters);
		Assert.assertTrue(userType.contains("errorCode"), "User Type is not throwing some error - "+userType);
	}
	
	
	@Test
	public void getUserTypeCobrandValueNullTest() {
		this.requestParameters.setCobrandId(null);
		String userType = this.baseController.getUserType("3099:fdskj",devAppIdHeader,this.requestParameters);
		Assert.assertTrue(userType.contains("errorCode"), "User Type is not throwing some error - "+userType);
	}
	
	@Test
	public void getUserTypeDevCobrandReplacementTestForStatistics() {
		this.requestParameters.setCobrandId("99");
		String userType = this.baseController.getUserType("3099:fdskj",devAppIdHeader,this.requestParameters);
		Assert.assertTrue(userType.contains("errorCode"), "User Type is not throwing some error - "+userType);
	}

	@Test
	public void getUserInfoTest() {
		this.requestParameters.setCobrandId("10000004");
		String userType = this.baseController.getUserInfo("3099:fdskj",devAppIdHeader,this.requestParameters);
		Assert.assertNotNull(userType);
		Assert.assertTrue(!userType.isEmpty(), "User Info is empty");
		Assert.assertTrue(!userType.contains("errorCode"), "User Info is throwing some error - "+userType);
		Assert.assertTrue(userType.contains("memId"), "User Info JSON is changed - "+userType);
		Assert.assertEquals(userType, "{\"userInfo\":{\"loginName\":\"test\",\"email\":\"s@s9210932.com\",\"memId\":123498765}}");
	}

	@Test
	public void getUserInfoCobrandVariationTest() {
		this.requestParameters.setCobrandId("[10000004]");
		String userType = this.baseController.getUserInfo("3099:fdskj",devAppIdHeader,this.requestParameters);
		Assert.assertNotNull(userType);
		Assert.assertTrue(!userType.isEmpty(), "User Info is empty");
		Assert.assertTrue(!userType.contains("errorCode"), "User Info is throwing some error - "+userType);
		Assert.assertTrue(userType.contains("memId"), "User Info JSON is changed - "+userType);
		Assert.assertEquals(userType, "{\"userInfo\":{\"loginName\":\"test\",\"email\":\"s@s9210932.com\",\"memId\":123498765}}");
	}
	
	@Test
	public void getUserInfoCobrandValueEmptyTest() {
		this.requestParameters.setCobrandId("");
		String userType = this.baseController.getUserInfo("3099:fdskj",devAppIdHeader,this.requestParameters);
		Assert.assertTrue(userType.contains("errorCode"), "User Info is not throwing some error - "+userType);
	}
	
	@Test
	public void getUserInfoCobrandValueNullTest() {
		this.requestParameters.setCobrandId(null);
		String userType = this.baseController.getUserInfo("3099:fdskj",devAppIdHeader,this.requestParameters);
		Assert.assertTrue(userType.contains("errorCode"), "User Info is not throwing some error - "+userType);
	}
	
	@Test
	public void getUserInfoDevCobrandReplacementTest() {
		this.requestParameters.setCobrandId("99");
		String userType = this.baseController.getUserInfo("3099:fdskj",devAppIdHeader,this.requestParameters);
		Assert.assertTrue(userType.contains("errorCode"), "User Info is not throwing some error - "+userType);
	}
}
