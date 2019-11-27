/* Copyright (c) 2018 Yodlee Inc. All Rights Reserved.
 *
 * This software is the confidential and proprietary information of Yodlee, Inc.
 * Use is subject to license terms.
 *
 */

package com.yodlee.ycc.test.web.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.testng.Assert;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.Test;
import com.yodlee.ycc.app.search.UserContactInfoFilter;
import com.yodlee.ycc.app.web.controllers.UserContactInfoController;
import com.yodlee.ycc.test.web.MainServiceTest;

/**
 * 
 * @author sjain5
 *
 */

public class UserContactInfoControllerTest extends MainServiceTest{

	private static final String devAppIdHeader = "94AAC319-CF5E-4733-AA42-CA88C79C656D";
	
	@Autowired
	private UserContactInfoController userContactInfoController;

	private UserContactInfoFilter filter;


	@BeforeClass
	public void setRequestParameters() {
		this.filter=new UserContactInfoFilter();
	}

	@Test
	public void UserContactInfoCreateTest() {
		this.filter.setCustomerId("10000004");
		this.filter.setUserContactInfoObj("{\"userContactInfo\":{\"cobrandId\":\"11705681111\",\"memId\":\"1234\",\"lastName\":\"rao\",\"phone\":\"080-133333\",\"environment\":\"production\",\"isYcc\":false,\"timezone\":\"PST\",\"email\":\"apunekr123@yodlee.com\",\"userName\":\"Ramekkrs\",\"isDeleted\":false,\"salutation\":\"Mr\",\"firstName\":\"Ram\",\"roles\":[\"L1\",\"L9\"]}}");
		String response = this.userContactInfoController.createUserContact("3099:fdskj",devAppIdHeader, this.filter);
		Assert.assertNotNull(response);
		Assert.assertTrue(!response.isEmpty(), "UserContactInfoCreateTest is empty");
		Assert.assertTrue(!response.contains("errorCode"), "UserContactInfoCreateTest is throwing some error - "+response);
		Assert.assertTrue(response.contains("\"email\":\"apunekar123@yodlee.com\""), "UserContactInfoCreateTest JSON is changed - "+response);
		Assert.assertEquals(response, "{\"userContactInfo\":{\"cobrandId\":40705681111,\"email\":\"apunekar123@yodlee.com\"}}");
	}
	

	@Test
	public void UserContactInfoCreateFailureForCobrandValueNullTest() {
		this.filter.setCustomerId("");
		this.filter.setUserContactInfoObj("{\"userContactInfo\":{\"cobrandId\":\"11705681111\",\"memId\":\"1234\",\"lastName\":\"rao\",\"phone\":\"080-133333\",\"environment\":\"production\",\"isYcc\":false,\"timezone\":\"PST\",\"email\":\"apunekr123@yodlee.com\",\"userName\":\"Ramekkrs\",\"isDeleted\":false,\"salutation\":\"Mr\",\"firstName\":\"Ram\",\"roles\":[\"L1\",\"L9\"]}}");
		String response = this.userContactInfoController.createUserContact("3099:fdskj",devAppIdHeader, this.filter);
		Assert.assertTrue(response.contains("errorCode"), "UserContactInfoCreateFailureForCobrandValueNullTest is not throwing some error - "+response);
		this.filter.setCustomerId("10000004");
	}
	
	
	@Test
	public void UserContactInfoCreateFailureForHeadersNullTest() {
		this.filter.setCustomerId("10000004");
		this.filter.setUserContactInfoObj("{\"userContactInfo\":{\"cobrandId\":\"11705681111\",\"memId\":\"1234\",\"lastName\":\"rao\",\"phone\":\"080-133333\",\"environment\":\"production\",\"isYcc\":false,\"timezone\":\"PST\",\"email\":\"apunekr123@yodlee.com\",\"userName\":\"Ramekkrs\",\"isDeleted\":false,\"salutation\":\"Mr\",\"firstName\":\"Ram\",\"roles\":[\"L1\",\"L9\"]}}");
		String response = this.userContactInfoController.createUserContact("","", this.filter);
		Assert.assertTrue(response.contains("errorCode"), "UserContactInfoCreateFailureForHeadersNullTest is not throwing some error - "+response);
	}

	
	@Test
	public void UserContactInfoCreateTestFailureForNullDataTest() {
		this.filter.setCustomerId("10000004");
		this.filter.setUserContactInfoObj("");
		String response = this.userContactInfoController.createUserContact("3099:fdskj",devAppIdHeader, this.filter);
		Assert.assertTrue(response.contains("errorCode"), "UserContactInfoCreateTestFailureForNullDataTest is not throwing some error - "+response);
	}
	
