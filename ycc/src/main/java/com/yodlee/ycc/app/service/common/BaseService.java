/**
*
* Copyright (c) 2016 Yodlee Inc. All Rights Reserved.
*
* This software is the confidential and proprietary information of Yodlee, Inc.
* Use is subject to license terms.
*
*/

package com.yodlee.ycc.app.service.common;

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
import org.springframework.web.client.HttpStatusCodeException;
import org.springframework.web.client.RestTemplate;

import com.yodlee.framework.web.handler.YodleeRequestHandler;

@Service
public class BaseService extends YodleeRequestHandler {

	@Value("${com.yodlee.ycc.app.ysl.url}")
	String yslBaseUrl = null;

	String cobrandListUrl = "cobrandInfo/cobrands";

	String userTypeUrl = "cobrandInfo/cobrand";

	String cobrandLocaleUrl = "cobrand/locale";

	String userInfoUrl = "user/userinfo";

	private final Logger logger = LoggerFactory.getLogger(BaseService.class);

	/**
	 * Fetches List of All Cobrands
	 * 
	 * @return
	 */
	public String getCobrands(String rsession, String customerId, String appId) {
		logger.info("Entering BaseService.getCobrands()");
		String ret = null;
		JSONObject jObject = null;
		StringBuilder url = new StringBuilder(yslBaseUrl).append(cobrandListUrl);

		HttpHeaders requestHeaders = new HttpHeaders();
		String authHeaderValue;
		if(rsession.contains("singularity")) {
			authHeaderValue = "Bearer=" + rsession + ",cobrandId=" + customerId;	
		}else {
			authHeaderValue = "userSession=" + rsession + ",cobrandId=" + customerId + ",appId=" + appId;
		}
		requestHeaders.set("Authorization", authHeaderValue);
		logger.debug("rsessionId = " + rsession);
		logger.debug("customerId = " + customerId);
		logger.debug("appId = " + appId);
		requestHeaders.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

		MultiValueMap<String, String> mvm = new LinkedMultiValueMap<String, String>();
		HttpEntity<MultiValueMap<String, String>> requestEntity = new HttpEntity<MultiValueMap<String, String>>(mvm,
				requestHeaders);
		ResponseEntity<String> response = null;

		logger.debug("Request URL ::" + url);
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
			logger.error("Error from getcobrands::", url);
			logger.error("Exception --->", ex);
			logger.error("Error forwarded to called method");
			jObject = new JSONObject();
			int statusCode = 400;
			jObject.append("errorCode", statusCode);
			jObject.append("errorDesc", "Something went wrong.Please try after sometime ");
		}

