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
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ArrayBlockingQueue;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ThreadPoolExecutor;
import java.util.concurrent.TimeUnit;

import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.common.collect.Lists;
import com.yodlee.ycc.app.constants.URIConstant;
import com.yodlee.ycc.app.search.Brand;
import com.yodlee.ycc.app.search.CobrandData;
import com.yodlee.ycc.app.search.SiteNotificationFilter;

@Service
public class ThreadHandler {

	private final static Logger logger = LoggerFactory.getLogger(ThreadHandler.class);

	@Autowired
	private URIConstant uriConstant;

	@Autowired
	private RestResourceImpl restResource;

	public String getCobrandData(String rsession, String appId, SiteNotificationFilter siteNotificationFilter)
			throws InterruptedException {
		Brand brand = new Brand();
		String siteResponse=null;
		String cobrands = siteNotificationFilter.getCobrand();
		String siteId = siteNotificationFilter.getSiteId();
		List<Long> cobrandList = Lists.transform(Arrays.asList(cobrands.split("\\s*,\\s*")), Long::parseLong);
		List<CobrandData> cobrandDataList = new ArrayList<>();
		List<List<Long>> partitions = Lists.partition(cobrandList, 100);
		ThreadPoolExecutor pool = new ThreadPoolExecutor(partitions.size(), 20, 1800000, TimeUnit.MILLISECONDS,
				new ArrayBlockingQueue<Runnable>(10));
		Map<String, Brand> responseMap = new ConcurrentHashMap<String, Brand>();
		for (List<Long> list : partitions) {
			logger.info("Inside partition loop");
			String url = urlBuilder(list, siteId);
			pool.submit(new CobrandWorker(url, restResource, rsession, appId, siteNotificationFilter.getCustomerId(),
					responseMap));
		}
		pool.shutdown();
		pool.awaitTermination(150000, TimeUnit.MILLISECONDS);
		if (pool.getActiveCount() == 0) {
			for (String key : responseMap.keySet()) {
				Brand value = responseMap.get(key);
				cobrandDataList.addAll(value.getCobrandId());
			}
			brand.setCobrandId(cobrandDataList);
			brand.setSiteId(siteId);
			logger.info("Response is-------" + brand.getCobrandId().size());
			siteResponse=convertObjToJson(brand);
		}
		return siteResponse;
	}

	public String urlBuilder(List<Long> list, String siteId) {
		StringBuilder url = new StringBuilder(uriConstant.yslBaseUrl + uriConstant.SiteNotification_Site_Data + "/"
				+ siteId + "/" + uriConstant.SiteNotification_Cobrand_Data);
		String cobrands = StringUtils.join(list, ",");
		url.append(cobrands);
		logger.info("End of urlBuilder-" + url);
		return url.toString();
	}
	
	public static <T> T convertJsonToObj(String json, Class<T> objType)
			throws Exception, JsonMappingException, IOException {
		ObjectMapper mapper = new ObjectMapper()
			      .configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
		return mapper.readValue(json, objType);
	}
	
	public static String convertObjToJson(Object obj) {
		ObjectMapper converter = new ObjectMapper();
		converter.setSerializationInclusion(Include.NON_NULL);
		String response = null;
		try {
			response = converter.writeValueAsString(obj);
		} catch (JsonProcessingException e) {
			logger.error("Illegal request paramaters are passed: " + e.getMessage());
		}
		return response;

	}
	
	
}
