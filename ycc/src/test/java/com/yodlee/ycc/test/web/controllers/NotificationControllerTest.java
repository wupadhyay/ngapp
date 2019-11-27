/**
 *
 * Copyright (c) 2018 Yodlee Inc. All Rights Reserved.
 *
 * This software is the confidential and proprietary information of Yodlee, Inc.
 * Use is subject to license terms.
 *
 */

package com.yodlee.ycc.test.web.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.Test;
import org.testng.Assert;
import com.yodlee.ycc.app.search.NotificationFilter;
import com.yodlee.ycc.app.web.controllers.NotificationController;
import com.yodlee.ycc.test.web.MainServiceTest;

/**
 * 
 * @author sjain5
 *
 */

public class NotificationControllerTest extends MainServiceTest{

	private static final String devAppIdHeader = "94AAC319-CF5E-4733-AA42-CA88C79C656D";
	
	@Autowired
	private NotificationController notificationController;

	private NotificationFilter filter;


	@BeforeClass
	public void setRequestParameters() {
		this.filter=new NotificationFilter();
	}

	@Test
	public void NotificationCreateTest() {
	this.filter.setCustomerId("10000004");
		this.filter.setNotificationCreateObj("{\"notification\":{\"notificationType\":\"Maintenance\",\"notificationSubType\":{\"id\":\"1\"},\"title\":\"df\",\"status\":{\"id\":\"1\"},\"serviceNowTicket\":\"f\",\"bugId\":\"f\",\"impact\":\"fds\",\"downtime\":{\"duration\":\"f\",\"interval\":\"Hours\"},\"criticality\":\"High\",\"description\":\"fs\",\"environment\":\"prod\"}}");
		String response = this.notificationController.createNotification("3099:fdskj",devAppIdHeader, this.filter);
		Assert.assertNotNull(response);
		Assert.assertTrue(!response.isEmpty(), "NotificationCreateTest is empty");
		Assert.assertTrue(!response.contains("errorCode"), "NotificationCreateTest is throwing some error - "+response);
		Assert.assertTrue(response.contains("\"id\":\"INC19\""), "NotificationCreateTest JSON is changed - "+response);
		Assert.assertEquals(response, "{\"notification\":{\"id\":\"INC19\"}}");
	}
	
	@Test
	public void NotificationCreateFailureForCobrandValueNullTest() {
		this.filter.setCustomerId("");
		this.filter.setNotificationCreateObj("{\"notification\":{\"notificationType\":\"Maintenance\",\"notificationSubType\":{\"id\":\"1\"},\"title\":\"df\",\"status\":{\"id\":\"1\"},\"serviceNowTicket\":\"f\",\"bugId\":\"f\",\"impact\":\"fds\",\"downtime\":{\"duration\":\"f\",\"interval\":\"Hours\"},\"criticality\":\"High\",\"description\":\"fs\",\"environment\":\"prod\"}}");
		String response = this.notificationController.createNotification("3099:fdskj",devAppIdHeader, this.filter);
		Assert.assertTrue(response.contains("errorCode"), "NotificationCreateFailureForCobrandValueNullTest is not throwing some error - "+response);
		this.filter.setCustomerId("10000004");
	}
	
	
	@Test
	public void NotificationCreateFailureForHeadersNullTest() {
		this.filter.setCustomerId("10000004");
		this.filter.setNotificationCreateObj("{\"notification\":{\"notificationType\":\"Maintenance\",\"notificationSubType\":{\"id\":\"1\"},\"title\":\"df\",\"status\":{\"id\":\"1\"},\"serviceNowTicket\":\"f\",\"bugId\":\"f\",\"impact\":\"fds\",\"downtime\":{\"duration\":\"f\",\"interval\":\"Hours\"},\"criticality\":\"High\",\"description\":\"fs\",\"environment\":\"prod\"}}");
		String response = this.notificationController.createNotification("","", this.filter);
		Assert.assertTrue(response.contains("errorCode"), "NotificationCreateFailureForHeadersNullTest is not throwing some error - "+response);
	}

	
	@Test
	public void NotificationCreateFailureForNullDataTest() {
		this.filter.setCustomerId("10000004");
		this.filter.setNotificationCreateObj("");
		String response = this.notificationController.createNotification("3099:fdskj",devAppIdHeader, this.filter);
		Assert.assertTrue(response.contains("errorCode"), "NotificationCreateFailureForNullDataTest is not throwing some error - "+response);
	}
	
	@Test
	public void NotificationSearchWithIdTest() {
		this.filter.setNotificationId("MN1");
		this.filter.setCriticality("");
		this.filter.setPriority("");
		this.filter.setBugNum("");
		this.filter.setEndTime("");
		this.filter.setNotificationStatus("");
		this.filter.setNotificationSubType("");
		this.filter.setNotificationType("");
		this.filter.setTicketNum("");
		this.filter.setStartTime("");
		this.filter.setNotificationSubStatus("");
		this.filter.setCobrandId("");
		this.filter.setAttachmentId("");
		this.filter.setTitle("");
		this.filter.setDescription("");
		this.filter.setIsExportRequest("");
		this.filter.setFromDate("");
		this.filter.setToDate("");
		String response = this.notificationController.searchNotificationForAllData("3099:fdskj",devAppIdHeader, this.filter);
		Assert.assertNotNull(response);
		Assert.assertTrue(!response.isEmpty(), "NotificationSearchWithId is empty");
		Assert.assertTrue(!response.contains("errorCode"), "NotificationSearchWithId is throwing some error - "+response);
		Assert.assertTrue(response.contains("\"notificationId\":\"MN1\""), "NotificationSearchWithId JSON is changed - "+response);
		Assert.assertEquals(response, "{\"notification\":[{\"attachments\":[{\"extension\":\"PDF\",\"name\":\"FILENAME\",\"type\":\"RCA\"}],\"created\":\"123\",\"customerSelectionCriteria\":{\"type\":\"DB\",\"value\":[\"exayod\",\"sddcaach\"]},\"impact\":\"100% impact\",\"description\":\"TESTING\",\"notificationType\":\"Maintenance\",\"title\":\"SAMPLE\",\"updates\":[{\"isInternal\":\"false\",\"createdBy\":\"userName\",\"createdTime\":\"123\",\"updateNumber\":1,\"message\":\"updating\",\"isResolved\":\"false\",\"cobrandInfo\":[{\"cobrandId\":10000004,\"name\":\"Yodlee\"}]},{\"isInternal\":\"false\",\"createdBy\":\"userName\",\"createdTime\":\"123\",\"updateNumber\":1,\"message\":\"updating\",\"isResolved\":\"false\",\"cobrandInfo\":[{\"cobrandId\":10000004,\"name\":\"Yodlee\"}]}],\"lastUpdated\":\"12312\",\"environment\":\"production\",\"createdBy\":\"userName\",\"publish\":{\"date\":\"12312\",\"postInfo\":\"true\"},\"notificationId\":\"MN1\",\"startTime\":\"2017-12-12 00:00:00\",\"endTime\":\"2017-12-12 00:00:00\",\"refrenceTicket\":{\"bugId\":1234,\"serviceNowTicket\":\"12333\",\"dependencies\":[\"123\",\"444\"]},\"maintenance\":{\"downTime\":{\"duration\":\"1.0\",\"intervalType\":\"h\",\"required\":true},\"notificationSubtype\":\"emergency\",\"criticality\":\"High\"},\"cobrandInfo\":[{\"cobrandId\":10000004,\"name\":\"Yodlee\"}],\"status\":\"Upcoming\"}]}");
	}
	
	@Test
	public void NotificationSearchWithoutParametersTest() {
		this.filter.setNotificationId("");
		this.filter.setCriticality("");
		this.filter.setPriority("");
		this.filter.setBugNum("");
		this.filter.setEndTime("");
		this.filter.setNotificationStatus("");
		this.filter.setNotificationSubType("");
		this.filter.setNotificationType("");
		this.filter.setTicketNum("");
		this.filter.setStartTime("");
		this.filter.setNotificationSubStatus("");
		this.filter.setCobrandId("");
		this.filter.setAttachmentId("");
		this.filter.setTitle("");
		this.filter.setDescription("");
		this.filter.setIsExportRequest("");
		this.filter.setFromDate("");
		this.filter.setToDate("");
		String response = this.notificationController.searchNotificationForAllData("3099:fdskj",devAppIdHeader, this.filter);
		Assert.assertTrue(response.contains("errorCode"), "NotificationSearchWithoutParametersTest is not throwing some error - "+response);
	}
	
	@Test
	public void NotificationSearchWithAllParametersTest() {
		this.filter.setNotificationId("MN1");
		this.filter.setCriticality("high");
		this.filter.setPriority("p1");
		this.filter.setBugNum("123");
		this.filter.setEnvironment("Production");
		this.filter.setEndTime("2018-06-20");
		this.filter.setNotificationStatus("1,2");
		this.filter.setNotificationSubType("Scheduled");
		this.filter.setNotificationType("MAINTENANCE,INCIDENT");
		this.filter.setTicketNum("S123");
		this.filter.setStartTime("2018-06-18");
		this.filter.setNotificationSubStatus("1");
		this.filter.setCobrandId("10000004");
		this.filter.setAttachmentId("1");
		this.filter.setTitle("Envestnet");
		this.filter.setDescription("M");
		this.filter.setIsExportRequest("true");
		this.filter.setFromDate("2018-06-20");
		this.filter.setToDate("2018-06-18");
		String response = this.notificationController.searchNotificationForAllData("3099:fdskj",devAppIdHeader, this.filter);
		Assert.assertNotNull(response);
		Assert.assertTrue(!response.isEmpty(), "NotificationSearchWithAllParametersTest is empty");
		Assert.assertTrue(!response.contains("errorCode"), "NotificationSearchWithAllParametersTest is throwing some error - "+response);
		Assert.assertTrue(response.contains("\"notificationId\":\"MN1\""), "NotificationSearchWithAllParametersTest JSON is changed - "+response);
		Assert.assertEquals(response, "{\"notification\":[{\"attachments\":[{\"extension\":\"PDF\",\"name\":\"FILENAME\",\"type\":\"RCA\"}],\"created\":\"123\",\"customerSelectionCriteria\":{\"type\":\"DB\",\"value\":[\"exayod\",\"sddcaach\"]},\"impact\":\"100% impact\",\"description\":\"TESTING\",\"notificationType\":\"Maintenance\",\"title\":\"SAMPLE\",\"updates\":[{\"isInternal\":\"false\",\"createdBy\":\"userName\",\"createdTime\":\"123\",\"updateNumber\":1,\"message\":\"updating\",\"isResolved\":\"false\",\"cobrandInfo\":[{\"cobrandId\":10000004,\"name\":\"Yodlee\"}]},{\"isInternal\":\"false\",\"createdBy\":\"userName\",\"createdTime\":\"123\",\"updateNumber\":1,\"message\":\"updating\",\"isResolved\":\"false\",\"cobrandInfo\":[{\"cobrandId\":10000004,\"name\":\"Yodlee\"}]}],\"lastUpdated\":\"12312\",\"environment\":\"production\",\"createdBy\":\"userName\",\"publish\":{\"date\":\"12312\",\"postInfo\":\"true\"},\"notificationId\":\"MN1\",\"startTime\":\"2017-12-12 00:00:00\",\"endTime\":\"2017-12-12 00:00:00\",\"refrenceTicket\":{\"bugId\":1234,\"serviceNowTicket\":\"12333\",\"dependencies\":[\"123\",\"444\"]},\"maintenance\":{\"downTime\":{\"duration\":\"1.0\",\"intervalType\":\"h\",\"required\":true},\"notificationSubtype\":\"emergency\",\"criticality\":\"High\"},\"cobrandInfo\":[{\"cobrandId\":10000004,\"name\":\"Yodlee\"}],\"status\":\"Upcoming\"}]}");
	}
	
	
	@Test
	public void NotificationSearchWithAllParametersWithPriorityTest() {
		this.filter.setNotificationId("");
		this.filter.setCriticality("");
		this.filter.setPriority("p1");
		this.filter.setBugNum("");
		this.filter.setEnvironment("");
		this.filter.setEndTime("");
		this.filter.setNotificationStatus("");
		this.filter.setNotificationSubType("");
		this.filter.setNotificationType("");
		this.filter.setTicketNum("");
		this.filter.setStartTime("");
		this.filter.setNotificationSubStatus("");
		this.filter.setCobrandId("");
		this.filter.setAttachmentId("");
		this.filter.setTitle("");
		this.filter.setDescription("");
		this.filter.setIsExportRequest("");
		this.filter.setFromDate("");
		this.filter.setToDate("");
		String response = this.notificationController.searchNotificationForAllData("3099:fdskj",devAppIdHeader, this.filter);
		Assert.assertNotNull(response);
		Assert.assertTrue(!response.isEmpty(), "NotificationSearchWithAllParametersTest is empty");
		Assert.assertTrue(!response.contains("errorCode"), "NotificationSearchWithAllParametersTest is throwing some error - "+response);
		Assert.assertTrue(response.contains("\"notificationId\":\"MN1\""), "NotificationSearchWithAllParametersTest JSON is changed - "+response);
		Assert.assertEquals(response, "{\"notification\":[{\"attachments\":[{\"extension\":\"PDF\",\"name\":\"FILENAME\",\"type\":\"RCA\"}],\"created\":\"123\",\"customerSelectionCriteria\":{\"type\":\"DB\",\"value\":[\"exayod\",\"sddcaach\"]},\"impact\":\"100% impact\",\"description\":\"TESTING\",\"notificationType\":\"Maintenance\",\"title\":\"SAMPLE\",\"updates\":[{\"isInternal\":\"false\",\"createdBy\":\"userName\",\"createdTime\":\"123\",\"updateNumber\":1,\"message\":\"updating\",\"isResolved\":\"false\",\"cobrandInfo\":[{\"cobrandId\":10000004,\"name\":\"Yodlee\"}]},{\"isInternal\":\"false\",\"createdBy\":\"userName\",\"createdTime\":\"123\",\"updateNumber\":1,\"message\":\"updating\",\"isResolved\":\"false\",\"cobrandInfo\":[{\"cobrandId\":10000004,\"name\":\"Yodlee\"}]}],\"lastUpdated\":\"12312\",\"environment\":\"production\",\"createdBy\":\"userName\",\"publish\":{\"date\":\"12312\",\"postInfo\":\"true\"},\"notificationId\":\"MN1\",\"startTime\":\"2017-12-12 00:00:00\",\"endTime\":\"2017-12-12 00:00:00\",\"refrenceTicket\":{\"bugId\":1234,\"serviceNowTicket\":\"12333\",\"dependencies\":[\"123\",\"444\"]},\"maintenance\":{\"downTime\":{\"duration\":\"1.0\",\"intervalType\":\"h\",\"required\":true},\"notificationSubtype\":\"emergency\",\"criticality\":\"High\"},\"cobrandInfo\":[{\"cobrandId\":10000004,\"name\":\"Yodlee\"}],\"status\":\"Upcoming\"}]}");
	}
	