		logger.info("Exiting BaseService.getCobrands()");
		return jObject.toString();
	}

	public void getLoggerService(String exception) {
		logger.error("JS Error while rendering data in UI" + exception);
	}

	public String getUserType(String rSession, String cobrandId, String appId) {
		logger.info("Entering BaseService.getUserType()");
		String ret = null;
		JSONObject jObject = null;
		StringBuilder url = new StringBuilder(yslBaseUrl).append(userTypeUrl);

		if (cobrandId != null && cobrandId != "") {
			if (cobrandId.contains("[")) {
				url.append(
						"?cobrandId=" + cobrandId.substring(cobrandId.indexOf("[") + 1, cobrandId.indexOf("]")).trim());
			} else {
				url.append("?cobrandId=" + cobrandId.trim());
			}
		}

		logger.debug("Request URL ::" + url);
		logger.info("Filter Attributes " + cobrandId);

		HttpHeaders requestHeaders = new HttpHeaders();
		
		String authHeaderValue;
		if(rSession.contains("singularity")) {
			authHeaderValue = "Bearer=" + rSession + ",cobrandId=" + cobrandId;	
		}else {
			authHeaderValue = "userSession=" + rSession + ",cobrandId=" + cobrandId + ",appId=" + appId;
		}
		requestHeaders.set("Authorization", authHeaderValue);
		logger.debug("rsessionId = " + rSession);
		logger.debug("cobrandId = " + cobrandId);
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
			logger.error("Response with jObject---->" + jObject.toString());
		} catch (final Exception ex) {
			logger.error("Error from getuserType::", url);
			logger.error("Exception --->", ex);
			logger.error("Error forwarded to called method");
			jObject = new JSONObject();
			int statusCode = 400;
			jObject.append("errorCode", statusCode);
			jObject.append("errorDesc", "Something went wrong.Please try after sometime ");
		}

		logger.info("Exiting BaseService.getUserType()");
		return jObject.toString();
	}

	public String getUserInfo(String rSession, String cobrandId, String appId) {
		logger.info("Entering BaseService.getUserInfo()");
		String ret = null;
		JSONObject jObject = null;
		StringBuilder url = new StringBuilder(yslBaseUrl).append(userInfoUrl);

		if (cobrandId != null && cobrandId != "") {
			if (cobrandId.contains("[")) {
				url.append(
						"?cobrandId=" + cobrandId.substring(cobrandId.indexOf("[") + 1, cobrandId.indexOf("]")).trim());
			} else {
				url.append("?cobrandId=" + cobrandId.trim());
			}
		}

		logger.debug("Request URL ::" + url);
		logger.info("Filter Attributes " + cobrandId);

		HttpHeaders requestHeaders = new HttpHeaders();
		String authHeaderValue;
		if(rSession.contains("singularity")) {
			authHeaderValue = "Bearer=" + rSession + ",cobrandId=" + cobrandId;	
		}else {
			authHeaderValue = "userSession=" + rSession + ",cobrandId=" + cobrandId + ",appId=" + appId;
		}
		requestHeaders.set("Authorization", authHeaderValue);
		logger.debug("rsessionId = " + rSession);
		logger.debug("cobrandId = " + cobrandId);
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
			logger.error("Response with jObject---->" + jObject.toString());
		} catch (final Exception ex) {
			logger.error("Error from getuserInfo::", url);
			logger.error("Exception --->", ex);
			logger.error("Error forwarded to called method");
			jObject = new JSONObject();
			int statusCode = 400;
			jObject.append("errorCode", statusCode);
			jObject.append("errorDesc", "Something went wrong.Please try after sometime ");
		}

		logger.info("Exiting BaseService.getUserInfo()");
		return jObject.toString();
	}

	public String getCobrandLocale(String rSession, String cobrandId, String appId) {
		logger.info("Entering BaseService.getCobrandLocale()");
		String ret = null;
		JSONObject jObject = null;
		StringBuilder url = new StringBuilder(yslBaseUrl).append(cobrandLocaleUrl);

		logger.debug("Request URL ::" + url);
		logger.info("Filter Attributes " + cobrandId);

		HttpHeaders requestHeaders = new HttpHeaders();
		String authHeaderValue;
		if(rSession.contains("singularity")) {
			authHeaderValue = "Bearer=" + rSession + ",cobrandId=" + cobrandId;	
		}else {
			authHeaderValue = "userSession=" + rSession + ",cobrandId=" + cobrandId + ",appId=" + appId;
		}
		requestHeaders.set("Authorization", authHeaderValue);
		logger.debug("rsessionId = " + rSession);
		logger.debug("cobrandId = " + cobrandId);
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
			logger.error("Response with jObject---->" + jObject.toString());
		} catch (final Exception ex) {
			logger.error("Error from getCobrandLocale::", url);
			logger.error("Exception --->", ex);
			logger.error("Error forwarded to called method");
			jObject = new JSONObject();
			int statusCode = 400;
			jObject.append("errorCode", statusCode);
			jObject.append("errorDesc", "Something went wrong.Please try after sometime ");
		}

		logger.info("Exiting BaseService.getCobrandLocale()");
		return jObject.toString();
	}

}
