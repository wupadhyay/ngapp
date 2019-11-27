/**
 *
 * Copyright (c) 2016 Yodlee Inc. All Rights Reserved.
 *
 * This software is the confidential and proprietary information of Yodlee, Inc.
 * Use is subject to license terms.
 *
 */
package com.yodlee.ycc.app.utils;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

public class ResponseTransformer {
	private final Logger logger = LoggerFactory.getLogger(ResponseTransformer.class);

	/**
	 * Processes the response from YSL by restructuring the Additional dataset
	 * details
	 * 
	 * @input --Response from YSL
	 * @return -- formatted response which can be used by UI
	 * 
	 */
	public String processResponse(String summaryRes) {
		logger.info("Processing site response");
		logger.debug("response from YSL layer  : " + summaryRes);
		JsonDataHandler jsonDataHandler = new JsonDataHandler();
		jsonDataHandler.parseJson(summaryRes);
		if (summaryRes.contentEquals("{}") || summaryRes.contains("errorCode")) {
			return summaryRes;
		}

		List<?> containers = jsonDataHandler.getValues("$.provider[0].containerNames");
		String container = containers.get(0).toString();
		String arr[] = container.split("\",\"");
		@SuppressWarnings("rawtypes")
		Map<String, List<HashMap<String, HashMap<String, List>>>> containerFeatureMap = new HashMap<String, List<HashMap<String, HashMap<String, List>>>>();
		for (String cont : arr) {
			cont = cont.replace("[", "");
			cont = cont.replace("]", "");
			cont = cont.replace("\"", "");
			if (cont.equalsIgnoreCase("creditCard")) {
				cont = "CREDIT_CARD";
			} else {
				cont = cont.toUpperCase();
			}
			logger.debug("container name after mapping" + summaryRes);
			List<?> additionalData = jsonDataHandler.getValues("$.provider[0].additionalDataSet[*].name");
			for (int y = 0; y < additionalData.size(); y++) {
				String featureName = null;
				String attributeName = null;
				List<?> additionalDataAttribs = jsonDataHandler
						.getValues("$.provider[0].additionalDataSet[" + y + "].attribute[*]");
				for (int z = 0; z < additionalDataAttribs.size(); z++) {
					List<?> containersInner = jsonDataHandler
							.getValues("$.provider[0].additionalDataSet[" + y + "].attribute[" + z + "].container");
					@SuppressWarnings("rawtypes")
					List<HashMap<String, HashMap<String, List>>> featureList = new ArrayList<HashMap<String, HashMap<String, List>>>();
					for (int w = 0; w < containersInner.size(); w++) {
						if (containersInner.get(w).toString().toUpperCase().replaceAll("CREDITCARD", "CREDIT_CARD")
								.contains(cont)) {
							logger.debug("matched for the container " + cont);
							// List<?> containerAttributes
							// =jsonDataHandler.getValues("$.provider[0].additionalDataSet["+y+"].attribute["+z+"].containerAttribute[*]['"+cont+"']");
							featureName = (String) jsonDataHandler
									.getValues("$.provider[0].additionalDataSet[" + y + "].name").get(0);
							logger.debug("feature Name is " + featureName);
							List<?> contanersArray = jsonDataHandler
									.getValues("$.provider[0].additionalDataSet[" + y + "].attribute[*].container");
							@SuppressWarnings("rawtypes")
							HashMap<String, HashMap<String, List>> featureAttribMap = new HashMap<String, HashMap<String, List>>();
							@SuppressWarnings("rawtypes")
							HashMap<String, List> AttrProperyMapping = new HashMap<String, List>();
							for (int i = 0; i < contanersArray.size(); i++) {
								if (contanersArray.get(i).toString().toUpperCase()
										.replaceAll("CREDITCARD", "CREDIT_CARD").contains(cont)) {
									logger.debug("matched in this index " + i + "y is " + y);
									try {
										attributeName = (String) jsonDataHandler.getValues(
												"$.provider[0].additionalDataSet[" + y + "].attribute[" + i + "].name")
												.get(0);
									} catch (Exception e) {
										attributeName = null;
									}
									logger.debug("found the attribute name " + attributeName);

									List<?> containerAttributeArray = jsonDataHandler
											.getValues("$.provider[0].additionalDataSet[" + y + "].attribute[" + i
													+ "]..['" + cont + "']");
									logger.debug("containerAttributeArray for that contaainer "
											+ containerAttributeArray.toString());

									if (attributeName != null) {
										AttrProperyMapping.put(attributeName, containerAttributeArray);
									}

								}

							}
							featureAttribMap.put(featureName, AttrProperyMapping);
							if (containerFeatureMap.containsKey(cont)) {
								featureList = containerFeatureMap.get(cont);
								if (featureList.toString().contains(featureAttribMap.toString())) {
									logger.debug("verified the duplicate logic ");
								} else
									featureList.add(featureAttribMap);

							} else {
								featureList.add(featureAttribMap);
							}
						}
					}
					if (featureList.size() > 0)
						containerFeatureMap.put(cont, featureList);

				}

			}
		}
		summaryRes = replaceJsonNode(summaryRes, "additionalDataSet", containerFeatureMap);
		logger.debug("response from replaceJsonNode " + summaryRes);
		logger.info("Processing completed");
		return summaryRes;
	}

	private String replaceJsonNode(String summaryRes, String node,
			@SuppressWarnings("rawtypes") Map<String, List<HashMap<String, HashMap<String, List>>>> containerFeatureMap) {
		logger.info("start execution of replaceJsonNode");
		JsonElement jelementx = new JsonParser().parse(summaryRes);
		JsonObject jo = jelementx.getAsJsonObject();
		JsonArray ja = (JsonArray) jo.get("provider");
		for (int i = 0; i < ja.size(); i++) {
			JsonElement je = ja.get(i);
			JsonObject jj = je.getAsJsonObject();
			jj.remove(node);

		}
		summaryRes = jelementx.toString();
		logger.debug("after removing Additional dataSet " + summaryRes);
		summaryRes = summaryRes.substring(0, summaryRes.length() - 3);
		logger.debug("after removing  last three characters " + summaryRes);
		ObjectMapper mapper = new ObjectMapper();
		String jsonResp = "";
		try {
			jsonResp = mapper.writeValueAsString(containerFeatureMap);
			logger.debug(jsonResp);
			logger.info("Replace completed of JSON node");
			jsonResp = ",\"additionalDataSet\": " + jsonResp + "}]}";
		} catch (Exception e) {
			logger.error("error came during jackson conversion");
		}

		// summaryRes=summaryRes.substring(0, summaryRes.length()-1);
		summaryRes = summaryRes + jsonResp;
		logger.debug("final response from replaceJsonNode " + summaryRes);
		return summaryRes;
	}

}
