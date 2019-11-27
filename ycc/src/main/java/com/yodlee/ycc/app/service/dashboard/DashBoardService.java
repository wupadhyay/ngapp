/**
 * Copyright (c) 2016 Yodlee Inc. All Rights Reserved.
 *
 * This software is the confidential and proprietary information of Yodlee, Inc.
 * Use is subject to license terms.
 *
 */

package com.yodlee.ycc.app.service.dashboard;

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
import com.yodlee.ycc.app.search.ReportSearchFilter;

/**
 * <code> SiteService </code> class provide service layer implementation for
 * Splunk and YSL rest calls
 * 
 * @author
 */
@Service
public class DashBoardService extends YodleeRequestHandler {

	@Value("${com.yodlee.ycc.app.ysl.url}")
	String yslBaseUrl = null;

	String refreshStatstUrl = "cobrefresh/stats";

	private final Logger logger = LoggerFactory.getLogger(DashBoardService.class);

	public String getAllRefreshStatistics(ReportSearchFilter filter, String appId) {
		logger.info("Entering DashBoardService.getAllRefreshStatistics()");

		String ret = null;
		JSONObject jObject = null;
		StringBuilder url = new StringBuilder(yslBaseUrl).append(refreshStatstUrl).append("?");

		if (filter.getGroupBy() != null && filter.getGroupBy() != "") {
			url.append("groupBy=" + filter.getGroupBy());
		}

		if (filter.getCobrandId() != null && filter.getCobrandId() != "") {
			if (filter.getCobrandId().contains("[")) {
				url.append("&cobrandId=" + filter.getCobrandId()
						.substring(filter.getCobrandId().indexOf("[") + 1, filter.getCobrandId().indexOf("]")).trim());
			} else {
				url.append("&cobrandId=" + filter.getCobrandId().trim());
			}
		}

		if (filter.getNumRecords() != null && filter.getNumRecords() != "") {
			url.append("&numRecords=" + filter.getNumRecords());
		}

		if (filter.getReportType() != null && filter.getReportType() != "") {
			url.append("&reportType=" + filter.getReportType());
		}

		if (filter.getTimeSlot() != null && filter.getTimeSlot() != "") {
			url.append("&duration=" + filter.getTimeSlot());
		}

		if (filter.getOffSetTimeSlot() != null && filter.getOffSetTimeSlot() != "") {
			url.append("&durationOffset=" + filter.getOffSetTimeSlot());
		}

		if (filter.getTop() != null && filter.getTop() != "") {
			url.append("&top=" + filter.getTop());
		}

		if (filter.getInclude() != null && filter.getInclude() != "") {
			url.append("&include=" + filter.getInclude());
		}

		if (filter.getProviderIds() != null && filter.getProviderIds() != "") {
			url.append("&providerIds=" + filter.getProviderIds());
		}

		if (filter.getConsolidatedBy() != null && filter.getConsolidatedBy() != "") {
			url.append("&consolidatedBy=" + filter.getConsolidatedBy());
		}

		logger.debug("Request URL ::" + url);
		logger.info("Filter Attributes " + filter.toString());
		

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
			logger.error("Error from getcobrefreshstats::" + url);
			logger.error("Exception --->", ex);
			logger.error("Error forwarded to called method");
			jObject = new JSONObject();
			int statusCode = 400;
			jObject.append("errorCode", statusCode);
			jObject.append("errorDesc", "Something went wrong.Please try after sometime ");
		}

		logger.info("Exiting DashBoardService.getCobrands()");
		return jObject.toString();
	}

}