	@Test
	public void NotificationSearchWithAllParametersExportTest() {
		this.filter.setNotificationId("");
		this.filter.setCriticality("");
		this.filter.setPriority("");
		this.filter.setBugNum("");
		this.filter.setEnvironment("");
		this.filter.setEndTime("");
		this.filter.setNotificationStatus("");
		this.filter.setNotificationSubType("");
		this.filter.setNotificationType("");
		this.filter.setTicketNum("");
		this.filter.setStartTime("");
		this.filter.setNotificationSubStatus("");
		this.filter.setCobrandId("");
		this.filter.setAttachmentId("");
		this.filter.setTitle("");
		this.filter.setDescription("");
		this.filter.setIsExportRequest("true");
		this.filter.setFromDate("");
		this.filter.setToDate("");
		String response = this.notificationController.searchNotificationForAllData("3099:fdskj",devAppIdHeader, this.filter);
		Assert.assertNotNull(response);
		Assert.assertTrue(!response.isEmpty(), "NotificationSearchWithAllParametersTest is empty");
		Assert.assertTrue(!response.contains("errorCode"), "NotificationSearchWithAllParametersTest is throwing some error - "+response);
		Assert.assertTrue(response.contains("\"notificationId\":\"MN1\""), "NotificationSearchWithAllParametersTest JSON is changed - "+response);
		Assert.assertEquals(response, "{\"notification\":[{\"attachments\":[{\"extension\":\"PDF\",\"name\":\"FILENAME\",\"type\":\"RCA\"}],\"created\":\"123\",\"customerSelectionCriteria\":{\"type\":\"DB\",\"value\":[\"exayod\",\"sddcaach\"]},\"impact\":\"100% impact\",\"description\":\"TESTING\",\"notificationType\":\"Maintenance\",\"title\":\"SAMPLE\",\"updates\":[{\"isInternal\":\"false\",\"createdBy\":\"userName\",\"createdTime\":\"123\",\"updateNumber\":1,\"message\":\"updating\",\"isResolved\":\"false\",\"cobrandInfo\":[{\"cobrandId\":10000004,\"name\":\"Yodlee\"}]},{\"isInternal\":\"false\",\"createdBy\":\"userName\",\"createdTime\":\"123\",\"updateNumber\":1,\"message\":\"updating\",\"isResolved\":\"false\",\"cobrandInfo\":[{\"cobrandId\":10000004,\"name\":\"Yodlee\"}]}],\"lastUpdated\":\"12312\",\"environment\":\"production\",\"createdBy\":\"userName\",\"publish\":{\"date\":\"12312\",\"postInfo\":\"true\"},\"notificationId\":\"MN1\",\"startTime\":\"2017-12-12 00:00:00\",\"endTime\":\"2017-12-12 00:00:00\",\"refrenceTicket\":{\"bugId\":1234,\"serviceNowTicket\":\"12333\",\"dependencies\":[\"123\",\"444\"]},\"maintenance\":{\"downTime\":{\"duration\":\"1.0\",\"intervalType\":\"h\",\"required\":true},\"notificationSubtype\":\"emergency\",\"criticality\":\"High\"},\"cobrandInfo\":[{\"cobrandId\":10000004,\"name\":\"Yodlee\"}],\"status\":\"Upcoming\"}]}");
	}
	
	@Test
	public void NotificationSearchWithAllParametersEnvironmentTest() {
		this.filter.setNotificationId("");
		this.filter.setCriticality("");
		this.filter.setPriority("");
		this.filter.setBugNum("");
		this.filter.setEnvironment("Production");
		this.filter.setEndTime("");
		this.filter.setNotificationStatus("");
		this.filter.setNotificationSubType("");
		this.filter.setNotificationType("");
		this.filter.setTicketNum("");
		this.filter.setStartTime("");
		this.filter.setNotificationSubStatus("");
		this.filter.setCobrandId("");
		this.filter.setAttachmentId("");
		this.filter.setTitle("");
		this.filter.setDescription("");
		this.filter.setIsExportRequest("");
		this.filter.setFromDate("");
		this.filter.setToDate("");
		String response = this.notificationController.searchNotificationForAllData("3099:fdskj",devAppIdHeader, this.filter);
		Assert.assertNotNull(response);
		Assert.assertTrue(!response.isEmpty(), "NotificationSearchWithAllParametersTest is empty");
		Assert.assertTrue(!response.contains("errorCode"), "NotificationSearchWithAllParametersTest is throwing some error - "+response);
		Assert.assertTrue(response.contains("\"notificationId\":\"MN1\""), "NotificationSearchWithAllParametersTest JSON is changed - "+response);
		Assert.assertEquals(response, "{\"notification\":[{\"attachments\":[{\"extension\":\"PDF\",\"name\":\"FILENAME\",\"type\":\"RCA\"}],\"created\":\"123\",\"customerSelectionCriteria\":{\"type\":\"DB\",\"value\":[\"exayod\",\"sddcaach\"]},\"impact\":\"100% impact\",\"description\":\"TESTING\",\"notificationType\":\"Maintenance\",\"title\":\"SAMPLE\",\"updates\":[{\"isInternal\":\"false\",\"createdBy\":\"userName\",\"createdTime\":\"123\",\"updateNumber\":1,\"message\":\"updating\",\"isResolved\":\"false\",\"cobrandInfo\":[{\"cobrandId\":10000004,\"name\":\"Yodlee\"}]},{\"isInternal\":\"false\",\"createdBy\":\"userName\",\"createdTime\":\"123\",\"updateNumber\":1,\"message\":\"updating\",\"isResolved\":\"false\",\"cobrandInfo\":[{\"cobrandId\":10000004,\"name\":\"Yodlee\"}]}],\"lastUpdated\":\"12312\",\"environment\":\"production\",\"createdBy\":\"userName\",\"publish\":{\"date\":\"12312\",\"postInfo\":\"true\"},\"notificationId\":\"MN1\",\"startTime\":\"2017-12-12 00:00:00\",\"endTime\":\"2017-12-12 00:00:00\",\"refrenceTicket\":{\"bugId\":1234,\"serviceNowTicket\":\"12333\",\"dependencies\":[\"123\",\"444\"]},\"maintenance\":{\"downTime\":{\"duration\":\"1.0\",\"intervalType\":\"h\",\"required\":true},\"notificationSubtype\":\"emergency\",\"criticality\":\"High\"},\"cobrandInfo\":[{\"cobrandId\":10000004,\"name\":\"Yodlee\"}],\"status\":\"Upcoming\"}]}");
	}
	
	@Test
	public void NotificationSearchWithAllParametersEndTimeTest() {
		this.filter.setNotificationId("");
		this.filter.setCriticality("");
		this.filter.setPriority("");
		this.filter.setBugNum("");
		this.filter.setEnvironment("");
		this.filter.setEndTime("2018-06-20");
		this.filter.setNotificationStatus("");
		this.filter.setNotificationSubType("");
		this.filter.setNotificationType("");
		this.filter.setTicketNum("");
		this.filter.setStartTime("");
		this.filter.setNotificationSubStatus("");
		this.filter.setCobrandId("");
		this.filter.setAttachmentId("");
		this.filter.setTitle("");
		this.filter.setDescription("");
		this.filter.setIsExportRequest("");
		this.filter.setFromDate("");
		this.filter.setToDate("");
		String response = this.notificationController.searchNotificationForAllData("3099:fdskj",devAppIdHeader, this.filter);
		Assert.assertNotNull(response);
		Assert.assertTrue(!response.isEmpty(), "NotificationSearchWithAllParametersTest is empty");
		Assert.assertTrue(!response.contains("errorCode"), "NotificationSearchWithAllParametersTest is throwing some error - "+response);
		Assert.assertTrue(response.contains("\"notificationId\":\"MN1\""), "NotificationSearchWithAllParametersTest JSON is changed - "+response);
		Assert.assertEquals(response, "{\"notification\":[{\"attachments\":[{\"extension\":\"PDF\",\"name\":\"FILENAME\",\"type\":\"RCA\"}],\"created\":\"123\",\"customerSelectionCriteria\":{\"type\":\"DB\",\"value\":[\"exayod\",\"sddcaach\"]},\"impact\":\"100% impact\",\"description\":\"TESTING\",\"notificationType\":\"Maintenance\",\"title\":\"SAMPLE\",\"updates\":[{\"isInternal\":\"false\",\"createdBy\":\"userName\",\"createdTime\":\"123\",\"updateNumber\":1,\"message\":\"updating\",\"isResolved\":\"false\",\"cobrandInfo\":[{\"cobrandId\":10000004,\"name\":\"Yodlee\"}]},{\"isInternal\":\"false\",\"createdBy\":\"userName\",\"createdTime\":\"123\",\"updateNumber\":1,\"message\":\"updating\",\"isResolved\":\"false\",\"cobrandInfo\":[{\"cobrandId\":10000004,\"name\":\"Yodlee\"}]}],\"lastUpdated\":\"12312\",\"environment\":\"production\",\"createdBy\":\"userName\",\"publish\":{\"date\":\"12312\",\"postInfo\":\"true\"},\"notificationId\":\"MN1\",\"startTime\":\"2017-12-12 00:00:00\",\"endTime\":\"2017-12-12 00:00:00\",\"refrenceTicket\":{\"bugId\":1234,\"serviceNowTicket\":\"12333\",\"dependencies\":[\"123\",\"444\"]},\"maintenance\":{\"downTime\":{\"duration\":\"1.0\",\"intervalType\":\"h\",\"required\":true},\"notificationSubtype\":\"emergency\",\"criticality\":\"High\"},\"cobrandInfo\":[{\"cobrandId\":10000004,\"name\":\"Yodlee\"}],\"status\":\"Upcoming\"}]}");
	}
	