	@Test
	public void UserContactInfoSearchWithusernameTest() {
		this.filter.setUserName("sjain5");
		this.filter.setCobrandId("");
		this.filter.setCustomerId("10000004");
		this.filter.setEmail("");
		this.filter.setEnvironment("");
		this.filter.setFirstName("");
		this.filter.setIsYcc("");
		this.filter.setLastName("");
		this.filter.setRoles("");
		this.filter.setUserContactInfoId("");
		String response = this.userContactInfoController.searchUserContact("3099:fdskj",devAppIdHeader, this.filter);
		Assert.assertNotNull(response);
		Assert.assertTrue(!response.isEmpty(), "UserContactInfoSearchWithusernameTest is empty");
		Assert.assertTrue(!response.contains("errorCode"), "UserContactInfoSearchWithusernameTest is throwing some error - "+response);
		Assert.assertTrue(response.contains("\"_id\":\"5b5ea02010c71c220f2175ec\""), "UserContactInfoSearchWithusernameTest JSON is changed - "+response);
		Assert.assertEquals(response, "{\"userContactInfo\":[{\"lastName\":\"rao\",\"timezone\":\"PST\",\"roles\":[\"L1\",\"L5\"],\"userName\":\"sjain5\",\"firstName\":\"Vivek\",\"isYcc\":false,\"environment\":\"production\",\"isDeleted\":false,\"cobrandId\":3070054,\"_id\":\"5b5ea02010c71c220f2175ec\",\"salutation\":\"Mr\",\"email\":\"vive11berlia123@yodlee.com\",\"memId\":1234}]}");
	}
	
	@Test
	public void UserContactInfoSearchWithoutParametersTest() {
		this.filter.setUserName("");
		this.filter.setCobrandId("");
		this.filter.setCustomerId("10000004");
		this.filter.setEmail("");
		this.filter.setEnvironment("");
		this.filter.setFirstName("");
		this.filter.setIsYcc("");
		this.filter.setLastName("");
		this.filter.setRoles("");
		this.filter.setUserContactInfoId("");
		String response = this.userContactInfoController.searchUserContact("3099:fdskj",devAppIdHeader, this.filter);
		Assert.assertTrue(response.contains("errorCode"), "UserContactInfoSearchWithoutParametersTest is not throwing some error - "+response);
	}
	
