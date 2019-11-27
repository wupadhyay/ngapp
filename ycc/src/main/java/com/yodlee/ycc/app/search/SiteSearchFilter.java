/**
 *
 * Copyright (c) 2016 Yodlee Inc. All Rights Reserved.
 *
 * This software is the confidential and proprietary information of Yodlee, Inc.
 * Use is subject to license terms.
 *
 */

package com.yodlee.ycc.app.search;

import com.yodlee.ycc.app.search.RequestParameters;

public class SiteSearchFilter extends RequestParameters {

	private String providerId;

	private String providerIds;

	private String providerName;

	private String name;

	private String agentName;

	private String url;

	private String fieldName;

	public SiteSearchFilter() {
		super();
	}

	public String getProviderIds() {
		return providerIds;
	}

	public void setProviderIds(String providerIds) {
		this.providerIds = providerIds;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public String getProviderId() {
		return providerId;
	}

	public void setProviderId(String providerId) {
		this.providerId = providerId;
	}

	public String getProviderName() {
		return providerName;
	}

	public void setProviderName(String providerName) {
		this.providerName = providerName;
	}

	public String getAgentName() {
		return agentName;
	}

	public void setAgentName(String agentName) {
		this.agentName = agentName;
	}

	public String getFieldName() {
		return fieldName;
	}

	public void setFieldName(String fieldName) {
		this.fieldName = fieldName;
	}

	@Override
	public String toString() {
		return "SiteSearchFilter [providerId=" + providerId + ", providerName=" + providerName + ", providerIds="
				+ providerIds + ", agentName=" + agentName + ", url=" + url + ", fieldName=" + fieldName + ", name="
				+ name + "]";
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

}