	@Test
	public void NotificationSearchWithAllParametersStatusTest() {
		this.filter.setNotificationId("");
		this.filter.setCriticality("");
		this.filter.setPriority("");
		this.filter.setBugNum("");
		this.filter.setEnvironment("");
		this.filter.setEndTime("");
		this.filter.setNotificationStatus("1,2");
		this.filter.setNotificationSubType("");
		this.filter.setNotificationType("");
		this.filter.setTicketNum("");
		this.filter.setStartTime("");
		this.filter.setNotificationSubStatus("");
		this.filter.setCobrandId("");
		this.filter.setAttachmentId("");
		this.filter.setTitle("");
		this.filter.setDescription("");
		this.filter.setIsExportRequest("");
		this.filter.setFromDate("");
		this.filter.setToDate("");
		String response = this.notificationController.searchNotificationForAllData("3099:fdskj",devAppIdHeader, this.filter);
		Assert.assertNotNull(response);
		Assert.assertTrue(!response.isEmpty(), "NotificationSearchWithAllParametersTest is empty");
		Assert.assertTrue(!response.contains("errorCode"), "NotificationSearchWithAllParametersTest is throwing some error - "+response);
		Assert.assertTrue(response.contains("\"notificationId\":\"MN1\""), "NotificationSearchWithAllParametersTest JSON is changed - "+response);
		Assert.assertEquals(response, "{\"notification\":[{\"attachments\":[{\"extension\":\"PDF\",\"name\":\"FILENAME\",\"type\":\"RCA\"}],\"created\":\"123\",\"customerSelectionCriteria\":{\"type\":\"DB\",\"value\":[\"exayod\",\"sddcaach\"]},\"impact\":\"100% impact\",\"description\":\"TESTING\",\"notificationType\":\"Maintenance\",\"title\":\"SAMPLE\",\"updates\":[{\"isInternal\":\"false\",\"createdBy\":\"userName\",\"createdTime\":\"123\",\"updateNumber\":1,\"message\":\"updating\",\"isResolved\":\"false\",\"cobrandInfo\":[{\"cobrandId\":10000004,\"name\":\"Yodlee\"}]},{\"isInternal\":\"false\",\"createdBy\":\"userName\",\"createdTime\":\"123\",\"updateNumber\":1,\"message\":\"updating\",\"isResolved\":\"false\",\"cobrandInfo\":[{\"cobrandId\":10000004,\"name\":\"Yodlee\"}]}],\"lastUpdated\":\"12312\",\"environment\":\"production\",\"createdBy\":\"userName\",\"publish\":{\"date\":\"12312\",\"postInfo\":\"true\"},\"notificationId\":\"MN1\",\"startTime\":\"2017-12-12 00:00:00\",\"endTime\":\"2017-12-12 00:00:00\",\"refrenceTicket\":{\"bugId\":1234,\"serviceNowTicket\":\"12333\",\"dependencies\":[\"123\",\"444\"]},\"maintenance\":{\"downTime\":{\"duration\":\"1.0\",\"intervalType\":\"h\",\"required\":true},\"notificationSubtype\":\"emergency\",\"criticality\":\"High\"},\"cobrandInfo\":[{\"cobrandId\":10000004,\"name\":\"Yodlee\"}],\"status\":\"Upcoming\"}]}");
	}
	
	@Test
	public void NotificationSearchWithAllParametersSubTypeTest() {
		this.filter.setNotificationId("");
		this.filter.setCriticality("");
		this.filter.setPriority("");
		this.filter.setBugNum("");
		this.filter.setEnvironment("");
		this.filter.setEndTime("");
		this.filter.setNotificationStatus("");
		this.filter.setNotificationSubType("Scheduled");
		this.filter.setNotificationType("");
		this.filter.setTicketNum("");
		this.filter.setStartTime("");
		this.filter.setNotificationSubStatus("");
		this.filter.setCobrandId("");
		this.filter.setAttachmentId("");
		this.filter.setTitle("");
		this.filter.setDescription("");
		this.filter.setIsExportRequest("");
		this.filter.setFromDate("");
		this.filter.setToDate("");
		String response = this.notificationController.searchNotificationForAllData("3099:fdskj",devAppIdHeader, this.filter);
		Assert.assertNotNull(response);
		Assert.assertTrue(!response.isEmpty(), "NotificationSearchWithAllParametersTest is empty");
		Assert.assertTrue(!response.contains("errorCode"), "NotificationSearchWithAllParametersTest is throwing some error - "+response);
		Assert.assertTrue(response.contains("\"notificationId\":\"MN1\""), "NotificationSearchWithAllParametersTest JSON is changed - "+response);
		Assert.assertEquals(response, "{\"notification\":[{\"attachments\":[{\"extension\":\"PDF\",\"name\":\"FILENAME\",\"type\":\"RCA\"}],\"created\":\"123\",\"customerSelectionCriteria\":{\"type\":\"DB\",\"value\":[\"exayod\",\"sddcaach\"]},\"impact\":\"100% impact\",\"description\":\"TESTING\",\"notificationType\":\"Maintenance\",\"title\":\"SAMPLE\",\"updates\":[{\"isInternal\":\"false\",\"createdBy\":\"userName\",\"createdTime\":\"123\",\"updateNumber\":1,\"message\":\"updating\",\"isResolved\":\"false\",\"cobrandInfo\":[{\"cobrandId\":10000004,\"name\":\"Yodlee\"}]},{\"isInternal\":\"false\",\"createdBy\":\"userName\",\"createdTime\":\"123\",\"updateNumber\":1,\"message\":\"updating\",\"isResolved\":\"false\",\"cobrandInfo\":[{\"cobrandId\":10000004,\"name\":\"Yodlee\"}]}],\"lastUpdated\":\"12312\",\"environment\":\"production\",\"createdBy\":\"userName\",\"publish\":{\"date\":\"12312\",\"postInfo\":\"true\"},\"notificationId\":\"MN1\",\"startTime\":\"2017-12-12 00:00:00\",\"endTime\":\"2017-12-12 00:00:00\",\"refrenceTicket\":{\"bugId\":1234,\"serviceNowTicket\":\"12333\",\"dependencies\":[\"123\",\"444\"]},\"maintenance\":{\"downTime\":{\"duration\":\"1.0\",\"intervalType\":\"h\",\"required\":true},\"notificationSubtype\":\"emergency\",\"criticality\":\"High\"},\"cobrandInfo\":[{\"cobrandId\":10000004,\"name\":\"Yodlee\"}],\"status\":\"Upcoming\"}]}");
	}
	
	@Test
	public void NotificationSearchWithAllParametersTypeTest() {
		this.filter.setNotificationId("");
		this.filter.setCriticality("");
		this.filter.setPriority("");
		this.filter.setBugNum("");
		this.filter.setEnvironment("");
		this.filter.setEndTime("");
		this.filter.setNotificationStatus("");
		this.filter.setNotificationSubType("");
		this.filter.setNotificationType("MAINTENANCE,INCIDENT");
		this.filter.setTicketNum("");
		this.filter.setStartTime("");
		this.filter.setNotificationSubStatus("");
		this.filter.setCobrandId("");
		this.filter.setAttachmentId("");
		this.filter.setTitle("");
		this.filter.setDescription("");
		this.filter.setIsExportRequest("");
		this.filter.setFromDate("");
		this.filter.setToDate("");
		String response = this.notificationController.searchNotificationForAllData("3099:fdskj",devAppIdHeader, this.filter);
		Assert.assertNotNull(response);
		Assert.assertTrue(!response.isEmpty(), "NotificationSearchWithAllParametersTest is empty");
		Assert.assertTrue(!response.contains("errorCode"), "NotificationSearchWithAllParametersTest is throwing some error - "+response);
		Assert.assertTrue(response.contains("\"notificationId\":\"MN1\""), "NotificationSearchWithAllParametersTest JSON is changed - "+response);
		Assert.assertEquals(response, "{\"notification\":[{\"attachments\":[{\"extension\":\"PDF\",\"name\":\"FILENAME\",\"type\":\"RCA\"}],\"created\":\"123\",\"customerSelectionCriteria\":{\"type\":\"DB\",\"value\":[\"exayod\",\"sddcaach\"]},\"impact\":\"100% impact\",\"description\":\"TESTING\",\"notificationType\":\"Maintenance\",\"title\":\"SAMPLE\",\"updates\":[{\"isInternal\":\"false\",\"createdBy\":\"userName\",\"createdTime\":\"123\",\"updateNumber\":1,\"message\":\"updating\",\"isResolved\":\"false\",\"cobrandInfo\":[{\"cobrandId\":10000004,\"name\":\"Yodlee\"}]},{\"isInternal\":\"false\",\"createdBy\":\"userName\",\"createdTime\":\"123\",\"updateNumber\":1,\"message\":\"updating\",\"isResolved\":\"false\",\"cobrandInfo\":[{\"cobrandId\":10000004,\"name\":\"Yodlee\"}]}],\"lastUpdated\":\"12312\",\"environment\":\"production\",\"createdBy\":\"userName\",\"publish\":{\"date\":\"12312\",\"postInfo\":\"true\"},\"notificationId\":\"MN1\",\"startTime\":\"2017-12-12 00:00:00\",\"endTime\":\"2017-12-12 00:00:00\",\"refrenceTicket\":{\"bugId\":1234,\"serviceNowTicket\":\"12333\",\"dependencies\":[\"123\",\"444\"]},\"maintenance\":{\"downTime\":{\"duration\":\"1.0\",\"intervalType\":\"h\",\"required\":true},\"notificationSubtype\":\"emergency\",\"criticality\":\"High\"},\"cobrandInfo\":[{\"cobrandId\":10000004,\"name\":\"Yodlee\"}],\"status\":\"Upcoming\"}]}");
	}
	