	@Test
	public void UserContactInfoSearchWithAllParametersTest() {
		this.filter.setUserName("sjain5");
		this.filter.setCobrandId("3070054");
		this.filter.setCustomerId("10000004");
		this.filter.setEmail("vive11berlia123@yodlee.com");
		this.filter.setEnvironment("Production");
		this.filter.setFirstName("Vivek");
		this.filter.setIsYcc("false");
		this.filter.setLastName("rao");
		this.filter.setRoles("L1,L5");
		this.filter.setUserContactInfoId("");
		String response = this.userContactInfoController.searchUserContact("3099:fdskj",devAppIdHeader, this.filter);
		Assert.assertNotNull(response);
		Assert.assertTrue(!response.isEmpty(), "UserContactInfoSearchWithAllParametersTest is empty");
		Assert.assertTrue(!response.contains("errorCode"), "UserContactInfoSearchWithAllParametersTest is throwing some error - "+response);
		Assert.assertTrue(response.contains("\"_id\":\"5b5ea02010c71c220f2175ec\""), "UserContactInfoSearchWithAllParametersTest JSON is changed - "+response);
		Assert.assertEquals(response, "{\"userContactInfo\":[{\"lastName\":\"rao\",\"timezone\":\"PST\",\"roles\":[\"L1\",\"L5\"],\"userName\":\"sjain5\",\"firstName\":\"Vivek\",\"isYcc\":false,\"environment\":\"production\",\"isDeleted\":false,\"cobrandId\":3070054,\"_id\":\"5b5ea02010c71c220f2175ec\",\"salutation\":\"Mr\",\"email\":\"vive11berlia123@yodlee.com\",\"memId\":1234}]}");
	}
	
	
	@Test
	public void UserContactInfoSearchWithEnvironmentTest() {
		this.filter.setUserName("");
		this.filter.setCobrandId("");
		this.filter.setCustomerId("");
		this.filter.setEmail("");
		this.filter.setEnvironment("Production");
		this.filter.setFirstName("");
		this.filter.setIsYcc("");
		this.filter.setLastName("");
		this.filter.setRoles("");
		this.filter.setUserContactInfoId("");
		String response = this.userContactInfoController.searchUserContact("3099:fdskj",devAppIdHeader, this.filter);
		Assert.assertNotNull(response);
		Assert.assertTrue(!response.isEmpty(), "UserContactInfoSearchWithEnvironmentTest is empty");
		Assert.assertTrue(!response.contains("errorCode"), "UserContactInfoSearchWithEnvironmentTest is throwing some error - "+response);
		Assert.assertTrue(response.contains("\"_id\":\"5b5ea02010c71c220f2175ec\""), "UserContactInfoSearchWithEnvironmentTest JSON is changed - "+response);
		Assert.assertEquals(response, "{\"userContactInfo\":[{\"lastName\":\"rao\",\"timezone\":\"PST\",\"roles\":[\"L1\",\"L5\"],\"userName\":\"sjain5\",\"firstName\":\"Vivek\",\"isYcc\":false,\"environment\":\"production\",\"isDeleted\":false,\"cobrandId\":3070054,\"_id\":\"5b5ea02010c71c220f2175ec\",\"salutation\":\"Mr\",\"email\":\"vive11berlia123@yodlee.com\",\"memId\":1234}]}");
	}
	
	@Test
	public void UserContactInfoSearchWithFirstNameTest() {
		this.filter.setUserName("");
		this.filter.setCobrandId("");
		this.filter.setCustomerId("");
		this.filter.setEmail("");
		this.filter.setEnvironment("");
		this.filter.setFirstName("Vivek");
		this.filter.setIsYcc("");
		this.filter.setLastName("");
		this.filter.setRoles("");
		this.filter.setUserContactInfoId("");
		String response = this.userContactInfoController.searchUserContact("3099:fdskj",devAppIdHeader, this.filter);
		Assert.assertNotNull(response);
		Assert.assertTrue(!response.isEmpty(), "UserContactInfoSearchWithFirstNameTest is empty");
		Assert.assertTrue(!response.contains("errorCode"), "UserContactInfoSearchWithFirstNameTest is throwing some error - "+response);
		Assert.assertTrue(response.contains("\"_id\":\"5b5ea02010c71c220f2175ec\""), "UserContactInfoSearchWithFirstNameTest JSON is changed - "+response);
		Assert.assertEquals(response, "{\"userContactInfo\":[{\"lastName\":\"rao\",\"timezone\":\"PST\",\"roles\":[\"L1\",\"L5\"],\"userName\":\"sjain5\",\"firstName\":\"Vivek\",\"isYcc\":false,\"environment\":\"production\",\"isDeleted\":false,\"cobrandId\":3070054,\"_id\":\"5b5ea02010c71c220f2175ec\",\"salutation\":\"Mr\",\"email\":\"vive11berlia123@yodlee.com\",\"memId\":1234}]}");
	}
	
	
	@Test
	public void UserContactInfoSearchWithLastNameTest() {
		this.filter.setUserName("");
		this.filter.setCobrandId("");
		this.filter.setCustomerId("");
		this.filter.setEmail("");
		this.filter.setEnvironment("");
		this.filter.setFirstName("");
		this.filter.setIsYcc("");
		this.filter.setLastName("rao");
		this.filter.setRoles("");
		this.filter.setUserContactInfoId("");
		String response = this.userContactInfoController.searchUserContact("3099:fdskj",devAppIdHeader, this.filter);
		Assert.assertNotNull(response);
		Assert.assertTrue(!response.isEmpty(), "UserContactInfoSearchWithLastNameTest is empty");
		Assert.assertTrue(!response.contains("errorCode"), "UserContactInfoSearchWithLastNameTest is throwing some error - "+response);
		Assert.assertTrue(response.contains("\"_id\":\"5b5ea02010c71c220f2175ec\""), "UserContactInfoSearchWithLastNameTest JSON is changed - "+response);
		Assert.assertEquals(response, "{\"userContactInfo\":[{\"lastName\":\"rao\",\"timezone\":\"PST\",\"roles\":[\"L1\",\"L5\"],\"userName\":\"sjain5\",\"firstName\":\"Vivek\",\"isYcc\":false,\"environment\":\"production\",\"isDeleted\":false,\"cobrandId\":3070054,\"_id\":\"5b5ea02010c71c220f2175ec\",\"salutation\":\"Mr\",\"email\":\"vive11berlia123@yodlee.com\",\"memId\":1234}]}");
	}
	
