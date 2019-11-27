/**
 * Copyright (c) 2016 Yodlee Inc. All Rights Reserved.
 *
 * This software is the confidential and proprietary information of Yodlee, Inc.
 * Use is subject to license terms.
 *
 */

package com.yodlee.ycc.app.service;

import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.util.StringUtils;
import org.springframework.web.client.HttpStatusCodeException;
import org.springframework.web.client.RestTemplate;

import com.yodlee.framework.web.handler.YodleeRequestHandler;
import com.yodlee.ycc.app.search.GlobalMessageSearchFilter;

/**
 * <code> GlobalMessageService </code> class provide service layer
 * implementation for handling global message request
 * 
 * @author
 */
@Service
public class GlobalMessageService extends YodleeRequestHandler {

	@Value("${com.yodlee.ycc.app.ysl.url}")
	public String yslBaseUrl = null;

	String globaleMessagesUrl = "notification/provider/search";

	private final Logger logger = LoggerFactory.getLogger(GlobalMessageService.class);

	public String searchGlobalMessage(GlobalMessageSearchFilter filter, String appId) {
		logger.info("Entering GlobalMessageService.getGlobalMessages()");

		String ret = null;

		JSONObject jObject = null;
		StringBuilder url = new StringBuilder(yslBaseUrl).append(globaleMessagesUrl).append("?");

		if (!StringUtils.isEmpty(filter.getCobrandId())) {
			url.append("cobrandId=").append(filter.getCobrandId());
		}

		if (!StringUtils.isEmpty(filter.getProviderIds())) {
			url.append("&providerIds=").append(filter.getProviderIds().trim());
		}

		if (!StringUtils.isEmpty(filter.getStatuses())) {
			url.append("&statuses=").append(filter.getStatuses().trim());
		}

		logger.debug("Request URL ::" + url);

		HttpHeaders requestHeaders = new HttpHeaders();
		String authHeaderValue;
		if(filter.getUserSession().contains("singularity")) {
			authHeaderValue = "Bearer=" + filter.getUserSession() + ",cobrandId=" + filter.getCustomerId();	
		}else {
			authHeaderValue = "userSession=" + filter.getUserSession() + ",cobrandId=" + filter.getCustomerId() + ",appId=" + appId;
		}
		
		requestHeaders.set("Authorization", authHeaderValue);

		logger.debug("cobrandId = " + filter.getCustomerId());
		logger.debug("rsessionId = " + filter.getUserSession());
		logger.debug("appId = " + appId);

		requestHeaders.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

		MultiValueMap<String, String> mvm = new LinkedMultiValueMap<String, String>();
		HttpEntity<MultiValueMap<String, String>> requestEntity = new HttpEntity<MultiValueMap<String, String>>(mvm,
				requestHeaders);
		ResponseEntity<String> response = null;
		logger.info("Posting request --->" + url);

		try {
			response = new RestTemplate().exchange(url.toString(), HttpMethod.GET, requestEntity, String.class);
			ret = response.getBody();
			jObject = new JSONObject(ret);
			logger.info("Recieving response --->" + url);
			logger.debug("Response =" + ret);

		} catch (HttpStatusCodeException e) {
			logger.error("Exception --->", e);
			String error = e.getResponseBodyAsString();
			logger.error("Response with Error---->" + error);
			jObject = new JSONObject(error);
		} catch (final Exception ex) {
			logger.error("Error from getGlobalMessages ::", url);
			logger.error("Exception --->", ex);
			logger.error("Error forwarded to called method");
			jObject = new JSONObject();
			int statusCode = 400;

			jObject.append("errorCode", statusCode);
			jObject.append("errorDesc", "Something went wrong.Please try after sometime ");
		}

		logger.info("Exiting GlobalMessageService.getGlobalMessages()");
		return jObject.toString();
	}

}