	@Test
	public void NotificationSearchWithAllParametersTicketTest() {
		this.filter.setNotificationId("");
		this.filter.setCriticality("");
		this.filter.setPriority("");
		this.filter.setBugNum("");
		this.filter.setEnvironment("");
		this.filter.setEndTime("");
		this.filter.setNotificationStatus("");
		this.filter.setNotificationSubType("");
		this.filter.setNotificationType("");
		this.filter.setTicketNum("S123");
		this.filter.setStartTime("");
		this.filter.setNotificationSubStatus("");
		this.filter.setCobrandId("");
		this.filter.setAttachmentId("");
		this.filter.setTitle("");
		this.filter.setDescription("");
		this.filter.setIsExportRequest("");
		this.filter.setFromDate("");
		this.filter.setToDate("");
		String response = this.notificationController.searchNotificationForAllData("3099:fdskj",devAppIdHeader, this.filter);
		Assert.assertNotNull(response);
		Assert.assertTrue(!response.isEmpty(), "NotificationSearchWithAllParametersTest is empty");
		Assert.assertTrue(!response.contains("errorCode"), "NotificationSearchWithAllParametersTest is throwing some error - "+response);
		Assert.assertTrue(response.contains("\"notificationId\":\"MN1\""), "NotificationSearchWithAllParametersTest JSON is changed - "+response);
		Assert.assertEquals(response, "{\"notification\":[{\"attachments\":[{\"extension\":\"PDF\",\"name\":\"FILENAME\",\"type\":\"RCA\"}],\"created\":\"123\",\"customerSelectionCriteria\":{\"type\":\"DB\",\"value\":[\"exayod\",\"sddcaach\"]},\"impact\":\"100% impact\",\"description\":\"TESTING\",\"notificationType\":\"Maintenance\",\"title\":\"SAMPLE\",\"updates\":[{\"isInternal\":\"false\",\"createdBy\":\"userName\",\"createdTime\":\"123\",\"updateNumber\":1,\"message\":\"updating\",\"isResolved\":\"false\",\"cobrandInfo\":[{\"cobrandId\":10000004,\"name\":\"Yodlee\"}]},{\"isInternal\":\"false\",\"createdBy\":\"userName\",\"createdTime\":\"123\",\"updateNumber\":1,\"message\":\"updating\",\"isResolved\":\"false\",\"cobrandInfo\":[{\"cobrandId\":10000004,\"name\":\"Yodlee\"}]}],\"lastUpdated\":\"12312\",\"environment\":\"production\",\"createdBy\":\"userName\",\"publish\":{\"date\":\"12312\",\"postInfo\":\"true\"},\"notificationId\":\"MN1\",\"startTime\":\"2017-12-12 00:00:00\",\"endTime\":\"2017-12-12 00:00:00\",\"refrenceTicket\":{\"bugId\":1234,\"serviceNowTicket\":\"12333\",\"dependencies\":[\"123\",\"444\"]},\"maintenance\":{\"downTime\":{\"duration\":\"1.0\",\"intervalType\":\"h\",\"required\":true},\"notificationSubtype\":\"emergency\",\"criticality\":\"High\"},\"cobrandInfo\":[{\"cobrandId\":10000004,\"name\":\"Yodlee\"}],\"status\":\"Upcoming\"}]}");
	}
	
	
	@Test
	public void NotificationSearchWithAllParametersStartTimeTest() {
		this.filter.setNotificationId("");
		this.filter.setCriticality("");
		this.filter.setPriority("");
		this.filter.setBugNum("");
		this.filter.setEnvironment("");
		this.filter.setEndTime("");
		this.filter.setNotificationStatus("");
		this.filter.setNotificationSubType("");
		this.filter.setNotificationType("");
		this.filter.setTicketNum("");
		this.filter.setStartTime("2018-06-18");
		this.filter.setNotificationSubStatus("");
		this.filter.setCobrandId("");
		this.filter.setAttachmentId("");
		this.filter.setTitle("");
		this.filter.setDescription("");
		this.filter.setIsExportRequest("");
		this.filter.setFromDate("");
		this.filter.setToDate("");
		String response = this.notificationController.searchNotificationForAllData("3099:fdskj",devAppIdHeader, this.filter);
		Assert.assertNotNull(response);
		Assert.assertTrue(!response.isEmpty(), "NotificationSearchWithAllParametersTest is empty");
		Assert.assertTrue(!response.contains("errorCode"), "NotificationSearchWithAllParametersTest is throwing some error - "+response);
		Assert.assertTrue(response.contains("\"notificationId\":\"MN1\""), "NotificationSearchWithAllParametersTest JSON is changed - "+response);
		Assert.assertEquals(response, "{\"notification\":[{\"attachments\":[{\"extension\":\"PDF\",\"name\":\"FILENAME\",\"type\":\"RCA\"}],\"created\":\"123\",\"customerSelectionCriteria\":{\"type\":\"DB\",\"value\":[\"exayod\",\"sddcaach\"]},\"impact\":\"100% impact\",\"description\":\"TESTING\",\"notificationType\":\"Maintenance\",\"title\":\"SAMPLE\",\"updates\":[{\"isInternal\":\"false\",\"createdBy\":\"userName\",\"createdTime\":\"123\",\"updateNumber\":1,\"message\":\"updating\",\"isResolved\":\"false\",\"cobrandInfo\":[{\"cobrandId\":10000004,\"name\":\"Yodlee\"}]},{\"isInternal\":\"false\",\"createdBy\":\"userName\",\"createdTime\":\"123\",\"updateNumber\":1,\"message\":\"updating\",\"isResolved\":\"false\",\"cobrandInfo\":[{\"cobrandId\":10000004,\"name\":\"Yodlee\"}]}],\"lastUpdated\":\"12312\",\"environment\":\"production\",\"createdBy\":\"userName\",\"publish\":{\"date\":\"12312\",\"postInfo\":\"true\"},\"notificationId\":\"MN1\",\"startTime\":\"2017-12-12 00:00:00\",\"endTime\":\"2017-12-12 00:00:00\",\"refrenceTicket\":{\"bugId\":1234,\"serviceNowTicket\":\"12333\",\"dependencies\":[\"123\",\"444\"]},\"maintenance\":{\"downTime\":{\"duration\":\"1.0\",\"intervalType\":\"h\",\"required\":true},\"notificationSubtype\":\"emergency\",\"criticality\":\"High\"},\"cobrandInfo\":[{\"cobrandId\":10000004,\"name\":\"Yodlee\"}],\"status\":\"Upcoming\"}]}");
	}
	
	@Test
	public void NotificationSearchWithAllParametersSubStatusTest() {
		this.filter.setNotificationId("");
		this.filter.setCriticality("");
		this.filter.setPriority("");
		this.filter.setBugNum("");
		this.filter.setEnvironment("");
		this.filter.setEndTime("");
		this.filter.setNotificationStatus("");
		this.filter.setNotificationSubType("");
		this.filter.setNotificationType("");
		this.filter.setTicketNum("");
		this.filter.setStartTime("");
		this.filter.setNotificationSubStatus("1");
		this.filter.setCobrandId("");
		this.filter.setAttachmentId("");
		this.filter.setTitle("");
		this.filter.setDescription("");
		this.filter.setIsExportRequest("");
		this.filter.setFromDate("");
		this.filter.setToDate("");
		String response = this.notificationController.searchNotificationForAllData("3099:fdskj",devAppIdHeader, this.filter);
		Assert.assertNotNull(response);
		Assert.assertTrue(!response.isEmpty(), "NotificationSearchWithAllParametersTest is empty");
		Assert.assertTrue(!response.contains("errorCode"), "NotificationSearchWithAllParametersTest is throwing some error - "+response);
		Assert.assertTrue(response.contains("\"notificationId\":\"MN1\""), "NotificationSearchWithAllParametersTest JSON is changed - "+response);
		Assert.assertEquals(response, "{\"notification\":[{\"attachments\":[{\"extension\":\"PDF\",\"name\":\"FILENAME\",\"type\":\"RCA\"}],\"created\":\"123\",\"customerSelectionCriteria\":{\"type\":\"DB\",\"value\":[\"exayod\",\"sddcaach\"]},\"impact\":\"100% impact\",\"description\":\"TESTING\",\"notificationType\":\"Maintenance\",\"title\":\"SAMPLE\",\"updates\":[{\"isInternal\":\"false\",\"createdBy\":\"userName\",\"createdTime\":\"123\",\"updateNumber\":1,\"message\":\"updating\",\"isResolved\":\"false\",\"cobrandInfo\":[{\"cobrandId\":10000004,\"name\":\"Yodlee\"}]},{\"isInternal\":\"false\",\"createdBy\":\"userName\",\"createdTime\":\"123\",\"updateNumber\":1,\"message\":\"updating\",\"isResolved\":\"false\",\"cobrandInfo\":[{\"cobrandId\":10000004,\"name\":\"Yodlee\"}]}],\"lastUpdated\":\"12312\",\"environment\":\"production\",\"createdBy\":\"userName\",\"publish\":{\"date\":\"12312\",\"postInfo\":\"true\"},\"notificationId\":\"MN1\",\"startTime\":\"2017-12-12 00:00:00\",\"endTime\":\"2017-12-12 00:00:00\",\"refrenceTicket\":{\"bugId\":1234,\"serviceNowTicket\":\"12333\",\"dependencies\":[\"123\",\"444\"]},\"maintenance\":{\"downTime\":{\"duration\":\"1.0\",\"intervalType\":\"h\",\"required\":true},\"notificationSubtype\":\"emergency\",\"criticality\":\"High\"},\"cobrandInfo\":[{\"cobrandId\":10000004,\"name\":\"Yodlee\"}],\"status\":\"Upcoming\"}]}");
	}
	
	@Test
	public void NotificationSearchWithAllParametersCobIDTest() {
		this.filter.setNotificationId("");
		this.filter.setCriticality("");
		this.filter.setPriority("");
		this.filter.setBugNum("");
		this.filter.setEnvironment("");
		this.filter.setEndTime("");
		this.filter.setNotificationStatus("");
		this.filter.setNotificationSubType("");
		this.filter.setNotificationType("");
		this.filter.setTicketNum("");
		this.filter.setStartTime("");
		this.filter.setNotificationSubStatus("");
		this.filter.setCobrandId("10000004");
		this.filter.setAttachmentId("");
		this.filter.setTitle("");
		this.filter.setDescription("");
		this.filter.setIsExportRequest("");
		this.filter.setFromDate("");
		this.filter.setToDate("");
		String response = this.notificationController.searchNotificationForAllData("3099:fdskj",devAppIdHeader, this.filter);
		Assert.assertNotNull(response);
		Assert.assertTrue(!response.isEmpty(), "NotificationSearchWithAllParametersTest is empty");
		Assert.assertTrue(!response.contains("errorCode"), "NotificationSearchWithAllParametersTest is throwing some error - "+response);
		Assert.assertTrue(response.contains("\"notificationId\":\"MN1\""), "NotificationSearchWithAllParametersTest JSON is changed - "+response);
		Assert.assertEquals(response, "{\"notification\":[{\"attachments\":[{\"extension\":\"PDF\",\"name\":\"FILENAME\",\"type\":\"RCA\"}],\"created\":\"123\",\"customerSelectionCriteria\":{\"type\":\"DB\",\"value\":[\"exayod\",\"sddcaach\"]},\"impact\":\"100% impact\",\"description\":\"TESTING\",\"notificationType\":\"Maintenance\",\"title\":\"SAMPLE\",\"updates\":[{\"isInternal\":\"false\",\"createdBy\":\"userName\",\"createdTime\":\"123\",\"updateNumber\":1,\"message\":\"updating\",\"isResolved\":\"false\",\"cobrandInfo\":[{\"cobrandId\":10000004,\"name\":\"Yodlee\"}]},{\"isInternal\":\"false\",\"createdBy\":\"userName\",\"createdTime\":\"123\",\"updateNumber\":1,\"message\":\"updating\",\"isResolved\":\"false\",\"cobrandInfo\":[{\"cobrandId\":10000004,\"name\":\"Yodlee\"}]}],\"lastUpdated\":\"12312\",\"environment\":\"production\",\"createdBy\":\"userName\",\"publish\":{\"date\":\"12312\",\"postInfo\":\"true\"},\"notificationId\":\"MN1\",\"startTime\":\"2017-12-12 00:00:00\",\"endTime\":\"2017-12-12 00:00:00\",\"refrenceTicket\":{\"bugId\":1234,\"serviceNowTicket\":\"12333\",\"dependencies\":[\"123\",\"444\"]},\"maintenance\":{\"downTime\":{\"duration\":\"1.0\",\"intervalType\":\"h\",\"required\":true},\"notificationSubtype\":\"emergency\",\"criticality\":\"High\"},\"cobrandInfo\":[{\"cobrandId\":10000004,\"name\":\"Yodlee\"}],\"status\":\"Upcoming\"}]}");
	}
	
