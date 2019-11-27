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

import com.yodlee.ycc.app.search.UserContactInfoFilter;
import com.yodlee.ycc.app.service.userContactInfo.UserContactInfoService;

/**
 * 
 * @author sjain5
 * 
 */

@RestController
@RequestMapping(value = "ycc/user/contactinfo")
public class UserContactInfoController {

	private final Logger logger = LoggerFactory.getLogger(UserContactInfoController.class);

	@Autowired
	private UserContactInfoService service;

	/**
	 * Controller for creating any YCC and Non-YCC User's contact information`
	 * 
	 * @param rsession              - Session of the user logged in required for any
	 *                              validation of any API call
	 * @param appId                 - YCC Application ID from which user has logged
	 *                              in
	 * @param userContactInfoFilter - JSON String to file the user's contact
	 *                              information which has to be created
	 * @return user name as acknowledgement
	 */
	@RequestMapping(value = "/create", method = RequestMethod.POST)
	public String createUserContact(@RequestHeader(value = "rsession",required=false) String rsession,@RequestHeader(value = "Bearer",required=false) String jwtToken,
			@RequestHeader(value = "appId",required=false) String appId, @RequestBody UserContactInfoFilter userContactInfoFilter) {
		logger.info("Entering createUserContact()");
		if(jwtToken!=null) {
			rsession=jwtToken;
		}
		String values = service.createUserContactInfo(rsession, appId, userContactInfoFilter);
		logger.info("Exiting createUserContact()");
		return values;
	}

	/**
	 * Controller for searching any kind of user's contact information
	 * 
	 * @param rsession              - Session of the user logged in required for any
	 *                              validation of any API call
	 * @param appId                 - YCC Application ID from which user has logged
	 *                              in
	 * @param userContactInfoFilter - Filter based on which search has to be
	 *                              performed
	 * @return UserContactInformation object having all the details related to
	 *         notification
	 */
	@RequestMapping(value = "/search", method = RequestMethod.POST)
	public String searchUserContact(@RequestHeader(value = "rsession",required=false) String rsession,@RequestHeader(value = "Bearer",required=false) String jwtToken,
			@RequestHeader(value = "appId",required=false) String appId, @RequestBody UserContactInfoFilter userContactInfoFilter) {
		logger.info("Entering searchUserContact()");
		if(jwtToken!=null) {
			rsession=jwtToken;
		}
		String values = service.searchUserContact(rsession, appId, userContactInfoFilter);
		logger.info("Exiting searchUserContact()");
		return values;
	}

	/**
	 * Controller for editing any kind of notifications`
	 * 
	 * @param rsession              - Session of the user logged in required for any
	 *                              validation of any API call
	 * @param appId                 - YCC Application ID from which user has logged
	 *                              in
	 * @param userContactInfoFilter - JSON String to file the user's contact
	 *                              information which has been edited
	 * @return user name as acknowledgement
	 */
	@RequestMapping(value = "/edit", method = RequestMethod.POST)
	public String editUserContact(@RequestHeader(value = "rsession",required=false) String rsession,@RequestHeader(value = "Bearer",required=false) String jwtToken,
			@RequestHeader(value = "appId",required=false) String appId, @RequestBody UserContactInfoFilter userContactInfoFilter) {
		logger.info("Entering editUserContact()");
		if(jwtToken!=null) {
			rsession=jwtToken;
		}
		String values = service.editUserContact(rsession, appId, userContactInfoFilter);
		logger.info("Exiting editUserContact()");
		return values;
	}

	/**
	 * Controller for uploading file`
	 * 
	 */
	@RequestMapping(value = "/upload", method = RequestMethod.POST)
	public String uploadFile(@RequestHeader(value = "rsession",required=false) String rsession,@RequestHeader(value = "Bearer",required=false) String jwtToken,
			@RequestHeader(value = "appId",required=false) String appId, @RequestBody UserContactInfoFilter userContactInfoFilter) {
		logger.info("Entering uploadFile()");
		if(jwtToken!=null) {
			rsession=jwtToken;
		}
		String values = service.uploadFile(rsession, appId, userContactInfoFilter);
		logger.info("Exiting uploadFile()");
		return values;
	}

	/**
	 * Controller for Prod-Stage Cobrand Mapping
	 * 
	 */
	
	@RequestMapping(value = "/uploadCobrand", method = RequestMethod.POST)
	public String uploadCobMapping(@RequestHeader(value = "rsession",required=false) String rsession,@RequestHeader(value = "Bearer",required=false) String jwtToken,
			@RequestHeader(value = "appId",required=false) String appId, @RequestBody UserContactInfoFilter userContactInfoFilter) {
		logger.info("Entering uploadFile()");
		if(jwtToken!=null) {
			rsession=jwtToken;
		}
		String values = service.uploadCobMapping(rsession, appId, userContactInfoFilter);
		logger.info("Exiting uploadFile()");
		return values;
	}
	
	/**
	 * Controller for fetching file history
	 * 
	 * @param rsession              - Session of the user logged in required for any
	 *                              validation of any API call
	 * @param appId                 - YCC Application ID from which user has logged
	 *                              in
	 * @param userContactInfoFilter - Filter based on which search has to be
	 *                              performed
	 * @return UserContactInformation object having all the details related to user
	 *         contact upload history
	 */
	@RequestMapping(value = "/fileHistory", method = RequestMethod.POST)
	public String fileHistory(@RequestHeader(value = "rsession",required=false) String rsession,@RequestHeader(value = "Bearer",required=false) String jwtToken,
			@RequestHeader(value = "appId",required=false) String appId, @RequestBody UserContactInfoFilter userContactInfoFilter) {
		logger.info("Entering getFileHistory()");
		if(jwtToken!=null) {
			rsession=jwtToken;
		}
		String values = service.getFileHistory(rsession, appId, userContactInfoFilter);
		logger.info("Exiting getFileHistory()");
		return values;
	}

	/**
	 * 
	 * @param rsession              - Session of the user logged in required for any
	 *                              validation of any API call
	 * @param appId                 - YCC Application ID from which user has logged
	 *                              in
	 * @param userContactInfoFilter - Filter based on which search has to be
	 *                              performed
	 * @return UserContactInformation object having all the details related to user
	 *         roles
	 * @return roles
	 */

	@RequestMapping(value = "/role", method = RequestMethod.POST)
	public String userRole(@RequestHeader(value = "rsession",required=false) String rsession,@RequestHeader(value = "Bearer",required=false) String jwtToken,
			@RequestHeader(value = "appId",required=false) String appId, @RequestBody UserContactInfoFilter userContactInfoFilter) {
		logger.info("Entering userRole()");
		if(jwtToken!=null) {
			rsession=jwtToken;
		}
		String values = service.getUserRole(rsession, appId, userContactInfoFilter);
		logger.info("Exiting userRole()");
		return values;
	}
}
