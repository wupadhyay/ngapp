/**
 *
 * Copyright (c) 2019 Yodlee Inc. All Rights Reserved.
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

import com.yodlee.ycc.app.search.SiteNotificationFilter;
import com.yodlee.ycc.app.service.notifcation.SiteNotificationService;

/**
 * 
 * @author smaji
 * 
 */

@RestController
@RequestMapping(value = "ycc/site")
public class SiteNotificationController {

	private final Logger logger = LoggerFactory.getLogger(SiteNotificationController.class);

	@Autowired
	private SiteNotificationService service;

	/**
	 * Controller for creating site notifications`
	 * 
	 * @param rsession           - Session of the user logged in required for any
	 *                           validation of any API call
	 * @param appId              - YCC Application ID from which user has logged in
	 * @param SiteNotificationFilter - JSON String to file the notification which has to
	 *                           be created
	 * @return Site ID as acknowledgement
	 */
	@RequestMapping(value = "/create", method = RequestMethod.POST)
	public String createSiteNotification(@RequestHeader(value = "rsession") String rsession,
			@RequestHeader(value = "appId") String appId, @RequestBody SiteNotificationFilter siteNotificationFilter) {
		logger.debug("Entering createSiteNotification()");
		String values = service.createSiteNotification(rsession, appId, siteNotificationFilter);
		logger.debug("Exiting createSiteNotification()");
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
	@RequestMapping(value = "/search", method = RequestMethod.POST)
	public String searchSiteNotification(@RequestHeader(value = "rsession") String rsession,
			@RequestHeader(value = "appId") String appId, @RequestBody SiteNotificationFilter siteNotificationFilter) {
		logger.debug("Entering searchSiteNotification()");
		String values = service.searchSiteNotification(rsession, appId, siteNotificationFilter);
		logger.debug("Exiting searchSiteNotification()");
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
	 * @return Site Notification ID as acknowledgement
	 */
	@RequestMapping(value = "/edit", method = RequestMethod.POST)
	public String editSiteNotification(@RequestHeader(value = "rsession") String rsession,
			@RequestHeader(value = "appId") String appId, @RequestBody SiteNotificationFilter siteNotificationFilter) {
		logger.debug("Entering editSiteNotification()");
		String values = service.editSiteNotification(rsession, appId, siteNotificationFilter);
		logger.debug("Exiting editSiteNotification()");
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
	 * @return Site Data Object having all the details related to Site
	 */
	@RequestMapping(value = "/siteInfo", method = RequestMethod.POST)
	public String siteInfo(@RequestHeader(value = "rsession") String rsession,
			@RequestHeader(value = "appId") String appId, @RequestBody SiteNotificationFilter siteNotificationFilter) {
		logger.debug("Entering siteInfo()");
		String values = service.getSiteData(rsession, appId, siteNotificationFilter);
		logger.debug("Exiting siteInfo()");
		return values;
	}
	
	@RequestMapping(value = "/cobrandInfo", method = RequestMethod.POST)
	public String cobrandInfo(@RequestHeader(value = "rsession") String rsession,
			@RequestHeader(value = "appId") String appId, @RequestBody SiteNotificationFilter siteNotificationFilter) {
		logger.debug("Entering siteInfo()");
		String values = service.getCobrandData(rsession, appId, siteNotificationFilter);
		logger.debug("Exiting siteInfo()");
		return values;
	}

}