	@Test
	public void NotificationSearchWithAllParametersCobIDVarTest() {
		this.filter.setNotificationId("");
		this.filter.setCriticality("");
		this.filter.setPriority("");
		this.filter.setBugNum("");
		this.filter.setEnvironment("");
		this.filter.setEndTime("");
		this.filter.setNotificationStatus("");
		this.filter.setNotificationSubType("");
		this.filter.setNotificationType("");
		this.filter.setTicketNum("");
		this.filter.setStartTime("");
		this.filter.setNotificationSubStatus("");
		this.filter.setCobrandId("[10000004]");
		this.filter.setAttachmentId("");
		this.filter.setTitle("");
		this.filter.setDescription("");
		this.filter.setIsExportRequest("");
		this.filter.setFromDate("");
		this.filter.setToDate("");
		String response = this.notificationController.searchNotificationForAllData("3099:fdskj",devAppIdHeader, this.filter);
		Assert.assertNotNull(response);
		Assert.assertTrue(!response.isEmpty(), "NotificationSearchWithAllParametersTest is empty");
		Assert.assertTrue(!response.contains("errorCode"), "NotificationSearchWithAllParametersTest is throwing some error - "+response);
		Assert.assertTrue(response.contains("\"notificationId\":\"MN1\""), "NotificationSearchWithAllParametersTest JSON is changed - "+response);
		Assert.assertEquals(response, "{\"notification\":[{\"attachments\":[{\"extension\":\"PDF\",\"name\":\"FILENAME\",\"type\":\"RCA\"}],\"created\":\"123\",\"customerSelectionCriteria\":{\"type\":\"DB\",\"value\":[\"exayod\",\"sddcaach\"]},\"impact\":\"100% impact\",\"description\":\"TESTING\",\"notificationType\":\"Maintenance\",\"title\":\"SAMPLE\",\"updates\":[{\"isInternal\":\"false\",\"createdBy\":\"userName\",\"createdTime\":\"123\",\"updateNumber\":1,\"message\":\"updating\",\"isResolved\":\"false\",\"cobrandInfo\":[{\"cobrandId\":10000004,\"name\":\"Yodlee\"}]},{\"isInternal\":\"false\",\"createdBy\":\"userName\",\"createdTime\":\"123\",\"updateNumber\":1,\"message\":\"updating\",\"isResolved\":\"false\",\"cobrandInfo\":[{\"cobrandId\":10000004,\"name\":\"Yodlee\"}]}],\"lastUpdated\":\"12312\",\"environment\":\"production\",\"createdBy\":\"userName\",\"publish\":{\"date\":\"12312\",\"postInfo\":\"true\"},\"notificationId\":\"MN1\",\"startTime\":\"2017-12-12 00:00:00\",\"endTime\":\"2017-12-12 00:00:00\",\"refrenceTicket\":{\"bugId\":1234,\"serviceNowTicket\":\"12333\",\"dependencies\":[\"123\",\"444\"]},\"maintenance\":{\"downTime\":{\"duration\":\"1.0\",\"intervalType\":\"h\",\"required\":true},\"notificationSubtype\":\"emergency\",\"criticality\":\"High\"},\"cobrandInfo\":[{\"cobrandId\":10000004,\"name\":\"Yodlee\"}],\"status\":\"Upcoming\"}]}");
	}
	
	@Test
	public void NotificationSearchWithFewParametersTest() {
		this.filter.setNotificationId("MN1");
		this.filter.setCriticality("");
		this.filter.setPriority("");
		this.filter.setBugNum("123");
		this.filter.setEndTime("");
		this.filter.setNotificationStatus("1,2");
		this.filter.setNotificationSubType("Scheduled");
		this.filter.setNotificationType("MAINTENANCE,INCIDENT");
		this.filter.setTicketNum("S123");
		this.filter.setStartTime("");
		this.filter.setNotificationSubStatus("1");
		this.filter.setCobrandId("10000004");
		this.filter.setAttachmentId("");
		this.filter.setTitle("");
		this.filter.setDescription("");
		this.filter.setIsExportRequest("");
		this.filter.setFromDate("");
		this.filter.setToDate("");
		String response = this.notificationController.searchNotificationForAllData("3099:fdskj",devAppIdHeader, this.filter);
		Assert.assertNotNull(response);
		Assert.assertTrue(!response.isEmpty(), "NotificationSearchWithFewParametersTest is empty");
		Assert.assertTrue(!response.contains("errorCode"), "NotificationSearchWithFewParametersTest is throwing some error - "+response);
		Assert.assertTrue(response.contains("\"notificationId\":\"MN1\""), "NotificationSearchWithFewParametersTest JSON is changed - "+response);
		Assert.assertEquals(response, "{\"notification\":[{\"attachments\":[{\"extension\":\"PDF\",\"name\":\"FILENAME\",\"type\":\"RCA\"}],\"created\":\"123\",\"customerSelectionCriteria\":{\"type\":\"DB\",\"value\":[\"exayod\",\"sddcaach\"]},\"impact\":\"100% impact\",\"description\":\"TESTING\",\"notificationType\":\"Maintenance\",\"title\":\"SAMPLE\",\"updates\":[{\"isInternal\":\"false\",\"createdBy\":\"userName\",\"createdTime\":\"123\",\"updateNumber\":1,\"message\":\"updating\",\"isResolved\":\"false\",\"cobrandInfo\":[{\"cobrandId\":10000004,\"name\":\"Yodlee\"}]},{\"isInternal\":\"false\",\"createdBy\":\"userName\",\"createdTime\":\"123\",\"updateNumber\":1,\"message\":\"updating\",\"isResolved\":\"false\",\"cobrandInfo\":[{\"cobrandId\":10000004,\"name\":\"Yodlee\"}]}],\"lastUpdated\":\"12312\",\"environment\":\"production\",\"createdBy\":\"userName\",\"publish\":{\"date\":\"12312\",\"postInfo\":\"true\"},\"notificationId\":\"MN1\",\"startTime\":\"2017-12-12 00:00:00\",\"endTime\":\"2017-12-12 00:00:00\",\"refrenceTicket\":{\"bugId\":1234,\"serviceNowTicket\":\"12333\",\"dependencies\":[\"123\",\"444\"]},\"maintenance\":{\"downTime\":{\"duration\":\"1.0\",\"intervalType\":\"h\",\"required\":true},\"notificationSubtype\":\"emergency\",\"criticality\":\"High\"},\"cobrandInfo\":[{\"cobrandId\":10000004,\"name\":\"Yodlee\"}],\"status\":\"Upcoming\"}]}");
	}
	
	
	
	@Test
	public void NotificationSearchWithFewParametersTestForTier1() {
		this.filter.setNotificationId("MN1");
		this.filter.setCriticality("");
		this.filter.setPriority("");
		this.filter.setBugNum("");
		this.filter.setEndTime("");
		this.filter.setEnvironment("Production");
		this.filter.setNotificationStatus("1,2");
		this.filter.setNotificationSubType("");
		this.filter.setNotificationType("MAINTENANCE,INCIDENT");
		this.filter.setTicketNum("");
		this.filter.setStartTime("");
		this.filter.setNotificationSubStatus("");
		this.filter.setCobrandId("10000004");
		this.filter.setAttachmentId("");
		this.filter.setTitle("test");
		this.filter.setDescription("test");
		this.filter.setIsExportRequest("");
		this.filter.setFromDate("2018-06-20");
		this.filter.setToDate("2018-06-23");
		this.filter.setNotificationObj("");
		String response = this.notificationController.searchNotification("3099:fdskj",devAppIdHeader, this.filter);
		Assert.assertNotNull(response);
		Assert.assertTrue(!response.isEmpty(), "NotificationSearchWithFewParametersTestForTier1 is empty");
		Assert.assertTrue(!response.contains("errorCode"), "NotificationSearchWithFewParametersTestForTier1 is throwing some error - "+response);
		Assert.assertTrue(response.contains("\"notificationId\":\"MN1\""), "NotificationSearchWithFewParametersTestForTier1 JSON is changed - "+response);
		Assert.assertEquals(response, "{\"notification\":[{\"attachments\":[{\"extension\":\"PDF\",\"name\":\"FILENAME\",\"type\":\"RCA\"}],\"created\":\"123\",\"customerSelectionCriteria\":{\"type\":\"DB\",\"value\":[\"exayod\",\"sddcaach\"]},\"impact\":\"100% impact\",\"description\":\"TESTING\",\"notificationType\":\"Maintenance\",\"title\":\"SAMPLE\",\"updates\":[{\"isInternal\":\"false\",\"createdBy\":\"userName\",\"createdTime\":\"123\",\"updateNumber\":1,\"message\":\"updating\",\"isResolved\":\"false\",\"cobrandInfo\":[{\"cobrandId\":10000004,\"name\":\"Yodlee\"}]},{\"isInternal\":\"false\",\"createdBy\":\"userName\",\"createdTime\":\"123\",\"updateNumber\":1,\"message\":\"updating\",\"isResolved\":\"false\",\"cobrandInfo\":[{\"cobrandId\":10000004,\"name\":\"Yodlee\"}]}],\"lastUpdated\":\"12312\",\"environment\":\"production\",\"createdBy\":\"userName\",\"publish\":{\"date\":\"12312\",\"postInfo\":\"true\"},\"notificationId\":\"MN1\",\"startTime\":\"2017-12-12 00:00:00\",\"endTime\":\"2017-12-12 00:00:00\",\"refrenceTicket\":{\"bugId\":1234,\"serviceNowTicket\":\"12333\",\"dependencies\":[\"123\",\"444\"]},\"maintenance\":{\"downTime\":{\"duration\":\"1.0\",\"intervalType\":\"h\",\"required\":true},\"notificationSubtype\":\"emergency\",\"criticality\":\"High\"},\"cobrandInfo\":[{\"cobrandId\":10000004,\"name\":\"Yodlee\"}],\"status\":\"Upcoming\"}]}");
	}
	
