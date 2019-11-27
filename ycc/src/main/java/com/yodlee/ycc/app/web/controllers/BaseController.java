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

import com.yodlee.ycc.app.search.RequestParameters;
import com.yodlee.ycc.app.service.common.BaseService;

@RestController
@RequestMapping(value = "ycc/base")
public class BaseController {

	private final Logger logger = LoggerFactory.getLogger(BaseController.class);

	@Autowired
	private BaseService service;

	@RequestMapping(value = "/cobrands", method = RequestMethod.POST)
	public String getCobrands(@RequestHeader(value = "rsession",required=false) String rsession,@RequestHeader(value = "Bearer",required=false) String jwtToken,
			@RequestHeader(value = "appId",required=false) String appId, @RequestBody final RequestParameters filter) {
		logger.info("Entering getCobrands()");
		if(jwtToken!=null) {
			rsession=jwtToken;
		}
		String values = service.getCobrands(rsession, filter.getCustomerId(), appId);
		logger.info("Exiting getCobrands()");
		return values;
	}

	@RequestMapping(value = "/loggerService", method = RequestMethod.POST)
	public void getLoggerService(@RequestHeader(value = "rsession",required=false) String rsession,@RequestHeader(value = "Bearer",required=false) String jwtToken,
			@RequestHeader(value = "appId",required=false) String appId, @RequestBody final RequestParameters filter) {
		logger.info("Entering Logger Service()");
		if(jwtToken!=null) {
			rsession=jwtToken;
		}
		service.getLoggerService(filter.getExceptionStackTrace());
		logger.info("Exiting Logger Service()");
	}

	@RequestMapping(value = "/userType", method = RequestMethod.POST)
	public String getUserType(@RequestHeader(value = "rsession",required=false) String rsession,@RequestHeader(value = "Bearer",required=false) String jwtToken,
			@RequestHeader(value = "appId",required=false) String appId, @RequestBody final RequestParameters filter) {
		logger.info("Entering getUserType()");
		if(jwtToken!=null) {
			rsession=jwtToken;
		}
		String values = service.getUserType(rsession, filter.getCobrandId(), appId);
		logger.info("Exiting getUserType()");
		return values;
	}

	@RequestMapping(value = "/userInfo", method = RequestMethod.POST)
	public String getUserInfo(@RequestHeader(value = "rsession",required=false) String rsession,@RequestHeader(value = "Bearer",required=false) String jwtToken,
			@RequestHeader(value = "appId",required=false) String appId, @RequestBody final RequestParameters filter) {
		logger.info("Entering getUserInfo()");
		if(jwtToken!=null) {
			rsession=jwtToken;
		}
		String values = service.getUserInfo(rsession, filter.getCobrandId(), appId);
		logger.info("Exiting getUserInfo()");
		return values;
	}

	@RequestMapping(value = "/cobrand/locale", method = RequestMethod.POST)
	public String getCobrandLocale(@RequestHeader(value = "rsession",required=false) String rsession,@RequestHeader(value = "Bearer",required=false) String jwtToken,
			@RequestHeader(value = "appId",required=false) String appId, @RequestBody final RequestParameters filter) {
		logger.info("Entering getCobrandLocale()");
		if(jwtToken!=null) {
			rsession=jwtToken;
		}
		String values = service.getCobrandLocale(rsession, filter.getCustomerId(), appId);
		logger.info("Exiting getCobrandLocale()");
		return values;
	}

}
