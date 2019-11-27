/**
 *
 * Copyright (c) 2018 Yodlee Inc. All Rights Reserved.
 *
 * This software is the confidential and proprietary information of Yodlee, Inc.
 * Use is subject to license terms.
 *
 */
package com.yodlee.ycc.app.utils;

import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.HttpStatusCodeException;
import org.springframework.web.client.RestTemplate;

import com.yodlee.ycc.app.service.RestResource;

/**
 * 
 * @author sjain5
 *
 */
@Service
public class RestResourceImpl implements RestResource {

	private static final Logger logger = LoggerFactory.getLogger(RestResourceImpl.class);

	/**
	 * 
	 * Common method for post any data via REST call
	 * 
	 */
	@Override
	public String post(String uri, String userSession, String cobrandId, String appId, String data) {

		logger.info("Calling REST for URI -->" + uri);
		String authHeaderValue;
		JSONObject jObject = null;
		HttpHeaders requestHeaders = new HttpHeaders();
		if(userSession.contains("singularity")) {
		authHeaderValue = "Bearer=" + userSession + ",cobrandId=" + cobrandId;	
		}else {
		authHeaderValue = "userSession=" + userSession + ",cobrandId=" + cobrandId + ",appId=" + appId;
		}
		requestHeaders.set("Authorization", authHeaderValue);
		logger.debug("customerId = " + cobrandId);
		logger.debug("rsessionId = " + userSession);
		logger.debug("appId = " + appId);
		requestHeaders.setContentType(MediaType.APPLICATION_JSON);

		HttpEntity<String> requestEntity = new HttpEntity<String>(data.toString(), requestHeaders);
		logger.debug("Posting Notification with details" + data.toString());
		ResponseEntity<String> response = null;
		logger.info("Posting request --->" + uri);

		try {
			response = new RestTemplate().exchange(uri.toString(), HttpMethod.POST, requestEntity, String.class);
			String ret = response.getBody();
			jObject = new JSONObject(ret);
			logger.info("Recieving response --->" + uri);
			logger.debug("Response =" + ret);
		}catch(HttpClientErrorException e) {
			logger.error("Exception --->", e);
			String error = e.getResponseBodyAsString();
			logger.error("Response with Error---->" + error);
			jObject = new JSONObject(error);
			jObject.append("errorDesc", "Current Session has expired");
		} 
		catch (HttpStatusCodeException e) {
			logger.error("Exception --->", e);
			String error = e.getResponseBodyAsString();
			logger.error("Response with Error---->" + error);
			jObject = new JSONObject(error);
		} catch (final Exception ex) {
			logger.error("Error from post::" + uri);
			logger.error("Exception --->", ex);
			logger.error("Error forwarded to called method");
			jObject = new JSONObject();
			int statusCode = 400;
			jObject.append("errorCode", statusCode);
			jObject.append("errorDesc", "Something went wrong.Please try after sometime ");
		}

		logger.debug("Response for uri -->" + uri + "--" + jObject.toString());
		logger.info("Response recieved for uri-->" + uri);
		return jObject.toString();
	}

	/**
	 * 
	 * Common method for getting any data via REST call
	 * 
	 */
	@Override
	public String get(String uri, String userSession, String cobrandId, String appId) {

		logger.info("Calling REST for URI -->" + uri);
		String ret = null;
		JSONObject jObject = null;
		String authHeaderValue;
		HttpHeaders requestHeaders = new HttpHeaders();
		if(userSession.contains("singularity")) {
			authHeaderValue = "Bearer=" + userSession + ",cobrandId=" + cobrandId;	
		}else {
			authHeaderValue = "userSession=" + userSession + ",cobrandId=" + cobrandId + ",appId=" + appId;
		}
		requestHeaders.set("Authorization", authHeaderValue);
		logger.debug("customerId = " + cobrandId);
		logger.debug("rsessionId = " + userSession);
		logger.debug("appId = " + appId);
		requestHeaders.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

		MultiValueMap<String, String> mvm = new LinkedMultiValueMap<String, String>();
		HttpEntity<MultiValueMap<String, String>> requestEntity = new HttpEntity<MultiValueMap<String, String>>(mvm,
				requestHeaders);
		ResponseEntity<String> response = null;
		logger.info("Getting request --->" + uri);

		try {
			response = new RestTemplate().exchange(uri.toString(), HttpMethod.GET, requestEntity, String.class);
			ret = response.getBody();
			jObject = new JSONObject(ret);
			logger.info("Recieving response --->" + uri);
			logger.debug("Response =" + ret);
		} catch (HttpStatusCodeException e) {
			logger.error("Exception --->", e);
			String error = e.getResponseBodyAsString();
			logger.error("Response with Error---->" + error);
			jObject = new JSONObject(error);
		} catch (final Exception ex) {
			logger.error("Error from get::" + uri);
			logger.error("Exception --->", ex);
			logger.error("Error forwarded to called method");
			jObject = new JSONObject();
			int statusCode = 400;
			jObject.append("errorCode", statusCode);
			jObject.append("errorDesc", "Something went wrong.Please try after sometime ");
		}

		logger.debug("Response for uri -->" + uri + "--" + jObject.toString());
		logger.info("Response recieved for uri-->" + uri);
		return jObject.toString();

	}

	/**
	 * 
	 * Common method for editing any data via REST call
	 * 
	 */
	@Override
	public String put(String uri, String userSession, String cobrandId, String appId, String data) {

		logger.info("Calling REST for URI -->" + uri);

		JSONObject jObject = null;
		HttpHeaders requestHeaders = new HttpHeaders();
		String authHeaderValue = "userSession=" + userSession + ",cobrandId=" + cobrandId + ",appId=" + appId;
		requestHeaders.set("Authorization", authHeaderValue);
		logger.debug("customerId = " + cobrandId);
		logger.debug("rsessionId = " + userSession);
		logger.debug("appId = " + appId);
		requestHeaders.setContentType(MediaType.APPLICATION_JSON);

		HttpEntity<String> requestEntity = new HttpEntity<String>(data.toString(), requestHeaders);
		logger.debug("Posting Notification with details" + data.toString());
		ResponseEntity<String> response = null;
		logger.info("Posting request --->" + uri);

		try {
			response = new RestTemplate().exchange(uri.toString(), HttpMethod.PUT, requestEntity, String.class);
			String ret = response.getBody();
			jObject = new JSONObject(ret);
			logger.info("Recieving response --->" + uri);
			logger.debug("Response =" + ret);
		} catch (HttpStatusCodeException e) {
			logger.error("Exception --->", e);
			String error = e.getResponseBodyAsString();
			logger.error("Response with Error---->" + error);
			jObject = new JSONObject(error);
		} catch (final Exception ex) {
			logger.error("Error from post::" + uri);
			logger.error("Exception --->", ex);
			logger.error("Error forwarded to called method");
			jObject = new JSONObject();
			int statusCode = 400;
			jObject.append("errorCode", statusCode);
			jObject.append("errorDesc", "Something went wrong.Please try after sometime ");
		}

		logger.debug("Response for uri -->" + uri + "--" + jObject.toString());
		logger.info("Response recieved for uri-->" + uri);
		return jObject.toString();
	}

}