	@Test
	public void NotificationSearchWithFewParametersTestForOnlyToDateTier1() {
		this.filter.setNotificationId("");
		this.filter.setCriticality("");
		this.filter.setPriority("");
		this.filter.setEnvironment("");
		this.filter.setBugNum("");
		this.filter.setEndTime("");
		this.filter.setNotificationStatus("");
		this.filter.setNotificationSubType("");
		this.filter.setNotificationType("");
		this.filter.setTicketNum("");
		this.filter.setStartTime("");
		this.filter.setNotificationSubStatus("");
		this.filter.setCobrandId("");
		this.filter.setAttachmentId("");
		this.filter.setTitle("");
		this.filter.setDescription("");
		this.filter.setIsExportRequest("");
		this.filter.setFromDate("");
		this.filter.setToDate("2018-06-23");
		this.filter.setNotificationObj("");
		String response = this.notificationController.searchNotification("3099:fdskj",devAppIdHeader, this.filter);
		Assert.assertNotNull(response);
		Assert.assertTrue(!response.isEmpty(), "NotificationSearchWithFewParametersTestForTier1 is empty");
		Assert.assertTrue(!response.contains("errorCode"), "NotificationSearchWithFewParametersTestForTier1 is throwing some error - "+response);
		Assert.assertTrue(response.contains("\"notificationId\":\"MN1\""), "NotificationSearchWithFewParametersTestForTier1 JSON is changed - "+response);
		Assert.assertEquals(response, "{\"notification\":[{\"attachments\":[{\"extension\":\"PDF\",\"name\":\"FILENAME\",\"type\":\"RCA\"}],\"created\":\"123\",\"customerSelectionCriteria\":{\"type\":\"DB\",\"value\":[\"exayod\",\"sddcaach\"]},\"impact\":\"100% impact\",\"description\":\"TESTING\",\"notificationType\":\"Maintenance\",\"title\":\"SAMPLE\",\"updates\":[{\"isInternal\":\"false\",\"createdBy\":\"userName\",\"createdTime\":\"123\",\"updateNumber\":1,\"message\":\"updating\",\"isResolved\":\"false\",\"cobrandInfo\":[{\"cobrandId\":10000004,\"name\":\"Yodlee\"}]},{\"isInternal\":\"false\",\"createdBy\":\"userName\",\"createdTime\":\"123\",\"updateNumber\":1,\"message\":\"updating\",\"isResolved\":\"false\",\"cobrandInfo\":[{\"cobrandId\":10000004,\"name\":\"Yodlee\"}]}],\"lastUpdated\":\"12312\",\"environment\":\"production\",\"createdBy\":\"userName\",\"publish\":{\"date\":\"12312\",\"postInfo\":\"true\"},\"notificationId\":\"MN1\",\"startTime\":\"2017-12-12 00:00:00\",\"endTime\":\"2017-12-12 00:00:00\",\"refrenceTicket\":{\"bugId\":1234,\"serviceNowTicket\":\"12333\",\"dependencies\":[\"123\",\"444\"]},\"maintenance\":{\"downTime\":{\"duration\":\"1.0\",\"intervalType\":\"h\",\"required\":true},\"notificationSubtype\":\"emergency\",\"criticality\":\"High\"},\"cobrandInfo\":[{\"cobrandId\":10000004,\"name\":\"Yodlee\"}],\"status\":\"Upcoming\"}]}");
	}
	
	
	@Test
	public void NotificationSearchWithFewParametersTestForOnlyTitleTier1() {
		this.filter.setNotificationId("");
		this.filter.setCriticality("");
		this.filter.setPriority("");
		this.filter.setBugNum("");
		this.filter.setEndTime("");
		this.filter.setEnvironment("");
		this.filter.setNotificationStatus("");
		this.filter.setNotificationSubType("");
		this.filter.setNotificationType("");
		this.filter.setTicketNum("");
		this.filter.setStartTime("");
		this.filter.setNotificationSubStatus("");
		this.filter.setCobrandId("");
		this.filter.setAttachmentId("");
		this.filter.setTitle("test");
		this.filter.setDescription("");
		this.filter.setIsExportRequest("");
		this.filter.setFromDate("");
		this.filter.setToDate("");
		this.filter.setNotificationObj("");
		String response = this.notificationController.searchNotification("3099:fdskj",devAppIdHeader, this.filter);
		Assert.assertNotNull(response);
		Assert.assertTrue(!response.isEmpty(), "NotificationSearchWithFewParametersTestForTier1 is empty");
		Assert.assertTrue(!response.contains("errorCode"), "NotificationSearchWithFewParametersTestForTier1 is throwing some error - "+response);
		Assert.assertTrue(response.contains("\"notificationId\":\"MN1\""), "NotificationSearchWithFewParametersTestForTier1 JSON is changed - "+response);
		Assert.assertEquals(response, "{\"notification\":[{\"attachments\":[{\"extension\":\"PDF\",\"name\":\"FILENAME\",\"type\":\"RCA\"}],\"created\":\"123\",\"customerSelectionCriteria\":{\"type\":\"DB\",\"value\":[\"exayod\",\"sddcaach\"]},\"impact\":\"100% impact\",\"description\":\"TESTING\",\"notificationType\":\"Maintenance\",\"title\":\"SAMPLE\",\"updates\":[{\"isInternal\":\"false\",\"createdBy\":\"userName\",\"createdTime\":\"123\",\"updateNumber\":1,\"message\":\"updating\",\"isResolved\":\"false\",\"cobrandInfo\":[{\"cobrandId\":10000004,\"name\":\"Yodlee\"}]},{\"isInternal\":\"false\",\"createdBy\":\"userName\",\"createdTime\":\"123\",\"updateNumber\":1,\"message\":\"updating\",\"isResolved\":\"false\",\"cobrandInfo\":[{\"cobrandId\":10000004,\"name\":\"Yodlee\"}]}],\"lastUpdated\":\"12312\",\"environment\":\"production\",\"createdBy\":\"userName\",\"publish\":{\"date\":\"12312\",\"postInfo\":\"true\"},\"notificationId\":\"MN1\",\"startTime\":\"2017-12-12 00:00:00\",\"endTime\":\"2017-12-12 00:00:00\",\"refrenceTicket\":{\"bugId\":1234,\"serviceNowTicket\":\"12333\",\"dependencies\":[\"123\",\"444\"]},\"maintenance\":{\"downTime\":{\"duration\":\"1.0\",\"intervalType\":\"h\",\"required\":true},\"notificationSubtype\":\"emergency\",\"criticality\":\"High\"},\"cobrandInfo\":[{\"cobrandId\":10000004,\"name\":\"Yodlee\"}],\"status\":\"Upcoming\"}]}");
	}

	@Test
	public void NotificationSearchWithFewParametersTestForOnlyDescTier1() {
		this.filter.setNotificationId("");
		this.filter.setCriticality("");
		this.filter.setPriority("");
		this.filter.setBugNum("");
		this.filter.setEndTime("");
		this.filter.setEnvironment("");
		this.filter.setNotificationStatus("");
		this.filter.setNotificationSubType("");
		this.filter.setNotificationType("");
		this.filter.setTicketNum("");
		this.filter.setStartTime("");
		this.filter.setNotificationSubStatus("");
		this.filter.setCobrandId("");
		this.filter.setAttachmentId("");
		this.filter.setTitle("");
		this.filter.setDescription("test");
		this.filter.setIsExportRequest("");
		this.filter.setFromDate("");
		this.filter.setToDate("");
		this.filter.setNotificationObj("");
		String response = this.notificationController.searchNotification("3099:fdskj",devAppIdHeader, this.filter);
		Assert.assertNotNull(response);
		Assert.assertTrue(!response.isEmpty(), "NotificationSearchWithFewParametersTestForTier1 is empty");
		Assert.assertTrue(!response.contains("errorCode"), "NotificationSearchWithFewParametersTestForTier1 is throwing some error - "+response);
		Assert.assertTrue(response.contains("\"notificationId\":\"MN1\""), "NotificationSearchWithFewParametersTestForTier1 JSON is changed - "+response);
		Assert.assertEquals(response, "{\"notification\":[{\"attachments\":[{\"extension\":\"PDF\",\"name\":\"FILENAME\",\"type\":\"RCA\"}],\"created\":\"123\",\"customerSelectionCriteria\":{\"type\":\"DB\",\"value\":[\"exayod\",\"sddcaach\"]},\"impact\":\"100% impact\",\"description\":\"TESTING\",\"notificationType\":\"Maintenance\",\"title\":\"SAMPLE\",\"updates\":[{\"isInternal\":\"false\",\"createdBy\":\"userName\",\"createdTime\":\"123\",\"updateNumber\":1,\"message\":\"updating\",\"isResolved\":\"false\",\"cobrandInfo\":[{\"cobrandId\":10000004,\"name\":\"Yodlee\"}]},{\"isInternal\":\"false\",\"createdBy\":\"userName\",\"createdTime\":\"123\",\"updateNumber\":1,\"message\":\"updating\",\"isResolved\":\"false\",\"cobrandInfo\":[{\"cobrandId\":10000004,\"name\":\"Yodlee\"}]}],\"lastUpdated\":\"12312\",\"environment\":\"production\",\"createdBy\":\"userName\",\"publish\":{\"date\":\"12312\",\"postInfo\":\"true\"},\"notificationId\":\"MN1\",\"startTime\":\"2017-12-12 00:00:00\",\"endTime\":\"2017-12-12 00:00:00\",\"refrenceTicket\":{\"bugId\":1234,\"serviceNowTicket\":\"12333\",\"dependencies\":[\"123\",\"444\"]},\"maintenance\":{\"downTime\":{\"duration\":\"1.0\",\"intervalType\":\"h\",\"required\":true},\"notificationSubtype\":\"emergency\",\"criticality\":\"High\"},\"cobrandInfo\":[{\"cobrandId\":10000004,\"name\":\"Yodlee\"}],\"status\":\"Upcoming\"}]}");
	}
	
	
	@Test
	public void NotificationSearchWithFewParametersTestForOnlyFromDateTier1() {
		this.filter.setNotificationId("");
		this.filter.setCriticality("");
		this.filter.setPriority("");
		this.filter.setBugNum("");
		this.filter.setEnvironment("");
		this.filter.setEndTime("");
		this.filter.setNotificationStatus("");
		this.filter.setNotificationSubType("");
		this.filter.setNotificationType("");
		this.filter.setTicketNum("");
		this.filter.setStartTime("");
		this.filter.setNotificationSubStatus("");
		this.filter.setCobrandId("");
		this.filter.setAttachmentId("");
		this.filter.setTitle("");
		this.filter.setDescription("");
		this.filter.setIsExportRequest("");
		this.filter.setFromDate("2018-06-20");
		this.filter.setToDate("");
		this.filter.setNotificationObj("");
		String response = this.notificationController.searchNotification("3099:fdskj",devAppIdHeader, this.filter);
		Assert.assertNotNull(response);
		Assert.assertTrue(!response.isEmpty(), "NotificationSearchWithFewParametersTestForTier1 is empty");
		Assert.assertTrue(!response.contains("errorCode"), "NotificationSearchWithFewParametersTestForTier1 is throwing some error - "+response);
		Assert.assertTrue(response.contains("\"notificationId\":\"MN1\""), "NotificationSearchWithFewParametersTestForTier1 JSON is changed - "+response);
		Assert.assertEquals(response, "{\"notification\":[{\"attachments\":[{\"extension\":\"PDF\",\"name\":\"FILENAME\",\"type\":\"RCA\"}],\"created\":\"123\",\"customerSelectionCriteria\":{\"type\":\"DB\",\"value\":[\"exayod\",\"sddcaach\"]},\"impact\":\"100% impact\",\"description\":\"TESTING\",\"notificationType\":\"Maintenance\",\"title\":\"SAMPLE\",\"updates\":[{\"isInternal\":\"false\",\"createdBy\":\"userName\",\"createdTime\":\"123\",\"updateNumber\":1,\"message\":\"updating\",\"isResolved\":\"false\",\"cobrandInfo\":[{\"cobrandId\":10000004,\"name\":\"Yodlee\"}]},{\"isInternal\":\"false\",\"createdBy\":\"userName\",\"createdTime\":\"123\",\"updateNumber\":1,\"message\":\"updating\",\"isResolved\":\"false\",\"cobrandInfo\":[{\"cobrandId\":10000004,\"name\":\"Yodlee\"}]}],\"lastUpdated\":\"12312\",\"environment\":\"production\",\"createdBy\":\"userName\",\"publish\":{\"date\":\"12312\",\"postInfo\":\"true\"},\"notificationId\":\"MN1\",\"startTime\":\"2017-12-12 00:00:00\",\"endTime\":\"2017-12-12 00:00:00\",\"refrenceTicket\":{\"bugId\":1234,\"serviceNowTicket\":\"12333\",\"dependencies\":[\"123\",\"444\"]},\"maintenance\":{\"downTime\":{\"duration\":\"1.0\",\"intervalType\":\"h\",\"required\":true},\"notificationSubtype\":\"emergency\",\"criticality\":\"High\"},\"cobrandInfo\":[{\"cobrandId\":10000004,\"name\":\"Yodlee\"}],\"status\":\"Upcoming\"}]}");
	}
	
	@Test
	public void NotificationSearchWithFewParametersTestForIdTier1() {
		this.filter.setNotificationId("MN1");
		this.filter.setCriticality("");
		this.filter.setPriority("");
		this.filter.setBugNum("");
		this.filter.setEndTime("");
		this.filter.setNotificationStatus("");
		this.filter.setNotificationSubType("");
		this.filter.setNotificationType("");
		this.filter.setTicketNum("");
		this.filter.setEnvironment("");
		this.filter.setStartTime("");
		this.filter.setNotificationSubStatus("");
		this.filter.setCobrandId("");
		this.filter.setAttachmentId("");
		this.filter.setTitle("");
		this.filter.setDescription("");
		this.filter.setIsExportRequest("");
		this.filter.setFromDate("");
		this.filter.setToDate("");
		this.filter.setNotificationObj("");
		String response = this.notificationController.searchNotification("3099:fdskj",devAppIdHeader, this.filter);
		Assert.assertNotNull(response);
		Assert.assertTrue(!response.isEmpty(), "NotificationSearchWithFewParametersTestForTier1 is empty");
		Assert.assertTrue(!response.contains("errorCode"), "NotificationSearchWithFewParametersTestForTier1 is throwing some error - "+response);
		Assert.assertTrue(response.contains("\"notificationId\":\"MN1\""), "NotificationSearchWithFewParametersTestForTier1 JSON is changed - "+response);
		Assert.assertEquals(response, "{\"notification\":[{\"attachments\":[{\"extension\":\"PDF\",\"name\":\"FILENAME\",\"type\":\"RCA\"}],\"created\":\"123\",\"customerSelectionCriteria\":{\"type\":\"DB\",\"value\":[\"exayod\",\"sddcaach\"]},\"impact\":\"100% impact\",\"description\":\"TESTING\",\"notificationType\":\"Maintenance\",\"title\":\"SAMPLE\",\"updates\":[{\"isInternal\":\"false\",\"createdBy\":\"userName\",\"createdTime\":\"123\",\"updateNumber\":1,\"message\":\"updating\",\"isResolved\":\"false\",\"cobrandInfo\":[{\"cobrandId\":10000004,\"name\":\"Yodlee\"}]},{\"isInternal\":\"false\",\"createdBy\":\"userName\",\"createdTime\":\"123\",\"updateNumber\":1,\"message\":\"updating\",\"isResolved\":\"false\",\"cobrandInfo\":[{\"cobrandId\":10000004,\"name\":\"Yodlee\"}]}],\"lastUpdated\":\"12312\",\"environment\":\"production\",\"createdBy\":\"userName\",\"publish\":{\"date\":\"12312\",\"postInfo\":\"true\"},\"notificationId\":\"MN1\",\"startTime\":\"2017-12-12 00:00:00\",\"endTime\":\"2017-12-12 00:00:00\",\"refrenceTicket\":{\"bugId\":1234,\"serviceNowTicket\":\"12333\",\"dependencies\":[\"123\",\"444\"]},\"maintenance\":{\"downTime\":{\"duration\":\"1.0\",\"intervalType\":\"h\",\"required\":true},\"notificationSubtype\":\"emergency\",\"criticality\":\"High\"},\"cobrandInfo\":[{\"cobrandId\":10000004,\"name\":\"Yodlee\"}],\"status\":\"Upcoming\"}]}");
	}
	
