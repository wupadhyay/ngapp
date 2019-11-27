package com.yodlee.ycc.app.utils;

import java.util.List;

import com.jayway.jsonpath.Configuration;
import com.jayway.jsonpath.JsonPath;
import com.jayway.jsonpath.Option;
import com.jayway.jsonpath.ReadContext;

public class JsonDataHandler {

	private Configuration config;

	private ReadContext context;

	private String json;

	private void init(String jsonDoc) {
		config = Configuration.defaultConfiguration();
		config = Configuration.builder().options(Option.SUPPRESS_EXCEPTIONS).options(Option.ALWAYS_RETURN_LIST).build();
		this.json = jsonDoc;
	}

	/**
	 * Parses the json data and allows reading json data
	 * 
	 * @param jsonDoc
	 */
	public void parseJson(String jsonDoc) {
		if (jsonDoc != null && jsonDoc.length() > 0) {
			init(jsonDoc);
			context = JsonPath.using(config).parse(json);

		}
	}

	/**
	 * Fetches list of values from the json data based in json path expression
	 * 
	 * @param jsonPath
	 * @return List of values
	 */
	public List<?> getValues(String jsonPath) {
		config = config.addOptions(Option.SUPPRESS_EXCEPTIONS);
		if (jsonPath.length() == 0)
			return null;
		List<?> list = context.read(jsonPath, List.class);
		return list;
	}

}
