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

import com.yodlee.ycc.app.search.SiteSearchFilter;
import com.yodlee.ycc.app.service.siteMetadata.SiteMetadataService;
import com.yodlee.ycc.app.utils.ResponseTransformer;

@RestController
@RequestMapping(value = "ycc/sm")
public class SiteMetadataController {

	private final Logger logger = LoggerFactory.getLogger(SiteMetadataController.class);

	@Autowired
	private SiteMetadataService service;

	@RequestMapping(value = "/siteresults", method = RequestMethod.POST)
	public String siteSearch(@RequestHeader(value = "rsession",required=false) String rsession,@RequestHeader(value = "Bearer",required=false) String jwtToken,
			@RequestHeader(value = "appId",required=false) String appId, @RequestBody final SiteSearchFilter filter) {
		logger.info("Entering siteSearch()");
		if(jwtToken!=null) {
			rsession=jwtToken;
		}
		filter.setUserSession(rsession);
		String values = service.getSites(filter, appId);
		logger.info("Exiting siteSearch()");
		return values;
	}

	@RequestMapping(value = "/siteViewDetails", method = RequestMethod.POST)
	public String siteViewDetails(@RequestHeader(value = "rsession",required=false) String rsession,@RequestHeader(value = "Bearer",required=false) String jwtToken,
			@RequestHeader(value = "appId",required=false) String appId, @RequestBody final SiteSearchFilter filter) {
		logger.info("Entering siteViewDetails()");
		if(jwtToken!=null) {
			rsession=jwtToken;
		}
		filter.setUserSession(rsession);
		String values = service.getSites(filter, appId);
		String response = new ResponseTransformer().processResponse(values);
		logger.info("Exiting siteViewDetails()");
		return response;
	}

	@RequestMapping(value = "/getSiteFavicon", method = RequestMethod.POST)
	public String siteFaviconSearch(@RequestHeader(value = "rsession",required=false) String rsession,@RequestHeader(value = "Bearer",required=false) String jwtToken,
			@RequestHeader(value = "appId",required=false) String appId, @RequestBody final SiteSearchFilter filter) {
		logger.info("Entering getSiteFavicons()");
		if(jwtToken!=null) {
			rsession=jwtToken;
		}
		filter.setUserSession(rsession);
		String values = service.getSiteFavicons(filter, appId);
		logger.info("Exiting getSiteFavicons()");
		return values;
	}

}