	@Test
	public void UserContactInfoSearchWithYCCUSerFlagTest() {
		this.filter.setUserName("");
		this.filter.setCobrandId("");
		this.filter.setCustomerId("");
		this.filter.setEmail("");
		this.filter.setEnvironment("");
		this.filter.setFirstName("");
		this.filter.setIsYcc("false");
		this.filter.setLastName("");
		this.filter.setRoles("");
		this.filter.setUserContactInfoId("");
		String response = this.userContactInfoController.searchUserContact("3099:fdskj",devAppIdHeader, this.filter);
		Assert.assertNotNull(response);
		Assert.assertTrue(!response.isEmpty(), "UserContactInfoSearchWithYCCUSerFlagTest is empty");
		Assert.assertTrue(!response.contains("errorCode"), "UserContactInfoSearchWithYCCUSerFlagTest is throwing some error - "+response);
		Assert.assertTrue(response.contains("\"_id\":\"5b5ea02010c71c220f2175ec\""), "UserContactInfoSearchWithYCCUSerFlagTest JSON is changed - "+response);
		Assert.assertEquals(response, "{\"userContactInfo\":[{\"lastName\":\"rao\",\"timezone\":\"PST\",\"roles\":[\"L1\",\"L5\"],\"userName\":\"sjain5\",\"firstName\":\"Vivek\",\"isYcc\":false,\"environment\":\"production\",\"isDeleted\":false,\"cobrandId\":3070054,\"_id\":\"5b5ea02010c71c220f2175ec\",\"salutation\":\"Mr\",\"email\":\"vive11berlia123@yodlee.com\",\"memId\":1234}]}");
	}
	
	@Test
	public void UserContactInfoSearchWithOnlyRolesTest() {
		this.filter.setUserName("");
		this.filter.setCobrandId("");
		this.filter.setCustomerId("");
		this.filter.setEmail("");
		this.filter.setEnvironment("");
		this.filter.setFirstName("");
		this.filter.setIsYcc("");
		this.filter.setLastName("");
		this.filter.setRoles("L1,L5");
		this.filter.setUserContactInfoId("");
		String response = this.userContactInfoController.searchUserContact("3099:fdskj",devAppIdHeader, this.filter);
		Assert.assertNotNull(response);
		Assert.assertTrue(!response.isEmpty(), "UserContactInfoSearchWithOnlyRolesTest is empty");
		Assert.assertTrue(!response.contains("errorCode"), "UserContactInfoSearchWithOnlyRolesTest is throwing some error - "+response);
		Assert.assertTrue(response.contains("\"_id\":\"5b5ea02010c71c220f2175ec\""), "UserContactInfoSearchWithOnlyRolesTest JSON is changed - "+response);
		Assert.assertEquals(response, "{\"userContactInfo\":[{\"lastName\":\"rao\",\"timezone\":\"PST\",\"roles\":[\"L1\",\"L5\"],\"userName\":\"sjain5\",\"firstName\":\"Vivek\",\"isYcc\":false,\"environment\":\"production\",\"isDeleted\":false,\"cobrandId\":3070054,\"_id\":\"5b5ea02010c71c220f2175ec\",\"salutation\":\"Mr\",\"email\":\"vive11berlia123@yodlee.com\",\"memId\":1234}]}");
	}
	
	
	