	@Test
	public void NotificationSearchWithFewParametersTestForStatusTier1() {
		this.filter.setNotificationId("");
		this.filter.setCriticality("");
		this.filter.setPriority("");
		this.filter.setBugNum("");
		this.filter.setEndTime("");
		this.filter.setNotificationStatus("1,2");
		this.filter.setEnvironment("");
		this.filter.setNotificationSubType("");
		this.filter.setNotificationType("");
		this.filter.setTicketNum("");
		this.filter.setStartTime("");
		this.filter.setNotificationSubStatus("");
		this.filter.setCobrandId("");
		this.filter.setAttachmentId("");
		this.filter.setTitle("");
		this.filter.setDescription("");
		this.filter.setIsExportRequest("");
		this.filter.setFromDate("");
		this.filter.setToDate("");
		this.filter.setNotificationObj("");
		String response = this.notificationController.searchNotification("3099:fdskj",devAppIdHeader, this.filter);
		Assert.assertNotNull(response);
		Assert.assertTrue(!response.isEmpty(), "NotificationSearchWithFewParametersTestForTier1 is empty");
		Assert.assertTrue(!response.contains("errorCode"), "NotificationSearchWithFewParametersTestForTier1 is throwing some error - "+response);
		Assert.assertTrue(response.contains("\"notificationId\":\"MN1\""), "NotificationSearchWithFewParametersTestForTier1 JSON is changed - "+response);
		Assert.assertEquals(response, "{\"notification\":[{\"attachments\":[{\"extension\":\"PDF\",\"name\":\"FILENAME\",\"type\":\"RCA\"}],\"created\":\"123\",\"customerSelectionCriteria\":{\"type\":\"DB\",\"value\":[\"exayod\",\"sddcaach\"]},\"impact\":\"100% impact\",\"description\":\"TESTING\",\"notificationType\":\"Maintenance\",\"title\":\"SAMPLE\",\"updates\":[{\"isInternal\":\"false\",\"createdBy\":\"userName\",\"createdTime\":\"123\",\"updateNumber\":1,\"message\":\"updating\",\"isResolved\":\"false\",\"cobrandInfo\":[{\"cobrandId\":10000004,\"name\":\"Yodlee\"}]},{\"isInternal\":\"false\",\"createdBy\":\"userName\",\"createdTime\":\"123\",\"updateNumber\":1,\"message\":\"updating\",\"isResolved\":\"false\",\"cobrandInfo\":[{\"cobrandId\":10000004,\"name\":\"Yodlee\"}]}],\"lastUpdated\":\"12312\",\"environment\":\"production\",\"createdBy\":\"userName\",\"publish\":{\"date\":\"12312\",\"postInfo\":\"true\"},\"notificationId\":\"MN1\",\"startTime\":\"2017-12-12 00:00:00\",\"endTime\":\"2017-12-12 00:00:00\",\"refrenceTicket\":{\"bugId\":1234,\"serviceNowTicket\":\"12333\",\"dependencies\":[\"123\",\"444\"]},\"maintenance\":{\"downTime\":{\"duration\":\"1.0\",\"intervalType\":\"h\",\"required\":true},\"notificationSubtype\":\"emergency\",\"criticality\":\"High\"},\"cobrandInfo\":[{\"cobrandId\":10000004,\"name\":\"Yodlee\"}],\"status\":\"Upcoming\"}]}");
	}
	
	@Test
	public void NotificationSearchWithFewParametersTestForTypeTier1() {
		this.filter.setNotificationId("");
		this.filter.setCriticality("");
		this.filter.setPriority("");
		this.filter.setEnvironment("");
		this.filter.setBugNum("");
		this.filter.setEndTime("");
		this.filter.setNotificationStatus("");
		this.filter.setNotificationSubType("");
		this.filter.setNotificationType("MAINTENANCE,INCIDENT");
		this.filter.setTicketNum("");
		this.filter.setStartTime("");
		this.filter.setNotificationSubStatus("");
		this.filter.setCobrandId("");
		this.filter.setAttachmentId("");
		this.filter.setTitle("");
		this.filter.setDescription("");
		this.filter.setIsExportRequest("");
		this.filter.setFromDate("");
		this.filter.setToDate("");
		this.filter.setNotificationObj("");
		String response = this.notificationController.searchNotification("3099:fdskj",devAppIdHeader, this.filter);
		Assert.assertNotNull(response);
		Assert.assertTrue(!response.isEmpty(), "NotificationSearchWithFewParametersTestForTier1 is empty");
		Assert.assertTrue(!response.contains("errorCode"), "NotificationSearchWithFewParametersTestForTier1 is throwing some error - "+response);
		Assert.assertTrue(response.contains("\"notificationId\":\"MN1\""), "NotificationSearchWithFewParametersTestForTier1 JSON is changed - "+response);
		Assert.assertEquals(response, "{\"notification\":[{\"attachments\":[{\"extension\":\"PDF\",\"name\":\"FILENAME\",\"type\":\"RCA\"}],\"created\":\"123\",\"customerSelectionCriteria\":{\"type\":\"DB\",\"value\":[\"exayod\",\"sddcaach\"]},\"impact\":\"100% impact\",\"description\":\"TESTING\",\"notificationType\":\"Maintenance\",\"title\":\"SAMPLE\",\"updates\":[{\"isInternal\":\"false\",\"createdBy\":\"userName\",\"createdTime\":\"123\",\"updateNumber\":1,\"message\":\"updating\",\"isResolved\":\"false\",\"cobrandInfo\":[{\"cobrandId\":10000004,\"name\":\"Yodlee\"}]},{\"isInternal\":\"false\",\"createdBy\":\"userName\",\"createdTime\":\"123\",\"updateNumber\":1,\"message\":\"updating\",\"isResolved\":\"false\",\"cobrandInfo\":[{\"cobrandId\":10000004,\"name\":\"Yodlee\"}]}],\"lastUpdated\":\"12312\",\"environment\":\"production\",\"createdBy\":\"userName\",\"publish\":{\"date\":\"12312\",\"postInfo\":\"true\"},\"notificationId\":\"MN1\",\"startTime\":\"2017-12-12 00:00:00\",\"endTime\":\"2017-12-12 00:00:00\",\"refrenceTicket\":{\"bugId\":1234,\"serviceNowTicket\":\"12333\",\"dependencies\":[\"123\",\"444\"]},\"maintenance\":{\"downTime\":{\"duration\":\"1.0\",\"intervalType\":\"h\",\"required\":true},\"notificationSubtype\":\"emergency\",\"criticality\":\"High\"},\"cobrandInfo\":[{\"cobrandId\":10000004,\"name\":\"Yodlee\"}],\"status\":\"Upcoming\"}]}");
	}
	
	
	@Test
	public void NotificationSearchWithFewParametersTestForCobrandIdTier1() {
		this.filter.setNotificationId("");
		this.filter.setCriticality("");
		this.filter.setPriority("");
		this.filter.setBugNum("");
		this.filter.setEndTime("");
		this.filter.setNotificationStatus("");
		this.filter.setNotificationSubType("");
		this.filter.setEnvironment("");
		this.filter.setNotificationType("");
		this.filter.setTicketNum("");
		this.filter.setStartTime("");
		this.filter.setNotificationSubStatus("");
		this.filter.setCobrandId("10000004");
		this.filter.setAttachmentId("");
		this.filter.setTitle("");
		this.filter.setDescription("");
		this.filter.setIsExportRequest("");
		this.filter.setFromDate("");
		this.filter.setToDate("");
		this.filter.setNotificationObj("");
		String response = this.notificationController.searchNotification("3099:fdskj",devAppIdHeader, this.filter);
		Assert.assertNotNull(response);
		Assert.assertTrue(!response.isEmpty(), "NotificationSearchWithFewParametersTestForTier1 is empty");
		Assert.assertTrue(!response.contains("errorCode"), "NotificationSearchWithFewParametersTestForTier1 is throwing some error - "+response);
		Assert.assertTrue(response.contains("\"notificationId\":\"MN1\""), "NotificationSearchWithFewParametersTestForTier1 JSON is changed - "+response);
		Assert.assertEquals(response, "{\"notification\":[{\"attachments\":[{\"extension\":\"PDF\",\"name\":\"FILENAME\",\"type\":\"RCA\"}],\"created\":\"123\",\"customerSelectionCriteria\":{\"type\":\"DB\",\"value\":[\"exayod\",\"sddcaach\"]},\"impact\":\"100% impact\",\"description\":\"TESTING\",\"notificationType\":\"Maintenance\",\"title\":\"SAMPLE\",\"updates\":[{\"isInternal\":\"false\",\"createdBy\":\"userName\",\"createdTime\":\"123\",\"updateNumber\":1,\"message\":\"updating\",\"isResolved\":\"false\",\"cobrandInfo\":[{\"cobrandId\":10000004,\"name\":\"Yodlee\"}]},{\"isInternal\":\"false\",\"createdBy\":\"userName\",\"createdTime\":\"123\",\"updateNumber\":1,\"message\":\"updating\",\"isResolved\":\"false\",\"cobrandInfo\":[{\"cobrandId\":10000004,\"name\":\"Yodlee\"}]}],\"lastUpdated\":\"12312\",\"environment\":\"production\",\"createdBy\":\"userName\",\"publish\":{\"date\":\"12312\",\"postInfo\":\"true\"},\"notificationId\":\"MN1\",\"startTime\":\"2017-12-12 00:00:00\",\"endTime\":\"2017-12-12 00:00:00\",\"refrenceTicket\":{\"bugId\":1234,\"serviceNowTicket\":\"12333\",\"dependencies\":[\"123\",\"444\"]},\"maintenance\":{\"downTime\":{\"duration\":\"1.0\",\"intervalType\":\"h\",\"required\":true},\"notificationSubtype\":\"emergency\",\"criticality\":\"High\"},\"cobrandInfo\":[{\"cobrandId\":10000004,\"name\":\"Yodlee\"}],\"status\":\"Upcoming\"}]}");
	}
	
	
	@Test
	public void NotificationSearchWithFewParametersTestForCobrandIdParamTier1() {
		this.filter.setNotificationId("");
		this.filter.setCriticality("");
		this.filter.setPriority("");
		this.filter.setBugNum("");
		this.filter.setEndTime("");
		this.filter.setNotificationStatus("");
		this.filter.setNotificationSubType("");
		this.filter.setNotificationType("");
		this.filter.setTicketNum("");
		this.filter.setStartTime("");
		this.filter.setEnvironment("");
		this.filter.setNotificationSubStatus("");
		this.filter.setCobrandId("[10000004]");
		this.filter.setAttachmentId("");
		this.filter.setTitle("");
		this.filter.setDescription("");
		this.filter.setIsExportRequest("");
		this.filter.setFromDate("");
		this.filter.setToDate("");
		this.filter.setNotificationObj("");
		String response = this.notificationController.searchNotification("3099:fdskj",devAppIdHeader, this.filter);
		Assert.assertNotNull(response);
		Assert.assertTrue(!response.isEmpty(), "NotificationSearchWithFewParametersTestForTier1 is empty");
		Assert.assertTrue(!response.contains("errorCode"), "NotificationSearchWithFewParametersTestForTier1 is throwing some error - "+response);
		Assert.assertTrue(response.contains("\"notificationId\":\"MN1\""), "NotificationSearchWithFewParametersTestForTier1 JSON is changed - "+response);
		Assert.assertEquals(response, "{\"notification\":[{\"attachments\":[{\"extension\":\"PDF\",\"name\":\"FILENAME\",\"type\":\"RCA\"}],\"created\":\"123\",\"customerSelectionCriteria\":{\"type\":\"DB\",\"value\":[\"exayod\",\"sddcaach\"]},\"impact\":\"100% impact\",\"description\":\"TESTING\",\"notificationType\":\"Maintenance\",\"title\":\"SAMPLE\",\"updates\":[{\"isInternal\":\"false\",\"createdBy\":\"userName\",\"createdTime\":\"123\",\"updateNumber\":1,\"message\":\"updating\",\"isResolved\":\"false\",\"cobrandInfo\":[{\"cobrandId\":10000004,\"name\":\"Yodlee\"}]},{\"isInternal\":\"false\",\"createdBy\":\"userName\",\"createdTime\":\"123\",\"updateNumber\":1,\"message\":\"updating\",\"isResolved\":\"false\",\"cobrandInfo\":[{\"cobrandId\":10000004,\"name\":\"Yodlee\"}]}],\"lastUpdated\":\"12312\",\"environment\":\"production\",\"createdBy\":\"userName\",\"publish\":{\"date\":\"12312\",\"postInfo\":\"true\"},\"notificationId\":\"MN1\",\"startTime\":\"2017-12-12 00:00:00\",\"endTime\":\"2017-12-12 00:00:00\",\"refrenceTicket\":{\"bugId\":1234,\"serviceNowTicket\":\"12333\",\"dependencies\":[\"123\",\"444\"]},\"maintenance\":{\"downTime\":{\"duration\":\"1.0\",\"intervalType\":\"h\",\"required\":true},\"notificationSubtype\":\"emergency\",\"criticality\":\"High\"},\"cobrandInfo\":[{\"cobrandId\":10000004,\"name\":\"Yodlee\"}],\"status\":\"Upcoming\"}]}");
	}
	
