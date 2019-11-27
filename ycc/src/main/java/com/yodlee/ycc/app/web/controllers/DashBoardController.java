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

import com.yodlee.ycc.app.search.ReportSearchFilter;
import com.yodlee.ycc.app.service.dashboard.DashBoardService;

@RestController
@RequestMapping(value = "ycc/cd")
public class DashBoardController {

	private final Logger logger = LoggerFactory.getLogger(DashBoardController.class);

	@Autowired
	private DashBoardService service;

	@RequestMapping(value = "/cobRefreshStats", method = RequestMethod.POST)
	public String cobRefreshStats(@RequestHeader(value = "rsession",required=false) String rsession,@RequestHeader(value = "Bearer",required=false) String jwtToken,
			@RequestHeader(value = "appId",required=false) String appId, @RequestBody final ReportSearchFilter filter) {
		logger.info("Entering cobRefreshStats()");
		if(jwtToken!=null) {
			rsession=jwtToken;
		}
		filter.setUserSession(rsession);
		String values = service.getAllRefreshStatistics(filter, appId);
		logger.info("Exiting cobRefreshStats()");
		return values;
	}

}
