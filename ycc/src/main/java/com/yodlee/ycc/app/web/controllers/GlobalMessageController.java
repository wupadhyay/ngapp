/**
 *
 * Copyright (c) 2016 Yodlee Inc. All Rights Reserved.
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

import com.yodlee.ycc.app.search.GlobalMessageSearchFilter;
import com.yodlee.ycc.app.service.GlobalMessageService;

@RestController
@RequestMapping(value = "ycc/gm")
public class GlobalMessageController {

	private final Logger logger = LoggerFactory.getLogger(GlobalMessageController.class);

	@Autowired
	private GlobalMessageService service;

	@RequestMapping(value = "/searchGlobalMessage", method = RequestMethod.POST)
	public String searchGlobalMessage(@RequestHeader(value = "rsession",required=false) String rsession,@RequestHeader(value = "Bearer",required=false) String jwtToken,
			@RequestHeader(value = "appId",required=false) String appId, @RequestBody final GlobalMessageSearchFilter filter) {
		logger.info("Entering GlobalMessageController.getGlobalMessages()");
		if(jwtToken!=null) {
			rsession=jwtToken;
		}
		filter.setUserSession(rsession);
		String values = service.searchGlobalMessage(filter, appId);
		logger.info("Exiting GlobalMessageController.getGlobalMessages()");
		return values;
	}

}
