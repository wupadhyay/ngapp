/**
 *
 * Copyright (c) 2016 Yodlee Inc. All Rights Reserved.
 *
 * This software is the confidential and proprietary information of Yodlee, Inc.
 * Use is subject to license terms.
 *
 */

package com.yodlee.ycc.app.service.siteMetadata;

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
import com.yodlee.ycc.app.search.SiteSearchFilter;

@Service
public class SiteMetadataService extends YodleeRequestHandler {

	@Value("${com.yodlee.ycc.app.ysl.url}")
	String yslSiteUrl = null;

	String siteMetadataUrl = "providers/search";

	private final Logger logger = LoggerFactory.getLogger(SiteMetadataService.class);

	public String getSiteFavicons(SiteSearchFilter filter, String appId) {
		logger.info("Entering SiteMetadataService.getSiteFavicons()");

		String ret = null;
		JSONObject jObject = null;
		StringBuilder url = new StringBuilder(yslSiteUrl).append(siteMetadataUrl).append("/provider?");

		if (filter.getCobrandId() != null && filter.getCobrandId() != "") {
			if (filter.getCobrandId().contains("[")) {
				url.append("cobrandId=" + filter.getCobrandId()
						.substring(filter.getCobrandId().indexOf("[") + 1, filter.getCobrandId().indexOf("]")).trim());
			} else {
				url.append("cobrandId=" + filter.getCobrandId().trim());
			}
		}

		if (filter.getFieldName() != null && filter.getFieldName() != "") {
			url.append("&fieldName=" + filter.getFieldName());
		}

		if (filter.getProviderIds() != null && filter.getProviderIds() != "") {
			url.append("&providerIds=" + filter.getProviderIds());
		}

		if (filter.getName() != null && filter.getName() != "") {
			url.append("&name=" + filter.getName());
		}

		logger.debug("Request URL ::" + url);
		logger.info("Filter Attributes " + filter);

		HttpHeaders requestHeaders = new HttpHeaders();
		String authHeaderValue = "userSession=" + filter.getUserSession() + ",cobrandId=" + filter.getCustomerId()
				+ ",appId=" + appId;
		requestHeaders.set("Authorization", authHeaderValue);
		logger.debug("customerId = " + filter.getCustomerId());
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
			logger.error("Error from getSiteFavicons::", url);
			logger.error("Error while fetching response for getSiteFavicons", ex);
			logger.error("Error forwarded to called method");
			jObject = new JSONObject();
			int statusCode = 400;
			jObject.append("errorCode", statusCode);
			jObject.append("errorDesc", "Something went wrong.Please try after sometime ");
		}

		logger.info("Exiting SiteMetadataService.getSiteFavicons");
		return jObject.toString();
	}

	public String getSites(SiteSearchFilter filter, String appId) {
		logger.info("Entering SiteMetadataService.getSiteSearchResults()");

		String ret = null;
		JSONObject jObject = null;
		StringBuilder url = new StringBuilder(yslSiteUrl).append(siteMetadataUrl).append("?");

		if (filter.getCobrandId() != null && filter.getCobrandId() != "") {
			if (filter.getCobrandId().contains("[")) {
				url.append("cobrandId=" + filter.getCobrandId()
						.substring(filter.getCobrandId().indexOf("[") + 1, filter.getCobrandId().indexOf("]")).trim());
			} else {
				url.append("cobrandId=" + filter.getCobrandId().trim());
			}
		}

		if (filter.getAgentName() != null && filter.getAgentName() != "") {
			url.append("&agentName=" + filter.getAgentName());
		}

		if (filter.getProviderId() != null && filter.getProviderId() != "") {
			url.append("&providerId=" + filter.getProviderId());
		}

		if (filter.getProviderName() != null && filter.getProviderName() != "") {
			url.append("&name=" + filter.getProviderName());
		}

		if (filter.getUrl() != null && filter.getUrl() != "") {
			url.append("&url=" + filter.getUrl());
		}

		logger.debug("Request URL ::" + url);
		logger.info("Filter Attributes " + filter);

		HttpHeaders requestHeaders = new HttpHeaders();
		String authHeaderValue;
		if(filter.getUserSession().contains("singularity")) {
			authHeaderValue = "Bearer=" + filter.getUserSession() + ",cobrandId=" + filter.getCustomerId();	
		}else {
			authHeaderValue = "userSession=" + filter.getUserSession() + ",cobrandId=" + filter.getCustomerId() + ",appId=" + appId;
		}
		requestHeaders.set("Authorization", authHeaderValue);
		logger.debug("customerId = " + filter.getCustomerId());
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
			logger.error("Error from getcobrands::", url);
			logger.error("Error while fetching response for sitemetadata", ex);
			logger.error("Error forwarded to called method");
			jObject = new JSONObject();
			int statusCode = 400;
			jObject.append("errorCode", statusCode);
			jObject.append("errorDesc", "Something went wrong.Please try after sometime ");
		}

		logger.info("Exiting SiteMetadataService.getSiteResults");
		return jObject.toString();
	}

}