	@Test
	public void UserContactInfoSearchWithFewParametersTest() {
		this.filter.setUserName("");
		this.filter.setCobrandId("");
		this.filter.setCustomerId("10000004");
		this.filter.setEmail("vive11berlia123@yodlee.com");
		this.filter.setEnvironment("");
		this.filter.setFirstName("Vivek");
		this.filter.setIsYcc("false");
		this.filter.setLastName("rao");
		this.filter.setRoles("");
		this.filter.setUserContactInfoId("");
		String response = this.userContactInfoController.searchUserContact("3099:fdskj",devAppIdHeader, this.filter);
		Assert.assertNotNull(response);
		Assert.assertTrue(!response.isEmpty(), "UserContactInfoSearchWithFewParametersTest is empty");
		Assert.assertTrue(!response.contains("errorCode"), "UserContactInfoSearchWithFewParametersTest is throwing some error - "+response);
		Assert.assertTrue(response.contains("\"_id\":\"5b5ea02010c71c220f2175ec\""), "UserContactInfoSearchWithFewParametersTest JSON is changed - "+response);
		Assert.assertEquals(response, "{\"userContactInfo\":[{\"lastName\":\"rao\",\"timezone\":\"PST\",\"roles\":[\"L1\",\"L5\"],\"userName\":\"sjain5\",\"firstName\":\"Vivek\",\"isYcc\":false,\"environment\":\"production\",\"isDeleted\":false,\"cobrandId\":3070054,\"_id\":\"5b5ea02010c71c220f2175ec\",\"salutation\":\"Mr\",\"email\":\"vive11berlia123@yodlee.com\",\"memId\":1234}]}");
	}
	
	/*@Test
	public void UserContactInfoSearchWithOnlyCobrandIdTest() {
		this.filter.setUserName("");
		this.filter.setCobrandId("[3070054]");
		this.filter.setCustomerId("");
		this.filter.setEmail("");
		this.filter.setEnvironment("");
		this.filter.setFirstName("");
		this.filter.setIsYcc("");
		this.filter.setLastName("");
		this.filter.setRoles("");
		this.filter.setUserContactInfoId("");
		String response = this.userContactInfoController.searchUserContact("3099:fdskj",devAppIdHeader, this.filter);
		Assert.assertNotNull(response);
		Assert.assertTrue(!response.isEmpty(), "UserContactInfoSearchWithOnlyCobrandIdTest is empty");
		Assert.assertTrue(!response.contains("errorCode"), "UserContactInfoSearchWithOnlyCobrandIdTest is throwing some error - "+response);
		Assert.assertTrue(response.contains("\"_id\":\"5b5ea02010c71c220f2175ec\""), "UserContactInfoSearchWithOnlyCobrandIdTest JSON is changed - "+response);
		Assert.assertEquals(response, "{\"userContactInfo\":[{\"lastName\":\"rao\",\"timezone\":\"PST\",\"roles\":[\"L1\",\"L5\"],\"userName\":\"sjain5\",\"firstName\":\"Vivek\",\"isYcc\":false,\"environment\":\"production\",\"isDeleted\":false,\"cobrandId\":3070054,\"_id\":\"5b5ea02010c71c220f2175ec\",\"salutation\":\"Mr\",\"email\":\"vive11berlia123@yodlee.com\",\"memId\":1234}]}");
	}*/
	
	
	@Test
	public void UserContactInfoEditWithAllFieldsTest() {
		this.filter.setCustomerId("10000004");
		this.filter.setUserContactInfoId("5b5ea02010c71c220f2175e");
		this.filter.setUserContactInfoObj("{\"userContactInfo\":{\"phone\":\"080-133333\",\"timezone\":\"PST\",\"email\":\"apunekr123@yodlee.com\",\"roles\":[\"L1\",\"L9\"]}}");
		String response = this.userContactInfoController.editUserContact("3099:fdskj",devAppIdHeader, this.filter);
		Assert.assertNotNull(response);
		Assert.assertTrue(!response.isEmpty(), "UserContactInfoEditWithAllFieldsTest is empty");
		Assert.assertTrue(!response.contains("errorCode"), "UserContactInfoEditWithAllFieldsTest is throwing some error - "+response);
		Assert.assertTrue(response.contains("\"email\":\"apunekar123@yodlee.com\""), "UserContactInfoEditWithAllFieldsTest JSON is changed - "+response);
		Assert.assertEquals(response, "{\"userContactInfo\":{\"cobrandId\":40705681111,\"email\":\"apunekar123@yodlee.com\"}}");
	}
	
