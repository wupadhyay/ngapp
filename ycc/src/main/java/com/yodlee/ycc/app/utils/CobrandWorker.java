/**
 *
 * Copyright (c) 2019 Yodlee Inc. All Rights Reserved.
 *
 * This software is the confidential and proprietary information of Yodlee, Inc.
 * Use is subject to license terms.
 *
 */
package com.yodlee.ycc.app.utils;

import java.io.IOException;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.yodlee.ycc.app.search.Brand;



public class CobrandWorker implements Runnable {

	private final static Logger logger = LoggerFactory.getLogger(CobrandWorker.class);

	private String url;
	private RestResourceImpl restResource;
	private String rsession;
	private String appId;
	private String customerId;
	private Map<String, Brand> responseMap = new ConcurrentHashMap<String, Brand>();

	public Map<String, Brand> getResponseMap() {
		return responseMap;
	}

	public CobrandWorker(String url, RestResourceImpl restResource, String rsession, String appId, String customerId,
			Map<String, Brand> responseMap) {
		this.url = url;
		this.restResource = restResource;
		this.rsession = rsession;
		this.appId = appId;
		this.customerId = customerId;
		this.responseMap = responseMap;
	}

	@Override
	public void run() {
		String response = null;
		try {
			logger.info("Start of run method");
			response = restResource.get(url, rsession, customerId, appId);
			Brand cobrandData = ThreadHandler.convertJsonToObj(response, Brand.class);
			responseMap.put(Thread.currentThread().getName(), cobrandData);
			logger.info("URL for thread-" + Thread.currentThread().getName());
			logger.info("end of run method");
		} catch (Exception e) {
			// TODO: handle exception
			logger.error("Exception--" + e);
		}
	}
	
	

}
