/**
 *
 * Copyright (c) 2018 Yodlee Inc. All Rights Reserved.
 *
 * This software is the confidential and proprietary information of Yodlee, Inc.
 * Use is subject to license terms.
 *
 */

package com.yodlee.ycc.app.web.controllers;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import com.yodlee.ycc.app.search.NotificationFilter;
import com.yodlee.ycc.app.service.notifcation.NotificationService;

/**
 * 
 * @author sjain5
 * 
 */

@RestController
@RequestMapping(value = "ycc/notification")
public class NotificationController {

	private final Logger logger = LoggerFactory.getLogger(NotificationController.class);

	@Autowired
	private NotificationService service;

	/**
	 * Controller for creating any kind of notifications`
	 * 
	 * @param rsession           - Session of the user logged in required for any
	 *                           validation of any API call
	 * @param appId              - YCC Application ID from which user has logged in
	 * @param notificationFilter - JSON String to file the notification which has to
	 *                           be created
	 * @return Notification ID as acknowledgement
	 */
	@RequestMapping(value = "/create", method = RequestMethod.POST)
	public String createNotification(@RequestHeader(value = "rsession",required=false) String rsession,@RequestHeader(value = "Bearer",required=true) String jwtToken,
			@RequestHeader(value = "appId",required=false) String appId, @RequestBody NotificationFilter notificationFilter) {
		logger.info("Entering createNotification()");
		if(jwtToken!=null) {
			rsession=jwtToken;
		}
		String values = service.createNotification(rsession, appId, notificationFilter);
		logger.info("Exiting createNotification()");
		return values;
	}

	/**
	 * Controller for searching any kind of notifications for Tier2
	 * 
	 * @param rsession           - Session of the user logged in required for any
	 *                           validation of any API call
	 * @param appId              - YCC Application ID from which user has logged in
	 * @param notificationFilter - Filter based on which search has to be performed
	 * @return Notification object having all the details related to notification
	 */
	@RequestMapping(value = "/searchForAllData", method = RequestMethod.POST)
	public String searchNotificationForAllData(@RequestHeader(value = "rsession",required=false) String rsession,@RequestHeader(value = "Bearer",required=true) String jwtToken,
			@RequestHeader(value = "appId",required=false) String appId, @RequestBody NotificationFilter notificationFilter) {
		logger.info("Entering searchNotification()");
		if(jwtToken!=null) {
			rsession=jwtToken;
		}
		String values = service.searchForAllNotification(rsession, appId, notificationFilter);
		logger.info("Exiting searchNotification()");
		return values;
	}

	/**
	 * Controller for searching any kind of notifications`
	 * 
	 * @param rsession           - Session of the user logged in required for any
	 *                           validation of any API call
	 * @param appId              - YCC Application ID from which user has logged in
	 * @param notificationFilter - Filter based on which search has to be performed
	 * @return Notification object having all the details related to notification
	 */
	@RequestMapping(value = "/search", method = RequestMethod.POST)
	public String searchNotification(@RequestHeader(value = "rsession",required=false) String rsession,@RequestHeader(value = "Bearer",required=true) String jwtToken,
			@RequestHeader(value = "appId",required=false) String appId, @RequestBody NotificationFilter notificationFilter) {
		logger.info("Entering searchNotification()");
		if(jwtToken!=null) {
			rsession=jwtToken;
		}
		String values = service.searchNotification(rsession, appId, notificationFilter);
		logger.info("Exiting searchNotification()");
		return values;
	}

	
	/**
	 * Controller for editing any kind of notifications`
	 * 
	 * @param rsession           - Session of the user logged in required for any
	 *                           validation of any API call
	 * @param appId              - YCC Application ID from which user has logged in
	 * @param notificationFilter - JSON String to file the notification which has
	 *                           been edited
	 * @return Notification ID as acknowledgement
	 */
	@RequestMapping(value = "/edit", method = RequestMethod.POST)
	public String editNotification(@RequestHeader(value = "rsession",required=false) String rsession,@RequestHeader(value = "Bearer",required=true) String jwtToken,
			@RequestHeader(value = "appId",required=false) String appId, @RequestBody NotificationFilter notificationFilter) {
		logger.info("Entering editNotification()");
		if(jwtToken!=null) {
			rsession=jwtToken;
		}
		String values = service.editNotification(rsession, appId, notificationFilter);
		logger.info("Exiting editNotification()");
		return values;
	}

	/**
	 * Controller for fetching the notification status based on type
	 * 
	 * @param rsession           - Session of the user logged in required for any
	 *                           validation of any API call
	 * @param appId              - YCC Application ID from which user has logged in
	 * @param notificationFilter - Filter based on which search has to be performed
	 * @return Object having all the details related to Status
	 */
	@RequestMapping(value = "/statuses", method = RequestMethod.POST)
	public String fetchNotificationStatuses(@RequestHeader(value = "rsession",required=false) String rsession,@RequestHeader(value = "Bearer",required=true) String jwtToken,
			@RequestHeader(value = "appId",required=false) String appId, @RequestBody NotificationFilter notificationFilter) {
		logger.info("Entering fetchNotificationStatuses()");
		if(jwtToken!=null) {
			rsession=jwtToken;
		}
		String values = service.fetchNotificationStatuses(rsession, appId, notificationFilter);
		logger.info("Exiting fetchNotificationStatuses()");
		return values;
	}

	/**
	 * Controller for fetching the notification status based on type
	 * 
	 * @param rsession           - Session of the user logged in required for any
	 *                           validation of any API call
	 * @param appId              - YCC Application ID from which user has logged in
	 * @param notificationFilter - Filter based on which search has to be performed
	 * @return Object having all the details related to All the required filters and
	 *         mapping with respect to Cobrands
	 */
	@RequestMapping(value = "/cobfilters", method = RequestMethod.POST)
	public String fetchAllBackendFilterDetails(@RequestHeader(value = "rsession",required=false) String rsession,@RequestHeader(value = "Bearer",required=true) String jwtToken,
			@RequestHeader(value = "appId",required=false) String appId, @RequestBody NotificationFilter notificationFilter) {
		logger.info("Entering fetchAllBackendFilterDetails()");
		if(jwtToken!=null) {
			rsession=jwtToken;
		}
		String values = service.fetchAllCobBackendFilters(rsession, appId, notificationFilter);
		logger.info("Exiting fetchAllBackendFilterDetails()");
		return values;
	}

	/**
	 * Controller for download attachment
	 * 
	 */
	@RequestMapping(value = "/download", method = RequestMethod.POST)
	public String downloadFile(@RequestHeader(value = "rsession",required=false) String rsession,@RequestHeader(value = "Bearer",required=true) String jwtToken,
			@RequestHeader(value = "appId",required=false) String appId, @RequestBody NotificationFilter notificationFilter) {
		logger.info("Entering downloadFile()");
		if(jwtToken!=null) {
			rsession=jwtToken;
		}
		String values = service.downloadAttachment(rsession, appId, notificationFilter);
		logger.info("Exiting downloadFile()");
		return values;
	}

}