	@Test
	public void UserContactInfoEditWithLimitedFieldsTest() {
		this.filter.setCustomerId("10000004");
		this.filter.setUserContactInfoId("5b5ea02010c71c220f2175");
		this.filter.setUserContactInfoObj("{\"userContactInfo\":{\"email\":\"apunekr123@yodlee.com\",\"roles\":[\"L1\",\"L9\"]}}");
		String response = this.userContactInfoController.editUserContact("3099:fdskj",devAppIdHeader, this.filter);
		Assert.assertNotNull(response);
		Assert.assertTrue(!response.isEmpty(), "UserContactInfoEditWithLimitedFieldsTest is empty");
		Assert.assertTrue(!response.contains("errorCode"), "UserContactInfoEditWithLimitedFieldsTest is throwing some error - "+response);
		Assert.assertTrue(response.contains("\"email\":\"apunekar123@yodlee.com\""), "UserContactInfoEditWithLimitedFieldsTest JSON is changed - "+response);
		Assert.assertEquals(response, "{\"userContactInfo\":{\"cobrandId\":40705681111,\"email\":\"apunekar123@yodlee.com\"}}");
	}
	
	@Test
	public void UserContactInfoEditWithoutAnyFieldsTest() {
		this.filter.setCustomerId("10000004");
		this.filter.setUserContactInfoId("5b5ea02010c71c220f2175ec");
		this.filter.setUserContactInfoObj("{}");
		String response = this.userContactInfoController.editUserContact("3099:fdskj",devAppIdHeader, this.filter);
		Assert.assertTrue(response.contains("errorCode"), "UserContactInfoEditWithoutAnyFieldsTest is not throwing some error - "+response);
	}
	
	
	@Test
	public void UserContactInfoBulkUploadTest() {
		this.filter.setCustomerId("10000004");
		this.filter.setUserContactInfoObj("{\"attachment\":{\"name\":\"test.csv\",\"content\":\"VXNlcm5hbWUsU2FsdXRhdGlvbiosRmlyc3QgTmFtZSogLExhc3QgTmFtZSogLEVtYWlsKixQaG9uZSBOdW1iZXIsVGltZXpvbmUqICxDb2JyYW5kIElEKiAsUm9sZXMqICxZQ0MgVXNlciogLEVudmlyb25tZW50KiAsTWVtIElkDQpBYWthc2gsTXIsQWthc2gsUHVuZWthcixhYWEyNTYzNDU3QGdtYWlsLmNvbSwsUFNULDEwMDAwMDEyLENTUiBMMiBTdXBwb3J0LHllcyxQcm9kdWN0aW9uLDEyMw0K\",\"fileSize\":225,\"type\":\"application/vnd.ms-excel\"}}");
		String response = this.userContactInfoController.uploadFile("3099:fdskj",devAppIdHeader, this.filter);
		Assert.assertTrue(!response.contains("errorCode"), "UserContactInfoBulkUploadTest is not throwing some error - "+response);
		Assert.assertEquals(response, "{\"attachment\":{\"message\":\"Users uploaded successfully\"}}");
	}
	
	
	@Test
	public void UserRolesTest() {
		this.filter.setCustomerId("10000004");
		this.filter.setUserContactInfoObj("");
		String response = this.userContactInfoController.userRole("3099:fdskj",devAppIdHeader, this.filter);
		Assert.assertTrue(!response.contains("errorCode"), "UserRolesTest is not throwing some error - "+response);
		Assert.assertEquals(response, "{\"roles\":[{\"roleId\":1,\"name\":\"CSR L1 Support\",\"description\":\"CSR L1 Support\"},{\"roleId\":2,\"name\":\"CSR L2 Support\",\"description\":\"CSR L2 Support\"},{\"roleId\":3,\"name\":\"Business/Vendor Contact\",\"description\":\"Business/Vendor Contact\"},{\"roleId\":4,\"name\":\"Product Contact Email ID\",\"description\":\"Product Contact Email ID\"},{\"roleId\":5,\"name\":\"Technical/Developer Contact Email ID\",\"description\":\"Technical/Developer Contact Email ID\"},{\"roleId\":6,\"name\":\"Security  Contact\",\"description\":\"Security Contact\"},{\"roleId\":7,\"name\":\"Accounting Contact\",\"description\":\"Accounting Contact\"},{\"roleId\":8,\"name\":\"Ops Support\",\"description\":\"Ops Support\"}]}");
	}
	