	@Test
	public void DownloadFile() {
		this.filter.setNotificationId("");
		this.filter.setCriticality("");
		this.filter.setPriority("");
		this.filter.setBugNum("");
		this.filter.setEndTime("");
		this.filter.setNotificationStatus("");
		this.filter.setNotificationSubType("");
		this.filter.setNotificationType("");
		this.filter.setTicketNum("");
		this.filter.setStartTime("");
		this.filter.setNotificationSubStatus("");
		this.filter.setCobrandId("");
		this.filter.setAttachmentId("5c0a796310c71c3305ca62ca");
		this.filter.setTitle("");
		this.filter.setDescription("");
		this.filter.setIsExportRequest("");
		this.filter.setFromDate("");
		this.filter.setToDate("");
		this.filter.setNotificationObj("");
		String response = this.notificationController.downloadFile("3099:fdskj",devAppIdHeader, this.filter);
		Assert.assertNotNull(response);
		Assert.assertTrue(!response.isEmpty(), "DownloadFile is empty");
		Assert.assertTrue(!response.contains("errorCode"), "DownloadFile is throwing some error - "+response);
		Assert.assertTrue(response.contains("Dummy"), "DownloadFile JSON is changed - "+response);
		Assert.assertEquals(response, "{\"attachment\":{\"extension\":\"txt\",\"name\":\"Dummy\",\"attachmentId\":\"5c0a796310c71c3305ca62ca\",\"content\":\"DQpwdWJsaWMgY2xhc3MgRHVtbXkgew0KCXB1YmxpYyBzdGF0aWMgdm9pZCBtYWluKFN0cmluZ1tdIGFyZ3MpIHsNCgkJDQoJCWlmKHRydWUpDQoJCXsNCgkJCVN5c3RlbS5vdXQucHJpbnRsbigiSGVsbG8iKTsNCgkJCVN5c3RlbS5vdXQucHJpbnRsbigieW9vbyIpOw0KCQl9DQoJfQ0KDQp9DQo=\"}}");
	}

	
	@Test
	public void NotificationEditWithAllFieldsTest() {
		this.filter.setCustomerId("10000004");
		this.filter.setNotificationId("MN139");
		this.filter.setNotificationCreateObj("{\"notification\":{\"impact\":\"456423\",\"referenceTicket\":{\"bugId\":423,\"serviceNowTicket\":\"S42342\",\"dependencies\":[\"4\",\"2s\"]},\"description\":\"dnkjnks fsdk\",\"title\":\"Envestnet | Yodlee  Maintenance Notifications\",\"statusId\":\"2\",\"startTime\":\"2018-08-01 17:22:35\",\"endTime\":\"2018-08-01 17:22:35\",\"maintenance\":{\"downTime\":{\"duration\":\"321\",\"intervalType\":\"h\"},\"criticality\":\"High\"},\"status\":\"In-Progress \",\"updates\":[{\"message\":\"hellp\",\"isInternal\":true,\"isResolved\":true}],\"notificationId\":\"MN139\",\"notificationType\":\"MAINTENANCE\"}}");
		String response = this.notificationController.editNotification("3099:fdskj",devAppIdHeader, this.filter);
		Assert.assertNotNull(response);
		Assert.assertTrue(!response.isEmpty(), "NotificationEditWithAllFieldsTest is empty");
		Assert.assertTrue(!response.contains("errorCode"), "NotificationEditWithAllFieldsTest is throwing some error - "+response);
		Assert.assertTrue(response.contains("\"id\":\"MN139\""), "NotificationEditWithAllFieldsTest JSON is changed - "+response);
		Assert.assertEquals(response, "{\"notification\":{\"id\":\"MN139\"}}");
	}
	
	@Test
	public void NotificationEditWithLimitedFieldsTest() {
		this.filter.setCustomerId("10000004");
		this.filter.setNotificationId("MN119");
		this.filter.setNotificationCreateObj("{\"notification\":{\"impact\":\"31dfa\",\"referenceTicket\":{\"bugId\":4532,\"dependencies\":[\"uyt\",\"4321\",\"12\"]},\"notificationId\":\"MN138\",\"notificationType\":\"MAINTENANCE\"}}");
		String response = this.notificationController.editNotification("3099:fdskj",devAppIdHeader, this.filter);
		Assert.assertNotNull(response);
		Assert.assertTrue(!response.isEmpty(), "NotificationEditWithAllFieldsTest is empty");
		Assert.assertTrue(!response.contains("errorCode"), "NotificationEditWithAllFieldsTest is throwing some error - "+response);
		Assert.assertTrue(response.contains("\"id\":\"MN119\""), "NotificationEditWithAllFieldsTest JSON is changed - "+response);
		Assert.assertEquals(response, "{\"notification\":{\"id\":\"MN119\"}}");
	}
	
	@Test
	public void NotificationEditWithoutAnyFieldsTest() {
		this.filter.setCustomerId("10000004");
		this.filter.setNotificationId("MN19");
		this.filter.setNotificationCreateObj("{}");
		String response = this.notificationController.editNotification("3099:fdskj",devAppIdHeader, this.filter);
		Assert.assertTrue(response.contains("errorCode"), "NotificationCreateFailureForNullDataTest is not throwing some error - "+response);
	}
	
	@Test
	public void NotificationfetchStatusesWithoutAnyFiltersTest() {
		this.filter.setNotificationType("");
		String response = this.notificationController.fetchNotificationStatuses("3099:fdskj",devAppIdHeader, this.filter);
		Assert.assertTrue(response.contains("errorCode"), "NotificationfetchStatusesWithoutAnyFiltersTest is not throwing some error - "+response);
	}
	
	@Test
	public void FetchAllBackendFilterDetailsWithoutAnyEnvironmentTest() {
		this.filter.setEnvironment("");
		String response = this.notificationController.fetchAllBackendFilterDetails("3099:fdskj",devAppIdHeader, this.filter);
		Assert.assertTrue(response.contains("errorCode"), "FetchAllBackendFilterDetailsWithoutAnyEnvironmentTest is not throwing some error - "+response);
	}
	
	@Test
	public void NotificationfetchStatusesTest() {
		this.filter.setNotificationType("MAINTENANCE");
		String response = this.notificationController.fetchNotificationStatuses("3099:fdskj",devAppIdHeader, this.filter);
		Assert.assertNotNull(response);
		Assert.assertTrue(!response.isEmpty(), "NotificationfetchStatusesTest is empty");
		Assert.assertTrue(!response.contains("errorCode"), "NotificationfetchStatusesTest is throwing some error - "+response);
		Assert.assertTrue(response.contains("\"statusId\":1"), "NotificationfetchStatusesTest JSON is changed - "+response);
		Assert.assertEquals(response, "{\"statuses\":[{\"statusId\":1,\"name\":\"Upcoming\",\"description\":\"Upcoming\"},{\"statusId\":2,\"name\":\"In-progress\",\"description\":\"In-progress\"},{\"statusId\":3,\"name\":\"Closed\",\"description\":\"Closed\"},{\"statusId\":4,\"name\":\"Foryourinformation\",\"description\":\"Foryourinformation\"},{\"statusId\":5,\"name\":\"Extended\",\"description\":\"Extended\"},{\"statusId\":6,\"name\":\"Cancel\",\"description\":\"Cancel\"}]}");
	}
	
	@Test
	public void FetchAllBackendFilterDetailsTest() {
		this.filter.setEnvironment("prod");
		String response = this.notificationController.fetchAllBackendFilterDetails("3099:fdskj",devAppIdHeader, this.filter);
		Assert.assertNotNull(response);
		Assert.assertTrue(!response.isEmpty(), "FetchAllBackendFilterDetailsTest is empty");
		Assert.assertTrue(!response.contains("errorCode"), "FetchAllBackendFilterDetailsTest is throwing some error - "+response);
		Assert.assertTrue(response.contains("\"cobrandId\":10005628"), "FetchAllBackendFilterDetailsTest JSON is changed - "+response);
		Assert.assertEquals(response, "{\"cobrandInfo\":[{\"dataBase\":\"sdbita01\",\"environment\":\"PROD\",\"dataCenter\":\"SC9\",\"name\":\"MoneyDashbaord\",\"cobrandId\":10005628,\"channel\":0,\"cobrandGroups\":\"CGNine\"},{\"dataBase\":\"sdbcab02\",\"environment\":\"PROD\",\"subBrands\":[{\"dataBase\":\"sdbcab02\",\"environment\":\"PROD\",\"dataCenter\":\"SC9\",\"name\":\"te\",\"cobrandId\":110007164,\"channel\":0,\"cobrandGroups\":\"YODLEEDR\"},{\"dataBase\":\"sdbcab02\",\"environment\":\"PROD\",\"dataCenter\":\"SC9\",\"name\":\"te\",\"cobrandId\":210007164,\"channel\":0,\"cobrandGroups\":\"YODLEEDR\"}],\"dataCenter\":\"SC9\",\"name\":\"Yodlee Money Movement SDK  Mas\",\"cobrandId\":10007164,\"channel\":1,\"cobrandGroups\":\"YODLEEDR\"},{\"dataBase\":\"ukprod031\",\"environment\":\"PROD\",\"subBrands\":[{\"dataBase\":\"ukprod031\",\"environment\":\"PROD\",\"dataCenter\":\"UK\",\"name\":\"YodTestSub01\",\"cobrandId\":110020168,\"channel\":0,\"cobrandGroups\":\"\"}],\"dataCenter\":\"UK\",\"name\":\"Experian\",\"cobrandId\":10020168,\"channel\":1,\"cobrandGroups\":\"\"}]}");
	}
	
	
}