	@Test
	public void FileHistoryTest() {
		this.filter.setCustomerId("10000004");
		this.filter.setUserContactInfoObj("");
		String response = this.userContactInfoController.fileHistory("3099:fdskj",devAppIdHeader, this.filter);
		Assert.assertTrue(!response.contains("errorCode"), "FileHistoryTest is not throwing some error - "+response);
		Assert.assertEquals(response, "{\"filehistory\":[{\"fileName\":\"test.csv\",\"totalRecords\":1,\"failureRecords\":0,\"created\":\"2019-01-25 09:56:36 UTC\",\"successRecords\":1},{\"fileName\":\"email_capture_uc.csv\",\"totalRecords\":2,\"failureRecords\":1,\"created\":\"2019-01-24 12:03:02 UTC\",\"successRecords\":1,\"errors\":[{\"cobrandId\":10000004,\"errorMesages\":[\"Role is invalid role name:\\\"CSR L1 Support at line 1\",\"Environment is invalid at line 1\",\"MemId is invalid at line 1\"],\"email\":\"apuneka@yodlee.com\"}]},{\"fileName\":\"email_capture_uc.csv\",\"totalRecords\":3,\"failureRecords\":0,\"created\":\"2019-01-17 21:01:54 UTC\",\"successRecords\":3},{\"fileName\":\"email_capture_uc.csv\",\"totalRecords\":3,\"failureRecords\":0,\"created\":\"2019-01-17 21:01:42 UTC\",\"successRecords\":3},{\"fileName\":\"email_capture_uc.csv\",\"totalRecords\":3,\"failureRecords\":0,\"created\":\"2019-01-17 21:01:31 UTC\",\"successRecords\":3},{\"fileName\":\"email_capture_uc.csv\",\"totalRecords\":3,\"failureRecords\":0,\"created\":\"2019-01-17 20:42:04 UTC\",\"successRecords\":3},{\"fileName\":\"email_capture_uc.csv\",\"totalRecords\":3,\"failureRecords\":0,\"created\":\"2019-01-17 09:11:48 UTC\",\"successRecords\":3},{\"fileName\":\"email_capture_uc.csv\",\"totalRecords\":3,\"failureRecords\":0,\"created\":\"2019-01-17 09:11:03 UTC\",\"successRecords\":3},{\"fileName\":\"email_capture_uc.csv\",\"totalRecords\":3,\"failureRecords\":0,\"created\":\"2019-01-17 09:05:34 UTC\",\"successRecords\":3},{\"fileName\":\"email_capture_uc.csv\",\"totalRecords\":3,\"failureRecords\":0,\"created\":\"2019-01-17 09:01:56 UTC\",\"successRecords\":3},{\"fileName\":\"email_capture_uc.csv\",\"totalRecords\":3,\"failureRecords\":0,\"created\":\"2019-01-17 09:00:37 UTC\",\"successRecords\":3},{\"fileName\":\"email_capture_uc.csv\",\"totalRecords\":3,\"failureRecords\":0,\"created\":\"2019-01-17 08:59:24 UTC\",\"successRecords\":3},{\"fileName\":\"email_capture_uc.csv\",\"totalRecords\":3,\"failureRecords\":0,\"created\":\"2019-01-17 08:43:34 UTC\",\"successRecords\":3},{\"fileName\":\"email_capture_uc.csv\",\"totalRecords\":3,\"failureRecords\":0,\"created\":\"2019-01-08 09:41:03 UTC\",\"successRecords\":3},{\"totalRecords\":3,\"failureRecords\":0,\"created\":\"2019-01-08 09:19:58 UTC\",\"successRecords\":3},{\"totalRecords\":3,\"failureRecords\":0,\"created\":\"2019-01-08 08:38:31 UTC\",\"successRecords\":3},{\"totalRecords\":3,\"failureRecords\":0,\"created\":\"2019-01-08 08:37:57 UTC\",\"successRecords\":3},{\"totalRecords\":3,\"failureRecords\":1,\"created\":\"2019-01-08 08:37:05 UTC\",\"successRecords\":2,\"errors\":[{\"environment\":\"Production\",\"cobrandId\":10000004,\"errorMesages\":[\"FirstName is required at line 2\"],\"email\":\"apuneka@yodlee.com\"}]},{\"totalRecords\":3,\"failureRecords\":0,\"created\":\"2019-01-08 07:44:04 UTC\",\"successRecords\":3},{\"totalRecords\":3,\"failureRecords\":0,\"created\":\"2019-01-08 06:11:58 UTC\",\"successRecords\":3},{\"fileName\":\"userupload\",\"totalRecords\":4,\"failureRecords\":4,\"created\":\"2018-09-21 05:32:55 UTC\",\"successRecords\":0,\"errors\":[{\"environment\":\"Production\",\"cobrandId\":100000004,\"errorMesages\":[\"Duplicate values\"],\"email\":\"yy@yod1ee.com\"},{\"environment\":\"Production\",\"cobrandId\":100000004,\"errorMesages\":[\"Timezone is invalid at line 3\",\"Duplicate values\",\"Duplicate values\"],\"email\":\"yy@yodee.com\"}]},{\"fileName\":\"emailupload\",\"totalRecords\":4,\"failureRecords\":3,\"created\":\"2018-09-20 14:58:47 UTC\",\"successRecords\":1,\"errors\":[{\"environment\":\"Production\",\"cobrandId\":100000004,\"errorMesages\":[\"Timezone is invalid at line 3\",\"Duplicate values\",\"Duplicate values\"],\"email\":\"yy@yodee.com\"}]}]}");
	}
	
	@Test
	public void CobrandMappingTest() {
		this.filter.setCustomerId("10000004");
		this.filter.setUserContactInfoObj("{\"attachment\":{\"name\":\"prod_stage_mapping.csv\",\"content\":\"UHJvZF9jb2JyYW5kX0lELFN0YWdlX0NvYnJhbmRfSUQNCjEwMDAwMDA0LDEwMDAwMDA0fDEwMDAwMDA0fDENCg==\",\"fileSize\":64,\"type\":\"application/vnd.ms-excel\"}}");
		String response = this.userContactInfoController.uploadCobMapping("3099:fdskj",devAppIdHeader, this.filter);
		Assert.assertTrue(!response.contains("errorCode"), "CobrandMappingTest is not throwing some error - "+response);
		Assert.assertEquals(response, "{\"attachment\":{\"message\":\"Cobrand mapping data uploaded successfully\"}}");
	}

	
}
